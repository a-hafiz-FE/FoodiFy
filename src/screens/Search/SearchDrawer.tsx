import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SearchScreen from './SearchScreen';
import FilterDrawer from '../../Components/FilterDrawer';

const Drawer = createDrawerNavigator();

const SearchDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerType: 'front',
        swipeEnabled: false,
        drawerStyle: { width: 340 },
      }}
      drawerContent={props => <FilterDrawer {...props} />}
    >
      <Drawer.Screen name="SearchScreen" component={SearchScreen} />
    </Drawer.Navigator>
  );
};

export default SearchDrawer;
