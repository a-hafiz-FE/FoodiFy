import React, { useState } from 'react';
import InputComponent from './InputComponent';
import {
  TextInput,
  View,
  Pressable,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HashTagsInput = () => {
  const [hashtags, pushHashtag] = useState<string[]>([]);
  const [value, setValue] = useState('');

  const normalize = (text: string) => {
    // trim, remove spaces, keep letters/numbers/underscore, lowercase
    let t = text.trim();
    if (!t) return '';

    // allow user to type "#" or not
    if (t.startsWith('#')) t = t.slice(1);

    // replace spaces with underscore + remove invalid chars
    t = t
      .replace(/\s+/g, '_')
      .replace(/[^\p{L}\p{N}_]/gu, '')
      .toLowerCase();

    return t ? `#${t}` : '';
  };

  const addHashtag = () => {
    const tag = normalize(value);
    if (!tag) return;

    pushHashtag(p => (p.includes(tag) ? p : [tag, ...p]));
    setValue('');
  };

  const removeHashtag = (tag: string) => {
    pushHashtag(p => p.filter(t => t !== tag));
  };
  return (
    <InputComponent title="Hashtags" height={140.4}>
      <View style={{ flexDirection: 'column', gap: 8, width: '100%' }}>
        <View
          style={{
            backgroundColor: 'red',
            maxHeight: 40,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          {hashtags.map(hash => (
            <Pressable key={hash} onPress={() => removeHashtag(hash)}>
              <Text style={{ color: '#FFF', fontSize: 16 }}>{hash}</Text>
            </Pressable>
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 2,
            alignItems: 'center',
            gap: 4,
          }}
        >
          <TextInput
            style={{
              backgroundColor: '#ffffff',
              flex: 1,
              borderRadius: 8,
            }}
            placeholder="Enter HashTag..."
            value={value}
            onChangeText={setValue}
            numberOfLines={1}
            keyboardType="default"
          />
          <Pressable
            style={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              backgroundColor: '#DEE21B',
            }}
            onPress={addHashtag}
          >
            <Ionicons name="send-outline" color={'#000'} size={24} />
          </Pressable>
        </View>
      </View>
    </InputComponent>
  );
};

export default HashTagsInput;
