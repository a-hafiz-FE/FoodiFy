import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { styles, colors } from './styles';

type Props = {
  onSubmit: (phoneNumber: string) => void;
};

const VerifyPhoneScreen = ({ onSubmit }: Props) => {
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 7) {
      Alert.alert('Validation', 'Please enter a valid phone number');
      return;
    }
    onSubmit(`${countryCode}${cleaned}`);
  };

  return (
    <KeyboardAvoidingView
      style={styles.verifyContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../../assets/VerifyHeader.png')}
          style={styles.verifyHeaderImage}
        />

        <View style={styles.verifyBody}>
          <View style={styles.verifyLogoRow}>
            <Image
              source={require('../../../assets/LogoOrangeText.png')}
              style={styles.logoSmall}
            />
          </View>

          <Text style={styles.verifyTitle}>Verify Your{'\n'}Phone Number</Text>

          <View style={styles.phoneRow}>
            <Pressable style={styles.countryPicker}>
              <Text style={{ fontSize: 20 }}>🇺🇸</Text>
              <TextInput
                style={{
                  width: 50,
                  fontSize: 15,
                  color: colors.dark,
                  padding: 0,
                }}
                value={countryCode}
                onChangeText={setCountryCode}
                keyboardType="phone-pad"
              />
            </Pressable>
            <TextInput
              style={styles.phoneInput}
              placeholder="Phone Number"
              placeholderTextColor={colors.grey}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <Pressable style={styles.primaryButton} onPress={handleSubmit}>
            <Text style={styles.primaryButtonText}>Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VerifyPhoneScreen;
