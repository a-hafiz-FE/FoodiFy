import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import CustomButton from './CustomButton';

const DietaryOptions = [
  'Vegetarian',
  'High Fat',
  'Low Fat',
  'Lactose Free',
  'Sugar Free',
  'Gluten Free',
];

type props = { clearSignal: number };

const DietaryTargetFilter = ({ clearSignal }: props) => {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected([]);
  }, [clearSignal]);

  const toggle = (label: string) => {
    setSelected(prev => {
      const isOn = prev.includes(label);

      // toggle OFF
      if (isOn) return prev.filter(x => x !== label);

      // toggle ON with mutual-exclusion rule
      const opposite =
        label === 'Low Fat'
          ? 'High Fat'
          : label === 'High Fat'
          ? 'Low Fat'
          : null;

      const withoutOpposite = opposite
        ? prev.filter(x => x !== opposite)
        : prev;

      return [...withoutOpposite, label];
    });
  };

  return (
    <View
      style={{
        height: 148,
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
        {DietaryOptions.map(label => (
          <CustomButton
            key={label}
            text={label}
            selected={selected.includes(label)}
            onPress={() => toggle(label)}
          />
        ))}
      </View>
    </View>
  );
};

export default DietaryTargetFilter;
