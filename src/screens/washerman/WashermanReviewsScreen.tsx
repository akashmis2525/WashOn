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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Star,
  CheckCircle,
  Calendar,
  ThumbsUp,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
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

type WashermanReviewsRouteProp = RouteProp<RootStackParamList, typeof Routes.WASHERMAN_REVIEWS>;
type WashermanReviewsNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.WASHERMAN_REVIEWS
>;

export const WashermanReviewsScreen: React.FC = () => {
  const navigation = useNavigation<WashermanReviewsNavProp>();
  const route = useRoute<WashermanReviewsRouteProp>();
  const { setDraftWasherman } = useBookingStore();

  const washermanId = route.params?.washermanId;
  const washerman = mockWashermen.find((w) => w.id === washermanId) || mockWashermen[0];

  const [sortOption, setSortOption] = useState('Most Recent');

  const ratingBars = [
    { stars: 5, percentage: 78 },
    { stars: 4, percentage: 16 },
    { stars: 3, percentage: 4 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
  ];

  const handleBookNow = () => {
    setDraftWasherman(washerman);
    navigation.navigate(Routes.BOOKING_DETAILS);
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

        <AppText style={styles.headerTitle}>Washerman Reviews</AppText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Mini Profile Card */}
        <View style={styles.miniProfileCard}>
          <View style={styles.miniProfileTopRow}>
            <Image
              source={{
                uri:
                  washerman.avatarUrl ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
              }}
              style={styles.miniAvatar}
            />

            <View style={styles.miniProfileDetails}>
              <AppText style={styles.profileName}>{washerman.name}</AppText>
              <AppText style={styles.profileRole}>Professional Car & Bike Washer</AppText>
              <View style={styles.availablePill}>
                <View style={styles.greenDot} />
                <AppText style={styles.availableText}>Available Now</AppText>
              </View>
            </View>

            <TouchableOpacity
              style={styles.bookNowMiniBtn}
              onPress={handleBookNow}
              activeOpacity={0.85}
            >
              <AppText style={styles.bookNowMiniText}>Book Now</AppText>
              <ArrowRight size={13} color={Colors.black} />
            </TouchableOpacity>
          </View>

          {/* 4 Stats Bar */}
          <View style={styles.miniStatsBar}>
            <View style={styles.miniStatItem}>
              <CheckCircle size={13} color="#111827" />
              <View>
                <AppText style={styles.miniStatNum}>850+</AppText>
                <AppText style={styles.miniStatLabel}>Services</AppText>
              </View>
            </View>

            <View style={styles.miniStatItem}>
              <Calendar size={13} color="#111827" />
              <View>
                <AppText style={styles.miniStatNum}>3+ Yrs</AppText>
                <AppText style={styles.miniStatLabel}>Experience</AppText>
              </View>
            </View>

            <View style={styles.miniStatItem}>
              <Star size={13} color="#D97706" fill="#D97706" />
              <View>
                <AppText style={styles.miniStatNum}>4.8</AppText>
                <AppText style={styles.miniStatLabel}>Rating</AppText>
              </View>
            </View>

            <View style={styles.miniStatItem}>
              <ThumbsUp size={13} color="#111827" />
              <View>
                <AppText style={styles.miniStatNum}>98%</AppText>
                <AppText style={styles.miniStatLabel}>Positive</AppText>
              </View>
            </View>
          </View>
        </View>

        {/* Rating Breakdown Card */}
        <View style={styles.breakdownCard}>
          {/* Left Score Block */}
          <View style={styles.scoreBlock}>
            <AppText style={styles.excellentLabel}>Excellent</AppText>
            <AppText style={styles.scoreBig}>
              4.8<AppText style={styles.scoreDenominator}> / 5</AppText>
            </AppText>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={13} color="#EAB308" fill="#EAB308" />
              ))}
            </View>
            <AppText style={styles.basedOnText}>Based on 320 reviews</AppText>
          </View>

          {/* Right Progress Bars */}
          <View style={styles.barsBlock}>
            {ratingBars.map((bar) => (
              <View key={bar.stars} style={styles.barRow}>
                <AppText style={styles.starNumber}>{bar.stars}</AppText>
                <Star size={10} color="#EAB308" fill="#EAB308" style={{ marginRight: 4 }} />
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${bar.percentage}%` }]} />
                </View>
                <AppText style={styles.percentageText}>{bar.percentage}%</AppText>
              </View>
            ))}
          </View>
        </View>

        {/* Customer Reviews Section */}
        <View style={styles.reviewsSectionHeader}>
          <AppText style={styles.reviewsSectionTitle}>Customer Reviews (320)</AppText>
          <TouchableOpacity style={styles.sortDropdown} activeOpacity={0.8}>
            <AppText style={styles.sortText}>{sortOption}</AppText>
            <ChevronDown size={14} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Reviews List */}
        <View style={styles.reviewsList}>
          {/* Review 1: Amit Sharma with Before/After Photos */}
          <View style={styles.reviewCard}>
            <View style={styles.reviewTopRow}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80',
                }}
                style={styles.reviewerAvatar}
              />
              <View style={styles.reviewerInfo}>
                <View style={styles.nameVerifiedRow}>
                  <AppText style={styles.reviewerName}>Amit Sharma</AppText>
                  <View style={styles.verifiedBadge}>
                    <CheckCircle size={10} color="#059669" />
                    <AppText style={styles.verifiedText}>Verified Booking</AppText>
                  </View>
                </View>
                <View style={styles.starsDateRow}>
                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={12} color="#EAB308" fill="#EAB308" />
                    ))}
                  </View>
                  <AppText style={styles.ratingNumber}>5.0</AppText>
                </View>
              </View>
              <AppText style={styles.reviewTimeAgo}>2 days ago</AppText>
            </View>

            <AppText style={styles.reviewText}>
              Excellent service! Very professional and on time. My bike looks brand new. Highly recommended!
            </AppText>

            {/* Before / After Photos Showcase */}
            <View style={styles.beforeAfterContainer}>
              <View style={styles.photoBox}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=300&q=80',
                  }}
                  style={styles.photoImg}
                />
                <View style={styles.beforeTag}>
                  <AppText style={styles.tagText}>Before</AppText>
                </View>
              </View>

              <ArrowRight size={16} color={Colors.gray400} />

              <View style={styles.photoBox}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=300&q=80',
                  }}
                  style={styles.photoImg}
                />
                <View style={styles.afterTag}>
                  <AppText style={styles.tagText}>After</AppText>
                </View>
              </View>
            </View>
          </View>

          {/* Review 2: Priya Singh with Car Before/After Photos */}
          <View style={styles.reviewCard}>
            <View style={styles.reviewTopRow}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
                }}
                style={styles.reviewerAvatar}
              />
              <View style={styles.reviewerInfo}>
                <View style={styles.nameVerifiedRow}>
                  <AppText style={styles.reviewerName}>Priya Singh</AppText>
                  <View style={styles.verifiedBadge}>
                    <CheckCircle size={10} color="#059669" />
                    <AppText style={styles.verifiedText}>Verified Booking</AppText>
                  </View>
                </View>
                <View style={styles.starsDateRow}>
                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={12} color="#EAB308" fill="#EAB308" />
                    ))}
                  </View>
                  <AppText style={styles.ratingNumber}>5.0</AppText>
                </View>
              </View>
              <AppText style={styles.reviewTimeAgo}>5 days ago</AppText>
            </View>

            <AppText style={styles.reviewText}>
              Great work! Polite, punctual and attention to detail. My car looks amazing. Will book again.
            </AppText>

            {/* Before / After Car Photos */}
            <View style={styles.beforeAfterContainer}>
              <View style={styles.photoBox}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=300&q=80',
                  }}
                  style={styles.photoImg}
                />
                <View style={styles.beforeTag}>
                  <AppText style={styles.tagText}>Before</AppText>
                </View>
              </View>

              <ArrowRight size={16} color={Colors.gray400} />

              <View style={styles.photoBox}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300&q=80',
                  }}
                  style={styles.photoImg}
                />
                <View style={styles.afterTag}>
                  <AppText style={styles.tagText}>After</AppText>
                </View>
              </View>
            </View>
          </View>

          {/* Review 3: Sameer Ali */}
          <View style={styles.reviewCard}>
            <View style={styles.reviewTopRow}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
                }}
                style={styles.reviewerAvatar}
              />
              <View style={styles.reviewerInfo}>
                <View style={styles.nameVerifiedRow}>
                  <AppText style={styles.reviewerName}>Sameer Ali</AppText>
                  <View style={styles.verifiedBadge}>
                    <CheckCircle size={10} color="#059669" />
                    <AppText style={styles.verifiedText}>Verified Booking</AppText>
                  </View>
                </View>
                <View style={styles.starsDateRow}>
                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={12}
                        color={s <= 4 ? '#EAB308' : '#D1D5DB'}
                        fill={s <= 4 ? '#EAB308' : '#D1D5DB'}
                      />
                    ))}
                  </View>
                  <AppText style={styles.ratingNumber}>4.5</AppText>
                </View>
              </View>
              <AppText style={styles.reviewTimeAgo}>1 week ago</AppText>
            </View>

            <AppText style={styles.reviewText}>
              Very good service. Cleaned every corner properly. Good value for money.
            </AppText>
          </View>
        </View>
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
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing['3xl'],
  },
  miniProfileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  miniProfileTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: Spacing.sm,
  },
  miniProfileDetails: {
    flex: 1,
  },
  profileName: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
  },
  profileRole: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: Colors.gray500,
  },
  availablePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
    gap: 3,
    marginTop: 2,
  },
  greenDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#16A34A',
  },
  availableText: {
    fontFamily: FontFamily.bold,
    fontSize: 9,
    color: '#15803D',
  },
  bookNowMiniBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC107',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    gap: 3,
  },
  bookNowMiniText: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: Colors.black,
  },
  miniStatsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    paddingTop: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  miniStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  miniStatNum: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: Colors.gray900,
  },
  miniStatLabel: {
    fontFamily: FontFamily.regular,
    fontSize: 8,
    color: Colors.gray500,
  },
  breakdownCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  scoreBlock: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#F3F4F6',
    paddingRight: Spacing.sm,
  },
  excellentLabel: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.xs,
    color: Colors.gray800,
  },
  scoreBig: {
    fontFamily: FontFamily.extraBold,
    fontSize: 26,
    color: '#059669',
    marginTop: 1,
  },
  scoreDenominator: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.gray500,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 2,
    marginBottom: 2,
  },
  basedOnText: {
    fontFamily: FontFamily.regular,
    fontSize: 9,
    color: Colors.gray500,
    textAlign: 'center',
  },
  barsBlock: {
    flex: 1,
    paddingLeft: Spacing.md,
    justifyContent: 'center',
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  starNumber: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: Colors.gray700,
    width: 8,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 3,
  },
  percentageText: {
    fontFamily: FontFamily.medium,
    fontSize: 9,
    color: Colors.gray600,
    width: 26,
    textAlign: 'right',
  },
  reviewsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  reviewsSectionTitle: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
  },
  sortDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  sortText: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: Colors.gray800,
  },
  reviewsList: {
    gap: Spacing.md,
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
  },
  reviewerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: Spacing.sm,
  },
  reviewerInfo: {
    flex: 1,
  },
  nameVerifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reviewerName: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.xs,
    color: Colors.gray900,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: BorderRadius.full,
    gap: 3,
  },
  verifiedText: {
    fontFamily: FontFamily.bold,
    fontSize: 8,
    color: '#059669',
  },
  starsDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 1,
  },
  ratingNumber: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: Colors.gray800,
  },
  reviewTimeAgo: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: Colors.gray400,
  },
  reviewText: {
    fontFamily: FontFamily.regular,
    fontSize: Typography.size.xs,
    color: Colors.gray700,
    lineHeight: 16,
    marginTop: Spacing.xs,
  },
  beforeAfterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
    backgroundColor: '#F9FAFB',
    borderRadius: BorderRadius.lg,
    padding: Spacing.xs,
  },
  photoBox: {
    flex: 1,
    height: 85,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    position: 'relative',
  },
  photoImg: {
    width: '100%',
    height: '100%',
  },
  beforeTag: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  afterTag: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: '#059669',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  tagText: {
    fontFamily: FontFamily.bold,
    fontSize: 9,
    color: '#FFFFFF',
  },
});
