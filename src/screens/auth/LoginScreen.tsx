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
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowRight, ChevronDown, Home, Building2, MapPin } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useAuthStore } from '../../store/authStore';
import { AppText } from '../../components/common/AppText';
import { OnboardingHeader } from '../../components/onboarding/OnboardingHeader';
import { SplashVehicleShowcase } from '../../assets/illustrations/SplashAssets';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 720;

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.LOGIN
>;

// Google Multi-Color G Icon
const GoogleIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48">
    <Path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <Path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    />
    <Path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <Path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
  </Svg>
);

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { setPhoneNumber } = useAuthStore();

  const [mobileNumber, setMobileNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    const cleaned = mobileNumber.replace(/\D/g, '');
    if (cleaned.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    setPhoneNumber(`+91 ${cleaned}`);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate(Routes.OTP_VERIFICATION, {
        phoneNumber: `+91 ${cleaned}`,
      });
    }, 800);
  };

  const handleGoogleLogin = () => {
    setPhoneNumber('+91 9876543210');
    navigation.navigate(Routes.OTP_VERIFICATION, {
      phoneNumber: '+91 9876543210',
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Top Header */}
        <OnboardingHeader
          showSkip={false}
          welcomeText="Welcome Back 👋"
          subtitleText="Login to continue"
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Main Heading & Subtitle */}
          <View style={styles.headingSection}>
            <AppText style={styles.headingMain}>
              Let's Get{'\n'}
              You <AppText style={styles.headingHighlight}>Clean Rides</AppText>
            </AppText>

            <AppText style={styles.subtext}>
              Login to book a professional car or bike wash at your doorstep.
            </AppText>
          </View>

          {/* Center Graphic Banner with Car, Bike & Service Badges */}
          <View style={styles.graphicSection}>
            {/* Clean Happier Rides Script Badge */}
            <View style={styles.scriptBadge}>
              <AppText style={styles.scriptText}>Clean</AppText>
              <AppText style={styles.scriptText}>Happier</AppText>
              <AppText style={styles.scriptTextHighlight}>Rides</AppText>
            </View>

            {/* Floating Location Types Card */}
            <View style={styles.locationPillsCard}>
              <View style={styles.locationPillRow}>
                <Home size={13} color="#111827" />
                <AppText style={styles.locationPillText}>At Your Home</AppText>
              </View>
              <View style={styles.locationPillRow}>
                <Building2 size={13} color="#111827" />
                <AppText style={styles.locationPillText}>At Your Office</AppText>
              </View>
              <View style={styles.locationPillRow}>
                <MapPin size={13} color="#111827" />
                <AppText style={styles.locationPillText}>Anywhere You Are</AppText>
              </View>
            </View>

            <SplashVehicleShowcase
              width={Math.min(width * 0.94, 380)}
              height={isSmallScreen ? 140 : 165}
            />
          </View>

          {/* Form Input Section */}
          <View style={styles.formSection}>
            <AppText style={styles.inputLabel}>Mobile Number</AppText>

            <View style={[styles.phoneInputContainer, errorMessage ? styles.inputError : null]}>
              {/* Country Flag & Dropdown */}
              <View style={styles.countryCodeSelector}>
                <AppText style={styles.flagEmoji}>🇮🇳</AppText>
                <ChevronDown size={14} color="#6B7280" />
                <View style={styles.verticalDivider} />
                <AppText style={styles.countryCodeText}>+91</AppText>
              </View>

              {/* Number Text Input */}
              <TextInput
                style={styles.textInput}
                placeholder="Enter your mobile number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                maxLength={10}
                value={mobileNumber}
                onChangeText={(text) => {
                  setMobileNumber(text);
                  if (errorMessage) setErrorMessage('');
                }}
              />
            </View>

            {errorMessage ? (
              <AppText style={styles.errorText}>{errorMessage}</AppText>
            ) : null}

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
                  <AppText style={styles.continueText}>Continue</AppText>
                  <ArrowRight size={20} color="#111827" strokeWidth={2.5} />
                </>
              )}
            </TouchableOpacity>

            {/* Or Continue With Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <AppText style={styles.dividerText}>or continue with</AppText>
              <View style={styles.dividerLine} />
            </View>

            {/* Google Login Button */}
            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleLogin}
              activeOpacity={0.8}
            >
              <GoogleIcon size={20} />
              <AppText style={styles.googleButtonText}>Continue with Google</AppText>
            </TouchableOpacity>

            {/* Terms and Privacy Policy Footer */}
            <View style={styles.termsContainer}>
              <AppText style={styles.termsText}>
                By continuing, you agree to our{' '}
                <AppText
                  style={styles.termsLink}
                  onPress={() => navigation.navigate(Routes.TERMS_PRIVACY, { type: 'terms' })}
                >
                  Terms of Service
                </AppText>{' '}
                and{' '}
                <AppText
                  style={styles.termsLink}
                  onPress={() => navigation.navigate(Routes.TERMS_PRIVACY, { type: 'privacy' })}
                >
                  Privacy Policy
                </AppText>
                .
              </AppText>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Yellow Organic Curve */}
        <View style={styles.bottomWaveContainer} pointerEvents="none">
          <Svg width="100%" height="45" viewBox="0 0 360 45" preserveAspectRatio="none">
            <Path
              d="M0 45 C120 15, 240 50, 360 25 L360 45 Z"
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
    position: 'relative',
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.xl,
  },
  headingSection: {
    marginTop: isSmallScreen ? Spacing.none : Spacing.xs,
    marginBottom: Spacing.xs,
  },
  headingMain: {
    fontSize: isSmallScreen ? 28 : 32,
    lineHeight: isSmallScreen ? 34 : 38,
    fontFamily: FontFamily.extraBold,
    color: '#111827',
    letterSpacing: -0.5,
  },
  headingHighlight: {
    fontFamily: FontFamily.extraBold,
    color: '#FFB300',
  },
  subtext: {
    fontSize: Typography.fontSize.sm,
    lineHeight: 20,
    fontFamily: FontFamily.regular,
    color: '#6B7280',
    marginTop: 4,
  },
  graphicSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: isSmallScreen ? 2 : Spacing.xs,
    position: 'relative',
  },
  scriptBadge: {
    position: 'absolute',
    right: 8,
    top: 4,
    alignItems: 'center',
    zIndex: 10,
    transform: [{ rotate: '8deg' }],
  },
  scriptText: {
    fontSize: 13,
    fontFamily: FontFamily.extraBold,
    color: '#1F2937',
    lineHeight: 15,
    fontStyle: 'italic',
  },
  scriptTextHighlight: {
    fontSize: 15,
    fontFamily: FontFamily.extraBold,
    color: '#FFB300',
    lineHeight: 17,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  locationPillsCard: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    zIndex: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  locationPillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  locationPillText: {
    fontSize: 10.5,
    fontFamily: FontFamily.semiBold,
    color: '#374151',
    marginLeft: 5,
  },
  formSection: {
    marginTop: isSmallScreen ? 4 : Spacing.sm,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: FontFamily.bold,
    color: '#111827',
    marginBottom: 6,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 12,
  },
  inputError: {
    borderColor: '#DC2626',
  },
  countryCodeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  flagEmoji: {
    fontSize: 18,
    marginRight: 4,
  },
  verticalDivider: {
    width: 1,
    height: 22,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
  },
  countryCodeText: {
    fontSize: 15,
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: FontFamily.medium,
    color: '#111827',
    paddingLeft: 6,
  },
  errorText: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: '#DC2626',
    marginTop: 4,
  },
  continueButton: {
    height: 52,
    borderRadius: BorderRadius.full,
    backgroundColor: '#FFC107',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
    shadowColor: '#FFB300',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  continueText: {
    fontSize: 16,
    fontFamily: FontFamily.bold,
    color: '#111827',
    marginRight: Spacing.xs,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: '#9CA3AF',
    paddingHorizontal: Spacing.sm,
  },
  googleButton: {
    height: 52,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButtonText: {
    fontSize: 15,
    fontFamily: FontFamily.semiBold,
    color: '#1F2937',
    marginLeft: 10,
  },
  termsContainer: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.sm,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: FontFamily.regular,
    color: '#6B7280',
    textAlign: 'center',
  },
  termsLink: {
    fontFamily: FontFamily.bold,
    color: '#FFB300',
  },
  bottomWaveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
