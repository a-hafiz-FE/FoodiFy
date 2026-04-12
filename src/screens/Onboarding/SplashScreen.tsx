import React, { useEffect } from 'react';
import { View, Image, Text, StatusBar } from 'react-native';
import { styles } from './styles';

type Props = {
  onFinish: () => void;
};

const SplashScreen = ({ onFinish }: Props) => {
  useEffect(() => {
    const t = setTimeout(onFinish, 2500);
    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <View style={styles.splashContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#4058A0" />
      <Image
        source={require('../../../assets/LogoWhiteTextBottom.png')}
        style={styles.splashLogo}
      />
      <View style={styles.dotsRow}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
};

export default SplashScreen;
