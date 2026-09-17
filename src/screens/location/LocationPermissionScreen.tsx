import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, ArrowRight, Crosshair, Map, ShieldCheck, Home } from 'lucide-react-native';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useAuthStore } from '../../store/authStore';
import { useLocationStore } from '../../store/locationStore';
import { AppText } from '../../components/common/AppText';
import { OnboardingHeader } from '../../components/onboarding/OnboardingHeader';
import { SplashVehicleShowcase } from '../../assets/illustrations/SplashAssets';

const { width } = Dimensions.get('window');

type LocationPermNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.LOCATION_PERMISSION
>;

// 3D Map Vector Graphic with Yellow Pin & Washerman
const LocationAccessMapArt: React.FC<{ size?: number }> = ({ size = 220 }) => (
  <Svg width={size} height={size * 0.8} viewBox="0 0 300 240">
    {/* Yellow Background Glow */}
    <Circle cx="220" cy="120" r="85" fill="#FFE082" opacity="0.6" />

    {/* Tilted 3D Map Board */}
    <G transform="translate(20, 20)">
      <Path
        d="M20 120 L160 40 L260 100 L120 180 Z"
        fill="#EEF2F6"
        stroke="#CBD5E1"
        strokeWidth="2"
      />
      {/* Map Roads */}
      <Path d="M40 110 L240 90" stroke="#FFFFFF" strokeWidth="12" />
      <Path d="M90 75 L180 150" stroke="#FFFFFF" strokeWidth="10" />
      <Path d="M40 110 L240 90" stroke="#93C5FD" strokeWidth="4" />
      <Path d="M90 75 L180 150" stroke="#93C5FD" strokeWidth="4" />

      {/* Target Location Pulse Ripple */}
      <Circle cx="120" cy="120" r="30" fill="#38BDF8" opacity="0.3" />
      <Circle cx="120" cy="120" r="18" fill="#0284C7" opacity="0.4" />

      {/* Big Yellow Location Pin */}
      <G transform="translate(105, 70)">
        <Path
          d="M15 0 C6.7 0 0 6.7 0 15 C0 26.2 15 45 15 45 C15 45 30 26.2 30 15 C30 6.7 23.3 0 15 0 Z"
          fill="#FFC107"
        />
        <Circle cx="15" cy="14" r="6" fill="#FFFFFF" />
      </G>

      {/* Dotted Navigation Route to Washerman */}
      <Path
        d="M135 90 Q170 80, 200 45"
        stroke="#111827"
        strokeWidth="2.5"
        strokeDasharray="4, 4"
        fill="none"
      />

      {/* Washerman Avatar Pin & "5 min away" Badge */}
      <G transform="translate(190, 25)">
        <Circle cx="18" cy="18" r="18" fill="#111827" stroke="#FFC107" strokeWidth="2" />
        <Circle cx="18" cy="15" r="7" fill="#F59E0B" />
        {/* Online Green dot */}
        <Circle cx="30" cy="6" r="4" fill="#22C55E" stroke="#FFFFFF" strokeWidth="1" />
        {/* 5 min away Pill */}
        <Rect x="40" y="8" width="68" height="20" rx="10" fill="#FFFFFF" stroke="#E2E8F0" />
      </G>
    </G>
  </Svg>
);

