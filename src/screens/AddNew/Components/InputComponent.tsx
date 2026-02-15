import React, { ReactNode } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';

type props = { title: string; height: number; children: ReactNode };

const InputComponent = ({ title, height, children }: props) => {
  return (
    <View
      style={{
        backgroundColor: '#4058A0',
        width: 348,
        flexDirection: 'column',
        flexWrap: 'wrap',
        minHeight: height,
        borderRadius: 8,
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
        {title}
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 15,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default InputComponent;
