import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from './AppNavigator';

// ✅ Use this instead of useNavigation() anywhere you need to
// navigate to RecipeScreen — gives full TypeScript support
export const useAppNavigation = () =>
  useNavigation<NativeStackNavigationProp<AppStackParamList>>();
