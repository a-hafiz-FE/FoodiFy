import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

type props = {
  recipeRating: number;
  time: number;
  difficulty: string;
  recipeImage: string;
  recipeName: string;
  chefName: string;
  chefImage: string;
  chefRating: number;
  recipeDesc: string;
};
const RecipeCard = ({
  recipeRating,
  time,
  difficulty,
  recipeImage,
  recipeName,
  chefName,
  chefImage,
  chefRating,
  recipeDesc,
}: props) => {
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        height: 187,
        width: '100%',
        borderRadius: 8,
        marginBottom: 20,
        borderColor: '#cbcbcb',
        borderWidth: 1,
        flex: 1,
        padding: 4,
        flexDirection: 'row',
        gap: 16,
      }}
    >
      <View
        style={{
          height: 175,
          width: 138,
          borderRadius: 10,
          position: 'relative',
        }}
      >
        <Image
          source={{ uri: `${recipeImage}` }}
          style={{
            height: 175,
            width: 138,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            position: 'absolute',
            marginLeft: 10,
            marginTop: 10,
            backgroundColor: '#353535',
            borderRadius: 4,
            paddingHorizontal: 5,
            paddingVertical: 4,
            flexDirection: 'row',
            gap: 4,
          }}
        >
          <Ionicons name="star-outline" size={17} color={'#fff'} />
          <Text style={{ color: '#fff' }}>{recipeRating}</Text>
        </View>

        <Text
          style={{
            position: 'absolute',
            bottom: 10,
            alignSelf: 'center',
            fontSize: 16,
            fontWeight: 'normal',
            color: '#fff',
          }}
        >
          {time} | {difficulty}
        </Text>
      </View>

      <View style={{ flex: 1, gap: 6 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'medium',
            letterSpacing: 0,
          }}
        >
          {recipeName}
        </Text>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Image
            style={{
              height: 37,
              width: 37,
              borderRadius: 99,
            }}
            source={{ uri: `${chefImage}` }}
          />
          <View style={{ gap: 3, flexDirection: 'column' }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'semibold',
                color: '#717171',
              }}
            >
              {chefName}
            </Text>
            <View
              style={{
                backgroundColor: '#DEE21B',
                gap: 4,
                paddingHorizontal: 5,
                borderRadius: 22,
                alignSelf: 'flex-start',
                flexDirection: 'row',
              }}
            >
              <Ionicons name="star-outline" size={17} color={'#000'} />
              <Text style={{ color: '#000' }}>{chefRating}</Text>
            </View>
          </View>
        </View>

        <Text
          numberOfLines={4}
          style={{
            textAlign: 'left',
            marginRight: 40,
          }}
        >
          {recipeDesc}
        </Text>
      </View>

      <Pressable
        style={{
          backgroundColor: '#FF6339',
          height: 32,
          width: 32,
          position: 'absolute',
          right: 0,
          bottom: 40,
          borderRadius: 7,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name="send-outline" size={22} color="#FFD9CD" />
      </Pressable>
    </View>
  );
};

export default RecipeCard;
