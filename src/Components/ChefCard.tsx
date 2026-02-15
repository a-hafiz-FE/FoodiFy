import React from 'react';
import { Image, Text, View } from 'react-native';

type props = { name: string; avatar: string };
const ChefCard = ({ name, avatar }: props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <Image
        source={{ uri: `${avatar}` }}
        style={{
          height: 48,
          width: 48,
          borderRadius: 99,
        }}
      />
      <Text style={{ fontSize: 20, fontWeight: 'semibold' }}>{name}</Text>
    </View>
  );
};

export default ChefCard;
