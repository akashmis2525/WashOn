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
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  MessageSquare,
  ChevronRight,
  Headphones,
  FileText,
  User,
  ExternalLink,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { BottomTabBar } from '../../components/navigation/BottomTabBar';

const { width } = Dimensions.get('window');

type ComplaintDetailsNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.COMPLAINT_DETAILS
>;

type ComplaintDetailsRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.COMPLAINT_DETAILS
>;

export const ComplaintDetailsScreen: React.FC = () => {
  const navigation = useNavigation<ComplaintDetailsNavProp>();
  const route = useRoute<ComplaintDetailsRouteProp>();

  const complaintId = route.params?.complaintId || '#CMP20260917001';
  const [acknowledged, setAcknowledged] = useState<boolean>(false);
  const [status, setStatus] = useState<'resolved' | 'reopened'>('resolved');

  const handleAcknowledge = () => {
    setAcknowledged(true);
    Alert.alert(
      'Resolution Acknowledged',
      'Thank you for confirming the resolution. Your feedback helps us improve our service standards.'
    );
  };

  const handleReopen = () => {
    Alert.alert(
      'Reopen Complaint',
      'Are you sure you want to reopen this ticket? An escalation manager will review your case within 2 hours.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reopen Ticket',
          style: 'destructive',
          onPress: () => {
            setStatus('reopened');
            Alert.alert('Ticket Reopened', 'Complaint ticket has been escalated to senior support team.');
          },
        },
      ]
    );
  };

  const handleChat = () => {
    navigation.navigate(Routes.SUPPORT_CHAT as never);
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
          <AppText style={styles.headerTitle}>Complaint Resolution</AppText>
          <AppText style={styles.headerSubtitle}>Ticket {complaintId}</AppText>
        </View>

        <View style={styles.statusBadge}>
          <CheckCircle2 size={12} color={status === 'resolved' ? '#059669' : '#D97706'} />
          <AppText
            style={[
              styles.statusText,
              { color: status === 'resolved' ? '#059669' : '#D97706' },
            ]}
          >
            {status === 'resolved' ? 'Resolved' : 'Escalated'}
          </AppText>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* RESOLUTION SUMMARY CARD */}
        <View style={styles.resolutionCard}>
          <View style={styles.resolutionHeader}>
            <View style={styles.resolutionIconBox}>
              <CheckCircle2 size={24} color="#059669" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <AppText style={styles.resolutionTitle}>
                {status === 'resolved' ? 'Resolution Decision Approved' : 'Ticket Under Review'}
              </AppText>
              <AppText style={styles.resolutionDate}>Updated on Sep 18, 2026 • 2:15 PM</AppText>
            </View>
          </View>

          <View style={styles.decisionContent}>
            <AppText style={styles.decisionParagraph}>
              Our quality assurance team reviewed the before/after photos and GPS logs for booking{' '}
              <AppText style={styles.highlightText}>#WO256839</AppText>. We have processed a 100% refund of{' '}
              <AppText style={styles.highlightText}>₹149</AppText> to your WashOn Wallet and credited a complementary free wash voucher.
            </AppText>
          </View>

          <View style={styles.payoutSummaryBox}>
            <View style={styles.payoutRow}>
              <AppText style={styles.payoutLabel}>Refund Amount</AppText>
              <AppText style={styles.payoutValue}>₹149.00</AppText>
            </View>
            <View style={styles.payoutRow}>
              <AppText style={styles.payoutLabel}>Credited To</AppText>
              <AppText style={styles.payoutValue}>WashOn Wallet (Instant)</AppText>
            </View>
            <View style={styles.payoutRow}>
              <AppText style={styles.payoutLabel}>Voucher Added</AppText>
              <AppText style={[styles.payoutValue, { color: '#059669' }]}>FREEWASH100</AppText>
            </View>
          </View>
        </View>

        {/* ISSUE DETAILS CARD */}
        <View style={styles.sectionCard}>
          <AppText style={styles.sectionHeader}>Issue Details</AppText>

          <View style={styles.detailRow}>
            <AppText style={styles.detailLabel}>Issue Category</AppText>
            <AppText style={styles.detailVal}>Poor Cleaning / Incomplete Wash</AppText>
          </View>

          <View style={styles.detailRow}>
            <AppText style={styles.detailLabel}>Booking Reference</AppText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(Routes.BOOKING_VIEW_DETAILS, {
                  bookingId: '#WO256839',
                })
              }
            >
              <AppText style={[styles.detailVal, { color: '#2563EB', textDecorationLine: 'underline' }]}>
                #WO256839
              </AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.detailRow}>
            <AppText style={styles.detailLabel}>Washerman</AppText>
            <AppText style={styles.detailVal}>Rahul Sharma (Wash Specialist)</AppText>
          </View>

          <View style={styles.detailRow}>
            <AppText style={styles.detailLabel}>Assigned Agent</AppText>
            <AppText style={styles.detailVal}>Priya Nair (Senior Support)</AppText>
          </View>

          <View style={styles.descriptionBox}>
            <AppText style={styles.descriptionLabel}>Customer Description:</AppText>
            <AppText style={styles.descriptionText}>
              "Mud and water marks were still visible under the mudguard and rear wheel rim after the wash was marked complete."
            </AppText>
          </View>
        </View>

        {/* EVIDENCE PHOTOS */}
        <View style={styles.sectionCard}>
          <AppText style={styles.sectionHeader}>Evidence Submitted</AppText>
          <View style={styles.evidenceGrid}>
            <View style={styles.evidenceItem}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&auto=format&fit=crop&q=80',
                }}
                style={styles.evidenceImg}
                resizeMode="cover"
              />
              <AppText style={styles.evidenceTag}>Photo 1: Mudguard</AppText>
            </View>
            <View style={styles.evidenceItem}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&auto=format&fit=crop&q=80',
                }}
                style={styles.evidenceImg}
                resizeMode="cover"
              />
              <AppText style={styles.evidenceTag}>Photo 2: Rear Rim</AppText>
            </View>
          </View>
        </View>

        {/* TIMELINE */}
        <View style={styles.sectionCard}>
          <AppText style={styles.sectionHeader}>Resolution Timeline</AppText>
          <View style={styles.timelineList}>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, styles.dotDone]} />
              <View style={styles.timelineContent}>
                <AppText style={styles.timelineTitle}>Complaint Registered</AppText>
                <AppText style={styles.timelineTime}>Sep 18, 2026 • 11:30 AM</AppText>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, styles.dotDone]} />
              <View style={styles.timelineContent}>
                <AppText style={styles.timelineTitle}>Assigned to Priya Nair</AppText>
                <AppText style={styles.timelineTime}>Sep 18, 2026 • 11:45 AM</AppText>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, styles.dotDone]} />
              <View style={styles.timelineContent}>
                <AppText style={styles.timelineTitle}>Investigation Completed</AppText>
                <AppText style={styles.timelineTime}>Sep 18, 2026 • 1:50 PM</AppText>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, styles.dotActive]} />
              <View style={styles.timelineContent}>
                <AppText style={styles.timelineTitle}>Refund Processed & Case Closed</AppText>
                <AppText style={styles.timelineTime}>Sep 18, 2026 • 2:15 PM</AppText>
              </View>
            </View>
          </View>
        </View>

        {/* ACTIONS */}
        <View style={styles.actionsContainer}>
          {!acknowledged ? (
            <TouchableOpacity
              style={styles.primaryActionButton}
              onPress={handleAcknowledge}
              activeOpacity={0.85}
            >
              <CheckCircle2 size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <AppText style={styles.primaryActionText}>Acknowledge & Accept Resolution</AppText>
            </TouchableOpacity>
          ) : (
            <View style={styles.acknowledgedBox}>
              <CheckCircle2 size={16} color="#059669" />
              <AppText style={styles.acknowledgedText}>Resolution Acknowledged by Customer</AppText>
            </View>
          )}

          <TouchableOpacity
            style={styles.secondaryActionButton}
            onPress={handleChat}
            activeOpacity={0.7}
          >
            <MessageSquare size={18} color="#0F172A" style={{ marginRight: 8 }} />
            <AppText style={styles.secondaryActionText}>Chat with Support Agent</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.reopenButton}
            onPress={handleReopen}
            activeOpacity={0.7}
          >
            <RotateCcw size={16} color="#EF4444" style={{ marginRight: 6 }} />
            <AppText style={styles.reopenButtonText}>Not Satisfied? Reopen Complaint</AppText>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
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
    fontSize: 17,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  resolutionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 14,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  resolutionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resolutionIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resolutionTitle: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  resolutionDate: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  decisionContent: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  decisionParagraph: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#334155',
    lineHeight: 18,
  },
  highlightText: {
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  payoutSummaryBox: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
    gap: 6,
  },
  payoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  payoutLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  payoutValue: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  sectionHeader: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  detailVal: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#0F172A',
  },
  descriptionBox: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  descriptionLabel: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#475569',
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#334155',
    lineHeight: 16,
  },
  evidenceGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  evidenceItem: {
    flex: 1,
  },
  evidenceImg: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
  },
  evidenceTag: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
  },
  timelineList: {
    paddingLeft: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 10,
  },
  dotDone: {
    backgroundColor: '#059669',
  },
  dotActive: {
    backgroundColor: '#2563EB',
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  timelineTime: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  actionsContainer: {
    gap: 10,
    marginTop: 4,
  },
  primaryActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 13,
    borderRadius: 12,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  primaryActionText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  acknowledgedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    gap: 6,
  },
  acknowledgedText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  secondaryActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 12,
  },
  secondaryActionText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  reopenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  reopenButtonText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#EF4444',
  },
});
