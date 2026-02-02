import React from 'react';
import { Text, View } from 'react-native';

const ChefCard = () => {
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
          height: 48,
          width: 48,
          backgroundColor: '#000',
          borderRadius: 99,
        }}
      />
      <Text style={{ fontSize: 16, fontWeight: 'semibold' }}>Chefs Name</Text>
    </View>
  );
};

export default ChefCard;
