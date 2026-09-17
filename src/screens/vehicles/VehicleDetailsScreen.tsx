import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  MoreVertical,
  Edit2,
  Calendar,
  Droplets,
  Star,
  Trash2,
  Sparkles,
  ChevronRight,
  ArrowRight,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useVehicleStore } from '../../store/vehicleStore';
import { AppText } from '../../components/common/AppText';
import { SplashVehicleShowcase } from '../../assets/illustrations/SplashAssets';

const { width } = Dimensions.get('window');

type VehicleDetailsRouteProp = RouteProp<RootStackParamList, typeof Routes.VEHICLE_DETAILS>;
type VehicleDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VEHICLE_DETAILS
>;

export const VehicleDetailsScreen: React.FC = () => {
  const navigation = useNavigation<VehicleDetailsNavigationProp>();
  const route = useRoute<VehicleDetailsRouteProp>();
  const { vehicles, deleteVehicle, setSelectedVehicle } = useVehicleStore();

  const vehicleId = route.params?.vehicleId;
  const vehicle = vehicles.find((v) => v.id === vehicleId) || vehicles[0] || {
    id: 'veh_001',
    brand: 'Royal Enfield',
    model: 'Classic 350',
    type: 'bike',
    registrationNumber: 'MP09AB1234',
    color: 'Stealth Black',
  };

  const [activeSlide, setActiveSlide] = useState(0);

  const handleDelete = () => {
    Alert.alert(
      'Delete Vehicle',
      'Are you sure you want to remove this vehicle from your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteVehicle(vehicle.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleBookWash = () => {
    setSelectedVehicle(vehicle);
    navigation.navigate(Routes.SERVICE_CATEGORY);
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

        <View style={styles.headerRightGroup}>
          <TouchableOpacity style={styles.headerIconBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <MoreVertical size={20} color={Colors.gray700} />
          </TouchableOpacity>
          <View style={styles.logoWrapper}>
            <Image
              source={require('../../assets/images/logo.jpg')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title and Subtitle */}
        <View style={styles.titleSection}>
          <AppText style={styles.mainHeading}>Vehicle Details</AppText>
          <AppText style={styles.subHeading}>
            Here are your vehicle details.
          </AppText>
        </View>

        {/* Main Vehicle Showcase Card */}
        <View style={styles.showcaseCard}>
          {/* Top Row: Brand, Model, Type Badge & Edit Button */}
          <View style={styles.showcaseTopRow}>
            <View>
              <AppText style={styles.showcaseBrand}>{vehicle.brand}</AppText>
              <AppText style={styles.showcaseModel}>{vehicle.model}</AppText>
              <View style={styles.typeBadge}>
                <AppText style={styles.typeBadgeText}>
                  {vehicle.type === 'car' ? 'Car' : 'Bike'}
                </AppText>
              </View>
            </View>

            <TouchableOpacity
              style={styles.miniEditBtn}
              onPress={() => navigation.navigate(Routes.ADD_VEHICLE, { editVehicleId: vehicle.id })}
              activeOpacity={0.8}
            >
              <Edit2 size={13} color={Colors.gray900} />
              <AppText style={styles.miniEditText}>Edit</AppText>
            </TouchableOpacity>
          </View>

          {/* Hero Vehicle Visual */}
          <View style={styles.heroImageContainer}>
            <SplashVehicleShowcase
              type={vehicle.type === 'car' ? 'car' : 'bike'}
              size={190}
            />
          </View>

          {/* Pagination Carousel Dots */}
          <View style={styles.dotsRow}>
            {[0, 1, 2, 3].map((dotIndex) => (
              <View
                key={dotIndex}
                style={[
                  styles.dot,
                  dotIndex === activeSlide ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Vehicle Number Card with IND Badge */}
        <View style={styles.plateCard}>
          <View style={styles.indPlateBadge}>
            <AppText style={styles.indPlateText}>IND</AppText>
          </View>
          <View style={styles.plateNumberBlock}>
            <AppText style={styles.plateNumberLabel}>Vehicle Number</AppText>
            <AppText style={styles.plateNumberText}>
              {vehicle.registrationNumber || 'MP09AB1234'}
            </AppText>
          </View>
        </View>

        {/* Two Stat Cards in Row */}
        <View style={styles.statsRow}>
          {/* Stat 1: Last Wash Date */}
          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, { backgroundColor: '#DCFCE7' }]}>
              <Calendar size={18} color="#16A34A" />
            </View>
            <AppText style={styles.statLabel}>Last Wash Date</AppText>
            <AppText style={styles.statMainValue}>12 Sep 2026</AppText>
            <AppText style={styles.statSubValue}>4 days ago</AppText>
          </View>

          {/* Stat 2: Total Washes */}
          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, { backgroundColor: '#E0F2FE' }]}>
              <Droplets size={18} color="#0284C7" />
            </View>
            <AppText style={styles.statLabel}>Total Washes</AppText>
            <AppText style={styles.statMainValue}>8</AppText>
            <AppText style={styles.statSubValue}>You're keeping it clean!</AppText>
          </View>
        </View>

        {/* Vehicle Nickname Row */}
        <TouchableOpacity style={styles.nicknameCard} activeOpacity={0.8}>
          <View style={styles.nicknameStarCircle}>
            <Star size={16} color="#B45309" fill="#FDE047" />
          </View>
          <View style={styles.nicknameTextContainer}>
            <AppText style={styles.nicknameLabel}>Vehicle Nickname</AppText>
            <AppText style={styles.nicknameValue}>My Bullet</AppText>
          </View>
          <ChevronRight size={18} color={Colors.gray400} />
        </TouchableOpacity>

        {/* Action Buttons: Edit Vehicle & Delete Vehicle */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.editVehicleBtn}
            onPress={() => navigation.navigate(Routes.ADD_VEHICLE, { editVehicleId: vehicle.id })}
            activeOpacity={0.8}
          >
            <Edit2 size={16} color={Colors.gray800} />
            <AppText style={styles.editVehicleBtnText}>Edit Vehicle</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteVehicleBtn}
            onPress={handleDelete}
            activeOpacity={0.8}
          >
            <Trash2 size={16} color="#DC2626" />
            <AppText style={styles.deleteVehicleBtnText}>Delete Vehicle</AppText>
          </TouchableOpacity>
        </View>

        {/* Primary Book Wash Button */}
        <TouchableOpacity
          style={styles.bookWashButton}
          onPress={handleBookWash}
          activeOpacity={0.85}
        >
          <Sparkles size={18} color={Colors.black} style={{ marginRight: 6 }} />
          <AppText style={styles.bookWashButtonText}>Book Wash</AppText>
          <ArrowRight size={20} color={Colors.black} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
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
    paddingBottom: Spacing.xs,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  headerIconBtn: {
    padding: 6,
  },
  logoWrapper: {
    height: 38,
    width: 110,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing['3xl'],
  },
  titleSection: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.md,
  },
  mainHeading: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size['2xl'],
    color: Colors.gray900,
  },
  subHeading: {
    fontFamily: FontFamily.regular,
    fontSize: Typography.size.sm,
    color: Colors.gray600,
    marginTop: 4,
  },
  showcaseCard: {
    backgroundColor: '#FFFDF0',
    borderRadius: BorderRadius['2xl'],
    borderWidth: 1.2,
    borderColor: '#FEF08A',
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  showcaseTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  showcaseBrand: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.xl,
    color: Colors.gray900,
  },
  showcaseModel: {
    fontFamily: FontFamily.medium,
    fontSize: Typography.size.sm,
    color: Colors.gray600,
    marginTop: 2,
  },
  typeBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  typeBadgeText: {
    fontFamily: FontFamily.semiBold,
    fontSize: 11,
    color: Colors.gray700,
  },
  miniEditBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  miniEditText: {
    fontFamily: FontFamily.semiBold,
    fontSize: Typography.size.xs,
    color: Colors.gray900,
  },
  heroImageContainer: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.sm,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: '#FFC107',
  },
  dotInactive: {
    backgroundColor: '#E5E7EB',
  },
  plateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  indPlateBadge: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#D1D5DB',
    borderRadius: BorderRadius.md,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: Spacing.md,
  },
  indPlateText: {
    fontFamily: FontFamily.extraBold,
    fontSize: 13,
    color: Colors.gray800,
  },
  plateNumberBlock: {
    flex: 1,
  },
  plateNumberLabel: {
    fontFamily: FontFamily.regular,
    fontSize: Typography.size.xs,
    color: Colors.gray500,
  },
  plateNumberText: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.lg,
    color: Colors.gray900,
    letterSpacing: 1,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    padding: Spacing.md,
    ...Shadows.sm,
  },
  statIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  statLabel: {
    fontFamily: FontFamily.regular,
    fontSize: Typography.size.xs,
    color: Colors.gray500,
  },
  statMainValue: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.md,
    color: Colors.gray900,
    marginTop: 2,
  },
  statSubValue: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: Colors.gray600,
    marginTop: 2,
  },
  nicknameCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  nicknameStarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF9C3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  nicknameTextContainer: {
    flex: 1,
  },
  nicknameLabel: {
    fontFamily: FontFamily.regular,
    fontSize: Typography.size.xs,
    color: Colors.gray500,
  },
  nicknameValue: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  editVehicleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    gap: 6,
  },
  editVehicleBtnText: {
    fontFamily: FontFamily.semiBold,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
  },
  deleteVehicleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    backgroundColor: '#FEF2F2',
    borderRadius: BorderRadius.lg,
    borderWidth: 1.2,
    borderColor: '#FECACA',
    gap: 6,
  },
  deleteVehicleBtnText: {
    fontFamily: FontFamily.semiBold,
    fontSize: Typography.size.sm,
    color: '#DC2626',
  },
  bookWashButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    backgroundColor: '#FFC107',
    borderRadius: BorderRadius.full,
    ...Shadows.sm,
  },
  bookWashButtonText: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.md,
    color: Colors.black,
  },
});
