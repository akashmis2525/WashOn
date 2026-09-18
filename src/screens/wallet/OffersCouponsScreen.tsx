import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Gift,
  Tag,
  Percent,
  Car,
  Wallet,
  Users,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  FileText,
  Calendar,
  Sparkles,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width } = Dimensions.get('window');

type OffersNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.OFFERS_COUPONS
>;

interface CouponOffer {
  id: string;
  code: string;
  title: string;
  description: string;
  validTill: string;
  badgeText: string;
  badgeType: 'deal' | 'first' | 'wallet' | 'refer';
  iconType: 'percent' | 'car' | 'wallet' | 'users';
}

const AVAILABLE_OFFERS: CouponOffer[] = [
  {
    id: 'off_1',
    code: 'WASH20',
    title: 'FLAT 20% OFF',
    description: 'Get 20% off on all car wash services',
    validTill: '30 Sep 2026',
    badgeText: '🔥 BEST DEAL',
    badgeType: 'deal',
    iconType: 'percent',
  },
  {
    id: 'off_2',
    code: 'FIRST100',
    title: '₹100 OFF',
    description: 'On your first booking',
    validTill: '15 Oct 2026',
    badgeText: '⭐ FIRST BOOKING',
    badgeType: 'first',
    iconType: 'car',
  },
  {
    id: 'off_3',
    code: 'WALLET50',
    title: '₹50 Cashback',
    description: 'Add ₹500 to wallet and get ₹50 cashback',
    validTill: '31 Oct 2026',
    badgeText: '⚡ WALLET OFFER',
    badgeType: 'wallet',
    iconType: 'wallet',
  },
  {
    id: 'off_4',
    code: 'REFER100',
    title: 'Refer & Earn',
    description: 'Get ₹100 wallet credit for every friend',
    validTill: '31 Dec 2026',
    badgeText: '👥 REFER OFFER',
    badgeType: 'refer',
    iconType: 'users',
  },
];

const EXPIRED_COUPONS = [
  {
    id: 'exp_1',
    code: 'CLEAN50',
    description: '₹50 off on car wash',
    expiredDate: 'Expired on 10 Aug 2026',
  },
  {
    id: 'exp_2',
    code: 'WASH100',
    description: '₹100 off on all services',
    expiredDate: 'Expired on 01 Jul 2026',
  },
];

