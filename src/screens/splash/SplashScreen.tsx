import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { Config } from '../../constants/config';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useAuthStore } from '../../store/authStore';
import { AppText } from '../../components/common/AppText';
import { LoadingSpinner } from '../../components/loaders/LoadingSpinner';
import {
  SplashCornerDecors,
  SplashVehicleShowcase,
} from '../../assets/illustrations/SplashAssets';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 720;

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.SPLASH
>;

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const { initializeAuth } = useAuthStore();

  // Smooth entrance animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.94)).current;
  const translateYAnim = useRef(new Animated.Value(15)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();

    // Prepare App and Route
    let isMounted = true;
    const prepareApp = async () => {
      await initializeAuth();

      setTimeout(() => {
        if (!isMounted) return;

        const authState = useAuthStore.getState();
        if (authState.isAuthenticated) {
          navigation.reset({
            index: 0,
            routes: [{ name: Routes.HOME_DASHBOARD }],
          });
        } else if (authState.isOnboarded) {
          navigation.reset({
            index: 0,
            routes: [{ name: Routes.LOGIN }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: Routes.ONBOARDING_1 }],
          });
        }
      }, Config.splashDurationMs);
    };

    prepareApp();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white}
        translucent={Platform.OS === 'android'}
      />

      {/* Top-Left and Bottom-Right Yellow Organic Corner Shapes */}
      <SplashCornerDecors />

      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
          },
        ]}
      >
        {/* TOP: Official WashOn Logo (Image 002) */}
        <View style={styles.logoSection}>
          <Image
            source={require('../../assets/images/logo.jpg')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* MIDDLE-UP: Brand Tagline & Center Accent Indicator Bar */}
        <View style={styles.taglineSection}>
          <AppText style={styles.taglineText}>
            Your Vehicle.{' '}
            <AppText style={styles.taglineHighlight}>
              Fresh & Clean.
            </AppText>
          </AppText>

          {/* Center Subtle Accent Bar */}
          <View style={styles.accentBarContainer}>
            <View style={styles.accentBarBackground}>
              <View style={styles.accentBarPill} />
            </View>
          </View>
        </View>

        {/* CENTER: City Skyline Backdrop + Sports Bike & White SUV (Image 001) */}
        <View style={styles.vehicleSection}>
          <SplashVehicleShowcase
            width={Math.min(width * 0.94, 380)}
            height={isSmallScreen ? 160 : 190}
          />
        </View>

        {/* BOTTOM: Yellow Loading Spinner & "Getting things ready..." Subtitle */}
        <View style={styles.bottomSection}>
          <LoadingSpinner
            size={36}
            color="#FFB300"
          />
          <AppText style={styles.loadingText}>
            Getting things ready...
          </AppText>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
    position: 'relative',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: isSmallScreen ? Spacing.sm : Spacing.md,
    paddingBottom: isSmallScreen ? Spacing.md : Spacing.xl,
    zIndex: 10,
  },
  logoSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: isSmallScreen ? 10 : 25,
  },
  logoImage: {
    width: isSmallScreen ? 210 : 240,
    height: isSmallScreen ? 165 : 190,
  },
  taglineSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -8,
    marginBottom: isSmallScreen ? Spacing.xs : Spacing.sm,
  },
  taglineText: {
    fontSize: isSmallScreen ? 21 : 24,
    fontFamily: FontFamily.extraBold,
    color: '#111827',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  taglineHighlight: {
    fontSize: isSmallScreen ? 21 : 24,
    fontFamily: FontFamily.extraBold,
    color: '#FFB300',
  },
  accentBarContainer: {
    marginTop: Spacing.sm,
    alignItems: 'center',
  },
  accentBarBackground: {
    width: 60,
    height: 3.5,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accentBarPill: {
    width: 26,
    height: 3.5,
    borderRadius: 2,
    backgroundColor: '#FFB300',
  },
  vehicleSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: isSmallScreen ? 0 : Spacing.xs,
  },
  bottomSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: isSmallScreen ? Spacing.xs : Spacing.sm,
  },
  loadingText: {
    marginTop: Spacing.xs,
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.medium,
    color: '#6B7280',
  },
});
