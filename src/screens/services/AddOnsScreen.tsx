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
  Clock,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type AddOnsRouteProp = RouteProp<RootStackParamList, typeof Routes.ADD_ONS>;
type AddOnsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.ADD_ONS
>;

interface AddOnItem {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  imageUrl: string;
}

export const AddOnsScreen: React.FC = () => {
  const navigation = useNavigation<AddOnsNavigationProp>();
  const route = useRoute<AddOnsRouteProp>();
  const { setDraftAddons } = useBookingStore();

  const addOnsList: AddOnItem[] = [
    {
      id: 'addon_tyre',
      name: 'Tyre Polish',
      price: 99,
      duration: '10 mins',
      description: 'Gives a rich shine and protection to your tyres.',
      imageUrl: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=300&q=80',
    },
    {
      id: 'addon_dashboard',
      name: 'Dashboard Polish',
      price: 149,
      duration: '15 mins',
      description: 'Cleans and shines your dashboard with UV protection.',
      imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&q=80',
    },
    {
      id: 'addon_chain',
      name: 'Chain Lubrication',
      price: 99,
      duration: '20 mins',
      description: 'Reduces friction and increases chain life.',
      imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=300&q=80',
    },
    {
      id: 'addon_vacuum',
      name: 'Interior Vacuum',
      price: 149,
      duration: '20 mins',
      description: 'Deep vacuum cleaning for a fresh and clean interior.',
      imageUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=300&q=80',
    },
    {
      id: 'addon_seat',
      name: 'Seat Cleaning',
      price: 199,
      duration: '30 mins',
      description: 'Removes stains and refreshes your car seats.',
      imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=300&q=80',
    },
    {
      id: 'addon_wax',
      name: 'Wax Coating',
      price: 299,
      duration: '30 mins',
      description: 'Adds a protective layer and enhances shine.',
      imageUrl: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=300&q=80',
    },
  ];

  // Default quantities: Tyre Polish (1) and Interior Vacuum (1) as in mockup
  const [quantities, setQuantities] = useState<Record<string, number>>({
    addon_tyre: 1,
    addon_dashboard: 0,
    addon_chain: 0,
    addon_vacuum: 1,
    addon_seat: 0,
    addon_wax: 0,
  });

  const handleIncrement = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleDecrement = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) - 1),
    }));
  };

  // Calculate totals
  const totalOriginal = Object.entries(quantities).reduce((acc, [id, qty]) => {
    const item = addOnsList.find((a) => a.id === id);
    return acc + (item ? item.price * qty : 0);
  }, 0);

  const discount = totalOriginal > 0 ? 50 : 0;
  const totalPrice = Math.max(0, totalOriginal - discount);

  const handleContinue = () => {
    const selected = addOnsList.filter((a) => (quantities[a.id] || 0) > 0);
    setDraftAddons(selected as any);
    navigation.navigate(Routes.NEARBY_WASHERMEN_MAP);
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
        {/* Title and Subtitle */}
        <View style={styles.titleSection}>
          <AppText style={styles.mainHeading}>Add-ons</AppText>
          <AppText style={styles.subHeading}>Make your ride even better!</AppText>
        </View>

        {/* Hero Promo Banner */}
        <View style={styles.heroPromoBanner}>
          <View style={styles.promoTextContainer}>
            <AppText style={styles.promoHeadline}>
              Small Add-ons{'\n'}
              <AppText style={styles.promoHeadlineBold}>Big Difference!</AppText>
            </AppText>
            <AppText style={styles.promoSubtext}>
              Extra care for a cleaner, shinier and longer-lasting ride.
            </AppText>
          </View>

          <View style={styles.stampBadge}>
            <AppText style={styles.stampText}>Care</AppText>
            <AppText style={styles.stampHighlight}>Beyond Wash</AppText>
          </View>
        </View>

        {/* Section Heading */}
        <View style={styles.sectionHeaderBlock}>
          <AppText style={styles.sectionTitle}>Optional Add-ons</AppText>
          <AppText style={styles.sectionSub}>
            Enhance your car wash experience with these add-on services.
          </AppText>
        </View>

        {/* Add-ons List */}
        <View style={styles.addOnsList}>
          {addOnsList.map((item) => {
            const qty = quantities[item.id] || 0;
            return (
              <View key={item.id} style={styles.addOnCard}>
                {/* Image */}
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.addOnImage}
                  resizeMode="cover"
                />

                {/* Details */}
                <View style={styles.addOnDetails}>
                  <AppText style={styles.addOnName}>{item.name}</AppText>
                  <AppText style={styles.addOnDesc} numberOfLines={2}>
                    {item.description}
                  </AppText>
                  <View style={styles.durationRow}>
                    <Clock size={11} color={Colors.gray500} />
                    <AppText style={styles.durationText}>{item.duration}</AppText>
                  </View>
                </View>

                {/* Price & Stepper Counter */}
                <View style={styles.priceStepperBlock}>
                  <AppText style={styles.priceTag}>₹{item.price}</AppText>
                  <View style={styles.stepperContainer}>
                    <TouchableOpacity
                      style={styles.stepperBtn}
                      onPress={() => handleDecrement(item.id)}
                      activeOpacity={0.7}
                    >
                      <Minus size={13} color={Colors.gray700} />
                    </TouchableOpacity>

                    <AppText style={styles.stepperQtyText}>{qty}</AppText>

                    <TouchableOpacity
                      style={[styles.stepperBtn, styles.stepperBtnPlus]}
                      onPress={() => handleIncrement(item.id)}
                      activeOpacity={0.7}
                    >
                      <Plus size={13} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Floating Bottom Bar */}
      <View style={styles.bottomFloatingBar}>
        <View style={styles.bottomPriceSummary}>
          <AppText style={styles.totalAddonsLabel}>Total Add-ons</AppText>
          <View style={styles.priceRow}>
            <AppText style={styles.totalPriceGreen}>₹{totalPrice}</AppText>
            {totalOriginal > totalPrice && (
              <AppText style={styles.originalPriceStrikethrough}>
                ₹{totalOriginal}
              </AppText>
            )}
            {discount > 0 && (
              <View style={styles.discountPill}>
                <AppText style={styles.discountPillText}>You save ₹{discount}</AppText>
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.88}
        >
          <AppText style={styles.continueButtonText}>Continue</AppText>
          <ArrowRight size={18} color={Colors.black} style={{ marginLeft: 4 }} />
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
    marginBottom: Spacing.md,
  },
  mainHeading: {
    fontFamily: FontFamily.bold,
    fontSize: 26,
    lineHeight: 34,
    color: Colors.gray900,
  },
  subHeading: {
    fontFamily: FontFamily.regular,
    fontSize: Typography.size.sm,
    color: Colors.gray600,
    marginTop: 2,
  },
  heroPromoBanner: {
    backgroundColor: '#F0FDF4',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#BBF7D0',
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  promoTextContainer: {
    flex: 1,
  },
  promoHeadline: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.md,
    color: '#065F46',
    lineHeight: 20,
  },
  promoHeadlineBold: {
    color: '#047857',
  },
  promoSubtext: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: Colors.gray600,
    marginTop: 3,
  },
  stampBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#86EFAC',
    alignItems: 'center',
  },
  stampText: {
    fontFamily: FontFamily.semiBold,
    fontSize: 10,
    color: Colors.gray700,
  },
  stampHighlight: {
    fontFamily: FontFamily.extraBold,
    fontSize: 11,
    color: '#059669',
  },
  sectionHeaderBlock: {
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.md,
    color: Colors.gray900,
  },
  sectionSub: {
    fontFamily: FontFamily.regular,
    fontSize: Typography.size.xs,
    color: Colors.gray600,
    marginTop: 2,
  },
  addOnsList: {
    gap: Spacing.sm,
  },
  addOnCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    padding: Spacing.sm,
    ...Shadows.sm,
  },
  addOnImage: {
    width: 65,
    height: 65,
    borderRadius: BorderRadius.lg,
  },
  addOnDetails: {
    flex: 1,
    paddingHorizontal: Spacing.sm,
  },
  addOnName: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
  },
  addOnDesc: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: Colors.gray600,
    lineHeight: 14,
    marginTop: 2,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 4,
  },
  durationText: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: Colors.gray500,
  },
  priceStepperBlock: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  priceTag: {
    fontFamily: FontFamily.extraBold,
    fontSize: Typography.size.md,
    color: '#059669',
    marginBottom: 6,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepperBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperBtnPlus: {
    backgroundColor: '#059669',
  },
  stepperQtyText: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
    minWidth: 14,
    textAlign: 'center',
  },
  bottomFloatingBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    ...Shadows.lg,
  },
  bottomPriceSummary: {
    flex: 1,
  },
  totalAddonsLabel: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: Colors.gray500,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  totalPriceGreen: {
    fontFamily: FontFamily.extraBold,
    fontSize: 22,
    color: '#059669',
  },
  originalPriceStrikethrough: {
    fontFamily: FontFamily.regular,
    fontSize: Typography.size.sm,
    color: Colors.gray400,
    textDecorationLine: 'line-through',
  },
  discountPill: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  discountPillText: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: '#059669',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC107',
    paddingHorizontal: 22,
    height: 48,
    borderRadius: BorderRadius.full,
    ...Shadows.sm,
  },
  continueButtonText: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.md,
    color: Colors.black,
  },
});
