import React, { useRef, useState } from 'react';
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
import { useOnboardingStore } from '../../app/onboardingStore';

type Props = {
  phoneNumber: string;
  onVerified: () => void;
};

const OTP_LENGTH = 6;

const OtpScreen = ({ phoneNumber, onVerified }: Props) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputs = useRef<(TextInput | null)[]>([]);
  const authStatus = useOnboardingStore(s => s.authStatus);
  const verifyOtp = useOnboardingStore(s => s.verifyOtp);

  const handleChange = (text: string, index: number) => {
    // Accept only the last digit typed
    const digit = text.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);

    if (digit && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < OTP_LENGTH) {
      Alert.alert('Validation', 'Please enter the full code');
      return;
    }
    await verifyOtp(phoneNumber, code);

    const { authStatus: status, authError: error } =
      useOnboardingStore.getState();
    if (status === 'error' && error) {
      Alert.alert('Verification Error', error);
      return;
    }
    onVerified();
  };

  const handleResend = () => {
    // TODO: wire up resend OTP via Firebase Auth
    Alert.alert('Code Resent', `A new code was sent to ${phoneNumber}`);
  };

  return (
    <KeyboardAvoidingView
      style={styles.verifyContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../../assets/VerifyHeaderCode.png')}
          style={styles.verifyHeaderImage}
        />

        <View style={[styles.verifyBody, { alignItems: 'center' }]}>
          <View style={[styles.verifyLogoRow, { alignItems: 'center' }]}>
            <Image
              source={require('../../../assets/LogoOrangeText.png')}
              style={styles.logoSmall}
            />
          </View>

          <Text style={[styles.verifyTitle, { textAlign: 'center' }]}>
            Enter the Code to{'\n'}Verify Your Phone
          </Text>

          <Text style={styles.otpInfoText}>
            We have sent you an SMS to number
          </Text>
          <Text style={styles.otpPhoneText}>{phoneNumber}</Text>

          <View style={styles.otpRow}>
            {otp.map((digit, i) => (
              <TextInput
                key={i}
                ref={el => {
                  inputs.current[i] = el;
                }}
                style={[
                  styles.otpBox,
                  focusedIndex === i && styles.otpBoxFocused,
                ]}
                value={digit}
                onChangeText={text => handleChange(text, i)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(nativeEvent.key, i)
                }
                onFocus={() => setFocusedIndex(i)}
                keyboardType="number-pad"
                maxLength={1}
              />
            ))}
          </View>

          <Pressable
            style={[
              styles.primaryButton,
              authStatus === 'loading' && { opacity: 0.6 },
            ]}
            disabled={authStatus === 'loading'}
            onPress={handleVerify}
          >
            <Text style={styles.primaryButtonText}>
              {authStatus === 'loading' ? 'Verifying…' : 'Next'}
            </Text>
          </Pressable>

          <Pressable onPress={handleResend}>
            <Text style={styles.resendText}>Resend a new code</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OtpScreen;
