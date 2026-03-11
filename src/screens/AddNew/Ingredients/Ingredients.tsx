import { FlatList, Pressable, View } from 'react-native';
import IngredientCard from './IngredientCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import AddIngredientModal from './AddIngredientModel';

type Props = {
  ingredients: string[];
  setIngredients: (next: string[]) => void;
};

const Ingredients = ({ ingredients, setIngredients }: Props) => {
  const [open, setOpen] = useState(false);

  const addIngredient = (text: string) => {
    setIngredients([...ingredients, text]);
    setOpen(false);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <View style={{ marginBottom: 60, paddingHorizontal: 20, paddingBottom: 20 }}>
      <AddIngredientModal
        visible={open}
        onClose={() => setOpen(false)}
        onSubmit={addIngredient}
      />

      <FlatList
        data={ingredients}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={{ gap: 10, paddingBottom: 10 }}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item, index }) => (
          <IngredientCard
            index={index}
            value={item}
            onRemove={() => removeIngredient(index)}
          />
        )}
      />

      <Pressable
        onPress={() => setOpen(true)}
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