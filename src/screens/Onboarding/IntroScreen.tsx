import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { styles, colors } from './styles';

const { width } = Dimensions.get('window');

type Props = {
  onDone: () => void;
};

const slideImages = [
  [
    require('../../../assets/onboardingPlate1.png'),
    require('../../../assets/onboardingPlate2.png'),
    require('../../../assets/onboardingPlate3.png'),
  ],
  [
    require('../../../assets/onboardingPlate4.png'),
    require('../../../assets/onboardingPlate5.png'),
    require('../../../assets/onboardingPlate6.png'),
  ],
  [
    require('../../../assets/onboardingPlate7.png'),
    require('../../../assets/onboardingPlate8.png'),
    require('../../../assets/onboardingPlate9.png'),
  ],
];

const slides = [
  {
    bg: colors.primary,
    title: 'Your personal\nguide to be a chef',
    statusBar: 'light-content' as const,
  },
  {
    bg: colors.coral,
    title: 'Share the Love,\nShare the Recipe',
    statusBar: 'light-content' as const,
  },
  {
    bg: colors.lime,
    title: 'Foodify Your\nGlobal Kitchen',
    statusBar: 'dark-content' as const,
  },
];

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const BUTTON_SIZE = 64;
const STROKE_WIDTH = 3;
const RADIUS = (BUTTON_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const IntroScreen = ({ onDone }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const bgAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Animate progress ring whenever activeIndex changes
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (activeIndex + 1) / slides.length,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [activeIndex]);

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      // Fade out plates, swap, fade in with new bg
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setActiveIndex(prev => prev + 1);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    } else {
      onDone();
    }
  };

  const currentSlide = slides[activeIndex];

  // Interpolate background color
  const bgColor = bgAnim.interpolate({
    inputRange: slides.map((_, i) => i),
    outputRange: slides.map(s => s.bg),
  });

  useEffect(() => {
    Animated.timing(bgAnim, {
      toValue: activeIndex,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [activeIndex]);

  // Progress ring dash offset
  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE, 0],
  });

  return (
    <View style={styles.introContainer}>
      <StatusBar
        barStyle={currentSlide.statusBar}
        backgroundColor={currentSlide.bg}
      />
      <Animated.View style={[styles.introSlide, { backgroundColor: bgColor }]}>
        {/* ── Food plate images (animated fade) ── */}
        <Animated.View style={[styles.introImagesRow, { opacity: fadeAnim }]}>
          {slideImages[activeIndex].map((img, idx) => (
            <Image key={idx} source={img} style={styles.introPlateImage} />
          ))}
        </Animated.View>

        {/* ── Bottom card ── */}
        <View style={styles.introTextBox}>
          <Text style={styles.introTitle}>{currentSlide.title}</Text>

          {/* Loading dots */}
          <View style={styles.dotsRow}>
            {slides.map((_, j) => (
              <View
                key={j}
                style={[styles.dot, j <= activeIndex && styles.dotActive]}
              />
            ))}
          </View>

          {/* Progress ring button */}
          <Pressable onPress={handleNext} style={styles.progressButtonWrap}>
            <Svg
              width={BUTTON_SIZE}
              height={BUTTON_SIZE}
              style={styles.progressRingSvg}
            >
              {/* Background track */}
              <Circle
                cx={BUTTON_SIZE / 2}
                cy={BUTTON_SIZE / 2}
                r={RADIUS}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={STROKE_WIDTH}
                fill="none"
              />
              {/* Animated progress arc */}
              <AnimatedCircle
                cx={BUTTON_SIZE / 2}
                cy={BUTTON_SIZE / 2}
                r={RADIUS}
                stroke={colors.accent}
                strokeWidth={STROKE_WIDTH}
                fill="none"
                strokeDasharray={`${CIRCUMFERENCE}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                rotation="-90"
                origin={`${BUTTON_SIZE / 2}, ${BUTTON_SIZE / 2}`}
              />
            </Svg>
            <View style={styles.goButtonInner}>
              <Text style={styles.goButtonText}>
                {activeIndex === slides.length - 1 ? 'Go' : '→'}
              </Text>
            </View>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};

export default IntroScreen;
