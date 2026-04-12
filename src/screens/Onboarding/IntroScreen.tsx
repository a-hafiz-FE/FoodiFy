import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StatusBar,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';
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

const IntroScreen = ({ onDone }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      scrollRef.current?.scrollTo({
        x: (activeIndex + 1) * width,
        animated: true,
      });
    } else {
      onDone();
    }
  };

  return (
    <View style={styles.introContainer}>
      <StatusBar
        barStyle={slides[activeIndex].statusBar}
        backgroundColor={slides[activeIndex].bg}
      />
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      >
        {slides.map((slide, i) => (
          <View
            key={i}
            style={[styles.introSlide, { backgroundColor: slide.bg }]}
          >
            {/* ── Food plate images ── */}
            <View style={styles.introImagesRow}>
              {slideImages[i].map((img, idx) => (
                <Image key={idx} source={img} style={styles.introPlateImage} />
              ))}
            </View>

            {/* ── Bottom card ── */}
            <View style={styles.introTextBox}>
              <Text style={styles.introTitle}>{slide.title}</Text>

              {/* Dots */}
              <View style={styles.dotsRow}>
                {slides.map((_, j) => (
                  <View
                    key={j}
                    style={[styles.dot, j === i && styles.dotActive]}
                  />
                ))}
              </View>

              {/* Go / arrow button */}
              <Pressable style={styles.goButton} onPress={handleNext}>
                <Text style={styles.goButtonText}>
                  {i === slides.length - 1 ? 'Go' : '→'}
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default IntroScreen;
