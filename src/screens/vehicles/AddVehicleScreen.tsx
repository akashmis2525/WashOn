import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  ChevronDown,
  Info,
  Edit2,
  ArrowRight,
  HelpCircle,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useVehicleStore } from '../../store/vehicleStore';
import { AppText } from '../../components/common/AppText';
import { SplashVehicleShowcase } from '../../assets/illustrations/SplashAssets';

const { width } = Dimensions.get('window');

type AddVehicleNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.ADD_VEHICLE
>;

type VehicleType = 'bike' | 'car';

export const AddVehicleScreen: React.FC = () => {
  const navigation = useNavigation<AddVehicleNavigationProp>();
  const { addVehicle } = useVehicleStore();

  const [vehicleType, setVehicleType] = useState<VehicleType>('bike');
  const [brand, setBrand] = useState('Royal Enfield');
  const [model, setModel] = useState('Classic 350');
  const [regNumber, setRegNumber] = useState('MP09AB1234');
  const [selectedColor, setSelectedColor] = useState('#111827');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const colorsList = [
    { id: 'black', colorCode: '#111827', name: 'Black' },
    { id: 'white', colorCode: '#FFFFFF', name: 'White', hasBorder: true },
    { id: 'grey', colorCode: '#6B7280', name: 'Grey' },
    { id: 'red', colorCode: '#DC2626', name: 'Red' },
    { id: 'blue', colorCode: '#2563EB', name: 'Blue' },
    { id: 'green', colorCode: '#166534', name: 'Green' },
    { id: 'cream', colorCode: '#E5E0D8', name: 'Cream' },
  ];

  const handleSaveVehicle = async () => {
    if (!regNumber.trim()) {
      setErrorMessage('Please enter registration number');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      await addVehicle({
        type: vehicleType,
        brand,
        model,
        registrationNumber: regNumber.toUpperCase().trim(),
        color: selectedColor,
        fuelType: 'petrol',
      });

      setTimeout(() => {
        setLoading(false);
        navigation.navigate(Routes.VEHICLE_LIST);
      }, 500);
    } catch (e) {
      setLoading(false);
    }
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
            <AppText style={styles.mainHeading}>Add Vehicle</AppText>
            <AppText style={styles.subHeading}>
              Add your vehicle details for a faster booking experience.
            </AppText>
          </View>

          {/* Vehicle Type Selection */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.fieldLabel}>Vehicle Type</AppText>
            <View style={styles.typeCardsRow}>
              {/* Bike Card */}
              <TouchableOpacity
                style={[
                  styles.typeCard,
                  vehicleType === 'bike' && styles.typeCardSelected,
                ]}
                onPress={() => {
                  setVehicleType('bike');
                  setBrand('Royal Enfield');
                  setModel('Classic 350');
                }}
                activeOpacity={0.85}
              >
                <View style={styles.typeVehicleGraphic}>
                  <SplashVehicleShowcase type="bike" size={90} />
                </View>
                <AppText
                  style={[
                    styles.typeCardText,
                    vehicleType === 'bike' && styles.typeCardTextSelected,
                  ]}
                >
                  Bike
                </AppText>
                <View
                  style={[
                    styles.radioOuter,
                    vehicleType === 'bike' && styles.radioOuterSelected,
                  ]}
                >
                  {vehicleType === 'bike' && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>

              {/* Car Card */}
              <TouchableOpacity
                style={[
                  styles.typeCard,
                  vehicleType === 'car' && styles.typeCardSelected,
                ]}
                onPress={() => {
                  setVehicleType('car');
                  setBrand('Hyundai');
                  setModel('Creta');
                }}
                activeOpacity={0.85}
              >
                <View style={styles.typeVehicleGraphic}>
                  <SplashVehicleShowcase type="car" size={90} />
                </View>
                <AppText
                  style={[
                    styles.typeCardText,
                    vehicleType === 'car' && styles.typeCardTextSelected,
                  ]}
                >
                  Car
                </AppText>
                <View
                  style={[
                    styles.radioOuter,
                    vehicleType === 'car' && styles.radioOuterSelected,
                  ]}
                >
                  {vehicleType === 'car' && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Brand Dropdown */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.inputLabel}>Brand</AppText>
            <TouchableOpacity style={styles.dropdownButton} activeOpacity={0.8}>
              <View style={styles.brandIconBox}>
                <AppText style={styles.brandIconLetter}>
                  {brand.charAt(0)}
                </AppText>
              </View>
              <AppText style={styles.dropdownValueText}>{brand}</AppText>
              <ChevronDown size={18} color={Colors.gray600} />
            </TouchableOpacity>
          </View>

          {/* Model Dropdown */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.inputLabel}>Model</AppText>
            <TouchableOpacity style={styles.dropdownButton} activeOpacity={0.8}>
              <AppText style={styles.dropdownValueText}>{model}</AppText>
              <ChevronDown size={18} color={Colors.gray600} />
            </TouchableOpacity>
          </View>

          {/* Registration Number */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.inputLabel}>Registration Number</AppText>
            <View style={styles.regInputContainer}>
              <View style={styles.regInputWrapper}>
                <View style={styles.indPlateBadge}>
                  <AppText style={styles.indText}>IND</AppText>
                </View>
                <TextInput
                  style={styles.regTextInput}
                  placeholder="MP09AB1234"
                  placeholderTextColor={Colors.gray400}
                  autoCapitalize="characters"
                  maxLength={12}
                  value={regNumber}
                  onChangeText={setRegNumber}
                />
              </View>

              <View style={styles.regHelperBox}>
                <HelpCircle size={14} color={Colors.gray500} />
                <AppText style={styles.regHelperText}>
                  Enter vehicle number as per RC
                </AppText>
              </View>
            </View>
          </View>

          {/* Vehicle Color */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.inputLabel}>Vehicle Color</AppText>
            <View style={styles.colorsRow}>
              {colorsList.map((item) => {
                const isSelected = selectedColor === item.colorCode;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.colorCircleOuter,
                      isSelected && styles.colorCircleOuterSelected,
                    ]}
                    onPress={() => setSelectedColor(item.colorCode)}
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.colorCircleInner,
                        { backgroundColor: item.colorCode },
                        item.hasBorder ? styles.whiteCircleBorder : null,
                      ]}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Nickname (Optional) */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.inputLabel}>
              Give a Nickname <AppText style={styles.optionalText}>(Optional)</AppText>
            </AppText>
            <View style={styles.inputWrapper}>
              <Edit2 size={16} color={Colors.gray500} style={styles.inputLeadingIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="E.g. My Bullet"
                placeholderTextColor={Colors.gray400}
                value={nickname}
                onChangeText={setNickname}
              />
            </View>
          </View>

          {errorMessage ? (
            <AppText style={styles.errorText}>{errorMessage}</AppText>
          ) : null}

          {/* Info Commitment Banner */}
          <View style={styles.infoBanner}>
            <View style={styles.infoIconCircle}>
              <Info size={16} color={Colors.black} />
            </View>
            <View style={styles.infoTextContainer}>
              <AppText style={styles.infoSubtitle}>
                Your vehicle details help us provide better service and accurate pricing.
              </AppText>
            </View>
          </View>

          {/* Save Vehicle Primary Button */}
          <TouchableOpacity
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            onPress={handleSaveVehicle}
            activeOpacity={0.85}
            disabled={loading}
          >
            <AppText style={styles.saveButtonText}>
              {loading ? 'Saving...' : 'Save Vehicle'}
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
  fieldGroup: {
    marginBottom: Spacing.lg,
  },
  fieldLabel: {
    fontFamily: FontFamily.semiBold,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
    marginBottom: Spacing.xs,
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
  typeCardsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  typeCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    padding: Spacing.md,
    alignItems: 'center',
  },
  typeCardSelected: {
    borderColor: '#FFC107',
    backgroundColor: '#FFFDF0',
  },
  typeVehicleGraphic: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  typeCardText: {
    fontFamily: FontFamily.medium,
    fontSize: Typography.size.sm,
    color: Colors.gray700,
    marginBottom: 8,
  },
  typeCardTextSelected: {
    fontFamily: FontFamily.bold,
    color: Colors.gray900,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#FFC107',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFC107',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
  },
  brandIconBox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  brandIconLetter: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: '#FFFFFF',
  },
  dropdownValueText: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
  },
  regInputContainer: {},
  regInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.sm,
  },
  indPlateBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: Spacing.sm,
  },
  indText: {
    fontFamily: FontFamily.extraBold,
    fontSize: 11,
    color: Colors.gray800,
  },
  regTextInput: {
    flex: 1,
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
    letterSpacing: 1,
  },
  regHelperBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  regHelperText: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: Colors.gray500,
  },
  colorsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  colorCircleOuter: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorCircleOuterSelected: {
    borderColor: '#FFC107',
  },
  colorCircleInner: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  whiteCircleBorder: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
  inputLeadingIcon: {
    marginRight: Spacing.sm,
  },
  textInput: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
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
  infoSubtitle: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    color: Colors.gray800,
    lineHeight: 18,
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
