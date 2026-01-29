import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../Home/styles';

const SearchScreen = () => {
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={styles.text}>Search Screen</Text>
    </View>
  );
};

export default SearchScreen;
