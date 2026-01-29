import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './styles';

import HomeTopBar from './HomeComponents/HomeTopBar';
import CarouselCard from './HomeComponents/CarouselCard';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <HomeTopBar />
      {/* Main Screen */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Scroll View */}
          <View
            style={{
              height: 285,
              marginVertical: 20,
              backgroundColor: '#F6FBF4',
            }}
          >
            <Text style={{ fontSize: 32, marginVertical: 10, marginLeft: 10 }}>
              Popular Recipes
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <CarouselCard></CarouselCard>
              <CarouselCard></CarouselCard>
              <CarouselCard></CarouselCard>
              <CarouselCard></CarouselCard>
              <CarouselCard></CarouselCard>
            </ScrollView>
          </View>

          <View
            style={{
              backgroundColor: '#f6fbf4',
              height: 661,
              borderRadius: 10,
              marginHorizontal: 10,
              marginBottom: 40,
            }}
          >
            <Text style={{ fontSize: 32, marginVertical: 10, marginLeft: 10 }}>
              The Latest Recipes
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
