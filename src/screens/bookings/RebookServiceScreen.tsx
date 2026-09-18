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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  RotateCcw,
  Clock,
  Car,
  Settings,
  User,
  Calendar,
  CheckCircle2,
  Droplets,
  Armchair,
  Sparkles,
  Star,
  Check,
  ChevronRight,
  ArrowRight,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type RebookServiceNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.REBOOK_SERVICE
>;

type RebookServiceRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.REBOOK_SERVICE
>;

export const RebookServiceScreen: React.FC = () => {
  const navigation = useNavigation<RebookServiceNavProp>();
  const route = useRoute<RebookServiceRouteProp>();
  const { activeBooking } = useBookingStore();

  const bookingId = route.params?.bookingId || activeBooking?.id || '#WO256839';

  const [selectedDate, setSelectedDate] = useState<string>('18 Sep 2026');
  const [selectedDay, setSelectedDay] = useState<string>('Friday');
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');

  const handleBookAgain = () => {
    navigation.navigate(Routes.BOOKING_CONFIRMATION);
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
          <AppText style={styles.headerTitle}>Rebook Service</AppText>
          <AppText style={styles.headerSubtitle}>
            Book again with your previous details
          </AppText>
        </View>

        {/* Logo Badge */}
        <View style={styles.logoBadge}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=120&q=80' }}
            style={styles.logoIcon}
          />
          <View>
            <AppText style={styles.logoText}>Wash<AppText style={styles.logoTextAccent}>On</AppText></AppText>
            <AppText style={styles.logoSubtext}>CLEAN RIDES | HAPPIER YOU</AppText>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TOP REBOOK BANNER */}
        <View style={styles.heroBanner}>
          <View style={styles.heroLeft}>
            <View style={styles.heroIconCircle}>
              <RotateCcw size={20} color="#059669" />
            </View>
            <View style={{ flex: 1 }}>
              <AppText style={styles.heroTitle}>Book Again, Same Great Service!</AppText>
              <AppText style={styles.heroSub}>
                Your previous booking details have been pre-filled for a quick rebooking.
              </AppText>
            </View>
          </View>
          <View style={styles.heroRightSparkle}>
            <Car size={32} color="#A7F3D0" />
            <Sparkles size={14} color="#059669" style={{ position: 'absolute', top: -4, right: -4 }} />
          </View>
        </View>

        {/* PREVIOUS BOOKING REFERENCE CARD */}
        <View style={styles.prevBookingCard}>
          <View style={styles.prevLeft}>
            <View style={styles.prevIconCircle}>
              <Clock size={16} color="#059669" />
            </View>
            <View>
              <AppText style={styles.prevTitle}>Previous Booking</AppText>
              <AppText style={styles.prevMeta}>
                Booking ID: <AppText style={styles.prevMetaBold}>{bookingId}</AppText>
              </AppText>
              <AppText style={styles.prevDate}>Completed on: 12 Sep 2026, 11:30 AM</AppText>
            </View>
          </View>

          <TouchableOpacity
            style={styles.viewDetailsBtn}
            onPress={() => navigation.navigate(Routes.BOOKING_VIEW_DETAILS, { bookingId })}
            activeOpacity={0.7}
          >
            <AppText style={styles.viewDetailsText}>View Details</AppText>
            <ChevronRight size={12} color="#0F172A" />
          </TouchableOpacity>
        </View>

        {/* VEHICLE (SAME AS BEFORE) */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.headerLeft}>
              <View style={styles.iconCircleGreen}>
                <Car size={14} color="#059669" />
              </View>
              <AppText style={styles.sectionTitle}>
                Vehicle <AppText style={styles.subTag}>(Same as before)</AppText>
              </AppText>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.VEHICLE_LIST)}
              activeOpacity={0.7}
            >
              <AppText style={styles.changeText}>Change</AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.vehicleInnerRow}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=200&q=80' }}
              style={styles.carThumb}
              resizeMode="contain"
            />
            <View style={styles.carTextWrap}>
              <AppText style={styles.carName}>Toyota Fortuner</AppText>
              <AppText style={styles.carPlate}>MP 09 AB 1234 • White • SUV</AppText>
            </View>
          </View>
        </View>

        {/* SERVICE (SAME AS BEFORE) */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.headerLeft}>
              <View style={styles.iconCircleGreen}>
                <Settings size={14} color="#059669" />
              </View>
              <AppText style={styles.sectionTitle}>
                Service <AppText style={styles.subTag}>(Same as before)</AppText>
              </AppText>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.SERVICE_CATEGORY)}
              activeOpacity={0.7}
            >
              <AppText style={styles.changeText}>Change</AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.serviceInnerRow}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=200&q=80' }}
              style={styles.serviceThumb}
            />
            <View style={styles.serviceTextWrap}>
              <AppText style={styles.serviceName}>Premium Car Wash</AppText>
              <AppText style={styles.serviceDesc}>Exterior + Interior + Polish</AppText>

              <View style={styles.pillsRow}>
                <View style={styles.pillItem}>
                  <Droplets size={10} color="#2563EB" />
                  <AppText style={styles.pillText}>Exterior</AppText>
                </View>
                <View style={styles.pillItem}>
                  <Armchair size={10} color="#059669" />
                  <AppText style={styles.pillText}>Interior</AppText>
                </View>
                <View style={styles.pillItem}>
                  <Sparkles size={10} color="#D97706" />
                  <AppText style={styles.pillText}>Polish</AppText>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* WASHERMAN (SAME AS BEFORE) */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.headerLeft}>
              <View style={styles.iconCircleGreen}>
                <User size={14} color="#059669" />
              </View>
              <AppText style={styles.sectionTitle}>
                Washerman <AppText style={styles.subTag}>(Same as before)</AppText>
              </AppText>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.WASHERMAN_LIST_VIEW)}
              activeOpacity={0.7}
            >
              <AppText style={styles.changeText}>Change</AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.washermanInnerRow}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&q=80' }}
              style={styles.washermanAvatar}
            />
            <View style={styles.washermanInfo}>
              <AppText style={styles.washermanName}>Ramesh Yadav</AppText>
              <View style={styles.ratingRow}>
                <Star size={11} color="#F59E0B" fill="#F59E0B" />
                <AppText style={styles.ratingText}>4.8 </AppText>
                <AppText style={styles.washesText}>(320+ washes)</AppText>
              </View>
              <View style={styles.servedTag}>
                <Check size={9} color="#059669" strokeWidth={3} />
                <AppText style={styles.servedTagText}>Previously Served You</AppText>
              </View>
            </View>
          </View>
        </View>

        {/* PREFERRED DATE & TIME */}
        <View style={styles.sectionCard}>
          <View style={styles.headerLeft}>
            <View style={styles.iconCircleGreen}>
              <Calendar size={14} color="#059669" />
            </View>
            <AppText style={styles.sectionTitle}>Preferred Date & Time</AppText>
          </View>

          <View style={styles.dateTimeGrid}>
            {/* Date Button */}
            <TouchableOpacity
              style={styles.slotBtn}
              onPress={() => navigation.navigate(Routes.SCHEDULE_OPTION)}
              activeOpacity={0.8}
            >
              <Calendar size={15} color="#059669" style={{ marginRight: 8 }} />
              <View style={{ flex: 1 }}>
                <AppText style={styles.slotTitle}>{selectedDate}</AppText>
                <AppText style={styles.slotSub}>{selectedDay}</AppText>
              </View>
              <ChevronRight size={14} color="#94A3B8" />
            </TouchableOpacity>

            {/* Time Button */}
            <TouchableOpacity
              style={styles.slotBtn}
              onPress={() => navigation.navigate(Routes.SCHEDULE_OPTION)}
              activeOpacity={0.8}
            >
              <Clock size={15} color="#059669" style={{ marginRight: 8 }} />
              <View style={{ flex: 1 }}>
                <AppText style={styles.slotTitle}>{selectedTime}</AppText>
              </View>
              <ChevronRight size={14} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* NOTICE BAR */}
        <View style={styles.noticeBar}>
          <CheckCircle2 size={16} color="#059669" style={{ marginRight: 6 }} />
          <AppText style={styles.noticeText}>
            You can modify any details before confirming.
          </AppText>
        </View>

        {/* BOOK AGAIN CTA */}
        <TouchableOpacity
          style={styles.bookAgainCTA}
          onPress={handleBookAgain}
          activeOpacity={0.88}
        >
          <Calendar size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
          <AppText style={styles.bookAgainCTAText}>Book Again</AppText>
          <ArrowRight size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </ScrollView>
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
  logoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  logoIcon: {
    width: 22,
    height: 22,
    borderRadius: 6,
    marginRight: 6,
  },
  logoText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    lineHeight: 15,
  },
  logoTextAccent: {
    color: '#F59E0B',
  },
  logoSubtext: {
    fontSize: 6,
    fontFamily: Typography.fontFamily.bold,
    color: '#92400E',
    letterSpacing: 0.3,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 28,
  },
  /* HERO BANNER */
  heroBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 12,
  },
  heroLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 8,
  },
  heroIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  heroTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  heroSub: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#047857',
    marginTop: 2,
    lineHeight: 12,
  },
  heroRightSparkle: {
    position: 'relative',
    padding: 4,
  },
  /* PREV BOOKING */
  prevBookingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 12,
  },
  prevLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  prevIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  prevTitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  prevMeta: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginTop: 1,
  },
  prevMetaBold: {
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  prevDate: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 1,
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  viewDetailsText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
    marginRight: 2,
  },
  /* SECTION CARD */
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircleGreen: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  subTag: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  changeText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  /* VEHICLE ROW */
  vehicleInnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 8,
  },
  carThumb: {
    width: 70,
    height: 44,
  },
  carTextWrap: {
    marginLeft: 10,
  },
  carName: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  carPlate: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginTop: 2,
  },
  /* SERVICE ROW */
  serviceInnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 8,
  },
  serviceThumb: {
    width: 54,
    height: 54,
    borderRadius: 8,
  },
  serviceTextWrap: {
    flex: 1,
    marginLeft: 10,
  },
  serviceName: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  serviceDesc: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginTop: 1,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  pillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pillText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#475569',
    marginLeft: 3,
  },
  /* WASHERMAN ROW */
  washermanInnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 8,
  },
  washermanAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  washermanInfo: {
    marginLeft: 10,
  },
  washermanName: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  ratingText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginLeft: 2,
  },
  washesText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  servedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 4,
    marginTop: 3,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  servedTagText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
    marginLeft: 3,
  },
  /* DATE TIME GRID */
  dateTimeGrid: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  slotBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  slotTitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  slotSub: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  /* NOTICE */
  noticeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  noticeText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#065F46',
  },
  /* CTA */
  bookAgainCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 12,
  },
  bookAgainCTAText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
});
