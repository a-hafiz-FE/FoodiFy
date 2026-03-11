import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from './CustomButton';
import { DietaryTarget } from '../app/StoreConstants';

const dietaryOptions: { label: string; value: DietaryTarget }[] = [
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'High Fat', value: 'high_fat' },
  { label: 'Low Fat', value: 'low_fat' },
  { label: 'Lactose Free', value: 'lactose_free' },
  { label: 'Sugar Free', value: 'sugar_free' },
  { label: 'Gluten Free', value: 'gluten_free' },
];

type Props = {
  value?: DietaryTarget[];
  onChange: (next: DietaryTarget[]) => void;
};

const DietaryTargetFilter = ({ value = [], onChange }: Props) => {
  const toggle = (v: DietaryTarget) => {
    const isOn = value.includes(v);

    if (isOn) {
      onChange(value.filter(x => x !== v));
      return;
    }

    // mutual exclusion rule: high_fat vs low_fat
    const opposite =
      v === 'low_fat' ? 'high_fat' : v === 'high_fat' ? 'low_fat' : null;

    const next = opposite ? value.filter(x => x !== opposite) : value;
    onChange([...next, v]);
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
        Suggested Dietary Target
      </Text>

      <View
        style={{
          flexWrap: 'wrap',
          paddingHorizontal: 10,
          position: 'absolute',
          flexDirection: 'row',
          top: 50,
          gap: 5,
        }}
      >
        {dietaryOptions.map(opt => (
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

export default DietaryTargetFilter;
