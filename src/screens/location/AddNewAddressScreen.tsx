import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Home,
  Briefcase,
  MapPin,
  Building,
  Navigation,
  FileText,
  Info,
  ChevronDown,
  ArrowRight,
  Check,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';

const { width } = Dimensions.get('window');

type AddNewAddressNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.ADD_NEW_ADDRESS
>;

type AddressType = 'Home' | 'Office' | 'Other';

export const AddNewAddressScreen: React.FC = () => {
  const navigation = useNavigation<AddNewAddressNavigationProp>();

  const [addressTitle, setAddressTitle] = useState<AddressType>('Home');
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('Indore');
  const [stateName, setStateName] = useState('Madhya Pradesh');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const addressTypes: { id: AddressType; label: string; icon: any }[] = [
    { id: 'Home', label: 'Home', icon: Home },
    { id: 'Office', label: 'Office', icon: Briefcase },
    { id: 'Other', label: 'Other', icon: MapPin },
  ];

  const handleSaveAddress = () => {
    if (!houseNo.trim() && !street.trim()) {
      setErrorMessage('Please enter house/flat number or street');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      setLoading(false);
      // Navigate back to Location Selection or Home
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate(Routes.LOCATION_SELECTION);
      }
    }, 600);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Top Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ArrowLeft size={22} color={Colors.black} />
          </TouchableOpacity>

          <View style={styles.logoWrapper}>
            <Image
              source={require('../../assets/images/logo.jpg')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Title and Subtitle */}
          <View style={styles.titleSection}>
            <AppText style={styles.mainHeading}>Add New Address</AppText>
            <AppText style={styles.subHeading}>
              Save your address for a faster booking experience.
            </AppText>
          </View>

          {/* Address Title Cards */}
          <View style={styles.sectionBlock}>
            <AppText style={styles.fieldLabel}>Address Title</AppText>
            <View style={styles.typeSelectorRow}>
              {addressTypes.map((item) => {
                const isSelected = addressTitle === item.id;
                const IconComponent = item.icon;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.typeCard,
                      isSelected && styles.typeCardSelected,
                    ]}
                    onPress={() => setAddressTitle(item.id)}
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.typeIconBox,
                        isSelected && styles.typeIconBoxSelected,
                      ]}
                    >
                      <IconComponent
                        size={20}
                        color={isSelected ? Colors.black : Colors.gray600}
                      />
                    </View>
                    <AppText
                      style={[
                        styles.typeLabel,
                        isSelected && styles.typeLabelSelected,
                      ]}
                    >
                      {item.label}
                    </AppText>
                    {/* Radio circle */}
                    <View
                      style={[
                        styles.radioOuter,
                        isSelected && styles.radioOuterSelected,
                      ]}
                    >
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* House / Building / Flat No. */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.inputLabel}>House / Building / Flat No.</AppText>
            <View style={styles.inputWrapper}>
              <Home size={18} color={Colors.gray500} style={styles.inputLeadingIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="E.g. 123, Sunshine Apartments"
                placeholderTextColor={Colors.gray400}
                value={houseNo}
                onChangeText={setHouseNo}
              />
            </View>
          </View>

          {/* Street / Area */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.inputLabel}>Street / Area</AppText>
            <View style={styles.inputWrapper}>
              <Navigation size={18} color={Colors.gray500} style={styles.inputLeadingIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="E.g. Vijay Nagar, Scheme No. 54"
                placeholderTextColor={Colors.gray400}
                value={street}
                onChangeText={setStreet}
              />
            </View>
          </View>

          {/* City */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.inputLabel}>City</AppText>
            <View style={[styles.inputWrapper, styles.inputDisabled]}>
              <Building size={18} color={Colors.gray500} style={styles.inputLeadingIcon} />
              <TextInput
                style={[styles.textInput, { color: Colors.gray900 }]}
                value={city}
                onChangeText={setCity}
                editable={false}
              />
            </View>
          </View>

          {/* State & PIN Code */}
          <View style={styles.twoColumnRow}>
            <View style={[styles.fieldGroup, { flex: 1.1, marginRight: Spacing.sm }]}>
              <AppText style={styles.inputLabel}>State</AppText>
              <TouchableOpacity style={styles.inputWrapper} activeOpacity={0.8}>
                <Building size={18} color={Colors.gray500} style={styles.inputLeadingIcon} />
                <AppText style={styles.stateDropdownText} numberOfLines={1}>
                  {stateName}
                </AppText>
                <ChevronDown size={18} color={Colors.gray600} />
              </TouchableOpacity>
            </View>

            <View style={[styles.fieldGroup, { flex: 0.9 }]}>
              <AppText style={styles.inputLabel}>PIN Code</AppText>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInputNoIcon}
                  placeholder="E.g. 452010"
                  placeholderTextColor={Colors.gray400}
                  keyboardType="number-pad"
                  maxLength={6}
                  value={pincode}
                  onChangeText={setPincode}
                />
              </View>
            </View>
          </View>

          {/* Landmark (Optional) */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.inputLabel}>
              Landmark <AppText style={styles.optionalText}>(Optional)</AppText>
            </AppText>
            <View style={styles.inputWrapper}>
              <MapPin size={18} color={Colors.gray500} style={styles.inputLeadingIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="E.g. Near Bombay Hospital"
                placeholderTextColor={Colors.gray400}
                value={landmark}
                onChangeText={setLandmark}
              />
            </View>
          </View>

          {/* Address Instructions (Optional) */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.inputLabel}>
              Address Instructions <AppText style={styles.optionalText}>(Optional)</AppText>
            </AppText>
            <View style={styles.textAreaWrapper}>
              <FileText size={18} color={Colors.gray500} style={styles.textAreaLeadingIcon} />
              <TextInput
                style={styles.textAreaInput}
                placeholder="E.g. White gate, 3rd floor, near park, call before arrival"
                placeholderTextColor={Colors.gray400}
                multiline
                numberOfLines={3}
                maxLength={100}
                value={instructions}
                onChangeText={setInstructions}
                textAlignVertical="top"
              />
            </View>
            <AppText style={styles.charCounter}>{instructions.length}/100</AppText>
          </View>

          {/* Error notice if any */}
          {errorMessage ? (
            <AppText style={styles.errorText}>{errorMessage}</AppText>
          ) : null}

          {/* Info Commitment Banner */}
          <View style={styles.infoBanner}>
            <View style={styles.infoIconCircle}>
              <Info size={16} color={Colors.black} />
            </View>
            <View style={styles.infoTextContainer}>
              <AppText style={styles.infoTitle}>This helps our washermen reach you easily</AppText>
              <AppText style={styles.infoSubtitle}>Add clear instructions to avoid confusion.</AppText>
            </View>
          </View>

          {/* Save Address Button */}
          <TouchableOpacity
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            onPress={handleSaveAddress}
            activeOpacity={0.85}
            disabled={loading}
          >
            <AppText style={styles.saveButtonText}>
              {loading ? 'Saving...' : 'Save Address'}
            </AppText>
            {!loading && <ArrowRight size={20} color={Colors.black} style={styles.buttonIcon} />}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    height: 38,
    width: 120,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing['3xl'],
  },
  titleSection: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  mainHeading: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size['2xl'],
    color: Colors.gray900,
  },
  subHeading: {
    fontFamily: FontFamily.regular,
    fontSize: Typography.size.sm,
    color: Colors.gray600,
    marginTop: 4,
  },
  sectionBlock: {
    marginBottom: Spacing.lg,
  },
  fieldLabel: {
    fontFamily: FontFamily.semiBold,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
    marginBottom: Spacing.xs,
  },
  typeSelectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  typeCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  typeCardSelected: {
    borderColor: '#FFC107',
    backgroundColor: '#FFFDF0',
  },
  typeIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  typeIconBoxSelected: {
    backgroundColor: '#FFECB3',
  },
  typeLabel: {
    fontFamily: FontFamily.medium,
    fontSize: Typography.size.xs,
    color: Colors.gray700,
    marginBottom: 6,
  },
  typeLabelSelected: {
    fontFamily: FontFamily.bold,
    color: Colors.gray900,
  },
  radioOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#FFC107',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFC107',
  },
  fieldGroup: {
    marginBottom: Spacing.md,
  },
  inputLabel: {
    fontFamily: FontFamily.semiBold,
    fontSize: Typography.size.xs,
    color: Colors.gray800,
    marginBottom: 6,
  },
  optionalText: {
    fontFamily: FontFamily.regular,
    fontSize: Typography.size.xs,
    color: Colors.gray500,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
  },
  inputDisabled: {
    backgroundColor: '#F9FAFB',
  },
  inputLeadingIcon: {
    marginRight: Spacing.sm,
  },
  textInput: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
    height: '100%',
  },
  textInputNoIcon: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
    height: '100%',
  },
  stateDropdownText: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
  },
  twoColumnRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textAreaWrapper: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    minHeight: 88,
  },
  textAreaLeadingIcon: {
    marginRight: Spacing.sm,
    marginTop: 2,
  },
  textAreaInput: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
    padding: 0,
  },
  charCounter: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: Colors.gray500,
    textAlign: 'right',
    marginTop: 4,
  },
  errorText: {
    fontFamily: FontFamily.medium,
    fontSize: Typography.size.xs,
    color: Colors.error,
    marginBottom: Spacing.sm,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF9C3',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,
  },
  infoIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FDE047',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.xs,
    color: Colors.gray900,
  },
  infoSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: Colors.gray700,
    marginTop: 2,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    backgroundColor: '#FFC107',
    borderRadius: BorderRadius.full,
    ...Shadows.sm,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.md,
    color: Colors.black,
  },
  buttonIcon: {
    marginLeft: Spacing.xs,
  },
});
