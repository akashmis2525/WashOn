import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppText } from '../common/AppText';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontFamily } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useAuthStore } from '../../store/authStore';

export interface OnboardingHeaderProps {
  showSkip?: boolean;
  onSkip?: () => void;
  welcomeText?: string;
  subtitleText?: string;
}

export const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  showSkip = true,
  onSkip,
  welcomeText,
  subtitleText,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { setOnboarded } = useAuthStore();

  const handleSkip = async () => {
    if (onSkip) {
      onSkip();
    } else {
      await setOnboarded(true);
      navigation.reset({
        index: 0,
        routes: [{ name: Routes.LOGIN }],
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Left Logo */}
      <View style={styles.logoWrapper}>
        <Image
          source={require('../../assets/images/logo.jpg')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* Right Action / Welcome Text */}
      {showSkip ? (
        <TouchableOpacity
          onPress={handleSkip}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          style={styles.skipButton}
        >
          <AppText style={styles.skipText}>
            Skip
          </AppText>
        </TouchableOpacity>
      ) : welcomeText ? (
        <View style={styles.welcomeContainer}>
          <AppText style={styles.welcomeText}>
            {welcomeText}
          </AppText>
          {subtitleText ? (
            <AppText style={styles.subtitleText}>
              {subtitleText}
            </AppText>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.xs,
    width: '100%',
  },
  logoWrapper: {
    height: 48,
    width: 140,
    justifyContent: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
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
  welcomeContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 15,
    fontFamily: FontFamily.bold,
    color: '#111827',
    lineHeight: 20,
  },
  subtitleText: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: '#6B7280',
    lineHeight: 16,
    marginTop: 1,
  },
});
