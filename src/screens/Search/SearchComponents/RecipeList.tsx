import React from 'react';
import { View, FlatList } from 'react-native';
import { styles } from '../styles';
import CarouselCard from '../../../Components/CarouselCard';
import { useMealStore } from '../../../app/mealStore';

const RecipeList = () => {
  const { meals } = useMealStore();
  return (
    <View style={styles.RecipeListStyle}>
      <FlatList
        data={meals}
        renderItem={meal => (
          <CarouselCard
            title={meal.item.title}
            rating={meal.item.rating}
            image={meal.item.image}
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
