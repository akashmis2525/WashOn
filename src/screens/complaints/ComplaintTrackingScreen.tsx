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
  Copy,
  Clock,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  Check,
  Paperclip,
  Send,
  ShieldCheck,
  FileText,
  Headphones,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type ComplaintTrackingNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.COMPLAINT_TRACKING
>;

type ComplaintTrackingRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.COMPLAINT_TRACKING
>;

export const ComplaintTrackingScreen: React.FC = () => {
  const navigation = useNavigation<ComplaintTrackingNavProp>();
  const route = useRoute<ComplaintTrackingRouteProp>();
  const { activeBooking } = useBookingStore();

  const complaintId = route.params?.complaintId || '#CMP20260917001';
  const bookingId = activeBooking?.id || '#WO256839';

  const [message, setMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<
    Array<{ id: string; sender: 'agent' | 'customer'; text: string; time: string }>
  >([
    {
      id: '1',
      sender: 'agent',
      text: "Hi! I'm Priya. I'm looking into your complaint. I'll keep you updated here.",
      time: '4:22 PM',
    },
    {
      id: '2',
      sender: 'customer',
      text: 'Thank you. Please resolve it soon.',
      time: '4:24 PM',
    },
  ]);

  const handleCopyComplaintId = () => {
    Alert.alert('Copied', `Complaint ID ${complaintId} copied!`);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      sender: 'customer' as const,
      text: message.trim(),
      time: '4:26 PM',
    };

    setChatMessages([...chatMessages, newMsg]);
    setMessage('');
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
          <AppText style={styles.headerTitle}>Complaint Tracking</AppText>
          <AppText style={styles.headerSubtitle}>
            We're working on your issue
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
            <AppText style={styles.serviceSubText}>17 Sep 2026, 10:00 AM</AppText>
          </View>

          <View style={styles.bookingRightCol}>
            <AppText style={styles.bookingLabel}>Booking ID</AppText>
            <AppText style={styles.bookingVal}>{bookingId}</AppText>
            <TouchableOpacity
              style={styles.viewBookingBtn}
              onPress={() => navigation.navigate(Routes.BOOKING_VIEW_DETAILS, { bookingId })}
              activeOpacity={0.7}
            >
              <AppText style={styles.viewBookingText}>View Booking</AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* COMPLAINT DETAILS */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.headerLeft}>
              <View style={styles.iconCircleGreen}>
                <FileText size={14} color="#059669" />
              </View>
              <AppText style={styles.cardHeaderTitle}>Complaint Details</AppText>
            </View>

            <View style={styles.inProgressBadge}>
              <Clock size={12} color="#D97706" style={{ marginRight: 4 }} />
              <AppText style={styles.inProgressText}>In Progress</AppText>
            </View>
          </View>

          <View style={styles.complaintInfoGrid}>
            <View style={styles.complaintRow}>
              <AppText style={styles.complaintLabel}>Complaint ID</AppText>
              <TouchableOpacity
                style={styles.copyIdRow}
                onPress={handleCopyComplaintId}
                activeOpacity={0.7}
              >
                <AppText style={styles.complaintIdBold}>{complaintId}</AppText>
                <Copy size={11} color="#64748B" style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>

            <View style={styles.complaintRow}>
              <AppText style={styles.complaintLabel}>Complaint Date</AppText>
              <AppText style={styles.complaintVal}>17 Sep 2026, 02:45 PM</AppText>
            </View>

            <View style={styles.complaintRow}>
              <AppText style={styles.complaintLabel}>Issue Category</AppText>
              <AppText style={styles.complaintValBold}>Poor cleaning</AppText>
            </View>

            <View style={styles.complaintRow}>
              <AppText style={styles.complaintLabel}>Description</AppText>
              <AppText style={styles.complaintDesc}>
                Interior seats are still dirty and dashboard not cleaned properly.
              </AppText>
            </View>
          </View>
        </View>

        {/* ASSIGNED SUPPORT AGENT */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.headerLeft}>
              <View style={styles.iconCircleGreen}>
                <Headphones size={14} color="#059669" />
              </View>
              <AppText style={styles.cardHeaderTitle}>Assigned Support Agent</AppText>
            </View>

            <View style={styles.onlinePill}>
              <View style={styles.onlineDot} />
              <AppText style={styles.onlineText}>Online</AppText>
            </View>
          </View>

          <View style={styles.agentCardInner}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&q=80' }}
              style={styles.agentAvatar}
            />
            <View style={styles.agentInfo}>
              <AppText style={styles.agentName}>Priya Sharma</AppText>
              <AppText style={styles.agentRole}>Customer Support Executive</AppText>
              <View style={styles.agentContactRow}>
                <Phone size={10} color="#64748B" />
                <AppText style={styles.agentContactText}>+91 98765 43210</AppText>
              </View>
              <View style={styles.agentContactRow}>
                <Mail size={10} color="#64748B" />
                <AppText style={styles.agentContactText}>support@washon.in</AppText>
              </View>
            </View>

            <TouchableOpacity style={styles.chatAgentBtn} activeOpacity={0.8}>
              <MessageSquare size={13} color="#059669" style={{ marginRight: 4 }} />
              <AppText style={styles.chatAgentText}>Chat with Agent</AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* COMPLAINT TIMELINE */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.headerLeft}>
              <View style={styles.iconCircleGreen}>
                <Clock size={14} color="#059669" />
              </View>
              <AppText style={styles.cardHeaderTitle}>Complaint Timeline</AppText>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <AppText style={styles.viewAllText}>View All Updates ›</AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.timelineContainer}>
            {/* Step 1: Complaint Raised */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeftLine}>
                <View style={styles.timelineCircleDone}>
                  <Check size={10} color="#FFFFFF" strokeWidth={3} />
                </View>
                <View style={styles.timelineConnectorActive} />
              </View>
              <View style={styles.timelineContent}>
                <AppText style={styles.timelineStepTitle}>Complaint Raised</AppText>
                <AppText style={styles.timelineStepTime}>17 Sep 2026, 02:45 PM</AppText>
                <AppText style={styles.timelineStepDesc}>Your complaint has been submitted successfully.</AppText>
              </View>
            </View>

            {/* Step 2: Assigned to Agent */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeftLine}>
                <View style={styles.timelineCircleDone}>
                  <Check size={10} color="#FFFFFF" strokeWidth={3} />
                </View>
                <View style={styles.timelineConnectorActive} />
              </View>
              <View style={styles.timelineContent}>
                <AppText style={styles.timelineStepTitle}>Assigned to Agent</AppText>
                <AppText style={styles.timelineStepTime}>17 Sep 2026, 03:10 PM</AppText>
                <AppText style={styles.timelineStepDesc}>Priya Sharma has been assigned to your complaint.</AppText>
              </View>
            </View>

            {/* Step 3: Under Investigation (ACTIVE) */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeftLine}>
                <View style={styles.timelineCircleActive}>
                  <View style={styles.activeInnerDot} />
                </View>
                <View style={styles.timelineConnector} />
              </View>
              <View style={styles.timelineContent}>
                <AppText style={styles.timelineStepTitleActive}>Under Investigation</AppText>
                <AppText style={styles.timelineStepTime}>17 Sep 2026, 04:20 PM</AppText>
                <AppText style={styles.timelineStepDesc}>Our team is reviewing the issue with the service partner.</AppText>
              </View>
            </View>

            {/* Step 4: Resolution in Progress */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeftLine}>
                <View style={styles.timelineCirclePending} />
                <View style={styles.timelineConnector} />
              </View>
              <View style={styles.timelineContent}>
                <AppText style={styles.timelineStepTitlePending}>Resolution in Progress</AppText>
                <AppText style={styles.timelineStepDesc}>We will update you soon.</AppText>
              </View>
            </View>

            {/* Step 5: Closed */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeftLine}>
                <View style={styles.timelineCirclePending} />
              </View>
              <View style={styles.timelineContent}>
                <AppText style={styles.timelineStepTitlePending}>Closed</AppText>
                <AppText style={styles.timelineStepDesc}>You'll be notified once the issue is resolved.</AppText>
              </View>
            </View>
          </View>
        </View>

        {/* RESOLUTION DETAILS */}
        <View style={styles.sectionCard}>
          <View style={styles.headerLeft}>
            <View style={styles.iconCircleGreen}>
              <ShieldCheck size={14} color="#059669" />
            </View>
            <AppText style={styles.cardHeaderTitle}>Resolution Details</AppText>
          </View>

          <View style={styles.resolutionBanner}>
            <AppText style={styles.resolutionBannerTitle}>Will be updated once resolved.</AppText>
            <AppText style={styles.resolutionBannerSub}>
              Our team is working to resolve your issue as soon as possible.
            </AppText>
          </View>
        </View>

        {/* CHAT WITH SUPPORT */}
        <View style={styles.sectionCard}>
          <View style={styles.headerLeft}>
            <View style={styles.iconCircleGreen}>
              <MessageSquare size={14} color="#059669" />
            </View>
            <AppText style={styles.cardHeaderTitle}>Chat with Support</AppText>
          </View>

          {/* Messages list */}
          <View style={styles.chatContainer}>
            {chatMessages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageBubble,
                  msg.sender === 'agent' ? styles.agentBubble : styles.customerBubble,
                ]}
              >
                {msg.sender === 'agent' && (
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80' }}
                    style={styles.chatAgentThumb}
                  />
                )}
                <View style={styles.bubbleTextWrap}>
                  <AppText style={[styles.bubbleText, msg.sender === 'customer' && styles.customerText]}>
                    {msg.text}
                  </AppText>
                  <AppText style={styles.bubbleTime}>{msg.time}</AppText>
                </View>
              </View>
            ))}
          </View>

          {/* Chat Input */}
          <View style={styles.chatInputRow}>
            <TouchableOpacity style={styles.attachBtn} activeOpacity={0.7}>
              <Paperclip size={18} color="#64748B" />
            </TouchableOpacity>
            <TextInput
              style={styles.chatInput}
              placeholder="Type your message..."
              placeholderTextColor="#94A3B8"
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={handleSendMessage}
              activeOpacity={0.8}
            >
              <Send size={16} color="#FFFFFF" />
            </TouchableOpacity>
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
  bookingRightCol: {
    alignItems: 'flex-end',
    borderLeftWidth: 1,
    borderLeftColor: '#F1F5F9',
    paddingLeft: 8,
  },
  bookingLabel: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  bookingVal: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginTop: 1,
  },
  viewBookingBtn: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  viewBookingText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
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
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
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
  inProgressBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  inProgressText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
  },
  complaintInfoGrid: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
  },
  complaintRow: {
    marginBottom: 6,
  },
  complaintLabel: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  copyIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  complaintIdBold: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  complaintVal: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
    marginTop: 1,
  },
  complaintValBold: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginTop: 1,
  },
  complaintDesc: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: '#334155',
    marginTop: 2,
    lineHeight: 14,
  },
  /* AGENT */
  onlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  onlineText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  agentCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
  },
  agentAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 8,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  agentRole: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginBottom: 2,
  },
  agentContactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  agentContactText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginLeft: 4,
  },
  chatAgentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  chatAgentText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  /* TIMELINE */
  viewAllText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  timelineContainer: {
    marginTop: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    minHeight: 46,
  },
  timelineLeftLine: {
    alignItems: 'center',
    width: 24,
    marginRight: 8,
  },
  timelineCircleDone: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineCircleActive: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#ECFDF5',
    borderWidth: 2,
    borderColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeInnerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#059669',
  },
  timelineCirclePending: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#CBD5E1',
    marginTop: 2,
  },
  timelineConnector: {
    flex: 1,
    width: 2,
    backgroundColor: '#E2E8F0',
    marginVertical: 2,
  },
  timelineConnectorActive: {
    flex: 1,
    width: 2,
    backgroundColor: '#059669',
    marginVertical: 2,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 10,
  },
  timelineStepTitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  timelineStepTitleActive: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  timelineStepTitlePending: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#94A3B8',
  },
  timelineStepTime: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginTop: 1,
  },
  timelineStepDesc: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 1,
  },
  /* RESOLUTION BANNER */
  resolutionBanner: {
    backgroundColor: '#ECFDF5',
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  resolutionBannerTitle: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  resolutionBannerSub: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.regular,
    color: '#047857',
    marginTop: 2,
  },
  /* CHAT */
  chatContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
    marginBottom: 8,
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: 8,
    maxWidth: '85%',
  },
  agentBubble: {
    alignSelf: 'flex-start',
  },
  customerBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#ECFDF5',
    borderRadius: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  chatAgentThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 6,
  },
  bubbleTextWrap: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  bubbleText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: '#0F172A',
  },
  customerText: {
    color: '#065F46',
  },
  bubbleTime: {
    fontSize: 7,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
    alignSelf: 'flex-end',
    marginTop: 2,
  },
  chatInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FFFFFF',
  },
  attachBtn: {
    padding: 4,
  },
  chatInput: {
    flex: 1,
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  sendBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
