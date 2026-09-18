import React from 'react';
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
  Wallet,
  Plus,
  QrCode,
  Gift,
  RotateCcw,
  SlidersHorizontal,
  ChevronRight,
  Crown,
  Home,
  CalendarDays,
  PlusCircle,
  Tag,
  User,
  Info,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width } = Dimensions.get('window');

type WalletNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.WALLET
>;

interface WalletTransaction {
  id: string;
  type: 'added' | 'paid' | 'promo' | 'refund';
  title: string;
  date: string;
  amount: string;
  isPositive: boolean;
  tag: string;
  tagType: 'success' | 'offer' | 'refund';
}

const WALLET_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx_1',
    type: 'added',
    title: 'Added Money',
    date: '16 Sep 2026, 09:15 AM',
    amount: '+ ₹500.00',
    isPositive: true,
    tag: 'Success',
    tagType: 'success',
  },
  {
    id: 'tx_2',
    type: 'paid',
    title: 'Payment for Car Wash',
    date: '12 Sep 2026, 11:30 AM',
    amount: '- ₹699.00',
    isPositive: false,
    tag: 'Success',
    tagType: 'success',
  },
  {
    id: 'tx_3',
    type: 'promo',
    title: 'Promo Credit Earned',
    date: '10 Sep 2026, 04:20 PM',
    amount: '+ ₹100.00',
    isPositive: true,
    tag: 'Offer Credit',
    tagType: 'offer',
  },
  {
    id: 'tx_4',
    type: 'refund',
    title: 'Refund Received',
    date: '28 Aug 2026, 02:10 PM',
    amount: '+ ₹150.00',
    isPositive: true,
    tag: 'Refund',
    tagType: 'refund',
  },
  {
    id: 'tx_5',
    type: 'paid',
    title: 'Payment for Car Wash',
    date: '20 Aug 2026, 10:00 AM',
    amount: '- ₹499.00',
    isPositive: false,
    tag: 'Success',
    tagType: 'success',
  },
];

