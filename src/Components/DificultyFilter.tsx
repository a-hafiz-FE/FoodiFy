import React from 'react';
import { View, Text, Pressable } from 'react-native';
import CustomButton from './CustomButton';

const DificultyOptions = ['Easy', 'Meduim', 'Professional'];

type props = { clearSignal: number };

const DificultyFilter = ({ clearSignal }: props) => {
  const [selected, setSelected] = React.useState<string | null>(null);

  React.useEffect(() => {
    setSelected(null);
  }, [clearSignal]);

  const toggle = (label: string) => {
    setSelected(prev => (prev === label ? null : label));
  };
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
        Dificulty
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
        {DificultyOptions.map(label => (
          <CustomButton
            key={label}
            text={label}
            selected={selected === label}
            onPress={() => toggle(label)}
          />
        ))}
      </View>
    </View>
  );
};

export default DificultyFilter;
