import React, { useEffect, useRef } from 'react';
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
  Search,
  Users,
  MoreHorizontal,
  Check,
  MapPin,
  Car,
  Droplet,
  Clock,
  Lightbulb,
  X,
  RotateCw,
  Info,
  ChevronDown,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type BookingRequestSentNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.BOOKING_REQUEST_SENT
>;

type BookingRequestSentRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.BOOKING_REQUEST_SENT
>;

export const BookingRequestSentScreen: React.FC = () => {
  const navigation = useNavigation<BookingRequestSentNavProp>();
  const route = useRoute<BookingRequestSentRouteProp>();
  const { draft, activeBooking } = useBookingStore();

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation for radar ring
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotate animation for radar sweep
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Auto advance to WaitingForAcceptance or BookingAccepted after 4 seconds (for interactive demo)
    const timer = setTimeout(() => {
      navigation.navigate(Routes.WAITING_FOR_ACCEPTANCE, {
        bookingId: route.params?.bookingId || 'bk_demo_001',
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

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
          <AppText style={styles.headerTitle}>Booking Request Sent</AppText>
          <AppText style={styles.headerSubtitle}>
            We're finding the best washerman for you
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
        {/* RADAR ANIMATION CONTAINER */}
        <View style={styles.radarContainer}>
          {/* Outer dashed orbit circle */}
          <Animated.View
            style={[
              styles.radarOuterCircle,
              { transform: [{ scale: pulseAnim }] },
            ]}
          />

          {/* Middle circle */}
          <View style={styles.radarMiddleCircle} />

          {/* Radar Sweep / Arc */}
          <Animated.View
            style={[
              styles.radarSweep,
              { transform: [{ rotate: spin }] },
            ]}
          />

          {/* Washerman Avatar Nodes in Orbit */}
          <View style={[styles.avatarNode, { top: 20, left: 70 }]}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&q=80' }}
              style={styles.nodeAvatar}
            />
          </View>
          <View style={[styles.avatarNode, { top: 40, right: 60 }]}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80' }}
              style={styles.nodeAvatar}
            />
          </View>
          <View style={[styles.avatarNode, { bottom: 35, left: 50 }]}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80' }}
              style={styles.nodeAvatar}
            />
          </View>
          <View style={[styles.avatarNode, { bottom: 25, right: 70 }]}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=60&q=80' }}
              style={styles.nodeAvatar}
            />
          </View>
          <View style={[styles.avatarNode, { bottom: 8, alignSelf: 'center' }]}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=60&q=80' }}
              style={styles.nodeAvatar}
            />
          </View>

          {/* Center Car Icon */}
          <View style={styles.centerCarCircle}>
            <Car size={26} color="#059669" />
          </View>
        </View>

        {/* TITLE & SEARCH RADIUS SUBTITLE */}
        <View style={styles.findingTitleContainer}>
          <AppText style={styles.findingTitle}>Finding an available washerman</AppText>
          <AppText style={styles.findingSubtitle}>
            Searching within <AppText style={styles.boldGreen}>5 km</AppText> radius
          </AppText>
        </View>

        {/* 4-STEP HORIZONTAL PROGRESS FLOW */}
        <View style={styles.stepsFlow}>
          {/* Step 1: Searching (Active) */}
          <View style={styles.stepItem}>
            <View style={[styles.stepIconCircle, styles.stepIconCircleActive]}>
              <Search size={14} color="#FFFFFF" />
            </View>
            <AppText style={styles.stepTitleActive}>Searching</AppText>
            <AppText style={styles.stepDesc}>Finding nearby washermen</AppText>
          </View>

          {/* Line 1 */}
          <View style={[styles.stepLine, styles.stepLineActive]} />

          {/* Step 2: Notifying */}
          <View style={styles.stepItem}>
            <View style={styles.stepIconCircle}>
              <Users size={14} color="#9CA3AF" />
            </View>
            <AppText style={styles.stepTitle}>Notifying</AppText>
            <AppText style={styles.stepDesc}>Sending request to available pros</AppText>
          </View>

          {/* Line 2 */}
          <View style={styles.stepLine} />

          {/* Step 3: Waiting */}
          <View style={styles.stepItem}>
            <View style={styles.stepIconCircle}>
              <MoreHorizontal size={14} color="#9CA3AF" />
            </View>
            <AppText style={styles.stepTitle}>Waiting</AppText>
            <AppText style={styles.stepDesc}>Confirming availability</AppText>
          </View>

          {/* Line 3 */}
          <View style={styles.stepLine} />

          {/* Step 4: Assigned */}
          <View style={styles.stepItem}>
            <View style={styles.stepIconCircle}>
              <Check size={14} color="#9CA3AF" />
            </View>
            <AppText style={styles.stepTitle}>Assigned</AppText>
            <AppText style={styles.stepDesc}>You'll be notified shortly</AppText>
          </View>
        </View>

        {/* SEARCH RADIUS CARD */}
        <View style={styles.radiusCard}>
          <View style={styles.radiusLeft}>
            <View style={styles.radiusIconContainer}>
              <MapPin size={20} color="#059669" />
            </View>
            <View style={styles.radiusTextContainer}>
              <View style={styles.radiusTitleRow}>
                <AppText style={styles.radiusTitle}>Search Radius</AppText>
              </View>
              <View style={styles.radiusValRow}>
                <AppText style={styles.radiusVal}>5 km</AppText>
                <Info size={12} color={Colors.textTertiary} style={{ marginLeft: 4 }} />
              </View>
              <AppText style={styles.radiusDesc}>
                We're checking washermen within 5 km of your location.
              </AppText>
            </View>
          </View>
          <TouchableOpacity style={styles.changeRadiusBtn} activeOpacity={0.7}>
            <AppText style={styles.changeRadiusText}>Change Radius</AppText>
            <ChevronDown size={12} color="#059669" style={{ marginLeft: 2 }} />
          </TouchableOpacity>
        </View>

        {/* BOOKING DETAILS CARD */}
        <View style={styles.detailsCard}>
          <View style={styles.detailsHeader}>
            <AppText style={styles.detailsTitle}>Booking Details</AppText>
            <View style={styles.autoRefreshBadge}>
              <RotateCw size={12} color="#059669" />
              <AppText style={styles.autoRefreshText}>Auto-refreshing...</AppText>
              <View style={styles.greenPulseDot} />
            </View>
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
                <AppText style={styles.gridTitle}>Service Location</AppText>
                <AppText style={styles.gridSub} numberOfLines={2}>
                  123, Vijay Nagar, Indore, Madhya Pradesh - 452010
                </AppText>
              </View>
            </View>

            {/* Cell 4: Requested Time */}
            <View style={styles.gridCell}>
              <View style={[styles.gridIconCircle, { backgroundColor: '#FFFBEB' }]}>
                <Clock size={18} color="#D97706" />
              </View>
              <View style={styles.gridCellText}>
                <AppText style={styles.gridTitle}>Requested Time</AppText>
                <AppText style={styles.gridSub}>
                  Today, 17 Sep 2026{'\n'}12:00 PM - 1:00 PM
                </AppText>
              </View>
            </View>
          </View>
        </View>

        {/* TIP CARD */}
        <View style={styles.tipCard}>
          <View style={styles.tipIconBox}>
            <Lightbulb size={18} color="#059669" />
          </View>
          <View style={styles.tipTextContainer}>
            <AppText style={styles.tipText}>
              <AppText style={styles.tipBold}>Tip:</AppText> We'll notify you as soon as a washerman accepts your request. This usually takes 1-3 minutes.
            </AppText>
          </View>
        </View>

        {/* CANCEL REQUEST BUTTON */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate(Routes.HOME_DASHBOARD)}
          activeOpacity={0.8}
        >
          <X size={16} color="#EF4444" style={{ marginRight: 6 }} />
          <AppText style={styles.cancelButtonText}>Cancel Request</AppText>
        </TouchableOpacity>

        <AppText style={styles.cancelSubtext}>
          You can cancel the request anytime before it's assigned.
        </AppText>

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
  radarContainer: {
    width: width - Spacing.lg * 2,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: Spacing.sm,
  },
  radarOuterCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    borderStyle: 'dashed',
    backgroundColor: '#F0FDF4',
  },
  radarMiddleCircle: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 1,
    borderColor: '#6EE7B7',
    backgroundColor: '#ECFDF5',
  },
  radarSweep: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderTopWidth: 4,
    borderTopColor: '#059669',
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
  avatarNode: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#10B981',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  nodeAvatar: {
    width: '100%',
    height: '100%',
  },
  findingTitleContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  findingTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  findingSubtitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  boldGreen: {
    fontFamily: FontFamily.bold,
    color: '#059669',
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
    width: 60,
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
    fontSize: 10,
    fontFamily: FontFamily.medium,
    color: Colors.textTertiary,
  },
  stepTitleActive: {
    fontSize: 10,
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
    marginBottom: 26,
  },
  stepLineActive: {
    backgroundColor: '#059669',
  },
  radiusCard: {
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
  radiusLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  radiusIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  radiusTextContainer: {
    flex: 1,
  },
  radiusTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radiusTitle: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
  },
  radiusValRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  radiusVal: {
    fontSize: Typography.fontSize.base,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  radiusDesc: {
    fontSize: 9,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  changeRadiusBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  changeRadiusText: {
    fontSize: 10,
    fontFamily: FontFamily.bold,
    color: '#059669',
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
  autoRefreshBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  autoRefreshText: {
    fontSize: 10,
    fontFamily: FontFamily.medium,
    color: '#059669',
  },
  greenPulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
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
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    marginBottom: Spacing.lg,
  },
  tipIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  tipTextContainer: {
    flex: 1,
  },
  tipText: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: '#047857',
    lineHeight: 15,
  },
  tipBold: {
    fontFamily: FontFamily.bold,
    color: '#065F46',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    paddingVertical: 12,
    borderRadius: BorderRadius.full,
    marginBottom: 6,
  },
  cancelButtonText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: '#EF4444',
  },
  cancelSubtext: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
});
