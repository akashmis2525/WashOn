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
  Calendar,
  Crown,
  Users,
  Car,
  Clock,
  PiggyBank,
  CheckCircle2,
  Sparkles,
  Gift,
  ShieldCheck,
  Star,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width } = Dimensions.get('window');

type SubPlansNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.SUBSCRIPTION_PLANS
>;

interface PlanItem {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
  badgeType?: 'starter' | 'popular' | 'best';
  price: string;
  originalPrice: string;
  billingPeriod: string;
  washesCount: string;
  washesPeriod: string;
  vehicleLimit: string;
  validity: string;
  savings: string;
  cardTheme: 'default' | 'gold' | 'purple';
  perksBanner?: string;
  perksIcon?: string;
}

const SUBSCRIPTION_PLANS: PlanItem[] = [
  {
    id: 'weekly_wash',
    name: 'Weekly Wash',
    subtitle: 'Keep your car fresh every week',
    badge: 'GREAT FOR STARTERS',
    badgeType: 'starter',
    price: '₹499',
    originalPrice: '₹550',
    billingPeriod: 'per week',
    washesCount: '1 Wash',
    washesPeriod: 'per week',
    vehicleLimit: '1 Vehicle\nincluded',
    validity: '7 Days\nvalidity',
    savings: 'Save 10%\nvs. single wash',
    cardTheme: 'default',
  },
  {
    id: 'monthly_wash',
    name: 'Monthly Wash',
    subtitle: 'Clean car, happy month',
    badge: 'MOST POPULAR',
    badgeType: 'popular',
    price: '₹1,499',
    originalPrice: '₹1,800',
    billingPeriod: 'per month',
    washesCount: '4 Washes',
    washesPeriod: 'per month',
    vehicleLimit: '1 Vehicle\nincluded',
    validity: '30 Days\nvalidity',
    savings: 'Save 20%\nvs. single wash',
    cardTheme: 'default',
  },
  {
    id: 'premium_monthly',
    name: 'Premium Monthly',
    subtitle: 'Complete care with extra benefits',
    badge: 'BEST VALUE',
    badgeType: 'best',
    price: '₹2,499',
    originalPrice: '₹3,600',
    billingPeriod: 'per month',
    washesCount: '8 Washes',
    washesPeriod: 'per month',
    vehicleLimit: '1 Vehicle\nincluded',
    validity: '30 Days\nvalidity',
    savings: 'Save 30%\nvs. single wash',
    cardTheme: 'gold',
    perksBanner: 'Includes: Exterior + Interior + Polish | Priority Booking | Free Pickup & Drop',
    perksIcon: 'star',
  },
  {
    id: 'family_plan',
    name: 'Family Vehicle Plan',
    subtitle: 'Perfect for multi-vehicle families',
    price: '₹2,999',
    originalPrice: '₹4,600',
    billingPeriod: 'per month',
    washesCount: '8 Washes',
    washesPeriod: 'per month',
    vehicleLimit: 'Up to 3 Vehicles\nincluded',
    validity: '30 Days\nvalidity',
    savings: 'Save 35%\nvs. single wash',
    cardTheme: 'purple',
    perksBanner: 'Ideal for families | Share plan across vehicles | Priority support',
    perksIcon: 'users',
  },
];

