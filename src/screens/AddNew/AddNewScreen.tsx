import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import {
  launchImageLibrary,
  type ImageLibraryOptions,
  type PhotoQuality,
} from 'react-native-image-picker';

const AddNewScreen = () => {
  const [step, setStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const totalSteps = 5;

  const handleNext = () => {
    setStep(p => Math.min(p + 1, totalSteps));
  };

  const handelPrev = () => {
    setStep(p => Math.max(p - 1, 1));
  };

  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    selectionLimit: 1,
    quality: 80 as PhotoQuality,
  };

  const titles = [
    'Select Photo',
    'Recipe Information',
    'Ingredients',
    'Introduction',
    'Recipe Information',
  ];

  const openedOnce = useRef(false);

  useFocusEffect(
    useCallback(() => {
      if (!openedOnce.current) {
        openedOnce.current = true;

        const t = setTimeout(async () => {
          const res = await launchImageLibrary(options);

          if (res.didCancel) {
            console.log('User cancelled image picker');
            return;
          }

          if (res.errorCode) {
            console.log('Image picker error', res.errorMessage);
            return;
          }

          const uri = res.assets?.[0]?.uri;
          if (!uri) {
            console.log('No image uri returned');
            return;
          }
          setSelectedImage(uri);
        }, 200);

        return () => clearTimeout(t);
      }
      return () => {
        openedOnce.current = false;
      };
    }, []),
  );

  const renderStepsIndecator = () => {
    const indecator = [];
    for (let i = 1; i <= totalSteps; i++) {
      indecator.push(
        <View
          key={i}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#353535',
              height: 32,
              width: i === step ? 'auto' : 32,
              paddingHorizontal: 12,
              borderRadius: 99,
              justifyContent: 'center',
              alignItems: 'center',
              borderCurve: 'continuous',
            }}
          >
            <Text style={{ color: i <= step ? '#DEE21B' : '#fff' }}>
              {i === step ? <Text>{titles[i - 1]}</Text> : i}
            </Text>
          </View>
          {i < totalSteps && (
            <View
              style={{
                backgroundColor: '#353535',
                height: 6,
                width: 8,
                borderCurve: 'continuous',
              }}
            />
          )}
        </View>,
      );
    }
    return (
      <View style={{ flexDirection: 'row', marginTop: 70 }}>{indecator}</View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}
    >
      {renderStepsIndecator()}

      <View style={{ flex: 1, marginVertical: 25 }}>
        {step === 1 && (
          <View>
            <Text>Step 1</Text>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>
        )}
        {step === 2 && (
          <View>
            <Text>Step 2</Text>
          </View>
        )}
        {step === 3 && (
          <View>
            <Text>Step 3</Text>
          </View>
        )}
        {step === 4 && (
          <View>
            <Text>Step 4</Text>
          </View>
        )}
        {step === 5 && (
          <View>
            <Text>Step 5</Text>
          </View>
        )}
      </View>
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
            onPress={handleNext}
            style={{
              borderRadius: 12,
              borderWidth: 1,
              width: 128,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              position: step === 1 ? 'absolute' : 'relative',
              left: step === 1 ? 10.5 : 'auto',
              bottom: step === 1 ? 0 : 'auto',
              backgroundColor: '#353535',
            }}
          >
            <Text style={{ color: '#fff' }}>Next</Text>
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
    </View>
  );
};

export default AddNewScreen;
