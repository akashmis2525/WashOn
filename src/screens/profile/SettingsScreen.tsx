import React, { useState } from 'react';
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
  ArrowLeft,
  Bell,
  MapPin,
  Globe,
  CreditCard,
  ShieldCheck,
  LogOut,
  Trash2,
  ChevronRight,
  ChevronDown,
  Home,
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

type SettingsNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.SETTINGS
>;

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsNavProp>();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');

  const handleNotifications = () => {
    navigation.navigate(Routes.NOTIFICATIONS as never);
  };

  const handleLocation = () => {
    navigation.navigate(Routes.LOCATION_SELECTION as never);
  };

  const handleLanguage = () => {
    Alert.alert('Select Language', 'Choose your preferred app language:', [
      { text: 'English', onPress: () => setSelectedLanguage('English') },
      { text: 'हिंदी (Hindi)', onPress: () => setSelectedLanguage('Hindi') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handlePaymentSettings = () => {
    navigation.navigate(Routes.WALLET as never);
  };

  const handleSecurity = () => {
    Alert.alert('Security Settings', 'Manage two-factor authentication, biometric unlock, and active sessions.');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: Routes.LOGIN as never }],
          });
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action is irreversible. All your booking history, saved vehicles, and wallet credits will be permanently removed.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Permanently',
          style: 'destructive',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: Routes.LOGIN as never }],
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <ArrowLeft size={22} color={Colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <AppText style={styles.headerTitle}>Settings</AppText>
          <AppText style={styles.headerSubtitle}>
            Customize your app experience
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
        {/* GENERAL SETTINGS */}
        <View style={styles.settingsGroup}>
          {/* NOTIFICATIONS */}
          <TouchableOpacity
            style={styles.settingCard}
            onPress={handleNotifications}
            activeOpacity={0.7}
          >
            <View style={[styles.settingIconBox, styles.notifIconBg]}>
              <Bell size={18} color="#059669" />
            </View>
            <View style={styles.settingTextContainer}>
              <AppText style={styles.settingTitle}>Notification Settings</AppText>
              <AppText style={styles.settingSubtitle}>
                Manage your alerts and updates
              </AppText>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>

          {/* LOCATION */}
          <TouchableOpacity
            style={styles.settingCard}
            onPress={handleLocation}
            activeOpacity={0.7}
          >
            <View style={[styles.settingIconBox, styles.locIconBg]}>
              <MapPin size={18} color="#2563EB" />
            </View>
            <View style={styles.settingTextContainer}>
              <AppText style={styles.settingTitle}>Location Settings</AppText>
              <AppText style={styles.settingSubtitle}>
                Manage your location and permissions
              </AppText>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>

          {/* LANGUAGE */}
          <TouchableOpacity
            style={styles.settingCard}
            onPress={handleLanguage}
            activeOpacity={0.7}
          >
            <View style={[styles.settingIconBox, styles.langIconBg]}>
              <Globe size={18} color="#7C3AED" />
            </View>
            <View style={styles.settingTextContainer}>
              <AppText style={styles.settingTitle}>Language</AppText>
              <AppText style={styles.settingSubtitle}>
                Choose your preferred language
              </AppText>
            </View>
            <View style={styles.langValueRow}>
              <AppText style={styles.langValueText}>{selectedLanguage}</AppText>
              <ChevronDown size={14} color="#64748B" />
            </View>
          </TouchableOpacity>

          {/* PAYMENT */}
          <TouchableOpacity
            style={styles.settingCard}
            onPress={handlePaymentSettings}
            activeOpacity={0.7}
          >
            <View style={[styles.settingIconBox, styles.payIconBg]}>
              <CreditCard size={18} color="#D97706" />
            </View>
            <View style={styles.settingTextContainer}>
              <AppText style={styles.settingTitle}>Payment Settings</AppText>
              <AppText style={styles.settingSubtitle}>
                Manage your saved cards and payment methods
              </AppText>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>

          {/* SECURITY */}
          <TouchableOpacity
            style={styles.settingCard}
            onPress={handleSecurity}
            activeOpacity={0.7}
          >
            <View style={[styles.settingIconBox, styles.secIconBg]}>
              <ShieldCheck size={18} color="#059669" />
            </View>
            <View style={styles.settingTextContainer}>
              <AppText style={styles.settingTitle}>Security</AppText>
              <AppText style={styles.settingSubtitle}>
                Manage your account security
              </AppText>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* ACCOUNT DANGER ZONE */}
        <View style={styles.accountActionGroup}>
          {/* LOGOUT */}
          <TouchableOpacity
            style={[styles.settingCard, styles.dangerCard]}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <View style={[styles.settingIconBox, styles.dangerIconBg]}>
              <LogOut size={18} color="#EF4444" />
            </View>
            <View style={styles.settingTextContainer}>
              <AppText style={styles.dangerTitle}>Logout</AppText>
              <AppText style={styles.settingSubtitle}>
                Sign out from your account
              </AppText>
            </View>
            <ChevronRight size={18} color="#EF4444" />
          </TouchableOpacity>

          {/* DELETE ACCOUNT */}
          <TouchableOpacity
            style={[styles.settingCard, styles.dangerCard]}
            onPress={handleDeleteAccount}
            activeOpacity={0.7}
          >
            <View style={[styles.settingIconBox, styles.dangerIconBg]}>
              <Trash2 size={18} color="#EF4444" />
            </View>
            <View style={styles.settingTextContainer}>
              <AppText style={styles.dangerTitle}>Delete Account</AppText>
              <AppText style={styles.settingSubtitle}>
                Permanently delete your account and all data
              </AppText>
            </View>
            <ChevronRight size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>

        {/* TRUST DATA SECURITY BANNER */}
        <View style={styles.trustBanner}>
          <View style={styles.trustLeft}>
            <AppText style={styles.trustTitle}>
              Your data is safe with us
            </AppText>
            <AppText style={styles.trustSubtitle}>
              We follow industry best practices to keep your information secure.
            </AppText>
          </View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300&auto=format&fit=crop&q=80',
            }}
            style={styles.trustGraphic}
            resizeMode="cover"
          />
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* BOTTOM TAB BAR */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity
          style={styles.tabBarItem}
          onPress={() => navigation.navigate(Routes.HOME_DASHBOARD as never)}
        >
          <Home size={20} color="#94A3B8" />
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

        <TouchableOpacity
          style={styles.tabBarItem}
          onPress={() => navigation.navigate(Routes.CUSTOMER_PROFILE as never)}
        >
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semiBold,
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
  settingsGroup: {
    gap: 10,
    marginBottom: 14,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  settingIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notifIconBg: { backgroundColor: '#ECFDF5' },
  locIconBg: { backgroundColor: '#EFF6FF' },
  langIconBg: { backgroundColor: '#F3E8FF' },
  payIconBg: { backgroundColor: '#FEF3C7' },
  secIconBg: { backgroundColor: '#DCFCE7' },
  settingTextContainer: {
    flex: 1,
    paddingRight: 6,
  },
  settingTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  settingSubtitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 1,
  },
  langValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  langValueText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  accountActionGroup: {
    gap: 10,
    marginBottom: 14,
  },
  dangerCard: {
    backgroundColor: '#FFFDFD',
    borderColor: '#FEE2E2',
  },
  dangerIconBg: {
    backgroundColor: '#FEE2E2',
  },
  dangerTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#EF4444',
  },
  trustBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    overflow: 'hidden',
  },
  trustLeft: {
    flex: 1,
    paddingRight: 8,
  },
  trustTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
    marginBottom: 4,
  },
  trustSubtitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#047857',
    lineHeight: 15,
  },
  trustGraphic: {
    width: 75,
    height: 50,
    borderRadius: 8,
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
