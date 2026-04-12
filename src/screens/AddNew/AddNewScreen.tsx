import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { Alert, Text, View } from 'react-native';

import SelectPhoto from './SelectPhoto/SelectPhoto';
import ImagePicker from 'react-native-image-crop-picker';
import RecipeInformation from './RecipeInformation/RecipeInformation';
import AddNewTopBar from './Components/AddNewTopBar';
import Ingredients from './Ingredients/Ingredients';
import ControlButtons from './Components/ControlButtons';
import Introduction from './Introduction/Introduction';

import { useMealStore } from '../../app/mealStore';

const AddNewScreen = () => {
  const navigation = useNavigation();

  const draft = useMealStore(s => s.draft);
  const setDraft = useMealStore(s => s.setDraft);
  const resetDraft = useMealStore(s => s.resetDraft);
  const submitDraft = useMealStore(s => s.submitDraft);
  const submitStatus = useMealStore(s => s.submitStatus);
  const imageUri = useMealStore(s => s.draft.imageLocalUri);

  const [clearSignal, setClearSignal] = useState(0);
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const titles = [
    'Select Photo',
    'Recipe Information',
    'Ingredients',
    'Recipe Steps',
  ];

  // ── Background upload ──────────────────────────────────────────────────────
  // Called immediately after the user picks or crops an image.
  // Uploads to Firebase Storage while the user fills out the remaining steps,
  // then replaces the local device URI with the remote download URL in the draft.
  // By the time the user reaches step 4 and taps Finish, the upload is already done.
  // ── Background upload ──────────────────────────────────────────────────────
  // TODO: replace with Firebase Storage upload once bucket is set up
  // Using local URI for now since this is a training app
  const uploadImageInBackground = async (localUri: string) => {
    setDraft({ imageLocalUri: localUri });
  };

  // ── Image picker ───────────────────────────────────────────────────────────
  const pickImage = async () => {
    try {
      const res = await ImagePicker.openPicker({
        mediaType: 'photo',
        compressImageQuality: 0.5, // ✅ compress on pick — reduces file size ~50%
      });
      uploadImageInBackground(res.path); // ✅ start upload immediately, don't wait
    } catch (e) {
      // user cancelled — ignore
      console.log(e);
    }
  };

  // ── Image crop ─────────────────────────────────────────────────────────────
  const handleCrop = async () => {
    if (!imageUri) return; // ✅ already guards null, so imageUri is string below

    try {
      const cropped = await ImagePicker.openCropper({
        path: imageUri, // ✅ safe — null already excluded above
        mediaType: 'photo',
        width: 800,
        height: 800,
        cropping: true,
        cropperCircleOverlay: false,
        compressImageQuality: 0.5,
      });

      setDraft({ imageLocalUri: cropped.path });
      uploadImageInBackground(cropped.path); // ✅ cropped.path is always string
    } catch (e) {
      console.log(e);
    }
  };

  // ── Navigation ─────────────────────────────────────────────────────────────
  const handelPrev = () => {
    setStep(p => Math.max(p - 1, 1));
  };

  // ── Primary action (Next / Finish) ─────────────────────────────────────────
  const handlePrimary = async () => {
    const err = getStepError(step);
    if (err) {
      Alert.alert('Validation Error', err);
      return;
    }

    if (step < totalSteps) {
      setStep(p => Math.min(p + 1, totalSteps));
      return;
    }

    await submitDraft();

    const { submitStatus: status, submitError: error } =
      useMealStore.getState();

    if (status === 'error' && error) {
      Alert.alert('Submission Error', error);
      setDraft({}); // ✅ resets submitStatus → 'idle' and clears submitError
      return; //    so ControlButtons has nothing to render inline
    }

    // Reset to step 1 on success
    if (status === 'success') setStep(1);
  };

  // ── Clear all ──────────────────────────────────────────────────────────────
  const handleClearAll = () => {
    resetDraft();
    setStep(1);
    setClearSignal(p => p + 1);
  };

  // ── Step validation (pure — no setState) ───────────────────────────────────
  const getStepError = (s: number) => {
    switch (s) {
      case 1:
        if (!draft.imageLocalUri) return 'Please pick a photo';
        return null;

      case 2:
        if (!draft.mealName.trim()) return 'Meal name is required';
        if (!draft.servings) return 'Servings are required';
        if (!draft.cookTimeMinutes) return 'Cook time is required';
        if (draft.cookTimeMinutes > 120)
          return 'Cook time must be under two hours';
        if (!draft.difficulty) return 'Difficulty is required';
        if (!draft.dishTypes?.length) return 'Pick at least one dish type';
        if (!draft.dietaryTargets?.length)
          return 'Pick at least one dietary target';
        if (!draft.hashTags?.length) return 'Add at least one hashtag';
        return null;

      case 3:
        if (!draft.ingredients?.some(x => x.trim().length > 0))
          return 'Add at least one ingredient';
        return null;

      case 4:
        if (!draft.steps?.some(st => st.text?.trim?.().length > 0))
          return 'Add at least one step';
        return null;

      default:
        return null;
    }
  };

  // ── Auto-open picker once on focus ─────────────────────────────────────────
  const openedOnce = useRef(false);
  useFocusEffect(
    useCallback(() => {
      if (!openedOnce.current) {
        openedOnce.current = true;
        const t = setTimeout(() => pickImage(), 100);
        return () => clearTimeout(t);
      }
      return undefined;
    }, []),
  );

  // ── Step indicator ─────────────────────────────────────────────────────────
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

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <AddNewTopBar
        onBack={() => navigation.goBack()}
        onClearAll={handleClearAll}
      />
      {renderStepsIndecator()}

      <View style={{ flex: 1, marginVertical: 25 }}>
        {step === 1 && (
          <SelectPhoto
            imageUri={imageUri}
            onChangeImage={uri => {
              setDraft({ imageLocalUri: uri });
              if (uri) uploadImageInBackground(uri);
            }}
            onCrop={handleCrop}
          />
        )}
        {step === 2 && (
          <RecipeInformation
            draft={draft}
            setDraft={setDraft}
            clearSignal={clearSignal}
          />
        )}
        {step === 3 && (
          <Ingredients
            ingredients={draft.ingredients}
            setIngredients={next => setDraft({ ingredients: next })}
          />
        )}
        {step === 4 && (
          <Introduction
            steps={draft.steps}
            setSteps={next => setDraft({ steps: next })}
          />
        )}
      </View>

      <ControlButtons
        step={step}
        totalSteps={totalSteps}
        handelPrev={handelPrev}
        onPrimaryPress={handlePrimary}
        submitStatus={submitStatus}
        submitError={undefined} // ✅ errors are shown as alerts, never inline
      />
    </View>
  );
};

export default AddNewScreen;
