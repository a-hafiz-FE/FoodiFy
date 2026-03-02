import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import SelectPhoto from './Components/SelectPhoto';
import ImagePicker from 'react-native-image-crop-picker';
import RecipeInformation from './Components/RecipeInformation';
import AddNewTopBar from './Components/AddNewTopBar';
import Ingredients from './Components/Ingredients';
import ControlButtons from './Components/ControlButtons';

const AddNewScreen = () => {
  const [step, setStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const totalSteps = 4;

  const handleNext = () => {
    setStep(p => Math.min(p + 1, totalSteps));
  };

  const handelPrev = () => {
    setStep(p => Math.max(p - 1, 1));
  };

  const handleSave = () => {
    setStep(p => Math.min(p + 1, totalSteps));
  };

  const titles = [
    'Select Photo',
    'Recipe Information',
    'Ingredients',
    'Introduction',
  ];

  const openedOnce = useRef(false);

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
          <SelectPhoto
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            openCrop={handleCrop}
          />
        )}
        {step === 2 && <RecipeInformation />}
        {step === 3 && <Ingredients />}
        {step === 4 && <Ingredients />}
      </View>
      <ControlButtons
        step={step}
        totalSteps={totalSteps}
        handelPrev={handelPrev}
        handleNext={handleNext}
        handleSave={handleSave}
      />
    </View>
  );
};

export default AddNewScreen;
