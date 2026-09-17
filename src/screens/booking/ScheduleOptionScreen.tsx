import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Zap,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sun,
  SunMedium,
  Sunset,
  Moon,
  Clock,
  ChevronDown,
  CheckCircle2,
  Car,
  MapPin,
  Star,
  Info,
  ArrowRight,
  Sparkles,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type ScheduleOptionNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.SCHEDULE_OPTION
>;

interface DateOption {
  day: string;
  dateNum: number;
  label?: string;
  fullDate: string;
}

const DATES: DateOption[] = [
  { day: 'Tue', dateNum: 16, label: 'Today', fullDate: '2026-09-16' },
  { day: 'Wed', dateNum: 17, label: 'Tomorrow', fullDate: '2026-09-17' },
  { day: 'Thu', dateNum: 18, fullDate: '2026-09-18' },
  { day: 'Fri', dateNum: 19, fullDate: '2026-09-19' },
  { day: 'Sat', dateNum: 20, fullDate: '2026-09-20' },
  { day: 'Sun', dateNum: 21, fullDate: '2026-09-21' },
  { day: 'Mon', dateNum: 22, fullDate: '2026-09-22' },
];

interface TimeSlotOption {
  id: string;
  title: string;
  timeRange: string;
  icon: any;
}

const TIME_SLOTS: TimeSlotOption[] = [
  { id: 'morning', title: 'Morning', timeRange: '8:00 AM - 11:00 AM', icon: Sun },
  { id: 'afternoon', title: 'Afternoon', timeRange: '11:00 AM - 3:00 PM', icon: SunMedium },
  { id: 'evening', title: 'Evening', timeRange: '3:00 PM - 7:00 PM', icon: Sunset },
  { id: 'night', title: 'Night', timeRange: '7:00 PM - 10:00 PM', icon: Moon },
];

