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
  Clock,
  MapPin,
  Compass,
  Star,
  CheckCircle2,
  Phone,
  MessageSquare,
  FileText,
  Lightbulb,
  Crosshair,
  Layers,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type WashermanArrivingNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.WASHERMAN_ARRIVING
>;

type WashermanArrivingRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.WASHERMAN_ARRIVING
>;

export const WashermanArrivingScreen: React.FC = () => {
  const navigation = useNavigation<WashermanArrivingNavProp>();
  const route = useRoute<WashermanArrivingRouteProp>();
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

  const handleSimulateArrived = () => {
    navigation.navigate(Routes.WASHERMAN_ARRIVED, { bookingId });
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
          <AppText style={styles.headerTitle}>Your Washerman is Almost There!</AppText>
          <AppText style={styles.headerSubtitle}>
            Get ready! He will arrive shortly.
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
            <AppText style={styles.statusBannerTitle}>Rakesh is arriving at your location</AppText>
            <AppText style={styles.statusBannerDesc}>
              Your car will be in good hands!
            </AppText>
          </View>
          <View style={styles.arrivingBadge}>
            <Clock size={12} color="#065F46" style={{ marginRight: 4 }} />
            <AppText style={styles.arrivingBadgeText}>Arriving Soon</AppText>
          </View>
        </View>

        {/* CLOSE-UP MAP VIEW */}
        <TouchableOpacity
          style={styles.mapContainer}
          onPress={handleSimulateArrived}
          activeOpacity={0.95}
        >
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

          {/* Close proximity polyline */}
          <View style={styles.closeRoutePolyline1} />
          <View style={styles.closeRoutePolyline2} />

          {/* Washerman Marker 500m away */}
          <View style={styles.mapWashermanMarker}>
            <View style={styles.markerBubble}>
              <Image
                source={{ uri: washerman.avatarUrl }}
                style={styles.markerAvatar}
              />
              <View>
                <AppText style={styles.markerName}>Rakesh</AppText>
                <AppText style={styles.markerDistance}>500 m away</AppText>
              </View>
            </View>
            <View style={styles.scooterMarkerBadge}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=100&q=80' }}
                style={styles.scooterMarkerImg}
              />
            </View>
          </View>

          {/* Destination Marker */}
          <View style={styles.mapDestinationMarker}>
            <View style={styles.destPinCircle}>
              <MapPin size={18} color="#FFFFFF" />
            </View>
            <View style={styles.destTag}>
              <AppText style={styles.destTagText}>Your Location</AppText>
            </View>
          </View>

          {/* Landmark Text */}
          <View style={styles.landmarkTag}>
            <AppText style={styles.landmarkTitle}>Indore</AppText>
            <AppText style={styles.landmarkSub}>इंदौर</AppText>
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
            <AppText style={styles.statValue}>3 mins</AppText>
            <AppText style={styles.statSubText}>9:44 AM</AppText>
          </View>

          {/* 2. Distance */}
          <View style={styles.statBox}>
            <View style={[styles.statIconCircle, { backgroundColor: '#EFF6FF' }]}>
              <MapPin size={16} color="#2563EB" />
            </View>
            <AppText style={styles.statLabel}>Distance</AppText>
            <AppText style={styles.statValue}>500 m</AppText>
            <AppText style={styles.statSubText}>Very close!</AppText>
          </View>

          {/* 3. Live Tracking */}
          <View style={styles.statBox}>
            <View style={[styles.statIconCircle, { backgroundColor: '#ECFDF5' }]}>
              <Compass size={16} color="#059669" />
            </View>
            <AppText style={styles.statLabel}>Live Tracking</AppText>
            <AppText style={[styles.statValue, { color: '#059669' }]}>On 🟢</AppText>
            <AppText style={styles.statSubText}>Real-time location</AppText>
          </View>
        </View>

        {/* WASHERMAN PROFILE & QUICK CONTACT */}
        <View style={styles.profileCard}>
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

          {/* Call & Chat Buttons */}
          <View style={styles.contactBtnGroup}>
            <TouchableOpacity
              style={styles.callSquareBtn}
              onPress={handleCall}
              activeOpacity={0.8}
            >
              <Phone size={18} color="#059669" />
              <AppText style={styles.callSquareBtnText}>Call</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.chatSquareBtn}
              onPress={handleChat}
              activeOpacity={0.8}
            >
              <MessageSquare size={18} color="#2563EB" />
              <AppText style={styles.chatSquareBtnText}>Chat</AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* VEHICLE & EQUIPMENT CARD */}
        <View style={styles.equipmentCard}>
          <View style={styles.equipmentHeader}>
            <Car size={18} color="#059669" />
            <AppText style={styles.equipmentHeaderTitle}>Vehicle & Equipment</AppText>
          </View>

          <View style={styles.equipmentContentRow}>
            {/* Scooter */}
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

            {/* Equipment Kit */}
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

        {/* ARRIVAL INSTRUCTIONS */}
        <View style={styles.instructionsCard}>
          <View style={styles.instructionsHeader}>
            <FileText size={18} color="#059669" />
            <AppText style={styles.instructionsHeaderTitle}>Arrival Instructions</AppText>
          </View>

          <View style={styles.instructionPoints}>
            <AppText style={styles.instructionPoint}>•  I will call you before arriving</AppText>
            <AppText style={styles.instructionPoint}>•  Parked inside the apartment (Tower B)</AppText>
            <AppText style={styles.instructionPoint}>•  Use low-water wash</AppText>
            <AppText style={styles.instructionPoint}>•  Please don't move the vehicle</AppText>
          </View>
        </View>

        {/* TIP CARD */}
        <View style={styles.tipCard}>
          <View style={styles.tipIconBox}>
            <Lightbulb size={18} color="#059669" />
          </View>
          <View style={styles.tipTextWrap}>
            <AppText style={styles.tipText}>
              <AppText style={styles.tipBold}>Tip:</AppText> Keep your vehicle accessible for a faster service experience.
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
    flexDirection: 'row',
    alignItems: 'center',
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
    height: 250,
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
  closeRoutePolyline1: {
    position: 'absolute',
    top: 90,
    left: 100,
    width: 35,
    height: 60,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderColor: '#2563EB',
  },
  closeRoutePolyline2: {
    position: 'absolute',
    top: 146,
    left: 131,
    width: 95,
    height: 50,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#2563EB',
  },
  mapWashermanMarker: {
    position: 'absolute',
    top: 55,
    left: 70,
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
    bottom: 35,
    right: 45,
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
  landmarkTag: {
    position: 'absolute',
    top: 155,
    left: '40%',
    alignItems: 'center',
  },
  landmarkTitle: {
    fontSize: 14,
    fontFamily: FontFamily.bold,
    color: '#1F2937',
  },
  landmarkSub: {
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
  statSubText: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 1,
    textAlign: 'center',
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
  contactBtnGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  callSquareBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  callSquareBtnText: {
    fontSize: 10,
    fontFamily: FontFamily.bold,
    color: '#059669',
    marginTop: 2,
  },
  chatSquareBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  chatSquareBtnText: {
    fontSize: 10,
    fontFamily: FontFamily.bold,
    color: '#2563EB',
    marginTop: 2,
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
  instructionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  instructionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  instructionsHeaderTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  instructionPoints: {
    gap: 4,
  },
  instructionPoint: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#D1FAE5',
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
  tipTextWrap: {
    flex: 1,
  },
  tipText: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: '#047857',
    lineHeight: 14,
  },
  tipBold: {
    fontFamily: FontFamily.bold,
    color: '#065F46',
  },
});
