/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import { useMealStore } from './src/app/mealStore';
import { useOnboardingStore } from './src/app/onboardingStore';

import AppNavigator from './src/navigation/AppNavigator';
import OnboardingNavigator from './src/navigation/OnboardingNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const isAuthenticated = useOnboardingStore(s => s.isAuthenticated);
  const currentUser = useOnboardingStore(s => s.currentUser);

  useEffect(() => {
    if (!isAuthenticated) return;
    const stop = useMealStore.getState().startListeners();
    return () => stop();
  }, [isAuthenticated]);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        {isAuthenticated && currentUser?.isVerified ? (
          <AppNavigator />
        ) : (
          <OnboardingNavigator />
        )}
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
