import { Meal, Tag, Chef } from './mealStore';

export const dummyMeals: Meal[] = [
  {
    id: 'm1',
    title: 'Chicken Shawarma Wrap',
    description:
      'Juicy spiced chicken wrapped with garlic sauce, pickles, and crunchy veggies in warm flatbread.',
    image:
      'https://cdn.sanity.io/images/g1s4qnmz/production/86ea7cc20cf83221e5a00e50828bab494c12f011-1364x1125.png',
    chefId: 'c1',
    tagsIds: ['t1', 't2'],
    rating: 4.7,
    timeMinutes: 35,
    difficulty: 'easy',
  },
  {
    id: 'm2',
    title: 'Classic Beef Burger',
    description:
      'A thick beef patty with melted cheese, crisp lettuce, tomatoes, and a toasted bun with house sauce.',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
    chefId: 'c2',
    tagsIds: ['t3', 't4'],
    rating: 4.3,
    timeMinutes: 45,
    difficulty: 'easy',
  },
  {
    id: 'm3',
    title: 'Spaghetti Alfredo',
    description:
      'Creamy parmesan Alfredo sauce tossed with spaghetti, finished with cracked pepper and herbs.',
    image:
      'https://www.cookingclassy.com/wp-content/uploads/2012/12/light-fettucine-alfredo.jpg',
    chefId: 'c3',
    tagsIds: ['t5', 't4'],
    rating: 4.5,
    timeMinutes: 40,
    difficulty: 'medium',
  },
  {
    id: 'm4',
    title: 'Grilled Salmon Bowl',
    description:
      'Grilled salmon served over a fresh bowl with grains, greens, and a bright lemon dressing.',
    image:
      'https://melissashealthykitchen.com/wp-content/uploads/2019/04/image2-79.jpg',
    chefId: 'c2',
    tagsIds: ['t6', 't7'],
    rating: 4.1,
    timeMinutes: 50,
    difficulty: 'medium',
  },
  {
    id: 'm5',
    title: 'Falafel Plate',
    description:
      'Crispy falafel with hummus, salad, pickles, and warm pita—perfect for a satisfying vegetarian meal.',
    image:
      'https://www.nonguiltypleasures.com/wp-content/uploads/2023/02/falafel-plate-square.jpg',
    chefId: 'c1',
    tagsIds: ['t1', 't8'],
    rating: 4.4,
    timeMinutes: 70,
    difficulty: 'medium',
  },
  {
    id: 'm6',
    title: 'Avocado Toast',
    description:
      'Creamy smashed avocado on toasted bread topped with chili flakes, lemon, and a pinch of salt.',
    image:
      'https://www.jessicagavin.com/wp-content/uploads/2020/07/avocado-toast-11-1024x1536.jpg',
    chefId: 'c4',
    tagsIds: ['t9', 't2', 't6'],
    rating: 3.9,
    timeMinutes: 15,
    difficulty: 'easy',
  },
  {
    id: 'm7',
    title: 'Tacos (3 pcs)',
    description:
      'Three street-style tacos loaded with seasoned filling, fresh salsa, and a squeeze of lime.',
    image:
      'https://img.freepik.com/premium-photo/three-tacos-plate-with-white-background_741910-1873.jpg',
    chefId: 'c5',
    tagsIds: ['t10', 't2'],
    rating: 4.2,
    timeMinutes: 30,
    difficulty: 'easy',
  },
  {
    id: 'm8',
    title: 'Mushroom Risotto',
    description:
      'Slow-stirred risotto with sautéed mushrooms, parmesan, and a silky finish—rich and comforting.',
    image:
      'https://www.recipetineats.com/tachyon/2019/10/Mushroom-Risotto_7.jpg?resize=71',
    chefId: 'c3',
    tagsIds: ['t5', 't8'],
    rating: 4.6,
    timeMinutes: 75,
    difficulty: 'professional',
  },
  {
    id: 'm9',
    title: 'Creamy Garlic Chicken Pasta',
    description:
      'Tender chicken in a creamy garlic sauce tossed with pasta—quick, cozy, and full of flavor.',
    image:
      'https://www.saltandlavender.com/wp-content/uploads/2021/08/garlic-chicken-pasta-recipe-1.jpg',
    chefId: 'c1',
    tagsIds: ['t_pasta', 't_chicken', 't_quick'],
    rating: 4.7,
    timeMinutes: 35,
    difficulty: 'easy',
  },
  {
    id: 'm10',
    title: 'Spicy Shrimp Tacos',
    description:
      'Spicy sautéed shrimp tucked into tortillas with crunchy slaw and a zesty lime crema.',
    image:
      'https://sweetpeaskitchen.com/wp-content/uploads/2021/06/Spicy-Shrimp-Tacos-with-Avocado-Crema-6-scaled.jpg',
    chefId: 'c2',
    tagsIds: ['t_tacos', 't_seafood', 't_spicy'],
    rating: 4.3,
    timeMinutes: 25,
    difficulty: 'easy',
  },
  {
    id: 'm11',
    title: 'Honey Mustard Salmon Bowl',
    description:
      'Salmon glazed with honey mustard over a healthy bowl with veggies and grains for balance.',
    image:
      'https://www.halfbakedharvest.com/wp-content/uploads/2025/04/Spicy-Honey-Mustard-Salmon-Bowls-7-scaled.jpg',
    chefId: 'c3',
    tagsIds: ['t_salmon', 't_healthy', 't_bowl'],
    rating: 4.9,
    timeMinutes: 55,
    difficulty: 'medium',
  },
  {
    id: 'm12',
    title: 'Classic Margherita Pizza',
    description:
      'Crispy crust, tomato sauce, fresh mozzarella, basil, and a drizzle of olive oil—simple and perfect.',
    image:
      'https://wilingga.com/wp-content/uploads/2025/09/Classic-Margherita-Pizza.jpg',
    chefId: 'c4',
    tagsIds: ['t_pizza', 't_vegetarian', 't_italian'],
    rating: 4.5,
    timeMinutes: 95,
    difficulty: 'professional',
  },
  {
    id: 'm13',
    title: 'Avocado & Egg Toast',
    description:
      'Toasted bread topped with avocado and a perfectly cooked egg—ideal for a quick breakfast.',
    image:
      'https://betterhomerecipes.com/wp-content/uploads/2025/09/Avocado_Egg_Toast_fzmctp.webp',
    chefId: 'c5',
    tagsIds: ['t_breakfast', 't_quick', 't_vegetarian'],
    rating: 4.1,
    timeMinutes: 20,
    difficulty: 'easy',
  },
  {
    id: 'm14',
    title: 'Beef Stir-Fry with Veggies',
    description:
      'Fast wok-style beef stir-fry with colorful vegetables and a savory Asian-inspired sauce.',
    image:
      'https://www.rachelcooks.com/wp-content/uploads/2022/09/Beef-Stir-Fry-with-Vegetables016-web-square.jpg',
    chefId: 'c6',
    tagsIds: ['t_beef', 't_asian', 't_quick'],
    rating: 4.6,
    timeMinutes: 35,
    difficulty: 'medium',
  },
  {
    id: 'm15',
    title: 'Chocolate Chip Pancakes',
    description:
      'Fluffy pancakes with melty chocolate chips—serve with maple syrup and a pat of butter.',
    image:
      'https://tornadoughalli.com/wp-content/uploads/2019/07/CHOCOLATE-CHIP-PANCAKES-12.jpg',
    chefId: 'c7',
    tagsIds: ['t_dessert', 't_breakfast', 't_sweet'],
    rating: 4.8,
    timeMinutes: 30,
    difficulty: 'easy',
  },
  {
    id: 'm16',
    title: 'Greek Salad with Feta',
    description:
      'Crisp cucumbers, tomatoes, olives, and feta tossed with olive oil and oregano—fresh and light.',
    image:
      'https://www.littlespicejar.com/wp-content/uploads/2019/06/Marinated-Feta-Greek-Salad-9.jpg',
    chefId: 'c8',
    tagsIds: ['t_salad', 't_healthy', 't_vegetarian'],
    rating: 4.2,
    timeMinutes: 20,
    difficulty: 'easy',
  },
  {
    id: 'm17',
    title: 'Butter Chicken Curry',
    description:
      'Creamy tomato-based curry with tender chicken and warm spices—best served with rice or naan.',
    image:
      'https://www.cookingclassy.com/wp-content/uploads/2021/01/butter-chicken-4.jpg',
    chefId: 'c9',
    tagsIds: ['t_curry', 't_chicken', 't_spicy'],
    rating: 4.9,
    timeMinutes: 90,
    difficulty: 'professional',
  },
  {
    id: 'm18',
    title: 'Lemon Herb Roasted Potatoes',
    description:
      'Oven-roasted potatoes with lemon, garlic, and herbs—crispy edges and fluffy inside.',
    image:
      'https://recipeviral.com/wp-content/uploads/2024/12/number0003_Lemon_Herb_Roasted_Potatoes_Amateur_photo_from_Reddi_fa9a1c43-0662-433f-9242-a648af13c446.png',
    chefId: 'c10',
    tagsIds: ['t_side', 't_vegetarian', 't_oven'],
    rating: 4.4,
    timeMinutes: 60,
    difficulty: 'medium',
  },
] as const;

