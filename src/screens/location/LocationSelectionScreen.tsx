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
  ArrowLeft,
  Search,
  Mic,
  Crosshair,
  Plus,
  Minus,
  Home,
  Briefcase,
  MapPin,
  ChevronRight,
  ArrowRight,
} from 'lucide-react-native';
import Svg, { Path, Circle, Rect, G, Text as SvgText } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useUserStore } from '../../store/userStore';
import { useLocationStore } from '../../store/locationStore';
import { AppText } from '../../components/common/AppText';

const { width } = Dimensions.get('window');

type LocationSelectionNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.LOCATION_SELECTION
>;

// Interactive Map Vector Simulation with Landmark Pins & Radar Ripple
const InteractiveMapVisual: React.FC<{ onZoomIn: () => void; onZoomOut: () => void; onLocate: () => void }> = ({
  onZoomIn,
  onZoomOut,
  onLocate,
}) => {
  return (
    <View style={styles.mapContainer}>
      <Svg width="100%" height={210} viewBox="0 0 400 220" preserveAspectRatio="none">
        {/* Map Canvas Background */}
        <Rect x="0" y="0" width="400" height="220" fill="#E6EEF5" />

        {/* Green park zones */}
        <Path d="M20 30 C50 20, 90 40, 100 80 L30 90 Z" fill="#DCFCE7" opacity="0.8" />
        <Path d="M290 140 C340 130, 380 150, 390 190 L300 200 Z" fill="#DCFCE7" opacity="0.8" />

        {/* Street Lines */}
        {/* Main Highway A.B. Road */}
        <Path d="M280 0 L250 220" stroke="#FDE047" strokeWidth="8" />
        <Path d="M0 65 L400 50" stroke="#FFFFFF" strokeWidth="9" />
        <Path d="M0 135 L400 120" stroke="#FFFFFF" strokeWidth="8" />
        <Path d="M0 175 L400 165" stroke="#FFFFFF" strokeWidth="6" />
        <Path d="M90 0 L85 220" stroke="#FFFFFF" strokeWidth="7" />
        <Path d="M175 0 L165 220" stroke="#FFFFFF" strokeWidth="7" />

        {/* POI Markers */}
        {/* Bombay Hospital */}
        <G transform="translate(110, 45)">
          <Circle cx="10" cy="10" r="10" fill="#EF4444" />
          <SvgText x="10" y="13.5" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">H</SvgText>
        </G>

        {/* Treasure Island Mall */}
        <G transform="translate(60, 115)">
          <Circle cx="10" cy="10" r="10" fill="#3B82F6" />
        </G>

        {/* Center Target Pulse Radar (User Location) */}
        <Circle cx="200" cy="110" r="40" fill="#38BDF8" opacity="0.25" />
        <Circle cx="200" cy="110" r="24" fill="#0284C7" opacity="0.35" />
        <Circle cx="200" cy="110" r="8" fill="#0284C7" />
        <Circle cx="200" cy="110" r="4" fill="#FFFFFF" />
      </Svg>

      {/* Floating Location Tooltip Card */}
      <View style={styles.mapLocationTooltip}>
        <View style={styles.tooltipIcon}>
          <MapPin size={12} color="#FFFFFF" />
        </View>
        <View style={styles.tooltipTextContainer}>
          <AppText style={styles.tooltipTitle}>Your Current Location</AppText>
          <AppText style={styles.tooltipSub}>Vijay Nagar, Indore</AppText>
        </View>
        <ChevronRight size={14} color="#6B7280" />
      </View>

      {/* Floating Map Controls on Right */}
      <View style={styles.mapControls}>
        <TouchableOpacity style={styles.controlBtn} onPress={onLocate} activeOpacity={0.7}>
          <Crosshair size={18} color="#111827" />
        </TouchableOpacity>
        <View style={styles.zoomButtonGroup}>
          <TouchableOpacity style={styles.controlBtnHalf} onPress={onZoomIn} activeOpacity={0.7}>
            <Plus size={16} color="#111827" />
          </TouchableOpacity>
          <View style={styles.controlDivider} />
          <TouchableOpacity style={styles.controlBtnHalf} onPress={onZoomOut} activeOpacity={0.7}>
            <Minus size={16} color="#111827" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const LocationSelectionScreen: React.FC = () => {
  const navigation = useNavigation<LocationSelectionNavigationProp>();
  const { profile, selectedAddress, setSelectedAddress } = useUserStore();
  const { setLocation } = useLocationStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAddrId, setSelectedAddrId] = useState(selectedAddress?.id || 'addr_001');

  const addresses = profile?.addresses || [
    {
      id: 'addr_001',
      label: 'Home',
      addressLine1: 'Vijay Nagar, Indore, Madhya Pradesh',
      city: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452010',
      latitude: 22.7533,
      longitude: 75.8937,
      isDefault: true,
    },
    {
      id: 'addr_002',
      label: 'Work',
      addressLine1: 'Crystal IT Park, IT Park Road, Indore',
      city: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452001',
      latitude: 22.6892,
      longitude: 75.8756,
      isDefault: false,
    },
    {
      id: 'addr_003',
      label: 'Other',
      addressLine1: 'Scheme No. 54, Indore, Madhya Pradesh',
      city: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452010',
      latitude: 22.756,
      longitude: 75.889,
      isDefault: false,
    },
  ];

  const handleSelectAddress = (addr: any) => {
    setSelectedAddrId(addr.id);
    setSelectedAddress(addr);
    setLocation({
      latitude: addr.latitude,
      longitude: addr.longitude,
      formattedAddress: addr.addressLine1,
      city: addr.city,
      area: addr.label === 'Home' ? 'Vijay Nagar' : addr.city,
    });
  };

  const handleConfirmLocation = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ArrowLeft size={22} color={Colors.black} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <AppText style={styles.headerTitle}>Select Location</AppText>
            <AppText style={styles.headerSubtitle}>
              Choose your location to find nearby washermen.
            </AppText>
          </View>
        </View>

        {/* Small WashOn Logo */}
        <View style={styles.headerLogoWrapper}>
          <Image
            source={require('../../assets/images/logo.jpg')}
            style={styles.headerLogoImg}
            resizeMode="contain"
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar with Mic */}
        <View style={styles.searchBarContainer}>
          <Search size={18} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for area, street or landmark..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity activeOpacity={0.7}>
            <Mic size={18} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Use Current Location Card */}
        <View style={styles.useCurrentLocationCard}>
          <View style={styles.useCurrentLeft}>
            <View style={styles.locIconCircle}>
              <MapPin size={18} color="#111827" />
            </View>
            <View style={styles.useCurrentTextWrapper}>
              <AppText style={styles.useCurrentTitle}>Use Current Location</AppText>
              <AppText style={styles.useCurrentSub}>
                Detect your current location automatically
              </AppText>
            </View>
          </View>

          <TouchableOpacity style={styles.useActionBtn} activeOpacity={0.8}>
            <Crosshair size={14} color="#111827" style={{ marginRight: 4 }} />
            <AppText style={styles.useActionText}>Use</AppText>
          </TouchableOpacity>
        </View>

        {/* Interactive Map Visual */}
        <InteractiveMapVisual
          onLocate={() => {}}
          onZoomIn={() => {}}
          onZoomOut={() => {}}
        />

        {/* Saved Addresses List */}
        <View style={styles.savedAddressesContainer}>
          <View style={styles.savedHeaderRow}>
            <AppText style={styles.savedSectionTitle}>Saved Addresses</AppText>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.SAVED_ADDRESSES)}
              activeOpacity={0.7}
            >
              <AppText style={styles.manageText}>Manage</AppText>
            </TouchableOpacity>
          </View>

          {addresses.map((addr) => {
            const isSelected = selectedAddrId === addr.id;
            return (
              <TouchableOpacity
                key={addr.id}
                style={[
                  styles.addressCard,
                  isSelected ? styles.addressCardSelected : null,
                ]}
                onPress={() => handleSelectAddress(addr)}
                activeOpacity={0.85}
              >
                <View style={styles.addressLeft}>
                  <View style={styles.addressIconWrapper}>
                    {addr.label === 'Home' ? (
                      <Home size={18} color="#111827" />
                    ) : addr.label === 'Work' ? (
                      <Briefcase size={18} color="#111827" />
                    ) : (
                      <MapPin size={18} color="#111827" />
                    )}
                  </View>

                  <View style={styles.addressDetailsContainer}>
                    <AppText style={styles.addressLabel}>{addr.label}</AppText>
                    <AppText style={styles.addressText} numberOfLines={1}>
                      {addr.addressLine1}
                    </AppText>
                  </View>
                </View>

                <View
                  style={[
                    styles.radioOuter,
                    isSelected ? styles.radioOuterSelected : null,
                  ]}
                >
                  {isSelected ? <View style={styles.radioInner} /> : null}
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Add New Address Button */}
          <TouchableOpacity
            style={styles.addNewAddressBtn}
            onPress={() => navigation.navigate(Routes.ADD_NEW_ADDRESS, {})}
            activeOpacity={0.8}
          >
            <View style={styles.addIconCircle}>
              <Plus size={16} color="#111827" strokeWidth={2.5} />
            </View>
            <AppText style={styles.addNewText}>Add New Address</AppText>
            <ChevronRight size={18} color="#9CA3AF" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        </View>

        {/* Confirm Location Primary Button */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmLocation}
          activeOpacity={0.85}
        >
          <AppText style={styles.confirmButtonText}>Confirm Location</AppText>
          <ArrowRight size={20} color="#111827" strokeWidth={2.5} />
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Yellow Wave */}
      <View style={styles.bottomWaveContainer} pointerEvents="none">
        <Svg width="100%" height="30" viewBox="0 0 360 30" preserveAspectRatio="none">
          <Path
            d="M0 30 C120 10, 240 35, 360 15 L360 30 Z"
            fill="#FFC107"
            opacity="0.85"
          />
        </Svg>
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
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 11,
    fontFamily: FontFamily.regular,
    color: '#6B7280',
    marginTop: 1,
  },
  headerLogoWrapper: {
    width: 80,
    height: 36,
  },
  headerLogoImg: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xxl,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FAFAFA',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    marginBottom: Spacing.sm,
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
  useCurrentLocationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#FEF3C7',
    marginBottom: Spacing.sm,
  },
  useCurrentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFC107',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  useCurrentTextWrapper: {
    flex: 1,
  },
  useCurrentTitle: {
    fontSize: 13,
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
  useCurrentSub: {
    fontSize: 11,
    fontFamily: FontFamily.regular,
    color: '#6B7280',
    marginTop: 1,
  },
  useActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC107',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  useActionText: {
    fontSize: 12,
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
  mapContainer: {
    height: 210,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  mapLocationTooltip: {
    position: 'absolute',
    top: 60,
    left: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tooltipIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  tooltipTextContainer: {
    marginRight: 6,
  },
  tooltipTitle: {
    fontSize: 10,
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
  tooltipSub: {
    fontSize: 9,
    fontFamily: FontFamily.medium,
    color: '#6B7280',
  },
  mapControls: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  controlBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 8,
    ...Shadows.sm,
  },
  zoomButtonGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...Shadows.sm,
  },
  controlBtnHalf: {
    width: 36,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  savedAddressesContainer: {
    marginVertical: Spacing.md,
  },
  savedHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  savedSectionTitle: {
    fontSize: 15,
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
  manageText: {
    fontSize: 13,
    fontFamily: FontFamily.bold,
    color: '#FFB300',
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    marginBottom: 8,
  },
  addressCardSelected: {
    backgroundColor: '#FFFDE7',
    borderColor: '#FFC107',
  },
  addressLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 8,
  },
  addressIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFF3C4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  addressDetailsContainer: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 13,
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
  addressText: {
    fontSize: 11,
    fontFamily: FontFamily.regular,
    color: '#6B7280',
    marginTop: 2,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#FFB300',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFB300',
  },
  addNewAddressBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginTop: 2,
  },
  addIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  addNewText: {
    fontSize: 13,
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
  confirmButton: {
    height: 52,
    borderRadius: BorderRadius.full,
    backgroundColor: '#FFC107',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
    shadowColor: '#FFB300',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonText: {
    fontSize: 16,
    fontFamily: FontFamily.bold,
    color: '#111827',
    marginRight: Spacing.xs,
  },
  bottomWaveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
