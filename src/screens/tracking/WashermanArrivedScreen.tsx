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
  ShieldCheck,
  Star,
  Play,
  AlertTriangle,
  Info,
  Phone,
  Car,
  MapPin,
  Briefcase,
  IdCard,
  Sparkles,
  ArrowRight,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type WashermanArrivedNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.WASHERMAN_ARRIVED
>;

type WashermanArrivedRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.WASHERMAN_ARRIVED
>;

export const WashermanArrivedScreen: React.FC = () => {
  const navigation = useNavigation<WashermanArrivedNavProp>();
  const route = useRoute<WashermanArrivedRouteProp>();
  const { draft, activeBooking } = useBookingStore();

  const bookingId = route.params?.bookingId || activeBooking?.id || 'bk_demo_001';
  const washerman = draft.washerman || {
    id: 'wsh_001',
    name: 'Rakesh Kumar',
    rating: 4.8,
    totalReviews: 320,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    experienceYears: 2,
  };

  const handleStartService = () => {
    navigation.navigate(Routes.SERVICE_START_VERIFICATION, { bookingId });
  };

  const handleReportIssue = () => {
    navigation.navigate(Routes.REPORT_ISSUE, { bookingId });
  };

  const handleCallSupport = () => {
    Linking.openURL('tel:+918120652523');
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
          <AppText style={styles.headerTitle}>Washerman Arrived</AppText>
          <AppText style={styles.headerSubtitle}>
            Your washerman has reached your location
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
        {/* CELEBRATION HERO BANNER */}
        <View style={styles.heroBanner}>
          <View style={styles.heroLeftText}>
            <View style={styles.heroCheckCircle}>
              <CheckCircle2 size={24} color="#059669" />
            </View>
            <AppText style={styles.heroTitle}>Washerman has arrived!</AppText>
            <AppText style={styles.heroDesc}>
              Rakesh is at your location and ready to start the service.
            </AppText>
          </View>

          {/* Friendly Washerman Illustration / Avatar */}
          <View style={styles.heroIllustrationBox}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&q=80' }}
              style={styles.heroWashermanImg}
            />
            <View style={styles.speechBubble}>
              <AppText style={styles.speechBubbleText}>Let's make your car shine!</AppText>
            </View>
          </View>
        </View>

        {/* WASHERMAN IDENTITY & VERIFICATION CARD (2-COLUMN) */}
        <View style={styles.identityCard}>
          {/* Left Column */}
          <View style={styles.identityLeft}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: washerman.avatarUrl }}
                style={styles.identityAvatar}
              />
              <View style={styles.onlinePill}>
                <View style={styles.greenDot} />
                <AppText style={styles.onlinePillText}>Online</AppText>
              </View>
            </View>

            <AppText style={styles.identityName}>{washerman.name}</AppText>
            <View style={styles.ratingRow}>
              <Star size={11} color="#F59E0B" fill="#F59E0B" />
              <AppText style={styles.ratingText}> 4.8 (320 reviews)</AppText>
            </View>

            <View style={styles.verifyChecksList}>
              <View style={styles.checkItem}>
                <CheckCircle2 size={11} color="#059669" />
                <AppText style={styles.checkItemText}>ID Verified</AppText>
              </View>
              <View style={styles.checkItem}>
                <CheckCircle2 size={11} color="#059669" />
                <AppText style={styles.checkItemText}>Background Checked</AppText>
              </View>
              <View style={styles.checkItem}>
                <CheckCircle2 size={11} color="#059669" />
                <AppText style={styles.checkItemText}>Trained Professional</AppText>
              </View>
            </View>
          </View>

          {/* Right Column */}
          <View style={styles.identityRight}>
            <View style={styles.identityMetaRow}>
              <View style={[styles.metaIconBox, { backgroundColor: '#ECFDF5' }]}>
                <CheckCircle2 size={12} color="#059669" />
              </View>
              <View>
                <AppText style={styles.metaLabel}>Washerman ID</AppText>
                <AppText style={styles.metaVal}>WON7823</AppText>
              </View>
            </View>

            <View style={styles.identityMetaRow}>
              <View style={[styles.metaIconBox, { backgroundColor: '#EFF6FF' }]}>
                <Phone size={12} color="#2563EB" />
              </View>
              <View>
                <AppText style={styles.metaLabel}>Mobile</AppText>
                <AppText style={styles.metaVal}>+91 98765 43210</AppText>
              </View>
            </View>

            <View style={styles.identityMetaRow}>
              <View style={[styles.metaIconBox, { backgroundColor: '#FFFBEB' }]}>
                <MapPin size={12} color="#D97706" />
              </View>
              <View>
                <AppText style={styles.metaLabel}>Location</AppText>
                <AppText style={styles.metaVal}>Indore, MP</AppText>
              </View>
            </View>

            <View style={styles.identityMetaRow}>
              <View style={[styles.metaIconBox, { backgroundColor: '#FAF5FF' }]}>
                <Briefcase size={12} color="#9333EA" />
              </View>
              <View>
                <AppText style={styles.metaLabel}>Experience</AppText>
                <AppText style={styles.metaVal}>2+ Years Experience</AppText>
              </View>
            </View>
          </View>
        </View>

        {/* ARRIVAL TIME & WASHERMAN QUOTE ROW */}
        <View style={styles.arrivalRow}>
          <View style={styles.arrivalTimeCard}>
            <View style={styles.arrivalIconBox}>
              <MapPin size={18} color="#059669" />
            </View>
            <View>
              <AppText style={styles.arrivalLabel}>Arrived at</AppText>
              <AppText style={styles.arrivalVal}>9:42 AM</AppText>
              <AppText style={styles.arrivalSub}>On time</AppText>
            </View>
          </View>

          <View style={styles.quoteCard}>
            <AppText style={styles.quoteText}>
              “I'm here! Ready to start whenever you are.”
            </AppText>
            <AppText style={styles.quoteAuthor}>— Rakesh</AppText>
          </View>
        </View>

        {/* VEHICLE & EQUIPMENT CARD */}
        <View style={styles.equipmentCard}>
          <View style={styles.equipmentHeader}>
            <Car size={18} color="#059669" />
            <AppText style={styles.equipmentHeaderTitle}>Vehicle & Equipment</AppText>
          </View>

          <View style={styles.equipmentBodyRow}>
            {/* Vehicle Card */}
            <View style={styles.equipVehicleCol}>
              <Image
                source={{ uri: draft.vehicle?.photoUrl || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=120&q=80' }}
                style={styles.equipVehicleImg}
              />
              <AppText style={styles.equipVehicleTitle}>
                {draft.vehicle ? `${draft.vehicle.brand} ${draft.vehicle.model}` : 'Toyota Fortuner'}
              </AppText>
              <AppText style={styles.equipVehicleSub}>
                {draft.vehicle ? `${draft.vehicle.type.toUpperCase()} • ${draft.vehicle.color} • ${draft.vehicle.registrationNumber}` : 'SUV • White • MP 09 AB 1234'}
              </AppText>
            </View>

            {/* Equipment Checklist */}
            <View style={styles.equipChecklistCol}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=120&q=80' }}
                style={styles.equipKitThumb}
              />
              <View style={styles.equipCheckList}>
                <AppText style={styles.equipCheckTitle}>Professional Equipment</AppText>
                <AppText style={styles.equipCheckItem}>✔ High Pressure Washer</AppText>
                <AppText style={styles.equipCheckItem}>✔ Eco-friendly Cleaners</AppText>
                <AppText style={styles.equipCheckItem}>✔ Microfiber Cloth</AppText>
                <AppText style={styles.equipCheckItem}>✔ All required tools</AppText>
              </View>
            </View>
          </View>
        </View>

        {/* SAFETY VERIFICATION CHECKLIST */}
        <View style={styles.safetyVerificationCard}>
          <View style={styles.safetyHeaderRow}>
            <View style={styles.safetyIconContainer}>
              <ShieldCheck size={20} color="#059669" />
            </View>
            <View style={{ flex: 1 }}>
              <AppText style={styles.safetyHeaderTitle}>Safety Verification</AppText>
              <AppText style={styles.safetyHeaderSub}>
                Please confirm the following before starting the service:
              </AppText>
            </View>
          </View>

          <View style={styles.safetyContentRow}>
            <View style={styles.safetyPointsList}>
              <View style={styles.safePoint}>
                <CheckCircle2 size={12} color="#059669" />
                <AppText style={styles.safePointText}>Match the profile photo</AppText>
              </View>
              <View style={styles.safePoint}>
                <CheckCircle2 size={12} color="#059669" />
                <AppText style={styles.safePointText}>Verify Washerman ID (WON7823)</AppText>
              </View>
              <View style={styles.safePoint}>
                <CheckCircle2 size={12} color="#059669" />
                <AppText style={styles.safePointText}>Check uniform with WashOn logo</AppText>
              </View>
              <View style={styles.safePoint}>
                <CheckCircle2 size={12} color="#059669" />
                <AppText style={styles.safePointText}>Confirm vehicle/equipment</AppText>
              </View>
            </View>

            <View style={styles.verifiedSafeBadge}>
              <ShieldCheck size={24} color="#059669" />
              <AppText style={styles.verifiedSafeTitle}>Verified & Safe</AppText>
              <AppText style={styles.verifiedSafeSub}>You're in safe hands!</AppText>
            </View>
          </View>
        </View>

        {/* DUAL ACTION BUTTONS (START SERVICE / REPORT ISSUE) */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity
            style={styles.startServiceBtn}
            onPress={handleStartService}
            activeOpacity={0.88}
          >
            <Play size={16} color="#FFFFFF" fill="#FFFFFF" style={{ marginRight: 6 }} />
            <AppText style={styles.startServiceBtnText}>Start Service</AppText>
            <ArrowRight size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.reportIssueBtn}
            onPress={handleReportIssue}
            activeOpacity={0.8}
          >
            <AlertTriangle size={16} color="#EF4444" style={{ marginRight: 4 }} />
            <AppText style={styles.reportIssueBtnText}>Report Issue</AppText>
          </TouchableOpacity>
        </View>

        {/* SUPPORT FOOTER */}
        <View style={styles.supportFooter}>
          <Info size={14} color={Colors.textTertiary} style={{ marginRight: 4 }} />
          <AppText style={styles.supportText}>Facing any problem? Contact our support team anytime.</AppText>
          <TouchableOpacity onPress={handleCallSupport}>
            <AppText style={styles.supportPhoneText}>📞 +91 81206 52523</AppText>
          </TouchableOpacity>
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
  },
  heroBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  heroLeftText: {
    flex: 1,
  },
  heroCheckCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: '#065F46',
  },
  heroDesc: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: '#047857',
    marginTop: 2,
    lineHeight: 14,
  },
  heroIllustrationBox: {
    alignItems: 'center',
    width: 100,
  },
  heroWashermanImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#059669',
  },
  speechBubble: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  speechBubbleText: {
    fontSize: 7,
    fontFamily: FontFamily.bold,
    color: '#059669',
    textAlign: 'center',
  },
  identityCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  identityLeft: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#F3F4F6',
    paddingRight: Spacing.sm,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 4,
  },
  identityAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#F3F4F6',
  },
  onlinePill: {
    position: 'absolute',
    bottom: -3,
    left: 4,
    right: 4,
    backgroundColor: '#ECFDF5',
    borderRadius: BorderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    gap: 2,
  },
  greenDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#10B981',
  },
  onlinePillText: {
    fontSize: 7,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  identityName: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
    marginTop: 4,
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
  verifyChecksList: {
    marginTop: 6,
    gap: 3,
    alignSelf: 'stretch',
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  checkItemText: {
    fontSize: 8,
    fontFamily: FontFamily.medium,
    color: '#059669',
  },
  identityRight: {
    flex: 1.1,
    paddingLeft: Spacing.sm,
    justifyContent: 'space-around',
  },
  identityMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaIconBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaLabel: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
  },
  metaVal: {
    fontSize: 9,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  arrivalRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  arrivalTimeCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  arrivalIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  arrivalLabel: {
    fontSize: 9,
    fontFamily: FontFamily.regular,
    color: '#047857',
  },
  arrivalVal: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: '#065F46',
  },
  arrivalSub: {
    fontSize: 8,
    fontFamily: FontFamily.medium,
    color: '#059669',
  },
  quoteCard: {
    flex: 1.2,
    backgroundColor: '#F0FDF4',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    justifyContent: 'center',
  },
  quoteText: {
    fontSize: 9,
    fontFamily: FontFamily.medium,
    color: '#065F46',
    fontStyle: 'italic',
    lineHeight: 13,
  },
  quoteAuthor: {
    fontSize: 8,
    fontFamily: FontFamily.bold,
    color: '#047857',
    textAlign: 'right',
    marginTop: 3,
  },
  equipmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  equipmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
    paddingBottom: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  equipmentHeaderTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  equipmentBodyRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  equipVehicleCol: {
    flex: 1,
    alignItems: 'center',
  },
  equipVehicleImg: {
    width: 60,
    height: 45,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    marginBottom: 4,
  },
  equipVehicleTitle: {
    fontSize: 10,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  equipVehicleSub: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  equipChecklistCol: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#F3F4F6',
    paddingLeft: Spacing.sm,
  },
  equipKitThumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginRight: 6,
  },
  equipCheckList: {
    flex: 1,
  },
  equipCheckTitle: {
    fontSize: 9,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  equipCheckItem: {
    fontSize: 7,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    lineHeight: 11,
  },
  safetyVerificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  safetyHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  safetyIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  safetyHeaderTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  safetyHeaderSub: {
    fontSize: 9,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  safetyContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  safetyPointsList: {
    flex: 1,
    gap: 3,
  },
  safePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  safePointText: {
    fontSize: 9,
    fontFamily: FontFamily.regular,
    color: Colors.textPrimary,
  },
  verifiedSafeBadge: {
    backgroundColor: '#ECFDF5',
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    width: 100,
  },
  verifiedSafeTitle: {
    fontSize: 9,
    fontFamily: FontFamily.bold,
    color: '#065F46',
    marginTop: 2,
  },
  verifiedSafeSub: {
    fontSize: 7,
    fontFamily: FontFamily.regular,
    color: '#047857',
    textAlign: 'center',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  startServiceBtn: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: BorderRadius.full,
    ...Shadows.sm,
  },
  startServiceBtnText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: '#FFFFFF',
  },
  reportIssueBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    paddingVertical: 14,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
  },
  reportIssueBtnText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#DC2626',
  },
  supportFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  supportText: {
    fontSize: 9,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
  },
  supportPhoneText: {
    fontSize: 9,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
});