export const SubscriptionPlansScreen: React.FC = () => {
  const navigation = useNavigation<SubPlansNavProp>();
  const [selectedPlan, setSelectedPlan] = useState<string>('monthly_wash');

  const handleSubscribe = (plan: PlanItem) => {
    Alert.alert(
      'Subscribe to ' + plan.name,
      `You selected ${plan.name} at ${plan.price} ${plan.billingPeriod}. Proceed to payment?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm & Pay',
          onPress: () => {
            navigation.navigate(Routes.PAYMENT_METHOD as never);
          },
        },
      ]
    );
  };

  const handleComparePlans = () => {
    Alert.alert(
      'Compare Plans',
      'All plans include door-to-door waterless & foam options, certified washermen, and satisfaction guarantee.'
    );
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
          <AppText style={styles.headerTitle}>Subscription Plans</AppText>
          <AppText style={styles.headerSubtitle}>
            Save More. Stay Clean. Drive Happy.
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
        {/* HERO BANNER */}
        <View style={styles.heroBanner}>
          <View style={styles.heroTextSection}>
            <AppText style={styles.heroTitle}>
              Regular Care Greater Savings!
            </AppText>
            <AppText style={styles.heroSubtitle}>
              Choose a plan that fits your needs and enjoy hassle-free car wash
              services.
            </AppText>
            <View style={styles.calloutPill}>
              <Sparkles size={12} color="#059669" />
              <AppText style={styles.calloutText}>A Cleaner Brighter You!</AppText>
            </View>
          </View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&auto=format&fit=crop&q=80',
            }}
            style={styles.heroCarImage}
            resizeMode="cover"
          />
        </View>

        {/* SUBSCRIPTION PLAN CARDS */}
        <View style={styles.plansContainer}>
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isGold = plan.cardTheme === 'gold';
            const isPurple = plan.cardTheme === 'purple';

            return (
              <View
                key={plan.id}
                style={[
                  styles.planCard,
                  isGold && styles.planCardGold,
                  isPurple && styles.planCardPurple,
                ]}
              >
                {/* TOP ROW: ICON + TITLE + BADGE & PRICE */}
                <View style={styles.planCardTop}>
                  <View style={styles.planHeaderLeft}>
                    <View
                      style={[
                        styles.planIconBox,
                        isGold && styles.planIconBoxGold,
                        isPurple && styles.planIconBoxPurple,
                      ]}
                    >
                      {plan.id === 'weekly_wash' && (
                        <Calendar size={20} color="#059669" />
                      )}
                      {plan.id === 'monthly_wash' && (
                        <Calendar size={20} color="#2563EB" />
                      )}
                      {plan.id === 'premium_monthly' && (
                        <Crown size={20} color="#D97706" />
                      )}
                      {plan.id === 'family_plan' && (
                        <Users size={20} color="#7C3AED" />
                      )}
                    </View>
                    <View style={styles.planTitleContainer}>
                      <AppText style={styles.planName}>{plan.name}</AppText>
                      <AppText style={styles.planSubtitle}>
                        {plan.subtitle}
                      </AppText>
                    </View>
                  </View>

                  <View style={styles.planHeaderRight}>
                    {plan.badge && (
                      <View
                        style={[
                          styles.planBadge,
                          plan.badgeType === 'starter' && styles.badgeStarter,
                          plan.badgeType === 'popular' && styles.badgePopular,
                          plan.badgeType === 'best' && styles.badgeBest,
                        ]}
                      >
                        <AppText
                          style={[
                            styles.planBadgeText,
                            plan.badgeType === 'best' && styles.badgeBestText,
                          ]}
                        >
                          {plan.badge}
                        </AppText>
                      </View>
                    )}
                    <View style={styles.priceRow}>
                      <AppText style={styles.planPrice}>{plan.price}</AppText>
                      <AppText style={styles.planOriginalPrice}>
                        {plan.originalPrice}
                      </AppText>
                    </View>
                    <AppText style={styles.billingPeriodText}>
                      {plan.billingPeriod}
                    </AppText>
                  </View>
                </View>

                {/* 4 FEATURE PILLS */}
                <View style={styles.featuresRow}>
                  <View style={styles.featurePill}>
                    <Car size={16} color="#059669" />
                    <AppText style={styles.featureTitle}>
                      {plan.washesCount}
                    </AppText>
                    <AppText style={styles.featureSub}>
                      {plan.washesPeriod}
                    </AppText>
                  </View>

                  <View style={styles.featurePill}>
                    <Car size={16} color="#059669" />
                    <AppText style={styles.featureTitle} numberOfLines={2}>
                      {plan.vehicleLimit}
                    </AppText>
                  </View>

                  <View style={styles.featurePill}>
                    <Calendar size={16} color="#059669" />
                    <AppText style={styles.featureTitle} numberOfLines={2}>
                      {plan.validity}
                    </AppText>
                  </View>

                  <View style={styles.featurePill}>
                    <PiggyBank size={16} color="#059669" />
                    <AppText style={styles.featureTitle} numberOfLines={2}>
                      {plan.savings}
                    </AppText>
                  </View>
                </View>

                {/* PERKS BANNER (FOR PREMIUM & FAMILY) */}
                {plan.perksBanner && (
                  <View
                    style={[
                      styles.perksBannerContainer,
                      isGold && styles.perksBannerGold,
                      isPurple && styles.perksBannerPurple,
                    ]}
                  >
                    {isGold && <Star size={13} color="#B45309" fill="#B45309" />}
                    {isPurple && <Users size={13} color="#6D28D9" />}
                    <AppText
                      style={[
                        styles.perksBannerText,
                        isGold && styles.perksBannerTextGold,
                        isPurple && styles.perksBannerTextPurple,
                      ]}
                      numberOfLines={1}
                    >
                      {plan.perksBanner}
                    </AppText>
                  </View>
                )}

                {/* SUBSCRIBE BUTTON */}
                <TouchableOpacity
                  style={styles.subscribeBtn}
                  onPress={() => handleSubscribe(plan)}
                  activeOpacity={0.88}
                >
                  <AppText style={styles.subscribeBtnText}>Subscribe</AppText>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* FOOTER HELPER CARD */}
        <View style={styles.footerCard}>
          <View style={styles.footerLeft}>
            <View style={styles.footerIconCircle}>
              <Gift size={20} color="#059669" />
            </View>
            <View style={styles.footerTextContainer}>
              <AppText style={styles.footerTitle}>
                Not sure which plan to choose?
              </AppText>
              <AppText style={styles.footerSubtitle}>
                Compare plans or chat with our support team for help.
              </AppText>
            </View>
          </View>
          <TouchableOpacity
            style={styles.compareBtn}
            onPress={handleComparePlans}
            activeOpacity={0.8}
          >
            <AppText style={styles.compareBtnText}>Compare Plans</AppText>
          </TouchableOpacity>
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
  heroBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 14,
    overflow: 'hidden',
  },
  heroTextSection: {
    flex: 1,
    paddingRight: 8,
  },
  heroTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  heroSubtitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#047857',
    marginTop: 2,
    lineHeight: 15,
  },
  calloutPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  calloutText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
    fontStyle: 'italic',
  },
  heroCarImage: {
    width: 75,
    height: 50,
    borderRadius: 8,
  },
  plansContainer: {
    gap: 14,
    marginBottom: 14,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  planCardGold: {
    backgroundColor: '#FFFDF5',
    borderColor: '#FDE68A',
  },
  planCardPurple: {
    backgroundColor: '#FAF5FF',
    borderColor: '#E9D5FF',
  },
  planCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  planHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 6,
  },
  planIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  planIconBoxGold: {
    backgroundColor: '#FEF3C7',
  },
  planIconBoxPurple: {
    backgroundColor: '#F3E8FF',
  },
  planTitleContainer: {
    flex: 1,
  },
  planName: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  planSubtitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  planHeaderRight: {
    alignItems: 'flex-end',
  },
  planBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 4,
  },
  badgeStarter: {
    backgroundColor: '#065F46',
  },
  badgePopular: {
    backgroundColor: '#2563EB',
  },
  badgeBest: {
    backgroundColor: '#D97706',
  },
  planBadgeText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  badgeBestText: {
    color: '#FFFFFF',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  planPrice: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  planOriginalPrice: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  billingPeriodText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    marginBottom: 12,
  },
  featurePill: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  featureTitle: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 13,
  },
  featureSub: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    textAlign: 'center',
  },
  perksBannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
    marginBottom: 12,
  },
  perksBannerGold: {
    backgroundColor: '#FEF3C7',
  },
  perksBannerPurple: {
    backgroundColor: '#F3E8FF',
  },
  perksBannerText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    flex: 1,
  },
  perksBannerTextGold: {
    color: '#92400E',
  },
  perksBannerTextPurple: {
    color: '#6B21A8',
  },
  subscribeBtn: {
    backgroundColor: '#059669',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscribeBtnText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  footerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 6,
  },
  footerIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  footerTextContainer: {
    flex: 1,
  },
  footerTitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  footerSubtitle: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: '#047857',
    marginTop: 1,
  },
  compareBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#059669',
  },
  compareBtnText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
});
