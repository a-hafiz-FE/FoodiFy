export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  'Add New': undefined;
  Save: undefined;
  Profile: undefined;
};

// Add this separately for the app stack
export type AppStackParamList = {
  Tabs: undefined;
  RecipeScreen: { mealId: string };
};

// Onboarding flow
export type OnboardingStackParamList = {
  Splash: undefined;
  Intro: undefined;
  SignIn: undefined;
  SignUp: undefined;
  VerifyPhone: undefined;
  Otp: { phoneNumber: string };
};