export const ScheduleOptionScreen: React.FC = () => {
  const navigation = useNavigation<ScheduleOptionNavProp>();
  const { draft, setDraftSchedule } = useBookingStore();

  const [scheduleType, setScheduleType] = useState<'now' | 'scheduled'>('scheduled');
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-17');
  const [selectedSlot, setSelectedSlot] = useState<string>('afternoon');
  const [preferredTime, setPreferredTime] = useState<string>('12:00 PM - 1:00 PM');

  const handleConfirm = () => {
    const slotObj = TIME_SLOTS.find((s) => s.id === selectedSlot);
    const slotString = scheduleType === 'now' ? 'Immediately (Within 15-20 mins)' : `${slotObj?.timeRange || '11:00 AM - 3:00 PM'} (${preferredTime})`;
    setDraftSchedule(scheduleType, selectedDate, slotString);
    navigation.navigate(Routes.CUSTOMER_INSTRUCTIONS);
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
          <AppText style={styles.headerTitle}>Schedule Your Booking</AppText>
          <AppText style={styles.headerSubtitle}>
            Choose when you want the service
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
        {/* OPTION SELECTION PILLS */}
        <View style={styles.optionRow}>
          {/* Book Now */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              scheduleType === 'now' && styles.optionCardActive,
            ]}
            onPress={() => setScheduleType('now')}
            activeOpacity={0.8}
          >
            <View style={styles.optionCardLeft}>
              <View style={[styles.optionIconCircle, { backgroundColor: '#E8F5E9' }]}>
                <Zap size={20} color="#2E7D32" />
              </View>
              <View style={styles.optionTextContainer}>
                <AppText style={styles.optionTitle}>Book Now</AppText>
                <AppText style={styles.optionDesc}>
                  Get service as soon as possible
                </AppText>
              </View>
            </View>
            <View style={[styles.radioOuter, scheduleType === 'now' && styles.radioOuterActive]}>
              {scheduleType === 'now' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          {/* Schedule for Later */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              scheduleType === 'scheduled' && styles.optionCardActive,
            ]}
            onPress={() => setScheduleType('scheduled')}
            activeOpacity={0.8}
          >
            <View style={styles.optionCardLeft}>
              <View style={[styles.optionIconCircle, { backgroundColor: '#E8F5E9' }]}>
                <CalendarIcon size={20} color="#2E7D32" />
              </View>
              <View style={styles.optionTextContainer}>
                <AppText style={styles.optionTitle}>Schedule for Later</AppText>
                <AppText style={styles.optionDesc}>
                  Choose your preferred date and time
                </AppText>
              </View>
            </View>
            <View style={[styles.radioOuter, scheduleType === 'scheduled' && styles.radioOuterActive]}>
              {scheduleType === 'scheduled' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </View>

        {scheduleType === 'scheduled' && (
          <>
            {/* SELECT DATE SECTION */}
            <View style={styles.sectionHeader}>
              <AppText style={styles.sectionTitle}>Select Date</AppText>
              <View style={styles.monthSelector}>
                <AppText style={styles.monthText}>September 2026</AppText>
                <TouchableOpacity style={styles.monthArrow}>
                  <ChevronLeft size={16} color={Colors.textSecondary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.monthArrow}>
                  <ChevronRight size={16} color={Colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.dateListContainer}
            >
              {DATES.map((item) => {
                const isSelected = selectedDate === item.fullDate;
                return (
                  <TouchableOpacity
                    key={item.fullDate}
                    style={[
                      styles.dateCard,
                      isSelected && styles.dateCardActive,
                    ]}
                    onPress={() => setSelectedDate(item.fullDate)}
                    activeOpacity={0.7}
                  >
                    <AppText style={[styles.dateDayText, isSelected && styles.dateTextActive]}>
                      {item.day}
                    </AppText>
                    <AppText style={[styles.dateNumText, isSelected && styles.dateTextActive]}>
                      {item.dateNum}
                    </AppText>
                    {item.label && (
                      <AppText style={[styles.dateLabelText, isSelected && styles.dateTextActive]}>
                        {item.label}
                      </AppText>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* SELECT TIME SLOT */}
            <View style={styles.sectionHeader}>
              <AppText style={styles.sectionTitle}>Select Time Slot</AppText>
            </View>

            <View style={styles.slotsGrid}>
              {TIME_SLOTS.map((slot) => {
                const isSelected = selectedSlot === slot.id;
                const IconComponent = slot.icon;
                return (
                  <TouchableOpacity
                    key={slot.id}
                    style={[
                      styles.slotCard,
                      isSelected && styles.slotCardActive,
                    ]}
                    onPress={() => setSelectedSlot(slot.id)}
                    activeOpacity={0.7}
                  >
                    <IconComponent
                      size={20}
                      color={isSelected ? '#059669' : '#F59E0B'}
                    />
                    <AppText style={[styles.slotTitle, isSelected && styles.slotTitleActive]}>
                      {slot.title}
                    </AppText>
                    <AppText style={styles.slotTime}>{slot.timeRange}</AppText>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* PREFERRED ARRIVAL TIME */}
            <View style={styles.sectionHeader}>
              <AppText style={styles.sectionTitle}>Preferred Arrival Time</AppText>
            </View>
            <AppText style={styles.preferredSubtitle}>
              Let us know your preferred time and we'll try our best to assign a washerman.
            </AppText>

            <TouchableOpacity style={styles.timeDropdown} activeOpacity={0.8}>
              <Clock size={18} color={Colors.textSecondary} />
              <View style={styles.timeDropdownTextContainer}>
                <AppText style={styles.timeDropdownLabel}>Select Preferred Time</AppText>
                <AppText style={styles.timeDropdownValue}>{preferredTime}</AppText>
              </View>
              <ChevronDown size={18} color={Colors.textSecondary} />
            </TouchableOpacity>

            {/* ESTIMATED ARRIVAL HIGHLIGHT BANNER */}
            <View style={styles.estimateBanner}>
              <CheckCircle2 size={20} color="#059669" style={{ marginTop: 2 }} />
              <View style={styles.estimateBannerTextContainer}>
                <AppText style={styles.estimateBannerTitle}>Estimated Arrival</AppText>
                <AppText style={styles.estimateBannerDesc}>
                  Washerman will arrive between <AppText style={styles.boldGreen}>{preferredTime}</AppText>
                </AppText>
                <AppText style={styles.estimateBannerSub}>
                  You'll get a confirmation once the booking is assigned.
                </AppText>
              </View>
            </View>
          </>
        )}

        {/* BOOKING SUMMARY CARD */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <AppText style={styles.summaryTitle}>Booking Summary</AppText>
            <TouchableOpacity onPress={() => navigation.navigate(Routes.BOOKING_DETAILS)}>
              <AppText style={styles.editLink}>Edit</AppText>
            </TouchableOpacity>
          </View>

          {/* Row 1: Vehicle & Service */}
          <View style={styles.summaryRow}>
            {/* Vehicle */}
            <View style={styles.summaryItem}>
              <Image
                source={{ uri: draft.vehicle?.photoUrl || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=120&q=80' }}
                style={styles.summaryItemThumb}
              />
              <View style={styles.summaryItemDetails}>
                <AppText style={styles.summaryItemName} numberOfLines={1}>
                  {draft.vehicle ? `${draft.vehicle.brand} ${draft.vehicle.model}` : 'Toyota Fortuner'}
                </AppText>
                <AppText style={styles.summaryItemSub}>
                  {draft.vehicle ? `${draft.vehicle.type.toUpperCase()} • ${draft.vehicle.color} • ${draft.vehicle.registrationNumber}` : 'SUV • White • MP 09 AB 1234'}
                </AppText>
              </View>
            </View>

            {/* Service */}
            <View style={styles.summaryItem}>
              <View style={styles.summaryItemDetails}>
                <AppText style={styles.summaryItemName} numberOfLines={1}>
                  {draft.service ? draft.service.name : 'Premium Car Wash'}
                </AppText>
                <AppText style={styles.summaryItemSub}>
                  Exterior + Interior + Premium Finish
                </AppText>
              </View>
            </View>
          </View>

          {/* Row 2: Washerman & Location */}
          <View style={[styles.summaryRow, { marginTop: Spacing.sm }]}>
            {/* Washerman */}
            <View style={styles.summaryItem}>
              <Image
                source={{ uri: draft.washerman?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80' }}
                style={styles.summaryAvatar}
              />
              <View style={styles.summaryItemDetails}>
                <AppText style={styles.summaryItemName}>
                  {draft.washerman ? draft.washerman.name : 'Rakesh Kumar'}
                </AppText>
                <View style={styles.ratingRow}>
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <AppText style={styles.ratingText}> 4.8 (320 reviews)</AppText>
                </View>
              </View>
            </View>

            {/* Location */}
            <View style={styles.summaryItem}>
              <MapPin size={16} color="#059669" style={{ marginTop: 2 }} />
              <View style={styles.summaryItemDetails}>
                <AppText style={styles.summaryItemName}>Vijay Nagar, Indore</AppText>
                <AppText style={styles.summaryItemSub} numberOfLines={2}>
                  123, Vijay Nagar, Indore, Madhya Pradesh - 452010
                </AppText>
              </View>
            </View>
          </View>

          {/* Row 3: Estimated Price & Duration */}
          <View style={styles.summaryPriceRow}>
            <View style={styles.priceCol}>
              <AppText style={styles.priceColLabel}>Estimated Price</AppText>
              <View style={styles.priceValRow}>
                <AppText style={styles.priceVal}>₹499</AppText>
                <Info size={14} color={Colors.textTertiary} style={{ marginLeft: 4 }} />
              </View>
            </View>

            <View style={styles.durationCol}>
              <Clock size={16} color={Colors.textSecondary} />
              <View style={{ marginLeft: Spacing.xs }}>
                <AppText style={styles.priceColLabel}>Estimated Duration</AppText>
                <AppText style={styles.durationVal}>45 - 60 mins</AppText>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* STICKY BOTTOM BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirm}
          activeOpacity={0.8}
        >
          <AppText style={styles.confirmButtonText}>Confirm Slot</AppText>
          <ArrowRight size={18} color="#111827" style={{ marginLeft: Spacing.xs }} />
        </TouchableOpacity>
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
    paddingBottom: 100,
  },
  optionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  optionCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    ...Shadows.sm,
  },
  optionCardActive: {
    borderColor: '#059669',
    backgroundColor: '#F0FDF4',
  },
  optionCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.xs,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  optionDesc: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  radioOuterActive: {
    borderColor: '#059669',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#059669',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  monthText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
  },
  monthArrow: {
    padding: 2,
  },
  dateListContainer: {
    flexDirection: 'row',
    gap: Spacing.xs,
    paddingVertical: 4,
  },
  dateCard: {
    width: 54,
    height: 72,
    borderRadius: BorderRadius.lg,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  dateCardActive: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  dateDayText: {
    fontSize: 11,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
  },
  dateNumText: {
    fontSize: 16,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
    marginVertical: 2,
  },
  dateLabelText: {
    fontSize: 9,
    fontFamily: FontFamily.medium,
    color: '#059669',
  },
  dateTextActive: {
    color: '#FFFFFF',
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  slotCard: {
    width: (width - Spacing.lg * 2 - Spacing.sm) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  slotCardActive: {
    borderColor: '#059669',
    backgroundColor: '#F0FDF4',
  },
  slotTitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
    marginTop: 6,
  },
  slotTitleActive: {
    color: '#059669',
  },
  slotTime: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  preferredSubtitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  timeDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: Spacing.md,
  },
  timeDropdownTextContainer: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  timeDropdownLabel: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
  },
  timeDropdownValue: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
    marginTop: 2,
  },
  estimateBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ECFDF5',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: Spacing.lg,
  },
  estimateBannerTextContainer: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  estimateBannerTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#065F46',
  },
  estimateBannerDesc: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.medium,
    color: '#047857',
    marginTop: 2,
  },
  boldGreen: {
    fontFamily: FontFamily.bold,
    color: '#047857',
  },
  estimateBannerSub: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: '#059669',
    marginTop: 2,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: Spacing.sm,
    ...Shadows.sm,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  summaryTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  editLink: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#0284C7',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  summaryItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  summaryItemThumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  summaryAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
  },
  summaryItemDetails: {
    flex: 1,
    marginLeft: Spacing.xs,
  },
  summaryItemName: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  summaryItemSub: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingText: {
    fontSize: 10,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
  },
  summaryPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  priceCol: {
    flex: 1,
  },
  priceColLabel: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
  },
  priceValRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  priceVal: {
    fontSize: Typography.fontSize.base,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  durationCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationVal: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
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
});
