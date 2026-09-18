import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Star,
  Check,
  MapPin,
  Car,
  Smile,
  Clock,
  Sparkles,
  MessageSquare,
  ArrowRight,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type RateWashermanNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.RATE_WASHERMAN
>;

type RateWashermanRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.RATE_WASHERMAN
>;

export const RateWashermanScreen: React.FC = () => {
  const navigation = useNavigation<RateWashermanNavProp>();
  const route = useRoute<RateWashermanRouteProp>();
  const { activeBooking } = useBookingStore();

  const bookingId = route.params?.bookingId || activeBooking?.id || '#WO256839';

  const [overallRating, setOverallRating] = useState<number>(4);
  const [aspectRatings, setAspectRatings] = useState({
    serviceQuality: 4,
    behaviour: 5,
    timeliness: 4,
    cleanliness: 5,
  });
  const [comment, setComment] = useState<string>('');

  const getRatingLabel = (score: number) => {
    switch (score) {
      case 1:
        return 'Needs Improvement';
      case 2:
        return 'Fair Service';
      case 3:
        return 'Average Service';
      case 4:
        return 'Good Service!';
      case 5:
        return 'Excellent Service! 🎉';
      default:
        return 'Rate Experience';
    }
  };

  const handleSkip = () => {
    navigation.navigate(Routes.HOME_DASHBOARD);
  };

  const handleSubmitRating = () => {
    navigation.navigate(Routes.WRITE_REVIEW, { bookingId });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ArrowLeft size={22} color={Colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <AppText style={styles.headerTitle}>Rate Washerman</AppText>
          <AppText style={styles.headerSubtitle}>
            Your feedback helps us improve
          </AppText>
        </View>

        <TouchableOpacity onPress={handleSkip} activeOpacity={0.7} style={styles.skipBtn}>
          <AppText style={styles.skipText}>Skip</AppText>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* WASHERMAN PROFILE CARD */}
        <View style={styles.washermanCard}>
          <View style={styles.washermanLeft}>
            <View style={styles.avatarWrap}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&q=80' }}
                style={styles.avatarImg}
              />
            </View>
            <View style={styles.washermanInfo}>
              <AppText style={styles.washermanName}>Ramesh Yadav</AppText>
              <View style={styles.ratingRow}>
                <Star size={12} color="#F59E0B" fill="#F59E0B" />
                <AppText style={styles.ratingScore}>4.8 </AppText>
                <AppText style={styles.ratingReviews}>(320+ services)</AppText>
              </View>
              <View style={styles.locationRow}>
                <MapPin size={11} color="#64748B" />
                <AppText style={styles.locationText}>Indore, Madhya Pradesh</AppText>
              </View>
              <View style={styles.verifiedTag}>
                <Check size={10} color="#059669" strokeWidth={3} />
                <AppText style={styles.verifiedText}>Verified Washerman</AppText>
              </View>
            </View>
          </View>

          {/* Right Slogan Box */}
          <View style={styles.sloganBox}>
            <Car size={16} color="#059669" />
            <AppText style={styles.sloganText}>Great Service{'\n'}Makes Cleaner{'\n'}Cities!</AppText>
          </View>
        </View>

        {/* OVERALL EXPERIENCE CARD */}
        <View style={styles.experienceCard}>
          <AppText style={styles.expTitle}>Overall Experience</AppText>
          <AppText style={styles.expSubtitle}>
            How would you rate your overall experience with Ramesh Yadav?
          </AppText>

          <View style={styles.largeStarsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setOverallRating(star)}
                activeOpacity={0.7}
                style={styles.starTouch}
              >
                <Star
                  size={32}
                  color={star <= overallRating ? '#F59E0B' : '#E2E8F0'}
                  fill={star <= overallRating ? '#F59E0B' : '#FFFFFF'}
                />
              </TouchableOpacity>
            ))}
          </View>

          <AppText style={styles.scoreText}>{overallRating} out of 5</AppText>

          <View style={styles.goodServicePill}>
            <AppText style={styles.goodServicePillText}>{getRatingLabel(overallRating)}</AppText>
          </View>
        </View>

        {/* RATE SPECIFIC ASPECTS */}
        <View style={styles.aspectsCard}>
          <AppText style={styles.aspectsTitle}>Rate Specific Aspects</AppText>
          <AppText style={styles.aspectsSub}>Help us with more details (optional)</AppText>

          {/* 1. Service Quality */}
          <View style={styles.aspectRow}>
            <View style={styles.aspectIconWrap}>
              <Car size={16} color="#059669" />
            </View>
            <View style={styles.aspectTextWrap}>
              <AppText style={styles.aspectName}>Service Quality</AppText>
              <AppText style={styles.aspectDesc}>How was the overall service?</AppText>
            </View>
            <View style={styles.aspectStarsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() =>
                    setAspectRatings((prev) => ({ ...prev, serviceQuality: star }))
                  }
                  activeOpacity={0.7}
                  style={{ padding: 2 }}
                >
                  <Star
                    size={16}
                    color={star <= aspectRatings.serviceQuality ? '#F59E0B' : '#E2E8F0'}
                    fill={star <= aspectRatings.serviceQuality ? '#F59E0B' : 'transparent'}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 2. Behaviour */}
          <View style={styles.aspectRow}>
            <View style={styles.aspectIconWrap}>
              <Smile size={16} color="#059669" />
            </View>
            <View style={styles.aspectTextWrap}>
              <AppText style={styles.aspectName}>Behaviour</AppText>
              <AppText style={styles.aspectDesc}>Was the washerman polite & professional?</AppText>
            </View>
            <View style={styles.aspectStarsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() =>
                    setAspectRatings((prev) => ({ ...prev, behaviour: star }))
                  }
                  activeOpacity={0.7}
                  style={{ padding: 2 }}
                >
                  <Star
                    size={16}
                    color={star <= aspectRatings.behaviour ? '#F59E0B' : '#E2E8F0'}
                    fill={star <= aspectRatings.behaviour ? '#F59E0B' : 'transparent'}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 3. Timeliness */}
          <View style={styles.aspectRow}>
            <View style={styles.aspectIconWrap}>
              <Clock size={16} color="#059669" />
            </View>
            <View style={styles.aspectTextWrap}>
              <AppText style={styles.aspectName}>Timeliness</AppText>
              <AppText style={styles.aspectDesc}>Did they arrive and complete on time?</AppText>
            </View>
            <View style={styles.aspectStarsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() =>
                    setAspectRatings((prev) => ({ ...prev, timeliness: star }))
                  }
                  activeOpacity={0.7}
                  style={{ padding: 2 }}
                >
                  <Star
                    size={16}
                    color={star <= aspectRatings.timeliness ? '#F59E0B' : '#E2E8F0'}
                    fill={star <= aspectRatings.timeliness ? '#F59E0B' : 'transparent'}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 4. Cleanliness */}
          <View style={styles.aspectRow}>
            <View style={styles.aspectIconWrap}>
              <Sparkles size={16} color="#059669" />
            </View>
            <View style={styles.aspectTextWrap}>
              <AppText style={styles.aspectName}>Cleanliness</AppText>
              <AppText style={styles.aspectDesc}>How clean is your vehicle now?</AppText>
            </View>
            <View style={styles.aspectStarsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() =>
                    setAspectRatings((prev) => ({ ...prev, cleanliness: star }))
                  }
                  activeOpacity={0.7}
                  style={{ padding: 2 }}
                >
                  <Star
                    size={16}
                    color={star <= aspectRatings.cleanliness ? '#F59E0B' : '#E2E8F0'}
                    fill={star <= aspectRatings.cleanliness ? '#F59E0B' : 'transparent'}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* ADD A COMMENT (OPTIONAL) */}
        <View style={styles.commentCard}>
          <View style={styles.commentHeader}>
            <View style={styles.commentIconWrap}>
              <MessageSquare size={14} color="#059669" />
            </View>
            <AppText style={styles.commentTitle}>Add a Comment <AppText style={styles.optText}>(Optional)</AppText></AppText>
          </View>

          <TextInput
            style={styles.commentInput}
            placeholder="Share your experience..."
            placeholderTextColor="#94A3B8"
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
            maxLength={500}
            textAlignVertical="top"
          />
          <AppText style={styles.charCounter}>{comment.length}/500</AppText>
        </View>

        {/* SUBMIT RATING BUTTON */}
        <TouchableOpacity
          style={styles.submitCTA}
          onPress={handleSubmitRating}
          activeOpacity={0.88}
        >
          <AppText style={styles.submitCTAText}>Submit Rating</AppText>
          <ArrowRight size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginTop: 1,
  },
  skipBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  skipText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 28,
  },
  /* WASHERMAN PROFILE CARD */
  washermanCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 12,
  },
  washermanLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarWrap: {
    marginRight: 10,
  },
  avatarImg: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: '#059669',
  },
  washermanInfo: {
    flex: 1,
  },
  washermanName: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingScore: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginLeft: 3,
  },
  ratingReviews: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginLeft: 3,
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  verifiedText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
    marginLeft: 3,
  },
  sloganBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D1FAE5',
    marginLeft: 8,
  },
  sloganText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
    textAlign: 'center',
    marginTop: 3,
    lineHeight: 10,
  },
  /* OVERALL EXPERIENCE CARD */
  experienceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  expTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  expSubtitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 12,
  },
  largeStarsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  starTouch: {
    paddingHorizontal: 6,
  },
  scoreText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#64748B',
    marginBottom: 6,
  },
  goodServicePill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  goodServicePillText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  /* ASPECTS CARD */
  aspectsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 12,
  },
  aspectsTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  aspectsSub: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginTop: 1,
    marginBottom: 12,
  },
  aspectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aspectIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  aspectTextWrap: {
    flex: 1,
  },
  aspectName: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  aspectDesc: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  aspectStarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  /* COMMENT CARD */
  commentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 14,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  commentTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  optText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  commentInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minHeight: 70,
  },
  charCounter: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
    textAlign: 'right',
    marginTop: 4,
  },
  /* CTA */
  submitCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 4,
  },
  submitCTAText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
});
