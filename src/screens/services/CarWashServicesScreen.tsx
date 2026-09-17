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
  Check,
  ArrowRight,
  ShieldCheck,
  Leaf,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { BottomTabBar } from '../../components/navigation/BottomTabBar';

const { width } = Dimensions.get('window');

type CarWashNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.CAR_WASH_SERVICES
>;

interface CarServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  imageUrl: string;
}

export const CarWashServicesScreen: React.FC = () => {
  const navigation = useNavigation<CarWashNavigationProp>();

  const carServices: CarServiceItem[] = [
    {
      id: 'srv_car_exterior',
      name: 'Exterior Wash',
      description: 'Remove dust, dirt and grime for a clean and shiny exterior.',
      price: 299,
      duration: '30 - 45 mins',
      features: ['Water Wash', 'Tire Cleaning', 'External Polish'],
      imageUrl: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=300&q=80',
    },
    {
      id: 'srv_car_foam',
      name: 'Foam Wash',
      description: 'Deep foam cleaning for extra shine and protection.',
      price: 399,
      duration: '45 - 60 mins',
      features: ['Foam Wash', 'Body Cleaning', 'Tire Shine'],
      imageUrl: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=300&q=80',
    },
    {
      id: 'srv_car_interior',
      name: 'Interior Cleaning',
      description: "Clean and refresh your car's interior for a healthier ride.",
      price: 499,
      duration: '45 - 60 mins',
      features: ['Vacuum Cleaning', 'Dashboard Clean', 'AC Vent Clean'],
      imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&q=80',
    },
    {
      id: 'srv_car_full',
      name: 'Full Car Wash',
      description: 'Complete cleaning inside and out for a fresh look.',
      price: 699,
      duration: '60 - 90 mins',
      features: ['Exterior Wash', 'Interior Clean', 'Tire Shine'],
      imageUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=300&q=80',
    },
    {
      id: 'srv_car_detailing',
      name: 'Premium Detailing',
      description: 'Advanced care with high-quality products for a showroom finish.',
      price: 999,
      duration: '1.5 - 2 hours',
      features: ['Deep Cleaning', 'Polish & Wax', 'Interior + Exterior'],
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&q=80',
    },
  ];

  const handleSelect = (service: CarServiceItem) => {
    navigation.navigate(Routes.SERVICE_DETAILS, { serviceId: service.id });
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
          <AppText style={styles.mainHeading}>Car Wash Services</AppText>
          <AppText style={styles.subHeading}>
            Choose the perfect service for your car.
          </AppText>
        </View>

        {/* Hero Promo Banner */}
        <View style={styles.heroPromoBanner}>
          <View style={styles.promoTextContainer}>
            <AppText style={styles.promoHeadline}>
              A Cleaner Car{'\n'}
              <AppText style={styles.promoHeadlineBold}>A Brighter You!</AppText>
            </AppText>
            <AppText style={styles.promoSubtext}>
              Professional car care at your doorstep.
            </AppText>

            <View style={styles.bannerPillsRow}>
              <View style={styles.bannerPill}>
                <ShieldCheck size={11} color="#059669" />
                <AppText style={styles.bannerPillText}>Trusted Service</AppText>
              </View>
              <View style={styles.bannerPill}>
                <Leaf size={11} color="#059669" />
                <AppText style={styles.bannerPillText}>Eco Friendly</AppText>
              </View>
            </View>
          </View>

          <View style={styles.stampBadge}>
            <AppText style={styles.stampText}>Drive Clean</AppText>
            <AppText style={styles.stampHighlight}>Stay Happy</AppText>
          </View>
        </View>

        {/* Services List */}
        <View style={styles.servicesList}>
          {carServices.map((item) => (
            <View key={item.id} style={styles.serviceCard}>
              <View style={styles.serviceTopRow}>
                {/* Image */}
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.serviceImage}
                  resizeMode="cover"
                />

                {/* Info */}
                <View style={styles.serviceDetails}>
                  <AppText style={styles.serviceName}>{item.name}</AppText>
                  <AppText style={styles.serviceDesc} numberOfLines={2}>
                    {item.description}
                  </AppText>
                </View>

                {/* Price & Duration */}
                <View style={styles.priceContainer}>
                  <AppText style={styles.startingAtText}>Starting at</AppText>
                  <AppText style={styles.priceText}>₹{item.price}</AppText>
                  <View style={styles.durationRow}>
                    <Clock size={11} color={Colors.gray600} />
                    <AppText style={styles.durationText}>{item.duration}</AppText>
                  </View>
                  <TouchableOpacity
                    style={styles.selectBtn}
                    onPress={() => handleSelect(item)}
                    activeOpacity={0.8}
                  >
                    <AppText style={styles.selectBtnText}>Select</AppText>
                    <ArrowRight size={13} color={Colors.black} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Feature Tags List */}
              <View style={styles.featuresRow}>
                {item.features.map((feat, idx) => (
                  <View key={idx} style={styles.featureItem}>
                    <View style={styles.checkIconBox}>
                      <Check size={10} color="#FFFFFF" strokeWidth={3} />
                    </View>
                    <AppText style={styles.featureText}>{feat}</AppText>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomTabBar activeTab="bookings" onTabPress={() => {}} />
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
    color: Colors.gray900,
    lineHeight: 20,
  },
  promoHeadlineBold: {
    color: '#059669',
  },
  promoSubtext: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: Colors.gray600,
    marginTop: 2,
  },
  bannerPillsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
  bannerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  bannerPillText: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: '#065F46',
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
  servicesList: {
    gap: Spacing.md,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    padding: Spacing.md,
    ...Shadows.sm,
  },
  serviceTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  serviceImage: {
    width: 75,
    height: 75,
    borderRadius: BorderRadius.lg,
  },
  serviceDetails: {
    flex: 1,
  },
  serviceName: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.md,
    color: Colors.gray900,
  },
  serviceDesc: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: Colors.gray600,
    lineHeight: 15,
    marginTop: 3,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  startingAtText: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: Colors.gray500,
  },
  priceText: {
    fontFamily: FontFamily.extraBold,
    fontSize: Typography.size.lg,
    color: '#059669',
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
    marginBottom: 6,
  },
  durationText: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: Colors.gray600,
  },
  selectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC107',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    gap: 3,
  },
  selectBtnText: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: Colors.black,
  },
  featuresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
    paddingTop: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  checkIconBox: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    color: Colors.gray700,
  },
});
