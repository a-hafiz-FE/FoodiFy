import React from 'react';
import { TextInput, View, Pressable } from 'react-native';
import { styles } from '../../Home/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const SearchTopBar = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: '#4058A0',
        height: 119,
        borderBottomStartRadius: 12,
        borderBottomEndRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: 320,
          flexDirection: 'row',
          bottom: 17,
          position: 'absolute',
        }}
      >
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
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
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

export default SearchTopBar;
