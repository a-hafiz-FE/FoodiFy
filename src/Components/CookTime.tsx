import Slider from '@react-native-community/slider';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

type Props = {
  value: number | null;
  onChange: (v: number | null) => void;
};

const CookTime = ({ value, onChange }: Props) => {
  const minutes = value ?? 0;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return (
    <View
      style={{
        height: 111,
        backgroundColor: '#4058A0',
        marginTop: 20,
        borderRadius: 8,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: 20,
      }}
    >
      <Text
        style={{
          backgroundColor: '#FF6339',
          color: '#fff',
          alignSelf: 'flex-start',
          paddingHorizontal: 20,
          paddingVertical: 4,
          borderRadius: 5,
        }}
      >
        Cook Time
      </Text>

      <View>
        <Slider
          minimumValue={0}
          maximumValue={120}
          step={1}
          value={minutes}
          onValueChange={(v) => onChange(v === 0 ? null : v)}
          minimumTrackTintColor="#DEE21B"
          maximumTrackTintColor="#ffffff"
          thumbTintColor="#DEE21B"
        />

        <Text style={{ color: '#fff', alignSelf: 'center' }}>
          {minutes} min ({hours}:{String(mins).padStart(2, '0')})
        </Text>

        {/* Optional hint when filter not set */}
        {value == null && (
          <Text style={{ color: '#fff', alignSelf: 'center', fontSize: 12, opacity: 0.8 }}>
            Not set
          </Text>
        )}
      </View>
    </View>
  );
};

export default CookTime;