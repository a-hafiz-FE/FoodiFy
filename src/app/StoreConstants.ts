export type DishType =
  | 'breakfast'
  | 'lunch'
  | 'snack'
  | 'brunch'
  | 'dessert'
  | 'dinner'
  | 'appetizers';

export type DietaryTarget =
  | 'vegetarian'
  | 'high_fat'
  | 'low_fat'
  | 'lactose_free'
  | 'sugar_free'
  | 'gluten_free';

export type Difficulty = 'easy' | 'medium' | 'professional';

export type Id = string;

export type Chef = {
  id: Id;
  displayName: string;
  avatarUrl: string;
  bio?: string;
  isChef: boolean;
  isVerified: boolean;
  ratingAvg: number;
  ratingCount: number;
};

export type Tag = { id: Id; label: string };

export type Step = { order: number; text: string };

export type Meal = {
  id: Id;
  chefId: Id;

  mealName: string;
  mealImage: string;
  description: string;

  servings: number;
  cookTimeMinutes: number;
  difficulty: Difficulty;
  dishTypes: DishType[];

  dietaryTargets: DietaryTarget[];
  tagIds: string[];

  ingredients: string[];
  steps: Step[]; // ✅ always { order, text }[] — both in memory and in Firestore

  ratingAvg: number;
  ratingCount: number;
  likeCount: number;
  commentCount: number;
};

export type Unsub = () => void;

export type MealDraft = {
  imageLocalUri: string | null;
  mealName: string;
  servings: number | null;
  cookTimeMinutes: number | null;
  difficulty: Difficulty | null;
  dishTypes: DishType[];
  dietaryTargets: DietaryTarget[];
  hashTags: string[];
  ingredients: string[];
  steps: Step[]; // ✅ same shape as Meal.steps — no transformation needed
};

export const defaultDraft: MealDraft = {
  mealName: '',
  imageLocalUri: null,
  servings: null,
  cookTimeMinutes: null,
  difficulty: null,
  dishTypes: [],
  dietaryTargets: [],
  hashTags: [],
  ingredients: [],
  steps: [],
};

export type SearchFilters = {
  cookTimeMinutes: number | null;
  difficulty: Difficulty | null;
  dishTypes: DishType[];
  dietaryTargets: DietaryTarget[];
};

export const defaultSearchFilters: SearchFilters = {
  cookTimeMinutes: null,
  difficulty: null,
  dishTypes: [],
  dietaryTargets: [],
};

const VALID_DIETARY_TARGETS = new Set<DietaryTarget>([
  'vegetarian',
  'high_fat',
  'low_fat',
  'lactose_free',
  'sugar_free',
  'gluten_free',
]);

const toDietaryTarget = (x: unknown): DietaryTarget | null => {
  const normalized = String(x).toLowerCase().replace(/\s+/g, '_');
  return VALID_DIETARY_TARGETS.has(normalized as DietaryTarget)
    ? (normalized as DietaryTarget)
    : null;
};

/**
 * Safely normalizes raw Firestore dietary target data into a validated
 * `DietaryTarget[]`, filtering out any values not present in the union.
 *
 * Accepts either an array of values or a single string (legacy format).
 * Unknown values are silently dropped rather than cast, so TypeScript's
 * type guarantee on `DietaryTarget` is actually upheld at runtime.
 *
 * @param v - Raw value from a Firestore document's `dietaryTargets` field.
 * @returns A validated array containing only known `DietaryTarget` values.
 */
export const normalizeDietary = (v: unknown): DietaryTarget[] => {
  if (Array.isArray(v))
    return v.map(toDietaryTarget).filter(Boolean) as DietaryTarget[];
  if (typeof v === 'string' && v.trim()) {
    const result = toDietaryTarget(v);
    return result ? [result] : [];
  }
  return [];
};

/**
 * Normalizes raw Firestore step data into a consistent `Step[]` shape.
 *
 * Handles two cases:
 *  - New format: Firestore contains `{ order, text }` objects — passed through directly.
 *  - Legacy format: Firestore contains plain strings (saved by the old submitDraft) —
 *    re-inflated to `{ order, text }` using the array index as the order.
 *
 * This dual handling ensures backward compatibility with any meals saved before
 * the steps inconsistency was fixed, while correctly reading all new meals.
 *
 * @param v - Raw value from a Firestore document's `steps` field.
 * @returns A normalized array of `Step` objects, or an empty array if input is invalid.
 */
export const normalizeSteps = (v: any): Step[] => {
  if (!Array.isArray(v)) return [];

  return v.map((x, i) => {
    // ✅ New format: already a { order, text } object
    if (typeof x === 'object' && x !== null && 'text' in x) {
      return {
        order: Number(x.order ?? i + 1),
        text: String(x.text),
      };
    }
    // ✅ Legacy format: plain string saved by the old submitDraft
    return { order: i + 1, text: String(x) };
  });
};

