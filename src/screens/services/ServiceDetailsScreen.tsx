import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Share2,
  Gem,
  Leaf,
  ShieldCheck,
  Check,
  Clock,
  CircleDollarSign,
  FileText,
  ArrowRight,
  Crown,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { mockServices } from '../../mocks/services';

interface ServiceDetailConfig {
  id: string;
  name: string;
  category: 'BIKE WASH' | 'CAR WASH';
  tagline: string;
  description: string;
  basePrice: number;
  priceRange: string;
  duration: string;
  imageUrl: string;
  includedActivities: string[];
}

const SERVICES_CATALOG: Record<string, ServiceDetailConfig> = {
  // BIKE SERVICES
  srv_bike_basic: {
    id: 'srv_bike_basic',
    name: 'Basic Bike Wash',
    category: 'BIKE WASH',
    tagline: 'Quick and effective wash to remove dust and dirt.',
    description: 'Quick and effective wash to remove dust and road dirt, keeping your two-wheeler spotless and road-ready.',
    basePrice: 149,
    priceRange: '₹149 - ₹199',
    duration: '30 - 40 mins',
    imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&q=80',
    includedActivities: [
      'High-pressure water rinse',
      'pH-neutral shampoo wash',
      'Tire & wheel rim cleaning',
      'Microfiber drying & buffing',
      'Mirror & visor cleaning',
      'Quick tire dressing',
    ],
  },
  srv_bike_foam: {
    id: 'srv_bike_foam',
    name: 'Foam Bike Wash',
    category: 'BIKE WASH',
    tagline: 'Deep foam cleaning for extra shine and protection.',
    description: 'Deep snow foam cleaning for extra shine and paint protection. Removes stubborn grease and road grime.',
    basePrice: 249,
    priceRange: '₹249 - ₹349',
    duration: '40 - 50 mins',
    imageUrl: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=600&q=80',
    includedActivities: [
      'High-pressure snow foam wash',
      'Engine exterior wash',
      'Deep wheel & rim scrub',
      'Microfiber scratch-free dry',
      'Tire & rim shine coating',
      'Mirror and chrome buffing',
    ],
  },
  srv_bike_premium: {
    id: 'srv_bike_premium',
    name: 'Premium Bike Wash',
    category: 'BIKE WASH',
    tagline: 'Advanced cleaning with high-quality products.',
    description: 'Advanced cleaning with high-quality products, chain cleaning, polish and complete paint protection.',
    basePrice: 399,
    priceRange: '₹399 - ₹499',
    duration: '50 - 70 mins',
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80',
    includedActivities: [
      'Full snow foam power wash',
      'Engine degreasing & cleaning',
      'Chain cleaning & lubrication',
      'Body polish & wax coating',
      'High-gloss tire dressing',
      'Chrome & metal buffing',
    ],
  },
  srv_bike_chain: {
    id: 'srv_bike_chain',
    name: 'Chain Cleaning',
    category: 'BIKE WASH',
    tagline: 'Specialized chain cleaning & lube for smooth performance.',
    description: 'Specialized high-performance chain cleaning and lubrication for extended chain life and smooth riding.',
    basePrice: 199,
    priceRange: '₹199 - ₹299',
    duration: '30 - 40 mins',
    imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80',
    includedActivities: [
      'Chain degreasing & grime removal',
      'Sprocket cleaning',
      'O-ring safe brush scrub',
      'High-tack synthetic lubrication',
      'Rear wheel wipe down',
      'Smooth gear engagement test',
    ],
  },
  srv_bike_detailing: {
    id: 'srv_bike_detailing',
    name: 'Full Bike Detailing',
    category: 'BIKE WASH',
    tagline: 'Complete care for a showroom like finish.',
    description: 'Complete top-to-bottom detailing with engine bay cleaning, scratch reduction polish, and Carnauba wax.',
    basePrice: 599,
    priceRange: '₹599 - ₹799',
    duration: '1.5 - 2 hours',
    imageUrl: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80',
    includedActivities: [
      'Complete deep power wash',
      'Engine steam degreasing',
      'Chain cleaning & lubing',
      'Multi-stage paint polish',
      'Carnauba wax protection coat',
      'Tire & plastics ceramic dressing',
    ],
  },

  // CAR SERVICES
  srv_car_exterior: {
    id: 'srv_car_exterior',
    name: 'Exterior Wash',
    category: 'CAR WASH',
    tagline: 'Remove dust, dirt and grime for a clean shiny exterior.',
    description: 'Remove dust, dirt and road grime for a clean and shiny exterior with high pressure water rinse.',
    basePrice: 299,
    priceRange: '₹299 - ₹449',
    duration: '30 - 45 mins',
    imageUrl: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&q=80',
    includedActivities: [
      'High pressure pre-rinse',
      'Exterior shampoo hand wash',
      'Wheel arch & mud flap wash',
      'Microfiber scratch-free dry',
      'Exterior glass and mirror clean',
      'Tire gloss dress',
    ],
  },
  srv_car_foam: {
    id: 'srv_car_foam',
    name: 'Foam Wash',
    category: 'CAR WASH',
    tagline: 'Deep clean. More shine. A fresher ride every time.',
    description: 'Deep foam cleaning for extra shine and protection. Removes dirt, grime and road contaminants, leaving your car looking fresh and new.',
    basePrice: 399,
    priceRange: '₹399 - ₹599',
    duration: '45 - 60 mins',
    imageUrl: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=600&q=80',
    includedActivities: [
      'Pre-rinse with high pressure',
      'Body polishing',
      'Foam application',
      'Windows & mirrors cleaning',
      'Hand wash & cleaning',
      'Final rinse & dry',
      'Wheel & tire cleaning',
      'Exterior shine',
    ],
  },
  srv_car_interior: {
    id: 'srv_car_interior',
    name: 'Interior Cleaning',
    category: 'CAR WASH',
    tagline: "Clean and refresh your car's interior for a healthier ride.",
    description: "Deep interior vacuuming, dashboard conditioning, AC vent sanitization and upholstery stain removal.",
    basePrice: 499,
    priceRange: '₹499 - ₹699',
    duration: '45 - 60 mins',
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80',
    includedActivities: [
      'Deep interior cabin vacuuming',
      'Dashboard & console polish',
      'Door pads & panels cleaning',
      'AC vent antibacterial cleaning',
      'Floor mat shampoo & dry',
      'Interior glass shine & perfume',
    ],
  },
  srv_car_full: {
    id: 'srv_car_full',
    name: 'Full Car Wash',
    category: 'CAR WASH',
    tagline: 'Complete cleaning inside and out for a fresh look.',
    description: 'Comprehensive package combining full exterior snow foam wash with complete interior vacuuming and polish.',
    basePrice: 699,
    priceRange: '₹699 - ₹899',
    duration: '60 - 90 mins',
    imageUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&q=80',
    includedActivities: [
      'High-pressure exterior snow foam wash',
      'Complete interior vacuuming',
      'Dashboard & trim dressing',
      'Wheel rim & tire scrub & glaze',
      'Windows clean inside & out',
      'Cabin freshener application',
    ],
  },
  srv_car_detailing: {
    id: 'srv_car_detailing',
    name: 'Premium Detailing',
    category: 'CAR WASH',
    tagline: 'Advanced care with high-quality products for a showroom finish.',
    description: 'Ultimate showroom treatment with paint clay bar, machine polish, ceramic gloss wax, and deep upholstery shampoo.',
    basePrice: 999,
    priceRange: '₹999 - ₹1,499',
    duration: '1.5 - 2 hours',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80',
    includedActivities: [
      'Snow foam wash & clay bar prep',
      'Machine buffing & scratch polish',
      'Hydrophobic ceramic wax coat',
      'Upholstery deep steam cleaning',
      'Leather & vinyl UV protection',
      'Engine bay dust & wipe down',
    ],
  },
};

