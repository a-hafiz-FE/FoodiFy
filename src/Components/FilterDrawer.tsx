import React from 'react';
import { View, Text, Pressable } from 'react-native';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CookTime from './CookTime';
import DificultyFilter from './DificultyFilter';
import DishTypeFilter from './DishTypeFilter';
import DietaryTargetFilter from './DietaryTargetFilter';
import { ScrollView } from 'react-native-gesture-handler';
import { DrawerActions } from '@react-navigation/native';

const FilterDrawer = (props: DrawerContentComponentProps) => {
  const { navigation } = props;
  const [clearSignal, setClearSignal] = React.useState(0);

  const clearFilters = () => setClearSignal(n => n + 1);

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
        paddingVertical: 50,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
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

        <CookTime clearSignal={clearSignal} />

        <DificultyFilter clearSignal={clearSignal} />

        <DishTypeFilter clearSignal={clearSignal} />

        <DietaryTargetFilter clearSignal={clearSignal} />

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
            onPress={() => clearFilters()}
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
            onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
          >
            <Text style={{ color: '#fff' }}>Confirm</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default FilterDrawer;
