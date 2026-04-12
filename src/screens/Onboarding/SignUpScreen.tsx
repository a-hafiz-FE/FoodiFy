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
import { useOnboardingStore } from '../../app/onboardingStore';

type Props = {
  onSignIn: () => void;
  onSuccess: () => void;
};

const SignUpScreen = ({ onSignIn, onSuccess }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const authStatus = useOnboardingStore(s => s.authStatus);
  const signUp = useOnboardingStore(s => s.signUp);

  const handleSignUp = async () => {
    if (!email.trim()) {
      Alert.alert('Validation', 'Email is required');
      return;
    }
    if (!password || password.length < 6) {
      Alert.alert('Validation', 'Password must be at least 6 characters');
      return;
    }
    if (password !== repeatPassword) {
      Alert.alert('Validation', 'Passwords do not match');
      return;
    }

    await signUp(email.trim(), password);

    const { authStatus: status, authError: error } =
      useOnboardingStore.getState();
    if (status === 'error' && error) {
      Alert.alert('Sign Up Error', error);
    }
    if (status === 'authenticated') {
      onSuccess();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.authContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../../assets/SignUpHeader.png')}
          style={styles.authHeaderImage}
        />

        <View style={styles.authBody}>
          <Image
            source={require('../../../assets/LogoOrangeText.png')}
            style={[styles.logoSmall, { marginBottom: 6 }]}
          />
          <Text style={styles.authTitle}>Sign Up</Text>
          <View style={{ height: 20 }} />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.grey}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Create a Password"
            placeholderTextColor={colors.grey}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Repeat Password"
            placeholderTextColor={colors.grey}
            secureTextEntry
            value={repeatPassword}
            onChangeText={setRepeatPassword}
          />

          <Pressable
            style={[
              styles.primaryButton,
              { marginTop: 10 },
              authStatus === 'loading' && { opacity: 0.6 },
            ]}
            disabled={authStatus === 'loading'}
            onPress={handleSignUp}
          >
            <Text style={styles.primaryButtonText}>
              {authStatus === 'loading' ? 'Creating Account…' : 'Sign Up'}
            </Text>
          </Pressable>

          <View style={styles.bottomLink}>
            <Text style={styles.bottomLinkText}>I have an account?</Text>
            <Pressable onPress={onSignIn}>
              <Text style={styles.bottomLinkAction}>Sign In</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
