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

const { width } = Dimensions.get('window');

type ServiceDetailsRouteProp = RouteProp<RootStackParamList, typeof Routes.SERVICE_DETAILS>;
type ServiceDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.SERVICE_DETAILS
>;

export const ServiceDetailsScreen: React.FC = () => {
  const navigation = useNavigation<ServiceDetailsNavigationProp>();
  const route = useRoute<ServiceDetailsRouteProp>();

  const serviceId = route.params?.serviceId;
  const service = mockServices.find((s) => s.id === serviceId) || {
    id: 'srv_foam_wash',
    name: 'Foam Wash',
    category: 'CAR WASH',
    tagline: 'Deep clean. More shine. A fresher ride every time.',
    description:
      'Deep foam cleaning for extra shine and protection. Removes dirt, grime and road contaminants, leaving your car looking fresh and new.',
    basePrice: 399,
    estimatedDurationMinutes: 50,
    imageUrl: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=600&q=80',
  };

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

  const includedActivities = [
    'Pre-rinse with high pressure',
    'Body polishing',
    'Foam application',
    'Windows & mirrors cleaning',
    'Hand wash & cleaning',
    'Final rinse & dry',
    'Wheel & tire cleaning',
    'Exterior shine',
  ];

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
              uri: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=600&q=80',
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
              <AppText style={styles.categoryPillText}>CAR WASH</AppText>
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
                <AppText style={styles.heroBadgeText}>Safe for Your Car</AppText>
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
            <AppText style={styles.priceRangeSmall}>(₹399 - ₹599)</AppText>
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
            <AppText style={styles.statMainText}>45 - 60 mins</AppText>
            <AppText style={styles.statSubText}>Depending on vehicle size</AppText>
          </View>

          {/* Price Range */}
          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, { backgroundColor: '#FEF3C7' }]}>
              <CircleDollarSign size={18} color="#D97706" />
            </View>
            <AppText style={styles.statLabel}>Price Range</AppText>
            <AppText style={styles.statMainText}>₹399 - ₹599</AppText>
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
