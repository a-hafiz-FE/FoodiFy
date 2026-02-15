import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import { mmkvStorage } from './storage';
import { dummyMeals, dummyChefs, dummyTags } from './DummyMeals';

export type Difficulty = 'easy' | 'medium' | 'professional';
export type Id = string;
export type Chef = { id: Id; name: string; avatarUrl: string; rating: number };
export type Tag = { id: Id; label: string };
export type Meal = {
  id: Id;
  title: string;
  description: string;
  image: string;
  chefId: string;
  tagsIds: string[];
  rating: number;
  timeMinutes: number;
  difficulty: Difficulty;
};

const SEED_VERSION = 2;

type MealsSlice = {
  mealsById: Record<Id, Meal>;
  mealsIds: Id[];

  addmeal: (meal: Omit<Meal, 'id'>) => Id;
  upsertMeals: (meals: Meal[]) => void;

  mealsArray: () => Meal[];
  mealsByChef: (chefId: Id) => Meal[];
  getMealCard: (
    mealId: Id,
  ) => (Meal & { chef?: Chef; tags: Tag[] }) | undefined;
};

type ChefsSlice = {
  chefsById: Record<Id, Chef>;
  addChef: (chef: Omit<Chef, 'id'>) => Id;
  upsertChefs: (chefs: Chef[]) => void;
};

type TagsSlice = {
  tagsById: Record<Id, Tag>;
  addTag: (tag: Omit<Tag, 'id'>) => Id;
  upsertTags: (tags: Tag[]) => void;
};

type Store = MealsSlice &
  ChefsSlice &
  TagsSlice & {
    seedVersion: number;
    seedIfEmpty: () => void;
  };

const clamp = (n: number) => Math.min(5, Math.max(0, n));
const round1 = (n: number) => Math.round(n * 10) / 10;

const seedMeals = (meals: Meal[]) => {
  const mealsById: Record<Id, Meal> = {};
  const mealsIds: Id[] = [];

  for (const m of meals) {
    mealsById[m.id] = { ...m, rating: round1(clamp(m.rating)) };
    mealsIds.push(m.id);
  }

  return { mealsById, mealsIds };
};

const toMap = <T extends { id: Id }>(arr: readonly T[]) =>
  Object.fromEntries(arr.map(x => [x.id, x])) as Record<Id, T>;

export const useMealStore = create<Store>()(
  persist(
    (set, get) => ({
      // ====== Tag ======
      tagsById: {},

      addTag: tag => {
        const id = uuid();
        const fixedtags: Tag = {
          id,
          ...tag,
        };
        set(s => ({
          tagsById: { ...s.tagsById, [id]: fixedtags },
        }));
        return id;
      },

      upsertTags: tags =>
        set(s => {
          const next = { ...s.tagsById };
          tags.forEach(t => (next[t.id] = t));
          return { tagsById: next };
        }),

      // ======= Chef ========
      chefsById: {},

      addChef: chef => {
        const id = uuid();
        const fixedchefs: Chef = {
          id,
          ...chef,
          rating: round1(clamp(chef.rating)),
        };
        set(s => ({
          chefsById: { ...s.chefsById, [id]: fixedchefs },
        }));
        return id;
      },

      upsertChefs: chefs =>
        set(s => {
          const next = { ...s.chefsById };
          chefs.forEach(c => (next[c.id] = c));
          return { chefsById: next };
        }),

      // ======= Meal =======
      mealsById: {},
      mealsIds: [],

      addmeal: meal => {
        const id = uuid();
        const fixed: Meal = {
          id,
          ...meal,
          rating: round1(clamp(meal.rating)),
        };

        set(s => ({
          mealsById: { ...s.mealsById, [id]: fixed },
          mealsIds: [id, ...s.mealsIds],
        }));

        return id;
      },

      upsertMeals: meals =>
        set(s => {
          const nextById = { ...s.mealsById };
          const nextIds = [...s.mealsIds];

          for (const m of meals) {
            const exists = !!nextById[m.id];
            nextById[m.id] = {
              ...m,
              rating: round1(clamp(m.rating)),
            };
            if (!exists) nextIds.unshift(m.id);
          }

          return { mealsById: nextById, mealsIds: nextIds };
        }),

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
          tags: meal.tagsIds.map(id => tagsById[id]).filter(Boolean),
        };
      },

      seedVersion: 0,
      seedIfEmpty: () => {
        const { seedVersion } = get();
        if (seedVersion === SEED_VERSION) return;

        const seeded = seedMeals(dummyMeals);

        set(() => ({
          mealsById: seeded.mealsById,
          mealsIds: seeded.mealsIds,

          chefsById: toMap(dummyChefs),
          tagsById: toMap(dummyTags),
        }));
      },
    }),
    {
      name: 'meal-storage',
      partialize: s => ({
        mealsById: s.mealsById,
        mealsIds: s.mealsIds,
        chefsById: s.chefsById,
        tagsById: s.tagsById,
        seedVersion: s.seedVersion,
      }),
      storage: createJSONStorage(() => mmkvStorage),
      onRehydrateStorage: () => (state, error) => {
        if (error || !state) return;
        state.seedIfEmpty();
      },
    },
  ),
);
