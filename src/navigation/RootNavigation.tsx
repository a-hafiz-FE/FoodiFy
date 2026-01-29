import React from 'react';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import { RootStackParamList } from './types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SaveScreen from '../screens/Save/SaveScreen';
import AddNewScreen from '../screens/AddNew/AddNewScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import { Text } from 'react-native';
import { styles } from './styles';
import AnimatedTabrBar from './AnimatedTabrBar';

const Tab = createBottomTabNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => <AnimatedTabrBar {...props} />}
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Add New" component={AddNewScreen} />
      <Tab.Screen name="Save" component={SaveScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default RootNavigation;