export const OffersCouponsScreen: React.FC = () => {
  const navigation = useNavigation<OffersNavProp>();
  const [couponInput, setCouponInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'available' | 'my' | 'expired'>('available');
  const [isTermsOpen, setIsTermsOpen] = useState<boolean>(true);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const handleApplyCoupon = (code: string) => {
    setAppliedCoupon(code);
    Alert.alert(
      'Coupon Applied!',
      `Code "${code}" has been successfully applied to your account.`,
      [{ text: 'Great!' }]
    );
  };

  const handleManualApply = () => {
    if (!couponInput.trim()) {
      Alert.alert('Enter Code', 'Please enter a valid coupon code.');
      return;
    }
    handleApplyCoupon(couponInput.trim().toUpperCase());
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
          <AppText style={styles.headerTitle}>Offers & Coupons</AppText>
          <AppText style={styles.headerSubtitle}>
            Save more on your car care services
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
          <View style={styles.heroLeft}>
            <View style={styles.heroGiftBox}>
              <Gift size={24} color="#059669" />
              <Sparkles size={12} color="#34D399" style={styles.heroSparkle1} />
            </View>
            <View style={styles.heroTextContent}>
              <AppText style={styles.heroTitle}>Drive Clean, Save More!</AppText>
              <AppText style={styles.heroSubtitle}>
                Use offers & coupons to get the best deals on car wash services.
              </AppText>
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

        {/* ENTER COUPON BOX */}
        <View style={styles.couponInputCard}>
          <View style={styles.couponInputHeader}>
            <View style={styles.tagIconCircle}>
              <Tag size={16} color="#059669" />
            </View>
            <AppText style={styles.couponInputTitle}>
              Have a Coupon Code?
            </AppText>
          </View>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.couponTextInput}
              placeholder="Enter coupon code"
              placeholderTextColor="#94A3B8"
              value={couponInput}
              onChangeText={setCouponInput}
              autoCapitalize="characters"
            />
            <TouchableOpacity
              style={[
                styles.applyBtn,
                couponInput.trim().length > 0 && styles.applyBtnActive,
              ]}
              onPress={handleManualApply}
              activeOpacity={0.8}
            >
              <AppText style={styles.applyBtnText}>Apply</AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* TABS */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabItem,
              activeTab === 'available' && styles.tabItemActive,
            ]}
            onPress={() => setActiveTab('available')}
            activeOpacity={0.7}
          >
            <CheckCircle2
              size={14}
              color={activeTab === 'available' ? '#059669' : '#64748B'}
              style={{ marginRight: 4 }}
            />
            <AppText
              style={[
                styles.tabText,
                activeTab === 'available' && styles.tabTextActive,
              ]}
            >
              Available Offers
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabItem,
              activeTab === 'my' && styles.tabItemActive,
            ]}
            onPress={() => setActiveTab('my')}
            activeOpacity={0.7}
          >
            <Tag
              size={14}
              color={activeTab === 'my' ? '#059669' : '#64748B'}
              style={{ marginRight: 4 }}
            />
            <AppText
              style={[
                styles.tabText,
                activeTab === 'my' && styles.tabTextActive,
              ]}
            >
              My Coupons
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabItem,
              activeTab === 'expired' && styles.tabItemActive,
            ]}
            onPress={() => setActiveTab('expired')}
            activeOpacity={0.7}
          >
            <Clock
              size={14}
              color={activeTab === 'expired' ? '#059669' : '#64748B'}
              style={{ marginRight: 4 }}
            />
            <AppText
              style={[
                styles.tabText,
                activeTab === 'expired' && styles.tabTextActive,
              ]}
            >
              Expired
            </AppText>
          </TouchableOpacity>
        </View>

        {/* OFFERS LIST */}
        {activeTab === 'available' && (
          <View style={styles.offersList}>
            {AVAILABLE_OFFERS.map((offer) => {
              const isApplied = appliedCoupon === offer.code;
              return (
                <View key={offer.id} style={styles.offerCard}>
                  {/* ICON */}
                  <View
                    style={[
                      styles.offerIconCircle,
                      offer.iconType === 'percent' && styles.iconPercentBg,
                      offer.iconType === 'car' && styles.iconCarBg,
                      offer.iconType === 'wallet' && styles.iconWalletBg,
                      offer.iconType === 'users' && styles.iconUsersBg,
                    ]}
                  >
                    {offer.iconType === 'percent' && (
                      <Percent size={20} color="#059669" />
                    )}
                    {offer.iconType === 'car' && (
                      <Car size={20} color="#EA580C" />
                    )}
                    {offer.iconType === 'wallet' && (
                      <Wallet size={20} color="#2563EB" />
                    )}
                    {offer.iconType === 'users' && (
                      <Users size={20} color="#7C3AED" />
                    )}
                  </View>

                  {/* DETAILS */}
                  <View style={styles.offerMiddle}>
                    <View style={styles.offerTitleRow}>
                      <AppText style={styles.offerTitle}>{offer.title}</AppText>
                      <View
                        style={[
                          styles.offerBadge,
                          offer.badgeType === 'deal' && styles.dealBadge,
                          offer.badgeType === 'first' && styles.firstBadge,
                          offer.badgeType === 'wallet' && styles.walletBadge,
                          offer.badgeType === 'refer' && styles.referBadge,
                        ]}
                      >
                        <AppText
                          style={[
                            styles.offerBadgeText,
                            offer.badgeType === 'deal' && styles.dealBadgeText,
                            offer.badgeType === 'first' && styles.firstBadgeText,
                            offer.badgeType === 'wallet' && styles.walletBadgeText,
                            offer.badgeType === 'refer' && styles.referBadgeText,
                          ]}
                        >
                          {offer.badgeText}
                        </AppText>
                      </View>
                    </View>

                    <AppText style={styles.offerDescription}>
                      {offer.description}
                    </AppText>

                    <View style={styles.offerValidRow}>
                      <Calendar size={12} color="#94A3B8" />
                      <AppText style={styles.offerValidText}>
                        Valid till {offer.validTill}
                      </AppText>
                    </View>
                  </View>

                  {/* ACTION BUTTON */}
                  <TouchableOpacity
                    style={[
                      styles.offerApplyBtn,
                      isApplied && styles.offerApplyBtnDone,
                    ]}
                    onPress={() => handleApplyCoupon(offer.code)}
                    activeOpacity={0.8}
                  >
                    <AppText
                      style={[
                        styles.offerApplyBtnText,
                        isApplied && styles.offerApplyBtnTextDone,
                      ]}
                    >
                      {isApplied ? 'Applied' : 'Apply'}
                    </AppText>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}

        {activeTab === 'my' && (
          <View style={styles.emptyTabView}>
            <Tag size={36} color="#94A3B8" />
            <AppText style={styles.emptyTabTitle}>No Personal Coupons</AppText>
            <AppText style={styles.emptyTabSub}>
              Earn coupons by completing bookings and referring friends.
            </AppText>
          </View>
        )}

        {activeTab === 'expired' && (
          <View style={styles.expiredTabList}>
            {EXPIRED_COUPONS.map((item) => (
              <View key={item.id} style={styles.expiredCard}>
                <View style={styles.expiredIconBox}>
                  <Percent size={18} color="#94A3B8" />
                </View>
                <View style={styles.expiredContent}>
                  <AppText style={styles.expiredCode}>{item.code}</AppText>
                  <AppText style={styles.expiredDesc}>{item.description}</AppText>
                </View>
                <View style={styles.expiredTag}>
                  <AppText style={styles.expiredTagText}>Expired</AppText>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* TERMS & CONDITIONS COLLAPSIBLE */}
        <View style={styles.termsCard}>
          <TouchableOpacity
            style={styles.termsHeader}
            onPress={() => setIsTermsOpen(!isTermsOpen)}
            activeOpacity={0.7}
          >
            <View style={styles.termsIconCircle}>
              <FileText size={16} color="#059669" />
            </View>
            <AppText style={styles.termsTitle}>Terms & Conditions</AppText>
            {isTermsOpen ? (
              <ChevronUp size={18} color="#64748B" />
            ) : (
              <ChevronDown size={18} color="#64748B" />
            )}
          </TouchableOpacity>

          {isTermsOpen && (
            <View style={styles.termsBody}>
              <View style={styles.bulletItem}>
                <View style={styles.bulletDot} />
                <AppText style={styles.bulletText}>
                  Coupons are valid only on selected services.
                </AppText>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bulletDot} />
                <AppText style={styles.bulletText}>
                  Cannot be clubbed with other offers.
                </AppText>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bulletDot} />
                <AppText style={styles.bulletText}>
                  One coupon can be used per booking.
                </AppText>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bulletDot} />
                <AppText style={styles.bulletText}>
                  Valid for a limited time period.
                </AppText>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bulletDot} />
                <AppText style={styles.bulletText}>
                  WashOn reserves the right to modify or withdraw offers at any
                  time.
                </AppText>
              </View>
            </View>
          )}
        </View>

        {/* EXPIRED COUPONS SECTION */}
        <View style={styles.expiredSection}>
          <View style={styles.expiredSectionHeader}>
            <AppText style={styles.expiredSectionTitle}>Expired Coupons</AppText>
            <TouchableOpacity
              onPress={() => setActiveTab('expired')}
              activeOpacity={0.7}
            >
              <AppText style={styles.viewAllText}>View All &gt;</AppText>
            </TouchableOpacity>
          </View>

          {EXPIRED_COUPONS.map((item) => (
            <View key={item.id} style={styles.expiredItemRow}>
              <View style={styles.expiredIconBox}>
                <Percent size={16} color="#94A3B8" />
              </View>
              <View style={styles.expiredContent}>
                <AppText style={styles.expiredCode}>{item.code}</AppText>
                <AppText style={styles.expiredDesc}>{item.description}</AppText>
              </View>
              <AppText style={styles.expiredDateText}>{item.expiredDate}</AppText>
              <View style={styles.expiredTag}>
                <AppText style={styles.expiredTagText}>Expired</AppText>
              </View>
            </View>
          ))}
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
  heroLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  heroGiftBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    position: 'relative',
  },
  heroSparkle1: {
    position: 'absolute',
    top: -2,
    right: -2,
  },
  heroTextContent: {
    flex: 1,
    paddingRight: 6,
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
  heroCarImage: {
    width: 75,
    height: 50,
    borderRadius: 8,
  },
  couponInputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  couponInputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tagIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  couponInputTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  couponTextInput: {
    flex: 1,
    height: 42,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    fontSize: 13,
    fontFamily: Typography.fontFamily.medium,
    color: '#0F172A',
  },
  applyBtn: {
    height: 42,
    paddingHorizontal: 20,
    backgroundColor: '#059669',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyBtnActive: {
    backgroundColor: '#047857',
  },
  applyBtnText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  tabItemActive: {
    backgroundColor: '#ECFDF5',
    borderBottomWidth: 2,
    borderBottomColor: '#059669',
  },
  tabText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  tabTextActive: {
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  offersList: {
    gap: 12,
    marginBottom: 14,
  },
  offerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  offerIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconPercentBg: { backgroundColor: '#DCFCE7' },
  iconCarBg: { backgroundColor: '#FFEDD5' },
  iconWalletBg: { backgroundColor: '#DBEAFE' },
  iconUsersBg: { backgroundColor: '#F3E8FF' },
  offerMiddle: {
    flex: 1,
    paddingRight: 8,
  },
  offerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 2,
  },
  offerTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  offerBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  dealBadge: { backgroundColor: '#FEF3C7' },
  firstBadge: { backgroundColor: '#FEF9C3' },
  walletBadge: { backgroundColor: '#EFF6FF' },
  referBadge: { backgroundColor: '#FAF5FF' },
  offerBadgeText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
  },
  dealBadgeText: { color: '#B45309' },
  firstBadgeText: { color: '#854D0E' },
  walletBadgeText: { color: '#1D4ED8' },
  referBadgeText: { color: '#6D28D9' },
  offerDescription: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginBottom: 4,
  },
  offerValidRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  offerValidText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#94A3B8',
  },
  offerApplyBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  offerApplyBtnDone: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  offerApplyBtnText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  offerApplyBtnTextDone: {
    color: '#FFFFFF',
  },
  emptyTabView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  emptyTabTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
    marginTop: 8,
  },
  emptyTabSub: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 20,
  },
  expiredTabList: {
    gap: 10,
    marginBottom: 14,
  },
  expiredCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  termsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  termsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  termsIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  termsTitle: {
    flex: 1,
    fontSize: 13,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  termsBody: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#059669',
    marginTop: 6,
    marginRight: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    lineHeight: 16,
  },
  expiredSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  expiredSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  expiredSectionTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  viewAllText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#2563EB',
  },
  expiredItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  expiredIconBox: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  expiredContent: {
    flex: 1,
  },
  expiredCode: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#475569',
  },
  expiredDesc: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
  },
  expiredDateText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
    marginRight: 8,
  },
  expiredTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
  },
  expiredTagText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
});
