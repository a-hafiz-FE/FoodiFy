import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMealStore } from '../app/mealStore';
import RecipeScreenImage from './RecipeScreenImage';

const RecipeScreen = () => {
  const { mealId } = useRoute().params as { mealId: string };

  const getMealCard = useMealStore(s => s.getMealCard);
  const meal = getMealCard(mealId);

  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // margin: 20,
      }}
    >
      <RecipeScreenImage
        mealImage={meal?.mealImage}
        ratingAvg={meal?.ratingAvg}
        onPress={() => navigation.goBack()}
      />

      <View
        style={{
          marginTop: 9,
          gap: 10,
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            backgroundColor: '#353535',
            width: 68,
            height: 48,
            borderBottomEndRadius: 40,
            borderTopEndRadius: 40,
          }}
        >
          <Image
            source={{ uri: meal?.chef?.avatarUrl }}
            style={{
              width: 48,
              height: 48,
              borderRadius: 99,
              position: 'absolute',
              end: 0,
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: '#353535',
            height: 48,
            width: '100%',
            borderTopStartRadius: 40,
            borderBottomStartRadius: 40,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            flexDirection: 'row',
          }}
        >
          <Text style={{ color: '#fff' }}>{meal?.chef?.displayName}</Text>

          <View
            style={{
              backgroundColor: '#DEE21B',
              gap: 4,
              paddingHorizontal: 5,
              borderRadius: 22,
              flexDirection: 'row',
              marginEnd: 80,
            }}
          >
            <Ionicons name="star-outline" size={17} color={'#000'} />
            <Text style={{ color: '#000' }}>{meal?.chef?.ratingAvg}</Text>
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: 8, marginTop: 7 }}>
        <View
          style={{
            backgroundColor: '#4058A0',
            width: '100%',
            height: 43,
            borderRadius: 8,
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: '500' }}>
            {meal?.mealName}
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            minHeight: 65,
            backgroundColor: '#EDEDED',
            marginTop: 5,
            borderRadius: 8,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
            paddingVertical: 2,
            paddingHorizontal: 10,
          }}
        >
          {meal?.dietaryTargets.map((target, index) => (
            <Text key={index}>{target}</Text>
          ))}
          <Text>{meal?.difficulty}</Text>
          <Text>{meal?.cookTimeMinutes}</Text>
        </View>
      </View>
    </View>
  );
};

export default RecipeScreen;
