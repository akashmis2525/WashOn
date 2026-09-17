import React, { useState } from 'react';
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
  Heart,
  Star,
  CheckCircle,
  MapPin,
  Clock,
  Calendar,
  Zap,
  Check,
  ChevronRight,
  ChevronDown,
  Info,
  ArrowRight,
  ShieldCheck,
  Droplets,
  Wind,
  Sparkles,
  Layers,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { mockWashermen } from '../../mocks/washermen';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type WashermanProfileRouteProp = RouteProp<RootStackParamList, typeof Routes.WASHERMAN_PROFILE>;
type WashermanProfileNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.WASHERMAN_PROFILE
>;

export const WashermanProfileScreen: React.FC = () => {
  const navigation = useNavigation<WashermanProfileNavProp>();
  const route = useRoute<WashermanProfileRouteProp>();
  const { setDraftWasherman } = useBookingStore();

  const washermanId = route.params?.washermanId;
  const washerman = mockWashermen.find((w) => w.id === washermanId) || mockWashermen[0];

  const [isFavorite, setIsFavorite] = useState(false);
  const [isExpandedAbout, setIsExpandedAbout] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Book ${washerman.name} on WashOn - ⭐ ${washerman.rating} rating!`,
      });
    } catch (e) {}
  };

  const handleSelectWasherman = () => {
    setDraftWasherman(washerman);
    navigation.navigate(Routes.BOOKING_DETAILS);
  };

  const vehicleTypes = [
    {
      id: 'bike',
      name: 'Bikes',
      imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=200&q=80',
    },
    {
      id: 'hatchback',
      name: 'Hatchback',
      imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=200&q=80',
    },
    {
      id: 'suv',
      name: 'SUV',
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&q=80',
    },
    {
      id: 'luxury',
      name: 'Luxury Cars',
      imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200&q=80',
    },
  ];

  const equipmentList = [
    { id: '1', name: 'High Pressure Washer', icon: Droplets, color: '#0284C7', bg: '#E0F2FE' },
    { id: '2', name: 'Vacuum Cleaner', icon: Wind, color: '#4B5563', bg: '#F3F4F6' },
    { id: '3', name: 'Premium Cleaning Products', icon: Sparkles, color: '#2563EB', bg: '#EFF6FF' },
    { id: '4', name: 'Microfiber Towels', icon: Layers, color: '#059669', bg: '#ECFDF5' },
  ];

  const reviewsSample = [
    {
      id: 'rev_1',
      author: 'Amit Sharma',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
      rating: 5,
      date: '2 days ago',
      text: 'Excellent service! Very professional and on time. My car looks brand new. Highly recommended!',
    },
    {
      id: 'rev_2',
      author: 'Priya Singh',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      rating: 5,
      date: '5 days ago',
      text: 'Great work! Polite, punctual and attention to detail. Will book again.',
    },
    {
      id: 'rev_3',
      author: 'Sameer Ali',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      rating: 5,
      date: '1 week ago',
      text: 'Amazing service for bike wash. Cleaned every corner. Value for money!',
    },
  ];

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

        <AppText style={styles.headerTitle}>Washerman Profile</AppText>

        <View style={styles.headerRightActions}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={handleShare}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Share2 size={20} color={Colors.black} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={() => setIsFavorite(!isFavorite)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Heart
              size={20}
              color={isFavorite ? '#EF4444' : Colors.black}
              fill={isFavorite ? '#EF4444' : 'none'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Hero Info Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            {/* Avatar with Online badge */}
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri:
                    washerman.avatarUrl ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
                }}
                style={styles.heroAvatar}
              />
              <View style={styles.onlineBadge}>
                <View style={styles.greenDot} />
                <AppText style={styles.onlineText}>Online Now</AppText>
              </View>
            </View>

            {/* Profile Info */}
            <View style={styles.heroInfoBlock}>
              <View style={styles.nameRow}>
                <AppText style={styles.washermanName}>{washerman.name}</AppText>
                <CheckCircle size={16} color="#0284C7" fill="#38BDF8" style={{ marginLeft: 4 }} />
              </View>

              <AppText style={styles.professionText}>
                Professional Car & Bike Washer
              </AppText>

              <View style={styles.availableRow}>
                <View style={styles.availablePill}>
                  <View style={styles.greenSmallDot} />
                  <AppText style={styles.availableText}>Available Now</AppText>
                </View>
              </View>

              <View style={styles.ratingRow}>
                <Star size={14} color="#EAB308" fill="#EAB308" />
                <AppText style={styles.ratingScore}>{washerman.rating}</AppText>
                <AppText style={styles.reviewCount}>({washerman.totalReviews} reviews)</AppText>
              </View>
            </View>
          </View>

          {/* 4 Stat Cards Row */}
          <View style={styles.statBoxesRow}>
            {/* 1. Services Completed */}
            <View style={styles.statBox}>
              <View style={styles.statIconBadge}>
                <CheckCircle size={14} color="#111827" />
              </View>
              <AppText style={styles.statNumber}>850+</AppText>
              <AppText style={styles.statText}>Services Completed</AppText>
            </View>

            {/* 2. Experience */}
            <View style={styles.statBox}>
              <View style={styles.statIconBadge}>
                <Calendar size={14} color="#111827" />
              </View>
              <AppText style={styles.statNumber}>3+ Years</AppText>
              <AppText style={styles.statText}>Experience</AppText>
            </View>

            {/* 3. Distance */}
            <View style={styles.statBox}>
              <View style={styles.statIconBadge}>
                <MapPin size={14} color="#111827" />
              </View>
              <AppText style={styles.statNumber}>0.8 km</AppText>
              <AppText style={styles.statText}>Away</AppText>
            </View>

            {/* 4. Est Arrival */}
            <View style={styles.statBox}>
              <View style={styles.statIconBadge}>
                <Zap size={14} color="#111827" />
              </View>
              <AppText style={styles.statNumber}>5 - 10 mins</AppText>
              <AppText style={styles.statText}>Est. Arrival</AppText>
            </View>
          </View>
        </View>

        {/* Section: Vehicle Types Handled */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionTitleRow}>
            <AppText style={styles.sectionTitle}>Vehicle Types Handled</AppText>
            <TouchableOpacity activeOpacity={0.7}>
              <AppText style={styles.viewPhotosLink}>View Work Photos ›</AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.vehicleTypesRow}>
            {vehicleTypes.map((v) => (
              <View key={v.id} style={styles.vehicleTypeCard}>
                <Image source={{ uri: v.imageUrl }} style={styles.vehicleTypeImage} />
                <View style={styles.vehicleTypeBadge}>
                  <Check size={10} color="#059669" strokeWidth={3} />
                  <AppText style={styles.vehicleTypeName}>{v.name}</AppText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Section: About Me */}
        <View style={styles.sectionBlock}>
          <AppText style={styles.sectionTitle}>About Me</AppText>
          <View style={styles.aboutCard}>
            <AppText style={styles.aboutText} numberOfLines={isExpandedAbout ? undefined : 3}>
              Hi, I'm Rakesh. I provide professional and high-quality car & bike washing services at your doorstep. My focus is on customer satisfaction and giving your vehicle the best care.
            </AppText>
            <TouchableOpacity
              onPress={() => setIsExpandedAbout(!isExpandedAbout)}
              style={styles.readMoreBtn}
            >
              <AppText style={styles.readMoreText}>
                {isExpandedAbout ? 'Show Less' : 'Read More'}
              </AppText>
              <ChevronDown size={14} color="#0284C7" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Section: Equipment I Use */}
        <View style={styles.sectionBlock}>
          <AppText style={styles.sectionTitle}>Equipment I Use</AppText>
          <View style={styles.equipmentGrid}>
            {equipmentList.map((eq) => {
              const IconComp = eq.icon;
              return (
                <View key={eq.id} style={styles.equipmentCard}>
                  <View style={[styles.equipmentIconBox, { backgroundColor: eq.bg }]}>
                    <IconComp size={18} color={eq.color} />
                  </View>
                  <AppText style={styles.equipmentLabel}>{eq.name}</AppText>
                </View>
              );
            })}
          </View>
        </View>

        {/* Section: Customer Reviews */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionTitleRow}>
            <AppText style={styles.sectionTitle}>
              Customer Reviews ({washerman.totalReviews || 320})
            </AppText>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.WASHERMAN_REVIEWS, { washermanId: washerman.id })}
              activeOpacity={0.7}
            >
              <AppText style={styles.viewAllLink}>View All ›</AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.reviewsList}>
            {reviewsSample.map((rev) => (
              <View key={rev.id} style={styles.reviewCard}>
                <View style={styles.reviewTopRow}>
                  <Image source={{ uri: rev.avatar }} style={styles.reviewAvatar} />
                  <View style={styles.reviewAuthorBlock}>
                    <AppText style={styles.reviewAuthor}>{rev.author}</AppText>
                    <View style={styles.starsRow}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={11} color="#EAB308" fill="#EAB308" />
                      ))}
                    </View>
                  </View>
                  <AppText style={styles.reviewDate}>{rev.date}</AppText>
                </View>
                <AppText style={styles.reviewContent}>{rev.text}</AppText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Floating Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPriceBlock}>
          <AppText style={styles.startingFromLabel}>Starting from</AppText>
          <View style={styles.priceRow}>
            <AppText style={styles.priceValue}>₹149</AppText>
            <Info size={14} color={Colors.gray400} />
          </View>
        </View>

        <TouchableOpacity
          style={styles.selectWashermanButton}
          onPress={handleSelectWasherman}
          activeOpacity={0.88}
        >
          <AppText style={styles.selectWashermanText}>Select Washerman</AppText>
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
  headerTitle: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.lg,
    color: Colors.gray900,
  },
  headerRightActions: {
    flexDirection: 'row',
    gap: 4,
  },
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 100,
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    padding: Spacing.md,
    marginTop: Spacing.xs,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  heroAvatar: {
    width: 88,
    height: 88,
    borderRadius: BorderRadius.xl,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: -6,
    left: 4,
    right: 4,
    backgroundColor: '#22C55E',
    borderRadius: BorderRadius.xs,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  greenDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#FFFFFF',
  },
  onlineText: {
    fontFamily: FontFamily.bold,
    fontSize: 9,
    color: '#FFFFFF',
  },
  heroInfoBlock: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  washermanName: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.lg,
    color: Colors.gray900,
  },
  professionText: {
    fontFamily: FontFamily.regular,
    fontSize: Typography.size.xs,
    color: Colors.gray600,
    marginTop: 1,
  },
  availableRow: {
    marginTop: 4,
    marginBottom: 4,
  },
  availablePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
    gap: 4,
  },
  greenSmallDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },
  availableText: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: '#15803D',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingScore: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.xs,
    color: Colors.gray900,
  },
  reviewCount: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: Colors.gray500,
  },
  statBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: 4,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statIconBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  statNumber: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: Colors.gray900,
  },
  statText: {
    fontFamily: FontFamily.regular,
    fontSize: 9,
    color: Colors.gray500,
    textAlign: 'center',
  },
  sectionBlock: {
    marginBottom: Spacing.md,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  sectionTitle: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
  },
  viewPhotosLink: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.xs,
    color: '#0284C7',
  },
  viewAllLink: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.xs,
    color: '#0284C7',
  },
  vehicleTypesRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  vehicleTypeCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 6,
    alignItems: 'center',
    ...Shadows.sm,
  },
  vehicleTypeImage: {
    width: '100%',
    height: 45,
    borderRadius: BorderRadius.sm,
    marginBottom: 4,
  },
  vehicleTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  vehicleTypeName: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: Colors.gray800,
  },
  aboutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    padding: Spacing.md,
    ...Shadows.sm,
  },
  aboutText: {
    fontFamily: FontFamily.regular,
    fontSize: Typography.size.xs,
    color: Colors.gray700,
    lineHeight: 18,
  },
  readMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 2,
  },
  readMoreText: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: '#0284C7',
  },
  equipmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  equipmentCard: {
    width: (width - Spacing.xl * 2 - Spacing.sm) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: Spacing.sm,
    gap: 8,
    ...Shadows.sm,
  },
  equipmentIconBox: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  equipmentLabel: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: Colors.gray800,
  },
  reviewsList: {
    gap: Spacing.sm,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    padding: Spacing.md,
    ...Shadows.sm,
  },
  reviewTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  reviewAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: Spacing.sm,
  },
  reviewAuthorBlock: {
    flex: 1,
  },
  reviewAuthor: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.xs,
    color: Colors.gray900,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 1,
  },
  reviewDate: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: Colors.gray400,
  },
  reviewContent: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: Colors.gray600,
    lineHeight: 16,
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
  bottomPriceBlock: {
    flex: 1,
  },
  startingFromLabel: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: Colors.gray500,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  priceValue: {
    fontFamily: FontFamily.extraBold,
    fontSize: 20,
    color: '#059669',
  },
  selectWashermanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC107',
    paddingHorizontal: 20,
    height: 48,
    borderRadius: BorderRadius.full,
    gap: 4,
    ...Shadows.sm,
  },
  selectWashermanText: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.sm,
    color: Colors.black,
  },
});
