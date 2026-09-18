import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Home, CalendarDays, Wallet, Tag, User } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../common/AppText';

export type TabKey = 'home' | 'bookings' | 'wallet' | 'offers' | 'profile' | 'help';

export interface BottomTabBarProps {
  activeTab?: TabKey;
  onTabPress?: (tab: TabKey) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab = 'home', onTabPress }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleTabPress = (tab: TabKey) => {
    if (onTabPress) {
      onTabPress(tab);
    }
    switch (tab) {
      case 'home':
        navigation.navigate(Routes.HOME_DASHBOARD);
        break;
      case 'bookings':
        navigation.navigate(Routes.UPCOMING_BOOKINGS);
        break;
      case 'wallet':
        navigation.navigate(Routes.WALLET);
        break;
      case 'offers':
        navigation.navigate(Routes.OFFERS_COUPONS);
        break;
      case 'profile':
        navigation.navigate(Routes.CUSTOMER_PROFILE);
        break;
      case 'help':
        navigation.navigate(Routes.HELP_SUPPORT);
        break;
    }
  };

  const isHome = activeTab === 'home';
  const isBookings = activeTab === 'bookings';
  const isWallet = activeTab === 'wallet';
  const isOffers = activeTab === 'offers';
  const isProfile = activeTab === 'profile' || activeTab === 'help';

  return (
    <View style={styles.container}>
      {/* Home Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleTabPress('home')}
        activeOpacity={0.7}
      >
        <Home
          size={20}
          color={isHome ? '#059669' : '#94A3B8'}
          strokeWidth={isHome ? 2.2 : 1.8}
        />
        <AppText style={[styles.tabLabel, isHome ? styles.activeTabLabel : styles.inactiveTabLabel]}>
          Home
        </AppText>
        {isHome && <View style={styles.activeIndicator} />}
      </TouchableOpacity>

      {/* Bookings Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleTabPress('bookings')}
        activeOpacity={0.7}
      >
        <CalendarDays
          size={20}
          color={isBookings ? '#059669' : '#94A3B8'}
          strokeWidth={isBookings ? 2.2 : 1.8}
        />
        <AppText
          style={[
            styles.tabLabel,
            isBookings ? styles.activeTabLabel : styles.inactiveTabLabel,
          ]}
        >
          Bookings
        </AppText>
        {isBookings && <View style={styles.activeIndicator} />}
      </TouchableOpacity>

      {/* Wallet Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleTabPress('wallet')}
        activeOpacity={0.7}
      >
        <Wallet
          size={20}
          color={isWallet ? '#059669' : '#94A3B8'}
          strokeWidth={isWallet ? 2.2 : 1.8}
        />
        <AppText
          style={[
            styles.tabLabel,
            isWallet ? styles.activeTabLabel : styles.inactiveTabLabel,
          ]}
        >
          Wallet
        </AppText>
        {isWallet && <View style={styles.activeIndicator} />}
      </TouchableOpacity>

      {/* Offers Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleTabPress('offers')}
        activeOpacity={0.7}
      >
        <Tag
          size={20}
          color={isOffers ? '#059669' : '#94A3B8'}
          strokeWidth={isOffers ? 2.2 : 1.8}
        />
        <AppText
          style={[
            styles.tabLabel,
            isOffers ? styles.activeTabLabel : styles.inactiveTabLabel,
          ]}
        >
          Offers
        </AppText>
        {isOffers && <View style={styles.activeIndicator} />}
      </TouchableOpacity>

      {/* Profile Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleTabPress('profile')}
        activeOpacity={0.7}
      >
        <User
          size={20}
          color={isProfile ? '#059669' : '#94A3B8'}
          strokeWidth={isProfile ? 2.2 : 1.8}
        />
        <AppText
          style={[
            styles.tabLabel,
            isProfile ? styles.activeTabLabel : styles.inactiveTabLabel,
          ]}
        >
          Profile
        </AppText>
        {isProfile && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: Platform.OS === 'ios' ? 76 : 64,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingBottom: Platform.OS === 'ios' ? 16 : 6,
    paddingTop: 8,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'relative',
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  activeTabLabel: {
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  inactiveTabLabel: {
    fontFamily: Typography.fontFamily.medium,
    color: '#94A3B8',
  },
  activeIndicator: {
    width: 16,
    height: 2.5,
    backgroundColor: '#059669',
    borderRadius: 2,
    marginTop: 3,
  },
});
