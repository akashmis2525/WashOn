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
  Calendar,
  CreditCard,
  Tag,
  Headphones,
  User,
  Car,
  ChevronRight,
  Home,
  CalendarDays,
  Wallet,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { BottomTabBar } from '../../components/navigation/BottomTabBar';

const { width } = Dimensions.get('window');

type NotificationsNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.NOTIFICATIONS
>;

interface NotificationItem {
  id: string;
  category: 'bookings' | 'payments' | 'offers' | 'support';
  section: 'today' | 'yesterday' | 'earlier';
  title: string;
  description: string;
  time: string;
  isUnread?: boolean;
  iconType: 'calendar' | 'user' | 'car' | 'card' | 'tag' | 'headphone';
}

const NOTIFICATIONS_DATA: NotificationItem[] = [
  {
    id: 'notif_1',
    category: 'bookings',
    section: 'today',
    title: 'Booking Confirmed',
    description: 'Your booking #WA56893 has been confirmed for today at 10:00 AM.',
    time: '2 min ago',
    isUnread: true,
    iconType: 'calendar',
  },
  {
    id: 'notif_2',
    category: 'bookings',
    section: 'today',
    title: 'Washerman Accepted',
    description: 'Ramesh Kumar has accepted your booking #WA56893.',
    time: '15 min ago',
    isUnread: true,
    iconType: 'user',
  },
  {
    id: 'notif_3',
    category: 'bookings',
    section: 'today',
    title: 'On the Way',
    description: 'Ramesh Kumar is on the way to your location. ETA: 10 minutes.',
    time: '28 min ago',
    isUnread: true,
    iconType: 'car',
  },
  {
    id: 'notif_4',
    category: 'payments',
    section: 'today',
    title: 'Payment Successful',
    description: '₹499 has been paid successfully for booking #WA56893.',
    time: '1 hour ago',
    isUnread: true,
    iconType: 'card',
  },
  {
    id: 'notif_5',
    category: 'offers',
    section: 'yesterday',
    title: 'Special Offer for You!',
    description: 'Get 20% off on your next car wash. Use code CLEAN20. Valid till 30 Sep.',
    time: 'Yesterday, 6:30 PM',
    isUnread: false,
    iconType: 'tag',
  },
  {
    id: 'notif_6',
    category: 'support',
    section: 'yesterday',
    title: 'Complaint Updated',
    description: 'Your complaint #CP1234 has been resolved. Thank you for your feedback!',
    time: 'Yesterday, 4:15 PM',
    isUnread: false,
    iconType: 'headphone',
  },
  {
    id: 'notif_7',
    category: 'bookings',
    section: 'earlier',
    title: 'Booking Completed',
    description: 'Your booking #WA56780 has been completed. Rate your experience!',
    time: '14 Sep, 2:20 PM',
    isUnread: true,
    iconType: 'calendar',
  },
  {
    id: 'notif_8',
    category: 'payments',
    section: 'earlier',
    title: 'Refund Initiated',
    description: '₹100 refund has been initiated to your wallet for booking #WA56712.',
    time: '12 Sep, 11:10 AM',
    isUnread: false,
    iconType: 'card',
  },
];

