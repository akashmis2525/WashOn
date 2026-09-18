import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Share,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Check,
  FileText,
  CreditCard,
  Calendar,
  IndianRupee,
  Heart,
  Download,
  Share2,
  Star,
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

type PaymentSuccessNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.PAYMENT_SUCCESS
>;

type PaymentSuccessRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.PAYMENT_SUCCESS
>;

export const PaymentSuccessScreen: React.FC = () => {
  const navigation = useNavigation<PaymentSuccessNavProp>();
  const route = useRoute<PaymentSuccessRouteProp>();
  const { activeBooking } = useBookingStore();

  const bookingId = route.params?.bookingId || activeBooking?.id || '#WO256839';
  const transactionId = 'TXN7826394710';
  const [rating, setRating] = useState<number>(5);

  const handleViewInvoice = () => {
    navigation.navigate(Routes.INVOICE, { bookingId });
  };

  const handleDownloadInvoice = () => {
    Alert.alert('Invoice Downloaded', 'Tax invoice PDF has been saved to your downloads folder.');
  };

  const handleShareInvoice = async () => {
    try {
      await Share.share({
        message: `WashOn Service Receipt for ${bookingId} - Total Paid: ₹547. Thank you for choosing WashOn!`,
      });
    } catch (error) {
      // ignore
    }
  };

  const handleRateExperience = (selectedStar: number) => {
    setRating(selectedStar);
    navigation.navigate(Routes.RATE_WASHERMAN, { bookingId });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate(Routes.HOME_DASHBOARD)}
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
        {/* CELEBRATION SECTION */}
        <View style={styles.celebrationSection}>
          {/* Confetti sprinkle shapes */}
          <View style={[styles.confetti, { top: 6, left: 30, backgroundColor: '#F59E0B' }]} />
          <View style={[styles.confetti, { top: 20, left: 60, backgroundColor: '#10B981', transform: [{ rotate: '45deg' }] }]} />
          <View style={[styles.confetti, { top: 8, right: 70, backgroundColor: '#EF4444', transform: [{ rotate: '30deg' }] }]} />
          <View style={[styles.confetti, { top: 24, right: 35, backgroundColor: '#3B82F6' }]} />

          {/* Glowing Green Circle */}
          <View style={styles.successBadgeOuter}>
            <View style={styles.successBadgeInner}>
              <Check size={36} color="#FFFFFF" strokeWidth={3.5} />
            </View>
          </View>

          <AppText style={styles.successTitle}>Payment Successful!</AppText>
          <AppText style={styles.successSub}>Thank you for choosing WashOn!</AppText>
          <AppText style={styles.successDesc}>
            Your payment has been completed successfully.
          </AppText>
        </View>

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

        {/* SPLIT PAYMENT SUMMARY CARD */}
        <View style={styles.summarySplitCard}>
          {/* Left Column: Transaction details */}
          <View style={styles.summaryLeftCol}>
            <View style={styles.detailItem}>
              <View style={styles.iconCircleGreen}>
                <Receipt size={13} color="#059669" />
              </View>
              <View style={{ flex: 1 }}>
                <AppText style={styles.detailLabel}>Booking ID</AppText>
                <AppText style={styles.detailValBold}>{bookingId}</AppText>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.iconCircleGreen}>
                <CreditCard size={13} color="#059669" />
              </View>
              <View style={{ flex: 1 }}>
                <AppText style={styles.detailLabel}>Transaction ID</AppText>
                <AppText style={styles.detailValBold}>{transactionId}</AppText>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.iconCircleGreen}>
                <Calendar size={13} color="#059669" />
              </View>
              <View style={{ flex: 1 }}>
                <AppText style={styles.detailLabel}>Payment Date & Time</AppText>
                <AppText style={styles.detailValBold}>17 Sep 2026, 11:21 AM</AppText>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.iconCircleGreen}>
                <IndianRupee size={13} color="#059669" />
              </View>
              <View style={{ flex: 1 }}>
                <AppText style={styles.detailLabel}>Paid Amount</AppText>
                <AppText style={styles.amountLargeGreen}>₹547</AppText>
              </View>
            </View>
          </View>

          {/* Right Column: Thank you note & heart */}
          <View style={styles.summaryRightCol}>
            <View style={styles.heartCircle}>
              <Heart size={20} color="#059669" fill="#059669" />
            </View>
            <AppText style={styles.completedHeader}>Payment Completed</AppText>
            <AppText style={styles.safeHandsDesc}>
              Your vehicle is in safe hands with our team!
            </AppText>
            <View style={styles.driveHappyWrap}>
              <AppText style={styles.driveCleanText}>Drive Clean</AppText>
              <AppText style={styles.driveHappyText}>Drive Happy!</AppText>
            </View>
          </View>
        </View>

        {/* VIEW INVOICE PRIMARY BUTTON */}
        <TouchableOpacity
          style={styles.viewInvoiceCTA}
          onPress={handleViewInvoice}
          activeOpacity={0.88}
        >
          <FileText size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
          <AppText style={styles.viewInvoiceCTAText}>View Invoice</AppText>
          <ArrowRight size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        {/* SECONDARY ACTION BUTTONS (DOWNLOAD & SHARE) */}
        <View style={styles.secondaryButtonsRow}>
          <TouchableOpacity
            style={styles.secBtn}
            onPress={handleDownloadInvoice}
            activeOpacity={0.8}
          >
            <Download size={15} color="#059669" style={{ marginRight: 6 }} />
            <AppText style={styles.secBtnText}>Download Invoice</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secBtn}
            onPress={handleShareInvoice}
            activeOpacity={0.8}
          >
            <Share2 size={15} color="#059669" style={{ marginRight: 6 }} />
            <AppText style={styles.secBtnText}>Share Invoice</AppText>
          </TouchableOpacity>
        </View>

        {/* RATING EXPERIENCE CARD */}
        <View style={styles.ratingCard}>
          <View style={styles.ratingCardHeader}>
            <View style={styles.ratingIconCircle}>
              <Star size={16} color="#059669" fill="#059669" />
            </View>
            <View style={{ flex: 1 }}>
              <AppText style={styles.ratingCardTitle}>How was your experience?</AppText>
              <AppText style={styles.ratingCardSub}>
                Rate your service and help us improve.
              </AppText>
            </View>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((starVal) => (
                <TouchableOpacity
                  key={starVal}
                  onPress={() => handleRateExperience(starVal)}
                  activeOpacity={0.7}
                  style={{ padding: 2 }}
                >
                  <Star
                    size={20}
                    color="#F59E0B"
                    fill={starVal <= rating ? '#F59E0B' : 'transparent'}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* GREEN TOMORROWS FOOTER BANNER */}
        <View style={styles.ecoBanner}>
          <View style={styles.ecoLeft}>
            <View style={styles.ecoIconCircle}>
              <Leaf size={16} color="#059669" />
            </View>
            <View>
              <AppText style={styles.ecoTitle}>
                Thank you for keeping
              </AppText>
              <AppText style={styles.ecoSub}>
                it clean and green! 🌱
              </AppText>
            </View>
          </View>
          <View style={styles.ecoRight}>
            <AppText style={styles.ecoTagline}>Clean Rides</AppText>
            <AppText style={styles.ecoSubTagline}>Greener Tomorrows</AppText>
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
  /* CELEBRATION */
  celebrationSection: {
    alignItems: 'center',
    marginBottom: 14,
    position: 'relative',
  },
  confetti: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderRadius: 2,
  },
  successBadgeOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  successBadgeInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  successTitle: {
    fontSize: 21,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  successSub: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#059669',
    marginTop: 2,
  },
  successDesc: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginTop: 2,
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
  /* SPLIT SUMMARY CARD */
  summarySplitCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryLeftCol: {
    flex: 1.1,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#F1F5F9',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconCircleGreen: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  detailLabel: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  detailValBold: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  amountLargeGreen: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  summaryRightCol: {
    flex: 0.9,
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 10,
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  heartCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  completedHeader: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  safeHandsDesc: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#047857',
    textAlign: 'center',
    marginTop: 2,
    lineHeight: 11,
  },
  driveHappyWrap: {
    marginTop: 8,
    alignItems: 'center',
  },
  driveCleanText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
    fontStyle: 'italic',
  },
  driveHappyText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#059669',
    fontStyle: 'italic',
  },
  /* CTA */
  viewInvoiceCTA: {
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
    marginBottom: 10,
  },
  viewInvoiceCTAText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  secondaryButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  secBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginHorizontal: 4,
  },
  secBtnText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  /* RATING CARD */
  ratingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 12,
  },
  ratingCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  ratingCardTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  ratingCardSub: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  /* ECO BANNER */
  ecoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  ecoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ecoIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  ecoTitle: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#065F46',
  },
  ecoSub: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#047857',
  },
  ecoRight: {
    alignItems: 'flex-end',
  },
  ecoTagline: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  ecoSubTagline: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#059669',
  },
});
