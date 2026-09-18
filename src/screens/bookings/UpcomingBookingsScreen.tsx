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
  Clock,
  Car,
  Armchair,
  ShieldCheck,
  Star,
  ChevronRight,
  XCircle,
  Home,
  CalendarDays,
  PlusCircle,
  History,
  User,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { BottomTabBar } from '../../components/navigation/BottomTabBar';

const { width } = Dimensions.get('window');

type UpcomingBookingsNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.UPCOMING_BOOKINGS
>;

interface UpcomingBookingItem {
  id: string;
  day: string;
  monthYear: string;
  weekday: string;
  time: string;
  status: 'Confirmed' | 'Pending';
  carName: string;
  carPlate: string;
  carType: string;
  carImage: string;
  serviceName: string;
  serviceDesc: string;
  serviceIcon: string;
  washermanName: string;
  washermanRating: string;
  washermanWashes: string;
  washermanAvatar: string;
}

const UPCOMING_MOCK_DATA: UpcomingBookingItem[] = [
  {
    id: 'WO256839',
    day: '18',
    monthYear: 'Sep 2026',
    weekday: 'Fri',
    time: '10:00 AM',
    status: 'Confirmed',
    carName: 'Toyota Fortuner',
    carPlate: 'MP 09 AB 1234',
    carType: 'White • SUV',
    carImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=240&q=80',
    serviceName: 'Premium Car Wash',
    serviceDesc: 'Exterior + Interior + Polish',
    serviceIcon: 'car',
    washermanName: 'Ramesh Yadav',
    washermanRating: '4.8',
    washermanWashes: '320+ washes',
    washermanAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&q=80',
  },
  {
    id: 'WO256840',
    day: '22',
    monthYear: 'Sep 2026',
    weekday: 'Tue',
    time: '02:30 PM',
    status: 'Confirmed',
    carName: 'Maruti Swift',
    carPlate: 'MP 09 CD 5678',
    carType: 'Red • Hatchback',
    carImage: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=240&q=80',
    serviceName: 'Interior Cleaning',
    serviceDesc: 'Dry Clean + Vacuum + Dashboard',
    serviceIcon: 'armchair',
    washermanName: 'Amit Patidar',
    washermanRating: '4.6',
    washermanWashes: '180+ washes',
    washermanAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&q=80',
  },
  {
    id: 'WO256841',
    day: '28',
    monthYear: 'Sep 2026',
    weekday: 'Mon',
    time: '11:00 AM',
    status: 'Confirmed',
    carName: 'Honda City',
    carPlate: 'MP 09 EF 9012',
    carType: 'Grey • Sedan',
    carImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=240&q=80',
    serviceName: 'Full Car Wash',
    serviceDesc: 'Exterior + Interior + Tyre Polish',
    serviceIcon: 'shield',
    washermanName: 'Suresh Kumar',
    washermanRating: '4.7',
    washermanWashes: '250+ washes',
    washermanAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=80',
  },
];

