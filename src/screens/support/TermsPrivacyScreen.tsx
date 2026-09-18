import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  FileText,
  ShieldCheck,
  CalendarX,
  RotateCcw,
  UserCheck,
  ChevronRight,
  Shield,
  Sparkles,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width } = Dimensions.get('window');

type TermsNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.TERMS_PRIVACY
>;

interface PolicyItem {
  id: string;
  title: string;
  description: string;
  iconType: 'terms' | 'privacy' | 'cancel' | 'refund' | 'safety';
  cardStyle?: 'default' | 'peach' | 'mint' | 'purple';
}

const POLICIES: PolicyItem[] = [
  {
    id: 'terms_service',
    title: 'Terms of Service',
    description: 'Rules and guidelines for using WashOn services.',
    iconType: 'terms',
    cardStyle: 'default',
  },
  {
    id: 'privacy_policy',
    title: 'Privacy Policy',
    description: 'How we collect, use and protect your personal information.',
    iconType: 'privacy',
    cardStyle: 'default',
  },
  {
    id: 'cancellation_policy',
    title: 'Cancellation Policy',
    description: 'Learn about booking cancellations and applicable charges.',
    iconType: 'cancel',
    cardStyle: 'peach',
  },
  {
    id: 'refund_policy',
    title: 'Refund Policy',
    description: 'Information about refunds and processing timelines.',
    iconType: 'refund',
    cardStyle: 'mint',
  },
  {
    id: 'user_safety_policy',
    title: 'User Safety Policy',
    description: 'Measures we take to ensure a safe and secure experience for all users.',
    iconType: 'safety',
    cardStyle: 'purple',
  },
];

export const TermsPrivacyScreen: React.FC = () => {
  const navigation = useNavigation<TermsNavProp>();

  const handlePolicyPress = (policy: PolicyItem) => {
    Alert.alert(policy.title, policy.description);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <ArrowLeft size={22} color={Colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <AppText style={styles.headerTitle}>Terms & Privacy</AppText>
          <AppText style={styles.headerSubtitle}>
            Your trust matters to us
          </AppText>
        </View>

        <View style={styles.logoBadge}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=100&auto=format&fit=crop&q=80',
            }}
            style={styles.logoIcon}
          />
          <AppText style={styles.logoText}>
            Wash<AppText style={styles.logoTextHighlight}>On</AppText>
          </AppText>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <AppText style={styles.introSubtitle}>
          Read our policies to understand how we work and keep you safe.
        </AppText>

        {/* POLICY CARDS */}
        <View style={styles.policiesList}>
          {POLICIES.map((policy) => {
            const isPeach = policy.cardStyle === 'peach';
            const isMint = policy.cardStyle === 'mint';
            const isPurple = policy.cardStyle === 'purple';

            return (
              <TouchableOpacity
                key={policy.id}
                style={[
                  styles.policyCard,
                  isPeach && styles.policyCardPeach,
                  isMint && styles.policyCardMint,
                  isPurple && styles.policyCardPurple,
                ]}
                onPress={() => handlePolicyPress(policy)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.policyIconCircle,
                    policy.iconType === 'terms' && styles.termsIconBg,
                    policy.iconType === 'privacy' && styles.privacyIconBg,
                    policy.iconType === 'cancel' && styles.cancelIconBg,
                    policy.iconType === 'refund' && styles.refundIconBg,
                    policy.iconType === 'safety' && styles.safetyIconBg,
                  ]}
                >
                  {policy.iconType === 'terms' && (
                    <FileText size={18} color="#059669" />
                  )}
                  {policy.iconType === 'privacy' && (
                    <ShieldCheck size={18} color="#2563EB" />
                  )}
                  {policy.iconType === 'cancel' && (
                    <CalendarX size={18} color="#EF4444" />
                  )}
                  {policy.iconType === 'refund' && (
                    <RotateCcw size={18} color="#059669" />
                  )}
                  {policy.iconType === 'safety' && (
                    <UserCheck size={18} color="#7C3AED" />
                  )}
                </View>

                <View style={styles.policyTextContainer}>
                  <AppText style={styles.policyTitle}>{policy.title}</AppText>
                  <AppText style={styles.policyDescription}>
                    {policy.description}
                  </AppText>
                </View>

                <ChevronRight size={18} color="#94A3B8" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* TRUST BANNER */}
        <View style={styles.trustBanner}>
          <View style={styles.trustLeft}>
            <AppText style={styles.trustTitle}>
              A safer, cleaner and more trusted experience
            </AppText>
            <AppText style={styles.trustSubtitle}>
              We are committed to transparency, privacy and your safety.
            </AppText>
          </View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300&auto=format&fit=crop&q=80',
            }}
            style={styles.trustGraphic}
            resizeMode="cover"
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 1,
  },
  logoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  logoIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 4,
  },
  logoText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  logoTextHighlight: {
    color: '#059669',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  introSubtitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginBottom: 14,
    lineHeight: 16,
  },
  policiesList: {
    gap: 12,
    marginBottom: 16,
  },
  policyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  policyCardPeach: {
    backgroundColor: '#FFFDF9',
    borderColor: '#FED7AA',
  },
  policyCardMint: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  policyCardPurple: {
    backgroundColor: '#FAF5FF',
    borderColor: '#E9D5FF',
  },
  policyIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  termsIconBg: { backgroundColor: '#D1FAE5' },
  privacyIconBg: { backgroundColor: '#DBEAFE' },
  cancelIconBg: { backgroundColor: '#FEE2E2' },
  refundIconBg: { backgroundColor: '#DCFCE7' },
  safetyIconBg: { backgroundColor: '#F3E8FF' },
  policyTextContainer: {
    flex: 1,
    paddingRight: 6,
  },
  policyTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 2,
  },
  policyDescription: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    lineHeight: 15,
  },
  trustBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    overflow: 'hidden',
  },
  trustLeft: {
    flex: 1,
    paddingRight: 8,
  },
  trustTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
    marginBottom: 4,
  },
  trustSubtitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#047857',
    lineHeight: 15,
  },
  trustGraphic: {
    width: 75,
    height: 50,
    borderRadius: 8,
  },
});