type ServiceDetailsRouteProp = RouteProp<RootStackParamList, typeof Routes.SERVICE_DETAILS>;
type ServiceDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.SERVICE_DETAILS
>;

export const ServiceDetailsScreen: React.FC = () => {
  const navigation = useNavigation<ServiceDetailsNavigationProp>();
  const route = useRoute<ServiceDetailsRouteProp>();

  const serviceId = route.params?.serviceId || 'srv_car_foam';
  const service = SERVICES_CATALOG[serviceId] || SERVICES_CATALOG['srv_car_foam'];

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Book ${service.name} on WashOn starting at ₹${service.basePrice}!`,
      });
    } catch (error) {}
  };

  const handleSelectService = () => {
    navigation.navigate(Routes.ADD_ONS, { serviceId: service.id });
  };

  const includedActivities = service.includedActivities;

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

        <AppText style={styles.headerTitle}>Service Details</AppText>

        <TouchableOpacity
          style={styles.shareButton}
          onPress={handleShare}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Share2 size={20} color={Colors.black} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Visual Banner Card */}
        <View style={styles.heroImageCard}>
          <Image
            source={{
              uri: service.imageUrl,
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroGradientOverlay} />

          {/* Sticker Stamp in Top Right */}
          <View style={styles.stickerStamp}>
            <AppText style={styles.stickerStampText}>CLEANER</AppText>
            <AppText style={styles.stickerStampText}>BRIGHTER</AppText>
            <AppText style={styles.stickerStampText}>HAPPIER RIDES</AppText>
          </View>

          {/* Hero Content on Bottom */}
          <View style={styles.heroTextOverlay}>
            <View style={styles.categoryPill}>
              <AppText style={styles.categoryPillText}>{service.category}</AppText>
            </View>
            <AppText style={styles.heroTitle}>{service.name}</AppText>
            <AppText style={styles.heroTagline}>{service.tagline}</AppText>

            {/* 3 Badges */}
            <View style={styles.heroBadgesRow}>
              <View style={styles.heroBadge}>
                <Gem size={12} color="#FFFFFF" />
                <AppText style={styles.heroBadgeText}>Premium Care</AppText>
              </View>
              <View style={styles.heroBadge}>
                <Leaf size={12} color="#FFFFFF" />
                <AppText style={styles.heroBadgeText}>Eco Friendly Products</AppText>
              </View>
              <View style={styles.heroBadge}>
                <ShieldCheck size={12} color="#FFFFFF" />
                <AppText style={styles.heroBadgeText}>
                  Safe for Your {service.category === 'BIKE WASH' ? 'Bike' : 'Car'}
                </AppText>
              </View>
            </View>
          </View>
        </View>

        {/* Main Service Description & Price Card */}
        <View style={styles.infoPriceCard}>
          <View style={styles.descLeftBlock}>
            <AppText style={styles.cardServiceName}>{service.name}</AppText>
            <AppText style={styles.cardServiceDesc}>{service.description}</AppText>
          </View>

          <View style={styles.priceRightBlock}>
            <AppText style={styles.startingAtLabel}>Starting at</AppText>
            <AppText style={styles.priceBig}>₹{service.basePrice}</AppText>
            <AppText style={styles.priceRangeSmall}>({service.priceRange})</AppText>
            <View style={styles.bestValueBadge}>
              <Crown size={10} color="#059669" />
              <AppText style={styles.bestValueText}>Best Value</AppText>
            </View>
          </View>
        </View>

        {/* Included Activities Card */}
        <View style={styles.includedCard}>
          <AppText style={styles.sectionTitle}>Included Activities</AppText>
          <View style={styles.activitiesGrid}>
            {includedActivities.map((act, idx) => (
              <View key={idx} style={styles.activityItem}>
                <View style={styles.greenCheckCircle}>
                  <Check size={11} color="#FFFFFF" strokeWidth={3} />
                </View>
                <AppText style={styles.activityText}>{act}</AppText>
              </View>
            ))}
          </View>
        </View>

        {/* Stats 2-Column Row */}
        <View style={styles.statsRow}>
          {/* Estimated Duration */}
          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, { backgroundColor: '#E0F2FE' }]}>
              <Clock size={18} color="#0284C7" />
            </View>
            <AppText style={styles.statLabel}>Estimated Duration</AppText>
            <AppText style={styles.statMainText}>{service.duration}</AppText>
            <AppText style={styles.statSubText}>Depending on vehicle size</AppText>
          </View>

          {/* Price Range */}
          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, { backgroundColor: '#FEF3C7' }]}>
              <CircleDollarSign size={18} color="#D97706" />
            </View>
            <AppText style={styles.statLabel}>Price Range</AppText>
            <AppText style={styles.statMainText}>{service.priceRange}</AppText>
            <AppText style={styles.statSubText}>Final price may vary</AppText>
          </View>
        </View>

        {/* Customer Instructions Card */}
        <View style={styles.instructionsCard}>
          <View style={styles.instructionsHeaderRow}>
            <View style={styles.instructionsIconCircle}>
              <FileText size={16} color="#DC2626" />
            </View>
            <AppText style={styles.instructionsTitle}>Customer Instructions</AppText>
          </View>

          <View style={styles.instructionsList}>
            <AppText style={styles.instructionBullet}>
              • Please remove valuable items from your vehicle.
            </AppText>
            <AppText style={styles.instructionBullet}>
              • Ensure all doors and windows are properly closed.
            </AppText>
            <AppText style={styles.instructionBullet}>
              • Inform us if there are any special cleaning requests.
            </AppText>
            <AppText style={styles.instructionBullet}>
              • For heavily soiled vehicles, extra charges may apply.
            </AppText>
          </View>
        </View>

        {/* Select Service Primary Button */}
        <TouchableOpacity
          style={styles.selectServiceButton}
          onPress={handleSelectService}
          activeOpacity={0.88}
        >
          <AppText style={styles.selectServiceButtonText}>Select Service</AppText>
          <ArrowRight size={20} color={Colors.black} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </ScrollView>
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
    paddingBottom: Spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.lg,
    color: Colors.gray900,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing['3xl'],
  },
  heroImageCard: {
    height: 220,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradientOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
  },
  stickerStamp: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FEF08A',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: BorderRadius.md,
    transform: [{ rotate: '5deg' }],
  },
  stickerStampText: {
    fontFamily: FontFamily.extraBold,
    fontSize: 9,
    color: '#B45309',
    textAlign: 'center',
  },
  heroTextOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
  },
  categoryPill: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  categoryPillText: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontFamily: FontFamily.extraBold,
    fontSize: Typography.size.xxl,
    color: '#FFFFFF',
  },
  heroTagline: {
    fontFamily: FontFamily.medium,
    fontSize: Typography.size.xs,
    color: '#E2E8F0',
    marginTop: 2,
    marginBottom: 8,
  },
  heroBadgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
    gap: 4,
  },
  heroBadgeText: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: '#FFFFFF',
  },
  infoPriceCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  descLeftBlock: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  cardServiceName: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.lg,
    color: Colors.gray900,
  },
  cardServiceDesc: {
    fontFamily: FontFamily.regular,
    fontSize: Typography.size.xs,
    color: Colors.gray600,
    lineHeight: 16,
    marginTop: 4,
  },
  priceRightBlock: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  startingAtLabel: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: Colors.gray500,
  },
  priceBig: {
    fontFamily: FontFamily.extraBold,
    fontSize: 22,
    color: '#059669',
  },
  priceRangeSmall: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: Colors.gray500,
    marginTop: 1,
  },
  bestValueBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    gap: 3,
    marginTop: 4,
  },
  bestValueText: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: '#059669',
  },
  includedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  sectionTitle: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.md,
    color: Colors.gray900,
    marginBottom: Spacing.sm,
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 8,
  },
  activityItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingRight: 4,
  },
  greenCheckCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityText: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: Colors.gray800,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    padding: Spacing.md,
    ...Shadows.sm,
  },
  statIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontFamily: FontFamily.regular,
    fontSize: Typography.size.xs,
    color: Colors.gray500,
  },
  statMainText: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
    marginTop: 2,
  },
  statSubText: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: Colors.gray500,
    marginTop: 2,
  },
  instructionsCard: {
    backgroundColor: '#FFF1F2',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#FECDD3',
    padding: Spacing.md,
    marginBottom: Spacing.xl,
  },
  instructionsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  instructionsIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFE4E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionsTitle: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
  },
  instructionsList: {
    paddingLeft: 4,
    gap: 4,
  },
  instructionBullet: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: Colors.gray700,
    lineHeight: 16,
  },
  selectServiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    backgroundColor: '#FFC107',
    borderRadius: BorderRadius.full,
    ...Shadows.sm,
  },
  selectServiceButtonText: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.md,
    color: Colors.black,
  },
});
