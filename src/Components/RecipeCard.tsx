import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

const RecipeCard = () => {
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
          backgroundColor: '#cbcbcb',
          height: 175,
          width: 138,
          borderRadius: 10,
          position: 'relative',
        }}
      >
        <Image />
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
          <Text style={{ color: '#fff' }}>Star</Text>
          <Text style={{ color: '#fff' }}>4.5</Text>
        </View>

        <Text
          style={{
            position: 'absolute',
            bottom: 10,
            alignSelf: 'center',
            fontSize: 16,
            fontWeight: 'normal',
          }}
        >
          time | dificulty
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
          Recipe Name
        </Text>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Image
            style={{
              height: 37,
              width: 37,
              backgroundColor: '#cbcbcb',
              borderRadius: 99,
            }}
          />
          <View style={{ gap: 3, flexDirection: 'column', flex: 1 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'semibold',
                color: '#717171',
              }}
            >
              Chef Name
            </Text>
            <View
              style={{
                backgroundColor: '#DEE21B',
                gap: 4,
                paddingHorizontal: 5,
                paddingVertical: 4,
                borderRadius: 22,
                flexBasis: 'auto',
                alignSelf: 'flex-start',
                flexDirection: 'row',
              }}
            >
              <Text>Star</Text>
              <Text style={{ color: '#000' }}>3.8</Text>
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
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur
          consequuntur repellat itaque tempore nam quas nisi commodi,
          asperiores, dolore praesentium unde sunt! Corrupti eaque quia
          molestias? Cumque fuga adipisci pariatur!
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
