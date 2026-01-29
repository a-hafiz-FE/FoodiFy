import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, Animated, Dimensions } from 'react-native';
import { styles } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AnimatedTabrBar = ({ state, navigation }: any) => {
  const screenwidth = Dimensions.get('screen').width;
  const tabWidth = (screenwidth - 50) / state.routes.length; // we’ll improve this later
  const indicatorX = useRef(new Animated.Value(state.index * tabWidth)).current;

  useEffect(() => {
    Animated.spring(indicatorX, {
      toValue: state.index * tabWidth,
      useNativeDriver: true,
      speed: 18,
      bounciness: 8,
    }).start();
  }, [state.index, tabWidth]);

  return (
    <View style={styles.TabBarContainer}>
      <Animated.Image
        style={{
          position: 'absolute',
          height: 35,
          width: 110,
          objectFit: 'fill',
          transform: [{ translateX: indicatorX }],
          marginHorizontal: 7,
        }}
        source={require('../../assets/Ellipse7.png')}
      />
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          bottom: 67,
          height: 45,
          width: 45,
          borderRadius: 999,
          backgroundColor: 'rgb(255, 100, 57)',
          transform: [{ translateX: indicatorX }],
          marginHorizontal: 39,
        }}
      />
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const icon =
          route.name === 'Home'
            ? isFocused
              ? 'home'
              : 'home-outline'
            : route.name === 'Search'
            ? isFocused
              ? 'search'
              : 'search-outline'
            : route.name === 'Add New'
            ? isFocused
              ? 'add-circle'
              : 'add-circle-outline'
            : route.name === 'Save'
            ? isFocused
              ? 'bookmark'
              : 'bookmark-outline'
            : route.name === 'Profile'
            ? isFocused
              ? 'person'
              : 'person-outline'
            : 'ellipse-outline';

        const scale = useRef(new Animated.Value(isFocused ? 1.1 : 1)).current;
        const lift = useRef(new Animated.Value(isFocused ? -6 : 0)).current;

        useEffect(() => {
          Animated.parallel([
            Animated.spring(scale, {
              toValue: isFocused ? 1.1 : 1,
              useNativeDriver: true,
              speed: 18,
              bounciness: 8,
            }),
            Animated.spring(lift, {
              toValue: isFocused ? -6 : 0,
              useNativeDriver: true,
              speed: 18,
              bounciness: 8,
            }),
          ]).start();
        }, [isFocused]);

        return (
          <Pressable
            key={route.key}
            style={styles.TabBarItem}
            onPress={() => navigation.navigate(route.name)}
          >
            <Animated.View
              style={{
                alignItems: 'center',
                transform: [{ scale }, { translateY: lift }],
              }}
            >
              <Ionicons
                name={icon}
                size={22}
                color="#cbcbcb"
                style={{ bottom: isFocused ? 25 : 0 }}
              />
              <Text
                style={{
                  color: '#cbcbcb',
                  fontWeight: isFocused ? 'bold' : 'normal',
                  bottom: isFocused ? 2 : 0,
                }}
              >
                {route.name}
              </Text>
            </Animated.View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default AnimatedTabrBar;
