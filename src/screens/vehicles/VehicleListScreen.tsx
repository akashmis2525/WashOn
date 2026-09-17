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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Plus,
  MoreVertical,
  Edit2,
  Bike,
  Car,
  Info,
  CheckCircle2,
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

type VehicleListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VEHICLE_LIST
>;

export const VehicleListScreen: React.FC = () => {
  const navigation = useNavigation<VehicleListNavigationProp>();
  const { vehicles, setSelectedVehicle } = useVehicleStore();

  const [activeTab, setActiveTab] = useState<'all' | 'bikes' | 'cars'>('all');

  const bikes = vehicles.filter((v) => v.type === 'bike' || v.type === 'scooter');
  const cars = vehicles.filter((v) => v.type === 'car');

  const handleSelectVehicle = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    navigation.navigate(Routes.VEHICLE_DETAILS, { vehicleId: vehicle.id });
  };

  const handleAddVehicle = (type?: 'bike' | 'car') => {
    navigation.navigate(Routes.ADD_VEHICLE, {});
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
          <AppText style={styles.mainHeading}>My Vehicles</AppText>
          <AppText style={styles.subHeading}>
            Manage your vehicles for quick booking.
          </AppText>
        </View>

        {/* Tab Filters: Bikes & Cars */}
        <View style={styles.tabFilterRow}>
          <TouchableOpacity
            style={[
              styles.tabFilterPill,
              activeTab === 'bikes' || activeTab === 'all'
                ? styles.tabFilterPillActive
                : styles.tabFilterPillInactive,
            ]}
            onPress={() => setActiveTab(activeTab === 'bikes' ? 'all' : 'bikes')}
            activeOpacity={0.8}
          >
            <Bike size={18} color={Colors.black} />
            <AppText style={styles.tabFilterText}>Bikes ({bikes.length || 2})</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabFilterPill,
              activeTab === 'cars'
                ? styles.tabFilterPillActive
                : styles.tabFilterPillInactive,
            ]}
            onPress={() => setActiveTab(activeTab === 'cars' ? 'all' : 'cars')}
            activeOpacity={0.8}
          >
            <Car size={18} color={Colors.gray700} />
            <AppText style={styles.tabFilterTextInactive}>Cars ({cars.length || 1})</AppText>
          </TouchableOpacity>
        </View>

        {/* Bikes Section */}
        {(activeTab === 'all' || activeTab === 'bikes') && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <AppText style={styles.sectionTitle}>Bikes ({bikes.length || 2})</AppText>
              <TouchableOpacity
                style={styles.miniAddButton}
                onPress={() => handleAddVehicle('bike')}
                activeOpacity={0.8}
              >
                <Plus size={14} color={Colors.black} />
                <AppText style={styles.miniAddText}>Add Bike</AppText>
              </TouchableOpacity>
            </View>

            {/* Bikes Grid / Row */}
            <View style={styles.cardsRow}>
              {/* Bike 1: Royal Enfield */}
              <TouchableOpacity
                style={styles.vehicleCardHalf}
                onPress={() => handleSelectVehicle(bikes[0] || { id: 'veh_001', brand: 'Royal Enfield', model: 'Classic 350', type: 'bike', registrationNumber: 'MP09AB1234' })}
                activeOpacity={0.85}
              >
                {/* Top badges */}
                <View style={styles.cardHeaderActions}>
                  <View style={styles.defaultBadge}>
                    <AppText style={styles.defaultBadgeText}>Default</AppText>
                  </View>
                  <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <MoreVertical size={16} color={Colors.gray600} />
                  </TouchableOpacity>
                </View>

                {/* Bike Visual */}
                <View style={styles.vehicleImageWrapper}>
                  <SplashVehicleShowcase type="bike" size={120} />
                </View>

                {/* Info */}
                <View style={styles.vehicleInfoBlock}>
                  <AppText style={styles.vehicleBrandText} numberOfLines={1}>
                    Royal Enfield
                  </AppText>
                  <AppText style={styles.vehicleModelText} numberOfLines={1}>
                    Classic 350
                  </AppText>

                  {/* Reg Plate */}
                  <View style={styles.plateWrapper}>
                    <AppText style={styles.plateText}>MP09AB1234</AppText>
                  </View>
                </View>

                {/* Edit Button */}
                <TouchableOpacity
                  style={styles.cardEditBtn}
                  onPress={() => navigation.navigate(Routes.ADD_VEHICLE, { editVehicleId: 'veh_001' })}
                >
                  <Edit2 size={13} color={Colors.gray800} />
                  <AppText style={styles.cardEditText}>Edit</AppText>
                </TouchableOpacity>
              </TouchableOpacity>

              {/* Bike 2: Yamaha FZ-S */}
              <TouchableOpacity
                style={styles.vehicleCardHalf}
                onPress={() => handleSelectVehicle(bikes[1] || { id: 'veh_002', brand: 'Yamaha', model: 'FZ-S V4', type: 'bike', registrationNumber: 'MP09CD5678' })}
                activeOpacity={0.85}
              >
                {/* Top badges */}
                <View style={[styles.cardHeaderActions, { justifyContent: 'flex-end' }]}>
                  <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <MoreVertical size={16} color={Colors.gray600} />
                  </TouchableOpacity>
                </View>

                {/* Bike Visual */}
                <View style={styles.vehicleImageWrapper}>
                  <SplashVehicleShowcase type="bike" size={120} />
                </View>

                {/* Info */}
                <View style={styles.vehicleInfoBlock}>
                  <AppText style={styles.vehicleBrandText} numberOfLines={1}>
                    Yamaha
                  </AppText>
                  <AppText style={styles.vehicleModelText} numberOfLines={1}>
                    FZ-S V4
                  </AppText>

                  {/* Reg Plate */}
                  <View style={styles.plateWrapper}>
                    <AppText style={styles.plateText}>MP09CD5678</AppText>
                  </View>
                </View>

                {/* Edit Button */}
                <TouchableOpacity
                  style={styles.cardEditBtn}
                  onPress={() => navigation.navigate(Routes.ADD_VEHICLE, { editVehicleId: 'veh_002' })}
                >
                  <Edit2 size={13} color={Colors.gray800} />
                  <AppText style={styles.cardEditText}>Edit</AppText>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Cars Section */}
        {(activeTab === 'all' || activeTab === 'cars') && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <AppText style={styles.sectionTitle}>Cars ({cars.length || 1})</AppText>
              <TouchableOpacity
                style={styles.miniAddButton}
                onPress={() => handleAddVehicle('car')}
                activeOpacity={0.8}
              >
                <Plus size={14} color={Colors.black} />
                <AppText style={styles.miniAddText}>Add Car</AppText>
              </TouchableOpacity>
            </View>

            {/* Car Card Full Width */}
            <TouchableOpacity
              style={styles.carFullCard}
              onPress={() => handleSelectVehicle(cars[0] || { id: 'veh_003', brand: 'Hyundai', model: 'Creta', type: 'car', registrationNumber: 'MP09EF9012' })}
              activeOpacity={0.85}
            >
              <View style={styles.carCardTopRow}>
                <View style={styles.carImageWrapper}>
                  <SplashVehicleShowcase type="car" size={125} />
                </View>

                <View style={styles.carInfoDetails}>
                  <View style={styles.carTitleRow}>
                    <View>
                      <AppText style={styles.carBrandText}>Hyundai</AppText>
                      <AppText style={styles.carModelText}>Creta</AppText>
                    </View>
                    <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                      <MoreVertical size={16} color={Colors.gray600} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.carPlateWrapper}>
                    <AppText style={styles.plateText}>MP09EF9012</AppText>
                  </View>
                </View>
              </View>

              {/* Edit Button Divider Line */}
              <View style={styles.cardDivider} />
              <TouchableOpacity
                style={styles.carEditBtn}
                onPress={() => navigation.navigate(Routes.ADD_VEHICLE, { editVehicleId: 'veh_003' })}
              >
                <Edit2 size={13} color={Colors.gray800} />
                <AppText style={styles.cardEditText}>Edit</AppText>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        )}

        {/* Info Commitment Banner */}
        <View style={styles.infoBanner}>
          <View style={styles.infoIconCircle}>
            <Info size={16} color={Colors.black} />
          </View>
          <View style={styles.infoTextContainer}>
            <AppText style={styles.infoTitle}>Add your vehicles</AppText>
            <AppText style={styles.infoSubtitle}>
              Save your vehicles to get faster booking, personalised service recommendations and better offers.
            </AppText>
          </View>
        </View>

        {/* Add Vehicle Primary Button */}
        <TouchableOpacity
          style={styles.addVehicleButton}
          onPress={() => handleAddVehicle()}
          activeOpacity={0.85}
        >
          <Plus size={20} color={Colors.black} style={styles.buttonIcon} />
          <AppText style={styles.addVehicleButtonText}>Add Vehicle</AppText>
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
  tabFilterRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  tabFilterPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
    gap: 8,
  },
  tabFilterPillActive: {
    backgroundColor: '#FFF0C2',
    borderWidth: 1.2,
    borderColor: '#FFC107',
  },
  tabFilterPillInactive: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1.2,
    borderColor: 'transparent',
  },
  tabFilterText: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.sm,
    color: Colors.black,
  },
  tabFilterTextInactive: {
    fontFamily: FontFamily.medium,
    fontSize: Typography.size.sm,
    color: Colors.gray700,
  },
  sectionContainer: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.md,
    color: Colors.gray900,
  },
  miniAddButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC107',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  miniAddText: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.xs,
    color: Colors.black,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  vehicleCardHalf: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    padding: Spacing.sm,
    ...Shadows.sm,
  },
  cardHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 24,
  },
  defaultBadge: {
    backgroundColor: '#FFF0C2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  defaultBadgeText: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: '#B45309',
  },
  vehicleImageWrapper: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  vehicleInfoBlock: {
    marginTop: 2,
    marginBottom: 6,
  },
  vehicleBrandText: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
  },
  vehicleModelText: {
    fontFamily: FontFamily.regular,
    fontSize: Typography.size.xs,
    color: Colors.gray600,
    marginBottom: 6,
  },
  plateWrapper: {
    backgroundColor: '#F3F4F6',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 6,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  plateText: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: Colors.gray800,
    letterSpacing: 0.5,
  },
  cardEditBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 8,
    marginTop: 4,
    gap: 4,
  },
  cardEditText: {
    fontFamily: FontFamily.semiBold,
    fontSize: Typography.size.xs,
    color: Colors.gray800,
  },
  carFullCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    padding: Spacing.md,
    ...Shadows.sm,
  },
  carCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  carImageWrapper: {
    width: 120,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carInfoDetails: {
    flex: 1,
  },
  carTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  carBrandText: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.md,
    color: Colors.gray900,
  },
  carModelText: {
    fontFamily: FontFamily.regular,
    fontSize: Typography.size.xs,
    color: Colors.gray600,
    marginBottom: 6,
  },
  carPlateWrapper: {
    backgroundColor: '#F3F4F6',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginTop: Spacing.sm,
    marginBottom: 8,
  },
  carEditBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF9C3',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,
  },
  infoIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FDE047',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.xs,
    color: Colors.gray900,
  },
  infoSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: Colors.gray700,
    marginTop: 2,
  },
  addVehicleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    backgroundColor: '#FFC107',
    borderRadius: BorderRadius.full,
    ...Shadows.sm,
  },
  addVehicleButtonText: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.md,
    color: Colors.black,
  },
  buttonIcon: {
    marginRight: Spacing.xs,
  },
});
