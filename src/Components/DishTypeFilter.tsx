import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import CustomButton from './CustomButton';
import { DishType } from '../app/StoreConstants';

const dishTypeOptions: { label: string; value: DishType }[] = [
  { label: 'Breakfast', value: 'breakfast' },
  { label: 'Lunch', value: 'lunch' },
  { label: 'Snack', value: 'snack' },
  { label: 'Brunch', value: 'brunch' },
  { label: 'Dessert', value: 'dessert' },
  { label: 'Dinner', value: 'dinner' },
  { label: 'Appetizers', value: 'appetizers' },
];

type Props = {
  value?: DishType[];                 // ✅ optional
  onChange: (next: DishType[]) => void;
};

const DishTypeFilter = ({ value = [], onChange }: Props) => {
  const toggle = (v: DishType) => {
    onChange(value.includes(v) ? value.filter(x => x !== v) : [...value, v]);
  };

  return (
    <View
      style={{
        height: 148,
        backgroundColor: '#4058A0',
        marginTop: 8,
        borderRadius: 8,
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
        Dish Type
      </Text>

      <View
        style={{
          flexWrap: 'wrap',
          paddingHorizontal: 10,
          position: 'absolute',
          flexDirection: 'row',
          top: 50,
          gap: 10,
        }}
      >
        {dishTypeOptions.map(opt => (
          <CustomButton
            key={opt.value}
            text={opt.label}
            selected={value.includes(opt.value)}
            onPress={() => toggle(opt.value)}
          />
        ))}
      </View>
    </View>
  );
};

export default DishTypeFilter;
