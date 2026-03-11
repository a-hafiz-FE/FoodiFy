import React, { useEffect, useRef, useState } from 'react';
import InputComponent from './InputComponent';
import { TextInput, View, Pressable, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  value: string[];
  onChange: (next: string[]) => void;
  clearSignal?: number;
};

const HashTagsInput = ({ value, onChange, clearSignal }: Props) => {
  const [input, setInput] = useState('');
  const prevClear = useRef<number | undefined>(clearSignal);

  // ✅ clear ONLY when clearSignal changes
  useEffect(() => {
    if (clearSignal === undefined) return;
    if (prevClear.current === undefined) {
      prevClear.current = clearSignal; // don't clear on first mount
      return;
    }
    if (prevClear.current !== clearSignal) {
      onChange([]);
      prevClear.current = clearSignal;
    }
  }, [clearSignal]); // ✅ don't depend on onChange

  const normalize = (text: string) => {
    let t = text.trim();
    if (!t) return '';
    if (t.startsWith('#')) t = t.slice(1);

    t = t
      .replace(/\s+/g, '_')
      .replace(/[^\p{L}\p{N}_]/gu, '')
      .toLowerCase();

    return t ? `#${t}` : '';
  };

  const addHashtag = () => {
    const tag = normalize(input);
    if (!tag) return;

    if (!value.includes(tag)) onChange([tag, ...value]);
    setInput('');
  };

  const removeHashtag = (tag: string) => {
    onChange(value.filter(t => t !== tag));
  };

  return (
    <InputComponent title="Hashtags" height={140.4}>
      <View style={{ flexDirection: 'column', gap: 8, width: '100%' }}>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          {value.map(hash => (
            <Pressable key={hash} onPress={() => removeHashtag(hash)}>
              <Text style={{ color: '#FFF', fontSize: 16 }}>{hash}</Text>
            </Pressable>
          ))}
        </View>

        <View
          style={{
            flexDirection: 'row',
            padding: 2,
            width: '100%',
            alignItems: 'center',
            gap: 4,
            marginBottom: 10,
          }}
        >
          <TextInput
            style={{
              backgroundColor: '#ffffff',
              flex: 1,
              borderRadius: 8,
              paddingHorizontal: 10,
              height: 40,
              color: '#111',
            }}
            placeholder="Enter HashTag..."
            placeholderTextColor="#9AA0A6"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={addHashtag}
            returnKeyType="done"
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