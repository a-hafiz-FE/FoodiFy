import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles, colors } from '../styles';

const SocialButtons = () => (
  <>
    <View style={styles.dividerRow}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>or continue with</Text>
      <View style={styles.dividerLine} />
    </View>

    <View style={styles.socialRow}>
      <Pressable style={styles.socialIcon}>
        <Ionicons name="logo-facebook" size={24} color="#1877F2" />
      </Pressable>
      <Pressable style={styles.socialIcon}>
        <Ionicons name="logo-google" size={24} color="#DB4437" />
      </Pressable>
      <Pressable style={styles.socialIcon}>
        <Ionicons name="logo-apple" size={24} color={colors.dark} />
      </Pressable>
    </View>
  </>
);

export default SocialButtons;
