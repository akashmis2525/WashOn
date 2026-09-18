import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Sparkles } from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type VendorSplashNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_SPLASH
>;

export const VendorSplashScreen: React.FC = () => {
  const navigation = useNavigation<VendorSplashNavProp>();

  // Animation controllers
  const spinValue = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    // Fade & scale entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous rotation for spinner
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Session / splash transition timeout (simulate init or route)
    const timer = setTimeout(() => {
      // Ready for next vendor screen (e.g. V002 Vendor Onboarding / Login)
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* TOP-LEFT YELLOW DECORATIVE CURVE */}
      <View style={styles.topLeftCurve} />

      {/* BOTTOM-LEFT & BOTTOM-RIGHT YELLOW DECORATIVE CURVE */}
      <View style={styles.bottomLeftCurve} />
      <View style={styles.bottomRightCurve} />

      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        {/* TOP BRAND HEADER */}
        <View style={styles.brandContainer}>
          {/* LOGO ICON */}
          <View style={styles.logoIconContainer}>
            {/* Custom SVG/View stylized car & droplet icon */}
            <View style={styles.carBody}>
              <View style={styles.carRoof} />
              <View style={styles.carBubble1} />
              <View style={styles.carBubble2} />
              <View style={styles.carBubble3} />
              <View style={styles.dropIcon}>
                <View style={styles.innerDrop} />
              </View>
            </View>
          </View>

          {/* BRAND NAME */}
          <AppText style={styles.brandTitle}>
            Wash<AppText style={styles.brandTitleYellow}>On</AppText>
          </AppText>
          <AppText style={styles.vendorAppBadge}>VENDOR APP</AppText>
        </View>

        {/* HEADLINE */}
        <View style={styles.headlineSection}>
          <AppText style={styles.headlineBlack}>Earn More.</AppText>
          <AppText style={styles.headlineYellow}>Wash Better.</AppText>

          <AppText style={styles.subHeadline}>
            Be your own boss. Serve nearby.{'\n'}Grow with WashOn.
          </AppText>
        </View>

        {/* HERO ILLUSTRATION */}
        <View style={styles.heroContainer}>
          <Image
            source={require('../../../assets/vendor_splash_hero.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        {/* BOTTOM LOADING SECTION */}
        <View style={styles.loadingSection}>
          <View style={styles.spinnerWrapper}>
            <Animated.View
              style={[
                styles.spinnerRing,
                { transform: [{ rotate: spin }] },
              ]}
            >
              <View style={styles.spinnerSegment} />
            </Animated.View>
          </View>
          <AppText style={styles.loadingText}>Loading...</AppText>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden',
  },
  topLeftCurve: {
    position: 'absolute',
    top: -height * 0.12,
    left: -width * 0.25,
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    backgroundColor: '#FFC80A',
    transform: [{ rotate: '-15deg' }],
  },
  bottomLeftCurve: {
    position: 'absolute',
    bottom: -height * 0.08,
    left: -width * 0.2,
    width: width * 0.55,
    height: width * 0.55,
    borderRadius: (width * 0.55) / 2,
    backgroundColor: '#FFC80A',
    opacity: 0.95,
  },
  bottomRightCurve: {
    position: 'absolute',
    bottom: -height * 0.1,
    right: -width * 0.25,
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    backgroundColor: '#FFC80A',
    opacity: 0.95,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    zIndex: 2,
  },
  brandContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  logoIconContainer: {
    width: 60,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  carBody: {
    width: 44,
    height: 18,
    backgroundColor: '#0F172A',
    borderRadius: 8,
    position: 'relative',
  },
  carRoof: {
    position: 'absolute',
    top: -10,
    left: 8,
    width: 26,
    height: 12,
    backgroundColor: '#0F172A',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  carBubble1: {
    position: 'absolute',
    top: -16,
    left: 18,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFC80A',
  },
  carBubble2: {
    position: 'absolute',
    top: -12,
    left: 26,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFC80A',
  },
  carBubble3: {
    position: 'absolute',
    top: -18,
    left: 23,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#FFC80A',
  },
  dropIcon: {
    position: 'absolute',
    bottom: -4,
    right: 4,
    width: 14,
    height: 18,
    backgroundColor: '#FFC80A',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    transform: [{ rotate: '45deg' }],
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  innerDrop: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    marginTop: 3,
    marginLeft: 3,
  },
  brandTitle: {
    fontSize: 28,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  brandTitleYellow: {
    color: '#FFC80A',
  },
  vendorAppBadge: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    letterSpacing: 3,
    marginTop: 2,
  },
  headlineSection: {
    alignItems: 'center',
    marginVertical: 10,
  },
  headlineBlack: {
    fontSize: 26,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: 30,
  },
  headlineYellow: {
    fontSize: 26,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFC80A',
    textAlign: 'center',
    lineHeight: 30,
    marginTop: 2,
  },
  subHeadline: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 18,
  },
  heroContainer: {
    width: width * 0.9,
    height: height * 0.42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  loadingSection: {
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  spinnerWrapper: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerRing: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 3,
    borderColor: '#F1F5F9',
    position: 'relative',
  },
  spinnerSegment: {
    position: 'absolute',
    top: -3,
    left: -3,
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 3,
    borderColor: 'transparent',
    borderTopColor: '#FFC80A',
    borderRightColor: '#FFC80A',
  },
  loadingText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
});
