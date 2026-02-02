import React from 'react';
import { View, Text } from 'react-native';

const CarouselCard = () => {
  return (
    <View
      style={{
        height: 199,
        width: 156,
        backgroundColor: '#a8a8a8',
        borderRadius: 8,
        marginHorizontal: 8,
      }}
    >
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
        <Text style={{ color: '#fff' }}>4.5</Text>
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
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
        provident molestias voluptatum tempore cupiditate id ullam sed, nam est
        modi dolorum excepturi totam impedit consequuntur. Nam est perferendis
        nemo non!
      </Text>
    </View>
  );
};

export default CarouselCard;
