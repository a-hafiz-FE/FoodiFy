import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';

type props = {
  selectedImage: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
  openCrop: () => Promise<void>;
};

const SelectPhoto = ({ selectedImage, setSelectedImage, openCrop }: props) => {
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 36 }}>Preview</Text>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{
            height: 210,
            width: 296,
            borderRadius: 12,
            objectFit: 'cover',
            marginTop: 26,
          }}
        />
      )}

      <View style={{ flexDirection: 'row', marginTop: 22, gap: 7 }}>
        <Pressable
          style={{
            paddingHorizontal: 26,
            paddingVertical: 10.5,
            borderWidth: 1,
            borderRadius: 48,
          }}
          onPress={openCrop}
        >
          <Text style={{ fontSize: 16, fontWeight: 'medium' }}>Edit Crop</Text>
        </Pressable>
        <Pressable
          style={{
            paddingHorizontal: 26,
            paddingVertical: 10.5,
            borderWidth: 1,
            borderRadius: 48,
          }}
          onPress={() => setSelectedImage('')}
        >
          <Text style={{ fontSize: 16, fontWeight: 'medium' }}>Remove</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SelectPhoto;