export const dummyChefs: Chef[] = [
  {
    id: 'c1',
    name: 'Sara',
    avatarUrl: 'https://picsum.photos/seed/chef1/200/200',
    rating: 4.6,
  },
  {
    id: 'c2',
    name: 'Omar',
    avatarUrl: 'https://picsum.photos/seed/chef2/200/200',
    rating: 4.4,
  },
  {
    id: 'c3',
    name: 'Noura',
    avatarUrl: 'https://picsum.photos/seed/chef3/200/200',
    rating: 4.7,
  },
  {
    id: 'c4',
    name: 'Khalid',
    avatarUrl: 'https://picsum.photos/seed/chef4/200/200',
    rating: 4.2,
  },
  {
    id: 'c5',
    name: 'Lina',
    avatarUrl: 'https://picsum.photos/seed/chef5/200/200',
    rating: 4.5,
  },
  {
    id: 'c6',
    name: 'Fahad',
    avatarUrl: 'https://picsum.photos/seed/chef6/200/200',
    rating: 4.3,
  },
  {
    id: 'c7',
    name: 'Maha',
    avatarUrl: 'https://picsum.photos/seed/chef7/200/200',
    rating: 4.6,
  },
  {
    id: 'c8',
    name: 'Yousef',
    avatarUrl: 'https://picsum.photos/seed/chef8/200/200',
    rating: 4.1,
  },
  {
    id: 'c9',
    name: 'Aisha',
    avatarUrl: 'https://picsum.photos/seed/chef9/200/200',
    rating: 4.8,
  },
  {
    id: 'c10',
    name: 'Hassan',
    avatarUrl: 'https://picsum.photos/seed/chef10/200/200',
    rating: 4.4,
  },
] as const;

