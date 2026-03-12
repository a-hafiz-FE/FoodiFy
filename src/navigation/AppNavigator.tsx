import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootNavigation from './RootNavigation'; // your existing tab navigator
import RecipeScreen from '../Components/RecipeScreen';

export type AppStackParamList = {
  Tabs: undefined;
  RecipeScreen: { mealId: string };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* All tabs live here */}
      <Stack.Screen name="Tabs" component={RootNavigation} />
      {/* Pushed on top of any tab when a card is tapped */}
      <Stack.Screen name="RecipeScreen" component={RecipeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