export const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation<NotificationsNavProp>();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'bookings' | 'payments' | 'offers' | 'support'>('all');
  const [notifList, setNotifList] = useState<NotificationItem[]>(NOTIFICATIONS_DATA);

  const handleMarkAllAsRead = () => {
    setNotifList((prev) => prev.map((n) => ({ ...n, isUnread: false })));
    Alert.alert('Done', 'All notifications marked as read.');
  };

  const filteredList = notifList.filter((n) => {
    if (selectedFilter === 'all') return true;
    return n.category === selectedFilter;
  });

  const todayItems = filteredList.filter((n) => n.section === 'today');
  const yesterdayItems = filteredList.filter((n) => n.section === 'yesterday');
  const earlierItems = filteredList.filter((n) => n.section === 'earlier');

  const renderNotificationCard = (item: NotificationItem) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.notificationCard}
        onPress={() => {
          if (item.category === 'bookings') {
            navigation.navigate(Routes.UPCOMING_BOOKINGS as never);
          } else if (item.category === 'payments') {
            navigation.navigate(Routes.WALLET as never);
          } else if (item.category === 'offers') {
            navigation.navigate(Routes.OFFERS_COUPONS as never);
          } else {
            navigation.navigate(Routes.HELP_SUPPORT as never);
          }
        }}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.iconCircle,
            item.iconType === 'calendar' && styles.iconCalendarBg,
            item.iconType === 'user' && styles.iconUserBg,
            item.iconType === 'car' && styles.iconCarBg,
            item.iconType === 'card' && styles.iconCardBg,
            item.iconType === 'tag' && styles.iconTagBg,
            item.iconType === 'headphone' && styles.iconHeadphoneBg,
          ]}
        >
          {item.iconType === 'calendar' && <Calendar size={18} color="#059669" />}
          {item.iconType === 'user' && <User size={18} color="#2563EB" />}
          {item.iconType === 'car' && <Car size={18} color="#D97706" />}
          {item.iconType === 'card' && <CreditCard size={18} color="#059669" />}
          {item.iconType === 'tag' && <Tag size={18} color="#E11D48" />}
          {item.iconType === 'headphone' && <Headphones size={18} color="#7C3AED" />}
        </View>

        {item.isUnread && <View style={styles.unreadDot} />}

        <View style={styles.notifContent}>
          <View style={styles.titleRow}>
            <AppText style={styles.notifTitle}>{item.title}</AppText>
            <AppText style={styles.notifTime}>{item.time}</AppText>
          </View>
          <AppText style={styles.notifDesc} numberOfLines={2}>
            {item.description}
          </AppText>
        </View>

        <ChevronRight size={16} color="#94A3B8" />
      </TouchableOpacity>
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
          <AppText style={styles.headerTitle}>Notifications</AppText>
          <AppText style={styles.headerSubtitle}>
            Stay updated with your bookings and more
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

      {/* FILTER CHIPS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      >
        <TouchableOpacity
          style={[styles.filterChip, selectedFilter === 'all' && styles.filterChipActive]}
          onPress={() => setSelectedFilter('all')}
        >
          <Bell size={13} color={selectedFilter === 'all' ? '#FFFFFF' : '#64748B'} />
          <AppText style={[styles.filterChipText, selectedFilter === 'all' && styles.filterChipTextActive]}>
            All
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, selectedFilter === 'bookings' && styles.filterChipActive]}
          onPress={() => setSelectedFilter('bookings')}
        >
          <Calendar size={13} color={selectedFilter === 'bookings' ? '#FFFFFF' : '#64748B'} />
          <AppText style={[styles.filterChipText, selectedFilter === 'bookings' && styles.filterChipTextActive]}>
            Bookings
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, selectedFilter === 'payments' && styles.filterChipActive]}
          onPress={() => setSelectedFilter('payments')}
        >
          <CreditCard size={13} color={selectedFilter === 'payments' ? '#FFFFFF' : '#64748B'} />
          <AppText style={[styles.filterChipText, selectedFilter === 'payments' && styles.filterChipTextActive]}>
            Payments
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, selectedFilter === 'offers' && styles.filterChipActive]}
          onPress={() => setSelectedFilter('offers')}
        >
          <Tag size={13} color={selectedFilter === 'offers' ? '#FFFFFF' : '#64748B'} />
          <AppText style={[styles.filterChipText, selectedFilter === 'offers' && styles.filterChipTextActive]}>
            Offers
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, selectedFilter === 'support' && styles.filterChipActive]}
          onPress={() => setSelectedFilter('support')}
        >
          <Headphones size={13} color={selectedFilter === 'support' ? '#FFFFFF' : '#64748B'} />
          <AppText style={[styles.filterChipText, selectedFilter === 'support' && styles.filterChipTextActive]}>
            Support
          </AppText>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* TODAY SECTION */}
        {todayItems.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <AppText style={styles.sectionTitle}>Today</AppText>
              <TouchableOpacity onPress={handleMarkAllAsRead}>
                <AppText style={styles.markReadText}>Mark all as read</AppText>
              </TouchableOpacity>
            </View>
            <View style={styles.cardsList}>
              {todayItems.map(renderNotificationCard)}
            </View>
          </View>
        )}

        {/* YESTERDAY SECTION */}
        {yesterdayItems.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <AppText style={styles.sectionTitle}>Yesterday</AppText>
            </View>
            <View style={styles.cardsList}>
              {yesterdayItems.map(renderNotificationCard)}
            </View>
          </View>
        )}

        {/* EARLIER SECTION */}
        {earlierItems.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <AppText style={styles.sectionTitle}>Earlier</AppText>
            </View>
            <View style={styles.cardsList}>
              {earlierItems.map(renderNotificationCard)}
            </View>
          </View>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* BOTTOM TAB BAR */}
      <BottomTabBar activeTab="profile" />
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
  filterScroll: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    gap: 5,
  },
  filterChipActive: {
    backgroundColor: '#059669',
  },
  filterChipText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
    fontFamily: Typography.fontFamily.bold,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  markReadText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#059669',
  },
  cardsList: {
    gap: 8,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  iconCalendarBg: { backgroundColor: '#ECFDF5' },
  iconUserBg: { backgroundColor: '#EFF6FF' },
  iconCarBg: { backgroundColor: '#FEF3C7' },
  iconCardBg: { backgroundColor: '#ECFDF5' },
  iconTagBg: { backgroundColor: '#FFE4E6' },
  iconHeadphoneBg: { backgroundColor: '#F3E8FF' },
  unreadDot: {
    position: 'absolute',
    top: 12,
    left: 42,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#059669',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  notifContent: {
    flex: 1,
    paddingRight: 6,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  notifTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  notifTime: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
  },
  notifDesc: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    lineHeight: 15,
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
