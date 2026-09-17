import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Edit2,
  Car,
  Droplets,
  User,
  MapPin,
  CircleDollarSign,
  Clock,
  FileText,
  Star,
  ChevronDown,
  Info,
  ArrowRight,
  Home,
  Check,
} from 'lucide-react-native';
import Svg, { Rect, Path, Circle } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { useBookingStore } from '../../store/bookingStore';
import { useVehicleStore } from '../../store/vehicleStore';
import { useLocationStore } from '../../store/locationStore';

const { width } = Dimensions.get('window');

type BookingDetailsNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.BOOKING_DETAILS
>;

export const BookingDetailsScreen: React.FC = () => {
  const navigation = useNavigation<BookingDetailsNavProp>();
  const { draft, setDraftInstructions } = useBookingStore();
  const { selectedVehicle } = useVehicleStore();
  const { currentLocation } = useLocationStore();

  const [instructions, setInstructions] = useState(draft.customerInstructions || '');
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);

  const vehicleName = selectedVehicle
    ? `${selectedVehicle.brand} ${selectedVehicle.model}`
    : 'Toyota Fortuner';
  const vehicleSubtitle = selectedVehicle
    ? `${selectedVehicle.type.toUpperCase()} • ${selectedVehicle.color} • ${selectedVehicle.registrationNumber}`
    : 'SUV • White • MP 09 AB 1234';

  const serviceName = draft.service?.name || 'Premium Car Wash';
  const serviceSubtitle = 'Exterior + Interior + Premium Finish';

  const washerman = draft.washerman || {
    id: 'wsh_001',
    name: 'Rakesh Kumar',
    rating: 4.8,
    totalReviews: 320,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
  };

  const handleProceed = () => {
    setDraftInstructions(instructions);
    navigation.navigate(Routes.SCHEDULE_OPTION);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
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
        {/* Title */}
        <View style={styles.titleSection}>
          <AppText style={styles.mainHeading}>Booking Details</AppText>
          <AppText style={styles.subHeading}>
            Review your booking details before proceeding
          </AppText>
        </View>

        {/* 4-Step Progress Bar */}
        <View style={styles.stepperProgressRow}>
          {/* Step 1 */}
          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, styles.stepCircleActive]}>
              <AppText style={styles.stepNumberActive}>1</AppText>
            </View>
            <AppText style={styles.stepLabelActive}>Details</AppText>
          </View>
          <View style={styles.stepLine} />

          {/* Step 2 */}
          <View style={styles.stepItem}>
            <View style={styles.stepCircle}>
              <AppText style={styles.stepNumberInactive}>2</AppText>
            </View>
            <AppText style={styles.stepLabelInactive}>Schedule</AppText>
          </View>
          <View style={styles.stepLine} />

          {/* Step 3 */}
          <View style={styles.stepItem}>
            <View style={styles.stepCircle}>
              <AppText style={styles.stepNumberInactive}>3</AppText>
            </View>
            <AppText style={styles.stepLabelInactive}>Payment</AppText>
          </View>
          <View style={styles.stepLine} />

          {/* Step 4 */}
          <View style={styles.stepItem}>
            <View style={styles.stepCircle}>
              <AppText style={styles.stepNumberInactive}>4</AppText>
            </View>
            <AppText style={styles.stepLabelInactive}>Confirm</AppText>
          </View>
        </View>

        {/* 1. Selected Vehicle Card */}
        <View style={styles.cardBlock}>
          <View style={styles.cardHeaderRow}>
            <View style={[styles.iconCircle, { backgroundColor: '#DCFCE7' }]}>
              <Car size={16} color="#059669" />
            </View>
            <View style={styles.cardDetailsCol}>
              <AppText style={styles.sectionHeadingSmall}>Selected Vehicle</AppText>
              <AppText style={styles.cardPrimaryTitle}>{vehicleName}</AppText>
              <AppText style={styles.cardSubtitle}>{vehicleSubtitle}</AppText>
            </View>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=150&q=80',
              }}
              style={styles.thumbnailCar}
            />
            <TouchableOpacity
              style={styles.changePillBtn}
              onPress={() => navigation.navigate(Routes.VEHICLE_LIST)}
              activeOpacity={0.8}
            >
              <Edit2 size={11} color="#059669" />
              <AppText style={styles.changePillText}>Change</AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. Selected Service Card */}
        <View style={styles.cardBlock}>
          <View style={styles.cardHeaderRow}>
            <View style={[styles.iconCircle, { backgroundColor: '#E0F2FE' }]}>
              <Droplets size={16} color="#0284C7" />
            </View>
            <View style={styles.cardDetailsCol}>
              <AppText style={styles.sectionHeadingSmall}>Selected Service</AppText>
              <AppText style={styles.cardPrimaryTitle}>{serviceName}</AppText>
              <AppText style={styles.cardSubtitle}>{serviceSubtitle}</AppText>
            </View>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=150&q=80',
              }}
              style={styles.thumbnailCar}
            />
            <TouchableOpacity
              style={styles.changePillBtn}
              onPress={() => navigation.navigate(Routes.SERVICE_CATEGORY)}
              activeOpacity={0.8}
            >
              <Edit2 size={11} color="#059669" />
              <AppText style={styles.changePillText}>Change</AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. Selected Washerman Card */}
        <View style={styles.cardBlock}>
          <View style={styles.cardHeaderRow}>
            <View style={[styles.iconCircle, { backgroundColor: '#FEF3C7' }]}>
              <User size={16} color="#D97706" />
            </View>
            <Image
              source={{
                uri:
                  washerman.avatarUrl ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
              }}
              style={styles.thumbnailAvatar}
            />
            <View style={styles.cardDetailsCol}>
              <AppText style={styles.sectionHeadingSmall}>Selected Washerman</AppText>
              <AppText style={styles.cardPrimaryTitle}>{washerman.name}</AppText>
              <View style={styles.washermanMetaRow}>
                <Star size={11} color="#EAB308" fill="#EAB308" />
                <AppText style={styles.washermanRatingText}>4.8 (320 reviews)</AppText>
                <View style={styles.availableMiniBadge}>
                  <View style={styles.availableMiniDot} />
                  <AppText style={styles.availableMiniText}>Available Now</AppText>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.changePillBtn}
              onPress={() => navigation.navigate(Routes.WASHERMAN_LIST_VIEW)}
              activeOpacity={0.8}
            >
              <Edit2 size={11} color="#059669" />
              <AppText style={styles.changePillText}>Change</AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* 4. Service Location Card */}
        <View style={styles.cardBlock}>
          <View style={styles.cardHeaderRow}>
            <View style={[styles.iconCircle, { backgroundColor: '#DCFCE7' }]}>
              <MapPin size={16} color="#059669" />
            </View>
            <View style={styles.cardDetailsCol}>
              <AppText style={styles.sectionHeadingSmall}>Service Location</AppText>
              <AppText style={styles.locationTextAddress}>
                123, Vijay Nagar, Indore, Madhya Pradesh - 452010
              </AppText>
              <View style={styles.homeBadgeRow}>
                <Home size={11} color={Colors.gray600} />
                <AppText style={styles.homeBadgeText}>Home</AppText>
              </View>
            </View>

            {/* Mini Map Visual Thumbnail */}
            <View style={styles.miniMapVisualBox}>
              <Svg width={48} height={40} viewBox="0 0 50 40">
                <Rect x="0" y="0" width="50" height="40" fill="#E2E8F0" rx="4" />
                <Path d="M0 20 L50 15" stroke="#FFFFFF" strokeWidth="4" />
                <Path d="M25 0 L20 40" stroke="#FFFFFF" strokeWidth="4" />
                <Circle cx="23" cy="18" r="4" fill="#EF4444" />
              </Svg>
            </View>

            <TouchableOpacity
              style={styles.changePillBtn}
              onPress={() => navigation.navigate(Routes.LOCATION_SELECTION)}
              activeOpacity={0.8}
            >
              <Edit2 size={11} color="#059669" />
              <AppText style={styles.changePillText}>Change</AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* 5. Estimated Price */}
        <View style={styles.cardBlock}>
          <View style={styles.priceRowHeader}>
            <View style={[styles.iconCircle, { backgroundColor: '#DCFCE7' }]}>
              <CircleDollarSign size={16} color="#059669" />
            </View>
            <View style={{ flex: 1 }}>
              <AppText style={styles.sectionHeadingSmall}>Estimated Price</AppText>
              <View style={styles.priceValueRow}>
                <AppText style={styles.priceBigGreen}>₹499</AppText>
                <Info size={14} color={Colors.gray400} />
              </View>
            </View>

            <TouchableOpacity
              style={styles.viewPriceBtn}
              onPress={() => setShowPriceBreakdown(!showPriceBreakdown)}
              activeOpacity={0.8}
            >
              <AppText style={styles.viewPriceText}>View Price Details</AppText>
              <ChevronDown size={14} color="#059669" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 6. Estimated Duration */}
        <View style={styles.cardBlock}>
          <View style={styles.cardHeaderRow}>
            <View style={[styles.iconCircle, { backgroundColor: '#E0F2FE' }]}>
              <Clock size={16} color="#0284C7" />
            </View>
            <View style={{ flex: 1 }}>
              <AppText style={styles.sectionHeadingSmall}>Estimated Duration</AppText>
              <View style={styles.durationWithInfo}>
                <AppText style={styles.durationTitle}>45 - 60 minutes</AppText>
                <Info size={14} color={Colors.gray400} />
              </View>
            </View>

            <View style={styles.onSitePill}>
              <Home size={11} color="#059669" />
              <AppText style={styles.onSiteText}>On-site Service</AppText>
            </View>
          </View>
        </View>

        {/* 7. Add Instructions (Optional) */}
        <View style={styles.cardBlock}>
          <View style={styles.instructionsHeaderRow}>
            <View style={[styles.iconCircle, { backgroundColor: '#DCFCE7' }]}>
              <FileText size={16} color="#059669" />
            </View>
            <AppText style={styles.sectionHeadingSmall}>
              Add Instructions <AppText style={styles.optionalText}>(Optional)</AppText>
            </AppText>
          </View>

          <View style={styles.textAreaBox}>
            <TextInput
              style={styles.instructionsInput}
              placeholder="E.g. Special areas to clean, access instructions, gate code, parking info etc."
              placeholderTextColor={Colors.gray400}
              multiline
              numberOfLines={3}
              maxLength={500}
              value={instructions}
              onChangeText={setInstructions}
              textAlignVertical="top"
            />
          </View>
          <AppText style={styles.charCountText}>{instructions.length}/500</AppText>
        </View>
      </ScrollView>

      {/* Bottom Sticky Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomLeftSummary}>
          <View style={styles.totalPriceRow}>
            <AppText style={styles.totalPriceLabel}>Total Amount</AppText>
            <View style={styles.totalPriceValueRow}>
              <AppText style={styles.totalPriceNum}>₹499</AppText>
              <Info size={13} color={Colors.gray400} />
            </View>
          </View>

          <View style={styles.totalDurationRow}>
            <Clock size={11} color={Colors.gray600} />
            <AppText style={styles.totalDurationText}>45 - 60 mins Estimated duration</AppText>
          </View>
        </View>

        <TouchableOpacity
          style={styles.proceedButton}
          onPress={handleProceed}
          activeOpacity={0.88}
        >
          <AppText style={styles.proceedButtonText}>Proceed to Schedule</AppText>
          <ArrowRight size={18} color={Colors.black} />
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
    paddingBottom: 110,
  },
  titleSection: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
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
  stepperProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepCircleActive: {
    backgroundColor: '#059669',
  },
  stepNumberActive: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: '#FFFFFF',
  },
  stepNumberInactive: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: Colors.gray500,
  },
  stepLabelActive: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: '#059669',
  },
  stepLabelInactive: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: Colors.gray500,
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 4,
    marginBottom: 16,
  },
  cardBlock: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  cardDetailsCol: {
    flex: 1,
    paddingRight: 4,
  },
  sectionHeadingSmall: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: Colors.gray500,
  },
  cardPrimaryTitle: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
    marginTop: 1,
  },
  cardSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: Colors.gray600,
    marginTop: 1,
  },
  thumbnailCar: {
    width: 48,
    height: 34,
    borderRadius: BorderRadius.sm,
    marginRight: Spacing.xs,
  },
  thumbnailAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: Spacing.xs,
  },
  changePillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 3,
  },
  changePillText: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: '#059669',
  },
  washermanMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  washermanRatingText: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: Colors.gray700,
  },
  availableMiniBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: BorderRadius.full,
    gap: 3,
  },
  availableMiniDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#16A34A',
  },
  availableMiniText: {
    fontFamily: FontFamily.bold,
    fontSize: 8,
    color: '#15803D',
  },
  locationTextAddress: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: Colors.gray900,
    marginTop: 1,
    lineHeight: 14,
  },
  homeBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  homeBadgeText: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: Colors.gray600,
  },
  miniMapVisualBox: {
    width: 48,
    height: 40,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
    marginRight: Spacing.xs,
  },
  priceRowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 1,
  },
  priceBigGreen: {
    fontFamily: FontFamily.extraBold,
    fontSize: 18,
    color: '#059669',
  },
  viewPriceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    gap: 3,
  },
  viewPriceText: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: '#059669',
  },
  durationWithInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 1,
  },
  durationTitle: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
  },
  onSitePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  onSiteText: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: '#059669',
  },
  instructionsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  optionalText: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: Colors.gray400,
  },
  textAreaBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: Spacing.sm,
    minHeight: 70,
  },
  instructionsInput: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: Colors.gray900,
    padding: 0,
  },
  charCountText: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: Colors.gray400,
    textAlign: 'right',
    marginTop: 3,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    ...Shadows.lg,
  },
  bottomLeftSummary: {
    flex: 1,
  },
  totalPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  totalPriceLabel: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: Colors.gray500,
  },
  totalPriceValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  totalPriceNum: {
    fontFamily: FontFamily.extraBold,
    fontSize: 18,
    color: '#059669',
  },
  totalDurationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 1,
  },
  totalDurationText: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: Colors.gray600,
  },
  proceedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC107',
    paddingHorizontal: 16,
    height: 48,
    borderRadius: BorderRadius.full,
    gap: 4,
    ...Shadows.sm,
  },
  proceedButtonText: {
    fontFamily: FontFamily.bold,
    fontSize: 13,
    color: Colors.black,
  },
});
