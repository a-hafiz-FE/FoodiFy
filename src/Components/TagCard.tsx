import React from 'react';
import { Text, View } from 'react-native';

type props = { name: string };
const TagCard = ({ name }: props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <View
        style={{
          borderRadius: 99,
          borderWidth: 1,
          width: 48,
          height: 48,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 22 }}>#</Text>
      </View>
      <Text style={{ fontSize: 20, fontWeight: 'semibold' }}>{name}</Text>
    </View>
  );
};

export default TagCard;
