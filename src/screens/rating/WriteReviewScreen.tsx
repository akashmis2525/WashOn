import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Alert,
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
  Clock,
  ShieldCheck,
  Sparkles,
  IndianRupee,
  Smile,
  Camera,
  X,
  Plus,
  Leaf,
  ArrowRight,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type WriteReviewNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.WRITE_REVIEW
>;

type WriteReviewRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.WRITE_REVIEW
>;

export const WriteReviewScreen: React.FC = () => {
  const navigation = useNavigation<WriteReviewNavProp>();
  const route = useRoute<WriteReviewRouteProp>();
  const { activeBooking } = useBookingStore();

  const bookingId = route.params?.bookingId || activeBooking?.id || '#WO256839';

  const [reviewText, setReviewText] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'On time',
    'Professional',
    'Good cleaning',
  ]);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=200&q=80',
    'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=200&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&q=80',
  ]);

  const toggleTag = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagName));
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(uploadedPhotos.filter((_, i) => i !== index));
  };

  const handleAddPhoto = () => {
    if (uploadedPhotos.length >= 5) {
      Alert.alert('Limit Reached', 'You can upload up to 5 photos.');
      return;
    }
    setUploadedPhotos([
      ...uploadedPhotos,
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=200&q=80',
    ]);
  };

  const handleSubmitReview = () => {
    navigation.navigate(Routes.BEFORE_AFTER_FEEDBACK, { bookingId });
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
          <AppText style={styles.headerTitle}>Write a Review</AppText>
          <AppText style={styles.headerSubtitle}>
            Share your experience and help others
          </AppText>
        </View>

        {/* Logo Badge */}
        <View style={styles.logoBadge}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=120&q=80' }}
            style={styles.logoIcon}
          />
          <View>
            <AppText style={styles.logoText}>Wash<AppText style={styles.logoTextAccent}>On</AppText></AppText>
            <AppText style={styles.logoSubtext}>CLEAN RIDES | HAPPIER YOU</AppText>
          </View>
        </View>
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

          <View style={styles.sloganBox}>
            <Car size={16} color="#059669" />
            <AppText style={styles.sloganText}>Great Service{'\n'}Makes Cleaner{'\n'}Cities!</AppText>
          </View>
        </View>

        {/* REVIEW TEXTAREA CARD */}
        <View style={styles.reviewInputCard}>
          <View style={styles.inputHeaderRow}>
            <AppText style={styles.inputTitle}>
              Tell us about your experience <AppText style={styles.starReq}>*</AppText>
            </AppText>
            <AppText style={styles.counterText}>{reviewText.length}/500</AppText>
          </View>

          <TextInput
            style={styles.reviewInput}
            placeholder="Write your review here...&#10;What did you like? What can be improved?&#10;Your feedback matters!"
            placeholderTextColor="#94A3B8"
            value={reviewText}
            onChangeText={setReviewText}
            multiline
            numberOfLines={5}
            maxLength={500}
            textAlignVertical="top"
          />
        </View>

        {/* QUICK TAGS */}
        <View style={styles.sectionCard}>
          <AppText style={styles.sectionTitle}>Quick Tags</AppText>
          <AppText style={styles.sectionSubtitle}>
            Select tags that best describe your experience (optional)
          </AppText>

          <View style={styles.tagsContainer}>
            {/* On time */}
            <TouchableOpacity
              style={[styles.tagPill, selectedTags.includes('On time') && styles.tagPillSelected]}
              onPress={() => toggleTag('On time')}
              activeOpacity={0.8}
            >
              <Clock size={13} color={selectedTags.includes('On time') ? '#059669' : '#64748B'} />
              <AppText style={[styles.tagText, selectedTags.includes('On time') && styles.tagTextSelected]}>
                On time
              </AppText>
            </TouchableOpacity>

            {/* Professional */}
            <TouchableOpacity
              style={[styles.tagPill, selectedTags.includes('Professional') && styles.tagPillSelected]}
              onPress={() => toggleTag('Professional')}
              activeOpacity={0.8}
            >
              <ShieldCheck size={13} color={selectedTags.includes('Professional') ? '#059669' : '#64748B'} />
              <AppText style={[styles.tagText, selectedTags.includes('Professional') && styles.tagTextSelected]}>
                Professional
              </AppText>
            </TouchableOpacity>

            {/* Good cleaning */}
            <TouchableOpacity
              style={[styles.tagPill, selectedTags.includes('Good cleaning') && styles.tagPillSelected]}
              onPress={() => toggleTag('Good cleaning')}
              activeOpacity={0.8}
            >
              <Sparkles size={13} color={selectedTags.includes('Good cleaning') ? '#059669' : '#64748B'} />
              <AppText style={[styles.tagText, selectedTags.includes('Good cleaning') && styles.tagTextSelected]}>
                Good cleaning
              </AppText>
            </TouchableOpacity>

            {/* Affordable */}
            <TouchableOpacity
              style={[styles.tagPill, selectedTags.includes('Affordable') && styles.tagPillSelected]}
              onPress={() => toggleTag('Affordable')}
              activeOpacity={0.8}
            >
              <IndianRupee size={13} color={selectedTags.includes('Affordable') ? '#059669' : '#64748B'} />
              <AppText style={[styles.tagText, selectedTags.includes('Affordable') && styles.tagTextSelected]}>
                Affordable
              </AppText>
            </TouchableOpacity>

            {/* Polite */}
            <TouchableOpacity
              style={[styles.tagPill, selectedTags.includes('Polite') && styles.tagPillSelected]}
              onPress={() => toggleTag('Polite')}
              activeOpacity={0.8}
            >
              <Smile size={13} color={selectedTags.includes('Polite') ? '#059669' : '#64748B'} />
              <AppText style={[styles.tagText, selectedTags.includes('Polite') && styles.tagTextSelected]}>
                Polite
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* ADD PHOTOS */}
        <View style={styles.sectionCard}>
          <AppText style={styles.sectionTitle}>Add Photos <AppText style={styles.optText}>(Optional)</AppText></AppText>
          <AppText style={styles.sectionSubtitle}>
            Upload photos of your cleaned vehicle (Max 5 photos)
          </AppText>

          <View style={styles.photosRow}>
            {uploadedPhotos.map((uri, index) => (
              <View key={index} style={styles.photoThumbWrap}>
                <Image source={{ uri }} style={styles.photoThumb} />
                <TouchableOpacity
                  style={styles.deleteBadge}
                  onPress={() => removePhoto(index)}
                  activeOpacity={0.8}
                >
                  <X size={10} color="#FFFFFF" strokeWidth={3} />
                </TouchableOpacity>
              </View>
            ))}

            {uploadedPhotos.length < 5 && (
              <TouchableOpacity
                style={styles.addPhotoDashedBtn}
                onPress={handleAddPhoto}
                activeOpacity={0.8}
              >
                <Camera size={18} color="#64748B" />
                <AppText style={styles.addPhotoText}>Add Photo</AppText>
                <Plus size={12} color="#059669" />
              </TouchableOpacity>
            )}
          </View>
          <AppText style={styles.maxPhotosHint}>Up to 5 photos</AppText>
        </View>

        {/* SUBMIT REVIEW CTA */}
        <TouchableOpacity
          style={styles.submitCTA}
          onPress={handleSubmitReview}
          activeOpacity={0.88}
        >
          <AppText style={styles.submitCTAText}>Submit Review</AppText>
          <ArrowRight size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        {/* ECO CARD */}
        <View style={styles.ecoBanner}>
          <View style={styles.ecoLeft}>
            <Leaf size={16} color="#059669" />
            <AppText style={styles.ecoText}>
              Your honest review helps us maintain quality and support our service partners.
            </AppText>
          </View>
          <View style={styles.ecoRight}>
            <AppText style={styles.ecoTagline}>Cleaner Vehicles</AppText>
            <AppText style={styles.ecoSubTagline}>Greener Tomorrow</AppText>
          </View>
        </View>
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
  logoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  logoIcon: {
    width: 22,
    height: 22,
    borderRadius: 6,
    marginRight: 6,
  },
  logoText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    lineHeight: 15,
  },
  logoTextAccent: {
    color: '#F59E0B',
  },
  logoSubtext: {
    fontSize: 6,
    fontFamily: Typography.fontFamily.bold,
    color: '#92400E',
    letterSpacing: 0.3,
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
    width: 52,
    height: 52,
    borderRadius: 26,
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
  /* REVIEW INPUT CARD */
  reviewInputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 12,
  },
  inputHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  starReq: {
    color: '#EF4444',
  },
  counterText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
  },
  reviewInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minHeight: 90,
    lineHeight: 18,
  },
  /* SECTION CARD */
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  sectionSubtitle: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 10,
  },
  optText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tagPillSelected: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  tagText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#475569',
    marginLeft: 5,
  },
  tagTextSelected: {
    color: '#059669',
    fontFamily: Typography.fontFamily.bold,
  },
  /* PHOTOS */
  photosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  photoThumbWrap: {
    position: 'relative',
  },
  photoThumb: {
    width: 64,
    height: 64,
    borderRadius: 10,
  },
  deleteBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  addPhotoDashedBtn: {
    width: 64,
    height: 64,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  addPhotoText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#64748B',
    marginTop: 2,
  },
  maxPhotosHint: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
    marginTop: 6,
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
    marginBottom: 12,
  },
  submitCTAText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  ecoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  ecoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 8,
  },
  ecoText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#065F46',
    marginLeft: 6,
    lineHeight: 11,
  },
  ecoRight: {
    alignItems: 'flex-end',
    borderLeftWidth: 1,
    borderLeftColor: '#A7F3D0',
    paddingLeft: 8,
  },
  ecoTagline: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  ecoSubTagline: {
    fontSize: 7,
    fontFamily: Typography.fontFamily.medium,
    color: '#059669',
  },
});
