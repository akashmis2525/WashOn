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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Sparkles,
  Calendar,
  Car,
  CheckCircle2,
  Clock,
  CreditCard,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  XCircle,
  PlusCircle,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { BottomTabBar } from '../../components/navigation/BottomTabBar';

const { width } = Dimensions.get('window');

type SubscriptionDetailsNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.SUBSCRIPTION_DETAILS
>;

type SubscriptionDetailsRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.SUBSCRIPTION_DETAILS
>;

export const SubscriptionDetailsScreen: React.FC = () => {
  const navigation = useNavigation<SubscriptionDetailsNavProp>();
  const route = useRoute<SubscriptionDetailsRouteProp>();

  const [autoRenew, setAutoRenew] = useState<boolean>(true);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const handleUseWash = () => {
    navigation.navigate(Routes.SERVICE_CATEGORY as never);
  };

  const handleCancelSubscription = () => {
    Alert.alert(
      'Cancel Auto-Renewal',
      'You will still be able to use your remaining 3 washes until Oct 18, 2026. Auto-renewal will be turned off.',
      [
        { text: 'Keep Plan', style: 'cancel' },
        {
          text: 'Cancel Renewal',
          style: 'destructive',
          onPress: () => {
            setAutoRenew(false);
            setIsCancelled(true);
            Alert.alert('Auto-Renewal Cancelled', 'Your subscription will not renew automatically.');
          },
        },
      ]
    );
  };

  const handleViewTerms = () => {
    navigation.navigate(Routes.TERMS_PRIVACY, { type: 'terms' });
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
          <AppText style={styles.headerTitle}>Subscription Details</AppText>
          <AppText style={styles.headerSubtitle}>Manage your wash pass</AppText>
        </View>

        <View style={styles.activeBadge}>
          <Sparkles size={12} color="#059669" />
          <AppText style={styles.activeBadgeText}>
            {isCancelled ? 'Active (No Renew)' : 'Active Plan'}
          </AppText>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* MEMBERSHIP CARD */}
        <View style={styles.passCard}>
          <View style={styles.passCardHeader}>
            <View>
              <View style={styles.tagRow}>
                <AppText style={styles.passCategory}>MONTHLY PASS</AppText>
                <View style={styles.savingsPill}>
                  <AppText style={styles.savingsText}>SAVED ₹500</AppText>
                </View>
              </View>
              <AppText style={styles.passName}>Monthly Premium Wash</AppText>
            </View>
            <View style={styles.logoBadge}>
              <AppText style={styles.logoText}>
                Wash<AppText style={styles.logoHighlight}>On</AppText>
              </AppText>
            </View>
          </View>

          {/* QUOTA STATS */}
          <View style={styles.quotaRow}>
            <View style={styles.quotaItem}>
              <AppText style={styles.quotaVal}>4</AppText>
              <AppText style={styles.quotaLabel}>Total Washes</AppText>
            </View>
            <View style={styles.quotaDivider} />
            <View style={styles.quotaItem}>
              <AppText style={styles.quotaVal}>1</AppText>
              <AppText style={styles.quotaLabel}>Used Washes</AppText>
            </View>
            <View style={styles.quotaDivider} />
            <View style={styles.quotaItem}>
              <AppText style={[styles.quotaVal, { color: '#059669' }]}>3</AppText>
              <AppText style={styles.quotaLabel}>Remaining</AppText>
            </View>
          </View>

          {/* PROGRESS BAR */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '25%' }]} />
            </View>
            <View style={styles.progressTextRow}>
              <AppText style={styles.progressSub}>25% Quota consumed</AppText>
              <AppText style={styles.progressSub}>Valid till Oct 18, 2026</AppText>
            </View>
          </View>
        </View>

        {/* QUICK ACTION BUTTON */}
        <TouchableOpacity
          style={styles.bookUsingPlanBtn}
          onPress={handleUseWash}
          activeOpacity={0.85}
        >
          <Sparkles size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
          <AppText style={styles.bookUsingPlanText}>Book Wash Using Remaining Quota (3 Left)</AppText>
        </TouchableOpacity>

        {/* PLAN DETAILS */}
        <View style={styles.sectionCard}>
          <AppText style={styles.sectionHeader}>Plan Information</AppText>

          <View style={styles.infoRow}>
            <AppText style={styles.infoLabel}>Plan Fee</AppText>
            <AppText style={styles.infoVal}>₹999 / month</AppText>
          </View>

          <View style={styles.infoRow}>
            <AppText style={styles.infoLabel}>Start Date</AppText>
            <AppText style={styles.infoVal}>Sep 18, 2026</AppText>
          </View>

          <View style={styles.infoRow}>
            <AppText style={styles.infoLabel}>Expiry Date</AppText>
            <AppText style={styles.infoVal}>Oct 18, 2026</AppText>
          </View>

          <View style={styles.infoRow}>
            <AppText style={styles.infoLabel}>Billing Cycle</AppText>
            <AppText style={styles.infoVal}>Monthly</AppText>
          </View>

          <View style={styles.infoRow}>
            <AppText style={styles.infoLabel}>Auto-Renewal</AppText>
            <AppText style={[styles.infoVal, { color: autoRenew ? '#059669' : '#EF4444' }]}>
              {autoRenew ? 'Enabled (Renews Oct 18)' : 'Disabled'}
            </AppText>
          </View>
        </View>

        {/* ELIGIBLE VEHICLES */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <AppText style={styles.sectionHeader}>Linked Vehicles (1 of 2 Allowed)</AppText>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.VEHICLE_LIST as never)}
            >
              <AppText style={styles.linkText}>Manage</AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.vehicleCard}>
            <View style={styles.vehicleIconBox}>
              <Car size={20} color="#059669" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <AppText style={styles.vehicleName}>Royal Enfield Classic 350</AppText>
              <AppText style={styles.vehiclePlate}>MP 09 AB 1234 • Bike</AppText>
            </View>
            <View style={styles.primaryBadge}>
              <AppText style={styles.primaryBadgeText}>Active</AppText>
            </View>
          </View>
        </View>

        {/* USAGE HISTORY */}
        <View style={styles.sectionCard}>
          <AppText style={styles.sectionHeader}>Recent Quota Usages</AppText>

          <View style={styles.usageItem}>
            <View style={styles.usageIconCircle}>
              <CheckCircle2 size={16} color="#059669" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <AppText style={styles.usageTitle}>Foam Wash (Wash #1)</AppText>
              <AppText style={styles.usageMeta}>Sep 18, 2026 • Washerman: Rahul S.</AppText>
            </View>
            <AppText style={styles.usageCredit}>-1 Wash</AppText>
          </View>
        </View>

        {/* TERMS & CANCEL */}
        <View style={styles.footerSection}>
          <TouchableOpacity style={styles.termsRow} onPress={handleViewTerms}>
            <ShieldCheck size={16} color="#64748B" />
            <AppText style={styles.termsText}>View Subscription Terms & Conditions</AppText>
            <ChevronRight size={16} color="#94A3B8" />
          </TouchableOpacity>

          {autoRenew && (
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={handleCancelSubscription}
              activeOpacity={0.7}
            >
              <XCircle size={16} color="#EF4444" style={{ marginRight: 6 }} />
              <AppText style={styles.cancelBtnText}>Cancel Auto-Renewal</AppText>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* BOTTOM TAB BAR */}
      <BottomTabBar activeTab="wallet" />
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
    fontSize: 17,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 1,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    gap: 4,
  },
  activeBadgeText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  passCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  passCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  passCategory: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  savingsPill: {
    backgroundColor: '#059669',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  savingsText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  passName: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  logoBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  logoText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  logoHighlight: {
    color: '#059669',
  },
  quotaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 14,
  },
  quotaItem: {
    flex: 1,
    alignItems: 'center',
  },
  quotaVal: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  quotaLabel: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#94A3B8',
    marginTop: 2,
  },
  quotaDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  progressContainer: {
    gap: 4,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 3,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressSub: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
  },
  bookUsingPlanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    borderRadius: 14,
    paddingVertical: 14,
    marginBottom: 14,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  bookUsingPlanText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 10,
  },
  linkText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#059669',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  infoVal: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#0F172A',
  },
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  vehicleIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleName: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  vehiclePlate: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  primaryBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  primaryBadgeText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  usageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  usageIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  usageTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#0F172A',
  },
  usageMeta: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  usageCredit: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#EF4444',
  },
  footerSection: {
    gap: 12,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  cancelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  cancelBtnText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#EF4444',
  },
});
