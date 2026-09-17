import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Clock,
  ChevronRight,
  Calendar,
  Sparkles,
  Crown,
} from 'lucide-react-native';
import Svg, { Path, Circle, Rect, G, Defs } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { BottomTabBar } from '../../components/navigation/BottomTabBar';

const { width } = Dimensions.get('window');

type ServiceCategoryNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.SERVICE_CATEGORY
>;

interface ServiceCardItem {
  id: string;
  name: string;
  startingPrice: number;
  duration: string;
  description: string;
  bgColor: string;
  borderColor: string;
  imageUrl: string;
  route: keyof RootStackParamList;
  isMonthly?: boolean;
}

// Fallback high quality vector art for monthly wash plan
const MonthlyPlanVisual: React.FC = () => (
  <Svg width="100%" height={70} viewBox="0 0 140 70">
    {/* Blue Calendar Sheet */}
    <G transform="translate(15, 10)">
      <Rect x="0" y="6" width="46" height="42" rx="6" fill="#38BDF8" />
      <Rect x="0" y="0" width="46" height="14" rx="4" fill="#0284C7" />
      <Circle cx="12" cy="7" r="2.5" fill="#FFFFFF" />
      <Circle cx="34" cy="7" r="2.5" fill="#FFFFFF" />
      {/* Calendar Grid Dots */}
      <Circle cx="12" cy="22" r="2" fill="#FFFFFF" opacity="0.9" />
      <Circle cx="23" cy="22" r="2" fill="#FFFFFF" opacity="0.9" />
      <Circle cx="34" cy="22" r="2" fill="#FFFFFF" opacity="0.9" />
      <Circle cx="12" cy="32" r="2" fill="#FFFFFF" opacity="0.9" />
      <Circle cx="23" cy="32" r="2" fill="#FFFFFF" opacity="0.9" />
      <Circle cx="34" cy="32" r="2" fill="#FFFFFF" opacity="0.9" />
      <Circle cx="12" cy="40" r="2" fill="#FFFFFF" opacity="0.9" />
      <Circle cx="23" cy="40" r="2" fill="#FFFFFF" opacity="0.9" />
    </G>

    {/* Front Crisp White Car */}
    <G transform="translate(52, 14)">
      {/* Car Body */}
      <Path
        d="M5 24 Q18 8, 42 8 Q56 8, 64 24 L68 32 Q68 36, 62 36 L56 36 Q52 28, 44 28 Q36 28, 32 36 L18 36 Q14 28, 6 28 Q0 28, 0 36 L-2 36 Q-6 36, -6 30 Z"
        fill="#FFFFFF"
        stroke="#CBD5E1"
        strokeWidth="1.2"
      />
      {/* Windows */}
      <Path d="M12 22 L24 12 L38 12 L46 22 Z" fill="#0F172A" />
      {/* Wheels */}
      <Circle cx="8" cy="34" r="6" fill="#1E293B" />
      <Circle cx="46" cy="34" r="6" fill="#1E293B" />
    </G>
  </Svg>
);

