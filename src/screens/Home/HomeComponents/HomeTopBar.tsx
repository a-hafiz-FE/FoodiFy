import React from 'react';
import { View, Pressable, Image, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles';

const HomeTopBar = () => {
  return (
    <View style={styles.TopBar}>
      <Image
        source={require('../../../../assets/Logo.png')}
        style={styles.TopBarImage}
      />
      <View style={styles.SearchBar}>
        <Ionicons
          name="search-outline"
          size={24}
          color={'#000'}
          style={styles.Icon}
        />
        <TextInput style={styles.SearchInput} placeholder="Search" />
        <Pressable
          style={{
            backgroundColor: '#DEE21B',
            height: 40,
            width: 40,
            borderRadius: 8,
            marginLeft: 4,
          }}
          onPress={() => {}}
        >
          <Ionicons
            name="filter"
            size={20}
            color={'#000'}
            style={{ padding: 10 }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default HomeTopBar;
