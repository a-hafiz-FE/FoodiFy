import React from 'react';
import { View, Text, Pressable } from 'react-native';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';

const FilterDrawer = (props: DrawerContentComponentProps) => {
  const { navigation } = props;
  return (
    <View
      style={{
        backgroundColor: '#F6FBF4',
        height: '100%',
        width: '100%',
        borderBottomStartRadius: 12,
        borderTopStartRadius: 12,
        paddingTop: 60,
        paddingHorizontal: 13,
      }}
    >
      <View
        style={{
          backgroundColor: '#DEE21B',
          borderRadius: 10,
          height: 40,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 7,
          paddingLeft: 5,
        }}
      >
        <Ionicons name="filter" size={32} color={'#000'} />
        <Text style={{ fontSize: 20 }}>Filters</Text>
      </View>

      <View
        style={{
          height: 111,
          backgroundColor: '#4058A0',
          marginTop: 20,
          borderRadius: 8,
        }}
      ></View>

      <View
        style={{
          height: 111,
          backgroundColor: '#4058A0',
          marginTop: 8,
          borderRadius: 8,
        }}
      ></View>

      <View
        style={{
          height: 148,
          backgroundColor: '#4058A0',
          marginTop: 8,
          borderRadius: 8,
        }}
      ></View>

      <View
        style={{
          height: 148,
          backgroundColor: '#4058A0',
          marginTop: 8,
          borderRadius: 8,
        }}
      ></View>

      <View style={{ marginTop: 33, flexDirection: 'row', gap: 10 }}>
        <Pressable
          style={{
            borderWidth: 1,
            borderRadius: 20,
            height: 40,
            width: '48%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Clear All</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: '#000',
            borderRadius: 20,
            height: 40,
            width: '48%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff' }}>Confirm</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FilterDrawer;