export const LocationPermissionScreen: React.FC = () => {
  const navigation = useNavigation<LocationPermNavigationProp>();
  const { setLocationPermission } = useAuthStore();
  const { requestCurrentLocation } = useLocationStore();

  const [loading, setLoading] = useState(false);

  const handleUseCurrentLocation = async () => {
    setLoading(true);
    await requestCurrentLocation();
    setLocationPermission(true);

    setTimeout(() => {
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: Routes.HOME_DASHBOARD }],
      });
    }, 600);
  };

  const handleEnterManually = () => {
    navigation.navigate(Routes.LOCATION_SELECTION);
  };

  const handleSkip = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.HOME_DASHBOARD }],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <AppText style={styles.mainTitle}>
            Allow{'\n'}
            <AppText style={styles.titleHighlight}>Location Access</AppText>
          </AppText>

          <AppText style={styles.subtext}>
            We need your location to show nearby washermen, provide accurate pricing and give you a better experience.
          </AppText>
        </View>

        {/* Center 3D Map Graphic Banner */}
        <View style={styles.graphicSection}>
          {/* Clean Rides Near You Script Badge */}
          <View style={styles.scriptBadge}>
            <AppText style={styles.scriptText}>Clean</AppText>
            <AppText style={styles.scriptText}>Rides</AppText>
            <AppText style={styles.scriptTextHighlight}>Near You</AppText>
          </View>

          <LocationAccessMapArt size={Math.min(width * 0.9, 340)} />

          {/* Floating Location Card */}
          <View style={styles.floatingLocationPill}>
            <View style={styles.homeIconCircle}>
              <Home size={14} color="#111827" />
            </View>
            <View style={styles.locationTextContainer}>
              <AppText style={styles.locTitle}>Your Location</AppText>
              <AppText style={styles.locSub}>Vijay Nagar, Indore, Madhya Pradesh</AppText>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          {/* Primary Button: Use Current Location */}
          <TouchableOpacity
            style={[styles.useCurrentButton, loading ? styles.buttonDisabled : null]}
            onPress={handleUseCurrentLocation}
            activeOpacity={0.85}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#111827" size="small" />
            ) : (
              <>
                <View style={styles.btnLeftContent}>
                  <Crosshair size={20} color="#111827" style={styles.btnIcon} />
                  <AppText style={styles.useCurrentText}>Use Current Location</AppText>
                </View>
                <ArrowRight size={20} color="#111827" strokeWidth={2.5} />
              </>
            )}
          </TouchableOpacity>

          {/* Secondary Button: Enter Location Manually */}
          <TouchableOpacity
            style={styles.manualButton}
            onPress={handleEnterManually}
            activeOpacity={0.8}
          >
            <View style={styles.btnLeftContent}>
              <Map size={20} color="#111827" style={styles.btnIcon} />
              <AppText style={styles.manualButtonText}>Enter Location Manually</AppText>
            </View>
            <ArrowRight size={18} color="#6B7280" strokeWidth={2} />
          </TouchableOpacity>

          {/* Trust Disclaimer Box */}
          <View style={styles.trustBox}>
            <View style={styles.trustIconWrapper}>
              <ShieldCheck size={20} color="#16A34A" />
            </View>
            <View style={styles.trustTextContainer}>
              <AppText style={styles.trustTitle}>Your location is safe with us</AppText>
              <AppText style={styles.trustSubtitle}>
                We only use your location to provide and improve our services. Learn more in our{' '}
                <AppText style={styles.privacyLink}>Privacy Policy</AppText>.
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
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
    marginBottom: Spacing.xs,
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
  graphicSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.sm,
    position: 'relative',
  },
  scriptBadge: {
    position: 'absolute',
    left: 8,
    top: 4,
    alignItems: 'flex-start',
    zIndex: 10,
    transform: [{ rotate: '-6deg' }],
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
  floatingLocationPill: {
    position: 'absolute',
    bottom: 8,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  homeIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFF8E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  locationTextContainer: {
    flexShrink: 1,
  },
  locTitle: {
    fontSize: 12,
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
  locSub: {
    fontSize: 10,
    fontFamily: FontFamily.medium,
    color: '#6B7280',
  },
  actionsSection: {
    marginTop: Spacing.sm,
  },
  useCurrentButton: {
    height: 54,
    borderRadius: BorderRadius.full,
    backgroundColor: '#FFC107',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    shadowColor: '#FFB300',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: Spacing.sm,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  btnLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnIcon: {
    marginRight: 10,
  },
  useCurrentText: {
    fontSize: 15.5,
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
  manualButton: {
    height: 52,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  manualButtonText: {
    fontSize: 15,
    fontFamily: FontFamily.semiBold,
    color: '#111827',
  },
  trustBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF9C3',
    borderRadius: 16,
    padding: Spacing.md,
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
  privacyLink: {
    fontFamily: FontFamily.bold,
    color: '#854D0E',
    textDecorationLine: 'underline',
  },
  bottomWaveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
