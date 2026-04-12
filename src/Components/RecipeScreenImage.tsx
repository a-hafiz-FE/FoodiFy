import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  mealImage: string | undefined;
  ratingAvg: number | undefined;
  onPress: () => void;
};
const RecipeScreenImage = ({ mealImage, ratingAvg, onPress }: Props) => {
  return (
    <View style={{ width: '100%', height: 320 }}>
      <Image
        source={{ uri: mealImage }}
        style={{
          width: '100%',
          height: '100%',
          // position: 'absolute',
          top: 0,
          objectFit: 'fill',
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      />
      <Pressable
        onPress={onPress}
        hitSlop={10}
        style={{ position: 'absolute', top: 60, start: 20 }}
      >
        <Ionicons name={'chevron-back-outline'} size={24} color={'#ffffff'} />
      </Pressable>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          marginLeft: 15,
          marginBottom: 11,
          backgroundColor: '#353535',
          borderRadius: 4,
          paddingHorizontal: 5,
          paddingVertical: 4,
          flexDirection: 'row',
          gap: 4,
        }}
      >
        <Ionicons name="star-outline" size={17} color={'#fff'} />
        <Text style={{ color: '#fff' }}>{ratingAvg}</Text>
      </View>

      <Pressable
        style={{
          position: 'absolute',
          bottom: 0,
          end: 0,
          marginBottom: 12,
          marginEnd: 102,
        }}
      >
        <Ionicons name="bookmark-outline" size={26} color={'#fff'} />
      </Pressable>

      <Pressable
        style={{
          position: 'absolute',
          bottom: 0,
          end: 0,
          marginBottom: 12,
          marginEnd: 68,
        }}
      >
        <Ionicons name="heart-outline" size={26} color={'#fff'} />
      </Pressable>

      <Pressable
        style={{
          position: 'absolute',
          bottom: 0,
          end: 0,
          marginBottom: 12,
          marginEnd: 32,
        }}
      >
        <Ionicons name="share-outline" size={26} color={'#fff'} />
      </Pressable>
    </View>
  );
};

export default RecipeScreenImage;
