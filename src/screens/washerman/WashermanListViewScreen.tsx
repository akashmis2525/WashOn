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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  SlidersHorizontal,
  MapPin,
  ChevronDown,
  Star,
  Clock,
  Car,
  CheckCircle,
  Info,
  ArrowRight,
  ArrowUpDown,
  Map,
  List,
  Home,
  Calendar,
  Compass,
  MessageSquare,
  User,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { useBookingStore } from '../../store/bookingStore';
import { mockWashermen } from '../../mocks/washermen';

const { width } = Dimensions.get('window');

type WashermanListNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.WASHERMAN_LIST_VIEW
>;

interface WashermanListItem {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  completedWashes: string;
  distance: string;
  estArrival: string;
  price: number;
  tag: string;
  tagType: 'verified' | 'topRated';
  isOnline: boolean;
  avatarUrl: string;
}

export const WashermanListViewScreen: React.FC = () => {
  const navigation = useNavigation<WashermanListNavProp>();
  const { setDraftWasherman } = useBookingStore();

  const washermenList: WashermanListItem[] = [
    {
      id: 'wsh_001',
      name: 'Rakesh Kumar',
      rating: 4.8,
      reviewsCount: 320,
      completedWashes: '850+ washes completed',
      distance: '0.8 km away',
      estArrival: '5 - 10 mins (est. arrival)',
      price: 149,
      tag: 'Verified Professional',
      tagType: 'verified',
      isOnline: true,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    },
    {
      id: 'wsh_003',
      name: 'Amit Sharma',
      rating: 4.7,
      reviewsCount: 210,
      completedWashes: '620+ washes completed',
      distance: '1.2 km away',
      estArrival: '10 - 15 mins (est. arrival)',
      price: 149,
      tag: 'Verified Professional',
      tagType: 'verified',
      isOnline: true,
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    },
    {
      id: 'wsh_002',
      name: 'Sameer Khan',
      rating: 4.6,
      reviewsCount: 180,
      completedWashes: '450+ washes completed',
      distance: '1.5 km away',
      estArrival: '10 - 15 mins (est. arrival)',
      price: 199,
      tag: 'Verified Professional',
      tagType: 'verified',
      isOnline: true,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    },
    {
      id: 'wsh_004',
      name: 'Vikash Patel',
      rating: 4.5,
      reviewsCount: 150,
      completedWashes: '320+ washes completed',
      distance: '2.1 km away',
      estArrival: '15 - 20 mins (est. arrival)',
      price: 179,
      tag: 'Verified Professional',
      tagType: 'verified',
      isOnline: true,
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80',
    },
    {
      id: 'wsh_005',
      name: 'Suresh Yadav',
      rating: 4.9,
      reviewsCount: 410,
      completedWashes: '1,200+ washes completed',
      distance: '1.8 km away',
      estArrival: '10 - 15 mins (est. arrival)',
      price: 149,
      tag: 'Top Rated',
      tagType: 'topRated',
      isOnline: true,
      avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&q=80',
    },
  ];

  const handleSelectWasherman = (item: WashermanListItem) => {
    const fullWasherman = mockWashermen.find((w) => w.id === item.id) || mockWashermen[0];
    setDraftWasherman(fullWasherman);
    navigation.navigate(Routes.WASHERMAN_PROFILE, { washermanId: item.id });
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

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title and Subtitle */}
        <View style={styles.titleSection}>
          <AppText style={styles.mainHeading}>Nearby Washermen</AppText>
          <AppText style={styles.subHeading}>
            Available professionals near you
          </AppText>
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

        {/* Filter Controls & Toggle Row */}
        <View style={styles.controlsRow}>
          {/* Sort By Dropdown */}
          <TouchableOpacity style={styles.controlPill} activeOpacity={0.8}>
            <ArrowUpDown size={13} color="#111827" />
            <AppText style={styles.controlPillText}>Sort by</AppText>
            <ChevronDown size={14} color="#111827" />
          </TouchableOpacity>

          {/* Filters Button */}
          <TouchableOpacity
            style={styles.controlPill}
            onPress={() => navigation.navigate(Routes.WASHERMAN_FILTER)}
            activeOpacity={0.8}
          >
            <SlidersHorizontal size={13} color="#111827" />
            <AppText style={styles.controlPillText}>Filters</AppText>
          </TouchableOpacity>

          {/* Map / List View Toggle */}
          <View style={styles.viewToggleGroup}>
            <TouchableOpacity
              style={styles.toggleBtnInactive}
              onPress={() => navigation.navigate(Routes.NEARBY_WASHERMEN_MAP)}
              activeOpacity={0.8}
            >
              <Map size={13} color="#4B5563" />
              <AppText style={styles.toggleBtnTextInactive}>Map View</AppText>
            </TouchableOpacity>

            <View style={styles.toggleBtnActive}>
              <List size={13} color="#111827" />
              <AppText style={styles.toggleBtnTextActive}>List View</AppText>
            </View>
          </View>
        </View>

        {/* Washerman List Cards */}
        <View style={styles.cardsContainer}>
          {washermenList.map((item) => (
            <View key={item.id} style={styles.washermanCard}>
              <View style={styles.cardMainRow}>
                {/* Left Avatar with Online Badge */}
                <View style={styles.avatarWrapper}>
                  <Image source={{ uri: item.avatarUrl }} style={styles.avatarImage} />
                  {item.isOnline && <View style={styles.greenOnlineDot} />}
                  <View style={styles.onlinePill}>
                    <AppText style={styles.onlinePillText}>Online</AppText>
                  </View>
                </View>

                {/* Middle Info Details */}
                <View style={styles.infoCol}>
                  <AppText style={styles.washermanName}>{item.name}</AppText>

                  {/* Rating */}
                  <View style={styles.ratingRow}>
                    <Star size={13} color="#EAB308" fill="#EAB308" />
                    <AppText style={styles.ratingScore}>{item.rating}</AppText>
                    <AppText style={styles.reviewCount}>({item.reviewsCount} reviews)</AppText>
                  </View>

                  {/* Completed Washes */}
                  <View style={styles.metaItem}>
                    <Car size={12} color={Colors.gray500} />
                    <AppText style={styles.metaText}>{item.completedWashes}</AppText>
                  </View>

                  {/* Distance */}
                  <View style={styles.metaItem}>
                    <MapPin size={12} color={Colors.gray500} />
                    <AppText style={styles.metaText}>{item.distance}</AppText>
                  </View>

                  {/* Est Arrival */}
                  <View style={styles.metaItem}>
                    <Clock size={12} color={Colors.gray500} />
                    <AppText style={styles.metaText}>{item.estArrival}</AppText>
                  </View>

                  {/* Tag: Verified / Top Rated */}
                  {item.tagType === 'topRated' ? (
                    <View style={styles.topRatedBadge}>
                      <AppText style={styles.topRatedText}>{item.tag}</AppText>
                    </View>
                  ) : (
                    <View style={styles.verifiedBadge}>
                      <AppText style={styles.verifiedText}>{item.tag}</AppText>
                    </View>
                  )}
                </View>

                {/* Right Price & Select Button */}
                <View style={styles.priceActionCol}>
                  <View style={styles.priceBox}>
                    <AppText style={styles.startingFromText}>Starting from</AppText>
                    <View style={styles.priceWithInfo}>
                      <AppText style={styles.priceValue}>₹{item.price}</AppText>
                      <Info size={13} color={Colors.gray400} />
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => handleSelectWasherman(item)}
                    activeOpacity={0.85}
                  >
                    <AppText style={styles.selectButtonText}>Select</AppText>
                    <ArrowRight size={14} color={Colors.black} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

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
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 85,
  },
  titleSection: {
    marginTop: Spacing.xs,
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
    marginTop: 2,
  },
  locationPillBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 7,
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
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
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
    gap: 6,
  },
  controlPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
    ...Shadows.sm,
  },
  controlPillText: {
    fontFamily: FontFamily.semiBold,
    fontSize: 11,
    color: Colors.gray800,
  },
  viewToggleGroup: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: BorderRadius.full,
    padding: 2,
  },
  toggleBtnActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC107',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 4,
  },
  toggleBtnTextActive: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: Colors.black,
  },
  toggleBtnInactive: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    gap: 4,
  },
  toggleBtnTextInactive: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: Colors.gray600,
  },
  cardsContainer: {
    gap: Spacing.md,
  },
  washermanCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    padding: Spacing.md,
    ...Shadows.sm,
  },
  cardMainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: Spacing.sm,
  },
  avatarImage: {
    width: 68,
    height: 72,
    borderRadius: BorderRadius.lg,
  },
  greenOnlineDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  onlinePill: {
    position: 'absolute',
    bottom: -4,
    left: 2,
    right: 2,
    backgroundColor: '#22C55E',
    borderRadius: BorderRadius.xs,
    paddingVertical: 1,
    alignItems: 'center',
  },
  onlinePillText: {
    fontFamily: FontFamily.bold,
    fontSize: 8,
    color: '#FFFFFF',
  },
  infoCol: {
    flex: 1,
    paddingHorizontal: 4,
  },
  washermanName: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
    marginBottom: 4,
  },
  ratingScore: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: Colors.gray900,
  },
  reviewCount: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: Colors.gray500,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  metaText: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: Colors.gray600,
  },
  verifiedBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  verifiedText: {
    fontFamily: FontFamily.bold,
    fontSize: 9,
    color: '#059669',
  },
  topRatedBadge: {
    backgroundColor: '#FEF08A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  topRatedText: {
    fontFamily: FontFamily.bold,
    fontSize: 9,
    color: '#B45309',
  },
  priceActionCol: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minHeight: 85,
  },
  priceBox: {
    alignItems: 'flex-end',
  },
  startingFromText: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: Colors.gray500,
  },
  priceWithInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  priceValue: {
    fontFamily: FontFamily.extraBold,
    fontSize: 18,
    color: '#059669',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC107',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    gap: 4,
    ...Shadows.sm,
  },
  selectButtonText: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
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
