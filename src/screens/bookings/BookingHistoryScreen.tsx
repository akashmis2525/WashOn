import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Calendar,
  Search,
  SlidersHorizontal,
  Clock,
  MapPin,
  Check,
  X,
  RotateCcw,
  Star,
  Home,
  CalendarDays,
  PlusCircle,
  Tag,
  User,
  Car,
  Armchair,
  ShieldCheck,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { BottomTabBar } from '../../components/navigation/BottomTabBar';

const { width } = Dimensions.get('window');

type BookingHistoryNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.BOOKING_HISTORY
>;

interface HistoryBookingItem {
  id: string;
  date: string;
  time: string;
  location: string;
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
  price: string;
  status: 'completed' | 'cancelled' | 'failed';
  statusNote?: string;
}

const HISTORY_MOCK_DATA: HistoryBookingItem[] = [
  {
    id: 'WO256839',
    date: '12 Sep 2026',
    time: '10:00 AM',
    location: 'Home',
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
    price: '₹699',
    status: 'completed',
  },
  {
    id: 'WO256835',
    date: '05 Sep 2026',
    time: '02:30 PM',
    location: 'Office',
    carName: 'Maruti Swift',
    carPlate: 'MP 09 CD 5678',
    carType: 'Red • Hatchback',
    carImage: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=240&q=80',
    serviceName: 'Interior Cleaning',
    serviceDesc: 'Dry Clean + Vacuum',
    serviceIcon: 'armchair',
    washermanName: 'Amit Patidar',
    washermanRating: '4.6',
    washermanWashes: '180+ washes',
    washermanAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&q=80',
    price: '₹499',
    status: 'completed',
  },
  {
    id: 'WO256830',
    date: '28 Aug 2026',
    time: '11:00 AM',
    location: 'Home',
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
    price: '₹599',
    status: 'cancelled',
    statusNote: 'Cancelled by you on 27 Aug 2026',
  },
  {
    id: 'WO256822',
    date: '20 Aug 2026',
    time: '04:00 PM',
    location: 'Home',
    carName: 'Hyundai Creta',
    carPlate: 'MP 09 GH 3456',
    carType: 'White • SUV',
    carImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=240&q=80',
    serviceName: 'Basic Car Wash',
    serviceDesc: 'Exterior Wash',
    serviceIcon: 'car',
    washermanName: 'Rakesh Verma',
    washermanRating: '4.5',
    washermanWashes: '120+ washes',
    washermanAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&q=80',
    price: '₹399',
    status: 'failed',
    statusNote: 'Payment failed. Please try again',
  },
];

