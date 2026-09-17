import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Car,
  Droplet,
  User,
  MapPin,
  IndianRupee,
  ShieldCheck,
  Edit3,
  Star,
  ChevronDown,
  Info,
  ArrowRight,
  ClipboardList,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { useBookingStore } from '../../store/bookingStore';

type BookingConfirmationNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.BOOKING_CONFIRMATION
>;

export const BookingConfirmationScreen: React.FC = () => {
  const navigation = useNavigation<BookingConfirmationNavProp>();
  const { draft, createBookingFromDraft } = useBookingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmBooking = async () => {
    try {
      setIsSubmitting(true);
      const newBooking = await createBookingFromDraft();
      navigation.navigate(Routes.BOOKING_REQUEST_SENT, { bookingId: newBooking.id });
    } catch (e) {
      navigation.navigate(Routes.BOOKING_REQUEST_SENT, { bookingId: 'bk_demo_001' });
    } finally {
      setIsSubmitting(false);
    }
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
          <AppText style={styles.headerTitle}>Confirm Your Booking</AppText>
          <AppText style={styles.headerSubtitle}>
            Please review the details before confirming
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
        {/* ALMOST DONE BANNER */}
        <View style={styles.bannerCard}>
          <CheckCircle2 size={24} color="#059669" />
          <View style={styles.bannerTextContainer}>
            <AppText style={styles.bannerTitle}>Almost Done!</AppText>
            <AppText style={styles.bannerDesc}>
              Review your booking details and confirm.
            </AppText>
          </View>
          <ClipboardList size={32} color="#059669" opacity={0.4} />
        </View>

        {/* BOOKING ID HEADER */}
        <View style={styles.bookingIdCard}>
          <View>
            <AppText style={styles.bookingIdLabel}>Booking ID</AppText>
            <AppText style={styles.bookingIdValue}>WO20260917001</AppText>
            <AppText style={styles.bookingIdSub}>Confirm now to secure your slot</AppText>
          </View>
          <View style={styles.pendingBadge}>
            <Clock size={12} color="#D97706" />
            <AppText style={styles.pendingBadgeText}>Pending Confirmation</AppText>
          </View>
        </View>

        {/* REVIEW CARDS LIST */}
        <View style={styles.cardsList}>
          {/* 1. Vehicle Details */}
          <View style={styles.detailCard}>
            <View style={[styles.detailIconBox, { backgroundColor: '#ECFDF5' }]}>
              <Car size={20} color="#059669" />
            </View>
            <View style={styles.detailContent}>
              <AppText style={styles.detailLabel}>Vehicle Details</AppText>
              <AppText style={styles.detailMainTitle}>
                {draft.vehicle ? `${draft.vehicle.brand} ${draft.vehicle.model}` : 'Toyota Fortuner'}
              </AppText>
              <AppText style={styles.detailSub}>
                {draft.vehicle ? `${draft.vehicle.type.toUpperCase()} • ${draft.vehicle.color} • ${draft.vehicle.registrationNumber}` : 'SUV • White • MP 09 AB 1234'}
              </AppText>
            </View>
            <Image
              source={{ uri: draft.vehicle?.photoUrl || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=120&q=80' }}
              style={styles.detailThumb}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.VEHICLE_LIST)}
              style={styles.editBtn}
            >
              <Edit3 size={12} color="#0284C7" />
              <AppText style={styles.editBtnText}>Edit</AppText>
            </TouchableOpacity>
          </View>

          {/* 2. Service Details */}
          <View style={styles.detailCard}>
            <View style={[styles.detailIconBox, { backgroundColor: '#EFF6FF' }]}>
              <Droplet size={20} color="#2563EB" />
            </View>
            <View style={styles.detailContent}>
              <AppText style={styles.detailLabel}>Service Details</AppText>
              <AppText style={styles.detailMainTitle}>
                {draft.service ? draft.service.name : 'Premium Car Wash'}
              </AppText>
              <AppText style={styles.detailSub}>
                Exterior + Interior + Premium Finish
              </AppText>
            </View>
            <Image
              source={{ uri: draft.service?.imageUrl || 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=120&q=80' }}
              style={styles.detailThumb}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.SERVICE_CATEGORY)}
              style={styles.editBtn}
            >
              <Edit3 size={12} color="#0284C7" />
              <AppText style={styles.editBtnText}>Edit</AppText>
            </TouchableOpacity>
          </View>

          {/* 3. Washerman Details */}
          <View style={styles.detailCard}>
            <View style={[styles.detailIconBox, { backgroundColor: '#F3F4F6' }]}>
              <User size={20} color="#4B5563" />
            </View>
            <Image
              source={{ uri: draft.washerman?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80' }}
              style={styles.avatarThumb}
            />
            <View style={styles.detailContent}>
              <AppText style={styles.detailLabel}>Washerman Details</AppText>
              <AppText style={styles.detailMainTitle}>
                {draft.washerman ? draft.washerman.name : 'Rakesh Kumar'}
              </AppText>
              <View style={styles.inlineRatingRow}>
                <Star size={12} color="#F59E0B" fill="#F59E0B" />
                <AppText style={styles.ratingSubText}> 4.8 (320 reviews)</AppText>
                <View style={styles.miniAvailBadge}>
                  <View style={styles.miniGreenDot} />
                  <AppText style={styles.miniAvailText}>Available Now</AppText>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.WASHERMAN_LIST_VIEW)}
              style={styles.editBtn}
            >
              <Edit3 size={12} color="#0284C7" />
              <AppText style={styles.editBtnText}>Edit</AppText>
            </TouchableOpacity>
          </View>

          {/* 4. Service Location */}
          <View style={styles.detailCard}>
            <View style={[styles.detailIconBox, { backgroundColor: '#ECFDF5' }]}>
              <MapPin size={20} color="#059669" />
            </View>
            <View style={styles.detailContent}>
              <AppText style={styles.detailLabel}>Service Location</AppText>
              <AppText style={styles.detailMainTitle} numberOfLines={2}>
                123, Vijay Nagar, Indore, Madhya Pradesh - 452010
              </AppText>
            </View>
            {/* Mini map thumbnail */}
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=120&q=80' }}
              style={styles.mapThumb}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.LOCATION_SELECTION)}
              style={styles.editBtn}
            >
              <Edit3 size={12} color="#0284C7" />
              <AppText style={styles.editBtnText}>Edit</AppText>
            </TouchableOpacity>
          </View>

          {/* 5. Price Details */}
          <View style={styles.detailCard}>
            <View style={[styles.detailIconBox, { backgroundColor: '#ECFDF5' }]}>
              <IndianRupee size={20} color="#059669" />
            </View>
            <View style={styles.detailContent}>
              <AppText style={styles.detailLabel}>Price Details</AppText>
              <View style={styles.priceRow}>
                <AppText style={styles.priceAmount}>₹707</AppText>
                <AppText style={styles.priceSubText}> (All inclusive)</AppText>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate(Routes.PRICE_BREAKDOWN)}
                style={styles.viewBreakdownRow}
              >
                <AppText style={styles.viewBreakdownText}>View Breakdown</AppText>
                <ChevronDown size={12} color="#059669" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.PRICE_BREAKDOWN)}
              style={styles.editBtn}
            >
              <Edit3 size={12} color="#0284C7" />
              <AppText style={styles.editBtnText}>Edit</AppText>
            </TouchableOpacity>
          </View>

          {/* 6. Estimated Arrival */}
          <View style={styles.detailCard}>
            <View style={[styles.detailIconBox, { backgroundColor: '#ECFDF5' }]}>
              <Clock size={20} color="#059669" />
            </View>
            <View style={styles.detailContent}>
              <AppText style={styles.detailLabel}>Estimated Arrival</AppText>
              <View style={styles.arrivalRow}>
                <AppText style={styles.arrivalMain}>12:00 PM - 12:15 PM</AppText>
                <AppText style={styles.arrivalMin}> (15 mins)</AppText>
                <Info size={12} color={Colors.textTertiary} style={{ marginLeft: 4 }} />
              </View>
              <View style={styles.dateBadge}>
                <AppText style={styles.dateBadgeText}>Today, 17 Sep 2026</AppText>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.SCHEDULE_OPTION)}
              style={styles.editBtn}
            >
              <Edit3 size={12} color="#0284C7" />
              <AppText style={styles.editBtnText}>Edit</AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* SAFE & SECURE CARD */}
        <View style={styles.safeCard}>
          <ShieldCheck size={20} color="#0F172A" />
          <View style={styles.safeTextContainer}>
            <AppText style={styles.safeTitle}>Safe & Secure Booking</AppText>
            <AppText style={styles.safeDesc}>
              You can track your washerman in real-time after booking.
            </AppText>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* STICKY BOTTOM BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmBooking}
          disabled={isSubmitting}
          activeOpacity={0.8}
        >
          <AppText style={styles.confirmButtonText}>Confirm Booking</AppText>
          <ArrowRight size={18} color="#111827" style={{ marginLeft: Spacing.xs }} />
        </TouchableOpacity>

        <AppText style={styles.termsFooterText}>
          By confirming, you agree to our{' '}
          <AppText style={styles.termsLink}>Terms of Service</AppText> and{' '}
          <AppText style={styles.termsLink}>Privacy Policy</AppText>.
        </AppText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 2,
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
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 6,
  },
  logoText: {
    fontSize: 12,
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
  logoTextAccent: {
    color: '#D97706',
  },
  logoSubtext: {
    fontSize: 6,
    fontFamily: FontFamily.bold,
    color: '#6B7280',
    letterSpacing: 0.5,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: 130,
  },
  bannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  bannerTextContainer: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  bannerTitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: '#065F46',
  },
  bannerDesc: {
    fontSize: 11,
    fontFamily: FontFamily.regular,
    color: '#047857',
    marginTop: 2,
  },
  bookingIdCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  bookingIdLabel: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
  },
  bookingIdValue: {
    fontSize: Typography.fontSize.base,
    fontFamily: FontFamily.bold,
    color: '#059669',
    marginTop: 2,
  },
  bookingIdSub: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  pendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  pendingBadgeText: {
    fontSize: 10,
    fontFamily: FontFamily.medium,
    color: '#D97706',
  },
  cardsList: {
    gap: Spacing.sm,
  },
  detailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...Shadows.sm,
  },
  detailIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  detailContent: {
    flex: 1,
    marginRight: Spacing.xs,
  },
  detailLabel: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
  },
  detailMainTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
    marginTop: 1,
  },
  detailSub: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  detailThumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    marginRight: Spacing.xs,
  },
  avatarThumb: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: Spacing.xs,
  },
  mapThumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginRight: Spacing.xs,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.md,
    gap: 3,
  },
  editBtnText: {
    fontSize: 10,
    fontFamily: FontFamily.medium,
    color: '#0284C7',
  },
  inlineRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingSubText: {
    fontSize: 10,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
  },
  miniAvailBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    marginLeft: 6,
    gap: 3,
  },
  miniGreenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  miniAvailText: {
    fontSize: 8,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  priceAmount: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  priceSubText: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
  },
  viewBreakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 3,
    gap: 2,
  },
  viewBreakdownText: {
    fontSize: 9,
    fontFamily: FontFamily.medium,
    color: '#059669',
  },
  arrivalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  arrivalMain: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  arrivalMin: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
  },
  dateBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 3,
  },
  dateBadgeText: {
    fontSize: 9,
    fontFamily: FontFamily.medium,
    color: '#059669',
  },
  safeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  safeTextContainer: {
    flex: 1,
  },
  safeTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#0F172A',
  },
  safeDesc: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    ...Shadows.md,
  },
  confirmButton: {
    backgroundColor: '#FFB800',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: BorderRadius.full,
    ...Shadows.sm,
  },
  confirmButtonText: {
    fontSize: Typography.fontSize.base,
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
  termsFooterText: {
    fontSize: 9,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginTop: 8,
  },
  termsLink: {
    fontFamily: FontFamily.medium,
    color: '#0284C7',
    textDecorationLine: 'underline',
  },
});
