import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Share,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Check,
  Copy,
  User,
  Phone,
  Mail,
  MapPin,
  Star,
  Car,
  Calendar,
  Clock,
  Download,
  Share2,
  Mail as EmailIcon,
  Printer,
  Headphones,
  Leaf,
  Receipt,
  CreditCard,
  FileText,
  Edit2,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type InvoiceNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.INVOICE
>;

type InvoiceRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.INVOICE
>;

export const InvoiceScreen: React.FC = () => {
  const navigation = useNavigation<InvoiceNavProp>();
  const route = useRoute<InvoiceRouteProp>();
  const { activeBooking } = useBookingStore();

  const bookingId = route.params?.bookingId || activeBooking?.id || '#WO256839';
  const invoiceNo = 'INV-WO-20260917-0012';

  const handleCopyInvoice = () => {
    Alert.alert('Copied', `Invoice Number ${invoiceNo} copied to clipboard!`);
  };

  const handleDownloadPDF = () => {
    Alert.alert('PDF Downloaded', 'Invoice PDF has been saved successfully.');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `WashOn Tax Invoice #${invoiceNo} for ${bookingId} - Paid ₹728. Thank you for choosing WashOn!`,
      });
    } catch (error) {
      // ignore
    }
  };

  const handleEmailInvoice = () => {
    Alert.alert('Email Sent', 'Invoice has been emailed to mishraakash576@gmail.com');
  };

  const handlePrint = () => {
    Alert.alert('Print', 'Connecting to available AirPrint/WiFi printers...');
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
          <AppText style={styles.headerTitle}>Invoice</AppText>
          <AppText style={styles.headerSubtitle}>
            Thank you for choosing WashOn!
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
        {/* TOP PAYMENT STATUS & INVOICE NUMBER CARD */}
        <View style={styles.topStatusCard}>
          <View style={styles.statusHeaderRow}>
            <View style={styles.statusLeft}>
              <View style={styles.statusCheckCircle}>
                <Check size={18} color="#FFFFFF" strokeWidth={3} />
              </View>
              <View style={styles.statusTextWrap}>
                <AppText style={styles.statusTitle}>Payment Successful</AppText>
                <AppText style={styles.statusSub}>Your service has been completed.</AppText>
              </View>
            </View>

            <TouchableOpacity
              style={styles.invoiceNoBox}
              onPress={handleCopyInvoice}
              activeOpacity={0.7}
            >
              <AppText style={styles.invoiceNoLabel}>Invoice No.</AppText>
              <View style={styles.invoiceNoValueRow}>
                <AppText style={styles.invoiceNoValue}>{invoiceNo}</AppText>
                <Copy size={11} color="#64748B" style={{ marginLeft: 4 }} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.statusMetaRow}>
            <View style={styles.statusMetaItem}>
              <AppText style={styles.metaLabel}>Booking ID</AppText>
              <AppText style={styles.metaValue}>{bookingId}</AppText>
            </View>
            <View style={styles.statusMetaItem}>
              <AppText style={styles.metaLabel}>Invoice Date</AppText>
              <AppText style={styles.metaValue}>17 Sep 2026, 11:25 AM</AppText>
            </View>
            <View style={styles.statusMetaItem}>
              <AppText style={styles.metaLabel}>Payment Date</AppText>
              <AppText style={styles.metaValue}>17 Sep 2026, 11:21 AM</AppText>
            </View>
          </View>
        </View>

        {/* CUSTOMER DETAILS & WASHERMAN DETAILS 2-COLUMN CARDS */}
        <View style={styles.dualDetailsRow}>
          {/* Customer Details */}
          <View style={styles.detailsCard}>
            <View style={styles.detailsCardHeader}>
              <View style={styles.detailsHeaderLeft}>
                <View style={styles.personIconCircle}>
                  <User size={13} color="#059669" />
                </View>
                <AppText style={styles.detailsCardTitle}>Customer Details</AppText>
              </View>
              <TouchableOpacity style={styles.editMiniBtn}>
                <AppText style={styles.editMiniText}>Edit</AppText>
              </TouchableOpacity>
            </View>

            <AppText style={styles.personName}>Aakash Mishra</AppText>
            <View style={styles.personInfoRow}>
              <Phone size={11} color="#64748B" />
              <AppText style={styles.personInfoText}>+91 81206 52523</AppText>
            </View>
            <View style={styles.personInfoRow}>
              <Mail size={11} color="#64748B" />
              <AppText style={styles.personInfoText}>mishraakash576@gmail.com</AppText>
            </View>
            <View style={styles.personInfoRow}>
              <MapPin size={11} color="#64748B" />
              <AppText style={styles.personInfoText}>Indore, Madhya Pradesh</AppText>
            </View>
          </View>

          {/* Washerman Details */}
          <View style={styles.detailsCard}>
            <View style={styles.detailsCardHeader}>
              <View style={styles.detailsHeaderLeft}>
                <View style={styles.personIconCircle}>
                  <User size={13} color="#059669" />
                </View>
                <AppText style={styles.detailsCardTitle}>Washerman Details</AppText>
              </View>
            </View>

            <AppText style={styles.personName}>Ramesh Yadav</AppText>
            <View style={styles.personInfoRow}>
              <Phone size={11} color="#64748B" />
              <AppText style={styles.personInfoText}>+91 98765 43210</AppText>
            </View>
            <View style={styles.personInfoRow}>
              <Star size={11} color="#F59E0B" fill="#F59E0B" />
              <AppText style={styles.personInfoText}>4.8 (320+ services)</AppText>
            </View>
            <View style={styles.personInfoRow}>
              <MapPin size={11} color="#64748B" />
              <AppText style={styles.personInfoText}>Indore, Madhya Pradesh</AppText>
            </View>
          </View>
        </View>

        {/* VEHICLE DETAILS CARD */}
        <View style={styles.vehicleHeaderCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=200&q=80' }}
            style={styles.carHeaderThumb}
            resizeMode="contain"
          />
          <View style={styles.vehicleHeaderMiddle}>
            <AppText style={styles.carName}>Toyota Fortuner</AppText>
            <AppText style={styles.carPlate}>MP 09 AB 1234</AppText>
            <AppText style={styles.carTypeTag}>White  •  SUV</AppText>
          </View>
          <View style={styles.serviceBadgeGreen}>
            <Car size={13} color="#059669" style={{ marginRight: 4 }} />
            <AppText style={styles.serviceBadgeText}>Premium Car Wash</AppText>
          </View>
        </View>

        {/* SERVICE DETAILS & SCHEDULE GRID */}
        <View style={styles.sectionCard}>
          <View style={styles.serviceGrid}>
            {/* Left: Included services */}
            <View style={styles.serviceListCol}>
              <View style={styles.serviceHeaderTitleRow}>
                <View style={styles.gearIconCircle}>
                  <AppText style={{ fontSize: 12 }}>⚙️</AppText>
                </View>
                <AppText style={styles.serviceCardTitle}>Service Details</AppText>
              </View>

              <View style={styles.serviceLineItem}>
                <Check size={12} color="#059669" strokeWidth={3} style={{ marginRight: 6 }} />
                <AppText style={styles.serviceLineName}>Premium Car Wash (Exterior + Interior)</AppText>
                <AppText style={styles.serviceLinePrice}>₹399</AppText>
              </View>
              <View style={styles.serviceLineItem}>
                <Check size={12} color="#059669" strokeWidth={3} style={{ marginRight: 6 }} />
                <AppText style={styles.serviceLineName}>Tire Cleaning (Add-on)</AppText>
                <AppText style={styles.serviceLinePrice}>₹99</AppText>
              </View>
              <View style={styles.serviceLineItem}>
                <Check size={12} color="#059669" strokeWidth={3} style={{ marginRight: 6 }} />
                <AppText style={styles.serviceLineName}>Interior Vacuum (Add-on)</AppText>
                <AppText style={styles.serviceLinePrice}>₹99</AppText>
              </View>
            </View>

            {/* Right: Date, Time, Location */}
            <View style={styles.serviceScheduleCol}>
              <View style={styles.scheduleRow}>
                <Calendar size={13} color="#059669" />
                <View style={{ marginLeft: 6 }}>
                  <AppText style={styles.schedLabel}>Service Date</AppText>
                  <AppText style={styles.schedVal}>17 Sep 2026</AppText>
                </View>
              </View>

              <View style={styles.scheduleRow}>
                <Clock size={13} color="#059669" />
                <View style={{ marginLeft: 6 }}>
                  <AppText style={styles.schedLabel}>Service Time</AppText>
                  <AppText style={styles.schedVal}>10:00 AM – 11:20 AM</AppText>
                </View>
              </View>

              <View style={styles.scheduleRow}>
                <MapPin size={13} color="#059669" />
                <View style={{ marginLeft: 6 }}>
                  <AppText style={styles.schedLabel}>Service Location</AppText>
                  <AppText style={styles.schedValBold}>Home Service</AppText>
                  <AppText style={styles.schedValSub}>Vijay Nagar, Indore, MP</AppText>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* PRICE BREAKDOWN & PAYMENT DETAILS SPLIT */}
        <View style={styles.paymentBreakdownSplitCard}>
          {/* Left: Price Breakdown */}
          <View style={styles.breakdownCol}>
            <View style={styles.colHeaderRow}>
              <Receipt size={14} color="#059669" />
              <AppText style={styles.colHeaderTitle}>Price Breakdown</AppText>
            </View>

            <View style={styles.priceRow}>
              <AppText style={styles.priceLabel}>Subtotal</AppText>
              <AppText style={styles.priceVal}>₹597</AppText>
            </View>
            <View style={styles.priceRow}>
              <AppText style={styles.priceLabel}>Platform Fee</AppText>
              <AppText style={styles.priceVal}>₹20</AppText>
            </View>
            <View style={styles.priceRow}>
              <AppText style={styles.priceLabel}>GST (18%)</AppText>
              <AppText style={styles.priceVal}>₹111.06</AppText>
            </View>
            <View style={styles.divider} />
            <View style={styles.totalRow}>
              <AppText style={styles.totalLabel}>Total Amount</AppText>
              <AppText style={styles.totalValGreen}>₹728</AppText>
            </View>
          </View>

          {/* Right: Payment Details */}
          <View style={styles.paymentDetailsCol}>
            <View style={styles.colHeaderRow}>
              <CreditCard size={14} color="#059669" />
              <AppText style={styles.colHeaderTitle}>Payment Details</AppText>
            </View>

            <View style={styles.paymentInfoRow}>
              <AppText style={styles.priceLabel}>Payment Method</AppText>
              <View style={styles.upiBadge}>
                <AppText style={styles.upiText}>UPI<AppText style={{ color: '#059669' }}>▶</AppText></AppText>
              </View>
            </View>
            <View style={styles.paymentInfoRow}>
              <AppText style={styles.priceLabel}>Transaction ID</AppText>
              <AppText style={styles.paymentInfoValBold}>TXN7826394710</AppText>
            </View>
            <View style={styles.paymentInfoRow}>
              <AppText style={styles.priceLabel}>Payment Status</AppText>
              <View style={styles.paidPill}>
                <AppText style={styles.paidText}>Paid</AppText>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.totalRow}>
              <AppText style={styles.totalLabel}>Paid Amount</AppText>
              <AppText style={styles.totalValDark}>₹728</AppText>
            </View>
          </View>
        </View>

        {/* ECO MESSAGE BANNER */}
        <View style={styles.ecoBanner}>
          <Leaf size={16} color="#059669" />
          <View style={{ marginLeft: 8, flex: 1 }}>
            <AppText style={styles.ecoBannerTitle}>
              Thank you for keeping your vehicle clean!
            </AppText>
            <AppText style={styles.ecoBannerSub}>
              Clean Rides. Greener Tomorrows. 🌱
            </AppText>
          </View>
        </View>

        {/* 4-ACTION BOTTOM BUTTONS */}
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleDownloadPDF} activeOpacity={0.8}>
            <Download size={16} color="#059669" />
            <AppText style={styles.actionBtnText}>Download PDF</AppText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={handleShare} activeOpacity={0.8}>
            <Share2 size={16} color="#059669" />
            <AppText style={styles.actionBtnText}>Share Invoice</AppText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={handleEmailInvoice} activeOpacity={0.8}>
            <EmailIcon size={16} color="#059669" />
            <AppText style={styles.actionBtnText}>Email Invoice</AppText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={handlePrint} activeOpacity={0.8}>
            <Printer size={16} color="#059669" />
            <AppText style={styles.actionBtnText}>Print</AppText>
          </TouchableOpacity>
        </View>

        {/* NEED HELP FOOTER */}
        <TouchableOpacity
          style={styles.needHelpRow}
          onPress={() => navigation.navigate(Routes.HELP_SUPPORT)}
          activeOpacity={0.7}
        >
          <AppText style={styles.needHelpText}>Need Help?</AppText>
          <Headphones size={13} color="#059669" style={{ marginHorizontal: 4 }} />
          <AppText style={styles.contactSupportText}>Contact Support</AppText>
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
  /* TOP STATUS CARD */
  topStatusCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 12,
  },
  statusHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusCheckCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  statusTextWrap: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  statusSub: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#047857',
  },
  invoiceNoBox: {
    alignItems: 'flex-end',
    borderLeftWidth: 1,
    borderLeftColor: '#A7F3D0',
    paddingLeft: 8,
  },
  invoiceNoLabel: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  invoiceNoValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  invoiceNoValue: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  statusMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#D1FAE5',
  },
  statusMetaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  metaValue: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginTop: 1,
  },
  /* DUAL DETAILS ROW */
  dualDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailsCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginHorizontal: 3,
  },
  detailsCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  personIconCircle: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  detailsCardTitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  editMiniBtn: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  editMiniText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  personName: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 4,
  },
  personInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  personInfoText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginLeft: 5,
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
    width: 75,
    height: 46,
  },
  vehicleHeaderMiddle: {
    flex: 1,
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
  },
  carTypeTag: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#94A3B8',
  },
  serviceBadgeGreen: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  serviceBadgeText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  /* SERVICE DETAILS SECTION */
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 12,
  },
  serviceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceListCol: {
    flex: 1.1,
    paddingRight: 8,
    borderRightWidth: 1,
    borderRightColor: '#F1F5F9',
  },
  serviceHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  gearIconCircle: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  serviceCardTitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  serviceLineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  serviceLineName: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#334155',
    flex: 1,
  },
  serviceLinePrice: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  serviceScheduleCol: {
    flex: 0.9,
    paddingLeft: 10,
    justifyContent: 'space-around',
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  schedLabel: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  schedVal: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
    marginTop: 1,
  },
  schedValBold: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  schedValSub: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  /* PAYMENT BREAKDOWN SPLIT */
  paymentBreakdownSplitCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 12,
  },
  breakdownCol: {
    flex: 1,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#F1F5F9',
  },
  paymentDetailsCol: {
    flex: 1,
    paddingLeft: 10,
  },
  colHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colHeaderTitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginLeft: 6,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
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
  paymentInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  paymentInfoValBold: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  upiBadge: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  upiText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  paidPill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  paidText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 6,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  totalValGreen: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  totalValDark: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  /* ECO BANNER */
  ecoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 12,
  },
  ecoBannerTitle: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  ecoBannerSub: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#047857',
  },
  /* ACTIONS GRID */
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: '#ECFDF5',
    borderRadius: 10,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  actionBtnText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#059669',
    marginTop: 3,
  },
  needHelpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  needHelpText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  contactSupportText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
});
