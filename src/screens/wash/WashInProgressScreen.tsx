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
  Car,
  ClipboardList,
  CheckCircle2,
  Sparkles,
  Wind,
  Clock,
  Leaf,
  Star,
  Phone,
  MessageSquare,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  ChevronRight,
  Droplet,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type WashInProgressNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.WASH_IN_PROGRESS
>;

type WashInProgressRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.WASH_IN_PROGRESS
>;

export const WashInProgressScreen: React.FC = () => {
  const navigation = useNavigation<WashInProgressNavProp>();
  const route = useRoute<WashInProgressRouteProp>();
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

  const handleViewDetails = () => {
    navigation.navigate(Routes.SERVICE_PROGRESS_DETAILS, { bookingId });
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

        <View style={styles.headerTitleContainer}>
          <AppText style={styles.headerTitle}>Wash in Progress</AppText>
          <AppText style={styles.headerSubtitle}>
            Your vehicle is in good hands!
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
        {/* VEHICLE & BOOKING ID BAR */}
        <View style={styles.topInfoBar}>
          <View style={styles.vehicleInfoLeft}>
            <View style={styles.carIconBox}>
              <Car size={18} color="#059669" />
            </View>
            <View>
              <AppText style={styles.vehicleTitle}>
                {draft.vehicle ? `${draft.vehicle.brand} ${draft.vehicle.model}` : 'Toyota Fortuner'}
              </AppText>
              <AppText style={styles.vehicleSub}>
                {draft.vehicle ? `${draft.vehicle.registrationNumber} • ${draft.vehicle.color} • ${draft.vehicle.type.toUpperCase()}` : 'MP 09 AB 1234 • White • SUV'}
              </AppText>
            </View>
          </View>

          <View style={styles.bookingIdRight}>
            <AppText style={styles.bookingIdLabel}>Booking ID</AppText>
            <AppText style={styles.bookingIdVal}>#WO256839</AppText>
            <AppText style={styles.startedAtText}>Started at 10:15 AM</AppText>
          </View>
        </View>

        {/* SERVICE PROGRESS STEPPER CARD */}
        <TouchableOpacity
          style={styles.progressCard}
          onPress={handleViewDetails}
          activeOpacity={0.88}
        >
          <View style={styles.progressHeader}>
            <View style={styles.progressHeaderLeft}>
              <ClipboardList size={18} color="#059669" />
              <AppText style={styles.progressTitle}>Service Progress</AppText>
            </View>
            <View style={styles.stepCountWrap}>
              <AppText style={styles.stepCountText}>Step 3 of 5</AppText>
              <View style={styles.pctBadge}>
                <AppText style={styles.pctBadgeText}>60%</AppText>
              </View>
            </View>
          </View>

          {/* 5-Step Horizontal Stepper */}
          <View style={styles.stepperContainer}>
            {/* Step 1: Pre-rinse */}
            <View style={styles.stepperItem}>
              <View style={[styles.stepCircle, styles.stepCircleDone]}>
                <CheckCircle2 size={16} color="#FFFFFF" />
              </View>
              <AppText style={styles.stepItemTitle}>Pre-rinse</AppText>
              <AppText style={styles.stepItemStatusDone}>Completed</AppText>
            </View>

            <View style={[styles.stepConnector, styles.stepConnectorDone]} />

            {/* Step 2: Foam wash */}
            <View style={styles.stepperItem}>
              <View style={[styles.stepCircle, styles.stepCircleDone]}>
                <CheckCircle2 size={16} color="#FFFFFF" />
              </View>
              <AppText style={styles.stepItemTitle}>Foam wash</AppText>
              <AppText style={styles.stepItemStatusDone}>Completed</AppText>
            </View>

            <View style={[styles.stepConnector, styles.stepConnectorDone]} />

            {/* Step 3: Scrubbing (Active) */}
            <View style={styles.stepperItem}>
              <View style={[styles.stepCircle, styles.stepCircleActive]}>
                <Droplet size={14} color="#FFFFFF" />
              </View>
              <AppText style={[styles.stepItemTitle, styles.stepItemTitleActive]}>Scrubbing</AppText>
              <AppText style={styles.stepItemStatusActive}>In Progress</AppText>
            </View>

            <View style={styles.stepConnector} />

            {/* Step 4: Drying */}
            <View style={styles.stepperItem}>
              <View style={styles.stepCircle}>
                <Wind size={14} color="#9CA3AF" />
              </View>
              <AppText style={styles.stepItemTitle}>Drying</AppText>
              <AppText style={styles.stepItemStatusPending}>Pending</AppText>
            </View>

            <View style={styles.stepConnector} />

            {/* Step 5: Polishing */}
            <View style={styles.stepperItem}>
              <View style={styles.stepCircle}>
                <Sparkles size={14} color="#9CA3AF" />
              </View>
              <AppText style={styles.stepItemTitle}>Polishing</AppText>
              <AppText style={styles.stepItemStatusPending}>Pending</AppText>
            </View>
          </View>
        </TouchableOpacity>

        {/* CURRENT ACTIVITY SPOTLIGHT CARD */}
        <TouchableOpacity
          style={styles.spotlightCard}
          onPress={handleViewDetails}
          activeOpacity={0.9}
        >
          <View style={styles.spotlightTextCol}>
            <View style={styles.activityHeaderRow}>
              <View style={styles.activityIconCircle}>
                <Sparkles size={16} color="#059669" />
              </View>
              <View>
                <AppText style={styles.activitySubtitle}>Current Activity</AppText>
                <AppText style={styles.activityTitle}>Scrubbing</AppText>
              </View>
            </View>

            <AppText style={styles.activityDesc}>
              Thoroughly cleaning your vehicle with eco-friendly products.
            </AppText>
          </View>

          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=300&q=80' }}
            style={styles.spotlightImg}
          />
        </TouchableOpacity>

        {/* TIME & ECO ROW (2-COLUMNS) */}
        <View style={styles.twoColRow}>
          {/* Left: Estimated Completion */}
          <View style={styles.timeCard}>
            <View style={styles.timeIconBox}>
              <Clock size={18} color="#059669" />
            </View>
            <AppText style={styles.timeCardLabel}>Estimated Completion Time</AppText>
            <AppText style={styles.timeCardVal}>25 minutes</AppText>
            <AppText style={styles.timeCardSub}>Around 11:15 AM</AppText>
          </View>

          {/* Right: Eco Quote Card */}
          <View style={styles.ecoCard}>
            <AppText style={styles.ecoQuote}>
              “We're giving your vehicle the care it deserves!”
            </AppText>
            <View style={styles.ecoBadgeRow}>
              <Leaf size={12} color="#059669" />
              <AppText style={styles.ecoBadgeText}>Eco-friendly Wash</AppText>
            </View>
          </View>
        </View>

        {/* WASHERMAN PROFILE & VEHICLE CARD */}
        <View style={styles.washermanCard}>
          <View style={styles.washermanLeft}>
            <View style={styles.avatarWrap}>
              <Image
                source={{ uri: washerman.avatarUrl }}
                style={styles.washermanAvatar}
              />
              <View style={styles.onlineDot} />
            </View>
            <View style={styles.washermanInfo}>
              <AppText style={styles.washermanName}>{washerman.name}</AppText>
              <View style={styles.ratingRow}>
                <Star size={11} color="#F59E0B" fill="#F59E0B" />
                <AppText style={styles.ratingText}> 4.8 (320 reviews)</AppText>
              </View>
              <View style={styles.verifiedBadge}>
                <CheckCircle2 size={10} color="#059669" />
                <AppText style={styles.verifiedBadgeText}>Verified Washerman</AppText>
              </View>
            </View>
          </View>

          <View style={styles.washermanRightMeta}>
            <AppText style={styles.washermanMetaItem}>📞 +91 98765 43210</AppText>
            <AppText style={styles.washermanMetaItem}>📍 Indore, MP</AppText>
            <AppText style={styles.washermanMetaItem}>🛵 Honda Activa</AppText>
            <AppText style={styles.scooterPlateText}>MP 09 AB 4321</AppText>
          </View>
        </View>

        {/* 3 QUICK ACTION BUTTONS */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.callBtn}
            onPress={handleCall}
            activeOpacity={0.8}
          >
            <Phone size={16} color="#059669" style={{ marginRight: 6 }} />
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
            <MessageSquare size={16} color="#2563EB" style={{ marginRight: 6 }} />
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

        {/* QUICK TIPS CARD */}
        <View style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <View style={styles.tipsIconBox}>
              <Lightbulb size={16} color="#059669" />
            </View>
            <AppText style={styles.tipsTitle}>Quick Tips</AppText>
          </View>

          <View style={styles.tipsList}>
            <AppText style={styles.tipPoint}>•  Our washerman will update the status in real-time.</AppText>
            <AppText style={styles.tipPoint}>•  You will be notified once the service is completed.</AppText>
            <AppText style={styles.tipPoint}>•  Feel free to contact the washerman for any special requests.</AppText>
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footerRow}>
          <View style={styles.footerItem}>
            <ShieldCheck size={12} color="#4B5563" style={{ marginRight: 4 }} />
            <AppText style={styles.footerText}>Your safety and satisfaction are our priority.</AppText>
          </View>
          <View style={styles.footerItem}>
            <Leaf size={12} color="#059669" style={{ marginRight: 4 }} />
            <AppText style={[styles.footerText, { color: '#059669', fontFamily: FontFamily.bold }]}>Clean Vehicles  Greener Tomorrow</AppText>
          </View>
        </View>

        <View style={{ height: 40 }} />
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
  topInfoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  vehicleInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  carIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  vehicleTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  vehicleSub: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  bookingIdRight: {
    alignItems: 'flex-end',
  },
  bookingIdLabel: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
  },
  bookingIdVal: {
    fontSize: 9,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
    marginTop: 1,
  },
  startedAtText: {
    fontSize: 8,
    fontFamily: FontFamily.medium,
    color: '#059669',
    marginTop: 1,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  progressHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  progressTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  stepCountWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stepCountText: {
    fontSize: 9,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
  },
  pctBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  pctBadgeText: {
    fontSize: 9,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepperItem: {
    alignItems: 'center',
    width: 52,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  stepCircleDone: {
    backgroundColor: '#059669',
  },
  stepCircleActive: {
    backgroundColor: '#059669',
    borderWidth: 2,
    borderColor: '#A7F3D0',
  },
  stepItemTitle: {
    fontSize: 8,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
  },
  stepItemTitleActive: {
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  stepItemStatusDone: {
    fontSize: 7,
    fontFamily: FontFamily.regular,
    color: '#059669',
  },
  stepItemStatusActive: {
    fontSize: 7,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  stepItemStatusPending: {
    fontSize: 7,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
  },
  stepConnector: {
    flex: 1,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginBottom: 20,
  },
  stepConnectorDone: {
    backgroundColor: '#059669',
  },
  spotlightCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  spotlightTextCol: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'center',
  },
  activityHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  activityIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activitySubtitle: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
  },
  activityTitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  activityDesc: {
    fontSize: 9,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    lineHeight: 13,
  },
  spotlightImg: {
    width: 130,
    height: 100,
    backgroundColor: '#F3F4F6',
  },
  twoColRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  timeCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...Shadows.sm,
  },
  timeIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  timeCardLabel: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
  },
  timeCardVal: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: '#059669',
    marginTop: 2,
  },
  timeCardSub: {
    fontSize: 8,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
  },
  ecoCard: {
    flex: 1,
    backgroundColor: '#F0FDF4',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    justifyContent: 'space-between',
  },
  ecoQuote: {
    fontSize: 9,
    fontFamily: FontFamily.medium,
    color: '#065F46',
    fontStyle: 'italic',
    lineHeight: 13,
  },
  ecoBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  ecoBadgeText: {
    fontSize: 8,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  washermanCard: {
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
  washermanLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarWrap: {
    position: 'relative',
    marginRight: Spacing.sm,
  },
  washermanAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#F3F4F6',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  washermanInfo: {
    flex: 1,
  },
  washermanName: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingText: {
    fontSize: 9,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
    marginTop: 3,
    gap: 2,
  },
  verifiedBadgeText: {
    fontSize: 8,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  washermanRightMeta: {
    borderLeftWidth: 1,
    borderLeftColor: '#F3F4F6',
    paddingLeft: Spacing.sm,
    gap: 2,
  },
  washermanMetaItem: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
  },
  scooterPlateText: {
    fontSize: 8,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
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
  tipsCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    marginBottom: Spacing.md,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  tipsIconBox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipsTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#065F46',
  },
  tipsList: {
    gap: 3,
  },
  tipPoint: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: '#047857',
    lineHeight: 12,
  },
  footerRow: {
    alignItems: 'center',
    gap: 2,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
  },
});
