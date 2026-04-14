import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StatusBar } from 'react-native';
import { styles } from './styles';

type Props = {
  onFinish: () => void;
};

const DOT_COUNT = 3;

const SplashScreen = ({ onFinish }: Props) => {
  const anims = useRef(
    Array.from({ length: DOT_COUNT }, () => new Animated.Value(1)),
  ).current;

  useEffect(() => {
    const t = setTimeout(onFinish, 2500);

    // Sequential pulsing: each dot scales up then back down, then next
    const createPulse = (index: number) =>
      Animated.sequence([
        Animated.timing(anims[index], {
          toValue: 1.6,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(anims[index], {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]);

    const loop = Animated.loop(
      Animated.stagger(
        200,
        anims.map((_, i) => createPulse(i)),
      ),
    );
    loop.start();

    return () => {
      clearTimeout(t);
      loop.stop();
    };
  }, [onFinish]);

  return (
    <View style={styles.splashContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#4058A0" />
      <Image
        source={require('../../../assets/LogoWhiteTextBottom.png')}
        style={styles.splashLogo}
      />
      <View style={styles.splashDotsRow}>
        {anims.map((anim, i) => (
          <Animated.View
            key={i}
            style={[styles.splashDot, { transform: [{ scale: anim }] }]}
          />
        ))}
      </View>
    </View>
  );
};

export default SplashScreen;
