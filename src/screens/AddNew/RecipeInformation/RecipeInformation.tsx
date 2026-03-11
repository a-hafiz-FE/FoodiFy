import React, { useMemo, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import InputComponent from './InputComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DishTypeFilter from '../../../Components/DishTypeFilter';
import DifficultyFilter from '../../../Components/DificultyFilter';
import DietaryTargetFilter from '../../../Components/DietaryTargetFilter';
import HashTagsInput from './HashTagsInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Difficulty, Store } from '../../../app/StoreConstants';

const DificultyOptions = ['Easy', 'Meduim', 'Professional'];
const DishOptions = [
  'Breakfast',
  'Lunch',
  'Snack',
  'Brunch',
  'Dessert',
  'Dinner',
  'Appetizers',
];

type Props = {
  draft: Store['draft'];
  setDraft: Store['setDraft'];
  clearSignal: number;
};

const RecipeInformation = ({ draft, setDraft, clearSignal }: Props) => {
  const servings = draft.servings ?? 1;

  const { hours, minutes } = useMemo(() => {
    const total = draft.cookTimeMinutes ?? 0;
    return {
      hours: String(Math.floor(total / 60) || ''),
      minutes: String(total % 60 || ''),
    };
  }, [draft.cookTimeMinutes]);

  const decrease = () => setDraft({ servings: Math.max(1, servings - 1) });
  const increase = () => setDraft({ servings: Math.min(10, servings + 1) });

  const setCookTime = (hText: string, mText: string) => {
    const h = Math.max(0, parseInt(hText || '0', 10) || 0);
    const m = Math.max(0, parseInt(mText || '0', 10) || 0);
    setDraft({ cookTimeMinutes: h * 60 + m });
  };
  const difficultyOptions: { label: string; value: Difficulty }[] = [
    { label: 'Easy', value: 'easy' },
    { label: 'Medium', value: 'medium' },
    { label: 'Professional', value: 'professional' },
  ];

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, marginBottom: 60 }}
      showsVerticalScrollIndicator={false}
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      enableAutomaticScroll
      extraScrollHeight={Platform.OS === 'android' ? 140 : 80}
      contentContainerStyle={{
        paddingBottom: 160,
      }}
    >
      <View style={{ gap: 10 }}>
        <InputComponent title="Name" height={111}>
          <TextInput
            value={draft.mealName}
            onChangeText={mealName => setDraft({ mealName })}
            style={{
              height: 40,
              width: '100%',
              backgroundColor: '#FFF',
              borderRadius: 20,
              paddingHorizontal: 20,
              paddingVertical: 13,
            }}
            placeholder="Name Your Recipe"
            placeholderTextColor="#9AA0A6"
          />
        </InputComponent>
        <InputComponent title="Number Of Servings" height={110.4}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Pressable
              style={{
                backgroundColor: '#FFF',
                width: 24,
                height: 24,
                borderRadius: 99,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={decrease}
            >
              <Ionicons name="remove" size={24} color={'#4058A0'} />
            </Pressable>
            <Text style={{ color: '#FFF', fontSize: 24, marginHorizontal: 10 }}>
              {servings}
            </Text>
            <Pressable
              style={{
                backgroundColor: '#FFF',
                width: 24,
                height: 24,
                borderRadius: 99,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={increase}
            >
              <Ionicons name="add-outline" size={24} color={'#4058A0'} />
            </Pressable>
          </View>
        </InputComponent>
        <InputComponent title="Cook Time" height={110.4}>
          <View
            style={{
              flexDirection: 'row',
              gap: 4,
              width: '100%',
            }}
          >
            <View
              style={{
                flex: 1,
                height: 40,
                borderWidth: 1,
                borderRadius: 20,
                borderColor: '#ADADAD',
                backgroundColor: '#FFF',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TextInput
                value={hours}
                onChangeText={h => setCookTime(h, minutes)}
                inputMode="numeric"
                keyboardType="number-pad"
                style={{ flex: 1, marginRight: 10, color: '#111' }}
                placeholder="0"
                placeholderTextColor="#9AA0A6"
              />
              <Text style={{ color: '#000', position: 'absolute', right: 20 }}>
                h
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                height: 40,
                borderWidth: 1,
                borderRadius: 20,
                borderColor: '#ADADAD',
                backgroundColor: '#FFF',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TextInput
                value={minutes}
                onChangeText={m => setCookTime(hours, m)}
                inputMode="numeric"
                keyboardType="number-pad"
                style={{ flex: 1, marginRight: 10, color: '#111' }}
                placeholder="0"
                placeholderTextColor="#9AA0A6"
              />
              <Text style={{ color: '#000', position: 'absolute', right: 20 }}>
                m
              </Text>
            </View>
          </View>
        </InputComponent>

        <DifficultyFilter
          value={draft.difficulty}
          onChange={v => setDraft({ difficulty: v })}
        />

        <DishTypeFilter
          value={draft.dishTypes}
          onChange={next => setDraft({ dishTypes: next })}
        />
        <DietaryTargetFilter
          value={draft.dietaryTargets}
          onChange={next => setDraft({ dietaryTargets: next })}
        />
        <HashTagsInput
          value={draft.hashTags}
          onChange={next => setDraft({ hashTags: next })}
          clearSignal={clearSignal}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RecipeInformation;
