import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Droplet,
  Sparkles,
  Layers,
  MapPin,
  Tag,
  FileText,
  CreditCard,
  ShieldCheck,
  Info,
  Star,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { useBookingStore } from '../../store/bookingStore';

type PriceBreakdownNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.PRICE_BREAKDOWN
>;

export const PriceBreakdownScreen: React.FC = () => {
  const navigation = useNavigation<PriceBreakdownNavProp>();
  const { draft } = useBookingStore();

  const servicePrice = 499;
  const addonPrice = 100;
  const platformFee = 20;
  const travelCharge = 30;
  const discount = 50;
  const gstAmount = 108;
  const finalAmount = servicePrice + addonPrice + platformFee + travelCharge - discount + gstAmount; // 707

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
          <AppText style={styles.headerTitle}>Price Breakdown</AppText>
          <AppText style={styles.headerSubtitle}>
            Here's the detailed cost for your booking
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
        {/* MINI SUMMARY HEADER CARD */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTopRow}>
            {/* Vehicle Card */}
            <View style={styles.miniCard}>
              <Image
                source={{ uri: draft.vehicle?.photoUrl || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=120&q=80' }}
                style={styles.miniCardImage}
              />
              <View style={styles.miniCardInfo}>
                <AppText style={styles.miniCardTitle} numberOfLines={1}>
                  {draft.vehicle ? `${draft.vehicle.brand} ${draft.vehicle.model}` : 'Toyota Fortuner'}
                </AppText>
                <AppText style={styles.miniCardSubtitle} numberOfLines={1}>
                  {draft.vehicle ? `${draft.vehicle.type.toUpperCase()} • ${draft.vehicle.color} • ${draft.vehicle.registrationNumber}` : 'SUV • White • MP 09 AB 1234'}
                </AppText>
              </View>
            </View>

            {/* Service Card */}
            <View style={styles.miniCard}>
              <Image
                source={{ uri: draft.service?.imageUrl || 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=120&q=80' }}
                style={styles.miniCardImage}
              />
              <View style={styles.miniCardInfo}>
                <AppText style={styles.miniCardTitle} numberOfLines={1}>
                  {draft.service ? draft.service.name : 'Premium Car Wash'}
                </AppText>
                <AppText style={styles.miniCardSubtitle} numberOfLines={1}>
                  Exterior + Interior + Premium Finish
                </AppText>
              </View>
            </View>
          </View>

          {/* Washerman Info Row */}
          <View style={styles.washermanRow}>
            <Image
              source={{ uri: draft.washerman?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80' }}
              style={styles.washermanAvatar}
            />
            <View style={styles.washermanInfo}>
              <AppText style={styles.washermanRoleLabel}>Washerman</AppText>
              <AppText style={styles.washermanName}>
                {draft.washerman ? draft.washerman.name : 'Rakesh Kumar'}
              </AppText>
              <View style={styles.washermanRatingRow}>
                <Star size={12} color="#F59E0B" fill="#F59E0B" />
                <AppText style={styles.washermanRatingText}> 4.8 (320 reviews)</AppText>
              </View>
            </View>
            <View style={styles.availableBadge}>
              <CheckCircle2 size={12} color="#059669" />
              <AppText style={styles.availableBadgeText}>Available Now</AppText>
            </View>
          </View>
        </View>

        {/* COST DETAILS SECTION */}
        <AppText style={styles.sectionHeaderTitle}>Cost Details</AppText>

        <View style={styles.costTable}>
          {/* Service Charge */}
          <View style={styles.costRow}>
            <View style={styles.costLeft}>
              <View style={[styles.costIconContainer, { backgroundColor: '#EFF6FF' }]}>
                <Droplet size={18} color="#2563EB" />
              </View>
              <View style={styles.costDetails}>
                <AppText style={styles.costItemTitle}>Service Charge</AppText>
                <AppText style={styles.costItemDesc}>Premium Car Wash (Exterior + Interior)</AppText>
              </View>
            </View>
            <AppText style={styles.costAmount}>₹{servicePrice}</AppText>
          </View>

          {/* Add-on Charge */}
          <View style={styles.costRow}>
            <View style={styles.costLeft}>
              <View style={[styles.costIconContainer, { backgroundColor: '#FAF5FF' }]}>
                <Sparkles size={18} color="#9333EA" />
              </View>
              <View style={styles.costDetails}>
                <AppText style={styles.costItemTitle}>Add-on Charge</AppText>
                <AppText style={styles.costItemDesc}>Tyre Polish + Dashboard Polish</AppText>
              </View>
            </View>
            <AppText style={styles.costAmount}>₹{addonPrice}</AppText>
          </View>

          {/* Platform Fee */}
          <View style={styles.costRow}>
            <View style={styles.costLeft}>
              <View style={[styles.costIconContainer, { backgroundColor: '#F3F4F6' }]}>
                <Layers size={18} color="#4B5563" />
              </View>
              <View style={styles.costDetails}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AppText style={styles.costItemTitle}>Platform Fee</AppText>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AppText style={styles.costItemDesc}>Service booking & support </AppText>
                  <Info size={12} color={Colors.textTertiary} />
                </View>
              </View>
            </View>
            <AppText style={styles.costAmount}>₹{platformFee}</AppText>
          </View>

          {/* Travel Charge */}
          <View style={styles.costRow}>
            <View style={styles.costLeft}>
              <View style={[styles.costIconContainer, { backgroundColor: '#FEF3C7' }]}>
                <MapPin size={18} color="#D97706" />
              </View>
              <View style={styles.costDetails}>
                <AppText style={styles.costItemTitle}>Travel Charge</AppText>
                <AppText style={styles.costItemDesc}>Distance: 3.2 km (if applicable)</AppText>
              </View>
            </View>
            <AppText style={styles.costAmount}>₹{travelCharge}</AppText>
          </View>

          {/* Discount */}
          <View style={styles.costRow}>
            <View style={styles.costLeft}>
              <View style={[styles.costIconContainer, { backgroundColor: '#ECFDF5' }]}>
                <Tag size={18} color="#059669" />
              </View>
              <View style={styles.costDetails}>
                <AppText style={styles.costItemTitle}>Discount</AppText>
                <AppText style={[styles.costItemDesc, { color: '#059669', fontFamily: FontFamily.bold }]}>
                  WELCOME50 Applied
                </AppText>
              </View>
            </View>
            <AppText style={[styles.costAmount, { color: '#059669' }]}>- ₹{discount}</AppText>
          </View>

          {/* GST */}
          <View style={[styles.costRow, { borderBottomWidth: 0 }]}>
            <View style={styles.costLeft}>
              <View style={[styles.costIconContainer, { backgroundColor: '#F1F5F9' }]}>
                <FileText size={18} color="#64748B" />
              </View>
              <View style={styles.costDetails}>
                <AppText style={styles.costItemTitle}>GST (18%)</AppText>
                <AppText style={styles.costItemDesc}>Applicable on service charges</AppText>
              </View>
            </View>
            <AppText style={styles.costAmount}>₹{gstAmount}</AppText>
          </View>
        </View>

        {/* FINAL PAYABLE AMOUNT CARD */}
        <View style={styles.finalPayCard}>
          <View style={styles.finalPayLeft}>
            <View style={styles.finalPayIconContainer}>
              <CreditCard size={20} color="#059669" />
            </View>
            <View style={styles.finalPayTextContainer}>
              <AppText style={styles.finalPayTitle}>Final Payable Amount</AppText>
              <AppText style={styles.finalPaySub}>All inclusive</AppText>
            </View>
          </View>
          <AppText style={styles.finalPayAmount}>₹{finalAmount}</AppText>
        </View>

        {/* SECURITY & TRANSPARENCY CARD */}
        <View style={styles.securityCard}>
          <ShieldCheck size={20} color="#059669" />
          <View style={styles.securityTextContainer}>
            <AppText style={styles.securityTitle}>Secure & Transparent Pricing</AppText>
            <AppText style={styles.securityDesc}>
              No hidden charges. What you see is what you pay.
            </AppText>
          </View>
        </View>
      </ScrollView>

      {/* STICKY BOTTOM BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => navigation.navigate(Routes.BOOKING_CONFIRMATION)}
          activeOpacity={0.8}
        >
          <AppText style={styles.payButtonText}>Proceed to Payment</AppText>
          <ArrowRight size={18} color="#111827" style={{ marginLeft: Spacing.xs }} />
        </TouchableOpacity>
      </View>
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
    fontSize: Typography.fontSize.lg,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.xs,
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
    paddingBottom: 100,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  summaryTopRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  miniCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniCardImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  miniCardInfo: {
    flex: 1,
    marginLeft: Spacing.xs,
  },
  miniCardTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  miniCardSubtitle: {
    fontSize: 9,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  washermanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  washermanAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
  },
  washermanInfo: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  washermanRoleLabel: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
  },
  washermanName: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
    marginTop: 1,
  },
  washermanRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  washermanRatingText: {
    fontSize: 10,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
  },
  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    gap: 4,
  },
  availableBadgeText: {
    fontSize: 10,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  sectionHeaderTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  costTable: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  costLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  costIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  costDetails: {
    flex: 1,
  },
  costItemTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  costItemDesc: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  costAmount: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  finalPayCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    marginBottom: Spacing.md,
  },
  finalPayLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  finalPayIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  finalPayTextContainer: {},
  finalPayTitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: '#065F46',
  },
  finalPaySub: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: '#047857',
    marginTop: 2,
  },
  finalPayAmount: {
    fontSize: Typography.fontSize.xl,
    fontFamily: FontFamily.bold,
    color: '#059669',
  },
  securityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: Spacing.sm,
  },
  securityTextContainer: {
    flex: 1,
  },
  securityTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#0F172A',
  },
  securityDesc: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    ...Shadows.md,
  },
  payButton: {
    backgroundColor: '#FFB800',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: BorderRadius.full,
    ...Shadows.sm,
  },
  payButtonText: {
    fontSize: Typography.fontSize.base,
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
});
