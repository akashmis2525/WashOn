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
  Sparkles,
  Camera,
  CheckCircle2,
  Search,
  Scale,
  Car,
  Droplet,
  MapPin,
  ShieldCheck,
  Check,
  AlertTriangle,
  ArrowRight,
  Lock,
  Edit2,
  CreditCard,
  Armchair,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type AfterWashPhotosNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.AFTER_WASH_PHOTOS
>;

type AfterWashPhotosRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.AFTER_WASH_PHOTOS
>;

export const AfterWashPhotosScreen: React.FC = () => {
  const navigation = useNavigation<AfterWashPhotosNavProp>();
  const route = useRoute<AfterWashPhotosRouteProp>();
  const { draft, activeBooking } = useBookingStore();

  const [satisfactionChoice, setSatisfactionChoice] = useState<'satisfied' | 'issue'>('satisfied');
  const bookingId = route.params?.bookingId || activeBooking?.id || 'bk_demo_001';

  const handleContinuePayment = () => {
    if (satisfactionChoice === 'satisfied') {
      navigation.navigate(Routes.PAYMENT_METHOD, { bookingId });
    } else {
      navigation.navigate(Routes.REPORT_ISSUE, { bookingId });
    }
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
          <AppText style={styles.headerTitle}>After Wash Photos</AppText>
          <AppText style={styles.headerSubtitle}>
            See the results! Your vehicle is looking great!
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
            <AppText style={styles.logoSubtext}>CAR | BIKE | ANYWHERE</AppText>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* COMPLETED SUCCESS BANNER */}
        <View style={styles.bannerCard}>
          <View style={styles.bannerLeft}>
            <View style={styles.bannerIconCircle}>
              <Sparkles size={20} color="#059669" />
            </View>
            <View style={styles.bannerTextWrap}>
              <AppText style={styles.bannerTitle}>Wash Completed Successfully!</AppText>
              <AppText style={styles.bannerDesc}>
                Here are the after wash photos of your vehicle.
              </AppText>
            </View>
          </View>

          <View style={styles.completedBadge}>
            <AppText style={styles.completedBadgeLabel}>Completed at</AppText>
            <AppText style={styles.completedBadgeTime}>11:20 AM</AppText>
            <AppText style={styles.completedBadgeDate}>17 Sep 2026</AppText>
          </View>
        </View>

        {/* VEHICLE DETAILS CARD */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Car size={18} color="#059669" />
              <AppText style={styles.cardHeaderTitle}>Vehicle Details</AppText>
            </View>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => navigation.navigate(Routes.VEHICLE_LIST)}
            >
              <Edit2 size={10} color="#059669" style={{ marginRight: 2 }} />
              <AppText style={styles.editBtnText}>Edit</AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.vehicleRow}>
            <Image
              source={{ uri: draft.vehicle?.photoUrl || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=160&q=80' }}
              style={styles.vehicleThumb}
            />
            <View style={styles.vehicleDetailsCol}>
              <AppText style={styles.vehicleName}>
                {draft.vehicle ? `${draft.vehicle.brand} ${draft.vehicle.model}` : 'Toyota Fortuner'}
              </AppText>
              <AppText style={styles.vehicleNumber}>
                {draft.vehicle ? `${draft.vehicle.registrationNumber}` : 'MP 09 AB 1234'}
              </AppText>
              <AppText style={styles.vehicleSpecs}>
                {draft.vehicle ? `${draft.vehicle.color} • ${draft.vehicle.type.toUpperCase()}` : 'White • SUV'}
              </AppText>
            </View>

            <View style={styles.vehicleServiceCol}>
              <View style={styles.miniServiceItem}>
                <Droplet size={12} color="#2563EB" />
                <AppText style={styles.miniServiceTitle}>Premium Car Wash</AppText>
              </View>
              <AppText style={styles.miniServiceSub}>Exterior + Interior + Premium Finish</AppText>

              <View style={[styles.miniServiceItem, { marginTop: 4 }]}>
                <MapPin size={12} color="#059669" />
                <AppText style={styles.miniServiceLocation}>123, Vijay Nagar, Indore, MP</AppText>
              </View>
              <AppText style={styles.miniServiceSub}>Tower B, Basement Parking</AppText>
            </View>
          </View>
        </View>

        {/* AFTER WASH IMAGES SECTION */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Camera size={18} color="#059669" />
              <View>
                <AppText style={styles.cardHeaderTitle}>After Wash Images</AppText>
                <AppText style={styles.cardHeaderSub}>Clean. Shiny. Like New!</AppText>
              </View>
            </View>
            <View style={styles.photosCountBadge}>
              <CheckCircle2 size={10} color="#059669" />
              <AppText style={styles.photosCountText}>4/4 Photos Added</AppText>
            </View>
          </View>

          {/* 4 Photos Grid */}
          <View style={styles.photosGrid}>
            {/* 1. Front View */}
            <View style={styles.photoItemCard}>
              <View style={styles.photoWrapper}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=240&q=80' }}
                  style={styles.carPhoto}
                />
                <View style={styles.afterTag}>
                  <AppText style={styles.afterTagText}>AFTER</AppText>
                </View>
                <TouchableOpacity style={styles.zoomBtn}>
                  <Search size={10} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <AppText style={styles.photoViewTitle}>Front View</AppText>
            </View>

            {/* 2. Back View */}
            <View style={styles.photoItemCard}>
              <View style={styles.photoWrapper}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=240&q=80' }}
                  style={styles.carPhoto}
                />
                <View style={styles.afterTag}>
                  <AppText style={styles.afterTagText}>AFTER</AppText>
                </View>
                <TouchableOpacity style={styles.zoomBtn}>
                  <Search size={10} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <AppText style={styles.photoViewTitle}>Back View</AppText>
            </View>

            {/* 3. Left Side View */}
            <View style={styles.photoItemCard}>
              <View style={styles.photoWrapper}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=240&q=80' }}
                  style={styles.carPhoto}
                />
                <View style={styles.afterTag}>
                  <AppText style={styles.afterTagText}>AFTER</AppText>
                </View>
                <TouchableOpacity style={styles.zoomBtn}>
                  <Search size={10} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <AppText style={styles.photoViewTitle}>Left Side View</AppText>
            </View>

            {/* 4. Right Side View */}
            <View style={styles.photoItemCard}>
              <View style={styles.photoWrapper}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=240&q=80' }}
                  style={styles.carPhoto}
                />
                <View style={styles.afterTag}>
                  <AppText style={styles.afterTagText}>AFTER</AppText>
                </View>
                <TouchableOpacity style={styles.zoomBtn}>
                  <Search size={10} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <AppText style={styles.photoViewTitle}>Right Side View</AppText>
            </View>
          </View>
        </View>

        {/* BEFORE VS AFTER COMPARISON */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Scale size={18} color="#059669" />
              <AppText style={styles.cardHeaderTitle}>Before vs After Comparison</AppText>
            </View>
            <AppText style={styles.seeDifferenceText}>See the Difference!</AppText>
          </View>

          {/* 4 Split Comparison Cards */}
          <View style={styles.comparisonGrid}>
            {/* Comp 1: Front */}
            <View style={styles.comparisonCard}>
              <View style={styles.splitPhotoBox}>
                {/* Left Half (Before) */}
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=160&q=80' }}
                  style={styles.splitHalfImg}
                />
                <View style={styles.beforeTagPill}>
                  <AppText style={styles.beforeTagText}>Before</AppText>
                </View>

                {/* Vertical Divider */}
                <View style={styles.splitDivider} />

                {/* Right Half (After) */}
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=160&q=80' }}
                  style={styles.splitHalfImg}
                />
                <View style={styles.afterTagPill}>
                  <AppText style={styles.afterTagPillText}>After</AppText>
                </View>
              </View>
              <AppText style={styles.compLabel}>Front View</AppText>
            </View>

            {/* Comp 2: Back */}
            <View style={styles.comparisonCard}>
              <View style={styles.splitPhotoBox}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=160&q=80' }}
                  style={styles.splitHalfImg}
                />
                <View style={styles.beforeTagPill}>
                  <AppText style={styles.beforeTagText}>Before</AppText>
                </View>
                <View style={styles.splitDivider} />
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=160&q=80' }}
                  style={styles.splitHalfImg}
                />
                <View style={styles.afterTagPill}>
                  <AppText style={styles.afterTagPillText}>After</AppText>
                </View>
              </View>
              <AppText style={styles.compLabel}>Back View</AppText>
            </View>

            {/* Comp 3: Left */}
            <View style={styles.comparisonCard}>
              <View style={styles.splitPhotoBox}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=160&q=80' }}
                  style={styles.splitHalfImg}
                />
                <View style={styles.beforeTagPill}>
                  <AppText style={styles.beforeTagText}>Before</AppText>
                </View>
                <View style={styles.splitDivider} />
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=160&q=80' }}
                  style={styles.splitHalfImg}
                />
                <View style={styles.afterTagPill}>
                  <AppText style={styles.afterTagPillText}>After</AppText>
                </View>
              </View>
              <AppText style={styles.compLabel}>Left Side View</AppText>
            </View>

            {/* Comp 4: Right */}
            <View style={styles.comparisonCard}>
              <View style={styles.splitPhotoBox}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=160&q=80' }}
                  style={styles.splitHalfImg}
                />
                <View style={styles.beforeTagPill}>
                  <AppText style={styles.beforeTagText}>Before</AppText>
                </View>
                <View style={styles.splitDivider} />
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=160&q=80' }}
                  style={styles.splitHalfImg}
                />
                <View style={styles.afterTagPill}>
                  <AppText style={styles.afterTagPillText}>After</AppText>
                </View>
              </View>
              <AppText style={styles.compLabel}>Right Side View</AppText>
            </View>
          </View>
        </View>

        {/* INTERIOR CLEANLINESS PREVIEW */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Armchair size={18} color="#059669" />
              <View>
                <AppText style={styles.cardHeaderTitle}>Interior Cleanliness Preview</AppText>
                <AppText style={styles.cardHeaderSub}>A cleaner, fresher and more comfortable ride!</AppText>
              </View>
            </View>
          </View>

          <View style={styles.interiorGrid}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&q=80' }}
              style={styles.interiorThumb}
            />
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=200&q=80' }}
              style={styles.interiorThumb}
            />
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=200&q=80' }}
              style={styles.interiorThumb}
            />
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=200&q=80' }}
              style={styles.interiorThumb}
            />
          </View>
        </View>

        {/* CUSTOMER APPROVAL DUAL CARD */}
        <View style={styles.approvalSection}>
          <View style={styles.approvalHeader}>
            <ShieldCheck size={18} color="#059669" style={{ marginRight: 6 }} />
            <View>
              <AppText style={styles.approvalTitle}>Customer Approval</AppText>
              <AppText style={styles.approvalSub}>Please review the photos. Are you satisfied with the service?</AppText>
            </View>
          </View>

          <View style={styles.choiceRow}>
            {/* Satisfied */}
            <TouchableOpacity
              style={[
                styles.choiceCard,
                satisfactionChoice === 'satisfied' && styles.choiceCardSatisfiedActive,
              ]}
              onPress={() => setSatisfactionChoice('satisfied')}
              activeOpacity={0.8}
            >
              <View style={[styles.choiceIconCircle, { backgroundColor: '#059669' }]}>
                <Check size={14} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1 }}>
                <AppText style={[styles.choiceTitle, { color: '#065F46' }]}>I'm Satisfied</AppText>
                <AppText style={styles.choiceDesc}>Proceed to Payment</AppText>
              </View>
            </TouchableOpacity>

            {/* Raise Issue */}
            <TouchableOpacity
              style={[
                styles.choiceCard,
                satisfactionChoice === 'issue' && styles.choiceCardIssueActive,
              ]}
              onPress={() => setSatisfactionChoice('issue')}
              activeOpacity={0.8}
            >
              <View style={[styles.choiceIconCircle, { backgroundColor: '#EF4444' }]}>
                <AlertTriangle size={14} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1 }}>
                <AppText style={[styles.choiceTitle, { color: '#B91C1C' }]}>Raise Issue</AppText>
                <AppText style={styles.choiceDesc}>Something not right?</AppText>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* BOTTOM ACTION CTA */}
        <TouchableOpacity
          style={styles.paymentCTA}
          onPress={handleContinuePayment}
          activeOpacity={0.88}
        >
          <CreditCard size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
          <AppText style={styles.paymentCTAText}>
            {satisfactionChoice === 'satisfied' ? 'Continue to Payment' : 'Report Issue & Support'}
          </AppText>
          <ArrowRight size={18} color="#FFFFFF" style={{ marginLeft: 6 }} />
        </TouchableOpacity>

        {/* FOOTER NOTE */}
        <View style={styles.footerNote}>
          <Lock size={12} color={Colors.textTertiary} style={{ marginRight: 4 }} />
          <AppText style={styles.footerNoteText}>
            Your satisfaction drives us to keep doing better!
          </AppText>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 2,
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
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 6,
  },
  logoText: {
    fontSize: 12,
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
  logoTextAccent: {
    color: '#D97706',
  },
  logoSubtext: {
    fontSize: 6,
    fontFamily: FontFamily.bold,
    color: '#6B7280',
    letterSpacing: 0.5,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  bannerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  bannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bannerIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  bannerTextWrap: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#065F46',
  },
  bannerDesc: {
    fontSize: 9,
    fontFamily: FontFamily.regular,
    color: '#047857',
    marginTop: 1,
  },
  completedBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginLeft: 6,
  },
  completedBadgeLabel: {
    fontSize: 7,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
  },
  completedBadgeTime: {
    fontSize: 10,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  completedBadgeDate: {
    fontSize: 7,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginBottom: Spacing.sm,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardHeaderTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  cardHeaderSub: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  editBtnText: {
    fontSize: 8,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleThumb: {
    width: 60,
    height: 45,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    marginRight: Spacing.sm,
  },
  vehicleDetailsCol: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 10,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  vehicleNumber: {
    fontSize: 9,
    fontFamily: FontFamily.bold,
    color: '#059669',
    marginTop: 1,
  },
  vehicleSpecs: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  vehicleServiceCol: {
    flex: 1.2,
    borderLeftWidth: 1,
    borderLeftColor: '#F3F4F6',
    paddingLeft: Spacing.sm,
  },
  miniServiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  miniServiceTitle: {
    fontSize: 9,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  miniServiceSub: {
    fontSize: 7,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginLeft: 16,
  },
  miniServiceLocation: {
    fontSize: 8,
    fontFamily: FontFamily.medium,
    color: Colors.textPrimary,
  },
  photosCountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    gap: 3,
  },
  photosCountText: {
    fontSize: 8,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  photosGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photoItemCard: {
    width: (width - Spacing.lg * 2 - Spacing.md * 2 - 24) / 4,
    alignItems: 'center',
  },
  photoWrapper: {
    width: '100%',
    height: 70,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  carPhoto: {
    width: '100%',
    height: '100%',
  },
  afterTag: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#059669',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  afterTagText: {
    fontSize: 7,
    fontFamily: FontFamily.bold,
    color: '#FFFFFF',
  },
  zoomBtn: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoViewTitle: {
    fontSize: 8,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
    marginTop: 4,
    textAlign: 'center',
  },
  seeDifferenceText: {
    fontSize: 8,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  comparisonGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comparisonCard: {
    width: (width - Spacing.lg * 2 - Spacing.md * 2 - 24) / 4,
    alignItems: 'center',
  },
  splitPhotoBox: {
    width: '100%',
    height: 70,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  splitHalfImg: {
    width: '50%',
    height: '100%',
  },
  splitDivider: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: 2,
    backgroundColor: '#FFFFFF',
    zIndex: 2,
  },
  beforeTagPill: {
    position: 'absolute',
    top: 3,
    left: 2,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 2,
    zIndex: 3,
  },
  beforeTagText: {
    fontSize: 5,
    fontFamily: FontFamily.bold,
    color: '#FFFFFF',
  },
  afterTagPill: {
    position: 'absolute',
    top: 3,
    right: 2,
    backgroundColor: '#059669',
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 2,
    zIndex: 3,
  },
  afterTagPillText: {
    fontSize: 5,
    fontFamily: FontFamily.bold,
    color: '#FFFFFF',
  },
  compLabel: {
    fontSize: 8,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
    marginTop: 4,
    textAlign: 'center',
  },
  interiorGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  interiorThumb: {
    width: (width - Spacing.lg * 2 - Spacing.md * 2 - 24) / 4,
    height: 54,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  approvalSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  approvalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  approvalTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  approvalSub: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  choiceRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  choiceCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    gap: Spacing.xs,
  },
  choiceCardSatisfiedActive: {
    backgroundColor: '#F0FDF4',
    borderColor: '#059669',
  },
  choiceCardIssueActive: {
    backgroundColor: '#FEF2F2',
    borderColor: '#EF4444',
  },
  choiceIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceTitle: {
    fontSize: 9,
    fontFamily: FontFamily.bold,
  },
  choiceDesc: {
    fontSize: 7,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
  },
  paymentCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  paymentCTAText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: '#FFFFFF',
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerNoteText: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
  },
});
