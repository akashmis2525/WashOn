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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  AlertTriangle,
  ClipboardList,
  Car,
  Droplet,
  ParkingCircle,
  Camera,
  Info,
  ShieldCheck,
  Check,
  Star,
  Edit2,
  Lock,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type ServiceStartVerificationNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.SERVICE_START_VERIFICATION
>;

type ServiceStartVerificationRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.SERVICE_START_VERIFICATION
>;

export const ServiceStartVerificationScreen: React.FC = () => {
  const navigation = useNavigation<ServiceStartVerificationNavProp>();
  const route = useRoute<ServiceStartVerificationRouteProp>();
  const { draft, activeBooking } = useBookingStore();

  const [hasApproved, setHasApproved] = useState<boolean>(true);
  const bookingId = route.params?.bookingId || activeBooking?.id || 'bk_demo_001';

  const washerman = draft.washerman || {
    id: 'wsh_001',
    name: 'Rakesh Kumar',
    rating: 4.8,
    totalReviews: 320,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
  };

  const handleStartService = () => {
    navigation.navigate(Routes.BEFORE_WASH_PHOTOS, { bookingId });
  };

  const handleReportIssue = () => {
    navigation.navigate(Routes.REPORT_ISSUE, { bookingId });
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
          <AppText style={styles.headerTitle}>Service Start Verification</AppText>
          <AppText style={styles.headerSubtitle}>
            Let's get started with a clean ride!
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
        {/* WASHERMAN HAS ARRIVED BANNER */}
        <View style={styles.arrivalBanner}>
          <View style={styles.playIconContainer}>
            <Play size={18} color="#059669" fill="#059669" />
          </View>
          <View style={styles.arrivalBannerText}>
            <AppText style={styles.arrivalBannerTitle}>Washerman has arrived</AppText>
            <AppText style={styles.arrivalBannerDesc}>
              Please verify the details and confirm to start the service.
            </AppText>
          </View>
        </View>

        {/* WASHERMAN PROFILE & ID CARD */}
        <View style={styles.washermanCard}>
          <View style={styles.washermanLeft}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: washerman.avatarUrl }}
                style={styles.washermanAvatar}
              />
              <View style={styles.onlineDot} />
            </View>
            <View style={styles.washermanMainInfo}>
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
            <View style={styles.metaRow}>
              <AppText style={styles.metaLabel}>Washerman ID</AppText>
              <AppText style={styles.metaVal}>WON7823</AppText>
            </View>
            <View style={styles.metaRow}>
              <AppText style={styles.metaLabel}>Mobile</AppText>
              <AppText style={styles.metaVal}>+91 98765 43210</AppText>
            </View>
            <View style={styles.metaRow}>
              <AppText style={styles.metaLabel}>Location</AppText>
              <AppText style={styles.metaVal}>Indore, MP</AppText>
            </View>
          </View>
        </View>

        {/* BOOKING DETAILS CARD */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <ClipboardList size={18} color="#059669" />
              <AppText style={styles.cardHeaderTitle}>Booking Details</AppText>
            </View>
            <View style={styles.activeBadge}>
              <Check size={10} color="#059669" />
              <AppText style={styles.activeBadgeText}>Active</AppText>
            </View>
          </View>

          <View style={styles.detailRows}>
            <View style={styles.detailRow}>
              <AppText style={styles.detailFieldLabel}>Booking ID</AppText>
              <AppText style={styles.detailFieldValueBold}>#WO256839</AppText>
            </View>
            <View style={styles.detailRow}>
              <AppText style={styles.detailFieldLabel}>Date & Time</AppText>
              <AppText style={styles.detailFieldValue}>17 Sep 2026, 12:00 PM</AppText>
            </View>
            <View style={styles.detailRow}>
              <AppText style={styles.detailFieldLabel}>Service Type</AppText>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <AppText style={styles.detailFieldValueBold}>Premium Car Wash</AppText>
                <AppText style={styles.detailFieldSub}>Exterior + Interior + Premium Finish</AppText>
              </View>
            </View>
            <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
              <AppText style={styles.detailFieldLabel}>Location</AppText>
              <AppText style={styles.detailFieldValue}>123, Vijay Nagar, Indore, MP</AppText>
            </View>
          </View>
        </View>

        {/* VEHICLE DETAILS CARD */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Car size={18} color="#059669" />
              <AppText style={styles.cardHeaderTitle}>Vehicle Details</AppText>
            </View>
            <TouchableOpacity
              style={styles.changeBadge}
              onPress={() => navigation.navigate(Routes.VEHICLE_LIST)}
            >
              <Edit2 size={10} color="#059669" style={{ marginRight: 2 }} />
              <AppText style={styles.changeBadgeText}>Change</AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.vehicleContentRow}>
            {/* Left: Car Photo & Details */}
            <View style={styles.vehicleInfoCol}>
              <Image
                source={{ uri: draft.vehicle?.photoUrl || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=160&q=80' }}
                style={styles.vehicleThumb}
              />
              <AppText style={styles.vehicleTitle}>
                {draft.vehicle ? `${draft.vehicle.brand} ${draft.vehicle.model}` : 'Toyota Fortuner'}
              </AppText>
              <AppText style={styles.vehicleReg}>
                {draft.vehicle ? `${draft.vehicle.registrationNumber}` : 'MP 09 AB 1234'}
              </AppText>
              <AppText style={styles.vehicleSub}>
                {draft.vehicle ? `${draft.vehicle.color} • ${draft.vehicle.type.toUpperCase()}` : 'White • SUV'}
              </AppText>
            </View>

            {/* Right: Service & Parking Notes */}
            <View style={styles.vehicleNotesCol}>
              <View style={styles.serviceNoteItem}>
                <View style={[styles.noteIconCircle, { backgroundColor: '#EFF6FF' }]}>
                  <Droplet size={14} color="#2563EB" />
                </View>
                <View style={{ flex: 1 }}>
                  <AppText style={styles.noteTitle}>Premium Car Wash</AppText>
                  <AppText style={styles.noteDesc}>Exterior + Interior + Premium Finish</AppText>
                </View>
              </View>

              <View style={[styles.serviceNoteItem, { marginTop: Spacing.sm }]}>
                <View style={[styles.noteIconCircle, { backgroundColor: '#F3F4F6' }]}>
                  <ParkingCircle size={14} color="#4B5563" />
                </View>
                <View style={{ flex: 1 }}>
                  <AppText style={styles.noteTitle}>Vehicle in Basement Parking</AppText>
                  <AppText style={styles.noteDesc}>Tower B</AppText>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* TAKE BEFORE PHOTOS REQUIREMENT CARD */}
        <View style={styles.sectionCard}>
          <View style={styles.photoReqHeader}>
            <View style={styles.photoReqIconBox}>
              <Camera size={18} color="#059669" />
            </View>
            <View style={{ flex: 1 }}>
              <AppText style={styles.photoReqTitle}>Take Before Photos</AppText>
              <AppText style={styles.photoReqSub}>
                Washerman will take clear photos of your vehicle before starting.
              </AppText>
            </View>
          </View>

          {/* 4 Angle Icons Grid */}
          <View style={styles.photoAnglesGrid}>
            <View style={styles.angleCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=100&q=80' }}
                style={styles.angleImg}
              />
              <View style={styles.camCheckBadge}>
                <Check size={10} color="#FFFFFF" />
              </View>
              <AppText style={styles.angleLabel}>Front View</AppText>
            </View>

            <View style={styles.angleCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=100&q=80' }}
                style={styles.angleImg}
              />
              <View style={styles.camCheckBadge}>
                <Check size={10} color="#FFFFFF" />
              </View>
              <AppText style={styles.angleLabel}>Back View</AppText>
            </View>

            <View style={styles.angleCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=100&q=80' }}
                style={styles.angleImg}
              />
              <View style={styles.camCheckBadge}>
                <Check size={10} color="#FFFFFF" />
              </View>
              <AppText style={styles.angleLabel}>Left View</AppText>
            </View>

            <View style={styles.angleCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=100&q=80' }}
                style={styles.angleImg}
              />
              <View style={styles.camCheckBadge}>
                <Check size={10} color="#FFFFFF" />
              </View>
              <AppText style={styles.angleLabel}>Right View</AppText>
            </View>
          </View>

          <View style={styles.photoInfoBanner}>
            <Info size={14} color="#0284C7" style={{ marginRight: 6 }} />
            <AppText style={styles.photoInfoText}>
              Before photos are required for your safety and service quality.
            </AppText>
          </View>
        </View>

        {/* CUSTOMER APPROVAL CARD */}
        <View style={styles.approvalCard}>
          <View style={styles.approvalHeader}>
            <ShieldCheck size={20} color="#059669" style={{ marginRight: 6 }} />
            <View style={{ flex: 1 }}>
              <AppText style={styles.approvalTitle}>Customer Approval</AppText>
              <AppText style={styles.approvalDesc}>
                Please confirm that you are satisfied with the before photos and allow the washerman to start the service.
              </AppText>
            </View>
          </View>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setHasApproved(!hasApproved)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkboxBox, hasApproved && styles.checkboxBoxActive]}>
              {hasApproved && <Check size={12} color="#FFFFFF" />}
            </View>
            <AppText style={styles.checkboxLabel}>
              I have verified the vehicle details and before photos. You can start the service.
            </AppText>
          </TouchableOpacity>
        </View>

        {/* DUAL ACTION BUTTONS (START SERVICE / REPORT ISSUE) */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.startBtn, !hasApproved && { opacity: 0.6 }]}
            onPress={handleStartService}
            disabled={!hasApproved}
            activeOpacity={0.88}
          >
            <Play size={16} color="#FFFFFF" fill="#FFFFFF" style={{ marginRight: 6 }} />
            <AppText style={styles.startBtnText}>Start Service</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.reportBtn}
            onPress={handleReportIssue}
            activeOpacity={0.8}
          >
            <AlertTriangle size={16} color="#DC2626" style={{ marginRight: 4 }} />
            <AppText style={styles.reportBtnText}>Report Issue</AppText>
          </TouchableOpacity>
        </View>

        {/* FOOTER NOTE */}
        <View style={styles.footerNote}>
          <Lock size={12} color={Colors.textTertiary} style={{ marginRight: 4 }} />
          <AppText style={styles.footerNoteText}>
            Your safety and vehicle security are our priority.
          </AppText>
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
  arrivalBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  playIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  arrivalBannerText: {
    flex: 1,
  },
  arrivalBannerTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#065F46',
  },
  arrivalBannerDesc: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: '#047857',
    marginTop: 1,
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
  avatarWrapper: {
    position: 'relative',
    marginRight: Spacing.sm,
  },
  washermanAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F3F4F6',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  washermanMainInfo: {
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
    gap: 3,
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
    gap: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  metaLabel: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
  },
  metaVal: {
    fontSize: 8,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
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
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    gap: 3,
  },
  activeBadgeText: {
    fontSize: 8,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  changeBadgeText: {
    fontSize: 8,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  detailRows: {
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  detailFieldLabel: {
    fontSize: 9,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
  },
  detailFieldValue: {
    fontSize: 9,
    fontFamily: FontFamily.medium,
    color: Colors.textPrimary,
  },
  detailFieldValueBold: {
    fontSize: 9,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  detailFieldSub: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  vehicleContentRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  vehicleInfoCol: {
    flex: 1,
    alignItems: 'center',
  },
  vehicleThumb: {
    width: 68,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    marginBottom: 4,
  },
  vehicleTitle: {
    fontSize: 10,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  vehicleReg: {
    fontSize: 9,
    fontFamily: FontFamily.bold,
    color: '#059669',
    marginTop: 1,
  },
  vehicleSub: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  vehicleNotesCol: {
    flex: 1.2,
    borderLeftWidth: 1,
    borderLeftColor: '#F3F4F6',
    paddingLeft: Spacing.sm,
    justifyContent: 'center',
  },
  serviceNoteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  noteIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteTitle: {
    fontSize: 9,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  noteDesc: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  photoReqHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  photoReqIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoReqTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  photoReqSub: {
    fontSize: 9,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  photoAnglesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  angleCard: {
    width: (width - Spacing.lg * 2 - Spacing.md * 2 - 24) / 4,
    alignItems: 'center',
    position: 'relative',
  },
  angleImg: {
    width: '100%',
    height: 48,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
  },
  camCheckBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  angleLabel: {
    fontSize: 8,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
    marginTop: 3,
    textAlign: 'center',
  },
  photoInfoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  photoInfoText: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: '#0369A1',
    flex: 1,
  },
  approvalCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: Spacing.md,
  },
  approvalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  approvalTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#065F46',
  },
  approvalDesc: {
    fontSize: 9,
    fontFamily: FontFamily.regular,
    color: '#047857',
    marginTop: 2,
    lineHeight: 13,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxBoxActive: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  checkboxLabel: {
    fontSize: 8,
    fontFamily: FontFamily.medium,
    color: Colors.textPrimary,
    flex: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  startBtn: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: BorderRadius.full,
    ...Shadows.sm,
  },
  startBtnText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: '#FFFFFF',
  },
  reportBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    paddingVertical: 14,
    borderRadius: BorderRadius.full,
  },
  reportBtnText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#DC2626',
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  footerNoteText: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
  },
});
