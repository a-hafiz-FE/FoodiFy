// AddStepModal.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void; // ✅ only text
};

const AddStepModal = ({ visible, onClose, onSubmit }: Props) => {
  const [text, setText] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!visible) return;
    setText('');
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [visible]);

  const handleSubmit = () => {
    const v = text.trim();
    if (!v) return;
    onSubmit(v);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.35)',
          justifyContent: 'flex-end',
        }}
      >
        <Pressable
          onPress={() => {}}
          style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16 }}
        >
          <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 10 }}>
            Add Step
          </Text>

          <View
            style={{
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: 10,
              paddingHorizontal: 12,
              height: 48,
              justifyContent: 'center',
            }}
          >
            <TextInput
              ref={inputRef}
              value={text}
              onChangeText={setText}
              placeholder="e.g., 2 eggs"
              placeholderTextColor="#9AA0A6"
              style={{ fontSize: 16, color: '#111' }}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
          </View>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Pressable
              onPress={onClose}
              style={{
                flex: 1,
                height: 44,
                borderRadius: 10,
                backgroundColor: '#ADADAD',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '700' }}>Cancel</Text>
            </Pressable>

            <Pressable
              onPress={handleSubmit}
              style={{
                flex: 1,
                height: 44,
                borderRadius: 10,
                backgroundColor: '#FF6339',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 6,
              }}
            >
              <Ionicons name="checkmark" size={18} color="#fff" />
              <Text style={{ color: '#fff', fontWeight: '700' }}>Add</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default AddStepModal;
