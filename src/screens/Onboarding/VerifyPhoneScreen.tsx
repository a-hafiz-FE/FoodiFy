import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { styles, colors } from './styles';

type Country = {
  name: string;
  flag: string;
  code: string;
};

const COUNTRIES: Country[] = [
  { name: 'United States', flag: '🇺🇸', code: '+1' },
  { name: 'United Kingdom', flag: '🇬🇧', code: '+44' },
  { name: 'Canada', flag: '🇨🇦', code: '+1' },
  { name: 'Australia', flag: '🇦🇺', code: '+61' },
  { name: 'India', flag: '🇮🇳', code: '+91' },
  { name: 'Germany', flag: '🇩🇪', code: '+49' },
  { name: 'France', flag: '🇫🇷', code: '+33' },
  { name: 'Brazil', flag: '🇧🇷', code: '+55' },
  { name: 'Japan', flag: '🇯🇵', code: '+81' },
  { name: 'China', flag: '🇨🇳', code: '+86' },
  { name: 'South Korea', flag: '🇰🇷', code: '+82' },
  { name: 'Mexico', flag: '🇲🇽', code: '+52' },
  { name: 'Italy', flag: '🇮🇹', code: '+39' },
  { name: 'Spain', flag: '🇪🇸', code: '+34' },
  { name: 'Netherlands', flag: '🇳🇱', code: '+31' },
  { name: 'Saudi Arabia', flag: '🇸🇦', code: '+966' },
  { name: 'UAE', flag: '🇦🇪', code: '+971' },
  { name: 'Egypt', flag: '🇪🇬', code: '+20' },
  { name: 'Turkey', flag: '🇹🇷', code: '+90' },
  { name: 'Nigeria', flag: '🇳🇬', code: '+234' },
  { name: 'South Africa', flag: '🇿🇦', code: '+27' },
  { name: 'Pakistan', flag: '🇵🇰', code: '+92' },
  { name: 'Indonesia', flag: '🇮🇩', code: '+62' },
  { name: 'Russia', flag: '🇷🇺', code: '+7' },
  { name: 'Argentina', flag: '🇦🇷', code: '+54' },
  { name: 'Sweden', flag: '🇸🇪', code: '+46' },
  { name: 'Norway', flag: '🇳🇴', code: '+47' },
  { name: 'Denmark', flag: '🇩🇰', code: '+45' },
  { name: 'Poland', flag: '🇵🇱', code: '+48' },
  { name: 'Philippines', flag: '🇵🇭', code: '+63' },
];

type Props = {
  onSubmit: (phoneNumber: string) => void;
};

const VerifyPhoneScreen = ({ onSubmit }: Props) => {
  const [selected, setSelected] = useState<Country>(COUNTRIES[0]);
  const [phone, setPhone] = useState('');
  const [pickerVisible, setPickerVisible] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = COUNTRIES.filter(
    c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.includes(search),
  );

  const handleSubmit = () => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 7) {
      Alert.alert('Validation', 'Please enter a valid phone number');
      return;
    }
    onSubmit(`${selected.code}${cleaned}`);
  };

  return (
    <KeyboardAvoidingView
      style={styles.authContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../../assets/VerifyHeader.png')}
          style={styles.authHeaderImage}
        />

        <ImageBackground
          source={require('../../../assets/signup-SigninBackground.png')}
          style={styles.authCard}
          resizeMode="cover"
        >
          <View style={styles.authBody}>
            <Image
              source={require('../../../assets/LogoOrangeText.png')}
              style={[
                styles.logoSmall,
                { marginBottom: 6, alignSelf: 'flex-start' },
              ]}
            />

            <Text style={styles.authTitle}>Verify Your{'\n'}Phone Number</Text>

            <View style={styles.phoneRow}>
              <Pressable
                style={styles.countryPicker}
                onPress={() => setPickerVisible(true)}
              >
                <Text style={{ fontSize: 20 }}>{selected.flag}</Text>
                <Text style={{ fontSize: 15, color: colors.dark }}>
                  {selected.code}
                </Text>
                <Text style={{ fontSize: 12, color: colors.grey }}>▼</Text>
              </Pressable>
              <TextInput
                style={styles.phoneInput}
                placeholder="Phone Number"
                placeholderTextColor={colors.grey}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            <Pressable style={styles.primaryButton} onPress={handleSubmit}>
              <Text style={styles.primaryButtonText}>Sign Up</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </ScrollView>

      {/* Country picker modal */}
      <Modal visible={pickerVisible} animationType="slide" transparent>
        <View style={pickerStyles.overlay}>
          <View style={pickerStyles.container}>
            <View style={pickerStyles.header}>
              <Text style={pickerStyles.headerTitle}>Select Country</Text>
              <Pressable onPress={() => setPickerVisible(false)}>
                <Text style={pickerStyles.closeBtn}>✕</Text>
              </Pressable>
            </View>
            <TextInput
              style={pickerStyles.searchInput}
              placeholder="Search country or code..."
              placeholderTextColor={colors.grey}
              value={search}
              onChangeText={setSearch}
              autoCorrect={false}
            />
            <FlatList
              data={filtered}
              keyExtractor={item => `${item.name}-${item.code}`}
              renderItem={({ item }) => (
                <Pressable
                  style={pickerStyles.row}
                  onPress={() => {
                    setSelected(item);
                    setPickerVisible(false);
                    setSearch('');
                  }}
                >
                  <Text style={pickerStyles.flag}>{item.flag}</Text>
                  <Text style={pickerStyles.countryName}>{item.name}</Text>
                  <Text style={pickerStyles.countryCode}>{item.code}</Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const pickerStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.dark,
  },
  closeBtn: {
    fontSize: 20,
    color: colors.grey,
    padding: 4,
  },
  searchInput: {
    marginHorizontal: 20,
    marginVertical: 10,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.inputBg,
    paddingHorizontal: 16,
    fontSize: 15,
    color: colors.dark,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  countryName: {
    flex: 1,
    fontSize: 15,
    color: colors.dark,
  },
  countryCode: {
    fontSize: 15,
    color: colors.grey,
    fontWeight: '600',
  },
});

export default VerifyPhoneScreen;
