// StepCard.tsx
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  index: number;
  value: string;
  onRemove: () => void;
};

const StepCard = ({ index, value, onRemove }: Props) => {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        padding: 4,
        borderRadius: 6,
        flexDirection: 'row',
        gap: 10,
        minHeight: 40,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          height: 22,
          width: 22,
          backgroundColor: '#FF6339',
          borderRadius: 4,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            color: '#FFFFFF',
          }}
        >
          {index + 1}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 16,
          width: 280,
          marginLeft: 30,
        }}
      >
        {value}
      </Text>

      <Pressable
        onPress={onRemove}
        style={{
          height: 19,
          width: 19,
          borderRadius: 99,
          backgroundColor: '#ADADAD',
          alignSelf: 'flex-end',
        }}
      >
        <Ionicons name="remove" size={20} color="#fff" />
      </Pressable>
    </View>
  );
};

export default StepCard;
