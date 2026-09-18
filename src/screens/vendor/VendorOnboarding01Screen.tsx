import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Calendar,
  IndianRupee,
  MapPin,
  ArrowRight,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type VendorOnboardingNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_ONBOARDING_1
>;

export const VendorOnboarding01Screen: React.FC = () => {
  const navigation = useNavigation<VendorOnboardingNavProp>();

  const handleNext = () => {
    // Navigate to next onboarding screen (V003 Vendor Onboarding 2)
  };

  const handleSkip = () => {
    // Skip to vendor login
    navigation.navigate(Routes.VENDOR_LOGIN as never);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* BOTTOM DECORATIVE YELLOW CURVES */}
      <View style={styles.bottomLeftCurve} />
      <View style={styles.bottomRightCurve} />

      {/* TOP HEADER */}
      <View style={styles.header}>
        {/* LOGO */}
        <View style={styles.logoBox}>
          <View style={styles.carMiniIcon}>
            <View style={styles.carMiniRoof} />
            <View style={styles.carMiniDrop} />
          </View>
          <View style={{ marginLeft: 6 }}>
            <AppText style={styles.logoTitle}>
              Wash<AppText style={styles.logoTitleYellow}>On</AppText>
            </AppText>
            <AppText style={styles.logoSubtitle}>VENDOR APP</AppText>
          </View>
        </View>

        {/* SKIP BUTTON */}
        <TouchableOpacity
          onPress={handleSkip}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <AppText style={styles.skipText}>Skip</AppText>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        {/* MAIN HEADINGS */}
        <View style={styles.headingSection}>
          <AppText style={styles.headingBlack}>Turn Your Skill</AppText>
          <AppText style={styles.headingYellow}>Into Earnings</AppText>
          <AppText style={styles.description}>
            Join WashOn and provide professional vehicle washing services at your customer's doorstep.
          </AppText>
        </View>

        {/* HERO ILLUSTRATION */}
        <View style={styles.heroContainer}>
          <Image
            source={require('../../../assets/vendor_washerman_cutout.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />

          {/* OVERLAY BADGES MATCHING MOCKUP */}
          <View style={styles.leftSkillBadge}>
            <AppText style={styles.badgeBold}>Your Skill</AppText>
            <AppText style={styles.badgeItalic}>Our Platform</AppText>
            <AppText style={styles.badgeHighlight}>Bigger Opportunities</AppText>
          </View>

          <View style={styles.rightTagBadge}>
            <AppText style={styles.rightTagText}>Clean Vehicles</AppText>
            <AppText style={styles.rightTagSub}>Happier People ☺</AppText>
          </View>
        </View>

        {/* 3 BENEFIT BADGES ROW */}
        <View style={styles.benefitsRow}>
          {/* 1. FLEXIBLE WORKING */}
          <View style={styles.benefitItem}>
            <View style={styles.benefitIconCircle}>
              <Calendar size={18} color="#0F172A" />
            </View>
            <AppText style={styles.benefitTitle}>Flexible Working</AppText>
            <AppText style={styles.benefitSub}>Work on your own schedule</AppText>
          </View>

          {/* 2. EARN MORE */}
          <View style={styles.benefitItem}>
            <View style={styles.benefitIconCircle}>
              <IndianRupee size={18} color="#0F172A" />
            </View>
            <AppText style={styles.benefitTitle}>Earn More</AppText>
            <AppText style={styles.benefitSub}>Get regular bookings nearby</AppText>
          </View>

          {/* 3. DOORSTEP SERVICE */}
          <View style={styles.benefitItem}>
            <View style={styles.benefitIconCircle}>
              <MapPin size={18} color="#0F172A" />
            </View>
            <AppText style={styles.benefitTitle}>Doorstep Service</AppText>
            <AppText style={styles.benefitSub}>No shop needed. We bring customers to you.</AppText>
          </View>
        </View>

        {/* PAGINATION DOTS */}
        <View style={styles.paginationRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* NEXT BUTTON */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <AppText style={styles.nextButtonText}>Next</AppText>
          <ArrowRight size={20} color="#0F172A" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
    zIndex: 10,
  },
  logoBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carMiniIcon: {
    width: 28,
    height: 14,
    backgroundColor: '#0F172A',
    borderRadius: 5,
    position: 'relative',
  },
  carMiniRoof: {
    position: 'absolute',
    top: -6,
    left: 5,
    width: 16,
    height: 8,
    backgroundColor: '#0F172A',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  carMiniDrop: {
    position: 'absolute',
    bottom: -2,
    right: 2,
    width: 8,
    height: 10,
    backgroundColor: '#FFC80A',
    borderRadius: 4,
  },
  logoTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  logoTitleYellow: {
    color: '#FFC80A',
  },
  logoSubtitle: {
    fontSize: 7.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    letterSpacing: 1.5,
    marginTop: -1,
  },
  skipText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
  },
  headingSection: {
    marginTop: 6,
    marginBottom: 10,
  },
  headingBlack: {
    fontSize: 28,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    lineHeight: 34,
  },
  headingYellow: {
    fontSize: 28,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFC80A',
    lineHeight: 34,
  },
  description: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#475569',
    marginTop: 6,
    lineHeight: 18,
  },
  heroContainer: {
    width: '100%',
    height: height * 0.38,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  leftSkillBadge: {
    position: 'absolute',
    top: 20,
    left: 12,
    backgroundColor: '#FFC80A',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeBold: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  badgeItalic: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#0F172A',
  },
  badgeHighlight: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  rightTagBadge: {
    position: 'absolute',
    top: 40,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  rightTagText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  rightTagSub: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  benefitsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    gap: 8,
  },
  benefitItem: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
  benefitIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  benefitTitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 2,
  },
  benefitSub: {
    fontSize: 9.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 13,
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 14,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E2E8F0',
  },
  dotActive: {
    width: 18,
    backgroundColor: '#FFC80A',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC80A',
    borderRadius: 16,
    paddingVertical: 15,
    gap: 8,
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
