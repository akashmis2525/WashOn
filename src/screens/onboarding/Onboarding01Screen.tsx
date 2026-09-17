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
import { Home, Building2, MapPin, ArrowRight } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Typography, FontFamily } from '../../constants/typography';
import { Spacing, BorderRadius } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { OnboardingHeader } from '../../components/onboarding/OnboardingHeader';
import { PaginationDots } from '../../components/onboarding/PaginationDots';
import { Onboarding01Art } from '../../assets/illustrations/OnboardingAssets';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 720;

type Onboarding01NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.ONBOARDING_1
>;

export const Onboarding01Screen: React.FC = () => {
  const navigation = useNavigation<Onboarding01NavigationProp>();

  const handleNext = () => {
    navigation.navigate(Routes.ONBOARDING_2);
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(Routes.SPLASH);
    }
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
            Wash Your{'\n'}
            <AppText style={styles.headingHighlight}>Vehicle </AppText>
            Anywhere
          </AppText>

          <AppText style={styles.subtext}>
            Get professional car & bike washing at your doorstep. No more waiting, no more driving to a car wash.
          </AppText>
        </View>

        {/* 3 Quick Features Chips Row */}
        <View style={styles.featuresRow}>
          <View style={styles.featurePill}>
            <View style={styles.featureIconCircle}>
              <Home size={16} color={Colors.black} />
            </View>
            <AppText style={styles.featureText}>At Your{'\n'}Home</AppText>
          </View>

          <View style={styles.featurePill}>
            <View style={styles.featureIconCircle}>
              <Building2 size={16} color={Colors.black} />
            </View>
            <AppText style={styles.featureText}>At Your{'\n'}Office</AppText>
          </View>

          <View style={styles.featurePill}>
            <View style={styles.featureIconCircle}>
              <MapPin size={16} color={Colors.black} />
            </View>
            <AppText style={styles.featureText}>Anywhere{'\n'}You Are</AppText>
          </View>

          {/* Clean Happier Rides Script Badge */}
          <View style={styles.scriptBadge}>
            <AppText style={styles.scriptText}>Clean</AppText>
            <AppText style={styles.scriptText}>Happier</AppText>
            <AppText style={styles.scriptTextHighlight}>Rides</AppText>
          </View>
        </View>

        {/* Center Doorstep Washing Illustration */}
        <View style={styles.artSection}>
          <View style={styles.doorstepBadge}>
            <AppText style={styles.doorstepText}>Doorstep Service ⤹</AppText>
          </View>
          <Onboarding01Art
            width={Math.min(width * 0.94, 380)}
            height={isSmallScreen ? 190 : 230}
          />
        </View>
      </ScrollView>

      {/* Bottom Pagination & Navigation Buttons */}
      <View style={styles.bottomBar}>
        <PaginationDots total={3} activeIndex={0} />

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
    fontSize: 14,
    fontFamily: FontFamily.extraBold,
    color: '#1F2937',
    lineHeight: 16,
    fontStyle: 'italic',
  },
  scriptTextHighlight: {
    fontSize: 16,
    fontFamily: FontFamily.extraBold,
    color: '#FFB300',
    lineHeight: 18,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  artSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: isSmallScreen ? Spacing.xs : Spacing.sm,
    position: 'relative',
  },
  doorstepBadge: {
    position: 'absolute',
    left: 10,
    top: 15,
    zIndex: 10,
  },
  doorstepText: {
    fontSize: 13,
    fontFamily: FontFamily.bold,
    color: '#1F2937',
    fontStyle: 'italic',
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