export const toMeal = (docId: string, d: any): Meal => ({
  id: docId,
  chefId: String(d.chefId ?? ''),

  mealName: String(d.mealName ?? ''),
  mealImage: String(d.mealImage ?? ''),
  description: String(d.description ?? ''),

  servings: Number(d.servings ?? 0),
  cookTimeMinutes: Number(d.cookTimeMinutes ?? 0),
  difficulty: (d.difficulty ?? 'easy') as Difficulty,
  dishTypes: Array.isArray(d.dishTypes) ? d.dishTypes : [],

  dietaryTargets: normalizeDietary(d.dietaryTargets),
  tagIds: Array.isArray(d.tagIds) ? d.tagIds.map(String) : [],

  ingredients: Array.isArray(d.ingredients) ? d.ingredients.map(String) : [],
  steps: normalizeSteps(d.steps), // ✅ handles both object and legacy string formats

  ratingAvg: Number(d.ratingAvg ?? 0),
  ratingCount: Number(d.ratingCount ?? 0),
  likeCount: Number(d.likeCount ?? 0),
  commentCount: Number(d.commentCount ?? 0),
});

export const toChef = (docId: string, d: any): Chef => ({
  id: docId,
  displayName: String(d.displayName ?? ''),
  avatarUrl: String(d.avatarUrl ?? ''),
  bio: d.bio ? String(d.bio) : undefined,
  isChef: Boolean(d.isChef),
  isVerified: Boolean(d.isVerified),
  ratingAvg: Number(d.ratingAvg ?? 0),
  ratingCount: Number(d.ratingCount ?? 0),
});

export const toTag = (docId: string, d: any): Tag => ({
  id: docId,
  label: String(d.label ?? ''),
});

export type MealsSlice = {
  mealsById: Record<Id, Meal>;
  mealsIds: Id[];

  mealsArray: () => Meal[];
  mealsByChef: (chefId: Id) => Meal[];
  getMealCard: (
    mealId: Id,
  ) => (Meal & { chef?: Chef; tags: Tag[] }) | undefined;

  listenMeals: () => () => void;
};

export type ChefsSlice = {
  chefsById: Record<Id, Chef>;
  listenChefs: () => () => void;
};

export type TagsSlice = {
  tagsById: Record<Id, Tag>;
  listenTags: () => () => void;
};

export type DraftSlice = {
  draft: MealDraft;
  setDraft: (patch: Partial<MealDraft>) => void;
  resetDraft: () => void;
  submitStatus: 'idle' | 'loading' | 'success' | 'error';
  submitError?: string;
  submitDraft: () => Promise<void>;
};

export type SearchSlice = {
  searchFilters: SearchFilters;
  setSearchFilters: (patch: Partial<SearchFilters>) => void;
  clearSearchFilters: () => void;
};

export type Store = MealsSlice &
  ChefsSlice &
  TagsSlice &
  DraftSlice &
  SearchSlice & {
    startListeners: () => () => void;
    listenersStarted: boolean;
    unsubs: { meals?: Unsub; chefs?: Unsub; tags?: Unsub };
    stopListeners: () => void;
    ensureTagsExist: (hashTags: string[]) => Promise<string[]>;
  };

// ─────────────────────────────────────────────
// RATING UTILITIES
// Used when computing or displaying aggregated
// rating values. Kept here as they operate on
// Meal data shape (ratingAvg range: 0–5).
// ─────────────────────────────────────────────

/** Clamps a rating value to the valid 0–5 range. */
export const clamp = (n: number) => Math.min(5, Math.max(0, n));

/** Rounds a rating to one decimal place (e.g. 4.666 → 4.7). */
export const round1 = (n: number) => Math.round(n * 10) / 10;

export const DEMO_CHEF_ID = 'nL8Yef29rsvRWg9IOUrB';

/**
 * Converts a raw hashtag string into a normalized Firestore document ID.
 *
 * Rules:
 *  - Strips leading `#`, lowercases, replaces spaces with `_`.
 *  - Removes any characters that aren't unicode letters, numbers, or `_`.
 *  - Returns `null` if the result is empty (e.g. input was "###" or "!@#"),
 *    so callers can filter invalid tags explicitly rather than getting a
 *    silent empty string that would create a Firestore doc at path `tags/`.
 *
 * @example
 * toTagId('#Low Fat') // → 'low_fat'
 * toTagId('###')      // → null
 */
export const toTagId = (hash: string): string | null => {
  const id = hash
    .trim()
    .replace(/^#+/, '')
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^\p{L}\p{N}_]/gu, '');
  return id.length > 0 ? id : null;
};

export const toTagLabel = (tagId: string) => `#${tagId}`;