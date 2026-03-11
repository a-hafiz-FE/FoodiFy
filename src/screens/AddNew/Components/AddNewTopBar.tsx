import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  onBack?: () => void;
  onClearAll?: () => void;
};

const AddNewTopBar = ({ onBack, onClearAll }: Props) => {
  return (
    <View
      style={{
        backgroundColor: '#4058A0',
        height: 119,
        width: '100%',
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        paddingHorizontal: 25,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Pressable onPress={onBack} hitSlop={10}>
          <Ionicons name={'chevron-back-outline'} size={24} color={'#FFF'} />
        </Pressable>

        <Text
          style={{
            color: '#FFF',
            fontSize: 26,
            left: 12,
          }}
        >
          New Recipe
        </Text>

        <Pressable onPress={onClearAll} hitSlop={10}>
          <Text style={{ color: '#FFF', fontSize: 14 }}>Clear All</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddNewTopBar;
