import React, { useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddStepModal from './AddStepModel';
import StepCard from './StepCard';

type Step = { order: number; text: string };

type Props = {
  steps: Step[];
  setSteps: (next: Step[]) => void;
};

const Introduction = ({ steps, setSteps }: Props) => {
  const [open, setOpen] = useState(false);

  const addStep = (text: string) => {
    const nextOrder = steps.length + 1;
    setSteps([...steps, { order: nextOrder, text }]);
    setOpen(false);
  };

  const removeStep = (index: number) => {
    const next = steps
      .filter((_, i) => i !== index)
      .map((s, i) => ({ ...s, order: i + 1 }));
    setSteps(next);
  };

  return (
    <View style={{ marginBottom: 60, paddingHorizontal: 20, paddingBottom: 20 }}>
      <AddStepModal
        visible={open}
        onClose={() => setOpen(false)}
        onSubmit={addStep}
      />

      <FlatList
        data={steps}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={{ gap: 10, paddingBottom: 10 }}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item, index }) => (
          <StepCard
            index={index}
            value={item.text}
            onRemove={() => removeStep(index)}
          />
        )}
      />

      <Pressable
        onPress={() => setOpen(true)}
        style={{
          height: 32,
          width: 32,
          backgroundColor: '#ADADAD',
          borderRadius: 99,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name="add-outline" size={24} color={'#FFFFFF'} />
      </Pressable>
    </View>
  );
};

export default Introduction;