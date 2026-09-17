import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, ArrowRight, User, Mail, Camera, ShieldCheck } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useUserStore } from '../../store/userStore';
import { AppText } from '../../components/common/AppText';

type CreateProfileNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.CREATE_PROFILE
>;

export const CreateProfileScreen: React.FC = () => {
  const navigation = useNavigation<CreateProfileNavigationProp>();
  const { profile, updateProfile } = useUserStore();

  const [fullName, setFullName] = useState(profile?.name || 'Aakash Sharma');
  const [email, setEmail] = useState(profile?.email || '');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleContinue = async () => {
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    await updateProfile({
      name: fullName.trim(),
      email: email.trim(),
    });

    setTimeout(() => {
      setLoading(false);
      // Navigate to Location Permission (Screen 008)
      navigation.navigate(Routes.LOCATION_PERMISSION);
    }, 600);
  };

  const handleSkip = () => {
    navigation.navigate(Routes.LOCATION_PERMISSION);
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

          <TouchableOpacity
            onPress={handleSkip}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.skipButton}
          >
            <AppText style={styles.skipText}>Skip for now</AppText>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Heading & Almost There Badge */}
          <View style={styles.titleSection}>
            <View style={styles.titleTextContainer}>
              <AppText style={styles.mainTitle}>
                Create Your{'\n'}
                <AppText style={styles.titleHighlight}>Profile</AppText>
              </AppText>

              <AppText style={styles.subtext}>
                Just a few details to personalize your experience.
              </AppText>
            </View>

            <View style={styles.almostThereBadge}>
              <AppText style={styles.almostThereText}>Almost</AppText>
              <AppText style={styles.almostThereHighlight}>There!</AppText>
            </View>
          </View>

          {/* Profile Photo Upload Avatar */}
          <View style={styles.avatarSection}>
            <TouchableOpacity style={styles.avatarCircle} activeOpacity={0.8}>
              <User size={48} color="#9CA3AF" />
              <View style={styles.cameraBadge}>
                <Camera size={16} color="#111827" />
              </View>
            </TouchableOpacity>
            <AppText style={styles.avatarLabel}>Add Profile Photo</AppText>
            <AppText style={styles.avatarSubLabel}>Optional</AppText>
          </View>

          {/* Form Fields */}
          <View style={styles.formSection}>
            {/* Full Name */}
            <View style={styles.inputGroup}>
              <AppText style={styles.inputLabel}>Full Name</AppText>
              <View style={[styles.inputBox, errorMessage ? styles.inputBoxError : null]}>
                <User size={18} color="#6B7280" style={styles.fieldIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9CA3AF"
                  value={fullName}
                  onChangeText={(val) => {
                    setFullName(val);
                    if (errorMessage) setErrorMessage('');
                  }}
                />
              </View>
              {errorMessage ? (
                <AppText style={styles.errorText}>{errorMessage}</AppText>
              ) : null}
            </View>

            {/* Email Address */}
            <View style={styles.inputGroup}>
              <AppText style={styles.inputLabel}>
                Email Address <AppText style={styles.optionalTag}>(Optional)</AppText>
              </AppText>
              <View style={styles.inputBox}>
                <Mail size={18} color="#6B7280" style={styles.fieldIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your email address"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              <AppText style={styles.helperText}>
                We'll send booking updates and offers to your email.
              </AppText>
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              style={[styles.continueButton, loading ? styles.buttonDisabled : null]}
              onPress={handleContinue}
              activeOpacity={0.85}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#111827" size="small" />
              ) : (
                <>
                  <AppText style={styles.continueButtonText}>Continue</AppText>
                  <ArrowRight size={20} color="#111827" strokeWidth={2.5} />
                </>
              )}
            </TouchableOpacity>

            {/* Privacy Trust Card */}
            <View style={styles.trustBox}>
              <View style={styles.trustIconWrapper}>
                <ShieldCheck size={20} color="#16A34A" />
              </View>
              <View style={styles.trustTextContainer}>
                <AppText style={styles.trustTitle}>Your information is safe with us</AppText>
                <AppText style={styles.trustSubtitle}>
                  We never share your personal details with third parties.
                </AppText>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Yellow Organic Curve */}
        <View style={styles.bottomWaveContainer} pointerEvents="none">
          <Svg width="100%" height="40" viewBox="0 0 360 40" preserveAspectRatio="none">
            <Path
              d="M0 40 C120 15, 240 45, 360 20 L360 40 Z"
              fill="#FFC107"
              opacity="0.85"
            />
          </Svg>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: Spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  skipButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  skipText: {
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
    color: '#6B7280',
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.xxl,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  titleTextContainer: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontFamily: FontFamily.extraBold,
    color: '#111827',
    letterSpacing: -0.5,
  },
  titleHighlight: {
    fontFamily: FontFamily.extraBold,
    color: '#FFB300',
  },
  subtext: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: FontFamily.regular,
    color: '#6B7280',
    marginTop: Spacing.xs,
  },
  almostThereBadge: {
    backgroundColor: '#FFF8E1',
    borderRadius: 50,
    width: 85,
    height: 85,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '12deg' }],
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  almostThereText: {
    fontSize: 13,
    fontFamily: FontFamily.bold,
    color: '#111827',
    fontStyle: 'italic',
  },
  almostThereHighlight: {
    fontSize: 15,
    fontFamily: FontFamily.extraBold,
    color: '#FFB300',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  avatarSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.md,
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFC107',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarLabel: {
    fontSize: 13,
    fontFamily: FontFamily.bold,
    color: '#111827',
    marginTop: Spacing.xs,
  },
  avatarSubLabel: {
    fontSize: 11,
    fontFamily: FontFamily.regular,
    color: '#9CA3AF',
  },
  formSection: {
    marginTop: Spacing.xs,
  },
  inputGroup: {
    marginBottom: Spacing.md,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: FontFamily.bold,
    color: '#111827',
    marginBottom: 6,
  },
  optionalTag: {
    fontFamily: FontFamily.regular,
    color: '#9CA3AF',
    fontSize: 12,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 12,
  },
  inputBoxError: {
    borderColor: '#DC2626',
  },
  fieldIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: FontFamily.medium,
    color: '#111827',
  },
  errorText: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: '#DC2626',
    marginTop: 4,
  },
  helperText: {
    fontSize: 11,
    fontFamily: FontFamily.regular,
    color: '#6B7280',
    marginTop: 4,
  },
  continueButton: {
    height: 52,
    borderRadius: BorderRadius.full,
    backgroundColor: '#FFC107',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
    shadowColor: '#FFB300',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: FontFamily.bold,
    color: '#111827',
    marginRight: Spacing.xs,
  },
  trustBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF9C3',
    borderRadius: 16,
    padding: Spacing.md,
    marginTop: Spacing.lg,
    borderWidth: 1,
    borderColor: '#FEF08A',
  },
  trustIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  trustTextContainer: {
    flex: 1,
  },
  trustTitle: {
    fontSize: 13,
    fontFamily: FontFamily.bold,
    color: '#854D0E',
  },
  trustSubtitle: {
    fontSize: 11,
    lineHeight: 15,
    fontFamily: FontFamily.regular,
    color: '#A16207',
    marginTop: 2,
  },
  bottomWaveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
