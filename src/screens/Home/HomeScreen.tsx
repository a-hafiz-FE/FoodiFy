import React, { useMemo } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { styles } from './styles';

import HomeTopBar from './HomeComponents/HomeTopBar';
import CarouselCard from '../../Components/CarouselCard';
import RecipeCard from '../../Components/RecipeCard';
import { useMealStore } from '../../app/mealStore';

const HomeScreen = () => {
  // 1) get ids + maps from store
  const mealsIds = useMealStore(s => s.mealsIds);
  const mealsById = useMealStore(s => s.mealsById);
  const getMealCard = useMealStore(s => s.getMealCard);

  // 2) Popular Recipes (first 5)
  const popularMeals = useMemo(() => {
    return mealsIds
      .slice(0, 5)
      .map(id => mealsById[id])
      .filter(Boolean);
  }, [mealsIds, mealsById]);

  // 3) Latest Recipes cards (first 3 with chef+tags)
  const latestCards = useMemo(() => {
    return mealsIds
      .slice(0, 3)
      .map(id => getMealCard(id))
      .filter(Boolean);
  }, [mealsIds, getMealCard]);

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <HomeTopBar />
      {/* Main Screen */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Scroll View */}
          <View
            style={{
              height: 285,
              marginVertical: 20,
              backgroundColor: '#F6FBF4',
            }}
          >
            <Text style={{ fontSize: 32, marginVertical: 10, marginLeft: 10 }}>
              Popular Recipes
            </Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={popularMeals}
              renderItem={({ item }) => (
                <CarouselCard
                  title={item.mealName}
                  rating={item.ratingAvg}
                  image={item.mealImage}
                />
              )}
            />
          </View>

          <View
            style={{
              backgroundColor: '#f6fbf4',
              borderRadius: 10,
              marginHorizontal: 10,
              marginBottom: 40,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 32,
                marginVertical: 10,
              }}
            >
              The Latest Recipes
            </Text>
            {latestCards.map(item => (
              <RecipeCard
                key={item?.id}
                recipeRating={item?.ratingAvg ?? 0}
                time={item?.cookTimeMinutes ?? 0}
                difficulty={item?.difficulty ?? ''}
                recipeImage={item?.mealImage ?? ''}
                recipeName={item?.mealName ?? ''}
                chefName={item?.chef?.displayName ?? ''}
                chefImage={item?.chef?.avatarUrl ?? ''}
                chefRating={item?.chef?.ratingAvg ?? 0}
                recipeDesc={item?.description ?? ''}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
