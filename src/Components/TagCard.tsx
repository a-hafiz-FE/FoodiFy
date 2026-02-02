import React from 'react';
import { Text, View } from 'react-native';

const TagCard = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
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
      <Text style={{ fontSize: 16, fontWeight: 'semibold' }}>#TagName</Text>
    </View>
  );
};

export default TagCard;
