import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  title: string;
  rating: number;
  image: string;
  onPress: () => void; // ✅ parent handles navigation
};

const CarouselCard = ({ title, rating, image, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        height: 199,
        width: 156,
        borderRadius: 8,
        marginHorizontal: 8,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <Image
        source={{ uri: image }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          borderRadius: 8,
        }}
      />
      <View
        style={{
          position: 'absolute',
          marginLeft: 10,
          marginTop: 10,
          backgroundColor: '#353535',
          borderRadius: 4,
          paddingHorizontal: 5,
          paddingVertical: 4,
          flexDirection: 'row',
          gap: 4,
        }}
      >
        <Ionicons name="star-outline" size={17} color={'#fff'} />
        <Text style={{ color: '#fff' }}>{rating}</Text>
      </View>

      <Text
        numberOfLines={2}
        style={{
          fontSize: 12,
          fontWeight: 'bold',
          color: '#fff',
          bottom: 0,
          position: 'absolute',
          alignSelf: 'center',
          padding: 8,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default CarouselCard;