import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddNewTopBar = () => {
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
        <Pressable>
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

        <Pressable>
          <Text style={{ color: '#FFF', fontSize: 14 }}>Clear All</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddNewTopBar;