export const dummyTags: Tag[] = [
  { id: 't1', label: 'Middle Eastern' },
  { id: 't2', label: 'Quick' },
  { id: 't3', label: 'Burger' },
  { id: 't4', label: 'Classic' },
  { id: 't5', label: 'Italian' },
  { id: 't6', label: 'Healthy' },
  { id: 't7', label: 'Bowl' },
  { id: 't8', label: 'Vegetarian' },
  { id: 't9', label: 'Breakfast' },
  { id: 't10', label: 'Tacos' },

  { id: 't_pasta', label: 'Pasta' },
  { id: 't_chicken', label: 'Chicken' },
  { id: 't_quick', label: 'Quick' },
  { id: 't_tacos', label: 'Tacos' },
  { id: 't_seafood', label: 'Seafood' },
  { id: 't_spicy', label: 'Spicy' },
  { id: 't_salmon', label: 'Salmon' },
  { id: 't_healthy', label: 'Healthy' },
  { id: 't_bowl', label: 'Bowl' },
  { id: 't_pizza', label: 'Pizza' },
  { id: 't_vegetarian', label: 'Vegetarian' },
  { id: 't_italian', label: 'Italian' },
  { id: 't_breakfast', label: 'Breakfast' },
  { id: 't_beef', label: 'Beef' },
  { id: 't_asian', label: 'Asian' },
  { id: 't_dessert', label: 'Dessert' },
  { id: 't_sweet', label: 'Sweet' },
  { id: 't_salad', label: 'Salad' },
  { id: 't_curry', label: 'Curry' },
  { id: 't_side', label: 'Side' },
  { id: 't_oven', label: 'Oven' },
] as const;
