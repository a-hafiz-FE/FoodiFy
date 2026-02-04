import React from 'react';
import { Pressable, Text } from 'react-native';

type props = {
  text: string;
  selected: boolean;
  onPress?: () => void;
};
const CustomButton = ({ text, selected = false, onPress }: props) => {
  return (
    <Pressable
      style={{
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: selected ? '#DEE21B' : '#ADADAD',
        backgroundColor: selected ? '#DEE21B' : 'transparent',
        borderRadius: 16,
        paddingHorizontal: 8,
        paddingVertical: 4,
      }}
      onPress={onPress}
    >
      <Text style={{ color: selected ? '#000' : '#fff' }}>{text}</Text>
    </Pressable>
  );
};

export default CustomButton;
