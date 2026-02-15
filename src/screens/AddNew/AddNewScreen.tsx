import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import {
  type ImageLibraryOptions,
  type PhotoQuality,
} from 'react-native-image-picker';
import AddNewPage1 from './Components/AddNewPage1';
import ImagePicker from 'react-native-image-crop-picker';
import AddNewPage2 from './Components/AddNewPage2';
import AddNewTopBar from './Components/AddNewTopBar';

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

  const handleSave = () => {
    setStep(p => Math.min(p + 1, totalSteps));
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
          try {
            const res = await ImagePicker.openPicker({
              mediaType: 'photo',
            });
            setSelectedImage(res.path);
          } catch (e) {
            console.log(e);
          }
        }, 100);

        return () => {
          clearTimeout(t);
        };
      }
      return () => {
        openedOnce.current = false;
        setStep(1);
        setSelectedImage('');
      };
    }, []),
  );

  const handleCrop = async () => {
    if (!selectedImage) return;

    try {
      const cropped = await ImagePicker.openCropper({
        path: selectedImage,
        mediaType: 'photo',
        width: 800,
        height: 800,
        cropping: true,
        cropperCircleOverlay: false,
        compressImageQuality: 0.8,
      });

      setSelectedImage(cropped.path);
    } catch (e) {
      console.log(e);
    }
  };

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
              height: 36,
              width: i === step ? 'auto' : 36,
              paddingHorizontal: 10,
              borderRadius: 99,
              justifyContent: 'center',
              alignItems: 'center',
              borderCurve: 'continuous',
            }}
          >
            <Text
              style={{ color: i <= step ? '#DEE21B' : '#fff', fontSize: 16 }}
            >
              {i === step ? <Text>{titles[i - 1]}</Text> : i}
            </Text>
          </View>
          {i < totalSteps && (
            <View
              style={{
                backgroundColor: '#353535',
                height: 6,
                width: 16,
                borderCurve: 'continuous',
              }}
            />
          )}
        </View>,
      );
    }
    return (
      <View style={{ flexDirection: 'row', marginTop: 20 }}>{indecator}</View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}
    >
      <AddNewTopBar />
      {renderStepsIndecator()}

      <View style={{ flex: 1, marginVertical: 25 }}>
        {step === 1 && (
          <AddNewPage1
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            openCrop={handleCrop}
          />
        )}
        {step === 2 && <AddNewPage2 />}
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
    </View>
  );
};

export default AddNewScreen;
