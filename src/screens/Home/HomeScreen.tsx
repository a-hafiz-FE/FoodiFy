import React, { useMemo } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { styles } from './styles';

import HomeTopBar from './HomeComponents/HomeTopBar';
import CarouselCard from '../../Components/CarouselCard';
import RecipeCard from '../../Components/RecipeCard';
import { useMealStore } from '../../app/mealStore';

const HomeScreen = () => {
  const mealsArray = useMealStore(s => s.mealsArray);
  const meals = useMemo(() => mealsArray().slice(0, 5), [mealsArray]);

  const mealsIds = useMealStore(s => s.mealsIds);
  const getMealCard = useMealStore(s => s.getMealCard);

  const cards = useMemo(
    () => mealsIds.map(id => getMealCard(id)).slice(0, 3),
    [mealsIds, getMealCard],
  );

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
              data={meals}
              renderItem={({ item }) => (
                <CarouselCard
                  title={item.title}
                  rating={item.rating}
                  image={item.image}
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
            {cards.map(item => (
              <RecipeCard
                key={item?.id}
                recipeRating={item?.rating ?? 0}
                time={item?.timeMinutes ?? 0}
                difficulty={item?.difficulty ?? ''}
                recipeImage={item?.image ?? ''}
                recipeName={item?.title ?? ''}
                chefName={item?.chef?.name ?? ''}
                chefImage={item?.chef?.avatarUrl ?? ''}
                chefRating={item?.chef?.rating ?? 0}
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
