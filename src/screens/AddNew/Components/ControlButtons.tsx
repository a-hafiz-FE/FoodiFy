import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

type Props = {
  step: number;
  totalSteps: number;

  handelPrev: () => void;
  onPrimaryPress: () => void | Promise<void>; // ✅ single handler

  submitStatus?: SubmitStatus;
  submitError?: string;
};

const ControlButtons = ({
  step,
  totalSteps,
  handelPrev,
  onPrimaryPress,
  submitStatus = 'idle',
  submitError,
}: Props) => {
  const isLoading = submitStatus === 'loading';
  const isLastStep = step === totalSteps;

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 30,
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
      }}
    >
      {step > 1 && (
        <Pressable
          disabled={isLoading}
          onPress={handelPrev}
          style={{
            borderRadius: 12,
            borderWidth: 1,
            width: 128,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isLoading ? 0.6 : 1,
          }}
        >
          <Text>Previous</Text>
        </Pressable>
      )}

      {!isLastStep ? (
        <Pressable
          disabled={isLoading}
          onPress={onPrimaryPress}
          style={{
            borderRadius: step === 1 ? 20 : 12,
            borderWidth: 1,
            width: step === 1 ? 319 : 128,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#353535',
            opacity: isLoading ? 0.6 : 1,
          }}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: '#fff' }}>
              {step === 1 ? 'Save' : 'Next'}
            </Text>
          )}
        </Pressable>
      ) : (
        <Pressable
          disabled={isLoading}
          onPress={onPrimaryPress}
          style={{
            borderRadius: step === 1 ? 20 : 12,
            borderWidth: 1,
            width: step === 1 ? 319 : 128,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#353535',
            opacity: isLoading ? 0.6 : 1,
          }}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: '#fff' }}>Finish</Text>
          )}
        </Pressable>
      )}

      {submitStatus === 'error' && !!submitError && (
        <Text style={{ color: 'red', marginLeft: 10, maxWidth: 180 }}>
          {submitError}
        </Text>
      )}
    </View>
  );
};

export default ControlButtons;