export const BookingHistoryScreen: React.FC = () => {
  const navigation = useNavigation<BookingHistoryNavProp>();
  const [filterTab, setFilterTab] = useState<'all' | 'completed' | 'cancelled' | 'failed'>('completed');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredData = HISTORY_MOCK_DATA.filter((item) => {
    if (filterTab !== 'all' && item.status !== filterTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.carName.toLowerCase().includes(q) ||
        item.carPlate.toLowerCase().includes(q) ||
        item.serviceName.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleRebook = (item: HistoryBookingItem) => {
    navigation.navigate(Routes.SERVICE_CATEGORY);
  };

  const handleViewDetails = (item: HistoryBookingItem) => {
    navigation.navigate(Routes.BOOKING_VIEW_DETAILS, { bookingId: `#${item.id}` });
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
          <AppText style={styles.headerTitle}>Booking History</AppText>
          <AppText style={styles.headerSubtitle}>
            View and manage all your bookings
          </AppText>
        </View>

        <TouchableOpacity style={styles.calBtn} activeOpacity={0.7}>
          <Calendar size={20} color="#059669" />
        </TouchableOpacity>
      </View>

      {/* FILTER PILLS */}
      <View style={styles.filterPillsRow}>
        <TouchableOpacity
          style={[styles.filterPill, filterTab === 'all' && styles.filterPillAllActive]}
          onPress={() => setFilterTab('all')}
          activeOpacity={0.8}
        >
          <AppText style={[styles.filterPillText, filterTab === 'all' && styles.filterPillTextActive]}>
            All 12
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterPill, filterTab === 'completed' && styles.filterPillCompletedActive]}
          onPress={() => setFilterTab('completed')}
          activeOpacity={0.8}
        >
          <AppText style={[styles.filterPillText, filterTab === 'completed' && styles.filterPillTextActive]}>
            Completed 8
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterPill, filterTab === 'cancelled' && styles.filterPillCancelledActive]}
          onPress={() => setFilterTab('cancelled')}
          activeOpacity={0.8}
        >
          <AppText style={[styles.filterPillText, filterTab === 'cancelled' && styles.filterPillTextRed]}>
            Cancelled 2
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterPill, filterTab === 'failed' && styles.filterPillFailedActive]}
          onPress={() => setFilterTab('failed')}
          activeOpacity={0.8}
        >
          <AppText style={[styles.filterPillText, filterTab === 'failed' && styles.filterPillTextRed]}>
            Failed 2
          </AppText>
        </TouchableOpacity>
      </View>

      {/* SEARCH AND FILTERS BAR */}
      <View style={styles.searchBarRow}>
        <View style={styles.searchWrap}>
          <Search size={16} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by vehicle, service or booking ID..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filtersBtn} activeOpacity={0.7}>
          <SlidersHorizontal size={14} color="#64748B" style={{ marginRight: 4 }} />
          <AppText style={styles.filtersBtnText}>Filters</AppText>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* BOOKING CARDS */}
        {filteredData.map((item) => (
          <View key={item.id} style={styles.historyCard}>
            {/* Top Date, Location & Status */}
            <View style={styles.cardHeaderRow}>
              {/* Left Date */}
              <View style={styles.dateCol}>
                <AppText style={styles.dateDayBold}>{item.date.split(' ')[0]}</AppText>
                <AppText style={styles.dateMonthSmall}>
                  {item.date.split(' ').slice(1).join(' ')}
                </AppText>
                <View style={styles.timeTag}>
                  <Clock size={8} color="#059669" />
                  <AppText style={styles.timeText}>{item.time}</AppText>
                </View>
                <View style={styles.locTag}>
                  <MapPin size={8} color="#64748B" />
                  <AppText style={styles.locText}>{item.location}</AppText>
                </View>
              </View>

              {/* Middle Car Info */}
              <View style={styles.carInfoCol}>
                <Image source={{ uri: item.carImage }} style={styles.carThumb} resizeMode="contain" />
                <View style={styles.carTextWrap}>
                  <AppText style={styles.carName}>{item.carName}</AppText>
                  <AppText style={styles.carPlate}>{item.carPlate} • {item.carType}</AppText>

                  <View style={styles.serviceBadge}>
                    <Car size={11} color="#059669" style={{ marginRight: 4 }} />
                    <View>
                      <AppText style={styles.serviceTitle}>{item.serviceName}</AppText>
                      <AppText style={styles.serviceDesc}>{item.serviceDesc}</AppText>
                    </View>
                  </View>
                </View>
              </View>

              {/* Right Price & Status Badge */}
              <View style={styles.priceStatusCol}>
                <AppText style={styles.priceVal}>{item.price}</AppText>
                {item.status === 'completed' && (
                  <View style={styles.completedBadge}>
                    <Check size={10} color="#FFFFFF" strokeWidth={3} style={{ marginRight: 3 }} />
                    <AppText style={styles.completedBadgeText}>Completed</AppText>
                  </View>
                )}
                {item.status === 'cancelled' && (
                  <View style={styles.cancelledBadge}>
                    <X size={10} color="#FFFFFF" strokeWidth={3} style={{ marginRight: 3 }} />
                    <AppText style={styles.cancelledBadgeText}>Cancelled</AppText>
                  </View>
                )}
                {item.status === 'failed' && (
                  <View style={styles.failedBadge}>
                    <X size={10} color="#FFFFFF" strokeWidth={3} style={{ marginRight: 3 }} />
                    <AppText style={styles.failedBadgeText}>Failed</AppText>
                  </View>
                )}
              </View>
            </View>

            {/* Washerman row / Status note */}
            <View style={styles.washermanRow}>
              <View style={styles.washermanLeft}>
                <Image source={{ uri: item.washermanAvatar }} style={styles.washermanAvatar} />
                <View>
                  <AppText style={styles.washermanName}>{item.washermanName}</AppText>
                  <View style={styles.ratingWrap}>
                    <Star size={10} color="#F59E0B" fill="#F59E0B" />
                    <AppText style={styles.ratingText}>{item.washermanRating} </AppText>
                    <AppText style={styles.ratingSub}>({item.washermanWashes})</AppText>
                  </View>
                </View>
              </View>

              {item.statusNote && (
                <AppText style={styles.statusNoteText}>{item.statusNote}</AppText>
              )}
            </View>

            {/* Bottom Actions Row */}
            <View style={styles.bottomActionsRow}>
              <TouchableOpacity
                style={styles.viewDetailsBtn}
                onPress={() => handleViewDetails(item)}
                activeOpacity={0.8}
              >
                <AppText style={styles.viewDetailsText}>View Details</AppText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.rebookBtn}
                onPress={() => handleRebook(item)}
                activeOpacity={0.8}
              >
                <RotateCcw size={12} color="#059669" style={{ marginRight: 4 }} />
                <AppText style={styles.rebookText}>Rebook</AppText>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* BOTTOM NAV */}
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
  calBtn: {
    padding: 6,
  },
  /* FILTER PILLS */
  filterPillsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  filterPillAllActive: {
    backgroundColor: '#0F172A',
  },
  filterPillCompletedActive: {
    backgroundColor: '#059669',
  },
  filterPillCancelledActive: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  filterPillFailedActive: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  filterPillText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
    fontFamily: Typography.fontFamily.bold,
  },
  filterPillTextRed: {
    color: '#DC2626',
    fontFamily: Typography.fontFamily.bold,
  },
  /* SEARCH BAR */
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 8,
  },
  searchWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#0F172A',
    marginLeft: 6,
  },
  filtersBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filtersBtnText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  /* HISTORY CARD */
  historyCard: {
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
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dateCol: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 8,
    borderRightWidth: 1,
    borderRightColor: '#F1F5F9',
    width: 68,
  },
  dateDayBold: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  dateMonthSmall: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginBottom: 3,
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    marginBottom: 2,
  },
  timeText: {
    fontSize: 7,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
    marginLeft: 2,
  },
  locTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginLeft: 2,
  },
  carInfoCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  carThumb: {
    width: 60,
    height: 40,
  },
  carTextWrap: {
    flex: 1,
    marginLeft: 6,
  },
  carName: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  carPlate: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginBottom: 2,
  },
  serviceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  serviceTitle: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  serviceDesc: {
    fontSize: 7,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  priceStatusCol: {
    alignItems: 'flex-end',
    borderLeftWidth: 1,
    borderLeftColor: '#F1F5F9',
    paddingLeft: 8,
  },
  priceVal: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 4,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  completedBadgeText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  cancelledBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  cancelledBadgeText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  failedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  failedBadgeText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  /* WASHERMAN ROW */
  washermanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 6,
    marginTop: 8,
  },
  washermanLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  washermanAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 6,
  },
  washermanName: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  ratingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginLeft: 2,
  },
  ratingSub: {
    fontSize: 7,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  statusNoteText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#DC2626',
    textAlign: 'right',
  },
  /* BOTTOM ACTIONS */
  bottomActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 8,
  },
  viewDetailsBtn: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  viewDetailsText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#475569',
  },
  rebookBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  rebookText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
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
});
