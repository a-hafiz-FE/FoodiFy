import { Pressable, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IngredientCard = () => {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        width: '100%',
        padding: 4,
        borderRadius: 6,
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'nowrap',
      }}
    >
      <View
        style={{
          height: 22,
          width: 22,
          backgroundColor: '#FF6339',
          borderRadius: 4,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'semibold',
            color: '#FFFFFF',
          }}
        >
          01
        </Text>
      </View>
      <Text style={{ fontSize: 16, width: 300 }}>2 cups all-purpose flour</Text>
      <Pressable
        style={{
          height: 19,
          width: 19,
          borderRadius: 99,
          backgroundColor: '#ADADAD',
          alignSelf: 'flex-end',
          // alignItems: 'center',
        }}
      >
        <Ionicons name="remove" size={20} color={'#FFFFFF'} />
      </Pressable>
    </View>
  );
};

export default IngredientCard;
