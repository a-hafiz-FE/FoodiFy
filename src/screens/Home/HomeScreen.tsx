import React, { useMemo } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { useAppNavigation } from '../../navigation/useAppNavigation';
import { styles } from './styles';

import HomeTopBar from './HomeComponents/HomeTopBar';
import CarouselCard from '../../Components/CarouselCard';
import RecipeCard from '../../Components/RecipeCard';
import { useMealStore } from '../../app/mealStore';

const HomeScreen = () => {
  const navigation = useAppNavigation();

  const mealsIds = useMealStore(s => s.mealsIds);
  const mealsById = useMealStore(s => s.mealsById);
  const getMealCard = useMealStore(s => s.getMealCard);

  const popularMeals = useMemo(() => {
    return mealsIds
      .slice(0, 5)
      .map(id => mealsById[id])
      .filter(Boolean);
  }, [mealsIds, mealsById]);

  const latestCards = useMemo(() => {
    return mealsIds
      .slice(0, 3)
      .map(id => getMealCard(id))
      .filter((card): card is NonNullable<typeof card> => card != null);
  }, [mealsIds, getMealCard]);

  return (
    <View style={styles.container}>
      <HomeTopBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
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
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <CarouselCard
                  title={item.mealName}
                  rating={item.ratingAvg}
                  image={item.mealImage}
                  onPress={() =>
                    navigation.navigate('RecipeScreen', { mealId: item.id })
                  }
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
            <Text style={{ fontSize: 32, marginVertical: 10 }}>
              The Latest Recipes
            </Text>
            {latestCards.map(item => (
              <RecipeCard
                key={item.id}
                recipeRating={item.ratingAvg}
                time={item.cookTimeMinutes}
                difficulty={item.difficulty}
                recipeImage={item.mealImage}
                recipeName={item.mealName}
                chefName={item.chef?.displayName ?? ''} // chef is still optional
                chefImage={item.chef?.avatarUrl ?? ''} // chef is still optional
                chefRating={item.chef?.ratingAvg ?? 0} // chef is still optional
                recipeDesc={item.description}
                onPress={() =>
                  navigation.navigate('RecipeScreen', { mealId: item.id })
                }
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
