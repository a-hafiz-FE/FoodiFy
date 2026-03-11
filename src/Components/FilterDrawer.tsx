import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import { DrawerActions } from '@react-navigation/native';
import CookTime from './CookTime';
import DifficultyFilter from './DificultyFilter';
import DishTypeFilter from './DishTypeFilter';
import DietaryTargetFilter from './DietaryTargetFilter';
import { useMealStore } from '../app/mealStore';

const FilterDrawer = (props: DrawerContentComponentProps) => {
  const { navigation } = props;

  const searchFilters = useMealStore(s => s.searchFilters);
  const setSearchFilters = useMealStore(s => s.setSearchFilters);
  const clearSearchFilters = useMealStore(s => s.clearSearchFilters);

  const confirm = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

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

        <CookTime
          value={searchFilters.cookTimeMinutes}
          onChange={v => setSearchFilters({ cookTimeMinutes: v })}
        />

        <DifficultyFilter
          value={searchFilters.difficulty}
          onChange={v => setSearchFilters({ difficulty: v })}
        />

        <DishTypeFilter
          value={searchFilters.dishTypes}
          onChange={v => setSearchFilters({ dishTypes: v })}
        />

        <DietaryTargetFilter
          value={searchFilters.dietaryTargets}
          onChange={v => setSearchFilters({ dietaryTargets: v })}
        />

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
            onPress={clearSearchFilters}
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
            onPress={confirm} // this line here (confirm filters)
          >
            <Text style={{ color: '#fff' }}>Confirm</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default FilterDrawer;
