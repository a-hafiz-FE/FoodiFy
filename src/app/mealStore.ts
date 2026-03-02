import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './storage';
import firestore from '@react-native-firebase/firestore';
import {
  Chef,
  defaultDraft,
  DEMO_CHEF_ID,
  Id,
  Meal,
  Store,
  Tag,
  toChef,
  toMeal,
  toTag,
} from './StoreConstants';

type Unsub = () => void;

export const useMealStore = create<
  Store & {
    listenersStarted: boolean;
    unsubs: { meals?: Unsub; chefs?: Unsub; tags?: Unsub };
    stopListeners: () => void;
  }
>()(
  persist(
    (set, get) => ({
      // ===== Listener Guard State =====
      listenersStarted: false,
      unsubs: {},

      stopListeners: () => {
        const { unsubs } = get();
        unsubs.meals?.();
        unsubs.chefs?.();
        unsubs.tags?.();
        set({ listenersStarted: false, unsubs: {} });
      },

      // ===== Draft =====
      draft: defaultDraft,
      setDraft: patch =>
        set(s => ({
          draft: { ...s.draft, ...patch },
          submitStatus: 'idle',
          submitError: undefined,
        })),
      resetDraft: () => set({ draft: defaultDraft }),

      submitStatus: 'idle',
      submitError: undefined,

      submitDraft: async () => {
        const { draft, resetDraft } = get();

        // validation
        if (!draft.mealName.trim()) {
          set({ submitStatus: 'error', submitError: 'Meal name is required' });
          return;
        }
        if (!draft.cookTimeMinutes) {
          set({ submitStatus: 'error', submitError: 'Cook time is required' });
          return;
        }
        if (!draft.difficulty) {
          set({ submitStatus: 'error', submitError: 'Difficulty is required' });
          return;
        }
        if (!draft.dishType) {
          set({ submitStatus: 'error', submitError: 'Dish type is required' });
          return;
        }

        set({ submitStatus: 'loading', submitError: undefined });

        try {
          const steps = draft.steps
            .sort((a, b) => a.order - b.order)
            .map(s => s.text.trim())
            .filter(Boolean);

          await firestore()
            .collection('meals')
            .add({
              chefId: DEMO_CHEF_ID,

              mealName: draft.mealName.trim(),
              mealImage: draft.imageLocalUri ?? '', // later: replace with Storage URL
              description: '',

              servings: draft.servings ?? 1,
              cookTimeMinutes: draft.cookTimeMinutes,
              difficulty: draft.difficulty,
              dishType: draft.dishType,

              dietaryTargets: draft.dietaryTargets, // array
              tagIds: draft.hashTags, // TEMP (later: real tagIds)

              ingredients: draft.ingredients,
              steps, // string[]

              ratingAvg: 0,
              ratingCount: 0,
              likeCount: 0,
              commentCount: 0,

              status: 'published',
              createdAt: firestore.FieldValue.serverTimestamp(),
              updatedAt: firestore.FieldValue.serverTimestamp(),
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

      // ===== Tags =====
      tagsById: {},
      listenTags: () =>
        firestore()
          .collection('tags')
          .onSnapshot(
            snap => {
              const tagsById: Record<Id, Tag> = {};
              snap.docs.forEach(
                doc => (tagsById[doc.id] = toTag(doc.id, doc.data())),
              );
              set({ tagsById });
            },
            err => console.log('listenTags error', err),
          ),

      // ===== Chefs =====
      chefsById: {},
      listenChefs: () =>
        firestore()
          .collection('chefs')
          .where('isChef', '==', true)
          .onSnapshot(
            snap => {
              const chefsById: Record<Id, Chef> = {};
              snap.docs.forEach(
                doc => (chefsById[doc.id] = toChef(doc.id, doc.data())),
              );
              set({ chefsById });
            },
            err => console.log('listenChefs error', err),
          ),

      // ===== Meals =====
      mealsById: {},
      mealsIds: [],
      listenMeals: () =>
        firestore()
          .collection('meals')
          .orderBy('createdAt', 'desc')
          .onSnapshot(
            snap => {
              console.log('🔥 meals snapshot size:', snap.size);
              const meals = snap.docs.map(d => toMeal(d.id, d.data()));
              console.log('🔥 first meal raw:', snap.docs[0]?.data());
              console.log('🔥 first meal mapped:', meals[0]);

              const mealsById: Record<Id, Meal> = {};
              const mealsIds: Id[] = [];
              for (const m of meals) {
                mealsById[m.id] = m;
                mealsIds.push(m.id);
              }
              set({ mealsById, mealsIds });
            },
            err => console.log('listenMeals error', err),
          ),

      // ===== Selectors =====
      mealsArray: () =>
        get()
          .mealsIds.map(id => get().mealsById[id])
          .filter(Boolean),
      mealsByChef: chefId =>
        get()
          .mealsIds.map(id => get().mealsById[id])
          .filter(m => m?.chefId === chefId) as Meal[],

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

      // Start all listeners with one call
      startListeners: () => {
        const unsubMeals = get().listenMeals();
        const unsubChefs = get().listenChefs();
        const unsubTags = get().listenTags();

        return () => {
          unsubMeals();
          unsubChefs();
          unsubTags();
        };
      },
    }),
    {
      name: 'meal-storage',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: s => ({ draft: s.draft }), // ✅ persist only draft
    },
  ),
);
