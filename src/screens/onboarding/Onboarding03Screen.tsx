import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Calendar, MapPin, CreditCard, ChevronRight, ArrowRight, ShieldCheck, Sparkles, Smile } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Typography, FontFamily } from '../../constants/typography';
import { Spacing, BorderRadius } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useAuthStore } from '../../store/authStore';
import { AppText } from '../../components/common/AppText';
import { OnboardingHeader } from '../../components/onboarding/OnboardingHeader';
import { PaginationDots } from '../../components/onboarding/PaginationDots';
import { Onboarding03Art } from '../../assets/illustrations/OnboardingAssets';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 720;

type Onboarding03NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.ONBOARDING_3
>;

export const Onboarding03Screen: React.FC = () => {
  const navigation = useNavigation<Onboarding03NavigationProp>();
  const { setOnboarded } = useAuthStore();

  const handleGetStarted = async () => {
    await setOnboarded(true);
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.LOGIN }],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header with WashOn Logo & Skip Button */}
      <OnboardingHeader showSkip={true} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Main Heading */}
        <View style={styles.headingContainer}>
          <AppText style={styles.headingMain}>
            Book. Track.{' '}
            <AppText style={styles.headingHighlight}>Pay.</AppText>
          </AppText>

          <AppText style={styles.subtext}>
            A seamless experience from booking to a sparkling ride — all in one app.
          </AppText>
        </View>

        {/* 3 Step Workflow Row with Connected Arrows */}
        <View style={styles.stepsWorkflowContainer}>
          {/* Step 1: Book */}
          <View style={styles.stepItem}>
            <View style={styles.stepIconCircle}>
              <Calendar size={16} color={Colors.black} />
            </View>
            <AppText style={styles.stepTitle}>1. Book</AppText>
            <AppText style={styles.stepDesc}>
              Choose vehicle, service & location.
            </AppText>
          </View>

          <ChevronRight size={16} color="#9CA3AF" style={styles.arrowIcon} />

          {/* Step 2: Track */}
          <View style={styles.stepItem}>
            <View style={styles.stepIconCircle}>
              <MapPin size={16} color={Colors.black} />
            </View>
            <AppText style={styles.stepTitle}>2. Track</AppText>
            <AppText style={styles.stepDesc}>
              See washerman arriving live.
            </AppText>
          </View>

          <ChevronRight size={16} color="#9CA3AF" style={styles.arrowIcon} />

          {/* Step 3: Pay */}
          <View style={styles.stepItem}>
            <View style={styles.stepIconCircle}>
              <CreditCard size={16} color={Colors.black} />
            </View>
            <AppText style={styles.stepTitle}>3. Pay</AppText>
            <AppText style={styles.stepDesc}>
              Pay securely after service.
            </AppText>
          </View>
        </View>

        {/* Center Live Tracking & Vehicle Showcase Graphic */}
        <View style={styles.artSection}>
          <Onboarding03Art
            width={Math.min(width * 0.94, 380)}
            height={isSmallScreen ? 180 : 220}
          />

          {/* Cleaner Vehicles Happier Days Script Badge */}
          <View style={styles.scriptBadge}>
            <AppText style={styles.scriptText}>Cleaner</AppText>
            <AppText style={styles.scriptText}>Vehicles</AppText>
            <AppText style={styles.scriptTextHighlight}>Happier Days</AppText>
          </View>

          {/* Trust Badges Card Overlay */}
          <View style={styles.trustBadgesCard}>
            <View style={styles.trustBadgeRow}>
              <ShieldCheck size={14} color="#D97706" />
              <AppText style={styles.trustBadgeText}>Verified Pros</AppText>
            </View>
            <View style={styles.trustBadgeRow}>
              <Sparkles size={14} color="#16A34A" />
              <AppText style={styles.trustBadgeText}>Quality Service</AppText>
            </View>
            <View style={styles.trustBadgeRow}>
              <Smile size={14} color="#F59E0B" />
              <AppText style={styles.trustBadgeText}>Hassle-Free</AppText>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Pagination & Get Started Button */}
      <View style={styles.bottomBar}>
        <PaginationDots total={3} activeIndex={2} />

        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleGetStarted}
          activeOpacity={0.85}
        >
          <AppText variant="button" color={Colors.black} weight="bold" style={styles.getStartedText}>
            Get Started
          </AppText>
          <ArrowRight size={20} color={Colors.black} strokeWidth={2.5} />
        </TouchableOpacity>

        {/* Subtitle Footer */}
        <AppText style={styles.footerTagline}>
          Your Vehicle. Fresh & Clean.
        </AppText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  headingContainer: {
    marginTop: isSmallScreen ? Spacing.xs : Spacing.sm,
    marginBottom: Spacing.md,
  },
  headingMain: {
    fontSize: isSmallScreen ? 28 : 34,
    lineHeight: isSmallScreen ? 34 : 40,
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
    marginTop: Spacing.xs,
  },
  stepsWorkflowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: isSmallScreen ? Spacing.xs : Spacing.sm,
    backgroundColor: '#FAFAFA',
    padding: Spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  stepItem: {
    flex: 1,
    alignItems: 'center',
  },
  stepIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFF3C4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 12,
    fontFamily: FontFamily.bold,
    color: '#111827',
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 10,
    lineHeight: 13,
    fontFamily: FontFamily.regular,
    color: '#6B7280',
    textAlign: 'center',
  },
  arrowIcon: {
    marginTop: 10,
  },
  artSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: isSmallScreen ? Spacing.xs : Spacing.sm,
    position: 'relative',
  },
  scriptBadge: {
    position: 'absolute',
    left: '42%',
    top: 10,
    alignItems: 'center',
    transform: [{ rotate: '6deg' }],
  },
  scriptText: {
    fontSize: 13,
    fontFamily: FontFamily.extraBold,
    color: '#1F2937',
    lineHeight: 15,
    fontStyle: 'italic',
  },
  scriptTextHighlight: {
    fontSize: 14,
    fontFamily: FontFamily.extraBold,
    color: '#FFB300',
    lineHeight: 16,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  trustBadgesCard: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  trustBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  trustBadgeText: {
    fontSize: 10,
    fontFamily: FontFamily.semiBold,
    color: '#374151',
    marginLeft: 5,
  },
  bottomBar: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: Platform.OS === 'ios' ? Spacing.sm : Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  getStartedButton: {
    width: '100%',
    height: 54,
    borderRadius: BorderRadius.full,
    backgroundColor: '#FFC107',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xs,
    shadowColor: '#FFB300',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  getStartedText: {
    fontSize: 16,
    fontFamily: FontFamily.bold,
    color: '#111827',
    marginRight: Spacing.xs,
  },
  footerTagline: {
    textAlign: 'center',
    fontSize: 11,
    fontFamily: FontFamily.medium,
    color: '#9CA3AF',
    marginTop: Spacing.xs,
  },
});
