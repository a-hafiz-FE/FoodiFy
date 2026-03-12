import React, { useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { styles } from '../styles';
import CarouselCard from '../../../Components/CarouselCard';
import { useMealStore } from '../../../app/mealStore';
import { useAppNavigation } from '../../../navigation/useAppNavigation';

const RecipeList = () => {
  const navigation = useAppNavigation();

  const mealsArray = useMealStore(s => s.mealsArray);
  const meals = useMemo(() => mealsArray(), [mealsArray]);

  return (
    <View style={styles.RecipeListStyle}>
      <FlatList
        data={meals}
        keyExtractor={meal => meal.id}
        renderItem={({ item }) => (
          <CarouselCard
            title={item.mealName}
            rating={item.ratingAvg}
            image={item.mealImage}
            onPress={
              () => navigation.navigate('RecipeScreen', { mealId: item.id }) // ✅ string, not string | undefined
            }
          />
        )}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default RecipeList;
