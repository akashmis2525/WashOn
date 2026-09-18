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
  Search,
  BookOpen,
  Calendar,
  CreditCard,
  RotateCcw,
  AlertTriangle,
  Headphones,
  MessageSquare,
  Phone,
  Mail,
  FileText,
  ChevronRight,
  Home,
  CalendarDays,
  Wallet,
  Tag,
  User,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width } = Dimensions.get('window');

type SupportNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.HELP_SUPPORT
>;

interface HelpTopic {
  id: string;
  title: string;
  description: string;
  iconType: 'faq' | 'booking' | 'payment' | 'refund' | 'report' | 'contact';
}

const POPULAR_TOPICS: HelpTopic[] = [
  {
    id: 'faq',
    title: 'FAQ',
    description: 'Find answers to common questions',
    iconType: 'faq',
  },
  {
    id: 'booking_help',
    title: 'Booking Help',
    description: 'Help with booking, reschedule or cancel',
    iconType: 'booking',
  },
  {
    id: 'payment_help',
    title: 'Payment Help',
    description: 'Payment methods, wallet & transactions',
    iconType: 'payment',
  },
  {
    id: 'refund_help',
    title: 'Refund Help',
    description: 'Refund status and process',
    iconType: 'refund',
  },
  {
    id: 'report_issue',
    title: 'Report Issue',
    description: 'Facing a problem? Let us know',
    iconType: 'report',
  },
  {
    id: 'contact_support',
    title: 'Contact Support',
    description: 'Talk to our support team',
    iconType: 'contact',
  },
];

