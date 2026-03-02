import { Pressable, View } from 'react-native';
import IngredientCard from './IngredientCard';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Ingredients = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        paddingHorizontal: 40,
        gap: 13,
      }}
    >
      <View style={{ gap: 8 }}>
        <IngredientCard />
        <IngredientCard />
        <IngredientCard />
      </View>
      <Pressable
        style={{
          height: 32,
          width: 32,
          backgroundColor: '#ADADAD',
          borderRadius: 99,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name="add-outline" size={24} color={'#FFFFFF'} />
      </Pressable>
    </View>
  );
};

export default Ingredients;
