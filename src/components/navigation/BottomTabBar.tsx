import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Home, Calendar, Wallet, Headphones, User } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily } from '../../constants/typography';
import { Spacing, BorderRadius } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../common/AppText';

export type TabKey = 'home' | 'bookings' | 'wallet' | 'help' | 'profile';

export interface BottomTabBarProps {
  activeTab: TabKey;
  onTabPress?: (tab: TabKey) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, onTabPress }) => {
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
      case 'help':
        navigation.navigate(Routes.HELP_SUPPORT);
        break;
      case 'profile':
        navigation.navigate(Routes.CUSTOMER_PROFILE);
        break;
    }
  };

  return (
    <View style={styles.container}>
      {/* Home Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleTabPress('home')}
        activeOpacity={0.7}
      >
        <View style={[styles.iconWrapper, activeTab === 'home' ? styles.activeIconWrapper : null]}>
          <Home
            size={22}
            color={activeTab === 'home' ? '#111827' : '#9CA3AF'}
            strokeWidth={activeTab === 'home' ? 2.5 : 2}
          />
        </View>
        <AppText
          style={[
            styles.tabLabel,
            activeTab === 'home' ? styles.activeTabLabel : styles.inactiveTabLabel,
          ]}
        >
          Home
        </AppText>
      </TouchableOpacity>

      {/* Bookings Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleTabPress('bookings')}
        activeOpacity={0.7}
      >
        <View style={[styles.iconWrapper, activeTab === 'bookings' ? styles.activeIconWrapper : null]}>
          <Calendar
            size={22}
            color={activeTab === 'bookings' ? '#111827' : '#9CA3AF'}
            strokeWidth={activeTab === 'bookings' ? 2.5 : 2}
          />
        </View>
        <AppText
          style={[
            styles.tabLabel,
            activeTab === 'bookings' ? styles.activeTabLabel : styles.inactiveTabLabel,
          ]}
        >
          Bookings
        </AppText>
      </TouchableOpacity>

      {/* Wallet Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleTabPress('wallet')}
        activeOpacity={0.7}
      >
        <View style={[styles.iconWrapper, activeTab === 'wallet' ? styles.activeIconWrapper : null]}>
          <Wallet
            size={22}
            color={activeTab === 'wallet' ? '#111827' : '#9CA3AF'}
            strokeWidth={activeTab === 'wallet' ? 2.5 : 2}
          />
        </View>
        <AppText
          style={[
            styles.tabLabel,
            activeTab === 'wallet' ? styles.activeTabLabel : styles.inactiveTabLabel,
          ]}
        >
          Wallet
        </AppText>
      </TouchableOpacity>

      {/* Help Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleTabPress('help')}
        activeOpacity={0.7}
      >
        <View style={[styles.iconWrapper, activeTab === 'help' ? styles.activeIconWrapper : null]}>
          <Headphones
            size={22}
            color={activeTab === 'help' ? '#111827' : '#9CA3AF'}
            strokeWidth={activeTab === 'help' ? 2.5 : 2}
          />
        </View>
        <AppText
          style={[
            styles.tabLabel,
            activeTab === 'help' ? styles.activeTabLabel : styles.inactiveTabLabel,
          ]}
        >
          Help
        </AppText>
      </TouchableOpacity>

      {/* Profile Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleTabPress('profile')}
        activeOpacity={0.7}
      >
        <View style={[styles.iconWrapper, activeTab === 'profile' ? styles.activeIconWrapper : null]}>
          <User
            size={22}
            color={activeTab === 'profile' ? '#111827' : '#9CA3AF'}
            strokeWidth={activeTab === 'profile' ? 2.5 : 2}
          />
        </View>
        <AppText
          style={[
            styles.tabLabel,
            activeTab === 'profile' ? styles.activeTabLabel : styles.inactiveTabLabel,
          ]}
        >
          Profile
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 72,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingBottom: Platform.OS === 'ios' ? 12 : 4,
    paddingHorizontal: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 4,
  },
  iconWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconWrapper: {
    backgroundColor: '#FFF3C4',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  activeTabLabel: {
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
  inactiveTabLabel: {
    fontFamily: FontFamily.medium,
    color: '#9CA3AF',
  },
});
