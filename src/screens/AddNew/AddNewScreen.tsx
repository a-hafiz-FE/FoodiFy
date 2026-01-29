import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../Home/styles';

const AddNewScreen = () => {
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={styles.text}>Add New Screen</Text>
    </View>
  );
};

export default AddNewScreen;
