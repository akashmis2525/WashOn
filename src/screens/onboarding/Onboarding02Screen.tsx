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
import { Zap, Navigation, Users, ArrowRight, Car } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Typography, FontFamily } from '../../constants/typography';
import { Spacing, BorderRadius } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { OnboardingHeader } from '../../components/onboarding/OnboardingHeader';
import { PaginationDots } from '../../components/onboarding/PaginationDots';
import { Onboarding02Art } from '../../assets/illustrations/OnboardingAssets';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 720;

type Onboarding02NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.ONBOARDING_2
>;

export const Onboarding02Screen: React.FC = () => {
  const navigation = useNavigation<Onboarding02NavigationProp>();

  const handleNext = () => {
    navigation.navigate(Routes.ONBOARDING_3);
  };

  const handleBack = () => {
    navigation.navigate(Routes.ONBOARDING_1);
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
            Nearby Washermen,{'\n'}
            <AppText style={styles.headingHighlight}>Anytime</AppText>
          </AppText>

          <AppText style={styles.subtext}>
            See available washermen around you in real-time, choose the nearest and get your vehicle cleaned at your convenience.
          </AppText>
        </View>

        {/* 3 Quick Features Chips Row */}
        <View style={styles.featuresRow}>
          <View style={styles.featurePill}>
            <View style={styles.featureIconCircle}>
              <Zap size={16} color={Colors.black} />
            </View>
            <AppText style={styles.featureText}>Live{'\n'}Availability</AppText>
          </View>

          <View style={styles.featurePill}>
            <View style={styles.featureIconCircle}>
              <Navigation size={16} color={Colors.black} />
            </View>
            <AppText style={styles.featureText}>Real-time{'\n'}Tracking</AppText>
          </View>

          <View style={styles.featurePill}>
            <View style={styles.featureIconCircle}>
              <Users size={16} color={Colors.black} />
            </View>
            <AppText style={styles.featureText}>Verified{'\n'}Professionals</AppText>
          </View>

          {/* Help is Always Nearby Script Badge */}
          <View style={styles.scriptBadge}>
            <AppText style={styles.scriptText}>Help is</AppText>
            <AppText style={styles.scriptTextHighlight}>Always</AppText>
            <AppText style={styles.scriptText}>Nearby</AppText>
          </View>
        </View>

        {/* Center Map Radar & Washermen Discovery Art */}
        <View style={styles.artSection}>
          <Onboarding02Art
            width={Math.min(width * 0.94, 380)}
            height={isSmallScreen ? 190 : 230}
          />

          {/* Overlay Arrival Time Card */}
          <View style={styles.floatingArrivalCard}>
            <View style={styles.carIconWrapper}>
              <Car size={18} color={Colors.black} />
            </View>
            <View style={styles.arrivalCardTextContainer}>
              <AppText style={styles.arrivalTitle}>5+ washermen near you</AppText>
              <AppText style={styles.arrivalSub}>Average arrival time 8–12 minutes</AppText>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Pagination & Navigation Buttons */}
      <View style={styles.bottomBar}>
        <PaginationDots total={3} activeIndex={1} />

        <View style={styles.buttonsRow}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.8}
          >
            <AppText variant="button" color={Colors.black} weight="semiBold">
              Back
            </AppText>
          </TouchableOpacity>

          {/* Next Button */}
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            activeOpacity={0.85}
          >
            <AppText variant="button" color={Colors.black} weight="bold" style={styles.nextButtonText}>
              Next
            </AppText>
            <ArrowRight size={18} color={Colors.black} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
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
  featuresRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: isSmallScreen ? Spacing.xs : Spacing.sm,
    position: 'relative',
  },
  featurePill: {
    alignItems: 'center',
    width: (width - 60) / 4,
  },
  featureIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF3C4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xxs,
  },
  featureText: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: FontFamily.bold,
    color: '#111827',
    textAlign: 'center',
  },
  scriptBadge: {
    position: 'absolute',
    right: 4,
    top: -6,
    alignItems: 'center',
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
  artSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: isSmallScreen ? Spacing.xs : Spacing.sm,
    position: 'relative',
  },
  floatingArrivalCard: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  carIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF8E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  arrivalCardTextContainer: {
    flexShrink: 1,
  },
  arrivalTitle: {
    fontSize: 12,
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
  arrivalSub: {
    fontSize: 10,
    fontFamily: FontFamily.medium,
    color: '#6B7280',
  },
  bottomBar: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: Platform.OS === 'ios' ? Spacing.sm : Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  backButton: {
    width: '32%',
    height: 52,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    width: '64%',
    height: 52,
    borderRadius: BorderRadius.full,
    backgroundColor: '#FFC107',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFB300',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    marginRight: Spacing.xs,
    fontFamily: FontFamily.bold,
  },
});