export const HelpSupportScreen: React.FC = () => {
  const navigation = useNavigation<SupportNavProp>();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleTopicPress = (topic: HelpTopic) => {
    if (topic.id === 'report_issue') {
      navigation.navigate(Routes.REPORT_ISSUE as never);
    } else if (topic.id === 'contact_support') {
      navigation.navigate(Routes.SUPPORT_CHAT as never);
    } else {
      Alert.alert(topic.title, topic.description);
    }
  };

  const handleChat = () => {
    navigation.navigate(Routes.SUPPORT_CHAT as never);
  };

  const handleCall = () => {
    Alert.alert('Call Support', 'Calling WashOn Helpline: +91 81206 52523');
  };

  const handleEmail = () => {
    Alert.alert('Email Support', 'Opening email composer for support@washon.in');
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
          <AppText style={styles.headerTitle}>Help & Support</AppText>
          <AppText style={styles.headerSubtitle}>
            We're here to help you
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HERO BANNER */}
        <View style={styles.heroBanner}>
          <View style={styles.heroTextContent}>
            <AppText style={styles.heroTitle}>Need Help?</AppText>
            <AppText style={styles.heroSubtitle}>
              Find answers, get support and resolve your issues quickly.
            </AppText>
          </View>

          <View style={styles.agentIllustrationContainer}>
            <View style={styles.speechBubble}>
              <AppText style={styles.speechBubbleText}>
                How can we help you?
              </AppText>
            </View>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
              }}
              style={styles.agentAvatar}
            />
          </View>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <Search size={18} color="#94A3B8" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for help (e.g. booking, payment, refund...)"
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* POPULAR HELP TOPICS */}
        <View style={styles.sectionHeader}>
          <AppText style={styles.sectionTitle}>Popular Help Topics</AppText>
          <TouchableOpacity activeOpacity={0.7}>
            <AppText style={styles.viewAllText}>View All</AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.topicsGrid}>
          {POPULAR_TOPICS.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              style={styles.topicCard}
              onPress={() => handleTopicPress(topic)}
              activeOpacity={0.7}
            >
              <View style={styles.topicTop}>
                <View
                  style={[
                    styles.topicIconCircle,
                    topic.iconType === 'faq' && styles.faqBg,
                    topic.iconType === 'booking' && styles.bookingBg,
                    topic.iconType === 'payment' && styles.paymentBg,
                    topic.iconType === 'refund' && styles.refundBg,
                    topic.iconType === 'report' && styles.reportBg,
                    topic.iconType === 'contact' && styles.contactBg,
                  ]}
                >
                  {topic.iconType === 'faq' && <BookOpen size={18} color="#059669" />}
                  {topic.iconType === 'booking' && <Calendar size={18} color="#2563EB" />}
                  {topic.iconType === 'payment' && <CreditCard size={18} color="#D97706" />}
                  {topic.iconType === 'refund' && <RotateCcw size={18} color="#EA580C" />}
                  {topic.iconType === 'report' && <AlertTriangle size={18} color="#7C3AED" />}
                  {topic.iconType === 'contact' && <Headphones size={18} color="#059669" />}
                </View>
                <ChevronRight size={14} color="#94A3B8" />
              </View>

              <AppText style={styles.topicTitle}>{topic.title}</AppText>
              <AppText style={styles.topicDescription} numberOfLines={2}>
                {topic.description}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        {/* STILL NEED HELP CONTACT CARD */}
        <View style={styles.contactCard}>
          <View style={styles.contactLeft}>
            <AppText style={styles.contactTitle}>Still need help?</AppText>
            <AppText style={styles.contactSub}>
              Our support team is available 24/7 to assist you.
            </AppText>

            <View style={styles.supportPill}>
              <MessageSquare size={14} color="#059669" />
              <AppText style={styles.supportPillText}>
                We're always here for you!
              </AppText>
            </View>
          </View>

          <View style={styles.contactRight}>
            <TouchableOpacity
              style={styles.chatButton}
              onPress={handleChat}
              activeOpacity={0.88}
            >
              <MessageSquare size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
              <AppText style={styles.chatButtonText}>Chat with Us</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactMethodRow}
              onPress={handleCall}
              activeOpacity={0.7}
            >
              <Phone size={14} color="#059669" />
              <View>
                <AppText style={styles.contactMethodLabel}>Call Us</AppText>
                <AppText style={styles.contactMethodVal}>+91 81206 52523</AppText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactMethodRow}
              onPress={handleEmail}
              activeOpacity={0.7}
            >
              <Mail size={14} color="#059669" />
              <View>
                <AppText style={styles.contactMethodLabel}>Email Us</AppText>
                <AppText style={styles.contactMethodVal}>support@washon.in</AppText>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* APP GUIDE */}
        <TouchableOpacity
          style={styles.appGuideCard}
          onPress={() => Alert.alert('App Guide', 'WashOn Guide: 1. Choose Service 2. Select Washerman 3. Real-time tracking 4. Doorstep washing completed!')}
          activeOpacity={0.7}
        >
          <View style={styles.appGuideIconBox}>
            <FileText size={18} color="#059669" />
          </View>
          <View style={styles.appGuideTextContainer}>
            <AppText style={styles.appGuideTitle}>App Guide</AppText>
            <AppText style={styles.appGuideSubtitle}>
              Learn how to use WashOn with our step-by-step guide
            </AppText>
          </View>
          <ChevronRight size={18} color="#94A3B8" />
        </TouchableOpacity>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* BOTTOM TAB BAR */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity
          style={styles.tabBarItem}
          onPress={() => navigation.navigate(Routes.HOME_DASHBOARD as never)}
        >
          <Home size={20} color="#94A3B8" />
          <AppText style={styles.tabBarLabel}>Home</AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabBarItem}
          onPress={() => navigation.navigate(Routes.UPCOMING_BOOKINGS as never)}
        >
          <CalendarDays size={20} color="#94A3B8" />
          <AppText style={styles.tabBarLabel}>Bookings</AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabBarItem}
          onPress={() => navigation.navigate(Routes.WALLET as never)}
        >
          <Wallet size={20} color="#94A3B8" />
          <AppText style={styles.tabBarLabel}>Wallet</AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabBarItem}
          onPress={() => navigation.navigate(Routes.OFFERS_COUPONS as never)}
        >
          <Tag size={20} color="#94A3B8" />
          <AppText style={styles.tabBarLabel}>Offers</AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabBarItem}
          onPress={() => navigation.navigate(Routes.CUSTOMER_PROFILE as never)}
        >
          <User size={20} color="#059669" />
          <AppText style={[styles.tabBarLabel, styles.tabBarLabelActive]}>
            Profile
          </AppText>
          <View style={styles.activeTabIndicator} />
        </TouchableOpacity>
      </View>
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  heroBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 14,
  },
  heroTextContent: {
    flex: 1,
    paddingRight: 6,
  },
  heroTitle: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  heroSubtitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#047857',
    marginTop: 2,
    lineHeight: 15,
  },
  agentIllustrationContainer: {
    alignItems: 'center',
  },
  speechBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  speechBubbleText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  agentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#059669',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#0F172A',
    padding: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  viewAllText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#059669',
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 14,
  },
  topicCard: {
    width: (width - 42) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  topicTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  topicIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faqBg: { backgroundColor: '#ECFDF5' },
  bookingBg: { backgroundColor: '#EFF6FF' },
  paymentBg: { backgroundColor: '#FEF3C7' },
  refundBg: { backgroundColor: '#FFEDD5' },
  reportBg: { backgroundColor: '#F3E8FF' },
  contactBg: { backgroundColor: '#ECFDF5' },
  topicTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 2,
  },
  topicDescription: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    lineHeight: 14,
  },
  contactCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  contactLeft: {
    flex: 1,
    paddingRight: 10,
  },
  contactTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  contactSub: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 15,
  },
  supportPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginTop: 10,
    gap: 4,
    alignSelf: 'flex-start',
  },
  supportPillText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#059669',
  },
  contactRight: {
    flex: 1,
    gap: 8,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    borderRadius: 10,
    paddingVertical: 8,
  },
  chatButtonText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  contactMethodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  contactMethodLabel: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  contactMethodVal: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  appGuideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  appGuideIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  appGuideTextContainer: {
    flex: 1,
  },
  appGuideTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  appGuideSubtitle: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 1,
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
