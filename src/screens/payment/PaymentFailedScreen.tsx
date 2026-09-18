import React from 'react';
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
  X,
  AlertCircle,
  RotateCcw,
  CreditCard,
  Clock,
  Headphones,
  ShieldCheck,
  Lock,
  Receipt,
  Calendar,
  IndianRupee,
  ChevronRight,
  ArrowRight,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type PaymentFailedNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.PAYMENT_FAILED
>;

type PaymentFailedRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.PAYMENT_FAILED
>;

export const PaymentFailedScreen: React.FC = () => {
  const navigation = useNavigation<PaymentFailedNavProp>();
  const route = useRoute<PaymentFailedRouteProp>();
  const { activeBooking } = useBookingStore();

  const bookingId = route.params?.bookingId || activeBooking?.id || '#WO256839';
  const errorCode = route.params?.error || 'PMT_4001';

  const handleRetryPayment = () => {
    navigation.replace(Routes.PAYMENT_PROCESSING, {
      bookingId,
      method: 'UPI - Google Pay',
    });
  };

  const handleChangePaymentMethod = () => {
    navigation.navigate(Routes.PAYMENT_METHOD, { bookingId });
  };

  const handlePayLater = () => {
    navigation.navigate(Routes.HOME_DASHBOARD);
  };

  const handleContactSupport = () => {
    navigation.navigate(Routes.HELP_SUPPORT);
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

        <View style={{ flex: 1 }} />

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
        {/* FAILURE HERO GRAPHIC */}
        <View style={styles.heroSection}>
          {/* Decorative dashes */}
          <View style={[styles.dash, { top: 10, left: 55, transform: [{ rotate: '-30deg' }] }]} />
          <View style={[styles.dash, { top: 32, left: 45, transform: [{ rotate: '15deg' }] }]} />
          <View style={[styles.dash, { top: 12, right: 60, transform: [{ rotate: '30deg' }] }]} />
          <View style={[styles.dash, { top: 34, right: 50, transform: [{ rotate: '-20deg' }] }]} />

          {/* Outer pink circle & Inner Red Badge */}
          <View style={styles.errorOuterRing}>
            <View style={styles.errorInnerBadge}>
              <X size={38} color="#FFFFFF" strokeWidth={3.5} />
            </View>
          </View>

          <AppText style={styles.failedTitle}>Payment Failed</AppText>
          <AppText style={styles.failedSub}>
            Oops! We couldn't process your payment.
          </AppText>
          <AppText style={styles.failedDesc}>
            Don't worry, no amount has been deducted from your account.
          </AppText>
        </View>

        {/* ERROR CODE CARD */}
        <View style={styles.errorAlertCard}>
          <View style={styles.errorAlertLeft}>
            <View style={styles.errorIconCircle}>
              <AlertCircle size={20} color="#EF4444" />
            </View>
            <View style={styles.errorAlertTextWrap}>
              <AppText style={styles.errorAlertTitle}>
                Transaction could not be completed.
              </AppText>
              <AppText style={styles.errorAlertDesc}>
                This may be due to insufficient balance, network issue, or bank declined the transaction.
              </AppText>
            </View>
          </View>

          <View style={styles.errorCodeBox}>
            <AppText style={styles.errorCodeLabel}>Error Code</AppText>
            <AppText style={styles.errorCodeValue}>{errorCode}</AppText>
          </View>
        </View>

        {/* VEHICLE MINI CARD */}
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

        {/* 2X2 BOOKING & ATTEMPT INFO */}
        <View style={styles.infoGridCard}>
          <View style={styles.infoRow}>
            {/* Booking ID */}
            <View style={styles.infoCell}>
              <View style={styles.infoIconWrap}>
                <Receipt size={14} color="#059669" />
              </View>
              <View>
                <AppText style={styles.infoLabel}>Booking ID</AppText>
                <AppText style={styles.infoValueBold}>{bookingId}</AppText>
              </View>
            </View>

            {/* Payment Method */}
            <View style={styles.infoCell}>
              <View style={styles.infoIconWrap}>
                <CreditCard size={14} color="#059669" />
              </View>
              <View>
                <AppText style={styles.infoLabel}>Payment Method</AppText>
                <AppText style={styles.infoValueBold}>UPI (Google Pay)</AppText>
              </View>
            </View>
          </View>

          <View style={styles.gridDivider} />

          <View style={styles.infoRow}>
            {/* Amount */}
            <View style={styles.infoCell}>
              <View style={styles.infoIconWrap}>
                <IndianRupee size={14} color="#059669" />
              </View>
              <View>
                <AppText style={styles.infoLabel}>Amount</AppText>
                <AppText style={styles.amountLarge}>₹547</AppText>
              </View>
            </View>

            {/* Attempted On */}
            <View style={styles.infoCell}>
              <View style={styles.infoIconWrap}>
                <Calendar size={14} color="#059669" />
              </View>
              <View>
                <AppText style={styles.infoLabel}>Attempted On</AppText>
                <AppText style={styles.infoValueBold}>17 Sep 2026, 11:21 AM</AppText>
              </View>
            </View>
          </View>
        </View>

        {/* SECTION TITLE */}
        <AppText style={styles.actionSectionTitle}>What would you like to do?</AppText>

        {/* PRIMARY RETRY BUTTON */}
        <TouchableOpacity
          style={styles.retryBtn}
          onPress={handleRetryPayment}
          activeOpacity={0.88}
        >
          <RotateCcw size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
          <AppText style={styles.retryBtnText}>Retry Payment</AppText>
          <ArrowRight size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        {/* CHANGE PAYMENT METHOD */}
        <TouchableOpacity
          style={styles.changeMethodBtn}
          onPress={handleChangePaymentMethod}
          activeOpacity={0.85}
        >
          <CreditCard size={18} color="#EF4444" style={{ marginRight: 8 }} />
          <AppText style={styles.changeMethodText}>Change Payment Method</AppText>
          <ArrowRight size={18} color="#EF4444" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        {/* PAY LATER & CONTACT SUPPORT DUAL CARDS */}
        <View style={styles.dualCardsRow}>
          {/* Pay Later */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={handlePayLater}
            activeOpacity={0.8}
          >
            <View style={styles.actionCardIconWrap}>
              <Clock size={16} color="#059669" />
            </View>
            <View style={styles.actionCardTextWrap}>
              <AppText style={styles.actionCardTitle}>Pay Later</AppText>
              <AppText style={styles.actionCardSub}>Continue and pay later</AppText>
            </View>
            <ChevronRight size={14} color="#94A3B8" />
          </TouchableOpacity>

          {/* Contact Support */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={handleContactSupport}
            activeOpacity={0.8}
          >
            <View style={styles.actionCardIconWrap}>
              <Headphones size={16} color="#059669" />
            </View>
            <View style={styles.actionCardTextWrap}>
              <AppText style={styles.actionCardTitle}>Contact Support</AppText>
              <AppText style={styles.actionCardSub}>Get help from our team</AppText>
            </View>
            <ChevronRight size={14} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* SECURITY REASSURANCE CARD */}
        <View style={styles.securityReassuranceCard}>
          <View style={styles.secReassureLeft}>
            <ShieldCheck size={20} color="#059669" />
            <View style={{ marginLeft: 8, flex: 1 }}>
              <AppText style={styles.secReassureTitle}>Your security is our priority</AppText>
              <AppText style={styles.secReassureDesc}>
                No money has been deducted. You can try again with a different payment method.
              </AppText>
            </View>
          </View>
          <View style={styles.secReassureBadge}>
            <Lock size={12} color="#059669" />
            <AppText style={styles.secBadgeText}>100% Secure{'\n'}Payments</AppText>
          </View>
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
  /* HERO SECTION */
  heroSection: {
    alignItems: 'center',
    marginBottom: 14,
    position: 'relative',
  },
  dash: {
    position: 'absolute',
    width: 8,
    height: 3,
    backgroundColor: '#EF4444',
    borderRadius: 2,
  },
  errorOuterRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  errorInnerBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  failedTitle: {
    fontSize: 21,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  failedSub: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#64748B',
    marginTop: 2,
  },
  failedDesc: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#94A3B8',
    marginTop: 2,
    textAlign: 'center',
  },
  /* ERROR ALERT CARD */
  errorAlertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FEF2F2',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
    marginBottom: 12,
  },
  errorAlertLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 8,
  },
  errorIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  errorAlertTextWrap: {
    flex: 1,
  },
  errorAlertTitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#991B1B',
  },
  errorAlertDesc: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#B91C1C',
    marginTop: 2,
    lineHeight: 11,
  },
  errorCodeBox: {
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#FECACA',
    paddingLeft: 10,
  },
  errorCodeLabel: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  errorCodeValue: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#DC2626',
    marginTop: 1,
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
  /* INFO GRID */
  infoGridCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoCell: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  infoLabel: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  infoValueBold: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  amountLarge: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  gridDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  /* ACTION TITLE */
  actionSectionTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 10,
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 10,
  },
  retryBtnText: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  changeMethodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 13,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#FECACA',
    marginBottom: 10,
  },
  changeMethodText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#DC2626',
  },
  /* DUAL CARDS */
  dualCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  actionCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginHorizontal: 4,
  },
  actionCardIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  actionCardTextWrap: {
    flex: 1,
  },
  actionCardTitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  actionCardSub: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  /* SECURITY REASSURANCE */
  securityReassuranceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  secReassureLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 8,
  },
  secReassureTitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  secReassureDesc: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#047857',
    marginTop: 2,
    lineHeight: 11,
  },
  secReassureBadge: {
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#A7F3D0',
    paddingLeft: 8,
  },
  secBadgeText: {
    fontSize: 7,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
    textAlign: 'center',
    marginTop: 2,
    lineHeight: 9,
  },
});