export const WalletScreen: React.FC = () => {
  const navigation = useNavigation<WalletNavProp>();

  const handleAddMoney = () => {
    navigation.navigate(Routes.ADD_MONEY);
  };

  const handleViewQR = () => {
    Alert.alert('Scan UPI QR', 'WashOn UPI ID: washon.pay@upi');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ArrowLeft size={22} color={Colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <AppText style={styles.headerTitle}>Wallet</AppText>
          <AppText style={styles.headerSubtitle}>
            Manage your balance, credits and transactions
          </AppText>
        </View>

        {/* Logo Badge */}
        <View style={styles.logoBadge}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=120&q=80' }}
            style={styles.logoIcon}
          />
          <View>
            <AppText style={styles.logoText}>Wash<AppText style={styles.logoTextAccent}>On</AppText></AppText>
            <AppText style={styles.logoSubtext}>CLEAN RIDES | HAPPIER YOU</AppText>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TOTAL WALLET BALANCE CARD */}
        <View style={styles.walletCardHero}>
          <View style={styles.walletHeroLeft}>
            <AppText style={styles.walletLabel}>Total Wallet Balance</AppText>
            <AppText style={styles.walletBalanceVal}>₹1,250.00</AppText>
            <AppText style={styles.walletSubHint}>
              Use your wallet for faster and hassle-free bookings
            </AppText>
          </View>

          <View style={styles.walletHeroRight}>
            <TouchableOpacity
              style={styles.addMoneyWhiteBtn}
              onPress={handleAddMoney}
              activeOpacity={0.85}
            >
              <Plus size={14} color="#059669" style={{ marginRight: 4 }} />
              <AppText style={styles.addMoneyWhiteText}>Add Money</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.viewQrBtn}
              onPress={handleViewQR}
              activeOpacity={0.7}
            >
              <QrCode size={13} color="#FFFFFF" style={{ marginRight: 4 }} />
              <AppText style={styles.viewQrText}>View QR / UPI</AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* PROMO CREDITS & REFUND BALANCE DUAL CARDS */}
        <View style={styles.dualCreditsRow}>
          {/* Promo Credits */}
          <TouchableOpacity
            style={styles.creditCardBox}
            onPress={() => navigation.navigate(Routes.OFFERS_COUPONS)}
            activeOpacity={0.8}
          >
            <View style={styles.creditCardTop}>
              <View style={styles.iconCircleGreen}>
                <Gift size={15} color="#059669" />
              </View>
              <View style={{ flex: 1, marginLeft: 6 }}>
                <View style={styles.infoLabelRow}>
                  <AppText style={styles.creditTitle}>Promo Credits</AppText>
                  <Info size={10} color="#94A3B8" style={{ marginLeft: 3 }} />
                </View>
                <AppText style={styles.creditAmount}>₹200.00</AppText>
              </View>
              <ChevronRight size={14} color="#94A3B8" />
            </View>
            <AppText style={styles.creditSub}>From offers & cashback</AppText>
          </TouchableOpacity>

          {/* Refund Balance */}
          <TouchableOpacity style={styles.creditCardBox} activeOpacity={0.8}>
            <View style={styles.creditCardTop}>
              <View style={styles.iconCircleBlue}>
                <RotateCcw size={15} color="#2563EB" />
              </View>
              <View style={{ flex: 1, marginLeft: 6 }}>
                <View style={styles.infoLabelRow}>
                  <AppText style={styles.creditTitle}>Refund Balance</AppText>
                  <Info size={10} color="#94A3B8" style={{ marginLeft: 3 }} />
                </View>
                <AppText style={styles.creditAmount}>₹150.00</AppText>
              </View>
              <ChevronRight size={14} color="#94A3B8" />
            </View>
            <AppText style={styles.creditSub}>From cancelled bookings</AppText>
          </TouchableOpacity>
        </View>

        {/* CASHBACK PROMO BANNER */}
        <View style={styles.cashbackBanner}>
          <View style={styles.cashbackIconWrap}>
            <Wallet size={20} color="#059669" />
          </View>
          <View style={styles.cashbackTextWrap}>
            <AppText style={styles.cashbackTitle}>Add Money & Get Extra!</AppText>
            <AppText style={styles.cashbackSub}>
              Get 5% extra wallet balance on adding ₹500 or more.
            </AppText>
          </View>
          <TouchableOpacity
            style={styles.addNowBtn}
            onPress={handleAddMoney}
            activeOpacity={0.8}
          >
            <AppText style={styles.addNowText}>Add Now</AppText>
          </TouchableOpacity>
        </View>

        {/* TRANSACTION HISTORY */}
        <View style={styles.historyHeaderRow}>
          <AppText style={styles.sectionHeaderTitle}>Transaction History</AppText>
          <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7}>
            <SlidersHorizontal size={12} color="#64748B" style={{ marginRight: 4 }} />
            <AppText style={styles.filterBtnText}>Filter</AppText>
          </TouchableOpacity>
        </View>

        {/* TRANSACTIONS LIST */}
        <View style={styles.transactionsList}>
          {WALLET_TRANSACTIONS.map((tx) => (
            <TouchableOpacity key={tx.id} style={styles.txRow} activeOpacity={0.7}>
              {/* Left icon circle */}
              <View
                style={[
                  styles.txIconCircle,
                  tx.type === 'added' && styles.txAdded,
                  tx.type === 'paid' && styles.txPaid,
                  tx.type === 'promo' && styles.txPromo,
                  tx.type === 'refund' && styles.txRefund,
                ]}
              >
                {tx.type === 'added' && <Plus size={14} color="#059669" strokeWidth={3} />}
                {tx.type === 'paid' && <AppText style={styles.minusSign}>−</AppText>}
                {tx.type === 'promo' && <Gift size={14} color="#059669" />}
                {tx.type === 'refund' && <RotateCcw size={14} color="#2563EB" />}
              </View>

              {/* Middle title & date */}
              <View style={styles.txMiddle}>
                <AppText style={styles.txTitle}>{tx.title}</AppText>
                <AppText style={styles.txDate}>{tx.date}</AppText>
              </View>

              {/* Right amount & tag pill */}
              <View style={styles.txRight}>
                <AppText
                  style={[
                    styles.txAmount,
                    tx.isPositive ? styles.txGreen : styles.txRed,
                  ]}
                >
                  {tx.amount}
                </AppText>
                <View
                  style={[
                    styles.tagPill,
                    tx.tagType === 'success' && styles.tagSuccess,
                    tx.tagType === 'offer' && styles.tagOffer,
                    tx.tagType === 'refund' && styles.tagRefund,
                  ]}
                >
                  <AppText
                    style={[
                      styles.tagText,
                      tx.tagType === 'success' && styles.tagTextSuccess,
                      tx.tagType === 'offer' && styles.tagTextOffer,
                      tx.tagType === 'refund' && styles.tagTextRefund,
                    ]}
                  >
                    {tx.tag}
                  </AppText>
                </View>
              </View>

              <ChevronRight size={14} color="#CBD5E1" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          ))}
        </View>

        {/* FASTER CHECKOUT BANNER */}
        <TouchableOpacity style={styles.fasterCheckoutBanner} activeOpacity={0.8}>
          <Crown size={16} color="#D97706" style={{ marginRight: 8 }} />
          <View style={{ flex: 1 }}>
            <AppText style={styles.fasterTitle}>Use wallet for faster checkout</AppText>
            <AppText style={styles.fasterSub}>Secure | Instant | No extra charges</AppText>
          </View>
          <ChevronRight size={14} color="#D97706" />
        </TouchableOpacity>
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNavBar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate(Routes.HOME_DASHBOARD)}
          activeOpacity={0.7}
        >
          <Home size={18} color="#94A3B8" />
          <AppText style={styles.navLabel}>Home</AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate(Routes.UPCOMING_BOOKINGS)}
          activeOpacity={0.7}
        >
          <CalendarDays size={18} color="#94A3B8" />
          <AppText style={styles.navLabel}>Bookings</AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Wallet size={18} color="#059669" />
          <AppText style={[styles.navLabel, styles.navLabelActive]}>Wallet</AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate(Routes.OFFERS_COUPONS)}
          activeOpacity={0.7}
        >
          <Tag size={18} color="#94A3B8" />
          <AppText style={styles.navLabel}>Offers</AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate(Routes.CUSTOMER_PROFILE)}
          activeOpacity={0.7}
        >
          <User size={18} color="#94A3B8" />
          <AppText style={styles.navLabel}>Profile</AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginTop: 1,
  },
  logoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  logoIcon: {
    width: 22,
    height: 22,
    borderRadius: 6,
    marginRight: 6,
  },
  logoText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    lineHeight: 15,
  },
  logoTextAccent: {
    color: '#F59E0B',
  },
  logoSubtext: {
    fontSize: 6,
    fontFamily: Typography.fontFamily.bold,
    color: '#92400E',
    letterSpacing: 0.3,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  /* WALLET HERO CARD */
  walletCardHero: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#059669',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  walletHeroLeft: {
    flex: 1.1,
    paddingRight: 8,
  },
  walletLabel: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#D1FAE5',
  },
  walletBalanceVal: {
    fontSize: 26,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
    marginVertical: 4,
  },
  walletSubHint: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.regular,
    color: '#A7F3D0',
    lineHeight: 12,
  },
  walletHeroRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 8,
  },
  addMoneyWhiteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addMoneyWhiteText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  viewQrBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  viewQrText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#FFFFFF',
  },
  /* DUAL CREDITS */
  dualCreditsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 12,
  },
  creditCardBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  creditCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircleGreen: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleBlue: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creditTitle: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  creditAmount: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginTop: 1,
  },
  creditSub: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
    marginTop: 6,
  },
  /* CASHBACK BANNER */
  cashbackBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 14,
  },
  cashbackIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  cashbackTextWrap: {
    flex: 1,
  },
  cashbackTitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  cashbackSub: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#047857',
    marginTop: 1,
    lineHeight: 12,
  },
  addNowBtn: {
    backgroundColor: '#059669',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addNowText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  /* TRANSACTION HISTORY */
  historyHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionHeaderTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterBtnText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  transactionsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 12,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  txIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  txAdded: {
    backgroundColor: '#ECFDF5',
  },
  txPaid: {
    backgroundColor: '#FEF2F2',
  },
  txPromo: {
    backgroundColor: '#ECFDF5',
  },
  txRefund: {
    backgroundColor: '#EFF6FF',
  },
  minusSign: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#DC2626',
  },
  txMiddle: {
    flex: 1,
  },
  txTitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  txDate: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
    marginTop: 1,
  },
  txRight: {
    alignItems: 'flex-end',
  },
  txAmount: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
  },
  txGreen: {
    color: '#059669',
  },
  txRed: {
    color: '#DC2626',
  },
  tagPill: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    marginTop: 2,
  },
  tagSuccess: {
    backgroundColor: '#ECFDF5',
  },
  tagOffer: {
    backgroundColor: '#FEF3C7',
  },
  tagRefund: {
    backgroundColor: '#EFF6FF',
  },
  tagText: {
    fontSize: 7,
    fontFamily: Typography.fontFamily.bold,
  },
  tagTextSuccess: {
    color: '#059669',
  },
  tagTextOffer: {
    color: '#D97706',
  },
  tagTextRefund: {
    color: '#2563EB',
  },
  /* FASTER CHECKOUT BANNER */
  fasterCheckoutBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  fasterTitle: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#92400E',
  },
  fasterSub: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.regular,
    color: '#B45309',
    marginTop: 1,
  },
  /* BOTTOM NAV */
  bottomNavBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#94A3B8',
    marginTop: 2,
  },
  navLabelActive: {
    color: '#059669',
    fontFamily: Typography.fontFamily.bold,
  },
});