export const UpcomingBookingsScreen: React.FC = () => {
  const navigation = useNavigation<UpcomingBookingsNavProp>();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const handleReschedule = (booking: UpcomingBookingItem) => {
    Alert.alert('Reschedule Booking', `Select a new slot for booking #${booking.id}`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Choose Slot', onPress: () => navigation.navigate(Routes.SCHEDULE_OPTION) },
    ]);
  };

  const handleCancelBooking = (booking: UpcomingBookingItem) => {
    Alert.alert(
      'Cancel Booking',
      `Are you sure you want to cancel booking #${booking.id}? You can reschedule instead without cancellation charges.`,
      [
        { text: 'Keep Booking', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => Alert.alert('Booking Cancelled', 'Your booking has been cancelled successfully.'),
        },
      ]
    );
  };

  const handleCardPress = (booking: UpcomingBookingItem) => {
    navigation.navigate(Routes.BOOKING_VIEW_DETAILS, { bookingId: `#${booking.id}` });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ArrowLeft size={22} color={Colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <AppText style={styles.headerTitle}>Upcoming Bookings</AppText>
          <AppText style={styles.headerSubtitle}>
            Your scheduled car wash bookings
          </AppText>
        </View>

        <TouchableOpacity
          style={styles.bellBtn}
          onPress={() => navigation.navigate(Routes.NOTIFICATIONS)}
          activeOpacity={0.7}
        >
          <Bell size={20} color="#0F172A" />
          <View style={styles.redDot} />
        </TouchableOpacity>
      </View>

      {/* TOP 3 TABS */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'upcoming' && styles.tabBtnActive]}
          onPress={() => setActiveTab('upcoming')}
          activeOpacity={0.8}
        >
          <AppText style={[styles.tabText, activeTab === 'upcoming' && styles.tabTextActive]}>
            Upcoming (3)
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'completed' && styles.tabBtnActive]}
          onPress={() => navigation.navigate(Routes.BOOKING_HISTORY)}
          activeOpacity={0.8}
        >
          <AppText style={[styles.tabText, activeTab === 'completed' && styles.tabTextActive]}>
            Completed
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'cancelled' && styles.tabBtnActive]}
          onPress={() => navigation.navigate(Routes.BOOKING_HISTORY)}
          activeOpacity={0.8}
        >
          <AppText style={[styles.tabText, activeTab === 'cancelled' && styles.tabTextActive]}>
            Cancelled
          </AppText>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* BOOKING CARDS LIST */}
        {UPCOMING_MOCK_DATA.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.bookingCard}
            onPress={() => handleCardPress(item)}
            activeOpacity={0.9}
          >
            {/* Top row: Date Column + Car details + Chevron */}
            <View style={styles.cardTopRow}>
              {/* Left Date Column */}
              <View style={styles.dateBadgeCol}>
                <AppText style={styles.dateDay}>{item.day}</AppText>
                <AppText style={styles.dateMonth}>{item.monthYear}</AppText>
                <AppText style={styles.dateWeekday}>{item.weekday}</AppText>
                <View style={styles.timeTag}>
                  <Clock size={9} color="#059669" />
                  <AppText style={styles.timeTagText}>{item.time}</AppText>
                </View>
                <View style={styles.confirmedPill}>
                  <View style={styles.greenCircleDot} />
                  <AppText style={styles.confirmedText}>Confirmed</AppText>
                </View>
              </View>

              {/* Middle Car Info */}
              <View style={styles.carInfoWrap}>
                <Image source={{ uri: item.carImage }} style={styles.carThumb} resizeMode="contain" />
                <View style={styles.carTextContent}>
                  <AppText style={styles.carTitle}>{item.carName}</AppText>
                  <AppText style={styles.carPlateText}>{item.carPlate} • {item.carType}</AppText>

                  {/* Service Badge */}
                  <View style={styles.serviceBadge}>
                    <Car size={12} color="#059669" style={{ marginRight: 4 }} />
                    <View>
                      <AppText style={styles.serviceTitleBold}>{item.serviceName}</AppText>
                      <AppText style={styles.serviceDescSmall}>{item.serviceDesc}</AppText>
                    </View>
                  </View>
                </View>
                <ChevronRight size={18} color="#94A3B8" />
              </View>
            </View>

            {/* Washerman Info Row */}
            <View style={styles.washermanMiniRow}>
              <Image source={{ uri: item.washermanAvatar }} style={styles.washermanAvatar} />
              <View style={styles.washermanTextWrap}>
                <AppText style={styles.washermanName}>{item.washermanName}</AppText>
                <View style={styles.washermanRatingRow}>
                  <Star size={11} color="#F59E0B" fill="#F59E0B" />
                  <AppText style={styles.ratingNum}>{item.washermanRating} </AppText>
                  <AppText style={styles.washesCount}>({item.washermanWashes})</AppText>
                </View>
              </View>
            </View>

            {/* Bottom Actions: Reschedule / Cancel */}
            <View style={styles.cardActionsRow}>
              <TouchableOpacity
                style={styles.rescheduleBtn}
                onPress={() => handleReschedule(item)}
                activeOpacity={0.8}
              >
                <Calendar size={13} color="#059669" style={{ marginRight: 4 }} />
                <AppText style={styles.rescheduleText}>Reschedule</AppText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => handleCancelBooking(item)}
                activeOpacity={0.8}
              >
                <XCircle size={13} color="#DC2626" style={{ marginRight: 4 }} />
                <AppText style={styles.cancelText}>Cancel Booking</AppText>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {/* MAKE CHANGES NOTICE */}
        <View style={styles.noticeCard}>
          <View style={styles.noticeIconWrap}>
            <Calendar size={18} color="#059669" />
          </View>
          <View style={{ flex: 1 }}>
            <AppText style={styles.noticeTitle}>Need to make changes?</AppText>
            <AppText style={styles.noticeSub}>
              You can reschedule or cancel your booking up to 2 hours before the scheduled time.
            </AppText>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM NAVIGATION BAR */}
      <BottomTabBar activeTab="bookings" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginTop: 1,
  },
  bellBtn: {
    position: 'relative',
    padding: 6,
  },
  redDot: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  /* TABS */
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 8,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
  },
  tabBtnActive: {
    backgroundColor: '#059669',
  },
  tabText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontFamily: Typography.fontFamily.bold,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  /* BOOKING CARD */
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
  },
  dateBadgeCol: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#F1F5F9',
    width: 76,
  },
  dateDay: {
    fontSize: 22,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  dateMonth: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  dateWeekday: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
    marginBottom: 4,
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  timeTagText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
    marginLeft: 3,
  },
  confirmedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  greenCircleDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#10B981',
    marginRight: 3,
  },
  confirmedText: {
    fontSize: 7,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  carInfoWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  carThumb: {
    width: 70,
    height: 48,
  },
  carTextContent: {
    flex: 1,
    marginLeft: 8,
  },
  carTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  carPlateText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginBottom: 3,
  },
  serviceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  serviceTitleBold: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  serviceDescSmall: {
    fontSize: 7,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  /* WASHERMAN MINI ROW */
  washermanMiniRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  washermanAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  washermanTextWrap: {
    flex: 1,
  },
  washermanName: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  washermanRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  ratingNum: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginLeft: 3,
  },
  washesCount: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  /* CARD ACTIONS */
  cardActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 8,
  },
  rescheduleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  rescheduleText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  cancelBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  cancelText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#DC2626',
  },
  /* NOTICE */
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 8,
  },
  noticeIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  noticeTitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  noticeSub: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.regular,
    color: '#047857',
    marginTop: 2,
    lineHeight: 12,
  },
  /* BOTTOM NAV */
  bottomNavBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#94A3B8',
    marginTop: 2,
  },
  navLabelActive: {
    color: '#059669',
    fontFamily: Typography.fontFamily.bold,
  },
});
