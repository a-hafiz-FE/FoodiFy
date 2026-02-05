import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';

type Id = string;
type Chef = { id: Id; name: string; avatarUrl: string; rating: number };
type Tag = { id: Id; label: string };
type Meal = {
  id: Id;
  title: string;
  image: string;
  chefId: string;
  tagsIds: string[];
  rating: number;
};

const dummyMeals: Meal[] = [
  {
    id: 'm1',
    title: 'Chicken Shawarma Wrap',
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
    chefId: 'c1',
    tagsIds: ['t1', 't2'],
    rating: 4.7,
  },
  {
    id: 'm2',
    title: 'Classic Beef Burger',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
    chefId: 'c2',
    tagsIds: ['t3', 't4'],
    rating: 4.3,
  },
  {
    id: 'm3',
    title: 'Spaghetti Alfredo',
    image:
      'https://unsplash.com/photos/a-blue-bowl-filled-with-pasta-on-top-of-a-counter-X6wi4AV4jJE',
    chefId: 'c3',
    tagsIds: ['t5', 't4'],
    rating: 4.5,
  },
  {
    id: 'm4',
    title: 'Grilled Salmon Bowl',
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80',
    chefId: 'c2',
    tagsIds: ['t6', 't7'],
    rating: 4.1,
  },
  {
    id: 'm5',
    title: 'Falafel Plate',
    image:
      'https://images.unsplash.com/photo-1604908554065-0f42b5a5c77b?auto=format&fit=crop&w=1200&q=80',
    chefId: 'c1',
    tagsIds: ['t1', 't8'],
    rating: 4.4,
  },
  {
    id: 'm6',
    title: 'Avocado Toast',
    image:
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
    chefId: 'c4',
    tagsIds: ['t9', 't2', 't6'],
    rating: 3.9,
  },
  {
    id: 'm7',
    title: 'Tacos (3 pcs)',
    image:
      'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1200&q=80',
    chefId: 'c5',
    tagsIds: ['t10', 't2'],
    rating: 4.2,
  },
  {
    id: 'm8',
    title: 'Mushroom Risotto',
    image:
      'https://images.unsplash.com/photo-1604908176997-125f25cc500f?auto=format&fit=crop&w=1200&q=80',
    chefId: 'c3',
    tagsIds: ['t5', 't8'],
    rating: 4.6,
  },
  {
    id: 'm9',
    title: 'Creamy Garlic Chicken Pasta',
    rating: 4.7,
    image: 'https://picsum.photos/seed/recipe1/600/400',
    chefId: 'c1', // Sara
    tagsIds: ['t_pasta', 't_chicken', 't_quick'],
  },
  {
    id: 'm10',
    title: 'Spicy Shrimp Tacos',
    rating: 4.3,
    image: 'https://picsum.photos/seed/recipe2/600/400',
    chefId: 'c2', // Omar
    tagsIds: ['t_tacos', 't_seafood', 't_spicy'],
  },
  {
    id: 'm11',
    title: 'Honey Mustard Salmon Bowl',
    rating: 4.9,
    image: 'https://picsum.photos/seed/recipe3/600/400',
    chefId: 'c3', // Noura
    tagsIds: ['t_salmon', 't_healthy', 't_bowl'],
  },
  {
    id: 'm12',
    title: 'Classic Margherita Pizza',
    rating: 4.5,
    image: 'https://picsum.photos/seed/recipe4/600/400',
    chefId: 'c4', // Khalid
    tagsIds: ['t_pizza', 't_vegetarian', 't_italian'],
  },
  {
    id: 'm13',
    title: 'Avocado & Egg Toast',
    rating: 4.1,
    image: 'https://picsum.photos/seed/recipe5/600/400',
    chefId: 'c5', // Lina
    tagsIds: ['t_breakfast', 't_quick', 't_vegetarian'],
  },
  {
    id: 'm14',
    title: 'Beef Stir-Fry with Veggies',
    rating: 4.6,
    image: 'https://picsum.photos/seed/recipe6/600/400',
    chefId: 'c6', // Fahad
    tagsIds: ['t_beef', 't_asian', 't_quick'],
  },
  {
    id: 'm15',
    title: 'Chocolate Chip Pancakes',
    rating: 4.8,
    image: 'https://picsum.photos/seed/recipe7/600/400',
    chefId: 'c7', // Maha
    tagsIds: ['t_dessert', 't_breakfast', 't_sweet'],
  },
  {
    id: 'm16',
    title: 'Greek Salad with Feta',
    rating: 4.2,
    image: 'https://picsum.photos/seed/recipe8/600/400',
    chefId: 'c8', // Yousef
    tagsIds: ['t_salad', 't_healthy', 't_vegetarian'],
  },
  {
    id: 'm17',
    title: 'Butter Chicken Curry',
    rating: 4.9,
    image: 'https://picsum.photos/seed/recipe9/600/400',
    chefId: 'c9', // Aisha
    tagsIds: ['t_curry', 't_chicken', 't_spicy'],
  },
  {
    id: 'm18',
    title: 'Lemon Herb Roasted Potatoes',
    rating: 4.4,
    image: 'https://picsum.photos/seed/recipe10/600/400',
    chefId: 'c10', // Hassan
    tagsIds: ['t_side', 't_vegetarian', 't_oven'],
  },
];

type MealsSlice = {
  meals: Meal[];
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

type Store = MealsSlice & ChefsSlice & TagsSlice;

const clamp = (n: number) => Math.min(5, Math.max(0, n));
const round1 = (n: number) => Math.round(n * 10) / 10;

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
      meals: dummyMeals,

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
    }),
    {
      name: 'storage',
    },
  ),
);
