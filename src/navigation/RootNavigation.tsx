import React, { useEffect } from 'react';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import { RootStackParamList } from './types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SaveScreen from '../screens/Save/SaveScreen';
import AddNewScreen from '../screens/AddNew/AddNewScreen';
import AnimatedTabrBar from './AnimatedTabrBar';
import SearchDrawer from '../screens/Search/SearchDrawer';
import HomeDrawer from '../screens/Home/HomeDrawer';

const Tab = createBottomTabNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => <AnimatedTabrBar {...props} />}
      initialRouteName="Home"
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeDrawer} />
      <Tab.Screen name="Search" component={SearchDrawer} />
      <Tab.Screen name="Add New" component={AddNewScreen} />
      <Tab.Screen name="Save" component={SaveScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default RootNavigation;
