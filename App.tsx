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

import RootNavigation from './src/navigation/RootNavigation';
import { useMealStore } from './src/app/mealStore';

import { getApp } from '@react-native-firebase/app';
import {
  getFirestore,
  collection,
  query,
  limit,
  getDocs,
} from '@react-native-firebase/firestore';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const opts = getApp().options;

  console.log('🔥 projectId:', opts.projectId);
  console.log('🔥 appId:', opts.appId);
  console.log('🔥 storageBucket:', opts.storageBucket);

  useEffect(() => {
    console.log('▶️ starting listeners');
    const stop = useMealStore.getState().startListeners();
    return () => {
      console.log('⏹️ stopping listeners');
      stop();
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const db = getFirestore();
        const q = query(collection(db, 'meals'), limit(1));
        const snap = await getDocs(q);

        console.log('🧪 meals get() size:', snap.size);
        console.log('🧪 first doc id:', snap.docs[0]?.id);
      } catch (e) {
        console.log('🧪 getDocs() error:', e);
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <RootNavigation />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
