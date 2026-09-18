import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Check,
  Copy,
  Calendar,
  Clock,
  MapPin,
  Car,
  Star,
  Phone,
  MessageSquare,
  ImageIcon,
  Plus,
  CreditCard,
  FileText,
  Edit2,
  AlertTriangle,
  Headphones,
  RotateCcw,
  Share2,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type BookingViewDetailsNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.BOOKING_VIEW_DETAILS
>;

type BookingViewDetailsRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.BOOKING_VIEW_DETAILS
>;

export const BookingViewDetailsScreen: React.FC = () => {
  const navigation = useNavigation<BookingViewDetailsNavProp>();
  const route = useRoute<BookingViewDetailsRouteProp>();
  const { activeBooking } = useBookingStore();

  const bookingId = route.params?.bookingId || activeBooking?.id || '#WO256839';

  const handleCopyBookingId = () => {
    Alert.alert('Copied', `Booking ID ${bookingId} copied to clipboard!`);
  };

  const handleShareBooking = async () => {
    try {
      await Share.share({
        message: `WashOn Booking #${bookingId} - Toyota Fortuner completed wash. Total Paid: ₹848. Check out WashOn!`,
      });
    } catch (error) {
      // ignore
    }
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
          <AppText style={styles.headerTitle}>Booking Details</AppText>
          <AppText style={styles.headerSubtitle}>
            Complete details of your booking
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
        {/* COMPLETED BANNER & BOOKING ID */}
        <View style={styles.completedHeaderCard}>
          <View style={styles.completedHeaderLeft}>
            <View style={styles.checkCircleLarge}>
              <Check size={18} color="#FFFFFF" strokeWidth={3} />
            </View>
            <View style={{ flex: 1 }}>
              <AppText style={styles.completedTitle}>Completed</AppText>
              <AppText style={styles.completedSub}>Your car wash has been completed successfully!</AppText>
            </View>
          </View>

          <View style={styles.bookingIdBox}>
            <AppText style={styles.bookingIdLabel}>Booking ID</AppText>
            <TouchableOpacity
              style={styles.copyIdRow}
              onPress={handleCopyBookingId}
              activeOpacity={0.7}
            >
              <AppText style={styles.bookingIdVal}>{bookingId}</AppText>
              <Copy size={11} color="#64748B" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
            <AppText style={styles.bookedDateSub}>Booked on 12 Sep 2026, 09:15 AM</AppText>
          </View>
        </View>

        {/* VEHICLE & SERVICE OVERVIEW */}
        <View style={styles.vehicleHeaderCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=200&q=80' }}
            style={styles.carHeaderThumb}
            resizeMode="contain"
          />
          <View style={styles.vehicleHeaderMiddle}>
            <AppText style={styles.carName}>Toyota Fortuner</AppText>
            <AppText style={styles.carPlate}>MP 09 AB 1234 • White • SUV</AppText>
            <View style={styles.servicePill}>
              <Car size={11} color="#059669" style={{ marginRight: 4 }} />
              <View>
                <AppText style={styles.serviceNameBold}>Premium Car Wash</AppText>
                <AppText style={styles.serviceSubText}>Exterior + Interior + Polish</AppText>
              </View>
            </View>
          </View>

          <View style={styles.dateLocCol}>
            <View style={styles.dateTimeRow}>
              <Calendar size={12} color="#059669" />
              <View style={{ marginLeft: 4 }}>
                <AppText style={styles.dateValBold}>17 Sep 2026</AppText>
                <AppText style={styles.timeValSub}>10:00 AM - 11:30 AM</AppText>
              </View>
            </View>

            <View style={styles.locRow}>
              <MapPin size={12} color="#059669" />
              <View style={{ marginLeft: 4 }}>
                <AppText style={styles.locValBold}>Home</AppText>
                <AppText style={styles.locValSub}>Vijay Nagar, Indore</AppText>
              </View>
            </View>
          </View>
        </View>

        {/* WASHERMAN DETAILS */}
        <View style={styles.sectionCard}>
          <View style={styles.washermanCardInner}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&q=80' }}
              style={styles.washermanAvatar}
            />
            <View style={styles.washermanInfo}>
              <AppText style={styles.washermanTitleLabel}>Washerman Details</AppText>
              <AppText style={styles.washermanName}>Ramesh Yadav</AppText>
              <View style={styles.ratingRow}>
                <Star size={11} color="#F59E0B" fill="#F59E0B" />
                <AppText style={styles.ratingText}>4.8 </AppText>
                <AppText style={styles.washesCount}>(320+ washes)</AppText>
              </View>
            </View>

            <View style={styles.washermanActions}>
              <TouchableOpacity style={styles.callBtn} activeOpacity={0.8}>
                <Phone size={12} color="#059669" style={{ marginRight: 4 }} />
                <AppText style={styles.callBtnText}>Call</AppText>
              </TouchableOpacity>

              <TouchableOpacity style={styles.chatBtn} activeOpacity={0.8}>
                <MessageSquare size={12} color="#059669" style={{ marginRight: 4 }} />
                <AppText style={styles.chatBtnText}>Chat</AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* HORIZONTAL BOOKING TIMELINE */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.headerLeft}>
              <View style={styles.iconCircleGreen}>
                <Clock size={14} color="#059669" />
              </View>
              <AppText style={styles.cardHeaderTitle}>Booking Timeline</AppText>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <AppText style={styles.viewAllText}>View All ›</AppText>
            </TouchableOpacity>
          </View>

          {/* 5 Nodes Timeline */}
          <View style={styles.hTimelineRow}>
            {/* 1. Booked */}
            <View style={styles.hNodeItem}>
              <View style={styles.hNodeCircle}>
                <Check size={10} color="#FFFFFF" strokeWidth={3} />
              </View>
              <AppText style={styles.hNodeTitle}>Booked</AppText>
              <AppText style={styles.hNodeTime}>12 Sep{'\n'}09:15 AM</AppText>
            </View>
            <View style={styles.hNodeLineActive} />

            {/* 2. Confirmed */}
            <View style={styles.hNodeItem}>
              <View style={styles.hNodeCircle}>
                <Check size={10} color="#FFFFFF" strokeWidth={3} />
              </View>
              <AppText style={styles.hNodeTitle}>Confirmed</AppText>
              <AppText style={styles.hNodeTime}>12 Sep{'\n'}09:20 AM</AppText>
            </View>
            <View style={styles.hNodeLineActive} />

            {/* 3. Washerman Assigned */}
            <View style={styles.hNodeItem}>
              <View style={styles.hNodeCircle}>
                <Check size={10} color="#FFFFFF" strokeWidth={3} />
              </View>
              <AppText style={styles.hNodeTitle}>Washerman{'\n'}Assigned</AppText>
              <AppText style={styles.hNodeTime}>16 Sep{'\n'}06:00 PM</AppText>
            </View>
            <View style={styles.hNodeLineActive} />

            {/* 4. In Progress */}
            <View style={styles.hNodeItem}>
              <View style={styles.hNodeCircle}>
                <Check size={10} color="#FFFFFF" strokeWidth={3} />
              </View>
              <AppText style={styles.hNodeTitle}>In Progress</AppText>
              <AppText style={styles.hNodeTime}>17 Sep{'\n'}10:05 AM</AppText>
            </View>
            <View style={styles.hNodeLineActive} />

            {/* 5. Completed */}
            <View style={styles.hNodeItem}>
              <View style={styles.hNodeCircle}>
                <Check size={10} color="#FFFFFF" strokeWidth={3} />
              </View>
              <AppText style={styles.hNodeTitle}>Completed</AppText>
              <AppText style={styles.hNodeTime}>17 Sep{'\n'}11:30 AM</AppText>
            </View>
          </View>
        </View>

        {/* SERVICE PHOTOS */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.headerLeft}>
              <View style={styles.iconCircleGreen}>
                <ImageIcon size={14} color="#059669" />
              </View>
              <AppText style={styles.cardHeaderTitle}>Service Photos</AppText>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <AppText style={styles.viewAllText}>See All (8) ›</AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.photosGrid}>
            <View style={styles.photoThumbWrap}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=200&q=80' }}
                style={styles.servicePhotoThumb}
              />
              <View style={styles.beforePhotoTag}><AppText style={styles.tagText}>Before</AppText></View>
            </View>

            <View style={styles.photoThumbWrap}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=200&q=80' }}
                style={styles.servicePhotoThumb}
              />
              <View style={styles.afterPhotoTag}><AppText style={styles.tagText}>After</AppText></View>
            </View>

            <View style={styles.photoThumbWrap}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&q=80' }}
                style={styles.servicePhotoThumb}
              />
              <View style={styles.afterPhotoTag}><AppText style={styles.tagText}>After</AppText></View>
            </View>

            <View style={styles.photoThumbWrap}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=200&q=80' }}
                style={styles.servicePhotoThumb}
              />
              <View style={styles.afterPhotoTag}><AppText style={styles.tagText}>After</AppText></View>
            </View>

            <TouchableOpacity style={styles.addPhotoDashed} activeOpacity={0.8}>
              <Plus size={16} color="#059669" />
              <AppText style={styles.addPhotoText}>Add Photo</AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* PAYMENT DETAILS */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.headerLeft}>
              <View style={styles.iconCircleGreen}>
                <CreditCard size={14} color="#059669" />
              </View>
              <AppText style={styles.cardHeaderTitle}>Payment Details</AppText>
              <View style={styles.paidBadge}>
                <AppText style={styles.paidBadgeText}>● Paid</AppText>
              </View>
            </View>
          </View>

          <View style={styles.paymentSplit}>
            <View style={styles.paymentBreakdown}>
              <View style={styles.priceLine}>
                <AppText style={styles.priceLabel}>Service Amount</AppText>
                <AppText style={styles.priceVal}>₹699</AppText>
              </View>
              <View style={styles.priceLine}>
                <AppText style={styles.priceLabel}>Platform Fee</AppText>
                <AppText style={styles.priceVal}>₹20</AppText>
              </View>
              <View style={styles.priceLine}>
                <AppText style={styles.priceLabel}>GST (18%)</AppText>
                <AppText style={styles.priceVal}>₹129</AppText>
              </View>
              <View style={styles.divider} />
              <View style={styles.totalLine}>
                <AppText style={styles.totalLabel}>Total Paid</AppText>
                <AppText style={styles.totalValBold}>₹848</AppText>
              </View>
            </View>

            <TouchableOpacity
              style={styles.viewInvoiceCardBtn}
              onPress={() => navigation.navigate(Routes.INVOICE, { bookingId })}
              activeOpacity={0.85}
            >
              <FileText size={16} color="#059669" style={{ marginRight: 6 }} />
              <AppText style={styles.viewInvoiceText}>View Invoice</AppText>
              <ChevronRight size={14} color="#059669" />
            </TouchableOpacity>
          </View>
        </View>

        {/* YOUR REVIEW */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.headerLeft}>
              <View style={styles.iconCircleGreen}>
                <Star size={14} color="#059669" fill="#059669" />
              </View>
              <AppText style={styles.cardHeaderTitle}>Your Review</AppText>
              <View style={styles.reviewStarsRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={11} color="#F59E0B" fill="#F59E0B" />
                ))}
                <AppText style={styles.reviewScore}>5.0</AppText>
              </View>
            </View>
            <TouchableOpacity
              style={styles.editReviewBtn}
              onPress={() => navigation.navigate(Routes.WRITE_REVIEW, { bookingId })}
              activeOpacity={0.7}
            >
              <Edit2 size={11} color="#059669" style={{ marginRight: 3 }} />
              <AppText style={styles.editReviewText}>Edit Review</AppText>
            </TouchableOpacity>
          </View>
          <AppText style={styles.reviewQuote}>
            "Great service! On time and very professional. My car looks brand new!"
          </AppText>
        </View>

        {/* NEED HELP / RAISE ISSUE */}
        <View style={styles.needHelpCard}>
          <View style={styles.needHelpLeft}>
            <View style={styles.headphoneCircle}>
              <Headphones size={16} color="#059669" />
            </View>
            <View>
              <AppText style={styles.needHelpTitle}>Need Help?</AppText>
              <AppText style={styles.needHelpSub}>Facing any issue with this booking?</AppText>
            </View>
          </View>

          <TouchableOpacity
            style={styles.raiseIssueBtn}
            onPress={() => navigation.navigate(Routes.REPORT_ISSUE, { bookingId })}
            activeOpacity={0.8}
          >
            <AlertTriangle size={12} color="#DC2626" style={{ marginRight: 4 }} />
            <AppText style={styles.raiseIssueText}>Raise Issue</AppText>
          </TouchableOpacity>
        </View>

        {/* BOTTOM ACTION BUTTONS: BOOK AGAIN & SHARE BOOKING */}
        <View style={styles.bottomButtonsRow}>
          <TouchableOpacity
            style={styles.bookAgainBtn}
            onPress={() => navigation.navigate(Routes.SERVICE_CATEGORY)}
            activeOpacity={0.8}
          >
            <RotateCcw size={15} color="#0F172A" style={{ marginRight: 6 }} />
            <AppText style={styles.bookAgainText}>Book Again</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shareBookingBtn}
            onPress={handleShareBooking}
            activeOpacity={0.88}
          >
            <Share2 size={15} color="#FFFFFF" style={{ marginRight: 6 }} />
            <AppText style={styles.shareBookingText}>Share Booking</AppText>
          </TouchableOpacity>
        </View>
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
  /* COMPLETED BANNER */
  completedHeaderCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 12,
  },
  completedHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkCircleLarge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  completedTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  completedSub: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#047857',
  },
  bookingIdBox: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#D1FAE5',
  },
  bookingIdLabel: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  copyIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  bookingIdVal: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  bookedDateSub: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  /* VEHICLE CARD */
  vehicleHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 12,
  },
  carHeaderThumb: {
    width: 70,
    height: 44,
  },
  vehicleHeaderMiddle: {
    flex: 1,
    marginLeft: 8,
  },
  carName: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  carPlate: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginBottom: 3,
  },
  servicePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  serviceNameBold: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  serviceSubText: {
    fontSize: 7,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  dateLocCol: {
    borderLeftWidth: 1,
    borderLeftColor: '#F1F5F9',
    paddingLeft: 8,
    justifyContent: 'space-around',
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  dateValBold: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  timeValSub: {
    fontSize: 7,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  locRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locValBold: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  locValSub: {
    fontSize: 7,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  /* WASHERMAN */
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 12,
  },
  washermanCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  washermanAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  washermanInfo: {
    flex: 1,
  },
  washermanTitleLabel: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  washermanName: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginLeft: 2,
  },
  washesCount: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  washermanActions: {
    flexDirection: 'row',
    gap: 6,
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  callBtnText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  chatBtnText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  /* TIMELINE */
  cardHeaderRow: {
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
  cardHeaderTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  viewAllText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  hTimelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingHorizontal: 2,
  },
  hNodeItem: {
    alignItems: 'center',
    width: 48,
  },
  hNodeCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  hNodeTitle: {
    fontSize: 7,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: 9,
  },
  hNodeTime: {
    fontSize: 6,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 1,
  },
  hNodeLineActive: {
    flex: 1,
    height: 2,
    backgroundColor: '#059669',
    marginBottom: 16,
    marginHorizontal: -4,
  },
  /* PHOTOS GRID */
  photosGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  photoThumbWrap: {
    position: 'relative',
  },
  servicePhotoThumb: {
    width: 54,
    height: 54,
    borderRadius: 8,
  },
  beforePhotoTag: {
    position: 'absolute',
    bottom: 3,
    left: 3,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  afterPhotoTag: {
    position: 'absolute',
    bottom: 3,
    left: 3,
    backgroundColor: 'rgba(5,150,105,0.85)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  tagText: {
    fontSize: 7,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  addPhotoDashed: {
    width: 54,
    height: 54,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    borderStyle: 'dashed',
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoText: {
    fontSize: 7,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
    marginTop: 2,
  },
  /* PAYMENT */
  paidBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  paidBadgeText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  paymentSplit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  paymentBreakdown: {
    flex: 1.1,
    paddingRight: 10,
  },
  priceLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  priceLabel: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  priceVal: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 4,
  },
  totalLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  totalValBold: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  viewInvoiceCardBtn: {
    flex: 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  viewInvoiceText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
    marginRight: 4,
  },
  /* REVIEW */
  reviewStarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  reviewScore: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginLeft: 3,
  },
  editReviewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  editReviewText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  reviewQuote: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.regular,
    color: '#475569',
    fontStyle: 'italic',
    marginTop: 4,
    lineHeight: 13,
  },
  /* NEED HELP */
  needHelpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 14,
  },
  needHelpLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headphoneCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  needHelpTitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  needHelpSub: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  raiseIssueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  raiseIssueText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#DC2626',
  },
  /* BOTTOM BUTTONS */
  bottomButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 8,
  },
  bookAgainBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  bookAgainText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  shareBookingBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 12,
  },
  shareBookingText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
});
