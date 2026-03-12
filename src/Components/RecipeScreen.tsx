import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from '../screens/Home/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const RecipeScreen = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Pressable
        onPress={() => navigation.goBack()}
        hitSlop={10}
        style={{ position: 'absolute', top: 80, start: 25}}
      >
        <Ionicons name={'chevron-back-outline'} size={24} color={'#000000'} />
      </Pressable>
      <Text style={styles.text}>Recipe Screen</Text>
    </View>
  );
};

export default RecipeScreen;
