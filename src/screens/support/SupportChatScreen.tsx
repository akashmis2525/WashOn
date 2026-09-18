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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Paperclip,
  Send,
  Calendar,
  HelpCircle,
  Phone,
  CheckCheck,
  ChevronRight,
  X,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width } = Dimensions.get('window');

type SupportChatNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.SUPPORT_CHAT
>;

interface ChatMessage {
  id: string;
  sender: 'agent' | 'user';
  text?: string;
  time: string;
  bookingRef?: string;
  imageUri?: string;
  imageName?: string;
  imageSize?: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'agent',
    text: 'Hi! 👋\nWelcome to WashOn Support.\nHow can we help you today?',
    time: '10:12 AM',
  },
  {
    id: 'm2',
    sender: 'user',
    text: "Hi, I'm facing an issue with my recent booking. Can you please help?",
    time: '10:13 AM',
  },
  {
    id: 'm3',
    sender: 'agent',
    text: 'Sure! Please share your booking reference number so I can check the details.',
    time: '10:13 AM',
  },
  {
    id: 'm4',
    sender: 'user',
    bookingRef: '#WA56893',
    text: 'Here is my booking reference.',
    time: '10:14 AM',
  },
  {
    id: 'm5',
    sender: 'agent',
    text: 'Thanks! Could you also share a screenshot of the issue?',
    time: '10:14 AM',
  },
  {
    id: 'm6',
    sender: 'user',
    imageUri: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=500&auto=format&fit=crop&q=80',
    imageName: 'car_issue.jpg',
    imageSize: '1.2 MB',
    text: 'Please check this. The cleaning was not done properly on the left side.',
    time: '10:15 AM',
  },
  {
    id: 'm7',
    sender: 'agent',
    text: "Thank you for sharing. We'll check this with the partner and get back to you shortly.",
    time: '10:16 AM',
  },
];

