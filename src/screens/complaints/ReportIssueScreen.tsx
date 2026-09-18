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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Calendar,
  Sparkles,
  Clock,
  ShieldAlert,
  IndianRupee,
  UserX,
  ShoppingBag,
  MoreHorizontal,
  Camera,
  X,
  Plus,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  ImageIcon,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type ReportIssueNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.REPORT_ISSUE
>;

type ReportIssueRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.REPORT_ISSUE
>;

type IssueType =
  | 'poor_cleaning'
  | 'washerman_late'
  | 'vehicle_damage'
  | 'extra_amount'
  | 'behaviour'
  | 'missing_item'
  | 'other';

export const ReportIssueScreen: React.FC = () => {
  const navigation = useNavigation<ReportIssueNavProp>();
  const route = useRoute<ReportIssueRouteProp>();
  const { activeBooking } = useBookingStore();

  const bookingId = route.params?.bookingId || activeBooking?.id || '#WO256839';

  const [selectedIssue, setSelectedIssue] = useState<IssueType>('poor_cleaning');
  const [description, setDescription] = useState<string>('');
  const [evidencePhotos, setEvidencePhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=200&q=80',
    'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=200&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&q=80',
  ]);

  const removePhoto = (index: number) => {
    setEvidencePhotos(evidencePhotos.filter((_, i) => i !== index));
  };

  const handleAddPhoto = () => {
    if (evidencePhotos.length >= 5) {
      Alert.alert('Limit Reached', 'You can upload up to 5 photos or videos.');
      return;
    }
    setEvidencePhotos([
      ...evidencePhotos,
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=200&q=80',
    ]);
  };

  const handleSubmitComplaint = () => {
    if (!description.trim()) {
      Alert.alert('Description Required', 'Please provide details about the issue.');
      return;
    }

    const complaintId = '#CMP20260917001';
    navigation.navigate(Routes.COMPLAINT_TRACKING, { complaintId });
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
          <AppText style={styles.headerTitle}>Report an Issue</AppText>
          <AppText style={styles.headerSubtitle}>
            Help us resolve the issue and serve you better
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
        {/* VEHICLE & BOOKING CARD */}
        <View style={styles.vehicleHeaderCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=200&q=80' }}
            style={styles.carHeaderThumb}
            resizeMode="contain"
          />
          <View style={styles.vehicleHeaderMiddle}>
            <AppText style={styles.carName}>Toyota Fortuner</AppText>
            <AppText style={styles.carPlate}>MP 09 AB 1234 • White • SUV</AppText>
            <AppText style={styles.serviceNameBold}>Premium Car Wash</AppText>
            <AppText style={styles.serviceSubText}>Exterior + Interior + Premium Finish</AppText>
          </View>

          <View style={styles.dateCol}>
            <Calendar size={14} color="#059669" />
            <AppText style={styles.dateTextBold}>17 Sep 2026</AppText>
            <AppText style={styles.dateTextSub}>10:00 AM</AppText>
            <AppText style={styles.bookingIdSub}>Booking ID</AppText>
            <AppText style={styles.bookingIdVal}>{bookingId}</AppText>
          </View>
        </View>

        {/* WHAT'S THE ISSUE */}
        <View style={styles.sectionHeaderWrap}>
          <AppText style={styles.sectionTitle}>
            What's the issue? <AppText style={styles.starReq}>*</AppText>
          </AppText>
          <AppText style={styles.sectionSub}>Please select the main issue you are facing</AppText>
        </View>

        {/* ISSUE OPTIONS 2-COLUMN GRID */}
        <View style={styles.issuesGrid}>
          {/* Poor cleaning */}
          <TouchableOpacity
            style={[
              styles.issueCard,
              selectedIssue === 'poor_cleaning' && styles.issueCardSelected,
            ]}
            onPress={() => setSelectedIssue('poor_cleaning')}
            activeOpacity={0.8}
          >
            <View style={styles.issueIconCircle}>
              <Sparkles size={16} color="#059669" />
            </View>
            <AppText style={[styles.issueName, selectedIssue === 'poor_cleaning' && styles.issueNameSelected]}>
              Poor cleaning
            </AppText>
          </TouchableOpacity>

          {/* Washerman late */}
          <TouchableOpacity
            style={[
              styles.issueCard,
              selectedIssue === 'washerman_late' && styles.issueCardSelected,
            ]}
            onPress={() => setSelectedIssue('washerman_late')}
            activeOpacity={0.8}
          >
            <View style={styles.issueIconCircle}>
              <Clock size={16} color="#059669" />
            </View>
            <AppText style={[styles.issueName, selectedIssue === 'washerman_late' && styles.issueNameSelected]}>
              Washerman late
            </AppText>
          </TouchableOpacity>

          {/* Vehicle damage */}
          <TouchableOpacity
            style={[
              styles.issueCard,
              selectedIssue === 'vehicle_damage' && styles.issueCardSelected,
            ]}
            onPress={() => setSelectedIssue('vehicle_damage')}
            activeOpacity={0.8}
          >
            <View style={styles.issueIconCircle}>
              <ShieldAlert size={16} color="#059669" />
            </View>
            <AppText style={[styles.issueName, selectedIssue === 'vehicle_damage' && styles.issueNameSelected]}>
              Vehicle damage
            </AppText>
          </TouchableOpacity>

          {/* Extra amount demanded */}
          <TouchableOpacity
            style={[
              styles.issueCard,
              selectedIssue === 'extra_amount' && styles.issueCardSelected,
            ]}
            onPress={() => setSelectedIssue('extra_amount')}
            activeOpacity={0.8}
          >
            <View style={styles.issueIconCircle}>
              <IndianRupee size={16} color="#059669" />
            </View>
            <AppText style={[styles.issueName, selectedIssue === 'extra_amount' && styles.issueNameSelected]}>
              Extra amount demanded
            </AppText>
          </TouchableOpacity>

          {/* Behaviour issue */}
          <TouchableOpacity
            style={[
              styles.issueCard,
              selectedIssue === 'behaviour' && styles.issueCardSelected,
            ]}
            onPress={() => setSelectedIssue('behaviour')}
            activeOpacity={0.8}
          >
            <View style={styles.issueIconCircle}>
              <UserX size={16} color="#059669" />
            </View>
            <AppText style={[styles.issueName, selectedIssue === 'behaviour' && styles.issueNameSelected]}>
              Behaviour issue
            </AppText>
          </TouchableOpacity>

          {/* Missing item */}
          <TouchableOpacity
            style={[
              styles.issueCard,
              selectedIssue === 'missing_item' && styles.issueCardSelected,
            ]}
            onPress={() => setSelectedIssue('missing_item')}
            activeOpacity={0.8}
          >
            <View style={styles.issueIconCircle}>
              <ShoppingBag size={16} color="#059669" />
            </View>
            <AppText style={[styles.issueName, selectedIssue === 'missing_item' && styles.issueNameSelected]}>
              Missing item
            </AppText>
          </TouchableOpacity>

          {/* Other */}
          <TouchableOpacity
            style={[
              styles.issueCard,
              selectedIssue === 'other' && styles.issueCardSelected,
            ]}
            onPress={() => setSelectedIssue('other')}
            activeOpacity={0.8}
          >
            <View style={styles.issueIconCircle}>
              <MoreHorizontal size={16} color="#059669" />
            </View>
            <AppText style={[styles.issueName, selectedIssue === 'other' && styles.issueNameSelected]}>
              Other
            </AppText>
          </TouchableOpacity>
        </View>

        {/* UPLOAD EVIDENCE (OPTIONAL) */}
        <View style={styles.sectionCard}>
          <View style={styles.evidenceHeaderRow}>
            <View style={styles.evidenceIconCircle}>
              <Camera size={14} color="#059669" />
            </View>
            <View>
              <AppText style={styles.cardHeaderTitle}>
                Upload Evidence <AppText style={styles.optText}>(Optional)</AppText>
              </AppText>
              <AppText style={styles.cardHeaderSub}>
                Add photos or videos to help us understand the issue better
              </AppText>
            </View>
          </View>

          {/* Upload Tap Box */}
          <TouchableOpacity
            style={styles.uploadTapBox}
            onPress={handleAddPhoto}
            activeOpacity={0.7}
          >
            <ImageIcon size={18} color="#2563EB" />
            <AppText style={styles.uploadTapTitle}>Tap to upload photos or videos</AppText>
            <AppText style={styles.uploadTapSub}>You can upload up to 5 files (Photos or Videos)</AppText>
          </TouchableOpacity>

          {/* Photos Grid */}
          <View style={styles.evidenceGrid}>
            {evidencePhotos.map((uri, index) => (
              <View key={index} style={styles.evidenceThumbWrap}>
                <Image source={{ uri }} style={styles.evidenceThumb} />
                <TouchableOpacity
                  style={styles.deleteBadge}
                  onPress={() => removePhoto(index)}
                  activeOpacity={0.8}
                >
                  <X size={10} color="#FFFFFF" strokeWidth={3} />
                </TouchableOpacity>
              </View>
            ))}

            {evidencePhotos.length < 5 && (
              <TouchableOpacity
                style={styles.addMoreBtn}
                onPress={handleAddPhoto}
                activeOpacity={0.8}
              >
                <Plus size={18} color="#2563EB" />
                <AppText style={styles.addMoreText}>Add More{'\n'}(Max 5)</AppText>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* DESCRIBE THE ISSUE */}
        <View style={styles.sectionCard}>
          <View style={styles.descHeaderRow}>
            <View style={styles.descIconCircle}>
              <MessageSquare size={14} color="#059669" />
            </View>
            <AppText style={styles.cardHeaderTitle}>
              Describe the issue <AppText style={styles.starReq}>*</AppText>
            </AppText>
          </View>

          <TextInput
            style={styles.descInput}
            placeholder="Please provide more details about the issue (e.g. what happened, when it happened, etc.)"
            placeholderTextColor="#94A3B8"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            maxLength={500}
            textAlignVertical="top"
          />
          <AppText style={styles.charCount}>{description.length}/500</AppText>
        </View>

        {/* SUBMIT COMPLAINT CTA */}
        <TouchableOpacity
          style={styles.submitCTA}
          onPress={handleSubmitComplaint}
          activeOpacity={0.88}
        >
          <AppText style={styles.submitCTAText}>Submit Complaint</AppText>
          <ArrowRight size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        {/* ASSURANCE NOTE */}
        <View style={styles.assuranceCard}>
          <ShieldCheck size={18} color="#059669" style={{ marginRight: 8 }} />
          <View style={{ flex: 1 }}>
            <AppText style={styles.assuranceTitle}>We take all complaints seriously.</AppText>
            <AppText style={styles.assuranceSub}>
              Our team will review your complaint and get back to you within 24 hours.
            </AppText>
          </View>
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
  /* VEHICLE CARD */
  vehicleHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 14,
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
  serviceNameBold: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#059669',
    marginTop: 1,
  },
  serviceSubText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  dateCol: {
    alignItems: 'flex-end',
    borderLeftWidth: 1,
    borderLeftColor: '#F1F5F9',
    paddingLeft: 8,
  },
  dateTextBold: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginTop: 2,
  },
  dateTextSub: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  bookingIdSub: {
    fontSize: 7,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
    marginTop: 2,
  },
  bookingIdVal: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  /* SECTION HEADER */
  sectionHeaderWrap: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  starReq: {
    color: '#EF4444',
  },
  sectionSub: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginTop: 1,
  },
  /* ISSUES GRID */
  issuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  issueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: (width - 40) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  issueCardSelected: {
    backgroundColor: '#ECFDF5',
    borderColor: '#059669',
  },
  issueIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  issueName: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#0F172A',
    flex: 1,
  },
  issueNameSelected: {
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
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
  evidenceHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  evidenceIconCircle: {
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
  cardHeaderSub: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  optText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  uploadTapBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderStyle: 'dashed',
    marginBottom: 10,
  },
  uploadTapTitle: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#1E40AF',
    marginTop: 2,
  },
  uploadTapSub: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  evidenceGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  evidenceThumbWrap: {
    position: 'relative',
  },
  evidenceThumb: {
    width: 64,
    height: 64,
    borderRadius: 10,
  },
  deleteBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  addMoreBtn: {
    width: 64,
    height: 64,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#BFDBFE',
    borderStyle: 'dashed',
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  addMoreText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#1E40AF',
    textAlign: 'center',
    marginTop: 2,
  },
  /* DESCRIBE */
  descHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  descIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  descInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minHeight: 75,
  },
  charCount: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
    textAlign: 'right',
    marginTop: 4,
  },
  /* CTA */
  submitCTA: {
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
  submitCTAText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  assuranceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  assuranceTitle: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  assuranceSub: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#047857',
  },
});
