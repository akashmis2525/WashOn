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
  Check,
  Sparkles,
  Leaf,
  ShieldCheck,
  Heart,
  Droplets,
  Armchair,
  Disc,
  SprayCan as Spray,
  BadgeCheck,
  Star,
  Phone,
  MapPin,
  Bike,
  Wallet,
  CreditCard,
  ArrowRight,
  Lock,
  FileText,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type ServiceCompletionNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.SERVICE_COMPLETION_CONFIRMATION
>;

type ServiceCompletionRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.SERVICE_COMPLETION_CONFIRMATION
>;

export const ServiceCompletionConfirmationScreen: React.FC = () => {
  const navigation = useNavigation<ServiceCompletionNavProp>();
  const route = useRoute<ServiceCompletionRouteProp>();
  const { draft, activeBooking } = useBookingStore();

  const bookingId = route.params?.bookingId || activeBooking?.id || '#WO256839';

  const handlePayNow = () => {
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
          <AppText style={styles.headerTitle}>Service Completed</AppText>
          <AppText style={styles.headerSubtitle}>
            Thank you for choosing WashOn!
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
        {/* HERO CELEBRATION CARD */}
        <View style={styles.heroCard}>
          {/* Confetti decorative dots */}
          <View style={[styles.confetti, { top: 12, left: 16, backgroundColor: '#F59E0B' }]} />
          <View style={[styles.confetti, { top: 32, left: 40, backgroundColor: '#10B981', transform: [{ rotate: '45deg' }] }]} />
          <View style={[styles.confetti, { top: 10, right: 130, backgroundColor: '#EF4444', transform: [{ rotate: '30deg' }] }]} />
          <View style={[styles.confetti, { top: 28, right: 110, backgroundColor: '#3B82F6' }]} />

          <View style={styles.heroHeader}>
            <View style={styles.heroCheckBadge}>
              <Check size={22} color="#FFFFFF" strokeWidth={3} />
            </View>
            <AppText style={styles.heroTitle}>Your vehicle is clean!</AppText>
            <AppText style={styles.heroSubtitle}>Sit back, relax and enjoy the shine!</AppText>
          </View>

          {/* 4 Feature Pills */}
          <View style={styles.heroPillsRow}>
            <View style={styles.heroPill}>
              <Leaf size={14} color="#059669" />
              <AppText style={styles.heroPillText}>Cleaner</AppText>
            </View>
            <View style={styles.heroPill}>
              <Sparkles size={14} color="#059669" />
              <AppText style={styles.heroPillText}>Fresher</AppText>
            </View>
            <View style={styles.heroPill}>
              <ShieldCheck size={14} color="#059669" />
              <AppText style={styles.heroPillText}>Safer</AppText>
            </View>
            <View style={styles.heroPill}>
              <Heart size={14} color="#059669" />
              <AppText style={styles.heroPillText}>Happier Rides</AppText>
            </View>
          </View>

          {/* Vehicle Car Image & Tag */}
          <View style={styles.heroCarWrap}>
            <View style={styles.heroDriveTextWrap}>
              <AppText style={styles.heroDriveText}>Drive Clean</AppText>
              <AppText style={styles.heroDriveSubtext}>Drive Happy!</AppText>
            </View>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&q=80' }}
              style={styles.heroCarImg}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* SERVICE SUMMARY CARD */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionCardHeader}>
            <View style={styles.cardHeaderLeft}>
              <View style={styles.iconCircleGreen}>
                <FileText size={18} color="#059669" />
              </View>
              <View>
                <AppText style={styles.sectionCardTitle}>Service Summary</AppText>
                <AppText style={styles.sectionCardSub}>Here's what we've done for your vehicle.</AppText>
              </View>
            </View>
            <View style={styles.completedBadgeGreen}>
              <Check size={12} color="#059669" style={{ marginRight: 4 }} />
              <AppText style={styles.completedBadgeText}>Completed</AppText>
            </View>
          </View>

          <View style={styles.summarySplit}>
            {/* Left Col: Info */}
            <View style={styles.summaryLeftCol}>
              <View style={styles.summaryRow}>
                <AppText style={styles.summaryLabel}>Booking ID</AppText>
                <AppText style={styles.summaryValue}>{bookingId}</AppText>
              </View>
              <View style={styles.summaryRow}>
                <AppText style={styles.summaryLabel}>Service Type</AppText>
                <View>
                  <AppText style={styles.summaryValueBold}>Premium Car Wash</AppText>
                  <AppText style={styles.summaryValueSmall}>Exterior + Interior + Premium Finish</AppText>
                </View>
              </View>
              <View style={styles.summaryRow}>
                <AppText style={styles.summaryLabel}>Add-on Services</AppText>
                <AppText style={styles.summaryValueBold}>Tire Cleaning, Interior Vacuum</AppText>
              </View>
              <View style={styles.summaryRow}>
                <AppText style={styles.summaryLabel}>Start Time</AppText>
                <AppText style={styles.summaryValue}>10:15 AM, 17 Sep 2026</AppText>
              </View>
              <View style={styles.summaryRow}>
                <AppText style={styles.summaryLabel}>Completed Time</AppText>
                <AppText style={styles.summaryValue}>11:20 AM, 17 Sep 2026</AppText>
              </View>
              <View style={styles.summaryRow}>
                <AppText style={styles.summaryLabel}>Total Duration</AppText>
                <AppText style={styles.summaryValueBold}>1 hr 5 mins</AppText>
              </View>
            </View>

            {/* Right Col: 5 Steps Checklist */}
            <View style={styles.summaryRightCol}>
              <View style={styles.stepItem}>
                <View style={styles.stepIconWrap}>
                  <Droplets size={14} color="#059669" />
                </View>
                <View style={styles.stepTextWrap}>
                  <AppText style={styles.stepName}>Exterior Wash</AppText>
                  <AppText style={styles.stepStatus}>Completed</AppText>
                </View>
              </View>

              <View style={styles.stepItem}>
                <View style={styles.stepIconWrap}>
                  <Armchair size={14} color="#059669" />
                </View>
                <View style={styles.stepTextWrap}>
                  <AppText style={styles.stepName}>Interior Cleaning</AppText>
                  <AppText style={styles.stepStatus}>Completed</AppText>
                </View>
              </View>

              <View style={styles.stepItem}>
                <View style={styles.stepIconWrap}>
                  <Disc size={14} color="#059669" />
                </View>
                <View style={styles.stepTextWrap}>
                  <AppText style={styles.stepName}>Tire Cleaning</AppText>
                  <AppText style={styles.stepStatus}>Completed</AppText>
                </View>
              </View>

              <View style={styles.stepItem}>
                <View style={styles.stepIconWrap}>
                  <Spray size={14} color="#059669" />
                </View>
                <View style={styles.stepTextWrap}>
                  <AppText style={styles.stepName}>Polishing</AppText>
                  <AppText style={styles.stepStatus}>Completed</AppText>
                </View>
              </View>

              <View style={styles.stepItem}>
                <View style={styles.stepIconWrap}>
                  <BadgeCheck size={14} color="#059669" />
                </View>
                <View style={styles.stepTextWrap}>
                  <AppText style={styles.stepName}>Quality Check</AppText>
                  <AppText style={styles.stepStatus}>Completed</AppText>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* WASHERMAN DETAILS */}
        <View style={styles.sectionCard}>
          <View style={styles.washermanHeader}>
            <View style={styles.washermanHeaderLeft}>
              <View style={styles.washermanIconCircle}>
                <AppText style={{ fontSize: 14 }}>👤</AppText>
              </View>
              <AppText style={styles.washermanTitle}>Washerman Details</AppText>
            </View>
          </View>

          <View style={styles.washermanCardInner}>
            <View style={styles.washermanLeft}>
              <View style={styles.washermanAvatarWrap}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&q=80' }}
                  style={styles.washermanAvatar}
                />
                <View style={styles.onlineBadge} />
              </View>
              <View style={styles.washermanInfo}>
                <AppText style={styles.washermanName}>Rakesh Kumar</AppText>
                <View style={styles.ratingRow}>
                  <Star size={13} color="#F59E0B" fill="#F59E0B" />
                  <AppText style={styles.ratingText}>4.8 </AppText>
                  <AppText style={styles.ratingCount}>(320 reviews)</AppText>
                </View>
                <View style={styles.verifiedTag}>
                  <Check size={10} color="#059669" strokeWidth={3} />
                  <AppText style={styles.verifiedTagText}>Verified Washerman</AppText>
                </View>
              </View>
            </View>

            <View style={styles.washermanRight}>
              <View style={styles.contactRow}>
                <Phone size={13} color="#059669" />
                <AppText style={styles.contactText}>+91 98765 43210</AppText>
              </View>
              <View style={styles.contactRow}>
                <MapPin size={13} color="#059669" />
                <AppText style={styles.contactText}>Indore, MP</AppText>
              </View>
              <View style={styles.contactRow}>
                <Bike size={13} color="#059669" />
                <View>
                  <AppText style={styles.contactTextBold}>Honda Activa</AppText>
                  <AppText style={styles.contactTextSub}>MP 09 AB 4321</AppText>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* PAYMENT DETAILS */}
        <View style={styles.sectionCard}>
          <View style={styles.paymentHeader}>
            <View style={styles.paymentIconCircle}>
              <Wallet size={16} color="#059669" />
            </View>
            <AppText style={styles.paymentTitle}>Payment Details</AppText>
          </View>

          <View style={styles.paymentSplit}>
            {/* Left breakdown */}
            <View style={styles.paymentBreakdown}>
              <View style={styles.priceLine}>
                <AppText style={styles.priceLabel}>Base Service (Premium Car Wash)</AppText>
                <AppText style={styles.priceValue}>₹399</AppText>
              </View>
              <View style={styles.priceLine}>
                <AppText style={styles.priceLabel}>Tire Cleaning (Add-on)</AppText>
                <AppText style={styles.priceValue}>₹99</AppText>
              </View>
              <View style={styles.priceLine}>
                <AppText style={styles.priceLabel}>Interior Vacuum (Add-on)</AppText>
                <AppText style={styles.priceValue}>₹99</AppText>
              </View>
              <View style={styles.priceLine}>
                <AppText style={styles.priceLabel}>Discount</AppText>
                <AppText style={styles.discountValue}>- ₹50</AppText>
              </View>
              <View style={styles.priceDivider} />
              <View style={styles.totalLine}>
                <AppText style={styles.totalLabel}>Total Amount</AppText>
                <AppText style={styles.totalValue}>₹547</AppText>
              </View>
            </View>

            {/* Right safe badge box */}
            <View style={styles.safeBox}>
              <View style={styles.safeHeaderRow}>
                <ShieldCheck size={18} color="#059669" />
                <View style={{ marginLeft: 6 }}>
                  <AppText style={styles.safeTitle}>Safe & Secure</AppText>
                  <AppText style={styles.safeSubTitle}>Payments</AppText>
                </View>
              </View>
              <AppText style={styles.poweredBy}>Powered by Razorpay</AppText>

              <View style={styles.safeFeaturesRow}>
                <View style={styles.safeFeatureItem}>
                  <Lock size={12} color="#059669" />
                  <AppText style={styles.safeFeatureText}>256-bit{'\n'}Encryption</AppText>
                </View>
                <View style={styles.safeFeatureItem}>
                  <CreditCard size={12} color="#059669" />
                  <AppText style={styles.safeFeatureText}>Multiple{'\n'}Payment Options</AppText>
                </View>
                <View style={styles.safeFeatureItem}>
                  <ShieldCheck size={12} color="#059669" />
                  <AppText style={styles.safeFeatureText}>100%{'\n'}Secure</AppText>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* BOTTOM PAY NOW CTA BUTTON */}
        <TouchableOpacity
          style={styles.payNowCTA}
          onPress={handlePayNow}
          activeOpacity={0.88}
        >
          <CreditCard size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
          <AppText style={styles.payNowCTAText}>Pay Now  ₹547</AppText>
          <ArrowRight size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        {/* Footer lock note */}
        <View style={styles.footerNoteWrap}>
          <Lock size={12} color="#6B7280" style={{ marginRight: 5 }} />
          <AppText style={styles.footerNote}>Your trust keeps us moving. Thank you!</AppText>
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
  /* HERO CELEBRATION CARD */
  heroCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 14,
    position: 'relative',
    overflow: 'hidden',
  },
  confetti: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 2,
  },
  heroHeader: {
    alignItems: 'center',
    marginBottom: 12,
  },
  heroCheckBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  heroTitle: {
    fontSize: 19,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  heroSubtitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#047857',
    marginTop: 2,
  },
  heroPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  heroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  heroPillText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#065F46',
    marginLeft: 4,
  },
  heroCarWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  heroDriveTextWrap: {
    flex: 1,
    paddingLeft: 4,
  },
  heroDriveText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#047857',
    fontStyle: 'italic',
  },
  heroDriveSubtext: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#059669',
    fontStyle: 'italic',
  },
  heroCarImg: {
    width: 140,
    height: 70,
  },
  /* SECTION CARD */
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  sectionCardTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  sectionCardSub: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  completedBadgeGreen: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  completedBadgeText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  summarySplit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  summaryLeftCol: {
    flex: 1.1,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#F1F5F9',
  },
  summaryRow: {
    marginBottom: 9,
  },
  summaryLabel: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginBottom: 1,
  },
  summaryValue: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  summaryValueBold: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  summaryValueSmall: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 1,
  },
  summaryRightCol: {
    flex: 0.9,
    paddingLeft: 10,
    justifyContent: 'space-around',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  stepTextWrap: {
    flex: 1,
  },
  stepName: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  stepStatus: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#059669',
  },
  /* WASHERMAN CARD */
  washermanHeader: {
    marginBottom: 10,
  },
  washermanHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  washermanIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  washermanTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  washermanCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  washermanLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1.1,
  },
  washermanAvatarWrap: {
    position: 'relative',
    marginRight: 10,
  },
  washermanAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#059669',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  washermanInfo: {
    flex: 1,
  },
  washermanName: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginLeft: 3,
  },
  ratingCount: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  verifiedTagText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
    marginLeft: 3,
  },
  washermanRight: {
    flex: 0.9,
    paddingLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: '#E2E8F0',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  contactText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#0F172A',
    marginLeft: 6,
  },
  contactTextBold: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginLeft: 6,
  },
  contactTextSub: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginLeft: 6,
  },
  /* PAYMENT DETAILS */
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  paymentTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  paymentSplit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentBreakdown: {
    flex: 1.1,
    paddingRight: 10,
  },
  priceLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  priceLabel: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    flex: 1,
  },
  priceValue: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  discountValue: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  priceDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 6,
  },
  totalLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  totalValue: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  safeBox: {
    flex: 0.9,
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  safeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  safeTitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  safeSubTitle: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#047857',
  },
  poweredBy: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#047857',
    marginVertical: 3,
  },
  safeFeaturesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 4,
  },
  safeFeatureItem: {
    alignItems: 'center',
    flex: 1,
  },
  safeFeatureText: {
    fontSize: 7,
    fontFamily: Typography.fontFamily.medium,
    color: '#065F46',
    textAlign: 'center',
    marginTop: 2,
    lineHeight: 9,
  },
  /* CTA */
  payNowCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 4,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 4,
  },
  payNowCTAText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  footerNoteWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  footerNote: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
});
