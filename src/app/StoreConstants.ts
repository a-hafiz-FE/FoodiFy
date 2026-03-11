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

export const normalizeDietary = (v: any): DietaryTarget[] => {
  if (Array.isArray(v))
    return v.map(x =>
      String(x).toLowerCase().replace(/\s+/g, '_'),
    ) as DietaryTarget[];
  if (typeof v === 'string' && v.trim())
    return [v.toLowerCase().replace(/\s+/g, '_')] as DietaryTarget[];
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

export const clamp = (n: number) => Math.min(5, Math.max(0, n));
export const round1 = (n: number) => Math.round(n * 10) / 10;

export const DEMO_CHEF_ID = 'nL8Yef29rsvRWg9IOUrB';

export const toTagId = (hash: string) =>
  hash
    .trim()
    .replace(/^#/, '')
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^\p{L}\p{N}_]/gu, '');

export const toTagLabel = (tagId: string) => `#${tagId}`;