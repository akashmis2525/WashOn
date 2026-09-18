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
  Car,
  Clock,
  Phone,
  MessageSquare,
  Award,
  Calendar,
  Star,
  ShieldCheck,
  Leaf,
  Navigation,
  MapPin,
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

type BookingAcceptedNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.BOOKING_ACCEPTED
>;

type BookingAcceptedRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.BOOKING_ACCEPTED
>;

export const BookingAcceptedScreen: React.FC = () => {
  const navigation = useNavigation<BookingAcceptedNavProp>();
  const route = useRoute<BookingAcceptedRouteProp>();
  const { draft, activeBooking } = useBookingStore();

  const bookingId = route.params?.bookingId || activeBooking?.id || 'bk_demo_001';
  const washerman = draft.washerman || {
    id: 'wsh_001',
    name: 'Rakesh Kumar',
    rating: 4.8,
    totalReviews: 320,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    experienceYears: 2,
    completedServices: 500,
    phone: '+919876543210',
  };

  const handleCall = () => {
    Linking.openURL(`tel:+919876543210`);
  };

  const handleChat = () => {
    navigation.navigate(Routes.SUPPORT_CHAT);
  };

  const handleTrack = () => {
    navigation.navigate(Routes.LIVE_TRACKING, { bookingId });
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
          <AppText style={styles.headerTitle}>Booking Accepted</AppText>
          <AppText style={styles.headerSubtitle}>
            Your washerman is on the way!
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
        {/* GREAT NEWS BANNER */}
        <View style={styles.bannerCard}>
          <View style={styles.bannerIconCircle}>
            <CheckCircle2 size={24} color="#059669" />
          </View>
          <View style={styles.bannerTextContainer}>
            <AppText style={styles.bannerTitle}>Great News!</AppText>
            <AppText style={styles.bannerDesc}>
              A washerman has accepted your booking. Get ready for a clean ride!
            </AppText>
          </View>
        </View>

        {/* WASHERMAN PROFILE CARD */}
        <View style={styles.profileCard}>
          <View style={styles.profileLeft}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: washerman.avatarUrl }}
                style={styles.avatarImg}
              />
              <View style={styles.onlinePill}>
                <View style={styles.greenDot} />
                <AppText style={styles.onlinePillText}>Online</AppText>
              </View>
            </View>

            <View style={styles.profileMainInfo}>
              <AppText style={styles.roleLabel}>Washerman</AppText>
              <AppText style={styles.washermanName}>{washerman.name}</AppText>
              <View style={styles.ratingRow}>
                <Star size={13} color="#F59E0B" fill="#F59E0B" />
                <AppText style={styles.ratingText}> 4.8 (320 reviews)</AppText>
              </View>
              <View style={styles.verifiedBadge}>
                <CheckCircle2 size={11} color="#059669" />
                <AppText style={styles.verifiedBadgeText}>Verified</AppText>
              </View>
            </View>
          </View>

          <View style={styles.profileRightStats}>
            <View style={styles.statItem}>
              <View style={[styles.statIconBox, { backgroundColor: '#ECFDF5' }]}>
                <Award size={14} color="#059669" />
              </View>
              <View>
                <AppText style={styles.statVal}>2+ Years</AppText>
                <AppText style={styles.statLbl}>Experience</AppText>
              </View>
            </View>

            <View style={[styles.statItem, { marginTop: Spacing.xs }]}>
              <View style={[styles.statIconBox, { backgroundColor: '#EFF6FF' }]}>
                <Calendar size={14} color="#2563EB" />
              </View>
              <View>
                <AppText style={styles.statVal}>500+</AppText>
                <AppText style={styles.statLbl}>Services Completed</AppText>
              </View>
            </View>
          </View>
        </View>

        {/* 2-COLUMN STATUS CARDS */}
        <View style={styles.statusRow}>
          {/* Left: On the way */}
          <View style={styles.statusColCard}>
            <View style={[styles.statusIconBox, { backgroundColor: '#ECFDF5' }]}>
              <Car size={20} color="#059669" />
            </View>
            <AppText style={styles.statusCardTitle}>On the way to you</AppText>
            <AppText style={styles.statusCardDesc}>Rakesh is heading to your location.</AppText>
          </View>

          {/* Right: Estimated Arrival */}
          <View style={[styles.statusColCard, styles.statusColCardHighlight]}>
            <View style={styles.etaHeaderRow}>
              <View style={[styles.statusIconBox, { backgroundColor: '#D1FAE5' }]}>
                <Clock size={20} color="#059669" />
              </View>
              <AppText style={styles.etaLabel}>Estimated Arrival</AppText>
            </View>
            <AppText style={styles.etaTimeLarge}>12 mins</AppText>
            <AppText style={styles.etaTimeSub}>10:52 AM</AppText>
          </View>
        </View>

        {/* MINI MAP ROUTE PREVIEW CARD */}
        <View style={styles.mapCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=500&q=80' }}
            style={styles.mapImageBg}
          />
          {/* Overlay Route Elements */}
          <View style={styles.mapOverlay}>
            {/* Washerman Node */}
            <View style={styles.mapWashermanCallout}>
              <Image
                source={{ uri: washerman.avatarUrl }}
                style={styles.mapCalloutAvatar}
              />
              <View>
                <AppText style={styles.mapCalloutTitle}>Rakesh is on the way</AppText>
                <AppText style={styles.mapCalloutDistance}>2.3 km away</AppText>
              </View>
            </View>

            {/* Scooter in transit */}
            <View style={styles.scooterMarker}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=100&q=80' }}
                style={styles.scooterImg}
              />
            </View>

            {/* Destination Marker */}
            <View style={styles.destinationMarker}>
              <View style={styles.destCircle}>
                <MapPin size={18} color="#FFFFFF" />
              </View>
              <View style={styles.destBadge}>
                <AppText style={styles.destBadgeText}>Your Location</AppText>
              </View>
            </View>
          </View>
        </View>

        {/* CALL & CHAT BUTTONS */}
        <View style={styles.commActionRow}>
          <TouchableOpacity
            style={styles.callButton}
            onPress={handleCall}
            activeOpacity={0.8}
          >
            <Phone size={18} color="#059669" style={{ marginRight: 6 }} />
            <AppText style={styles.callButtonText}>Call</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.chatButton}
            onPress={handleChat}
            activeOpacity={0.8}
          >
            <MessageSquare size={18} color="#2563EB" style={{ marginRight: 6 }} />
            <AppText style={styles.chatButtonText}>Chat</AppText>
          </TouchableOpacity>
        </View>

        {/* WASHERMAN VEHICLE & EQUIPMENT CARD */}
        <View style={styles.equipmentCard}>
          <View style={styles.equipmentHeader}>
            <Car size={18} color="#059669" />
            <AppText style={styles.equipmentHeaderTitle}>
              Washerman Vehicle & Equipment
            </AppText>
          </View>

          <View style={styles.equipmentContentRow}>
            {/* Scooter info */}
            <View style={styles.equipmentItem}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=120&q=80' }}
                style={styles.equipThumb}
              />
              <View style={styles.equipTextWrap}>
                <AppText style={styles.equipTitle}>Honda Activa</AppText>
                <AppText style={styles.equipSub}>MP 09 AB 4321</AppText>
              </View>
            </View>

            {/* Equipment Kit info */}
            <View style={styles.equipmentItem}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=120&q=80' }}
                style={styles.equipThumb}
              />
              <View style={styles.equipTextWrap}>
                <AppText style={styles.equipTitle}>Professional Equipment</AppText>
                <AppText style={styles.equipSub} numberOfLines={2}>
                  High Pressure Washer, Eco-friendly Cleaners, Microfiber Cloth
                </AppText>
              </View>
            </View>
          </View>
        </View>

        {/* ECO FRIENDLY SERVICE BANNER */}
        <View style={styles.ecoBanner}>
          <View style={styles.ecoIconBox}>
            <Leaf size={18} color="#059669" />
          </View>
          <View style={styles.ecoTextWrap}>
            <AppText style={styles.ecoTitle}>Eco-Friendly Service</AppText>
            <AppText style={styles.ecoDesc}>
              Uses minimal water and environment friendly products.
            </AppText>
          </View>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* STICKY BOTTOM BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.trackButton}
          onPress={handleTrack}
          activeOpacity={0.88}
        >
          <MapPin size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
          <AppText style={styles.trackButtonText}>Track Washerman</AppText>
          <ArrowRight size={18} color="#FFFFFF" style={{ marginLeft: 6 }} />
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
  bannerIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  bannerTextContainer: {
    flex: 1,
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
    lineHeight: 16,
  },
  profileCard: {
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
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: Spacing.sm,
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3F4F6',
  },
  onlinePill: {
    position: 'absolute',
    bottom: -4,
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
    gap: 3,
  },
  greenDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#10B981',
  },
  onlinePillText: {
    fontSize: 8,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  profileMainInfo: {
    flex: 1,
  },
  roleLabel: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
  },
  washermanName: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
    marginTop: 1,
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
    gap: 2,
  },
  verifiedBadgeText: {
    fontSize: 9,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  profileRightStats: {
    borderLeftWidth: 1,
    borderLeftColor: '#F3F4F6',
    paddingLeft: Spacing.sm,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statIconBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statVal: {
    fontSize: 10,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  statLbl: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
  },
  statusRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  statusColCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...Shadows.sm,
  },
  statusColCardHighlight: {
    backgroundColor: '#F0FDF4',
    borderColor: '#A7F3D0',
  },
  statusIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statusCardTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#065F46',
  },
  statusCardDesc: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 14,
  },
  etaHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  etaLabel: {
    fontSize: 10,
    fontFamily: FontFamily.medium,
    color: '#065F46',
  },
  etaTimeLarge: {
    fontSize: 22,
    fontFamily: FontFamily.bold,
    color: '#059669',
    marginTop: 4,
  },
  etaTimeSub: {
    fontSize: 10,
    fontFamily: FontFamily.medium,
    color: '#047857',
  },
  mapCard: {
    width: width - Spacing.lg * 2,
    height: 140,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...Shadows.sm,
  },
  mapImageBg: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: Spacing.sm,
    justifyContent: 'space-between',
  },
  mapWashermanCallout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.lg,
    alignSelf: 'flex-start',
    gap: 6,
    ...Shadows.md,
  },
  mapCalloutAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  mapCalloutTitle: {
    fontSize: 9,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  mapCalloutDistance: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: '#059669',
  },
  scooterMarker: {
    position: 'absolute',
    top: 55,
    left: 90,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#059669',
    ...Shadows.sm,
  },
  scooterImg: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  destinationMarker: {
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  destCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  destBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
    ...Shadows.xs,
  },
  destBadgeText: {
    fontSize: 8,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  commActionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
    paddingVertical: 12,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  callButtonText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  chatButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 12,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  chatButtonText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: '#2563EB',
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
  equipmentContentRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  equipmentItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  equipThumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    marginRight: Spacing.xs,
  },
  equipTextWrap: {
    flex: 1,
  },
  equipTitle: {
    fontSize: 10,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  equipSub: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 11,
  },
  ecoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    marginBottom: Spacing.md,
  },
  ecoIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  ecoTextWrap: {
    flex: 1,
  },
  ecoTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#065F46',
  },
  ecoDesc: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: '#047857',
    marginTop: 1,
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
  trackButton: {
    backgroundColor: '#059669',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: BorderRadius.full,
    ...Shadows.sm,
  },
  trackButtonText: {
    fontSize: Typography.fontSize.base,
    fontFamily: FontFamily.bold,
    color: '#FFFFFF',
  },
});
