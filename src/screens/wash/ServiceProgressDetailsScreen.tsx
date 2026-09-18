import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Wind,
  Sparkles,
  Leaf,
  Star,
  Check,
  Package,
  FileText,
  Phone,
  MessageSquare,
  AlertTriangle,
  Disc,
  Layers,
  Sparkle,
  Settings,
  Car,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type ServiceProgressDetailsNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.SERVICE_PROGRESS_DETAILS
>;

type ServiceProgressDetailsRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.SERVICE_PROGRESS_DETAILS
>;

export const ServiceProgressDetailsScreen: React.FC = () => {
  const navigation = useNavigation<ServiceProgressDetailsNavProp>();
  const route = useRoute<ServiceProgressDetailsRouteProp>();
  const { draft, activeBooking } = useBookingStore();

  const bookingId = route.params?.bookingId || activeBooking?.id || 'bk_demo_001';
  const washerman = draft.washerman || {
    id: 'wsh_001',
    name: 'Rakesh Kumar',
    rating: 4.8,
    totalReviews: 320,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
  };

  const handleCall = () => {
    Linking.openURL('tel:+919876543210');
  };

  const handleChat = () => {
    navigation.navigate(Routes.SUPPORT_CHAT);
  };

  const handleReportIssue = () => {
    navigation.navigate(Routes.REPORT_ISSUE, { bookingId });
  };

  const handleNextScreen = () => {
    navigation.navigate(Routes.AFTER_WASH_PHOTOS, { bookingId });
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
          <AppText style={styles.headerTitle}>Service Progress Details</AppText>
          <AppText style={styles.headerSubtitle}>
            Real-time updates from your washerman
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
        {/* VEHICLE TOP BAR */}
        <View style={styles.vehicleBar}>
          <Image
            source={{ uri: draft.vehicle?.photoUrl || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=120&q=80' }}
            style={styles.vehicleThumb}
          />
          <View style={styles.vehicleTextCol}>
            <AppText style={styles.vehicleTitle}>
              {draft.vehicle ? `${draft.vehicle.brand} ${draft.vehicle.model}` : 'Toyota Fortuner'}
            </AppText>
            <AppText style={styles.vehicleSub}>
              {draft.vehicle ? `${draft.vehicle.registrationNumber} • ${draft.vehicle.color} • ${draft.vehicle.type.toUpperCase()}` : 'MP 09 AB 1234 • White • SUV'}
            </AppText>
          </View>

          <View style={styles.bookingStatusCol}>
            <View style={styles.inProgressBadge}>
              <View style={styles.greenPulse} />
              <AppText style={styles.inProgressBadgeText}>In Progress</AppText>
            </View>
            <AppText style={styles.startedAtText}>Started at 10:15 AM</AppText>
          </View>
        </View>

        {/* SERVICE STEPS VERTICAL TIMELINE */}
        <View style={styles.sectionCard}>
          <View style={styles.timelineHeader}>
            <AppText style={styles.timelineTitle}>Service Steps</AppText>
            <View style={styles.progressCounterWrap}>
              <AppText style={styles.progressCounterText}>3/5 Completed</AppText>
              <View style={styles.progressBarBg}>
                <View style={styles.progressBarFill} />
              </View>
              <AppText style={styles.progressPctText}>60%</AppText>
            </View>
          </View>

          <View style={styles.timelineList}>
            {/* Step 1: Pre-rinse */}
            <View style={styles.timelineRow}>
              <View style={styles.timelineIconCol}>
                <View style={[styles.timelineNode, styles.timelineNodeDone]}>
                  <Check size={12} color="#FFFFFF" />
                </View>
                <View style={[styles.timelineLine, styles.timelineLineDone]} />
              </View>

              <View style={styles.timelineContentCard}>
                <View style={styles.timelineContentText}>
                  <AppText style={styles.stepName}>1. Pre-rinse</AppText>
                  <AppText style={styles.stepTime}>10:15 AM - 10:25 AM</AppText>
                  <AppText style={styles.stepDesc}>Loosen dirt and remove surface dust.</AppText>
                </View>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=120&q=80' }}
                  style={styles.stepThumb}
                />
                <View style={styles.stepDoneBadge}>
                  <CheckCircle2 size={10} color="#059669" />
                  <AppText style={styles.stepDoneBadgeText}>Completed</AppText>
                </View>
              </View>
            </View>

            {/* Step 2: Foam Wash */}
            <View style={styles.timelineRow}>
              <View style={styles.timelineIconCol}>
                <View style={[styles.timelineNode, styles.timelineNodeDone]}>
                  <Check size={12} color="#FFFFFF" />
                </View>
                <View style={[styles.timelineLine, styles.timelineLineDone]} />
              </View>

              <View style={styles.timelineContentCard}>
                <View style={styles.timelineContentText}>
                  <AppText style={styles.stepName}>2. Foam Wash</AppText>
                  <AppText style={styles.stepTime}>10:25 AM - 10:40 AM</AppText>
                  <AppText style={styles.stepDesc}>Apply premium foam for deep cleaning.</AppText>
                </View>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=120&q=80' }}
                  style={styles.stepThumb}
                />
                <View style={styles.stepDoneBadge}>
                  <CheckCircle2 size={10} color="#059669" />
                  <AppText style={styles.stepDoneBadgeText}>Completed</AppText>
                </View>
              </View>
            </View>

            {/* Step 3: Scrubbing (Active) */}
            <View style={styles.timelineRow}>
              <View style={styles.timelineIconCol}>
                <View style={[styles.timelineNode, styles.timelineNodeActive]}>
                  <Check size={12} color="#FFFFFF" />
                </View>
                <View style={styles.timelineLine} />
              </View>

              <View style={[styles.timelineContentCard, styles.timelineContentCardActive]}>
                <View style={styles.timelineContentText}>
                  <AppText style={[styles.stepName, { color: '#059669' }]}>3. Scrubbing</AppText>
                  <AppText style={styles.stepTime}>10:40 AM - 11:05 AM</AppText>
                  <AppText style={styles.stepDesc}>Careful hand scrubbing with soft microfiber.</AppText>
                </View>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=120&q=80' }}
                  style={styles.stepThumb}
                />
                <View style={styles.stepActiveBadge}>
                  <View style={styles.activeDot} />
                  <AppText style={styles.stepActiveBadgeText}>In Progress</AppText>
                </View>
              </View>
            </View>

            {/* Step 4: Drying */}
            <View style={styles.timelineRow}>
              <View style={styles.timelineIconCol}>
                <View style={styles.timelineNode}>
                  <AppText style={styles.timelineNodeNum}>4</AppText>
                </View>
                <View style={styles.timelineLine} />
              </View>

              <View style={styles.timelineContentCard}>
                <View style={styles.timelineContentText}>
                  <AppText style={styles.stepName}>4. Drying</AppText>
                  <AppText style={styles.stepTime}>Est. 11:05 AM - 11:15 AM</AppText>
                  <AppText style={styles.stepDesc}>Use microfiber towels and air blower.</AppText>
                </View>
                <View style={styles.stepIconBox}>
                  <Wind size={18} color="#9CA3AF" />
                </View>
                <View style={styles.stepPendingBadge}>
                  <Clock size={10} color="#9CA3AF" />
                  <AppText style={styles.stepPendingBadgeText}>Pending</AppText>
                </View>
              </View>
            </View>

            {/* Step 5: Polishing */}
            <View style={[styles.timelineRow, { marginBottom: 0 }]}>
              <View style={styles.timelineIconCol}>
                <View style={styles.timelineNode}>
                  <AppText style={styles.timelineNodeNum}>5</AppText>
                </View>
              </View>

              <View style={styles.timelineContentCard}>
                <View style={styles.timelineContentText}>
                  <AppText style={styles.stepName}>5. Polishing</AppText>
                  <AppText style={styles.stepTime}>Est. 11:15 AM - 11:25 AM</AppText>
                  <AppText style={styles.stepDesc}>Final polish for a showroom shine.</AppText>
                </View>
                <View style={styles.stepIconBox}>
                  <Sparkles size={18} color="#9CA3AF" />
                </View>
                <View style={styles.stepPendingBadge}>
                  <Clock size={10} color="#9CA3AF" />
                  <AppText style={styles.stepPendingBadgeText}>Pending</AppText>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* 3 MINI STATS CARDS */}
        <View style={styles.threeStatsRow}>
          {/* 1. Estimated Completion */}
          <View style={styles.miniStatCard}>
            <Clock size={16} color="#059669" />
            <AppText style={styles.miniStatLabel}>Estimated Completion</AppText>
            <AppText style={styles.miniStatVal}>25 minutes</AppText>
            <AppText style={styles.miniStatSub}>Around 11:25 AM</AppText>
          </View>

          {/* 2. Washerman on Site */}
          <View style={styles.miniStatCard}>
            <View style={styles.onSiteHeader}>
              <View style={styles.greenDotSmall} />
              <AppText style={styles.miniStatLabel}>Washerman on Site</AppText>
            </View>
            <View style={styles.washerMiniRow}>
              <Image
                source={{ uri: washerman.avatarUrl }}
                style={styles.washerMiniAvatar}
              />
              <View>
                <AppText style={styles.washerMiniName}>{washerman.name}</AppText>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Star size={9} color="#F59E0B" fill="#F59E0B" />
                  <AppText style={styles.washerMiniRating}> 4.8</AppText>
                </View>
              </View>
            </View>
          </View>

          {/* 3. Eco Friendly */}
          <View style={[styles.miniStatCard, { backgroundColor: '#F0FDF4' }]}>
            <Leaf size={16} color="#059669" />
            <AppText style={styles.ecoMiniQuote}>
              “Your vehicle is looking great!”
            </AppText>
            <AppText style={styles.ecoMiniTag}>Eco-friendly Wash</AppText>
          </View>
        </View>

        {/* ADD-ON SERVICES STATUS */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Package size={16} color="#059669" />
              <AppText style={styles.cardHeaderTitle}>Add-on Services Status</AppText>
            </View>
            <TouchableOpacity style={styles.manageAddonsBtn}>
              <AppText style={styles.manageAddonsBtnText}>Manage Add-ons</AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.addonsGrid}>
            {/* Addon 1 */}
            <View style={styles.addonItem}>
              <Disc size={14} color="#059669" />
              <AppText style={styles.addonTitle}>Tire Cleaning</AppText>
              <View style={styles.addonDonePill}>
                <Check size={8} color="#059669" />
                <AppText style={styles.addonDoneText}>Completed</AppText>
              </View>
            </View>

            {/* Addon 2 */}
            <View style={styles.addonItem}>
              <Layers size={14} color="#D97706" />
              <AppText style={styles.addonTitle}>Interior Vacuum</AppText>
              <View style={styles.addonPendingPill}>
                <Clock size={8} color="#D97706" />
                <AppText style={styles.addonPendingText}>Pending</AppText>
              </View>
            </View>

            {/* Addon 3 */}
            <View style={styles.addonItem}>
              <Sparkle size={14} color="#D97706" />
              <AppText style={styles.addonTitle}>Dashboard Polish</AppText>
              <View style={styles.addonPendingPill}>
                <Clock size={8} color="#D97706" />
                <AppText style={styles.addonPendingText}>Pending</AppText>
              </View>
            </View>

            {/* Addon 4 */}
            <View style={styles.addonItem}>
              <Settings size={14} color="#9CA3AF" />
              <AppText style={styles.addonTitle}>Engine Bay Cleaning</AppText>
              <View style={styles.addonNonePill}>
                <AppText style={styles.addonNoneText}>✕ Not Selected</AppText>
              </View>
            </View>
          </View>
        </View>

        {/* CUSTOMER INSTRUCTIONS CARD */}
        <View style={styles.sectionCard}>
          <View style={styles.instructionsHeaderRow}>
            <View style={styles.instructionsLeft}>
              <FileText size={16} color="#059669" />
              <AppText style={styles.cardHeaderTitle}>Customer Instructions</AppText>
            </View>
            <View style={styles.notedBadge}>
              <CheckCircle2 size={12} color="#059669" />
              <View>
                <AppText style={styles.notedBadgeTitle}>Instructions Noted</AppText>
                <AppText style={styles.notedBadgeSub}>By Rakesh</AppText>
              </View>
            </View>
          </View>

          <View style={styles.instructionPoints}>
            <AppText style={styles.instructionItem}>•  Please pay extra attention to alloy wheels.</AppText>
            <AppText style={styles.instructionItem}>•  Use only scratch-free microfiber cloth.</AppText>
            <AppText style={styles.instructionItem}>•  Do not use harsh chemicals.</AppText>
          </View>
        </View>

        {/* 3 ACTION BUTTONS */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity
            style={styles.callBtn}
            onPress={handleCall}
            activeOpacity={0.8}
          >
            <Phone size={16} color="#059669" style={{ marginRight: 4 }} />
            <View>
              <AppText style={styles.callBtnText}>Call</AppText>
              <AppText style={styles.callSubText}>Rakesh</AppText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.chatBtn}
            onPress={handleChat}
            activeOpacity={0.8}
          >
            <MessageSquare size={16} color="#2563EB" style={{ marginRight: 4 }} />
            <View>
              <AppText style={styles.chatBtnText}>Chat</AppText>
              <AppText style={styles.chatSubText}>Rakesh</AppText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.reportBtn}
            onPress={handleReportIssue}
            activeOpacity={0.8}
          >
            <AlertTriangle size={16} color="#DC2626" style={{ marginRight: 4 }} />
            <View>
              <AppText style={styles.reportBtnText}>Report Issue</AppText>
              <AppText style={styles.reportSubText}>Need Help?</AppText>
            </View>
          </TouchableOpacity>
        </View>

        {/* VIEW AFTER WASH PHOTOS (TRIGGER BUTTON) */}
        <TouchableOpacity
          style={styles.nextPhotosBtn}
          onPress={handleNextScreen}
          activeOpacity={0.88}
        >
          <AppText style={styles.nextPhotosBtnText}>View After Wash Photos →</AppText>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
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
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 10,
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
  },
  vehicleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  vehicleThumb: {
    width: 48,
    height: 36,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    marginRight: Spacing.sm,
  },
  vehicleTextCol: {
    flex: 1,
  },
  vehicleTitle: {
    fontSize: 10,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  vehicleSub: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  bookingStatusCol: {
    alignItems: 'flex-end',
  },
  inProgressBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  greenPulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  inProgressBadgeText: {
    fontSize: 8,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  startedAtText: {
    fontSize: 7,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  timelineTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  progressCounterWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  progressCounterText: {
    fontSize: 9,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
  },
  progressBarBg: {
    width: 50,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '60%',
    height: '100%',
    backgroundColor: '#059669',
  },
  progressPctText: {
    fontSize: 9,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  timelineList: {
    gap: 0,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },
  timelineIconCol: {
    alignItems: 'center',
    width: 24,
    marginRight: Spacing.xs,
  },
  timelineNode: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineNodeDone: {
    backgroundColor: '#059669',
  },
  timelineNodeActive: {
    backgroundColor: '#059669',
    borderWidth: 2,
    borderColor: '#A7F3D0',
  },
  timelineNodeNum: {
    fontSize: 9,
    fontFamily: FontFamily.bold,
    color: Colors.textTertiary,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 2,
  },
  timelineLineDone: {
    backgroundColor: '#059669',
  },
  timelineContentCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  timelineContentCardActive: {
    backgroundColor: '#F0FDF4',
    borderColor: '#A7F3D0',
  },
  timelineContentText: {
    flex: 1,
  },
  stepName: {
    fontSize: 10,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  stepTime: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
    marginTop: 1,
  },
  stepDesc: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  stepThumb: {
    width: 42,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
    marginLeft: 6,
  },
  stepIconBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  stepDoneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    marginLeft: 6,
    gap: 2,
  },
  stepDoneBadgeText: {
    fontSize: 7,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  stepActiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    marginLeft: 6,
    gap: 3,
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#10B981',
  },
  stepActiveBadgeText: {
    fontSize: 7,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  stepPendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    marginLeft: 6,
    gap: 2,
  },
  stepPendingBadgeText: {
    fontSize: 7,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
  },
  threeStatsRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  miniStatCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...Shadows.sm,
  },
  miniStatLabel: {
    fontSize: 7,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  miniStatVal: {
    fontSize: 10,
    fontFamily: FontFamily.bold,
    color: '#059669',
    marginTop: 1,
  },
  miniStatSub: {
    fontSize: 7,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
  },
  onSiteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  greenDotSmall: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#10B981',
  },
  washerMiniRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  washerMiniAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  washerMiniName: {
    fontSize: 8,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  washerMiniRating: {
    fontSize: 7,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
  },
  ecoMiniQuote: {
    fontSize: 8,
    fontFamily: FontFamily.medium,
    color: '#065F46',
    fontStyle: 'italic',
    marginTop: 1,
    lineHeight: 11,
  },
  ecoMiniTag: {
    fontSize: 7,
    fontFamily: FontFamily.bold,
    color: '#059669',
    marginTop: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardHeaderTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  manageAddonsBtn: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  manageAddonsBtnText: {
    fontSize: 8,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  addonsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addonItem: {
    width: (width - Spacing.lg * 2 - Spacing.md * 2 - 18) / 4,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: BorderRadius.md,
    padding: 6,
  },
  addonTitle: {
    fontSize: 7,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginVertical: 3,
  },
  addonDonePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    gap: 2,
  },
  addonDoneText: {
    fontSize: 6,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  addonPendingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    gap: 2,
  },
  addonPendingText: {
    fontSize: 6,
    fontFamily: FontFamily.medium,
    color: '#D97706',
  },
  addonNonePill: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  addonNoneText: {
    fontSize: 6,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
  },
  instructionsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  instructionsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  notedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.md,
    gap: 4,
  },
  notedBadgeTitle: {
    fontSize: 7,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  notedBadgeSub: {
    fontSize: 6,
    fontFamily: FontFamily.regular,
    color: '#047857',
  },
  instructionPoints: {
    gap: 2,
  },
  instructionItem: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    lineHeight: 12,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  callBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
    paddingVertical: 10,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  callBtnText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  callSubText: {
    fontSize: 7,
    fontFamily: FontFamily.regular,
    color: '#047857',
  },
  chatBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 10,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  chatBtnText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#2563EB',
  },
  chatSubText: {
    fontSize: 7,
    fontFamily: FontFamily.regular,
    color: '#1D4ED8',
  },
  reportBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    paddingVertical: 10,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  reportBtnText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#DC2626',
  },
  reportSubText: {
    fontSize: 7,
    fontFamily: FontFamily.regular,
    color: '#B91C1C',
  },
  nextPhotosBtn: {
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  nextPhotosBtnText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#FFFFFF',
  },
});
