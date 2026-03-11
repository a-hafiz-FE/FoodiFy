import React, { useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { styles } from '../styles';
import CarouselCard from '../../../Components/CarouselCard';
import { useMealStore } from '../../../app/mealStore';

const RecipeList = () => {
  const mealsArray = useMealStore(s => s.mealsArray);
  const meals = useMemo(() => mealsArray(), [mealsArray]);
  return (
    <View style={styles.RecipeListStyle}>
      <FlatList
        data={meals}
        renderItem={meal => (
          <CarouselCard
            title={meal.item.mealName}
            rating={meal.item.ratingAvg}
            image={meal.item.mealImage}
          />
        )}
        keyExtractor={meal => meal.id}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default RecipeList;
