import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  SlidersHorizontal,
  List,
  MapPin,
  ChevronDown,
  Star,
  Clock,
  Heart,
  ArrowRight,
  Crosshair,
  Home,
  Calendar,
  Compass,
  MessageSquare,
  User,
} from 'lucide-react-native';
import Svg, { Path, Circle, Rect, G, Text as SvgText } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { mockWashermen } from '../../mocks/washermen';
import { useBookingStore } from '../../store/bookingStore';

const { width, height } = Dimensions.get('window');

type NearbyWashermenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.NEARBY_WASHERMEN_MAP
>;

interface MapWashermanMarker {
  id: string;
  name: string;
  fullName: string;
  distance: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  isOnline: boolean;
  avatarUrl: string;
  x: number;
  y: number;
  tag?: string;
}

export const NearbyWashermenMapScreen: React.FC = () => {
  const navigation = useNavigation<NearbyWashermenNavigationProp>();
  const { setDraftWasherman } = useBookingStore();

  const washermenMarkers: MapWashermanMarker[] = [
    {
      id: 'wsh_001',
      name: 'Rakesh',
      fullName: 'Rakesh Kumar',
      distance: '0.8 km',
      rating: 4.8,
      reviewCount: 320,
      startingPrice: 149,
      isOnline: true,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
      x: 120,
      y: 110,
      tag: 'Top Rated',
    },
    {
      id: 'wsh_002',
      name: 'Sameer',
      fullName: 'Sameer Khan',
      distance: '1.5 km',
      rating: 4.6,
      reviewCount: 210,
      startingPrice: 199,
      isOnline: true,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      x: 270,
      y: 130,
    },
    {
      id: 'wsh_003',
      name: 'Amit',
      fullName: 'Amit Sharma',
      distance: '1.2 km',
      rating: 4.7,
      reviewCount: 185,
      startingPrice: 149,
      isOnline: true,
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
      x: 75,
      y: 200,
    },
    {
      id: 'wsh_004',
      name: 'Vikash',
      fullName: 'Vikash Singh',
      distance: '2.1 km',
      rating: 4.5,
      reviewCount: 154,
      startingPrice: 179,
      isOnline: true,
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80',
      x: 255,
      y: 250,
    },
    {
      id: 'wsh_005',
      name: 'Suresh',
      fullName: 'Suresh Patel',
      distance: '1.8 km',
      rating: 4.9,
      reviewCount: 410,
      startingPrice: 149,
      isOnline: true,
      avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&q=80',
      x: 90,
      y: 285,
    },
  ];

  const [selectedWasherman, setSelectedWasherman] = useState<MapWashermanMarker>(
    washermenMarkers[0]
  );
  const [isFavorite, setIsFavorite] = useState(false);

  const handleBookNow = () => {
    const fullWasherman = mockWashermen.find((w) => w.id === selectedWasherman.id) || mockWashermen[0];
    setDraftWasherman(fullWasherman);
    navigation.navigate(Routes.WASHERMAN_PROFILE, { washermanId: selectedWasherman.id });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={22} color={Colors.black} />
        </TouchableOpacity>

        <View style={styles.logoWrapper}>
          <Image
            source={require('../../assets/images/logo.jpg')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Heading and Location Bar */}
      <View style={styles.topControlSection}>
        <View style={styles.titleBlock}>
          <AppText style={styles.mainHeading}>Nearby Washermen</AppText>
          <AppText style={styles.subHeading}>Find trusted professionals near you</AppText>
        </View>

        {/* Location Dropdown Bar */}
        <TouchableOpacity
          style={styles.locationPillBar}
          onPress={() => navigation.navigate(Routes.LOCATION_SELECTION)}
          activeOpacity={0.8}
        >
          <MapPin size={16} color="#111827" />
          <AppText style={styles.locationText} numberOfLines={1}>
            Vijay Nagar, Indore, Madhya Pradesh
          </AppText>
          <AppText style={styles.changeLinkText}>Change ▾</AppText>
        </TouchableOpacity>

        {/* Action Buttons: Filters & List View */}
        <View style={styles.filterActionsRow}>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => navigation.navigate(Routes.WASHERMAN_FILTER)}
            activeOpacity={0.8}
          >
            <SlidersHorizontal size={14} color="#111827" />
            <AppText style={styles.filterBtnText}>Filters</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => navigation.navigate(Routes.WASHERMAN_LIST_VIEW)}
            activeOpacity={0.8}
          >
            <List size={14} color="#111827" />
            <AppText style={styles.filterBtnText}>List View</AppText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Interactive Map Visual Area */}
      <View style={styles.mapArea}>
        <Svg width="100%" height="100%" viewBox="0 0 380 440" preserveAspectRatio="none">
          {/* Map Base Canvas */}
          <Rect x="0" y="0" width="380" height="440" fill="#E8EFF5" />

          {/* Green Parks */}
          <Path d="M190 20 C240 10, 270 40, 260 80 L180 70 Z" fill="#DCFCE7" opacity="0.8" />
          <Path d="M20 280 C60 270, 90 300, 80 340 L10 330 Z" fill="#DCFCE7" opacity="0.8" />
          <Path d="M280 320 C340 310, 370 340, 360 390 L270 380 Z" fill="#DCFCE7" opacity="0.8" />

          {/* Road Grid */}
          <Path d="M0 80 L380 60" stroke="#FFFFFF" strokeWidth="8" />
          <Path d="M0 160 L380 140" stroke="#FFFFFF" strokeWidth="9" />
          <Path d="M0 240 L380 220" stroke="#FFFFFF" strokeWidth="8" />
          <Path d="M0 320 L380 310" stroke="#FFFFFF" strokeWidth="7" />
          <Path d="M80 0 L70 440" stroke="#FFFFFF" strokeWidth="8" />
          <Path d="M170 0 L160 440" stroke="#FFFFFF" strokeWidth="8" />
          <Path d="M270 0 L250 440" stroke="#FDE047" strokeWidth="9" />
          <Path d="M340 0 L330 440" stroke="#FFFFFF" strokeWidth="6" />

          {/* Landmark Text Labels */}
          <SvgText x="175" y="150" fill="#334155" fontSize="11" fontWeight="bold" textAnchor="middle">
            Vijay Nagar
          </SvgText>
          <SvgText x="175" y="162" fill="#64748B" fontSize="9" textAnchor="middle">
            विजय नगर
          </SvgText>

          <SvgText x="60" y="240" fill="#475569" fontSize="9" fontWeight="bold">
            Scheme No. 78
          </SvgText>
          <SvgText x="60" y="380" fill="#334155" fontSize="10" fontWeight="bold">
            Bhawarkua
          </SvgText>
          <SvgText x="230" y="300" fill="#334155" fontSize="10" fontWeight="bold">
            Indore Central
          </SvgText>

          {/* CHL Hospital Landmark Pin */}
          <G transform="translate(70, 165)">
            <Circle cx="8" cy="8" r="8" fill="#EF4444" />
            <SvgText x="8" y="11.5" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">
              H
            </SvgText>
            <SvgText x="20" y="8" fill="#B91C1C" fontSize="8" fontWeight="bold">
              CHL Hospital
            </SvgText>
          </G>

          {/* Sayaji Hotel Pin */}
          <G transform="translate(250, 165)">
            <Circle cx="8" cy="8" r="8" fill="#EC4899" />
            <SvgText x="20" y="8" fill="#BE185D" fontSize="8" fontWeight="bold">
              Sayaji Hotel
            </SvgText>
          </G>

          {/* Center User Pin (You are here) */}
          <G transform="translate(190, 210)">
            <Circle cx="0" cy="0" r="30" fill="#38BDF8" opacity="0.3" />
            <Circle cx="0" cy="0" r="16" fill="#0284C7" opacity="0.4" />
            <Circle cx="0" cy="0" r="7" fill="#0284C7" />
            <Circle cx="0" cy="0" r="3" fill="#FFFFFF" />
          </G>
        </Svg>

        {/* Floating "You are here" Tooltip */}
        <View style={styles.userLocationBadge}>
          <AppText style={styles.userLocationBadgeText}>You are here</AppText>
        </View>

        {/* Floating Marker Cards for Washermen */}
        {washermenMarkers.map((w) => {
          const isSelected = selectedWasherman.id === w.id;
          return (
            <TouchableOpacity
              key={w.id}
              style={[
                styles.mapMarkerPill,
                { left: w.x - 40, top: w.y - 35 },
                isSelected && styles.mapMarkerPillSelected,
              ]}
              onPress={() => setSelectedWasherman(w)}
              activeOpacity={0.88}
            >
              {/* Avatar with yellow ring & online dot */}
              <View style={styles.markerAvatarContainer}>
                <Image source={{ uri: w.avatarUrl }} style={styles.markerAvatar} />
                {w.isOnline && <View style={styles.onlineDot} />}
              </View>

              {/* Marker Mini Info */}
              <View style={styles.markerInfoBlock}>
                <AppText style={styles.markerName}>{w.name}</AppText>
                <View style={styles.markerSubRow}>
                  <AppText style={styles.markerDistance}>{w.distance}</AppText>
                  <Star size={9} color="#EAB308" fill="#EAB308" />
                  <AppText style={styles.markerRating}>{w.rating}</AppText>
                </View>
                <AppText style={styles.markerPrice}>From ₹{w.startingPrice}</AppText>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Floating GPS Recenter Button */}
        <TouchableOpacity style={styles.recenterButton} activeOpacity={0.8}>
          <Crosshair size={20} color="#111827" />
        </TouchableOpacity>
      </View>

      {/* Bottom Floating Washerman Details Card */}
      <View style={styles.selectedWashermanCard}>
        <View style={styles.dragHandle} />

        <View style={styles.washermanCardRow}>
          {/* Avatar & Online Tag */}
          <View style={styles.cardAvatarBlock}>
            <Image
              source={{ uri: selectedWasherman.avatarUrl }}
              style={styles.cardAvatar}
            />
            <View style={styles.onlineBadge}>
              <AppText style={styles.onlineBadgeText}>Online</AppText>
            </View>
          </View>

          {/* Details */}
          <View style={styles.cardInfoDetails}>
            <View style={styles.cardNameRow}>
              <AppText style={styles.cardWashermanName}>
                {selectedWasherman.fullName}
              </AppText>
              <TouchableOpacity
                onPress={() => setIsFavorite(!isFavorite)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Heart
                  size={18}
                  color={isFavorite ? '#EF4444' : '#9CA3AF'}
                  fill={isFavorite ? '#EF4444' : 'none'}
                />
              </TouchableOpacity>
            </View>

            {/* Rating */}
            <View style={styles.ratingRow}>
              <Star size={13} color="#EAB308" fill="#EAB308" />
              <AppText style={styles.ratingScore}>{selectedWasherman.rating}</AppText>
              <AppText style={styles.reviewCountText}>
                ({selectedWasherman.reviewCount} reviews)
              </AppText>
            </View>

            {/* Distance & Price */}
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <MapPin size={12} color={Colors.gray500} />
                <AppText style={styles.metaText}>{selectedWasherman.distance} away</AppText>
              </View>
            </View>
            <View style={styles.metaRow}>
              <AppText style={styles.startingPriceText}>
                ₹ Starting from ₹{selectedWasherman.startingPrice}
              </AppText>
            </View>

            {/* Available Now & Tag */}
            <View style={styles.availabilityRow}>
              <Clock size={12} color="#059669" />
              <AppText style={styles.availableNowText}>Available Now</AppText>
              {selectedWasherman.tag && (
                <View style={styles.topRatedBadge}>
                  <AppText style={styles.topRatedText}>{selectedWasherman.tag}</AppText>
                </View>
              )}
            </View>
          </View>

          {/* Book Now Button */}
          <View style={styles.cardActionBlock}>
            <TouchableOpacity
              style={styles.bookNowBtn}
              onPress={handleBookNow}
              activeOpacity={0.88}
            >
              <AppText style={styles.bookNowBtnText}>Book Now</AppText>
              <ArrowRight size={14} color={Colors.black} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Bottom 5-Tab Bar */}
      <View style={styles.bottomNavContainer}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate(Routes.HOME_DASHBOARD)}>
          <Home size={20} color="#9CA3AF" />
          <AppText style={styles.navLabelInactive}>Home</AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate(Routes.UPCOMING_BOOKINGS)}>
          <Calendar size={20} color="#9CA3AF" />
          <AppText style={styles.navLabelInactive}>Bookings</AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Compass size={22} color="#D97706" />
          <AppText style={styles.navLabelActive}>Find Washermen</AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate(Routes.HELP_SUPPORT)}>
          <MessageSquare size={20} color="#9CA3AF" />
          <AppText style={styles.navLabelInactive}>Messages</AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate(Routes.CUSTOMER_PROFILE)}>
          <User size={20} color="#9CA3AF" />
          <AppText style={styles.navLabelInactive}>Profile</AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    height: 38,
    width: 120,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  topControlSection: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.sm,
  },
  titleBlock: {
    marginTop: 2,
    marginBottom: Spacing.xs,
  },
  mainHeading: {
    fontFamily: FontFamily.bold,
    fontSize: 24,
    lineHeight: 30,
    color: Colors.gray900,
  },
  subHeading: {
    fontFamily: FontFamily.regular,
    fontSize: Typography.size.xs,
    color: Colors.gray600,
  },
  locationPillBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 7,
    marginTop: Spacing.xs,
    marginBottom: Spacing.xs,
    gap: 6,
  },
  locationText: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: Typography.size.xs,
    color: Colors.gray800,
  },
  changeLinkText: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.xs,
    color: '#0284C7',
  },
  filterActionsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  filterBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    borderRadius: BorderRadius.full,
    paddingVertical: 6,
    gap: 6,
    ...Shadows.sm,
  },
  filterBtnText: {
    fontFamily: FontFamily.semiBold,
    fontSize: Typography.size.xs,
    color: Colors.gray800,
  },
  mapArea: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  userLocationBadge: {
    position: 'absolute',
    left: '42%',
    top: '41%',
    backgroundColor: '#0284C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.md,
  },
  userLocationBadgeText: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: '#FFFFFF',
  },
  mapMarkerPill: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: 4,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    gap: 6,
    ...Shadows.md,
  },
  mapMarkerPillSelected: {
    borderColor: '#FFC107',
    backgroundColor: '#FFFDF0',
    transform: [{ scale: 1.05 }],
  },
  markerAvatarContainer: {
    position: 'relative',
  },
  markerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#FFC107',
  },
  onlineDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  markerInfoBlock: {
    paddingRight: 4,
  },
  markerName: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: Colors.gray900,
  },
  markerSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  markerDistance: {
    fontFamily: FontFamily.regular,
    fontSize: 9,
    color: Colors.gray500,
  },
  markerRating: {
    fontFamily: FontFamily.bold,
    fontSize: 9,
    color: Colors.gray800,
  },
  markerPrice: {
    fontFamily: FontFamily.bold,
    fontSize: 9,
    color: '#059669',
  },
  recenterButton: {
    position: 'absolute',
    bottom: Spacing.md,
    right: Spacing.md,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.md,
  },
  selectedWashermanCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: BorderRadius['2xl'],
    borderTopRightRadius: BorderRadius['2xl'],
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.md,
    ...Shadows.lg,
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
    alignSelf: 'center',
    marginBottom: Spacing.sm,
  },
  washermanCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardAvatarBlock: {
    position: 'relative',
    marginRight: Spacing.sm,
  },
  cardAvatar: {
    width: 68,
    height: 68,
    borderRadius: BorderRadius.lg,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: -4,
    left: 4,
    right: 4,
    backgroundColor: '#22C55E',
    borderRadius: BorderRadius.xs,
    paddingVertical: 1,
    alignItems: 'center',
  },
  onlineBadgeText: {
    fontFamily: FontFamily.bold,
    fontSize: 9,
    color: '#FFFFFF',
  },
  cardInfoDetails: {
    flex: 1,
  },
  cardNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardWashermanName: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.md,
    color: Colors.gray900,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  ratingScore: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.xs,
    color: Colors.gray900,
  },
  reviewCountText: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: Colors.gray500,
  },
  metaRow: {
    marginTop: 2,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: Colors.gray600,
  },
  startingPriceText: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: '#059669',
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  availableNowText: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: '#059669',
  },
  topRatedBadge: {
    backgroundColor: '#FEF08A',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: BorderRadius.xs,
  },
  topRatedText: {
    fontFamily: FontFamily.bold,
    fontSize: 9,
    color: '#B45309',
  },
  cardActionBlock: {
    justifyContent: 'center',
    paddingLeft: Spacing.xs,
  },
  bookNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC107',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
    gap: 4,
    ...Shadows.sm,
  },
  bookNowBtnText: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.xs,
    color: Colors.black,
  },
  bottomNavContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingVertical: 8,
    paddingHorizontal: Spacing.md,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    gap: 3,
  },
  navLabelActive: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: '#D97706',
  },
  navLabelInactive: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: '#9CA3AF',
  },
});
