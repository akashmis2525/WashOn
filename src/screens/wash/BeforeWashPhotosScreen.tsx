import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Camera,
  ShieldCheck,
  Edit2,
  CheckCircle2,
  Search,
  FileText,
  X,
  Plus,
  Info,
  Check,
  ArrowRight,
  Lock,
  Droplet,
  MapPin,
  Car,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type BeforeWashPhotosNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.BEFORE_WASH_PHOTOS
>;

type BeforeWashPhotosRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.BEFORE_WASH_PHOTOS
>;

export const BeforeWashPhotosScreen: React.FC = () => {
  const navigation = useNavigation<BeforeWashPhotosNavProp>();
  const route = useRoute<BeforeWashPhotosRouteProp>();
  const { draft, activeBooking } = useBookingStore();

  const [damageNotes, setDamageNotes] = useState<string>(
    'Minor scratch on front bumper (left side) and small dent on rear right door. No major damage.'
  );
  const [hasConfirmed, setHasConfirmed] = useState<boolean>(true);

  const bookingId = route.params?.bookingId || activeBooking?.id || 'bk_demo_001';

  const handleProceed = () => {
    navigation.navigate(Routes.WASH_IN_PROGRESS, { bookingId });
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
          <AppText style={styles.headerTitle}>Before Wash Photos</AppText>
          <AppText style={styles.headerSubtitle}>
            Let's capture your vehicle's current condition
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
        {/* TOP BANNER */}
        <View style={styles.bannerCard}>
          <View style={styles.bannerLeft}>
            <View style={styles.bannerIconCircle}>
              <Camera size={20} color="#059669" />
            </View>
            <View style={styles.bannerTextWrap}>
              <AppText style={styles.bannerTitle}>Take clear photos before wash</AppText>
              <AppText style={styles.bannerDesc}>
                These photos help track the condition of your vehicle and avoid any disputes later.
              </AppText>
            </View>
          </View>

          <View style={styles.trustBadge}>
            <ShieldCheck size={18} color="#059669" />
            <AppText style={styles.trustBadgeText}>Safe{'\n'}Transparent{'\n'}Hassle-Free</AppText>
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

        {/* VEHICLE PHOTOS (BEFORE WASH) GRID */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Camera size={18} color="#059669" />
              <AppText style={styles.cardHeaderTitle}>Vehicle Photos (Before Wash)</AppText>
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
                <View style={styles.checkPill}>
                  <Check size={10} color="#FFFFFF" />
                </View>
                <TouchableOpacity style={styles.zoomBtn}>
                  <Search size={10} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <AppText style={styles.photoViewTitle}>Front View</AppText>
              <View style={styles.addedPill}>
                <AppText style={styles.addedPillText}>Added</AppText>
              </View>
            </View>

            {/* 2. Back View */}
            <View style={styles.photoItemCard}>
              <View style={styles.photoWrapper}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=240&q=80' }}
                  style={styles.carPhoto}
                />
                <View style={styles.checkPill}>
                  <Check size={10} color="#FFFFFF" />
                </View>
                <TouchableOpacity style={styles.zoomBtn}>
                  <Search size={10} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <AppText style={styles.photoViewTitle}>Back View</AppText>
              <View style={styles.addedPill}>
                <AppText style={styles.addedPillText}>Added</AppText>
              </View>
            </View>

            {/* 3. Left Side View */}
            <View style={styles.photoItemCard}>
              <View style={styles.photoWrapper}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=240&q=80' }}
                  style={styles.carPhoto}
                />
                <View style={styles.checkPill}>
                  <Check size={10} color="#FFFFFF" />
                </View>
                <TouchableOpacity style={styles.zoomBtn}>
                  <Search size={10} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <AppText style={styles.photoViewTitle}>Left Side View</AppText>
              <View style={styles.addedPill}>
                <AppText style={styles.addedPillText}>Added</AppText>
              </View>
            </View>

            {/* 4. Right Side View */}
            <View style={styles.photoItemCard}>
              <View style={styles.photoWrapper}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=240&q=80' }}
                  style={styles.carPhoto}
                />
                <View style={styles.checkPill}>
                  <Check size={10} color="#FFFFFF" />
                </View>
                <TouchableOpacity style={styles.zoomBtn}>
                  <Search size={10} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <AppText style={styles.photoViewTitle}>Right Side View</AppText>
              <View style={styles.addedPill}>
                <AppText style={styles.addedPillText}>Added</AppText>
              </View>
            </View>
          </View>
        </View>

        {/* EXISTING DAMAGE / SPECIAL NOTES */}
        <View style={styles.sectionCard}>
          <View style={styles.notesHeader}>
            <FileText size={18} color="#059669" />
            <AppText style={styles.notesHeaderTitle}>
              Existing Damage / Special Notes <AppText style={styles.optionalText}>(Optional)</AppText>
            </AppText>
          </View>

          <View style={styles.notesInputBox}>
            <TextInput
              style={styles.notesInput}
              multiline
              numberOfLines={3}
              value={damageNotes}
              onChangeText={setDamageNotes}
              maxLength={500}
              placeholder="Mention any existing scratches or dents..."
              placeholderTextColor="#9CA3AF"
              textAlignVertical="top"
            />
            <AppText style={styles.charCountText}>{damageNotes.length}/500</AppText>
          </View>

          {/* Damage Photos row */}
          <View style={styles.damageThumbRow}>
            {/* Damage Photo 1 */}
            <View style={styles.damageThumbBox}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=100&q=80' }}
                style={styles.damageThumbImg}
              />
              <TouchableOpacity style={styles.removeThumbBtn}>
                <X size={10} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Damage Photo 2 */}
            <View style={styles.damageThumbBox}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=100&q=80' }}
                style={styles.damageThumbImg}
              />
              <TouchableOpacity style={styles.removeThumbBtn}>
                <X size={10} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Add Photo Button */}
            <TouchableOpacity style={styles.addPhotoDashedBtn} activeOpacity={0.7}>
              <Camera size={16} color="#059669" />
              <AppText style={styles.addPhotoDashedText}>Add Photo</AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.damageInfoBanner}>
            <Info size={13} color="#0284C7" style={{ marginRight: 6 }} />
            <AppText style={styles.damageInfoText}>
              Mentioning existing damage helps ensure a transparent service experience.
            </AppText>
          </View>
        </View>

        {/* CUSTOMER CONFIRMATION CARD */}
        <View style={styles.confirmationCard}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setHasConfirmed(!hasConfirmed)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkboxBox, hasConfirmed && styles.checkboxBoxActive]}>
              {hasConfirmed && <Check size={12} color="#FFFFFF" />}
            </View>
            <View style={{ flex: 1 }}>
              <AppText style={styles.confirmationTitle}>Customer Confirmation</AppText>
              <AppText style={styles.confirmationText}>
                I have reviewed the photos and notes. The above information is correct, and I allow the washerman to proceed with the service.
              </AppText>
            </View>
          </TouchableOpacity>
        </View>

        {/* BOTTOM CONFIRM & PROCEED BUTTON */}
        <TouchableOpacity
          style={[styles.proceedBtn, !hasConfirmed && { opacity: 0.6 }]}
          onPress={handleProceed}
          disabled={!hasConfirmed}
          activeOpacity={0.88}
        >
          <Check size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
          <AppText style={styles.proceedBtnText}>Confirm & Proceed</AppText>
          <ArrowRight size={18} color="#FFFFFF" style={{ marginLeft: 6 }} />
        </TouchableOpacity>

        {/* FOOTER NOTE */}
        <View style={styles.footerNote}>
          <Lock size={12} color={Colors.textTertiary} style={{ marginRight: 4 }} />
          <AppText style={styles.footerNoteText}>
            Your trust and vehicle safety are our priority.
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
    lineHeight: 13,
  },
  trustBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginLeft: 6,
  },
  trustBadgeText: {
    fontSize: 7,
    fontFamily: FontFamily.bold,
    color: '#059669',
    textAlign: 'center',
    marginTop: 2,
    lineHeight: 9,
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
  checkPill: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
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
  addedPill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: BorderRadius.full,
    marginTop: 2,
  },
  addedPillText: {
    fontSize: 7,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  notesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: Spacing.sm,
  },
  notesHeaderTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  optionalText: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
  },
  notesInputBox: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    backgroundColor: '#F9FAFB',
    marginBottom: Spacing.sm,
  },
  notesInput: {
    fontSize: 9,
    fontFamily: FontFamily.regular,
    color: Colors.textPrimary,
    minHeight: 48,
  },
  charCountText: {
    fontSize: 7,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
    textAlign: 'right',
  },
  damageThumbRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  damageThumbBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  damageThumbImg: {
    width: '100%',
    height: '100%',
  },
  removeThumbBtn: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoDashedBtn: {
    width: 60,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderStyle: 'dashed',
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  addPhotoDashedText: {
    fontSize: 7,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  damageInfoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  damageInfoText: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: '#0369A1',
    flex: 1,
  },
  confirmationCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: Spacing.md,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.xs,
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxBoxActive: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  confirmationTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#065F46',
  },
  confirmationText: {
    fontSize: 8,
    fontFamily: FontFamily.regular,
    color: '#047857',
    marginTop: 2,
    lineHeight: 12,
  },
  proceedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  proceedBtnText: {
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
