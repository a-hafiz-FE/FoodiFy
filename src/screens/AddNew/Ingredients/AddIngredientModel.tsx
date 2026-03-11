import React, { useEffect, useRef, useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
};

const AddIngredientModal = ({ visible, onClose, onSubmit }: Props) => {
  const [text, setText] = useState('');
  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    if (!visible) return;
    setText('');
    // focus after modal shows
    const t = setTimeout(() => inputRef.current?.focus(), 150);
    return () => clearTimeout(t);
  }, [visible]);

  const submit = () => {
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
      {/* Backdrop */}
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.35)',
          justifyContent: 'flex-end',
        }}
      >
        {/* Sheet */}
        <Pressable
          onPress={() => {}}
          style={{
            backgroundColor: '#fff',
            padding: 16,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            gap: 12,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#111' }}>
            Add Ingredient
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
              onSubmitEditing={submit}
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
              onPress={submit}
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

export default AddIngredientModal;
