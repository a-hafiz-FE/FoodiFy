import React from 'react';
import { View, FlatList } from 'react-native';
import { styles } from '../styles';
import CarouselCard from '../../../Components/CarouselCard';

const data = [
  {
    id: '1',
    title: 'Creamy Garlic Chicken Pasta',
    star: 4.7,
    image: 'https://picsum.photos/seed/recipe1/600/400',
    timeMin: 25,
    calories: 620,
    chef: 'Sara',
    tags: ['Pasta', 'Chicken', 'Quick'],
  },
  {
    id: '2',
    title: 'Spicy Shrimp Tacos',
    star: 4.3,
    image: 'https://picsum.photos/seed/recipe2/600/400',
    timeMin: 18,
    calories: 480,
    chef: 'Omar',
    tags: ['Tacos', 'Seafood', 'Spicy'],
  },
  {
    id: '3',
    title: 'Honey Mustard Salmon Bowl',
    star: 4.9,
    image: 'https://picsum.photos/seed/recipe3/600/400',
    timeMin: 20,
    calories: 540,
    chef: 'Noura',
    tags: ['Salmon', 'Healthy', 'Bowl'],
  },
  {
    id: '4',
    title: 'Classic Margherita Pizza',
    star: 4.5,
    image: 'https://picsum.photos/seed/recipe4/600/400',
    timeMin: 35,
    calories: 710,
    chef: 'Khalid',
    tags: ['Pizza', 'Vegetarian', 'Italian'],
  },
  {
    id: '5',
    title: 'Avocado & Egg Toast',
    star: 4.1,
    image: 'https://picsum.photos/seed/recipe5/600/400',
    timeMin: 10,
    calories: 360,
    chef: 'Lina',
    tags: ['Breakfast', 'Quick', 'Vegetarian'],
  },
  {
    id: '6',
    title: 'Beef Stir-Fry with Veggies',
    star: 4.6,
    image: 'https://picsum.photos/seed/recipe6/600/400',
    timeMin: 22,
    calories: 590,
    chef: 'Fahad',
    tags: ['Beef', 'Asian', 'Quick'],
  },
  {
    id: '7',
    title: 'Chocolate Chip Pancakes',
    star: 4.8,
    image: 'https://picsum.photos/seed/recipe7/600/400',
    timeMin: 15,
    calories: 510,
    chef: 'Maha',
    tags: ['Dessert', 'Breakfast', 'Sweet'],
  },
  {
    id: '8',
    title: 'Greek Salad with Feta',
    star: 4.2,
    image: 'https://picsum.photos/seed/recipe8/600/400',
    timeMin: 12,
    calories: 290,
    chef: 'Yousef',
    tags: ['Salad', 'Healthy', 'Vegetarian'],
  },
  {
    id: '9',
    title: 'Butter Chicken Curry',
    star: 4.9,
    image: 'https://picsum.photos/seed/recipe9/600/400',
    timeMin: 40,
    calories: 760,
    chef: 'Aisha',
    tags: ['Curry', 'Chicken', 'Spicy'],
  },
  {
    id: '10',
    title: 'Lemon Herb Roasted Potatoes',
    star: 4.4,
    image: 'https://picsum.photos/seed/recipe10/600/400',
    timeMin: 30,
    calories: 420,
    chef: 'Hassan',
    tags: ['Side', 'Vegetarian', 'Oven'],
  },
];

const RecipeList = () => {
  return (
    <View style={styles.RecipeListStyle}>
      <FlatList
        data={data}
        renderItem={card => <CarouselCard />}
        keyExtractor={card => card.id}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default RecipeList;