export const SupportChatScreen: React.FC = () => {
  const navigation = useNavigation<SupportChatNavProp>();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState<string>('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText.trim(),
      time: '10:18 AM',
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    setTimeout(() => {
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: 'Our agent is reviewing your message and will respond in 2 minutes.',
        time: '10:19 AM',
      };
      setMessages((prev) => [...prev, reply]);
    }, 1200);
  };

  const handleAttachImage = () => {
    Alert.alert('Attach File', 'Select photo from gallery or document');
  };

  const handleQuickBookings = () => {
    navigation.navigate(Routes.UPCOMING_BOOKINGS as never);
  };

  const handleQuickFAQ = () => {
    navigation.navigate(Routes.HELP_SUPPORT as never);
  };

  const handleCallSupport = () => {
    Alert.alert('Call Support', 'Calling +91 81206 52523');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
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
            <AppText style={styles.headerTitle}>Support Chat</AppText>
            <View style={styles.onlineRow}>
              <View style={styles.onlineDot} />
              <AppText style={styles.onlineText}>
                Online • We usually reply within a few minutes
              </AppText>
            </View>
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
          contentContainerStyle={styles.chatScroll}
        >
          {/* TODAY BADGE */}
          <View style={styles.todayBadgeContainer}>
            <View style={styles.todayBadge}>
              <AppText style={styles.todayBadgeText}>Today</AppText>
            </View>
          </View>

          {/* MESSAGES */}
          {messages.map((item) => {
            const isAgent = item.sender === 'agent';

            return (
              <View
                key={item.id}
                style={[
                  styles.messageRow,
                  isAgent ? styles.messageRowLeft : styles.messageRowRight,
                ]}
              >
                {isAgent && (
                  <Image
                    source={{
                      uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
                    }}
                    style={styles.agentAvatar}
                  />
                )}

                <View
                  style={[
                    styles.bubbleContainer,
                    isAgent ? styles.agentBubbleContainer : styles.userBubbleContainer,
                  ]}
                >
                  {/* BOOKING REFERENCE CARD */}
                  {item.bookingRef && (
                    <TouchableOpacity
                      style={styles.bookingRefCard}
                      onPress={() =>
                        navigation.navigate(Routes.BOOKING_VIEW_DETAILS, {
                          bookingId: item.bookingRef!,
                        } as never)
                      }
                      activeOpacity={0.8}
                    >
                      <View style={styles.bookingRefIconBox}>
                        <Calendar size={18} color="#059669" />
                      </View>
                      <View style={styles.bookingRefTextContainer}>
                        <AppText style={styles.bookingRefLabel}>
                          Booking Reference
                        </AppText>
                        <AppText style={styles.bookingRefVal}>
                          {item.bookingRef}
                        </AppText>
                      </View>
                      <ChevronRight size={16} color="#94A3B8" />
                    </TouchableOpacity>
                  )}

                  {/* ATTACHED IMAGE */}
                  {item.imageUri && (
                    <View style={styles.imageAttachmentBox}>
                      <Image
                        source={{ uri: item.imageUri }}
                        style={styles.attachmentImg}
                        resizeMode="cover"
                      />
                      <View style={styles.imageCloseBadge}>
                        <X size={12} color="#FFFFFF" />
                      </View>
                      <AppText style={styles.imageMetaText}>
                        {item.imageName} ({item.imageSize})
                      </AppText>
                    </View>
                  )}

                  {/* MESSAGE TEXT */}
                  {item.text && (
                    <View
                      style={[
                        styles.bubble,
                        isAgent ? styles.agentBubble : styles.userBubble,
                      ]}
                    >
                      <AppText
                        style={[
                          styles.bubbleText,
                          isAgent ? styles.agentBubbleText : styles.userBubbleText,
                        ]}
                      >
                        {item.text}
                      </AppText>
                    </View>
                  )}

                  {/* TIMESTAMP & STATUS */}
                  <View
                    style={[
                      styles.timestampRow,
                      isAgent ? styles.timestampRowLeft : styles.timestampRowRight,
                    ]}
                  >
                    <AppText style={styles.timestampText}>{item.time}</AppText>
                    {!isAgent && (
                      <CheckCheck size={12} color="#059669" style={{ marginLeft: 4 }} />
                    )}
                  </View>
                </View>
              </View>
            );
          })}

          <View style={{ height: 20 }} />
        </ScrollView>

        {/* INPUT BAR */}
        <View style={styles.inputBar}>
          <TouchableOpacity
            style={styles.attachBtn}
            onPress={handleAttachImage}
            activeOpacity={0.8}
          >
            <Paperclip size={20} color="#64748B" />
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            placeholder="Type your message..."
            placeholderTextColor="#94A3B8"
            value={inputText}
            onChangeText={setInputText}
            multiline
          />

          <TouchableOpacity
            style={[
              styles.sendBtn,
              inputText.trim().length > 0 && styles.sendBtnActive,
            ]}
            onPress={handleSendMessage}
            activeOpacity={0.8}
          >
            <Send size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* QUICK SHORTCUTS BAR */}
        <View style={styles.quickBar}>
          <TouchableOpacity
            style={styles.quickCard}
            onPress={handleQuickBookings}
            activeOpacity={0.7}
          >
            <View style={styles.quickIconBox}>
              <Calendar size={14} color="#059669" />
            </View>
            <View>
              <AppText style={styles.quickTitle}>My Bookings</AppText>
              <AppText style={styles.quickSub}>View past & upcoming</AppText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={handleQuickFAQ}
            activeOpacity={0.7}
          >
            <View style={styles.quickIconBox}>
              <HelpCircle size={14} color="#2563EB" />
            </View>
            <View>
              <AppText style={styles.quickTitle}>FAQs</AppText>
              <AppText style={styles.quickSub}>Find instant answers</AppText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={handleCallSupport}
            activeOpacity={0.7}
          >
            <View style={styles.quickIconBox}>
              <Phone size={14} color="#7C3AED" />
            </View>
            <View>
              <AppText style={styles.quickTitle}>Call Support</AppText>
              <AppText style={styles.quickSub}>+91 81206 52523</AppText>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 4,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#10B981',
  },
  onlineText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
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
  chatScroll: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  todayBadgeContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  todayBadge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 10,
  },
  todayBadgeText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  messageRowLeft: {
    justifyContent: 'flex-start',
  },
  messageRowRight: {
    justifyContent: 'flex-end',
  },
  agentAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: 8,
    marginTop: 2,
  },
  bubbleContainer: {
    maxWidth: width * 0.76,
  },
  agentBubbleContainer: {
    alignItems: 'flex-start',
  },
  userBubbleContainer: {
    alignItems: 'flex-end',
  },
  bubble: {
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  agentBubble: {
    backgroundColor: '#F1F5F9',
    borderTopLeftRadius: 2,
  },
  userBubble: {
    backgroundColor: '#ECFDF5',
    borderTopRightRadius: 2,
  },
  bubbleText: {
    fontSize: 12,
    lineHeight: 17,
  },
  agentBubbleText: {
    fontFamily: Typography.fontFamily.medium,
    color: '#0F172A',
  },
  userBubbleText: {
    fontFamily: Typography.fontFamily.medium,
    color: '#065F46',
  },
  bookingRefCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 4,
    width: '100%',
  },
  bookingRefIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  bookingRefTextContainer: {
    flex: 1,
  },
  bookingRefLabel: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#047857',
  },
  bookingRefVal: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  imageAttachmentBox: {
    position: 'relative',
    marginBottom: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  attachmentImg: {
    width: 180,
    height: 95,
    borderRadius: 8,
  },
  imageCloseBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageMetaText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 3,
    marginLeft: 2,
  },
  timestampRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  timestampRowLeft: {
    justifyContent: 'flex-start',
  },
  timestampRowRight: {
    justifyContent: 'flex-end',
  },
  timestampText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 8,
  },
  attachBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#0F172A',
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnActive: {
    backgroundColor: '#047857',
  },
  quickBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingBottom: 14,
    paddingTop: 6,
    gap: 6,
  },
  quickCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 5,
  },
  quickIconBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickTitle: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  quickSub: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
  },
});
