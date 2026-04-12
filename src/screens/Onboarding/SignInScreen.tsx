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
import SocialButtons from './Components/SocialButtons';
import { useOnboardingStore } from '../../app/onboardingStore';

type Props = {
  onSignUp: () => void;
  onForgotPassword: () => void;
  onSuccess: () => void;
};

const SignInScreen = ({ onSignUp, onForgotPassword, onSuccess }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authStatus = useOnboardingStore(s => s.authStatus);
  const authError = useOnboardingStore(s => s.authError);
  const signIn = useOnboardingStore(s => s.signIn);

  const handleSignIn = async () => {
    if (!email.trim()) {
      Alert.alert('Validation', 'Email is required');
      return;
    }
    if (!password) {
      Alert.alert('Validation', 'Password is required');
      return;
    }
    await signIn(email.trim(), password);

    const { authStatus: status, authError: error } =
      useOnboardingStore.getState();
    if (status === 'error' && error) {
      Alert.alert('Sign In Error', error);
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
          source={require('../../../assets/SignInHeader.png')}
          style={styles.authHeaderImage}
        />

        <View style={styles.authBody}>
          <Image
            source={require('../../../assets/LogoOrangeText.png')}
            style={[styles.logoSmall, { marginBottom: 6 }]}
          />
          <Text style={styles.authTitle}>Welcome to</Text>
          <Text style={styles.authSubtitle}>Foodify</Text>

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
            placeholder="Password"
            placeholderTextColor={colors.grey}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Pressable onPress={onForgotPassword}>
            <Text style={styles.linkText}>Forget Your Password</Text>
          </Pressable>

          <Pressable>
            <Text style={styles.termsText}>
              Terms of Use and Privacy Policy
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.primaryButton,
              authStatus === 'loading' && { opacity: 0.6 },
            ]}
            disabled={authStatus === 'loading'}
            onPress={handleSignIn}
          >
            <Text style={styles.primaryButtonText}>
              {authStatus === 'loading' ? 'Signing In…' : 'Sign In'}
            </Text>
          </Pressable>

          <SocialButtons />

          <View style={styles.bottomLink}>
            <Text style={styles.bottomLinkText}>
              Don't you have an account?
            </Text>
            <Pressable onPress={onSignUp}>
              <Text style={styles.bottomLinkAction}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
