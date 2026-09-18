import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Phone,
  Mail,
  Lock,
  Bell,
  MoreVertical,
  Plus,
  Home as HomeIcon,
  Briefcase,
  Edit2,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Camera,
  CalendarDays,
  Wallet,
  Tag,
  User,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width } = Dimensions.get('window');

type ProfileNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.CUSTOMER_PROFILE
>;

export const CustomerProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileNavProp>();

  const handleEditProfile = () => {
    navigation.navigate(Routes.EDIT_PROFILE);
  };

  const handleSavedVehicles = () => {
    navigation.navigate(Routes.VEHICLE_LIST);
  };

  const handleSavedAddresses = () => {
    navigation.navigate(Routes.SAVED_ADDRESSES);
  };

  const handleNotifications = () => {
    navigation.navigate(Routes.NOTIFICATIONS);
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Password reset instructions have been sent to your registered email.');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <AppText style={styles.headerTitle}>Profile</AppText>
          <AppText style={styles.headerSubtitle}>
            Manage your details and preferences
          </AppText>
        </View>

        <View style={styles.logoBadge}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=100&auto=format&fit=crop&q=80',
            }}
            style={styles.logoIcon}
          />
          <AppText style={styles.logoText}>
            Wash<AppText style={styles.logoTextHighlight}>On</AppText>
          </AppText>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HERO PROFILE CARD */}
        <View style={styles.profileHeroCard}>
          <View style={styles.profileHeroTop}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
                }}
                style={styles.avatarImage}
              />
              <TouchableOpacity
                style={styles.cameraBadge}
                onPress={handleEditProfile}
                activeOpacity={0.8}
              >
                <Camera size={12} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.profileHeroInfo}>
              <AppText style={styles.profileName}>Aakash Mishra</AppText>
              <View style={styles.phoneVerifiedRow}>
                <AppText style={styles.profilePhone}>+91 81206 52523</AppText>
                <CheckCircle2 size={14} color="#059669" fill="#D1FAE5" />
              </View>
              <AppText style={styles.profileEmail}>
                mishraakash576@gmail.com
              </AppText>
            </View>

            <TouchableOpacity
              style={styles.editProfileBtn}
              onPress={handleEditProfile}
              activeOpacity={0.8}
            >
              <Edit2 size={12} color="#059669" />
              <AppText style={styles.editProfileBtnText}>Edit Profile</AppText>
            </TouchableOpacity>
          </View>

          {/* QUOTE PILL */}
          <View style={styles.quotePill}>
            <Sparkles size={12} color="#059669" />
            <AppText style={styles.quoteText}>
              “Clean vehicles, better journeys!”
            </AppText>
          </View>
        </View>

        {/* ACCOUNT LIST ITEMS */}
        <View style={styles.accountListCard}>
          <TouchableOpacity
            style={styles.accountItem}
            onPress={handleEditProfile}
            activeOpacity={0.7}
          >
            <View style={[styles.accountIconBox, styles.phoneIconBg]}>
              <Phone size={18} color="#059669" />
            </View>
            <View style={styles.accountItemText}>
              <AppText style={styles.accountItemLabel}>Mobile Number</AppText>
              <AppText style={styles.accountItemValue}>+91 81206 52523</AppText>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.accountItem}
            onPress={handleEditProfile}
            activeOpacity={0.7}
          >
            <View style={[styles.accountIconBox, styles.mailIconBg]}>
              <Mail size={18} color="#2563EB" />
            </View>
            <View style={styles.accountItemText}>
              <AppText style={styles.accountItemLabel}>Email Address</AppText>
              <AppText style={styles.accountItemValue}>
                mishraakash576@gmail.com
              </AppText>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.accountItem}
            onPress={handleChangePassword}
            activeOpacity={0.7}
          >
            <View style={[styles.accountIconBox, styles.lockIconBg]}>
              <Lock size={18} color="#7C3AED" />
            </View>
            <View style={styles.accountItemText}>
              <AppText style={styles.accountItemTitleOnly}>Change Password</AppText>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.accountItem, { borderBottomWidth: 0 }]}
            onPress={handleNotifications}
            activeOpacity={0.7}
          >
            <View style={[styles.accountIconBox, styles.bellIconBg]}>
              <Bell size={18} color="#EA580C" />
            </View>
            <View style={styles.accountItemText}>
              <AppText style={styles.accountItemLabel}>Notifications</AppText>
              <AppText style={styles.accountItemValue}>
                Manage your alerts and updates
              </AppText>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* SAVED VEHICLES */}
        <View style={styles.sectionHeader}>
          <AppText style={styles.sectionTitle}>Saved Vehicles</AppText>
          <TouchableOpacity onPress={handleSavedVehicles} activeOpacity={0.7}>
            <AppText style={styles.viewAllText}>View All</AppText>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {/* VEHICLE 1: CAR */}
          <View style={styles.vehicleCard}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=300&auto=format&fit=crop&q=80',
              }}
              style={styles.vehicleImage}
              resizeMode="contain"
            />
            <View style={styles.vehicleInfo}>
              <View style={styles.vehicleNameRow}>
                <AppText style={styles.vehicleName}>Tata Nexon</AppText>
                <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <MoreVertical size={14} color="#94A3B8" />
                </TouchableOpacity>
              </View>
              <AppText style={styles.vehiclePlate}>MP09AB1234</AppText>
              <View style={styles.primaryBadge}>
                <AppText style={styles.primaryBadgeText}>Primary</AppText>
              </View>
            </View>
          </View>

          {/* VEHICLE 2: BIKE */}
          <View style={styles.vehicleCard}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=300&auto=format&fit=crop&q=80',
              }}
              style={styles.vehicleImage}
              resizeMode="contain"
            />
            <View style={styles.vehicleInfo}>
              <View style={styles.vehicleNameRow}>
                <AppText style={styles.vehicleName}>Yamaha FZ</AppText>
                <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <MoreVertical size={14} color="#94A3B8" />
                </TouchableOpacity>
              </View>
              <AppText style={styles.vehiclePlate}>MP09CD5678</AppText>
            </View>
          </View>

          {/* ADD VEHICLE CARD */}
          <TouchableOpacity
            style={styles.addVehicleCard}
            onPress={() => navigation.navigate(Routes.ADD_VEHICLE as never)}
            activeOpacity={0.8}
          >
            <View style={styles.addVehicleIconCircle}>
              <Plus size={20} color="#FFFFFF" />
            </View>
            <AppText style={styles.addVehicleText}>Add Vehicle</AppText>
          </TouchableOpacity>
        </ScrollView>

        {/* SAVED ADDRESSES */}
        <View style={styles.sectionHeader}>
          <AppText style={styles.sectionTitle}>Saved Addresses</AppText>
          <TouchableOpacity onPress={handleSavedAddresses} activeOpacity={0.7}>
            <AppText style={styles.viewAllText}>View All</AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.addressesList}>
          {/* ADDRESS 1: HOME */}
          <View style={styles.addressCard}>
            <View style={[styles.addressIconCircle, styles.homeIconBg]}>
              <HomeIcon size={18} color="#059669" />
            </View>
            <View style={styles.addressContent}>
              <View style={styles.addressTitleRow}>
                <AppText style={styles.addressType}>Home</AppText>
                <View style={styles.defaultBadge}>
                  <AppText style={styles.defaultBadgeText}>Default</AppText>
                </View>
              </View>
              <AppText style={styles.addressDetail} numberOfLines={2}>
                123, Scheme 78, Vijay Nagar, Indore, Madhya Pradesh – 452010
              </AppText>
            </View>
            <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <MoreVertical size={16} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* ADDRESS 2: OFFICE */}
          <View style={styles.addressCard}>
            <View style={[styles.addressIconCircle, styles.officeIconBg]}>
              <Briefcase size={18} color="#2563EB" />
            </View>
            <View style={styles.addressContent}>
              <AppText style={styles.addressType}>Office</AppText>
              <AppText style={styles.addressDetail} numberOfLines={2}>
                Tech Park, Rau, Indore, Madhya Pradesh – 453331
              </AppText>
            </View>
            <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <MoreVertical size={16} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* ADD NEW ADDRESS BUTTON */}
          <TouchableOpacity
            style={styles.addAddressButton}
            onPress={() => navigation.navigate(Routes.ADD_NEW_ADDRESS as never)}
            activeOpacity={0.8}
          >
            <View style={styles.addAddressIconCircle}>
              <Plus size={16} color="#059669" />
            </View>
            <AppText style={styles.addAddressBtnText}>Add New Address</AppText>
          </TouchableOpacity>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* BOTTOM TAB BAR */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity
          style={styles.tabBarItem}
          onPress={() => navigation.navigate(Routes.HOME_DASHBOARD as never)}
        >
          <HomeIcon size={20} color="#94A3B8" />
          <AppText style={styles.tabBarLabel}>Home</AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabBarItem}
          onPress={() => navigation.navigate(Routes.UPCOMING_BOOKINGS as never)}
        >
          <CalendarDays size={20} color="#94A3B8" />
          <AppText style={styles.tabBarLabel}>Bookings</AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabBarItem}
          onPress={() => navigation.navigate(Routes.WALLET as never)}
        >
          <Wallet size={20} color="#94A3B8" />
          <AppText style={styles.tabBarLabel}>Wallet</AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabBarItem}
          onPress={() => navigation.navigate(Routes.OFFERS_COUPONS as never)}
        >
          <Tag size={20} color="#94A3B8" />
          <AppText style={styles.tabBarLabel}>Offers</AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabBarItem}>
          <User size={20} color="#059669" />
          <AppText style={[styles.tabBarLabel, styles.tabBarLabelActive]}>
            Profile
          </AppText>
          <View style={styles.activeTabIndicator} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 1,
  },
  logoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  logoIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 4,
  },
  logoText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  logoTextHighlight: {
    color: '#059669',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  profileHeroCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 14,
  },
  profileHeroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#059669',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileHeroInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  phoneVerifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginVertical: 2,
  },
  profilePhone: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#065F46',
  },
  profileEmail: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#059669',
    gap: 4,
  },
  editProfileBtnText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  quotePill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D1FAE5',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 6,
  },
  quoteText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#047857',
    fontStyle: 'italic',
  },
  accountListCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  accountIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  phoneIconBg: { backgroundColor: '#ECFDF5' },
  mailIconBg: { backgroundColor: '#EFF6FF' },
  lockIconBg: { backgroundColor: '#F3E8FF' },
  bellIconBg: { backgroundColor: '#FFEDD5' },
  accountItemText: {
    flex: 1,
  },
  accountItemLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#0F172A',
  },
  accountItemValue: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 1,
  },
  accountItemTitleOnly: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#0F172A',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  viewAllText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#059669',
  },
  horizontalScroll: {
    gap: 10,
    paddingBottom: 14,
  },
  vehicleCard: {
    width: 155,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  vehicleImage: {
    width: '100%',
    height: 60,
    marginBottom: 6,
  },
  vehicleInfo: {
    gap: 2,
  },
  vehicleNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleName: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  vehiclePlate: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  primaryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
  },
  primaryBadgeText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#059669',
  },
  addVehicleCard: {
    width: 80,
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  addVehicleIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  addVehicleText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#059669',
    textAlign: 'center',
  },
  addressesList: {
    gap: 10,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  addressIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  homeIconBg: { backgroundColor: '#ECFDF5' },
  officeIconBg: { backgroundColor: '#EFF6FF' },
  addressContent: {
    flex: 1,
    paddingRight: 6,
  },
  addressTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  addressType: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  defaultBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  defaultBadgeText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#059669',
  },
  addressDetail: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    lineHeight: 15,
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  addAddressIconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addAddressBtnText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#059669',
  },
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingVertical: 8,
    paddingBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 8,
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabBarLabel: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#94A3B8',
    marginTop: 2,
  },
  tabBarLabelActive: {
    color: '#059669',
    fontFamily: Typography.fontFamily.bold,
  },
  activeTabIndicator: {
    width: 16,
    height: 2.5,
    backgroundColor: '#059669',
    borderRadius: 2,
    marginTop: 3,
  },
});
