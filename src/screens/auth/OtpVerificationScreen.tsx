import React, { useState, useEffect, useRef } from 'react';
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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, ArrowRight, Edit2, Headphones, ShieldCheck } from 'lucide-react-native';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useAuthStore } from '../../store/authStore';
import { AppText } from '../../components/common/AppText';
import { Config } from '../../constants/config';

const { width } = Dimensions.get('window');

type OtpScreenRouteProp = RouteProp<RootStackParamList, typeof Routes.OTP_VERIFICATION>;
type OtpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.OTP_VERIFICATION
>;

// Mini Phone Vector with OTP Speech Bubble Illustration
const OtpPhoneArt: React.FC<{ size?: number }> = ({ size = 96 }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Circle cx="50" cy="50" r="45" fill="#FFF3C4" />
    {/* Phone */}
    <Rect x="28" y="16" width="44" height="68" rx="8" fill="#FFFFFF" stroke="#111827" strokeWidth="3" />
    <Rect x="42" y="20" width="16" height="3" rx="1.5" fill="#111827" />
    {/* Lines on phone screen */}
    <Rect x="34" y="58" width="32" height="3" rx="1.5" fill="#E2E8F0" />
    <Rect x="34" y="64" width="22" height="3" rx="1.5" fill="#E2E8F0" />
    <Rect x="34" y="70" width="26" height="3" rx="1.5" fill="#E2E8F0" />
    {/* OTP Yellow Bubble */}
    <G transform="translate(30, 26)">
      <Rect x="0" y="0" width="52" height="26" rx="6" fill="#FFC107" />
      <Path d="M12 26 L18 26 L12 32 Z" fill="#FFC107" />
    </G>
  </Svg>
);

export const OtpVerificationScreen: React.FC = () => {
  const navigation = useNavigation<OtpScreenNavigationProp>();
  const route = useRoute<OtpScreenRouteProp>();
  const { loginSuccess } = useAuthStore();

  const phoneNumber = route.params?.phoneNumber || '+91 9876543210';
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [timer, setTimer] = useState(25);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (errorMessage) setErrorMessage('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      setErrorMessage('Please enter the complete 6-digit OTP');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    setTimeout(async () => {
      setLoading(false);
      await loginSuccess('mock_access_token_123', 'mock_refresh_token_456', phoneNumber);
      // Navigate to Create Profile (Screen 007)
      navigation.navigate(Routes.CREATE_PROFILE, { phoneNumber });
    }, 800);
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      setOtp(['1', '2', '3', '4', '5', '6']);
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

          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => navigation.navigate(Routes.HELP_SUPPORT)}
          >
            <Headphones size={16} color={Colors.black} />
            <AppText style={styles.helpText}>Help?</AppText>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Main Title & Subtitle + Graphic */}
          <View style={styles.titleSection}>
            <View style={styles.titleTextContainer}>
              <AppText style={styles.mainTitle}>
                Verify Your{'\n'}
                <AppText style={styles.titleHighlight}>Mobile Number</AppText>
              </AppText>

              <AppText style={styles.subtext}>
                We have sent a 6-digit OTP to{'\n'}
                <AppText style={styles.phoneText}>{phoneNumber}</AppText>
                {'\n'}Enter the OTP below to continue.
              </AppText>
            </View>

            <View style={styles.illustrationWrapper}>
              <OtpPhoneArt size={90} />
            </View>
          </View>

          {/* 6-Digit OTP Input Boxes */}
          <View style={styles.otpBoxesRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={[
                  styles.otpInputBox,
                  digit ? styles.otpInputFilled : null,
                  errorMessage ? styles.otpInputError : null,
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(val) => handleOtpChange(val, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                selectTextOnFocus
              />
            ))}
          </View>

          {errorMessage ? (
            <AppText style={styles.errorText}>{errorMessage}</AppText>
          ) : null}

          {/* Resend Timer */}
          <View style={styles.resendRow}>
            <AppText style={styles.resendQuestion}>Didn't receive the OTP? </AppText>
            <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
              <AppText style={styles.resendAction}>
                {timer > 0 ? `Resend in 00:${timer < 10 ? `0${timer}` : timer}` : 'Resend OTP'}
              </AppText>
            </TouchableOpacity>
          </View>

          {/* Verify OTP Button */}
          <TouchableOpacity
            style={[styles.verifyButton, loading ? styles.buttonDisabled : null]}
            onPress={handleVerify}
            activeOpacity={0.85}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#111827" size="small" />
            ) : (
              <>
                <AppText style={styles.verifyButtonText}>Verify OTP</AppText>
                <ArrowRight size={20} color="#111827" strokeWidth={2.5} />
              </>
            )}
          </TouchableOpacity>

          {/* Or Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <AppText style={styles.dividerText}>or</AppText>
            <View style={styles.dividerLine} />
          </View>

          {/* Change Mobile Number Button */}
          <TouchableOpacity
            style={styles.changePhoneButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Edit2 size={16} color="#111827" />
            <AppText style={styles.changePhoneText}>Change Mobile Number</AppText>
          </TouchableOpacity>

          {/* Trust Guarantee Box */}
          <View style={styles.trustBox}>
            <View style={styles.trustIconWrapper}>
              <ShieldCheck size={20} color="#16A34A" />
            </View>
            <View style={styles.trustTextContainer}>
              <AppText style={styles.trustTitle}>Your data is safe with us</AppText>
              <AppText style={styles.trustSubtitle}>
                We use industry-standard encryption to keep your information secure.
              </AppText>
            </View>
          </View>
        </ScrollView>
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
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  helpText: {
    fontSize: 13,
    fontFamily: FontFamily.semiBold,
    color: '#111827',
    marginLeft: 6,
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  titleTextContainer: {
    flex: 1,
    paddingRight: Spacing.xs,
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
    lineHeight: 19,
    fontFamily: FontFamily.regular,
    color: '#6B7280',
    marginTop: Spacing.xs,
  },
  phoneText: {
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
  illustrationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Spacing.md,
  },
  otpInputBox: {
    width: (width - 64) / 6,
    height: 56,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FAFAFA',
    textAlign: 'center',
    fontSize: 22,
    fontFamily: FontFamily.extraBold,
    color: '#111827',
  },
  otpInputFilled: {
    borderColor: '#FFC107',
    backgroundColor: '#FFFDE7',
  },
  otpInputError: {
    borderColor: '#DC2626',
  },
  errorText: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: '#DC2626',
    textAlign: 'center',
    marginTop: 4,
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.sm,
  },
  resendQuestion: {
    fontSize: 13,
    fontFamily: FontFamily.regular,
    color: '#6B7280',
  },
  resendAction: {
    fontSize: 13,
    fontFamily: FontFamily.bold,
    color: '#FFB300',
  },
  verifyButton: {
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
  verifyButtonText: {
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
  changePhoneButton: {
    height: 52,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePhoneText: {
    fontSize: 15,
    fontFamily: FontFamily.semiBold,
    color: '#111827',
    marginLeft: 8,
  },
  trustBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF9C3',
    borderRadius: 16,
    padding: Spacing.md,
    marginTop: Spacing.xl,
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
});
