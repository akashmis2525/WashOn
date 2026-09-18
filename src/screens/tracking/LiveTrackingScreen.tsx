import React, { useState } from 'react';
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
  Clock,
  MapPin,
  Compass,
  Star,
  CheckCircle2,
  Phone,
  MessageSquare,
  X,
  ShieldCheck,
  Crosshair,
  Layers,
  ChevronRight,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type LiveTrackingNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.LIVE_TRACKING
>;

type LiveTrackingRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.LIVE_TRACKING
>;

export const LiveTrackingScreen: React.FC = () => {
  const navigation = useNavigation<LiveTrackingNavProp>();
  const route = useRoute<LiveTrackingRouteProp>();
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

  const handleSimulateArriving = () => {
    navigation.navigate(Routes.WASHERMAN_ARRIVING, { bookingId });
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
          <AppText style={styles.headerTitle}>Live Tracking</AppText>
          <AppText style={styles.headerSubtitle}>
            Your washerman is on the way
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
        {/* STATUS BANNER */}
        <View style={styles.statusBanner}>
          <View style={styles.statusBannerIcon}>
            <Car size={20} color="#059669" />
          </View>
          <View style={styles.statusBannerText}>
            <AppText style={styles.statusBannerTitle}>Rakesh is on the way</AppText>
            <AppText style={styles.statusBannerDesc}>
              Sit back and relax. Your car will be in good hands!
            </AppText>
          </View>
          <View style={styles.arrivingBadge}>
            <AppText style={styles.arrivingBadgeText}>Arriving Soon</AppText>
          </View>
        </View>

        {/* MAP VIEW WITH REALISTIC INDORE ROUTE */}
        <TouchableOpacity
          style={styles.mapContainer}
          onPress={handleSimulateArriving}
          activeOpacity={0.95}
        >
          {/* Map Base Image */}
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80' }}
            style={styles.mapImage}
          />

          {/* Floating Map Controls */}
          <View style={styles.mapControls}>
            <TouchableOpacity style={styles.mapCtrlBtn} activeOpacity={0.7}>
              <Crosshair size={18} color="#4B5563" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mapCtrlBtn} activeOpacity={0.7}>
              <Layers size={18} color="#4B5563" />
            </TouchableOpacity>
          </View>

          {/* Simulated Route Polyline Drawing */}
          <View style={styles.routePolylineSegment1} />
          <View style={styles.routePolylineSegment2} />
          <View style={styles.routePolylineSegment3} />

          {/* Washerman Callout Marker on Map */}
          <View style={styles.mapWashermanMarker}>
            <View style={styles.markerBubble}>
              <Image
                source={{ uri: washerman.avatarUrl }}
                style={styles.markerAvatar}
              />
              <View>
                <AppText style={styles.markerName}>Rakesh</AppText>
                <AppText style={styles.markerDistance}>2.8 km away</AppText>
              </View>
            </View>
            {/* Scooter Badge */}
            <View style={styles.scooterMarkerBadge}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=100&q=80' }}
                style={styles.scooterMarkerImg}
              />
            </View>
          </View>

          {/* Destination Marker on Map */}
          <View style={styles.mapDestinationMarker}>
            <View style={styles.destPinCircle}>
              <MapPin size={18} color="#FFFFFF" />
            </View>
            <View style={styles.destTag}>
              <AppText style={styles.destTagText}>Your Location</AppText>
            </View>
          </View>

          {/* Indore Landmark Labels */}
          <View style={styles.landmarkTag1}>
            <AppText style={styles.landmarkText}>Vijay Nagar</AppText>
          </View>
          <View style={styles.landmarkTag2}>
            <AppText style={styles.landmarkCenterTitle}>Indore</AppText>
            <AppText style={styles.landmarkCenterSub}>इंदौर</AppText>
          </View>
        </TouchableOpacity>

        {/* 3-COLUMN LIVE STATS */}
        <View style={styles.statsRow}>
          {/* 1. Estimated Arrival */}
          <View style={styles.statBox}>
            <View style={[styles.statIconCircle, { backgroundColor: '#ECFDF5' }]}>
              <Clock size={16} color="#059669" />
            </View>
            <AppText style={styles.statLabel}>Estimated Arrival</AppText>
            <AppText style={styles.statValue}>12 mins</AppText>
            <AppText style={styles.statSubText}>10:52 AM</AppText>
          </View>

          {/* 2. Distance */}
          <View style={styles.statBox}>
            <View style={[styles.statIconCircle, { backgroundColor: '#EFF6FF' }]}>
              <MapPin size={16} color="#2563EB" />
            </View>
            <AppText style={styles.statLabel}>Distance</AppText>
            <AppText style={styles.statValue}>2.8 km</AppText>
            <AppText style={styles.statSubText}>Rakesh is nearby</AppText>
          </View>

          {/* 3. Route */}
          <View style={styles.statBox}>
            <View style={[styles.statIconCircle, { backgroundColor: '#F0FDF4' }]}>
              <Compass size={16} color="#059669" />
            </View>
            <AppText style={styles.statLabel}>Route</AppText>
            <AppText style={styles.statValueRoute} numberOfLines={1}>Fastest route</AppText>
            <AppText style={styles.statSubText}>via M.G. Road</AppText>
          </View>
        </View>

        {/* WASHERMAN PROFILE & VEHICLE CARD */}
        <View style={styles.profileCard}>
          <View style={styles.profileCardTop}>
            <View style={styles.profileLeft}>
              <Image
                source={{ uri: washerman.avatarUrl }}
                style={styles.washermanAvatar}
              />
              <View style={styles.profileText}>
                <AppText style={styles.washermanName}>{washerman.name}</AppText>
                <View style={styles.ratingRow}>
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <AppText style={styles.ratingText}> 4.8 (320 reviews)</AppText>
                </View>
                <View style={styles.verifiedBadge}>
                  <CheckCircle2 size={10} color="#059669" />
                  <AppText style={styles.verifiedBadgeText}>Verified Washerman</AppText>
                </View>
              </View>
            </View>

            {/* Scooter Thumbnail */}
            <View style={styles.vehicleRight}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=120&q=80' }}
                style={styles.scooterThumb}
              />
              <View>
                <AppText style={styles.scooterTitle}>Honda Activa</AppText>
                <AppText style={styles.scooterNumber}>MP 09 AB 4321</AppText>
              </View>
            </View>
          </View>

          {/* Sub Notification Bar */}
          <View style={styles.subNotificationBar}>
            <Clock size={14} color="#059669" style={{ marginRight: 6 }} />
            <AppText style={styles.subNotificationText}>
              Rakesh is on the way to your location. He will reach in 12 minutes.
            </AppText>
          </View>
        </View>

        {/* 3 ACTION BUTTONS (CALL / CHAT / CANCEL) */}
        <View style={styles.actionButtonsRow}>
          {/* Call */}
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

          {/* Chat */}
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

          {/* Cancel */}
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.navigate(Routes.HOME_DASHBOARD)}
            activeOpacity={0.8}
          >
            <X size={16} color="#DC2626" style={{ marginRight: 4 }} />
            <View>
              <AppText style={styles.cancelBtnText}>Cancel</AppText>
              <AppText style={styles.cancelSubText}>Booking</AppText>
            </View>
          </TouchableOpacity>
        </View>

        {/* SAFETY ASSURANCE CARD */}
        <View style={styles.safetyCard}>
          <ShieldCheck size={20} color="#059669" />
          <View style={styles.safetyTextWrap}>
            <AppText style={styles.safetyTitle}>Your safety is our priority</AppText>
            <AppText style={styles.safetyDesc}>
              All washermen are verified and background checked.
            </AppText>
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
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  statusBannerIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  statusBannerText: {
    flex: 1,
  },
  statusBannerTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#065F46',
  },
  statusBannerDesc: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: '#047857',
    marginTop: 1,
  },
  arrivingBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  arrivingBadgeText: {
    fontSize: 9,
    fontFamily: FontFamily.bold,
    color: '#065F46',
  },
  mapContainer: {
    width: width - Spacing.lg * 2,
    height: 280,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...Shadows.md,
  },
  mapImage: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  mapControls: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    gap: Spacing.xs,
  },
  mapCtrlBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  routePolylineSegment1: {
    position: 'absolute',
    top: 95,
    left: 95,
    width: 25,
    height: 60,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderColor: '#2563EB',
  },
  routePolylineSegment2: {
    position: 'absolute',
    top: 151,
    left: 118,
    width: 90,
    height: 45,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#2563EB',
  },
  routePolylineSegment3: {
    position: 'absolute',
    top: 192,
    left: 205,
    width: 90,
    height: 40,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#2563EB',
  },
  mapWashermanMarker: {
    position: 'absolute',
    top: 60,
    left: 60,
    alignItems: 'center',
  },
  markerBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.lg,
    gap: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...Shadows.md,
  },
  markerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  markerName: {
    fontSize: 9,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  markerDistance: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: '#059669',
  },
  scooterMarkerBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#059669',
    marginTop: 4,
    ...Shadows.sm,
  },
  scooterMarkerImg: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  mapDestinationMarker: {
    position: 'absolute',
    bottom: 40,
    right: 35,
    alignItems: 'center',
  },
  destPinCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    ...Shadows.md,
  },
  destTag: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
    ...Shadows.xs,
  },
  destTagText: {
    fontSize: 8,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  landmarkTag1: {
    position: 'absolute',
    top: 140,
    left: 20,
  },
  landmarkText: {
    fontSize: 10,
    fontFamily: FontFamily.medium,
    color: '#4B5563',
  },
  landmarkTag2: {
    position: 'absolute',
    top: 160,
    left: '42%',
    alignItems: 'center',
  },
  landmarkCenterTitle: {
    fontSize: 14,
    fontFamily: FontFamily.bold,
    color: '#1F2937',
  },
  landmarkCenterSub: {
    fontSize: 10,
    fontFamily: FontFamily.medium,
    color: '#4B5563',
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...Shadows.sm,
  },
  statIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 9,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
  statValue: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: '#059669',
    marginTop: 2,
  },
  statValueRoute: {
    fontSize: 10,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
    marginTop: 2,
  },
  statSubText: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 1,
    textAlign: 'center',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  profileCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  washermanAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    marginRight: Spacing.sm,
  },
  profileText: {
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
    fontSize: 10,
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
  vehicleRight: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#F3F4F6',
    paddingLeft: Spacing.sm,
  },
  scooterThumb: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    marginRight: 6,
  },
  scooterTitle: {
    fontSize: 10,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  scooterNumber: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  subNotificationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    marginTop: Spacing.sm,
  },
  subNotificationText: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: '#047857',
    flex: 1,
  },
  actionButtonsRow: {
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
    fontSize: 8,
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
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: '#1D4ED8',
  },
  cancelBtn: {
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
  cancelBtnText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#DC2626',
  },
  cancelSubText: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: '#B91C1C',
  },
  safetyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: Spacing.sm,
  },
  safetyTextWrap: {
    flex: 1,
  },
  safetyTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#0F172A',
  },
  safetyDesc: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
});
