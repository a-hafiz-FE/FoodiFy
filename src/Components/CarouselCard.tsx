import React from 'react';
import { View, Text, Image } from 'react-native';

type props = { title: string; rating: number; image: string };
const CarouselCard = ({ title, rating, image }: props) => {
  return (
    <View
      style={{
        height: 199,
        width: 156,
        borderRadius: 8,
        marginHorizontal: 8,
      }}
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
        <Text style={{ color: '#fff' }}>Star</Text>
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
    </View>
  );
};

export default CarouselCard;