export const ServiceCategoryScreen: React.FC = () => {
  const navigation = useNavigation<ServiceCategoryNavigationProp>();

  const services: ServiceCardItem[] = [
    {
      id: 'srv_bike',
      name: 'Bike Wash',
      startingPrice: 149,
      duration: '30 - 45 mins',
      description: 'Complete cleaning for a fresh and shining ride.',
      bgColor: '#F0F9FF',
      borderColor: '#BAE6FD',
      imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80',
      route: Routes.BIKE_WASH_SERVICES,
    },
    {
      id: 'srv_car',
      name: 'Car Wash',
      startingPrice: 299,
      duration: '45 - 60 mins',
      description: 'Get a sparkling clean car, inside and out.',
      bgColor: '#F0FDF4',
      borderColor: '#BBF7D0',
      imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&q=80',
      route: Routes.CAR_WASH_SERVICES,
    },
    {
      id: 'srv_premium',
      name: 'Premium Wash',
      startingPrice: 499,
      duration: '60 - 90 mins',
      description: 'Advanced cleaning with high-quality products.',
      bgColor: '#FFFBEB',
      borderColor: '#FDE68A',
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80',
      route: Routes.CAR_WASH_SERVICES,
    },
    {
      id: 'srv_foam',
      name: 'Foam Wash',
      startingPrice: 399,
      duration: '45 - 60 mins',
      description: 'Deep foam cleaning for extra shine and protection.',
      bgColor: '#FFF1F2',
      borderColor: '#FECDD3',
      imageUrl: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&q=80',
      route: Routes.CAR_WASH_SERVICES,
    },
    {
      id: 'srv_interior',
      name: 'Interior Cleaning',
      startingPrice: 349,
      duration: '45 - 60 mins',
      description: "Clean and refresh your car's interior.",
      bgColor: '#FAF5FF',
      borderColor: '#E9D5FF',
      imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&q=80',
      route: Routes.CAR_WASH_SERVICES,
    },
    {
      id: 'srv_exterior',
      name: 'Exterior Cleaning',
      startingPrice: 299,
      duration: '30 - 45 mins',
      description: 'Remove dust, dirt and grime for a brilliant look.',
      bgColor: '#ECFEFF',
      borderColor: '#A5F3FC',
      imageUrl: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&q=80',
      route: Routes.CAR_WASH_SERVICES,
    },
    {
      id: 'srv_detailing',
      name: 'Full Detailing',
      startingPrice: 799,
      duration: '2 - 3 hours',
      description: 'Complete care for a like-new finish.',
      bgColor: '#F0FDF4',
      borderColor: '#BBF7D0',
      imageUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&q=80',
      route: Routes.CAR_WASH_SERVICES,
    },
    {
      id: 'srv_monthly',
      name: 'Monthly Wash Plan',
      startingPrice: 999,
      duration: 'Multiple visits',
      description: 'Save more with our value-packed monthly plans.',
      bgColor: '#FFF7ED',
      borderColor: '#FED7AA',
      imageUrl: '',
      route: Routes.CAR_WASH_SERVICES,
      isMonthly: true,
    },
  ];

  const handleCardPress = (item: ServiceCardItem) => {
    if (item.route === Routes.BIKE_WASH_SERVICES) {
      navigation.navigate(Routes.BIKE_WASH_SERVICES);
    } else {
      navigation.navigate(Routes.CAR_WASH_SERVICES);
    }
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
          <AppText style={styles.mainHeading}>Service Category</AppText>
          <AppText style={styles.subHeading}>
            Choose the best service for your vehicle.
          </AppText>
        </View>

        {/* Hero Promo Banner */}
        <View style={styles.heroPromoBanner}>
          <View style={styles.promoTextContainer}>
            <AppText style={styles.promoHeadline}>
              A Cleaner Ride{'\n'}
              <AppText style={styles.promoHeadlineBold}>A Happier You!</AppText>
            </AppText>
            <AppText style={styles.promoSubtext}>
              Professional care for your Bike & Car at your doorstep.
            </AppText>
          </View>

          {/* Clean Drive Bright Vibes Stamp Graphic */}
          <View style={styles.stampBadge}>
            <AppText style={styles.stampText}>Clean Drive</AppText>
            <AppText style={styles.stampHighlight}>Bright Vibes</AppText>
          </View>
        </View>

        {/* 2-Column Grid of 8 Service Cards */}
        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceGridCard,
                { backgroundColor: service.bgColor, borderColor: service.borderColor },
              ]}
              onPress={() => handleCardPress(service)}
              activeOpacity={0.88}
            >
              {/* Crown badge for monthly */}
              {service.isMonthly && (
                <View style={styles.crownBadge}>
                  <Crown size={12} color="#FFFFFF" />
                </View>
              )}

              {/* Real Service Visual Image */}
              <View style={styles.serviceImageContainer}>
                {service.imageUrl ? (
                  <Image
                    source={{ uri: service.imageUrl }}
                    style={styles.serviceImage}
                    resizeMode="cover"
                  />
                ) : (
                  <MonthlyPlanVisual />
                )}
              </View>

              {/* Title */}
              <AppText style={styles.serviceCardTitle} numberOfLines={1}>
                {service.name}
              </AppText>

              {/* Price */}
              <AppText style={styles.startingLabel}>Starting at</AppText>
              <AppText style={styles.priceValue}>₹{service.startingPrice}</AppText>

              {/* Duration with Clock/Calendar icon */}
              <View style={styles.durationRow}>
                {service.isMonthly ? (
                  <Calendar size={12} color={Colors.gray600} />
                ) : (
                  <Clock size={12} color={Colors.gray600} />
                )}
                <AppText style={styles.durationText}>{service.duration}</AppText>
              </View>

              {/* Short description */}
              <AppText style={styles.serviceDescription} numberOfLines={2}>
                {service.description}
              </AppText>

              {/* Chevron circle button in bottom right */}
              <View style={styles.circleChevronButton}>
                <ChevronRight size={14} color="#1E293B" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom 5-Tab Navigation Bar */}
      <BottomTabBar activeTab="home" onTabPress={(tab) => {}} />
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
    paddingBottom: 85,
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
    paddingBottom: 2,
  },
  subHeading: {
    fontFamily: FontFamily.regular,
    fontSize: Typography.size.sm,
    color: Colors.gray600,
    marginTop: 2,
  },
  heroPromoBanner: {
    backgroundColor: '#FFFBEB',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#FEF08A',
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  promoTextContainer: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  promoHeadline: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.md,
    color: Colors.gray900,
    lineHeight: 20,
  },
  promoHeadlineBold: {
    color: '#D97706',
  },
  promoSubtext: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: Colors.gray600,
    marginTop: 4,
  },
  stampBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#FDE68A',
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
    color: '#D97706',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  serviceGridCard: {
    width: (width - Spacing.xl * 2 - Spacing.md) / 2,
    minHeight: 235,
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    padding: Spacing.sm,
    position: 'relative',
    overflow: 'hidden',
    ...Shadows.sm,
  },
  crownBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  serviceImageContainer: {
    height: 75,
    width: '100%',
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  serviceImage: {
    width: '100%',
    height: '100%',
    borderRadius: BorderRadius.lg,
  },
  serviceCardTitle: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
    marginBottom: 2,
  },
  startingLabel: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: Colors.gray500,
  },
  priceValue: {
    fontFamily: FontFamily.extraBold,
    fontSize: Typography.size.lg,
    color: '#059669',
    marginBottom: 2,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  durationText: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: Colors.gray600,
  },
  serviceDescription: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: Colors.gray600,
    lineHeight: 14,
    marginBottom: Spacing.lg,
  },
  circleChevronButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.sm,
  },
});
