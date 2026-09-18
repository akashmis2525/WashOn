import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Clock,
  Send,
  Users,
  MoreHorizontal,
  Check,
  Edit2,
  Droplet,
  MapPin,
  X,
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

type WaitingForAcceptanceNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.WAITING_FOR_ACCEPTANCE
>;

type WaitingForAcceptanceRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.WAITING_FOR_ACCEPTANCE
>;

export const WaitingForAcceptanceScreen: React.FC = () => {
  const navigation = useNavigation<WaitingForAcceptanceNavProp>();
  const route = useRoute<WaitingForAcceptanceRouteProp>();
  const { draft, activeBooking } = useBookingStore();

  const [secondsRemaining, setSecondsRemaining] = useState<number>(169); // 02:49
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Timer countdown
    const timerInterval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Auto-advance to Booking Accepted for interactive demo
    const autoAcceptTimer = setTimeout(() => {
      navigation.navigate(Routes.BOOKING_ACCEPTED, {
        bookingId: route.params?.bookingId || 'bk_demo_001',
      });
    }, 4500);

    return () => {
      clearInterval(timerInterval);
      clearTimeout(autoAcceptTimer);
    };
  }, []);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const bookingId = route.params?.bookingId || activeBooking?.id || 'bk_001';

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
          <AppText style={styles.headerTitle}>Waiting for Acceptance</AppText>
          <AppText style={styles.headerSubtitle}>
            We've notified nearby washermen
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
        {/* RADAR & SURROUNDING WASHERMEN */}
        <View style={styles.radarWrapper}>
          <Animated.View
            style={[
              styles.radarOuterRing,
              { transform: [{ scale: pulseAnim }] },
            ]}
          />
          <View style={styles.radarInnerRing} />

          {/* Center Car with Soundwaves */}
          <View style={styles.centerCarContainer}>
            <View style={styles.waveArcLeft} />
            <View style={styles.centerCarCircle}>
              <Car size={26} color="#059669" />
            </View>
            <View style={styles.waveArcRight} />
          </View>

          {/* Washerman 1: Top Left - 1.2 km */}
          <View style={[styles.washerNodeWrapper, { top: 10, left: 30 }]}>
            <View style={styles.washerAvatarBox}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&q=80' }}
                style={styles.washerNodeImg}
              />
            </View>
            <AppText style={styles.washerDistanceText}>1.2 km</AppText>
            <AppText style={styles.washerStatusText}>Notified</AppText>
          </View>

          {/* Washerman 2: Top Right - 0.8 km */}
          <View style={[styles.washerNodeWrapper, { top: 12, right: 30 }]}>
            <View style={styles.washerAvatarBox}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80' }}
                style={styles.washerNodeImg}
              />
            </View>
            <AppText style={styles.washerDistanceText}>0.8 km</AppText>
            <AppText style={styles.washerStatusText}>Notified</AppText>
          </View>

          {/* Washerman 3: Mid Left - 2.5 km */}
          <View style={[styles.washerNodeWrapper, { top: 75, left: 10 }]}>
            <View style={styles.washerAvatarBox}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80' }}
                style={styles.washerNodeImg}
              />
            </View>
            <AppText style={styles.washerDistanceText}>2.5 km</AppText>
            <AppText style={styles.washerStatusText}>Notified</AppText>
          </View>

          {/* Washerman 4: Mid Right - 1.6 km */}
          <View style={[styles.washerNodeWrapper, { top: 75, right: 10 }]}>
            <View style={styles.washerAvatarBox}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=60&q=80' }}
                style={styles.washerNodeImg}
              />
            </View>
            <AppText style={styles.washerDistanceText}>1.6 km</AppText>
            <AppText style={styles.washerStatusText}>Notified</AppText>
          </View>

          {/* Washerman 5: Bottom Left - 3.8 km */}
          <View style={[styles.washerNodeWrapper, { bottom: 10, left: 45 }]}>
            <View style={styles.washerAvatarBox}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=60&q=80' }}
                style={styles.washerNodeImg}
              />
            </View>
            <AppText style={styles.washerDistanceText}>3.8 km</AppText>
            <AppText style={styles.washerStatusText}>Notified</AppText>
          </View>

          {/* Washerman 6: Bottom Right - 4.1 km */}
          <View style={[styles.washerNodeWrapper, { bottom: 10, right: 45 }]}>
            <View style={styles.washerAvatarBox}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&q=80' }}
                style={styles.washerNodeImg}
              />
            </View>
            <AppText style={styles.washerDistanceText}>4.1 km</AppText>
            <AppText style={styles.washerStatusText}>Notified</AppText>
          </View>
        </View>

        {/* REQUEST SENT HEADLINE */}
        <View style={styles.sentHeadline}>
          <AppText style={styles.sentTitle}>Request Sent!</AppText>
          <AppText style={styles.sentSubtitle}>We're notifying nearby washermen</AppText>
        </View>

        {/* COUNTDOWN TIMER CARD */}
        <View style={styles.countdownCard}>
          <View style={styles.timerIconContainer}>
            <Clock size={24} color="#059669" />
          </View>
          <View style={styles.timerTextContainer}>
            <AppText style={styles.timerLabel}>Waiting for acceptance</AppText>
            <AppText style={styles.timerDigital}>{formatTimer(secondsRemaining)}</AppText>
            <AppText style={styles.timerSub}>We'll keep searching until a washerman accepts.</AppText>
          </View>
        </View>

        {/* 4-STEP HORIZONTAL PROGRESS */}
        <View style={styles.stepsFlow}>
          {/* Step 1: Request Sent (Active) */}
          <View style={styles.stepItem}>
            <View style={[styles.stepIconCircle, styles.stepIconCircleActive]}>
              <Send size={14} color="#FFFFFF" />
            </View>
            <AppText style={styles.stepTitleActive}>Request Sent</AppText>
            <AppText style={styles.stepDesc}>To nearby washermen</AppText>
          </View>

          <View style={[styles.stepLine, styles.stepLineActive]} />

          {/* Step 2: Notifying */}
          <View style={styles.stepItem}>
            <View style={styles.stepIconCircle}>
              <Users size={14} color="#9CA3AF" />
            </View>
            <AppText style={styles.stepTitle}>Notifying</AppText>
            <AppText style={styles.stepDesc}>Nearby pros</AppText>
          </View>

          <View style={styles.stepLine} />

          {/* Step 3: Waiting */}
          <View style={styles.stepItem}>
            <View style={styles.stepIconCircle}>
              <MoreHorizontal size={14} color="#9CA3AF" />
            </View>
            <AppText style={styles.stepTitle}>Waiting</AppText>
            <AppText style={styles.stepDesc}>For acceptance</AppText>
          </View>

          <View style={styles.stepLine} />

          {/* Step 4: Confirmed */}
          <View style={styles.stepItem}>
            <View style={styles.stepIconCircle}>
              <Check size={14} color="#9CA3AF" />
            </View>
            <AppText style={styles.stepTitle}>Confirmed</AppText>
            <AppText style={styles.stepDesc}>On the way</AppText>
          </View>
        </View>

        {/* BOOKING DETAILS CARD */}
        <View style={styles.detailsCard}>
          <View style={styles.detailsHeader}>
            <AppText style={styles.detailsTitle}>Booking Details</AppText>
            <TouchableOpacity
              style={styles.changeServiceBtn}
              onPress={() => navigation.navigate(Routes.SERVICE_CATEGORY)}
            >
              <Edit2 size={12} color="#059669" style={{ marginRight: 4 }} />
              <AppText style={styles.changeServiceText}>Change Service</AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.grid2x2}>
            {/* Cell 1: Vehicle */}
            <View style={styles.gridCell}>
              <Image
                source={{ uri: draft.vehicle?.photoUrl || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=120&q=80' }}
                style={styles.gridThumb}
              />
              <View style={styles.gridCellText}>
                <AppText style={styles.gridTitle}>
                  {draft.vehicle ? `${draft.vehicle.brand} ${draft.vehicle.model}` : 'Toyota Fortuner'}
                </AppText>
                <AppText style={styles.gridSub}>
                  {draft.vehicle ? `${draft.vehicle.type.toUpperCase()} • ${draft.vehicle.color} • ${draft.vehicle.registrationNumber}` : 'SUV • White • MP 09 AB 1234'}
                </AppText>
              </View>
            </View>

            {/* Cell 2: Service */}
            <View style={styles.gridCell}>
              <View style={[styles.gridIconCircle, { backgroundColor: '#EFF6FF' }]}>
                <Droplet size={18} color="#2563EB" />
              </View>
              <View style={styles.gridCellText}>
                <AppText style={styles.gridTitle}>
                  {draft.service ? draft.service.name : 'Premium Car Wash'}
                </AppText>
                <AppText style={styles.gridSub}>
                  Exterior + Interior + Premium Finish
                </AppText>
              </View>
            </View>

            {/* Cell 3: Service Location */}
            <View style={styles.gridCell}>
              <View style={[styles.gridIconCircle, { backgroundColor: '#ECFDF5' }]}>
                <MapPin size={18} color="#059669" />
              </View>
              <View style={styles.gridCellText}>
                <AppText style={styles.gridTitle}>123, Vijay Nagar, Indore,</AppText>
                <AppText style={styles.gridSub} numberOfLines={2}>
                  Madhya Pradesh - 452010
                </AppText>
              </View>
            </View>

            {/* Cell 4: Requested Time */}
            <View style={styles.gridCell}>
              <View style={[styles.gridIconCircle, { backgroundColor: '#FFFBEB' }]}>
                <Clock size={18} color="#D97706" />
              </View>
              <View style={styles.gridCellText}>
                <AppText style={styles.gridTitle}>Today, 17 Sep 2026</AppText>
                <AppText style={styles.gridSub}>
                  12:00 PM - 1:00 PM
                </AppText>
              </View>
            </View>
          </View>
        </View>

        {/* NOTIFIED WASHERMEN SUMMARY BANNER */}
        <View style={styles.notifiedBanner}>
          <View style={styles.notifiedIconCircle}>
            <Users size={18} color="#0284C7" />
          </View>
          <View style={styles.notifiedTextContainer}>
            <AppText style={styles.notifiedTitle}>
              6 washermen notified within <AppText style={{ color: '#059669', fontFamily: FontFamily.bold }}>5 km</AppText>
            </AppText>
            <AppText style={styles.notifiedSub}>We'll keep expanding the search if needed.</AppText>
          </View>
        </View>

        {/* BOTTOM DUAL ACTIONS */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.navigate(Routes.HOME_DASHBOARD)}
            activeOpacity={0.8}
          >
            <X size={16} color="#DC2626" style={{ marginRight: 4 }} />
            <AppText style={styles.cancelBtnText}>Cancel Booking</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modifyBtn}
            onPress={() => navigation.navigate(Routes.SERVICE_CATEGORY)}
            activeOpacity={0.8}
          >
            <Edit2 size={16} color="#059669" style={{ marginRight: 4 }} />
            <AppText style={styles.modifyBtnText}>Change Service</AppText>
          </TouchableOpacity>
        </View>

        <AppText style={styles.bottomHelpText}>
          You can cancel or modify your request anytime before it's accepted.
        </AppText>

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
  radarWrapper: {
    width: width - Spacing.lg * 2,
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: Spacing.xs,
  },
  radarOuterRing: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: '#F0FDF4',
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
  },
  radarInnerRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#6EE7B7',
  },
  centerCarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveArcLeft: {
    width: 16,
    height: 32,
    borderLeftWidth: 3,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderColor: '#059669',
    marginRight: 6,
  },
  waveArcRight: {
    width: 16,
    height: 32,
    borderRightWidth: 3,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderColor: '#059669',
    marginLeft: 6,
  },
  centerCarCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
  },
  washerNodeWrapper: {
    position: 'absolute',
    alignItems: 'center',
  },
  washerAvatarBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#10B981',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  washerNodeImg: {
    width: '100%',
    height: '100%',
  },
  washerDistanceText: {
    fontSize: 9,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
    marginTop: 2,
  },
  washerStatusText: {
    fontSize: 7,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
  },
  sentHeadline: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sentTitle: {
    fontSize: Typography.fontSize.xl,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  sentSubtitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  countdownCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    marginBottom: Spacing.md,
  },
  timerIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  timerTextContainer: {
    flex: 1,
  },
  timerLabel: {
    fontSize: 10,
    fontFamily: FontFamily.medium,
    color: '#065F46',
  },
  timerDigital: {
    fontSize: 26,
    fontFamily: FontFamily.bold,
    color: '#059669',
    marginVertical: 1,
  },
  timerSub: {
    fontSize: 9,
    fontFamily: FontFamily.regular,
    color: '#047857',
  },
  stepsFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  stepItem: {
    alignItems: 'center',
    width: 62,
  },
  stepIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  stepIconCircleActive: {
    backgroundColor: '#059669',
  },
  stepTitle: {
    fontSize: 9,
    fontFamily: FontFamily.medium,
    color: Colors.textTertiary,
  },
  stepTitleActive: {
    fontSize: 9,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  stepDesc: {
    fontSize: 7,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginTop: 2,
    lineHeight: 10,
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginBottom: 24,
  },
  stepLineActive: {
    backgroundColor: '#059669',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingBottom: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  detailsTitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  changeServiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.md,
  },
  changeServiceText: {
    fontSize: 10,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  grid2x2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  gridCell: {
    width: (width - Spacing.lg * 2 - Spacing.md * 2 - Spacing.sm) / 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  gridThumb: {
    width: 36,
    height: 36,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    marginRight: 6,
  },
  gridIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  gridCellText: {
    flex: 1,
  },
  gridTitle: {
    fontSize: 10,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  gridSub: {
    fontSize: 9,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 12,
  },
  notifiedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    marginBottom: Spacing.lg,
  },
  notifiedIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  notifiedTextContainer: {
    flex: 1,
  },
  notifiedTitle: {
    fontSize: 11,
    fontFamily: FontFamily.bold,
    color: '#0369A1',
  },
  notifiedSub: {
    fontSize: 9,
    fontFamily: FontFamily.regular,
    color: '#0284C7',
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: 8,
  },
  cancelBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    paddingVertical: 12,
    borderRadius: BorderRadius.full,
  },
  cancelBtnText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#DC2626',
  },
  modifyBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    paddingVertical: 12,
    borderRadius: BorderRadius.full,
  },
  modifyBtnText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  bottomHelpText: {
    fontSize: 9,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
});
