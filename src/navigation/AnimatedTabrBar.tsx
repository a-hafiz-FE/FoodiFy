import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, Animated, Dimensions } from 'react-native';
import { styles } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

// ─────────────────────────────────────────────
// Icon map
// ─────────────────────────────────────────────
const ICONS: Record<string, [string, string]> = {
  Home: ['home', 'home-outline'],
  Search: ['search', 'search-outline'],
  'Add New': ['add-circle', 'add-circle-outline'],
  Save: ['bookmark', 'bookmark-outline'],
  Profile: ['person', 'person-outline'],
};

const getIconName = (routeName: string, isFocused: boolean) => {
  const pair = ICONS[routeName] ?? ['ellipse-outline', 'ellipse-outline'];
  return isFocused ? pair[0] : pair[1];
};

// ─────────────────────────────────────────────
// Single tab item — extracted so hooks are
// called at the top level of a component,
// not inside a .map() loop (rules of hooks)
// ─────────────────────────────────────────────
type TabItemProps = {
  routeName: string;
  routeKey: string;
  isFocused: boolean;
  onPress: () => void;
  tabWidth: number;
};

const TabItem = ({
  routeName,
  routeKey,
  isFocused,
  onPress,
  tabWidth,
}: TabItemProps) => {
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
      key={routeKey}
      style={[styles.TabBarItem, { width: tabWidth }]}
      onPress={onPress}
    >
      <Animated.View
        style={{
          alignItems: 'center',
          transform: [{ scale }, { translateY: lift }],
        }}
      >
        <Ionicons
          name={getIconName(routeName, isFocused)}
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
          {routeName}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

// ─────────────────────────────────────────────
// Tab bar
// ─────────────────────────────────────────────
const AnimatedTabBar = ({ state, navigation }: any) => {
  const screenWidth = Dimensions.get('screen').width;
  const TAB_BAR_PADDING = 0;
  const tabCount = state.routes.length;

  // ✅ Each tab gets exactly equal width
  const tabWidth = (screenWidth - TAB_BAR_PADDING) / tabCount;

  // ✅ Indicator slides to the center of the focused tab
  const indicatorX = useRef(
    new Animated.Value(state.index * tabWidth),
  ).current;

  useEffect(() => {
    Animated.spring(indicatorX, {
      toValue: state.index * tabWidth,
      useNativeDriver: true,
      speed: 18,
      bounciness: 8,
    }).start();
  }, [state.index, tabWidth]);

  // ✅ Center the indicator image within the tab
  // The image is 110px wide — offset by half the difference to center it
  const INDICATOR_WIDTH = 110;
  const indicatorOffset = (tabWidth - INDICATOR_WIDTH) / 2 + TAB_BAR_PADDING / 2;

  // ✅ Center the orange circle (45px) within the tab
  const CIRCLE_SIZE = 45;
  const circleOffset = (tabWidth - CIRCLE_SIZE) / 2 + TAB_BAR_PADDING / 2;

  return (
    <View style={styles.TabBarContainer}>
      {/* Sliding background ellipse */}
      <Animated.Image
        style={{
          position: 'absolute',
          height: 35,
          width: INDICATOR_WIDTH,
          objectFit: 'fill',
          transform: [
            {
              translateX: indicatorX.interpolate({
                inputRange: [0, (tabCount - 1) * tabWidth],
                outputRange: [
                  indicatorOffset,
                  indicatorOffset + (tabCount - 1) * tabWidth,
                ],
              }),
            },
          ],
        }}
        source={require('../../assets/Ellipse7.png')}
      />

      {/* Sliding orange circle */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 67,
          height: CIRCLE_SIZE,
          width: CIRCLE_SIZE,
          borderRadius: 999,
          backgroundColor: 'rgb(255, 100, 57)',
          transform: [
            {
              translateX: indicatorX.interpolate({
                inputRange: [0, (tabCount - 1) * tabWidth],
                outputRange: [
                  circleOffset,
                  circleOffset + (tabCount - 1) * tabWidth,
                ],
              }),
            },
          ],
        }}
      />

      {/* Tab items */}
      {state.routes.map((route: any, index: number) => (
        <TabItem
          key={route.key}
          routeKey={route.key}
          routeName={route.name}
          isFocused={state.index === index}
          tabWidth={tabWidth}
          onPress={() => navigation.navigate(route.name)}
        />
      ))}
    </View>
  );
};

export default AnimatedTabBar;