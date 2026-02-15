import React, { useState } from 'react';
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
import DificultyFilter from '../../../Components/DificultyFilter';
import DietaryTargetFilter from '../../../Components/DietaryTargetFilter';
import HashTagsInput from './HashTagsInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import Ionicons from 'react-native-vector-icons/Ionicons';

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

const AddNewPage2 = () => {
  // const [name, setName] = useState('');
  const [serving, setServing] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);

  const decrease = () => {
    setServing(p => {
      return Math.max(1, p - 1);
    });
  };

  const increase = () => {
    setServing(p => {
      return Math.min(10, p + 1);
    });
  };

  const toggle = (label: string) => {
    setSelected(prev => (prev === label ? null : label));
  };

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
            style={{
              height: 40,
              width: '100%',
              backgroundColor: '#FFF',
              borderRadius: 20,
              paddingHorizontal: 20,
              paddingVertical: 13,
            }}
            placeholder="Name Your Recipe"
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
              {serving}
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
                inputMode="numeric"
                style={{ flex: 1, marginRight: 10 }}
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
                inputMode="numeric"
                style={{ flex: 1, marginRight: 10 }}
              />
              <Text style={{ color: '#000', position: 'absolute', right: 20 }}>
                m
              </Text>
            </View>
          </View>
        </InputComponent>

        <DificultyFilter clearSignal={1} />

        <DishTypeFilter clearSignal={1} />

        <DietaryTargetFilter clearSignal={1} />

        <HashTagsInput />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddNewPage2;
