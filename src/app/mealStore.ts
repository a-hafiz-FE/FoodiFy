import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './storage';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  writeBatch,
  type FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {
  Chef,
  defaultDraft,
  defaultSearchFilters,
  DEMO_CHEF_ID,
  Id,
  Meal,
  Store,
  Tag,
  toChef,
  toMeal,
  toTag,
  toTagId,
  toTagLabel,
} from './StoreConstants';

type Unsub = () => void;

export const useMealStore = create<
  Store & {
    listenersStarted: boolean;
    unsubs: { meals?: Unsub; chefs?: Unsub; tags?: Unsub };
    stopListeners: () => void;
    ensureTagsExist: (hashTags: string[]) => Promise<string[]>;
  }
>()(
  persist(
    (set, get) => ({
      // ─────────────────────────────────────────────
      // LISTENER GUARD STATE
      // Tracks whether real-time Firestore listeners are
      // currently active, and holds their unsubscribe fns.
      // ─────────────────────────────────────────────

      listenersStarted: false,
      unsubs: {},

      /**
       * Stops all active Firestore listeners (meals, chefs, tags)
       * by calling their respective unsubscribe functions.
       *
       * Resets `listenersStarted` to false and clears `unsubs`,
       * allowing listeners to be safely restarted later via `startListeners`.
       *
       * Should be called on logout or when the component consuming
       * the store unmounts.
       */
      stopListeners: () => {
        const { unsubs } = get();
        unsubs.meals?.();
        unsubs.chefs?.();
        unsubs.tags?.();
        set({ listenersStarted: false, unsubs: {} });
      },

      // ─────────────────────────────────────────────
      // DRAFT STATE
      // Holds the in-progress meal form data.
      // Persisted to MMKV so it survives app restarts.
      // ─────────────────────────────────────────────

      draft: defaultDraft,

      /**
       * Merges a partial update into the current draft.
       *
       * Also resets `submitStatus` to 'idle' and clears any previous
       * `submitError`, so the UI doesn't show stale feedback after
       * the user edits a field.
       *
       * @param patch - Partial draft fields to merge in.
       *
       * @example
       * setDraft({ mealName: 'Pasta Carbonara' });
       */
      setDraft: patch =>
        set(s => ({
          draft: { ...s.draft, ...patch },
          submitStatus: 'idle',
          submitError: undefined,
        })),

      /**
       * Replaces the entire draft with the default blank draft,
       * effectively clearing all form fields.
       *
       * Called automatically after a successful `submitDraft`.
       * Can also be called manually when the user cancels the form.
       */
      resetDraft: () => set({ draft: defaultDraft }),

      submitStatus: 'idle',
      submitError: undefined,

      // ─────────────────────────────────────────────
      // TAG HELPERS
      // ─────────────────────────────────────────────

      /**
       * Ensures that each hashtag in the provided array has a
       * corresponding document in the Firestore `tags` collection.
       *
       * Steps:
       *  1. Converts raw hashtag strings to normalized tag IDs via `toTagId`.
       *  2. Deduplicates the resulting IDs.
       *  3. Uses a Firestore batch write with `merge: true` to upsert each tag.
       *     - Sets `label` and `updatedAt` on every write.
       *     - Only sets `createdAt` on tags that don't yet exist in the local
       *       `tagsById` cache, avoiding accidental overwrites.
       *  4. Returns the array of resolved tag IDs for use in the meal document.
       *
       * @param hashTags - Raw hashtag strings (e.g. `["#vegan", "#quick"]`).
       * @returns Promise resolving to an array of deduplicated tag document IDs.
       *
       * @example
       * const tagIds = await ensureTagsExist(['#vegan', '#quick', '#vegan']);
       * // tagIds => ['vegan', 'quick']
       */
      ensureTagsExist: async (hashTags: string[]) => {
        // toTagId now returns null for invalid tags — filter those out explicitly
        const rawIds = hashTags.map(toTagId).filter((id): id is string => id !== null);

        // Deduplicate so we don't write the same tag twice in one batch
        const tagIds = Array.from(new Set(rawIds));
        if (!tagIds.length) return [];

        const db = getFirestore();
        const batch = writeBatch(db);

        // Use the already-loaded tagsById cache to detect tags that are new
        const existing = get().tagsById;

        for (const id of tagIds) {
          const ref = doc(db, 'tags', id);
          const isNew = !existing?.[id];

          batch.set(
            ref,
            {
              label: toTagLabel(id),
              // Only include createdAt when the tag is brand new;
              // merging on an existing doc would silently overwrite it otherwise.
              ...(isNew ? { createdAt: serverTimestamp() } : {}),
              updatedAt: serverTimestamp(),
            },
            { merge: true },
          );
        }

        await batch.commit();
        return tagIds;
      },

      // ─────────────────────────────────────────────
      // SUBMIT
      // ─────────────────────────────────────────────

      /**
       * Validates the current draft and, if valid, writes the meal
       * to the Firestore `meals` collection.
       *
       * Validation rules (checked in order):
       *  - `mealName` must be non-empty.
       *  - `cookTimeMinutes` must be set and ≤ 120 minutes.
       *  - `difficulty` must be set.
       *  - `dishTypes` must have at least one entry.
       *
       * On success:
       *  - Sets `submitStatus` to 'success'.
       *  - Calls `resetDraft` to clear the form.
       *
       * On failure:
       *  - Sets `submitStatus` to 'error' and populates `submitError`
       *    with a human-readable message.
       *
       * Side effects:
       *  - Calls `ensureTagsExist` to upsert any hashtags before saving,
       *    so all `tagIds` stored on the meal reference valid tag documents.
       *  - Steps are sorted by `order` and blank entries are stripped.
       *  - Ingredients are trimmed and blank entries are stripped.
       */
      submitDraft: async () => {
        const { draft, resetDraft } = get();

        // ── Validation ──────────────────────────────
        if (!draft.mealName.trim()) {
          set({ submitStatus: 'error', submitError: 'Meal name is required' });
          return;
        }
        if (!draft.cookTimeMinutes || draft.cookTimeMinutes < 1) {
          set({ submitStatus: 'error', submitError: 'Cook time is required' });
          return;
        }
        if (draft.cookTimeMinutes > 120) {
          set({
            submitStatus: 'error',
            submitError: 'Cook time must be less than two hours!',
          });
          return;
        }
        if (!draft.difficulty) {
          set({ submitStatus: 'error', submitError: 'Difficulty is required' });
          return;
        }
        if (!draft.dishTypes.length) {
          set({ submitStatus: 'error', submitError: 'Dish type is required' });
          return;
        }

        set({ submitStatus: 'loading', submitError: undefined });

        try {
          const db = getFirestore();

          // ── Chef ID ──────────────────────────────
          // TODO: replace with auth slice: get().currentUser?.id ?? DEMO_CHEF_ID
          // DEMO_CHEF_ID is a temporary fallback for pre-auth development only.
          const chefId = DEMO_CHEF_ID;

          // Upsert tags first so tagIds are valid references
          const tagIds = await get().ensureTagsExist(draft.hashTags);

          // Normalize steps: sort by order, re-index cleanly, trim whitespace, drop empty entries
          const steps = draft.steps
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((s, i) => ({ order: i + 1, text: s.text.trim() }))
            .filter(s => s.text.length > 0);

          // Normalize ingredients: trim and drop blanks
          const ingredients = (draft.ingredients ?? [])
            .map(x => x.trim())
            .filter(Boolean);

          await addDoc(collection(db, 'meals'), {
            chefId, // ✅ derived above — swap for auth when ready
            mealName: draft.mealName.trim(),
            mealImage: draft.imageLocalUri ?? '', // ✅ safe: local URIs blocked by guard above
            description: '',
            servings: draft.servings ?? 1,
            cookTimeMinutes: draft.cookTimeMinutes,
            difficulty: draft.difficulty,
            dishTypes: draft.dishTypes,
            dietaryTargets: draft.dietaryTargets,
            tagIds,
            ingredients,
            steps,
            ratingAvg: 0,
            ratingCount: 0,
            likeCount: 0,
            commentCount: 0,
            status: 'published',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });

          set({ submitStatus: 'success' });
          resetDraft();
        } catch (e: any) {
          set({
            submitStatus: 'error',
            submitError: e?.message ?? 'Failed to submit',
          });
        }
      },

      // ─────────────────────────────────────────────
      // TAGS LISTENER
      // ─────────────────────────────────────────────

      tagsById: {},

      /**
       * Opens a real-time Firestore listener on the `tags` collection.
       *
       * On each snapshot, rebuilds the `tagsById` map (keyed by document ID)
       * and updates the store. This keeps tag data automatically in sync
       * whenever tags are created or updated elsewhere.
       *
       * @returns An unsubscribe function that tears down the listener when called.
       */
      listenTags: () => {
        const db = getFirestore();
        const q = query(collection(db, 'tags'));

        return onSnapshot(
          q,
          (snap: FirebaseFirestoreTypes.QuerySnapshot) => {
            const tagsById: Record<Id, Tag> = {};
            snap.docs.forEach(
              (d: FirebaseFirestoreTypes.QueryDocumentSnapshot) =>
                (tagsById[d.id] = toTag(d.id, d.data())),
            );
            set({ tagsById });
          },
          err => console.log('listenTags error', err),
        );
      },

      // ─────────────────────────────────────────────
      // CHEFS LISTENER
      // ─────────────────────────────────────────────

      chefsById: {},

      /**
       * Opens a real-time Firestore listener on the `chefs` collection,
       * filtered to documents where `isChef === true`.
       *
       * On each snapshot, rebuilds the `chefsById` map (keyed by document ID)
       * and updates the store.
       *
       * @returns An unsubscribe function that tears down the listener when called.
       */
      listenChefs: () => {
        const db = getFirestore();
        const q = query(collection(db, 'chefs'), where('isChef', '==', true));

        return onSnapshot(
          q,
          (snap: FirebaseFirestoreTypes.QuerySnapshot) => {
            const chefsById: Record<Id, Chef> = {};
            snap.docs.forEach(
              (d: FirebaseFirestoreTypes.QueryDocumentSnapshot) =>
                (chefsById[d.id] = toChef(d.id, d.data())),
            );
            set({ chefsById });
          },
          err => console.log('listenChefs error', err),
        );
      },

      // ─────────────────────────────────────────────
      // MEALS LISTENER
      // ─────────────────────────────────────────────

      mealsById: {},
      mealsIds: [],

      /**
       * Opens a real-time Firestore listener on the `meals` collection.
       *
       * On each snapshot, rebuilds two parallel data structures:
       *  - `mealsById`: a Record keyed by meal ID for O(1) lookups.
       *  - `mealsIds`: an ordered array of IDs reflecting Firestore's
       *    current document ordering (insertion order by default).
       *
       * Keeping both structures in sync avoids full array scans when
       * looking up a single meal by ID.
       *
       * @returns An unsubscribe function that tears down the listener when called.
       */
      listenMeals: () => {
        const db = getFirestore();
        const q = query(collection(db, 'meals'));

        return onSnapshot(
          q,
          (snap: FirebaseFirestoreTypes.QuerySnapshot) => {
            const meals = snap.docs.map(
              (d: FirebaseFirestoreTypes.QueryDocumentSnapshot) =>
                toMeal(d.id, d.data()),
            );
            const mealsById: Record<Id, Meal> = {};
            const mealsIds: Id[] = [];
            for (const m of meals) {
              mealsById[m.id] = m;
              mealsIds.push(m.id);
            }
            set({ mealsById, mealsIds });
          },
          err => console.log('listenMeals error', err),
        );
      },

      // ─────────────────────────────────────────────
      // SELECTORS
      // Derived views over the store's raw data.
      // ─────────────────────────────────────────────

      /**
       * Returns all meals as an ordered array.
       *
       * Uses `mealsIds` to preserve the ordering established by the
       * Firestore listener, then maps each ID to its meal object.
       * Filters out any IDs that no longer have a corresponding entry
       * in `mealsById` (defensive against race conditions).
       *
       * @returns Array of `Meal` objects in listener order.
       */
      mealsArray: () =>
        get()
          .mealsIds.map(id => get().mealsById[id])
          .filter(Boolean),

      /**
       * Returns all meals belonging to a specific chef.
       *
       * @param chefId - The ID of the chef to filter by.
       * @returns Array of `Meal` objects whose `chefId` matches.
       */
      mealsByChef: chefId =>
        get()
          .mealsIds.map(id => get().mealsById[id])
          .filter(m => m?.chefId === chefId) as Meal[],

      /**
       * Returns a fully denormalized "meal card" for a given meal ID,
       * enriched with its associated chef and resolved tag objects.
       *
       * This is the preferred shape to pass to UI components that need
       * to display a meal with chef info and tag labels, avoiding the
       * need for components to perform their own lookups.
       *
       * @param mealId - The ID of the meal to look up.
       * @returns The meal merged with its `chef` and `tags` arrays,
       *          or `undefined` if the meal does not exist in the store.
       *
       * @example
       * const card = getMealCard('meal-123');
       * // card.chef.name, card.tags[0].label
       */
      getMealCard: mealId => {
        const { mealsById, chefsById, tagsById } = get();
        const meal = mealsById[mealId];
        if (!meal) return undefined;

        return {
          ...meal,
          chef: chefsById[meal.chefId],
          tags: meal.tagIds.map(id => tagsById[id]).filter(Boolean),
        };
      },

      // ─────────────────────────────────────────────
      // SEARCH FILTERS
      // ─────────────────────────────────────────────

      searchFilters: defaultSearchFilters,

      /**
       * Merges a partial update into the current search filters.
       *
       * Follows the same pattern as `setDraft` — only the provided keys
       * are updated; all other filters are preserved.
       *
       * @param patch - Partial search filter fields to merge in.
       *
       * @example
       * setSearchFilters({ difficulty: 'easy' });
       */
      setSearchFilters: patch =>
        set(s => ({
          searchFilters: { ...s.searchFilters, ...patch },
        })),

      /**
       * Resets all search filters back to their default values.
       *
       * Call this when the user taps "Clear filters" or navigates
       * away from the search screen.
       */
      clearSearchFilters: () => set({ searchFilters: defaultSearchFilters }),

      // ─────────────────────────────────────────────
      // LISTENER ORCHESTRATION
      // ─────────────────────────────────────────────

      /**
       * Starts all three Firestore real-time listeners (meals, chefs, tags)
       * if they are not already running.
       *
       * Guard behavior:
       *  - If `listenersStarted` is already true, this is a no-op and returns
       *    the existing `stopListeners` function — preventing duplicate listeners
       *    from being created on re-renders or double-mounts (e.g. React Strict Mode).
       *
       * On first call:
       *  - Starts `listenMeals`, `listenChefs`, and `listenTags`.
       *  - Stores their unsubscribe functions in `unsubs`.
       *  - Sets `listenersStarted` to true.
       *
       * @returns A cleanup function that, when called, stops all listeners
       *          via `stopListeners`. Safe to use as a `useEffect` return value.
       *
       * @example
       * useEffect(() => {
       *   return useMealStore.getState().startListeners();
       * }, []);
       */
      startListeners: () => {
        const { listenersStarted } = get();
        if (listenersStarted) {
          // Already running — return the same cleanup shape as the normal path
          return () => get().stopListeners();
        }

        const mealsUnsub = get().listenMeals();
        const chefsUnsub = get().listenChefs();
        const tagsUnsub = get().listenTags();

        set({
          listenersStarted: true,
          unsubs: { meals: mealsUnsub, chefs: chefsUnsub, tags: tagsUnsub },
        });

        return () => get().stopListeners();
      },
    }),
    {
      name: 'meal-storage',
      storage: createJSONStorage(() => mmkvStorage),
      // Only the draft is persisted — all other state (meals, chefs, tags)
      // is re-fetched from Firestore on each app session via the listeners.
      partialize: s => ({ draft: s.draft }),
    },
  ),
);