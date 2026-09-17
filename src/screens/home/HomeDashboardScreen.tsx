import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Bell,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Plus,
  CheckCircle2,
  Circle,
  Sun,
  ChevronRight,
  Star,
  MapPin,
  Bike,
  Car,
  Sparkles,
  Calendar,
  Layers,
  Armchair,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useUserStore } from '../../store/userStore';
import { useVehicleStore } from '../../store/vehicleStore';
import { useLocationStore } from '../../store/locationStore';
import { useBookingStore } from '../../store/bookingStore';
import { AppText } from '../../components/common/AppText';
import { BottomTabBar } from '../../components/navigation/BottomTabBar';
import { mockWashermen } from '../../mocks/washermen';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.HOME_DASHBOARD
>;

export const HomeDashboardScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { profile } = useUserStore();
  const { vehicles, selectedVehicle, setSelectedVehicle } = useVehicleStore();
  const { currentLocation } = useLocationStore();
  const { setDraftVehicle, setDraftWasherman } = useBookingStore();

  const [searchQuery, setSearchQuery] = useState('');

  const userName = profile?.name ? profile.name.split(' ')[0] : 'Aakash';

  const handleSelectVehicle = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setDraftVehicle(vehicle);
  };

  const handleBookWasherman = (washerman: any) => {
    setDraftWasherman(washerman);
    navigation.navigate(Routes.WASHERMAN_PROFILE, { washermanId: washerman.id });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Main Navigation Bar */}
      <View style={styles.topNavBar}>
        {/* Left: Official WashOn Logo */}
        <View style={styles.logoWrapper}>
          <Image
            source={require('../../assets/images/logo.jpg')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Right: Notifications Bell & Profile Avatar */}
        <View style={styles.navRightActions}>
          <TouchableOpacity
            style={styles.notifButton}
            onPress={() => navigation.navigate(Routes.NOTIFICATIONS)}
            activeOpacity={0.7}
          >
            <Bell size={22} color={Colors.black} />
            <View style={styles.notifBadgeDot} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileAvatarButton}
            onPress={() => navigation.navigate(Routes.CUSTOMER_PROFILE)}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120' }}
              style={styles.profileAvatarImg}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting & Location Selector */}
        <View style={styles.greetingWeatherRow}>
          <View style={styles.greetingContainer}>
            <AppText style={styles.greetingTitle}>
              Good Morning, {userName} 👋
            </AppText>
            <AppText style={styles.greetingSubtitle}>
              Let's get your vehicle sparkling today!
            </AppText>

            <TouchableOpacity
              style={styles.locationSelectorPill}
              onPress={() => navigation.navigate(Routes.LOCATION_SELECTION)}
              activeOpacity={0.8}
            >
              <MapPin size={15} color="#FFB300" style={styles.locPinIcon} />
              <AppText style={styles.locationSelectorText} numberOfLines={1}>
                {currentLocation.area}, {currentLocation.city}
              </AppText>
              <ChevronDown size={14} color="#111827" />
            </TouchableOpacity>
          </View>

          {/* Weather Widget */}
          <View style={styles.weatherWidget}>
            <Sun size={20} color="#F59E0B" />
            <AppText style={styles.weatherTemp}>28°C</AppText>
            <AppText style={styles.weatherNote}>Perfect day for a clean ride!</AppText>
          </View>
        </View>

        {/* Search Bar & Filter */}
        <View style={styles.searchRow}>
          <View style={styles.searchBarContainer}>
            <Search size={18} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for services, wash types..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.navigate(Routes.WASHERMAN_FILTER)}
            activeOpacity={0.8}
          >
            <SlidersHorizontal size={18} color={Colors.black} />
          </TouchableOpacity>
        </View>

        {/* Select Your Vehicle Shortcut Card */}
        <View style={styles.vehicleSectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderLeft}>
              <Car size={18} color="#FFB300" style={{ marginRight: 6 }} />
              <View>
                <AppText style={styles.sectionTitle}>Select Your Vehicle</AppText>
                <AppText style={styles.sectionSubtitle}>
                  Choose your vehicle to see relevant services
                </AppText>
              </View>
            </View>
            <TouchableOpacity
              style={styles.addVehicleBtn}
              onPress={() => navigation.navigate(Routes.ADD_VEHICLE, {})}
              activeOpacity={0.8}
            >
              <Plus size={14} color="#111827" strokeWidth={3} />
              <AppText style={styles.addVehicleText}>Add</AppText>
            </TouchableOpacity>
          </View>

          {/* Horizontal Vehicle Cards */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.vehiclesListScroll}
          >
            {vehicles.map((v) => {
              const isSelected = selectedVehicle?.id === v.id;
              return (
                <TouchableOpacity
                  key={v.id}
                  style={[
                    styles.vehicleCard,
                    isSelected ? styles.vehicleCardSelected : null,
                  ]}
                  onPress={() => handleSelectVehicle(v)}
                  activeOpacity={0.85}
                >
                  <View style={styles.vehicleCardLeft}>
                    <View style={styles.vehicleIconBadge}>
                      {v.type === 'bike' || v.type === 'scooter' ? (
                        <Bike size={20} color="#111827" />
                      ) : (
                        <Car size={20} color="#111827" />
                      )}
                    </View>
                    <View style={styles.vehicleDetailsContainer}>
                      <AppText style={styles.vehicleNameText}>
                        {v.brand} {v.model}
                      </AppText>
                      <AppText style={styles.vehicleRegText}>
                        {v.registrationNumber}
                      </AppText>
                    </View>
                  </View>

                  {isSelected ? (
                    <CheckCircle2 size={20} color="#FFC107" fill="#FFC107" />
                  ) : (
                    <Circle size={20} color="#D1D5DB" />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Our Services Section */}
        <View style={styles.servicesSectionContainer}>
          <View style={styles.sectionTitleRow}>
            <AppText style={styles.mainSectionTitle}>Our Services</AppText>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.SERVICE_CATEGORY)}
              style={styles.viewAllBtn}
            >
              <AppText style={styles.viewAllText}>View All</AppText>
              <ChevronRight size={14} color="#FFB300" />
            </TouchableOpacity>
          </View>

          {/* 6 Services Grid */}
          <View style={styles.servicesGrid}>
            {/* 1. Bike Wash */}
            <TouchableOpacity
              style={styles.serviceGridItem}
              onPress={() => navigation.navigate(Routes.BIKE_WASH_SERVICES)}
              activeOpacity={0.8}
            >
              <View style={styles.serviceIconContainer}>
                <Bike size={24} color="#111827" />
              </View>
              <AppText style={styles.serviceLabel}>Bike Wash</AppText>
            </TouchableOpacity>

            {/* 2. Car Wash */}
            <TouchableOpacity
              style={styles.serviceGridItem}
              onPress={() => navigation.navigate(Routes.CAR_WASH_SERVICES)}
              activeOpacity={0.8}
            >
              <View style={styles.serviceIconContainer}>
                <Car size={24} color="#111827" />
              </View>
              <AppText style={styles.serviceLabel}>Car Wash</AppText>
            </TouchableOpacity>

            {/* 3. Foam Wash */}
            <TouchableOpacity
              style={styles.serviceGridItem}
              onPress={() => navigation.navigate(Routes.SERVICE_CATEGORY)}
              activeOpacity={0.8}
            >
              <View style={styles.serviceIconContainer}>
                <Sparkles size={24} color="#111827" />
              </View>
              <AppText style={styles.serviceLabel}>Foam Wash</AppText>
            </TouchableOpacity>

            {/* 4. Interior Cleaning */}
            <TouchableOpacity
              style={styles.serviceGridItem}
              onPress={() => navigation.navigate(Routes.SERVICE_CATEGORY)}
              activeOpacity={0.8}
            >
              <View style={styles.serviceIconContainer}>
                <Armchair size={24} color="#111827" />
              </View>
              <AppText style={styles.serviceLabel}>Interior Cleaning</AppText>
            </TouchableOpacity>

            {/* 5. Full Detailing */}
            <TouchableOpacity
              style={styles.serviceGridItem}
              onPress={() => navigation.navigate(Routes.SERVICE_CATEGORY)}
              activeOpacity={0.8}
            >
              <View style={styles.serviceIconContainer}>
                <Layers size={24} color="#111827" />
              </View>
              <AppText style={styles.serviceLabel}>Full Detailing</AppText>
            </TouchableOpacity>

            {/* 6. Monthly Plans */}
            <TouchableOpacity
              style={styles.serviceGridItem}
              onPress={() => navigation.navigate(Routes.SUBSCRIPTION_PLANS)}
              activeOpacity={0.8}
            >
              <View style={styles.serviceIconContainer}>
                <Calendar size={24} color="#111827" />
              </View>
              <AppText style={styles.serviceLabel}>Monthly Plans</AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Promotional Banner Card */}
        <View style={styles.promoBannerCard}>
          <View style={styles.promoLeft}>
            <View style={styles.promoTagPill}>
              <AppText style={styles.promoTagText}>LIMITED TIME OFFER</AppText>
            </View>
            <AppText style={styles.promoHeading}>Get 20% OFF</AppText>
            <AppText style={styles.promoSub}>On Your First Wash</AppText>
            <View style={styles.couponPill}>
              <AppText style={styles.couponPrefix}>Use Code</AppText>
              <View style={styles.couponCodeBadge}>
                <AppText style={styles.couponCodeText}>CLEAN20</AppText>
              </View>
            </View>
          </View>

          <View style={styles.promoRightBadge}>
            <AppText style={styles.promoBadgeScript}>Cleaner</AppText>
            <AppText style={styles.promoBadgeScript}>Happier</AppText>
            <AppText style={styles.promoBadgeScriptHighlight}>Rides</AppText>
          </View>
        </View>

        {/* Nearby Washermen Carousel */}
        <View style={styles.washermenSectionContainer}>
          <View style={styles.sectionTitleRow}>
            <AppText style={styles.mainSectionTitle}>Nearby Washermen</AppText>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.WASHERMAN_LIST_VIEW)}
              style={styles.viewAllBtn}
            >
              <AppText style={styles.viewAllText}>View All</AppText>
              <ChevronRight size={14} color="#FFB300" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.washermenScroll}
          >
            {mockWashermen.map((w) => (
              <View key={w.id} style={styles.washermanCard}>
                <View style={styles.wmAvatarWrapper}>
                  <Image source={{ uri: w.avatarUrl }} style={styles.wmAvatarImg} />
                  <View style={styles.wmOnlineBadge}>
                    <AppText style={styles.wmOnlineText}>Online</AppText>
                  </View>
                </View>

                <AppText style={styles.wmName} numberOfLines={1}>
                  {w.name}
                </AppText>

                <View style={styles.wmRatingDistanceRow}>
                  <View style={styles.wmRatingPill}>
                    <Star size={12} color="#F59E0B" fill="#F59E0B" />
                    <AppText style={styles.wmRatingText}>
                      {w.rating} ({w.totalReviews})
                    </AppText>
                  </View>
                </View>

                <View style={styles.wmDistRow}>
                  <MapPin size={12} color="#6B7280" />
                  <AppText style={styles.wmDistText}>{w.distanceKm} km</AppText>
                </View>

                <TouchableOpacity
                  style={styles.wmBookBtn}
                  onPress={() => handleBookWasherman(w)}
                  activeOpacity={0.85}
                >
                  <AppText style={styles.wmBookText}>Book Now</AppText>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Recent Booking Card */}
        <View style={styles.recentBookingContainer}>
          <View style={styles.sectionTitleRow}>
            <AppText style={styles.mainSectionTitle}>Recent Booking</AppText>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.BOOKING_HISTORY)}
              style={styles.viewAllBtn}
            >
              <AppText style={styles.viewAllText}>View All</AppText>
              <ChevronRight size={14} color="#FFB300" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.recentBookingCard}
            onPress={() => navigation.navigate(Routes.BOOKING_VIEW_DETAILS, { bookingId: 'bk_1001' })}
            activeOpacity={0.85}
          >
            <View style={styles.recentBookingLeft}>
              <View style={styles.recentBikeIconCircle}>
                <Bike size={22} color="#111827" />
              </View>
              <View style={styles.recentDetails}>
                <AppText style={styles.recentServiceTitle}>
                  Bike Wash - Premium
                </AppText>
                <AppText style={styles.recentVehicleSub}>
                  Royal Enfield Classic 350
                </AppText>
                <AppText style={styles.recentDateText}>
                  12 Sep 2025, 10:30 AM
                </AppText>
              </View>
            </View>

            <View style={styles.recentBookingRight}>
              <View style={styles.completedStatusPill}>
                <CheckCircle2 size={12} color="#16A34A" />
                <AppText style={styles.completedStatusText}>Completed</AppText>
              </View>
              <ChevronRight size={18} color="#9CA3AF" style={{ marginTop: 8 }} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar Navigation */}
      <BottomTabBar activeTab="home" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  topNavBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: Spacing.xs,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  logoWrapper: {
    width: 130,
    height: 44,
    justifyContent: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  navRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notifButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.xs,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  notifBadgeDot: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DC2626',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  profileAvatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#FFC107',
  },
  profileAvatarImg: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
  greetingWeatherRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: Spacing.xs,
  },
  greetingContainer: {
    flex: 1,
    paddingRight: 8,
  },
  greetingTitle: {
    fontSize: 20,
    fontFamily: FontFamily.extraBold,
    color: '#111827',
  },
  greetingSubtitle: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: '#6B7280',
    marginTop: 2,
  },
  locationSelectorPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  locPinIcon: {
    marginRight: 4,
  },
  locationSelectorText: {
    fontSize: 11.5,
    fontFamily: FontFamily.bold,
    color: '#111827',
    maxWidth: 140,
    marginRight: 4,
  },
  weatherWidget: {
    backgroundColor: '#FFFBEB',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FEF3C7',
    width: 105,
  },
  weatherTemp: {
    fontSize: 13,
    fontFamily: FontFamily.bold,
    color: '#92400E',
    marginTop: 2,
  },
  weatherNote: {
    fontSize: 9,
    fontFamily: FontFamily.medium,
    color: '#B45309',
    textAlign: 'center',
    lineHeight: 11,
    marginTop: 2,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
    fontFamily: FontFamily.medium,
    color: '#111827',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  vehicleSectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
  sectionSubtitle: {
    fontSize: 11,
    fontFamily: FontFamily.regular,
    color: '#6B7280',
  },
  addVehicleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC107',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  addVehicleText: {
    fontSize: 12,
    fontFamily: FontFamily.bold,
    color: '#111827',
    marginLeft: 3,
  },
  vehiclesListScroll: {
    paddingVertical: 4,
  },
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    width: 210,
    marginRight: 10,
  },
  vehicleCardSelected: {
    borderColor: '#FFC107',
    backgroundColor: '#FFFDE7',
  },
  vehicleCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vehicleIconBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFF3C4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  vehicleDetailsContainer: {
    flex: 1,
  },
  vehicleNameText: {
    fontSize: 12,
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
  vehicleRegText: {
    fontSize: 10,
    fontFamily: FontFamily.medium,
    color: '#6B7280',
  },
  servicesSectionContainer: {
    marginVertical: Spacing.xs,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  mainSectionTitle: {
    fontSize: 17,
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 12,
    fontFamily: FontFamily.bold,
    color: '#FFB300',
    marginRight: 2,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceGridItem: {
    width: (width - 48) / 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    ...Shadows.sm,
  },
  serviceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF8E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  serviceLabel: {
    fontSize: 11.5,
    fontFamily: FontFamily.bold,
    color: '#111827',
    textAlign: 'center',
  },
  promoBannerCard: {
    backgroundColor: '#FFC107',
    borderRadius: 18,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Spacing.sm,
    shadowColor: '#FFB300',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  promoLeft: {
    flex: 1,
  },
  promoTagPill: {
    backgroundColor: '#111827',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  promoTagText: {
    fontSize: 9,
    fontFamily: FontFamily.bold,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  promoHeading: {
    fontSize: 20,
    fontFamily: FontFamily.extraBold,
    color: '#111827',
    lineHeight: 24,
  },
  promoSub: {
    fontSize: 12,
    fontFamily: FontFamily.bold,
    color: '#111827',
    marginBottom: 6,
  },
  couponPill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponPrefix: {
    fontSize: 11,
    fontFamily: FontFamily.semiBold,
    color: '#111827',
    marginRight: 6,
  },
  couponCodeBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#111827',
    borderStyle: 'dashed',
  },
  couponCodeText: {
    fontSize: 11,
    fontFamily: FontFamily.extraBold,
    color: '#111827',
  },
  promoRightBadge: {
    alignItems: 'center',
    transform: [{ rotate: '6deg' }],
  },
  promoBadgeScript: {
    fontSize: 14,
    fontFamily: FontFamily.extraBold,
    color: '#111827',
    fontStyle: 'italic',
    lineHeight: 16,
  },
  promoBadgeScriptHighlight: {
    fontSize: 16,
    fontFamily: FontFamily.extraBold,
    color: '#FFFFFF',
    fontStyle: 'italic',
    lineHeight: 18,
    textDecorationLine: 'underline',
  },
  washermenSectionContainer: {
    marginVertical: Spacing.sm,
  },
  washermenScroll: {
    paddingVertical: 4,
  },
  washermanCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    width: 140,
    alignItems: 'center',
    marginRight: 10,
    ...Shadows.sm,
  },
  wmAvatarWrapper: {
    width: 54,
    height: 54,
    borderRadius: 27,
    position: 'relative',
    marginBottom: 6,
  },
  wmAvatarImg: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  wmOnlineBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#16A34A',
  },
  wmOnlineText: {
    fontSize: 8,
    fontFamily: FontFamily.bold,
    color: '#16A34A',
  },
  wmName: {
    fontSize: 12.5,
    fontFamily: FontFamily.bold,
    color: '#111827',
    textAlign: 'center',
  },
  wmRatingDistanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  wmRatingPill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wmRatingText: {
    fontSize: 10,
    fontFamily: FontFamily.bold,
    color: '#111827',
    marginLeft: 3,
  },
  wmDistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  wmDistText: {
    fontSize: 10.5,
    fontFamily: FontFamily.medium,
    color: '#6B7280',
    marginLeft: 2,
  },
  wmBookBtn: {
    backgroundColor: '#FFC107',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 4,
  },
  wmBookText: {
    fontSize: 11,
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
  recentBookingContainer: {
    marginVertical: Spacing.sm,
  },
  recentBookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    ...Shadows.sm,
  },
  recentBookingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recentBikeIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF8E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  recentDetails: {
    flex: 1,
  },
  recentServiceTitle: {
    fontSize: 13,
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
  recentVehicleSub: {
    fontSize: 11,
    fontFamily: FontFamily.medium,
    color: '#6B7280',
    marginTop: 1,
  },
  recentDateText: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: '#9CA3AF',
    marginTop: 2,
  },
  recentBookingRight: {
    alignItems: 'flex-end',
  },
  completedStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  completedStatusText: {
    fontSize: 10,
    fontFamily: FontFamily.bold,
    color: '#16A34A',
    marginLeft: 3,
  },
});
