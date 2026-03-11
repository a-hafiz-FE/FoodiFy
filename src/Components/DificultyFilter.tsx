import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import CustomButton from './CustomButton';
import { Difficulty } from '../app/StoreConstants';

const difficultyOptions: { label: string; value: Difficulty }[] = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Professional', value: 'professional' },
];

type Props = {
  value: Difficulty | null;
  onChange: (next: Difficulty | null) => void;
};

const DifficultyFilter = ({ value, onChange }: Props) => {
  const toggle = (v: Difficulty) => onChange(value === v ? null : v);

  return (
    <View
      style={{
        height: 111,
        backgroundColor: '#4058A0',
        marginTop: 8,
        borderRadius: 8,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: 20,
      }}
    >
      <Text
        style={{
          backgroundColor: '#FF6339',
          color: '#fff',
          alignSelf: 'flex-start',
          paddingHorizontal: 20,
          paddingVertical: 4,
          borderRadius: 5,
        }}
      >
        Difficulty
      </Text>

      <View
        style={{
          paddingHorizontal: 10,
          position: 'absolute',
          flexDirection: 'row',
          top: 50,
          gap: 10,
        }}
      >
        {difficultyOptions.map(opt => (
          <CustomButton
            key={opt.value}
            text={opt.label}
            selected={value === opt.value} // ✅ single-select compare
            onPress={() => toggle(opt.value)}
          />
        ))}
      </View>
    </View>
  );
};

export default DifficultyFilter;
