import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FilterDrawer from '../../Components/FilterDrawer';
import HomeScreen from './HomeScreen';

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerType: 'front',
        swipeEnabled: true,
        drawerStyle: { width: 340 },
      }}
      drawerContent={props => <FilterDrawer {...props} />}
    >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
