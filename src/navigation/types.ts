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