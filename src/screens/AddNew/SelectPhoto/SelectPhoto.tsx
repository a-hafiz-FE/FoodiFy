import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';

type Props = {
  imageUri: string | null;
  onChangeImage: (uri: string | null) => void;
  onCrop: () => Promise<void>;
};

const SelectPhoto = ({
  imageUri,
  onChangeImage,
  onCrop,
}: Props) => {
  const pickImage = async () => {
    try {
      const res = await ImageCropPicker.openPicker({ mediaType: 'photo' });
      onChangeImage(res.path);
    } catch (e: any) {
      // ✅ user cancel is normal, ignore it
      if (e?.code === 'E_PICKER_CANCELLED') return;
      console.log('pickImage error:', e);
    }
  };

  const hasImage = !!imageUri;

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 36 }}>Preview</Text>

      {hasImage ? (
        <Image
          source={{ uri: imageUri! }}
          style={{
            height: 210,
            width: 296,
            borderRadius: 12,
            objectFit: 'cover',
            marginTop: 26,
          }}
        />
      ) : (
        <View
          style={{
            height: 210,
            width: 296,
            borderRadius: 12,
            marginTop: 26,
            borderWidth: 1,
            borderStyle: 'dashed',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ opacity: 0.7 }}>No image selected</Text>
        </View>
      )}

      <View style={{ flexDirection: 'row', marginTop: 22, gap: 7 }}>
        {/* Always show Pick Photo */}
        <Pressable
          onPress={pickImage}
          style={{
            paddingHorizontal: 26,
            paddingVertical: 10.5,
            borderWidth: 1,
            borderRadius: 48,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'medium' }}>
            {hasImage ? 'Change Photo' : 'Pick Photo'}
          </Text>
        </Pressable>

        {/* Crop + Remove exist, but disabled when no image */}
        <Pressable
          onPress={onCrop}
          disabled={!hasImage}
          style={{
            paddingHorizontal: 26,
            paddingVertical: 10.5,
            borderWidth: 1,
            borderRadius: 48,
            opacity: hasImage ? 1 : 0.4, // ✅ looks disabled
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'medium' }}>Edit Crop</Text>
        </Pressable>

        <Pressable
          onPress={() => onChangeImage(null)}
          disabled={!hasImage}
          style={{
            paddingHorizontal: 26,
            paddingVertical: 10.5,
            borderWidth: 1,
            borderRadius: 48,
            opacity: hasImage ? 1 : 0.4, // ✅ looks disabled
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'medium' }}>Remove</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SelectPhoto;
