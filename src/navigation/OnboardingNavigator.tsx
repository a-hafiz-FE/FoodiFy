import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/Onboarding/SplashScreen';
import IntroScreen from '../screens/Onboarding/IntroScreen';
import SignInScreen from '../screens/Onboarding/SignInScreen';
import SignUpScreen from '../screens/Onboarding/SignUpScreen';
import VerifyPhoneScreen from '../screens/Onboarding/VerifyPhoneScreen';
import OtpScreen from '../screens/Onboarding/OtpScreen';
import { useOnboardingStore } from '../app/onboardingStore';

export type OnboardingStackParamList = {
  Splash: undefined;
  Intro: undefined;
  SignIn: undefined;
  SignUp: undefined;
  VerifyPhone: undefined;
  Otp: { phoneNumber: string };
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator = () => {
  const hasSeenIntro = useOnboardingStore(s => s.hasSeenIntro);
  const completeIntro = useOnboardingStore(s => s.completeIntro);
  const [splashDone, setSplashDone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  // Show splash first, then determine initial route
  if (!splashDone) {
    return <SplashScreen onFinish={() => setSplashDone(true)} />;
  }

  return (
    <Stack.Navigator
      initialRouteName={hasSeenIntro ? 'SignIn' : 'Intro'}
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="Intro">
        {({ navigation }) => (
          <IntroScreen
            onDone={() => {
              completeIntro();
              navigation.replace('SignIn');
            }}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="SignIn">
        {({ navigation }) => (
          <SignInScreen
            onSignUp={() => navigation.navigate('SignUp')}
            onForgotPassword={() => {
              // TODO: navigate to ForgotPassword screen
            }}
            onSuccess={() => navigation.replace('VerifyPhone')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="SignUp">
        {({ navigation }) => (
          <SignUpScreen
            onSignIn={() => navigation.navigate('SignIn')}
            onSuccess={() => navigation.replace('VerifyPhone')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="VerifyPhone">
        {({ navigation }) => (
          <VerifyPhoneScreen
            onSubmit={phone => {
              setPhoneNumber(phone);
              navigation.navigate('Otp', { phoneNumber: phone });
            }}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Otp">
        {({ route }) => (
          <OtpScreen
            phoneNumber={(route.params as any)?.phoneNumber ?? phoneNumber}
            onVerified={() => {
              // Auth is complete — App.tsx will switch to main navigator
              // because isAuthenticated is now true in the store
            }}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
