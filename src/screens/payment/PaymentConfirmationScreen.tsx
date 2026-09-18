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
  Calendar,
  Clock,
  FileText,
  CreditCard,
  Edit2,
  ShieldCheck,
  Lock,
  ChevronDown,
  ChevronUp,
  Headphones,
  Leaf,
  ArrowRight,
  Receipt,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type PaymentConfirmationNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.PAYMENT_CONFIRMATION
>;

type PaymentConfirmationRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.PAYMENT_CONFIRMATION
>;

export const PaymentConfirmationScreen: React.FC = () => {
  const navigation = useNavigation<PaymentConfirmationNavProp>();
  const route = useRoute<PaymentConfirmationRouteProp>();
  const { activeBooking } = useBookingStore();

  const [showBillDetails, setShowBillDetails] = useState<boolean>(false);
  const bookingId = route.params?.bookingId || activeBooking?.id || '#WO256839';

  const handlePaySecurely = () => {
    navigation.navigate(Routes.PAYMENT_PROCESSING, {
      bookingId,
      method: 'UPI - Google Pay',
    });
  };

  const handleEditPaymentMethod = () => {
    navigation.navigate(Routes.PAYMENT_METHOD, { bookingId });
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
          <AppText style={styles.headerTitle}>Payment Confirmation</AppText>
          <AppText style={styles.headerSubtitle}>
            Review your details and proceed securely
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
        {/* VEHICLE SUMMARY CARD */}
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
        </View>

        {/* BOOKING INFO & TOTAL AMOUNT SPLIT CARD */}
        <View style={styles.bookingOverviewCard}>
          {/* Left info column */}
          <View style={styles.overviewLeftCol}>
            <View style={styles.overviewItem}>
              <View style={styles.overviewIconWrap}>
                <Receipt size={14} color="#059669" />
              </View>
              <View style={{ flex: 1 }}>
                <AppText style={styles.overviewLabel}>Booking ID</AppText>
                <AppText style={styles.overviewVal}>{bookingId}</AppText>
              </View>
            </View>

            <View style={styles.overviewItem}>
              <View style={styles.overviewIconWrap}>
                <Calendar size={14} color="#059669" />
              </View>
              <View style={{ flex: 1 }}>
                <AppText style={styles.overviewLabel}>Service Date</AppText>
                <AppText style={styles.overviewVal}>17 Sep 2026</AppText>
              </View>
            </View>

            <View style={styles.overviewItem}>
              <View style={styles.overviewIconWrap}>
                <Clock size={14} color="#059669" />
              </View>
              <View style={{ flex: 1 }}>
                <AppText style={styles.overviewLabel}>Completed Time</AppText>
                <AppText style={styles.overviewVal}>11:20 AM</AppText>
              </View>
            </View>
          </View>

          {/* Right amount column */}
          <View style={styles.overviewRightCol}>
            <AppText style={styles.amountHeaderLabel}>Total Amount</AppText>
            <AppText style={styles.amountLargeVal}>₹547</AppText>
            <AppText style={styles.amountTaxSub}>Inclusive of all taxes</AppText>
            <TouchableOpacity
              style={styles.viewBillRow}
              onPress={() => setShowBillDetails(!showBillDetails)}
              activeOpacity={0.7}
            >
              <AppText style={styles.viewBillText}>View Bill Details</AppText>
              {showBillDetails ? (
                <ChevronUp size={12} color="#059669" />
              ) : (
                <ChevronDown size={12} color="#059669" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* EXPANDED BILL DETAILS */}
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
              <AppText style={styles.billTotalLabel}>Final Payable</AppText>
              <AppText style={styles.billTotalVal}>₹547</AppText>
            </View>
          </View>
        )}

        {/* SELECTED PAYMENT METHOD */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderWithAction}>
            <View style={styles.cardHeaderLeft}>
              <View style={styles.iconCircleGreen}>
                <CreditCard size={16} color="#059669" />
              </View>
              <AppText style={styles.cardHeaderTitle}>Selected Payment Method</AppText>
            </View>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={handleEditPaymentMethod}
              activeOpacity={0.7}
            >
              <Edit2 size={12} color="#059669" style={{ marginRight: 4 }} />
              <AppText style={styles.editText}>Edit</AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.selectedMethodBox}>
            <View style={styles.methodLogoBadge}>
              <AppText style={styles.upiLogoText}>UPI<AppText style={styles.upiLogoAccent}>▶</AppText></AppText>
            </View>
            <View style={styles.methodInfo}>
              <AppText style={styles.methodTitle}>UPI</AppText>
              <AppText style={styles.methodAppName}>Google Pay</AppText>
              <AppText style={styles.methodVpa}>ak******@okaxis</AppText>
            </View>
            <View style={styles.gpayBadge}>
              <AppText style={{ fontSize: 13, marginRight: 3 }}>🇬</AppText>
              <AppText style={styles.gpayText}>G Pay</AppText>
            </View>
          </View>
        </View>

        {/* PRICE BREAKDOWN */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderLeft}>
            <View style={styles.iconCircleGreen}>
              <FileText size={16} color="#059669" />
            </View>
            <AppText style={styles.cardHeaderTitle}>Price Breakdown</AppText>
          </View>

          <View style={styles.breakdownList}>
            <View style={styles.priceRow}>
              <AppText style={styles.priceLabel}>Base Service (Premium Car Wash)</AppText>
              <AppText style={styles.priceVal}>₹399</AppText>
            </View>
            <View style={styles.priceRow}>
              <AppText style={styles.priceLabel}>Tire Cleaning (Add-on)</AppText>
              <AppText style={styles.priceVal}>₹99</AppText>
            </View>
            <View style={styles.priceRow}>
              <AppText style={styles.priceLabel}>Interior Vacuum (Add-on)</AppText>
              <AppText style={styles.priceVal}>₹99</AppText>
            </View>
            <View style={styles.priceRow}>
              <AppText style={styles.priceLabel}>Discount</AppText>
              <AppText style={styles.discountVal}>- ₹50</AppText>
            </View>

            <View style={styles.breakdownDivider} />

            <View style={styles.totalPriceRow}>
              <AppText style={styles.totalPriceLabel}>Total Amount</AppText>
              <AppText style={styles.totalPriceVal}>₹547</AppText>
            </View>
          </View>
        </View>

        {/* 100% SECURE PAYMENT BADGES */}
        <View style={styles.securityCard}>
          <View style={styles.securityHeader}>
            <ShieldCheck size={20} color="#059669" />
            <View style={{ marginLeft: 8, flex: 1 }}>
              <AppText style={styles.securityTitle}>100% Secure Payment</AppText>
              <AppText style={styles.securityDesc}>
                Your payment is protected with bank-level security and encryption.
              </AppText>
            </View>
          </View>

          <View style={styles.securityBadgesRow}>
            <View style={styles.secBadgeItem}>
              <View style={styles.pciPill}>
                <AppText style={styles.pciText}>PCI DSS</AppText>
              </View>
              <AppText style={styles.secBadgeLabel}>COMPLIANT</AppText>
            </View>
            <View style={styles.secBadgeItem}>
              <Lock size={14} color="#059669" />
              <AppText style={styles.secBadgeLabel}>256-bit{'\n'}Encryption</AppText>
            </View>
            <View style={styles.secBadgeItem}>
              <ShieldCheck size={14} color="#059669" />
              <AppText style={styles.secBadgeLabel}>Razorpay{'\n'}Secure Gateway</AppText>
            </View>
          </View>
        </View>

        {/* PAY SECURELY BUTTON */}
        <TouchableOpacity
          style={styles.paySecureBtn}
          onPress={handlePaySecurely}
          activeOpacity={0.88}
        >
          <Lock size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
          <AppText style={styles.paySecureText}>Pay Securely  ₹547</AppText>
          <ArrowRight size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        {/* TERMS DISCLAIMER */}
        <AppText style={styles.termsText}>
          By proceeding, you agree to our <AppText style={styles.termsLink}>Terms of Service</AppText> and <AppText style={styles.termsLink}>Privacy Policy</AppText>.
        </AppText>

        {/* FOOTER HELP AND GREEN BADGE */}
        <View style={styles.footerRow}>
          <View style={styles.footerLeft}>
            <Leaf size={14} color="#059669" />
            <AppText style={styles.footerLeftText}>Clean Rides Greener Tomorrow</AppText>
          </View>

          <TouchableOpacity
            style={styles.footerRight}
            onPress={() => navigation.navigate(Routes.HELP_SUPPORT)}
            activeOpacity={0.7}
          >
            <AppText style={styles.needHelpText}>Need Help?</AppText>
            <Headphones size={13} color="#059669" style={{ marginHorizontal: 4 }} />
            <AppText style={styles.contactSupportText}>Contact Support</AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingBottom: 28,
  },
  /* VEHICLE CARD */
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
  /* OVERVIEW SPLIT CARD */
  bookingOverviewCard: {
    flexDirection: 'row',
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
  overviewLeftCol: {
    flex: 1.1,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#F1F5F9',
  },
  overviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  overviewIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  overviewLabel: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  overviewVal: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  overviewRightCol: {
    flex: 0.9,
    paddingLeft: 12,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  amountHeaderLabel: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  amountLargeVal: {
    fontSize: 22,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
    marginVertical: 2,
  },
  amountTaxSub: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
  },
  viewBillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  viewBillText: {
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
  /* SECTION CARD */
  sectionCard: {
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
  cardHeaderWithAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircleGreen: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  cardHeaderTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  editText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  selectedMethodBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  methodLogoBadge: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
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
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  methodAppName: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  methodVpa: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
  },
  gpayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  gpayText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  /* PRICE BREAKDOWN */
  breakdownList: {
    marginTop: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  priceLabel: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  priceVal: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  discountVal: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  breakdownDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 6,
  },
  totalPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPriceLabel: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  totalPriceVal: {
    fontSize: 17,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  /* SECURITY CARD */
  securityCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 14,
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
  secBadgeItem: {
    alignItems: 'center',
    flex: 1,
  },
  pciPill: {
    backgroundColor: '#065F46',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
    marginBottom: 2,
  },
  pciText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  secBadgeLabel: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#065F46',
    textAlign: 'center',
    lineHeight: 10,
  },
  /* PAY BUTTON */
  paySecureBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 4,
  },
  paySecureText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  termsText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 14,
  },
  termsLink: {
    fontFamily: Typography.fontFamily.semiBold,
    color: '#059669',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerLeftText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#059669',
    marginLeft: 4,
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  needHelpText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  contactSupportText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
});
