import React from 'react';
import { Pressable, Text, View } from 'react-native';

type props = {
  step: number;
  handelPrev: () => void;
  totalSteps: number;
  handleSave: () => void;
  handleNext: () => void;
};
const ControlButtons = ({
  step,
  handelPrev,
  totalSteps,
  handleSave,
  handleNext,
}: props) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 30,
        flexDirection: 'row',
        gap: 20,
      }}
    >
      {step > 1 && (
        <Pressable
          onPress={handelPrev}
          style={{
            borderRadius: 12,
            borderWidth: 1,
            width: 128,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>Previous</Text>
        </Pressable>
      )}

      {step < totalSteps ? (
        <Pressable
          onPress={handleSave}
          style={{
            borderRadius: step === 1 ? 20 : 12,
            borderWidth: 1,
            width: step === 1 ? 319 : 128,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#353535',
          }}
        >
          {step === 1 ? (
            <Text style={{ color: '#fff' }}>Save</Text>
          ) : (
            <Text style={{ color: '#fff' }}>Next</Text>
          )}
        </Pressable>
      ) : (
        <Pressable
          onPress={handleNext}
          style={{
            borderRadius: 12,
            borderWidth: 1,
            width: 128,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#353535',
          }}
        >
          <Text style={{ color: '#fff' }}>Finish</Text>
        </Pressable>
      )}
    </View>
  );
};

export default ControlButtons;
