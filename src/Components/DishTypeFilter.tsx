import React from 'react';
import { View, Text, Pressable } from 'react-native';
import CustomButton from './CustomButton';

const DishOptions = [
  'Breakfast',
  'Lunch',
  'Snack',
  'Brunch',
  'Dessert',
  'Dinner',
  'Appetizers',
];

type props = { clearSignal: number };

const DishTypeFilter = ({ clearSignal }: props) => {
  const [selected, setSelected] = React.useState<string[]>([]);

  React.useEffect(() => {
    setSelected([]);
  }, [clearSignal]);
  const toggle = (label: string) => {
    setSelected(prev =>
      prev.includes(label) ? prev.filter(x => x !== label) : [...prev, label],
    );
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
        {DishOptions.map(label => (
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

export default DishTypeFilter;
