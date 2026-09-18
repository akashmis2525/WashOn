import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Check,
  CreditCard,
  Building2,
  Wallet,
  Banknote,
  ShieldCheck,
  Lock,
  ChevronDown,
  ChevronUp,
  Zap,
  ArrowRight,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type PaymentMethodNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.PAYMENT_METHOD
>;

type PaymentMethodRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.PAYMENT_METHOD
>;

type PaymentOptionKey = 'upi' | 'card' | 'netbanking' | 'wallet' | 'cash';

export const PaymentMethodScreen: React.FC = () => {
  const navigation = useNavigation<PaymentMethodNavProp>();
  const route = useRoute<PaymentMethodRouteProp>();
  const { activeBooking } = useBookingStore();

  const [selectedMethod, setSelectedMethod] = useState<PaymentOptionKey>('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState<string>('GPay');
  const [showBillDetails, setShowBillDetails] = useState<boolean>(false);

  const bookingId = route.params?.bookingId || activeBooking?.id || '#WO256839';

  const handleProceedPayment = () => {
    navigation.navigate(Routes.PAYMENT_CONFIRMATION, { bookingId });
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
          <AppText style={styles.headerTitle}>Choose Payment Method</AppText>
          <AppText style={styles.headerSubtitle}>
            Select your preferred payment option
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
            <AppText style={styles.logoSubtext}>CAR | BIKE | ANYWHERE</AppText>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* VEHICLE SUMMARY HEADER CARD */}
        <View style={styles.vehicleHeaderCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=200&q=80' }}
            style={styles.carHeaderThumb}
            resizeMode="contain"
          />
          <View style={styles.vehicleHeaderMiddle}>
            <AppText style={styles.carName}>Toyota Fortuner</AppText>
            <AppText style={styles.carPlate}>MP 09 AB 1234 • White • SUV</AppText>
            <AppText style={styles.serviceNameBold}>Premium Car Wash</AppText>
            <AppText style={styles.serviceSubText}>Exterior + Interior + Premium Finish</AppText>
          </View>

          <View style={styles.vehicleHeaderRight}>
            <AppText style={styles.totalAmountLabel}>Total Amount</AppText>
            <AppText style={styles.totalAmountVal}>₹547</AppText>
            <TouchableOpacity
              style={styles.viewDetailsBtn}
              onPress={() => setShowBillDetails(!showBillDetails)}
              activeOpacity={0.7}
            >
              <AppText style={styles.viewDetailsText}>View Details</AppText>
              {showBillDetails ? (
                <ChevronUp size={12} color="#059669" />
              ) : (
                <ChevronDown size={12} color="#059669" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* EXPANDABLE BILL DETAILS */}
        {showBillDetails && (
          <View style={styles.expandedBillCard}>
            <View style={styles.billRow}>
              <AppText style={styles.billLabel}>Base Wash (Premium Car Wash)</AppText>
              <AppText style={styles.billVal}>₹399</AppText>
            </View>
            <View style={styles.billRow}>
              <AppText style={styles.billLabel}>Tire Cleaning (Add-on)</AppText>
              <AppText style={styles.billVal}>₹99</AppText>
            </View>
            <View style={styles.billRow}>
              <AppText style={styles.billLabel}>Interior Vacuum (Add-on)</AppText>
              <AppText style={styles.billVal}>₹99</AppText>
            </View>
            <View style={styles.billRow}>
              <AppText style={styles.billLabel}>Promo Discount</AppText>
              <AppText style={styles.billDiscount}>- ₹50</AppText>
            </View>
            <View style={styles.billDivider} />
            <View style={styles.billTotalRow}>
              <AppText style={styles.billTotalLabel}>Final Amount</AppText>
              <AppText style={styles.billTotalVal}>₹547</AppText>
            </View>
          </View>
        )}

        {/* SECTION HEADER */}
        <View style={styles.optionsSectionHeader}>
          <View style={styles.iconCircleGreen}>
            <CreditCard size={18} color="#059669" />
          </View>
          <View>
            <AppText style={styles.sectionHeaderTitle}>Payment Options</AppText>
            <AppText style={styles.sectionHeaderSub}>
              Choose a secure and convenient payment method
            </AppText>
          </View>
        </View>

        {/* OPTION 1: UPI */}
        <TouchableOpacity
          style={[
            styles.paymentCard,
            selectedMethod === 'upi' && styles.paymentCardSelected,
          ]}
          onPress={() => setSelectedMethod('upi')}
          activeOpacity={0.85}
        >
          <View style={styles.paymentCardTop}>
            <View style={styles.upiLogoBadge}>
              <AppText style={styles.upiLogoText}>UPI<AppText style={styles.upiLogoAccent}>▶</AppText></AppText>
            </View>
            <View style={styles.paymentCardTextWrap}>
              <View style={styles.titleRow}>
                <AppText style={styles.paymentCardTitle}>UPI <AppText style={styles.recText}>(Recommended)</AppText></AppText>
                <View style={styles.fastSecureBadge}>
                  <Zap size={10} color="#059669" fill="#059669" />
                  <AppText style={styles.fastSecureText}>Fast & Secure</AppText>
                </View>
              </View>
              <AppText style={styles.paymentCardSubtitle}>Pay instantly using any UPI app</AppText>
            </View>
            <View style={[styles.radioCircle, selectedMethod === 'upi' && styles.radioCircleActive]}>
              {selectedMethod === 'upi' && <View style={styles.radioInner} />}
            </View>
          </View>

          {/* UPI App Icons Grid */}
          <View style={styles.upiAppsRow}>
            {/* GPay */}
            <TouchableOpacity
              style={[
                styles.upiAppBadge,
                selectedUpiApp === 'GPay' && styles.upiAppBadgeActive,
              ]}
              onPress={() => {
                setSelectedMethod('upi');
                setSelectedUpiApp('GPay');
              }}
            >
              <View style={styles.gpayIcon}>
                <AppText style={{ fontSize: 13 }}>🇬</AppText>
              </View>
              <AppText style={styles.upiAppName}>GPay</AppText>
            </TouchableOpacity>

            {/* PhonePe */}
            <TouchableOpacity
              style={[
                styles.upiAppBadge,
                selectedUpiApp === 'PhonePe' && styles.upiAppBadgeActive,
              ]}
              onPress={() => {
                setSelectedMethod('upi');
                setSelectedUpiApp('PhonePe');
              }}
            >
              <View style={[styles.appCircle, { backgroundColor: '#5F259F' }]}>
                <AppText style={styles.appCircleText}>पे</AppText>
              </View>
              <AppText style={styles.upiAppName}>PhonePe</AppText>
            </TouchableOpacity>

            {/* Paytm */}
            <TouchableOpacity
              style={[
                styles.upiAppBadge,
                selectedUpiApp === 'Paytm' && styles.upiAppBadgeActive,
              ]}
              onPress={() => {
                setSelectedMethod('upi');
                setSelectedUpiApp('Paytm');
              }}
            >
              <View style={[styles.appCircle, { backgroundColor: '#00BAF2' }]}>
                <AppText style={styles.appCircleText}>P</AppText>
              </View>
              <AppText style={styles.upiAppName}>Paytm</AppText>
            </TouchableOpacity>

            {/* Amazon Pay */}
            <TouchableOpacity
              style={[
                styles.upiAppBadge,
                selectedUpiApp === 'AmazonPay' && styles.upiAppBadgeActive,
              ]}
              onPress={() => {
                setSelectedMethod('upi');
                setSelectedUpiApp('AmazonPay');
              }}
            >
              <View style={[styles.appCircle, { backgroundColor: '#FF9900' }]}>
                <AppText style={styles.appCircleText}>a</AppText>
              </View>
              <AppText style={styles.upiAppName}>Amazon Pay</AppText>
            </TouchableOpacity>

            {/* BHIM */}
            <TouchableOpacity
              style={[
                styles.upiAppBadge,
                selectedUpiApp === 'BHIM' && styles.upiAppBadgeActive,
              ]}
              onPress={() => {
                setSelectedMethod('upi');
                setSelectedUpiApp('BHIM');
              }}
            >
              <View style={[styles.appCircle, { backgroundColor: '#0083CA' }]}>
                <AppText style={styles.appCircleText}>B</AppText>
              </View>
              <AppText style={styles.upiAppName}>BHIM</AppText>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* OPTION 2: CREDIT / DEBIT CARD */}
        <TouchableOpacity
          style={[
            styles.paymentCard,
            selectedMethod === 'card' && styles.paymentCardSelected,
          ]}
          onPress={() => setSelectedMethod('card')}
          activeOpacity={0.85}
        >
          <View style={styles.paymentCardTop}>
            <View style={styles.iconCircleBlue}>
              <CreditCard size={18} color="#2563EB" />
            </View>
            <View style={styles.paymentCardTextWrap}>
              <AppText style={styles.paymentCardTitle}>Credit / Debit Card</AppText>
              <AppText style={styles.paymentCardSubtitle}>Visa, Mastercard, RuPay and more</AppText>
            </View>
            <View style={styles.cardLogosRow}>
              <View style={styles.cardBrandBadge}><AppText style={styles.visaText}>VISA</AppText></View>
              <View style={styles.masterCircleWrap}>
                <View style={[styles.mcCircle, { backgroundColor: '#EB001B' }]} />
                <View style={[styles.mcCircle, { backgroundColor: '#F79E1B', marginLeft: -6 }]} />
              </View>
              <View style={styles.cardBrandBadge}><AppText style={styles.rupayText}>RuPay❯</AppText></View>
            </View>
            <View style={[styles.radioCircle, selectedMethod === 'card' && styles.radioCircleActive]}>
              {selectedMethod === 'card' && <View style={styles.radioInner} />}
            </View>
          </View>
        </TouchableOpacity>

        {/* OPTION 3: NET BANKING */}
        <TouchableOpacity
          style={[
            styles.paymentCard,
            selectedMethod === 'netbanking' && styles.paymentCardSelected,
          ]}
          onPress={() => setSelectedMethod('netbanking')}
          activeOpacity={0.85}
        >
          <View style={styles.paymentCardTop}>
            <View style={styles.iconCircleBlue}>
              <Building2 size={18} color="#2563EB" />
            </View>
            <View style={styles.paymentCardTextWrap}>
              <AppText style={styles.paymentCardTitle}>Net Banking</AppText>
              <AppText style={styles.paymentCardSubtitle}>All major banks supported</AppText>
            </View>
            <View style={styles.bankPillsRow}>
              <View style={styles.bankPill}><AppText style={styles.bankText}>SBI</AppText></View>
              <View style={styles.bankPill}><AppText style={styles.bankText}>HDFC</AppText></View>
              <View style={styles.bankPill}><AppText style={styles.bankText}>ICICI</AppText></View>
              <AppText style={styles.moreBankText}>+ more</AppText>
            </View>
            <View style={[styles.radioCircle, selectedMethod === 'netbanking' && styles.radioCircleActive]}>
              {selectedMethod === 'netbanking' && <View style={styles.radioInner} />}
            </View>
          </View>
        </TouchableOpacity>

        {/* OPTION 4: WALLET */}
        <TouchableOpacity
          style={[
            styles.paymentCard,
            selectedMethod === 'wallet' && styles.paymentCardSelected,
          ]}
          onPress={() => setSelectedMethod('wallet')}
          activeOpacity={0.85}
        >
          <View style={styles.paymentCardTop}>
            <View style={styles.iconCircleBlue}>
              <Wallet size={18} color="#2563EB" />
            </View>
            <View style={styles.paymentCardTextWrap}>
              <AppText style={styles.paymentCardTitle}>Wallet</AppText>
              <AppText style={styles.paymentCardSubtitle}>Pay using your wallet balance</AppText>
            </View>
            <View style={styles.walletBadgesRow}>
              <View style={styles.walletBadge}><AppText style={styles.walletText}>Paytm</AppText></View>
              <View style={styles.walletBadge}><AppText style={styles.walletText}>amazon pay</AppText></View>
              <View style={styles.walletBadge}><AppText style={styles.walletText}>Mobikwik</AppText></View>
              <AppText style={styles.moreBankText}>+ more</AppText>
            </View>
            <View style={[styles.radioCircle, selectedMethod === 'wallet' && styles.radioCircleActive]}>
              {selectedMethod === 'wallet' && <View style={styles.radioInner} />}
            </View>
          </View>
        </TouchableOpacity>

        {/* OPTION 5: CASH ON SERVICE */}
        <TouchableOpacity
          style={[
            styles.paymentCard,
            selectedMethod === 'cash' && styles.paymentCardSelected,
          ]}
          onPress={() => setSelectedMethod('cash')}
          activeOpacity={0.85}
        >
          <View style={styles.paymentCardTop}>
            <View style={styles.iconCircleGreen}>
              <Banknote size={18} color="#059669" />
            </View>
            <View style={styles.paymentCardTextWrap}>
              <AppText style={styles.paymentCardTitle}>Cash on Service</AppText>
              <AppText style={styles.paymentCardSubtitle}>Pay directly to washerman after service</AppText>
              <AppText style={styles.cashSubtext}>Available only for selected locations</AppText>
            </View>
            <View style={styles.availableBadge}>
              <AppText style={styles.availableText}>Available</AppText>
            </View>
            <View style={[styles.radioCircle, selectedMethod === 'cash' && styles.radioCircleActive]}>
              {selectedMethod === 'cash' && <View style={styles.radioInner} />}
            </View>
          </View>
        </TouchableOpacity>

        {/* 100% SECURE PAYMENTS BANNER */}
        <View style={styles.securityCard}>
          <View style={styles.securityHeader}>
            <ShieldCheck size={20} color="#059669" />
            <View style={{ marginLeft: 8, flex: 1 }}>
              <AppText style={styles.securityTitle}>100% Secure Payments</AppText>
              <AppText style={styles.securityDesc}>
                Your payment information is always safe with us.
              </AppText>
            </View>
          </View>

          <View style={styles.securityBadgesRow}>
            <View style={styles.secItem}>
              <Lock size={14} color="#059669" />
              <AppText style={styles.secText}>Encrypted{'\n'}Transactions</AppText>
            </View>
            <View style={styles.secItem}>
              <ShieldCheck size={14} color="#059669" />
              <AppText style={styles.secText}>Secure{'\n'}Gateway</AppText>
            </View>
            <View style={styles.secItem}>
              <CreditCard size={14} color="#059669" />
              <AppText style={styles.secText}>RBI{'\n'}Compliant</AppText>
            </View>
          </View>
        </View>

        {/* FOOTER PUSH NOTE */}
        <View style={styles.cleanRidesFooter}>
          <Lock size={12} color="#64748B" style={{ marginRight: 6 }} />
          <AppText style={styles.cleanRidesFooterText}>Clean Rides. Happy You.  |  WashOn</AppText>
        </View>
      </ScrollView>

      {/* BOTTOM FIXED BAR */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomAmountWrap}>
          <AppText style={styles.bottomTotalLabel}>Total Amount</AppText>
          <AppText style={styles.bottomTotalVal}>₹547</AppText>
          <AppText style={styles.bottomTaxInclusive}>Inclusive of all taxes</AppText>
        </View>

        <TouchableOpacity
          style={styles.payNowBtn}
          onPress={handleProceedPayment}
          activeOpacity={0.88}
        >
          <AppText style={styles.payNowBtnText}>Pay Now  ₹547</AppText>
          <ArrowRight size={18} color="#FFFFFF" style={{ marginLeft: 6 }} />
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
    fontSize: 7,
    fontFamily: Typography.fontFamily.bold,
    color: '#92400E',
    letterSpacing: 0.4,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  /* VEHICLE HEADER CARD */
  vehicleHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  carHeaderThumb: {
    width: 80,
    height: 50,
  },
  vehicleHeaderMiddle: {
    flex: 1,
    marginLeft: 10,
  },
  carName: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  carPlate: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginTop: 1,
  },
  serviceNameBold: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#059669',
    marginTop: 2,
  },
  serviceSubText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  vehicleHeaderRight: {
    alignItems: 'flex-end',
    borderLeftWidth: 1,
    borderLeftColor: '#F1F5F9',
    paddingLeft: 10,
  },
  totalAmountLabel: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  totalAmountVal: {
    fontSize: 17,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  viewDetailsText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
    marginRight: 2,
  },
  expandedBillCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  billLabel: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  billVal: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  billDiscount: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  billDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 6,
  },
  billTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billTotalLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  billTotalVal: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  /* OPTIONS SECTION HEADER */
  optionsSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 4,
  },
  iconCircleGreen: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  iconCircleBlue: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  sectionHeaderTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  sectionHeaderSub: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  /* PAYMENT CARD */
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  paymentCardSelected: {
    borderColor: '#059669',
    backgroundColor: '#FAFCFA',
  },
  paymentCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upiLogoBadge: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  upiLogoText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  upiLogoAccent: {
    color: '#059669',
    fontSize: 9,
  },
  paymentCardTextWrap: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentCardTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  recText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  fastSecureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  fastSecureText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
    marginLeft: 2,
  },
  paymentCardSubtitle: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginTop: 2,
  },
  cashSubtext: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
    marginTop: 1,
  },
  availableBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  availableText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: '#059669',
    backgroundColor: '#059669',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  /* UPI APPS ROW */
  upiAppsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  upiAppBadge: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    minWidth: 54,
  },
  upiAppBadgeActive: {
    borderColor: '#059669',
    backgroundColor: '#ECFDF5',
  },
  gpayIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  appCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  appCircleText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  upiAppName: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
    textAlign: 'center',
  },
  /* CARD BRAND LOGOS */
  cardLogosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  cardBrandBadge: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginHorizontal: 2,
  },
  visaText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#1A1F71',
    fontStyle: 'italic',
  },
  masterCircleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  mcCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  rupayText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#097939',
  },
  /* NET BANKING PILLS */
  bankPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  bankPill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  bankText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#1E40AF',
  },
  moreBankText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginLeft: 2,
  },
  /* WALLET BADGES */
  walletBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  walletBadge: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  walletText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  /* SECURITY CARD */
  securityCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginTop: 4,
    marginBottom: 8,
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  securityTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  securityDesc: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#047857',
    marginTop: 1,
  },
  securityBadgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#D1FAE5',
  },
  secItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  secText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#065F46',
    marginLeft: 5,
    lineHeight: 10,
  },
  cleanRidesFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  cleanRidesFooterText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  /* BOTTOM FIXED BAR */
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  bottomAmountWrap: {
    flex: 1,
  },
  bottomTotalLabel: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  bottomTotalVal: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  bottomTaxInclusive: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
  },
  payNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 12,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  payNowBtnText: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
});
