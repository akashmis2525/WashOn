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
  Star,
  CheckCircle2,
  Check,
  X,
  MessageSquare,
  Leaf,
  ArrowRight,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type BeforeAfterFeedbackNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.BEFORE_AFTER_FEEDBACK
>;

type BeforeAfterFeedbackRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.BEFORE_AFTER_FEEDBACK
>;

export const BeforeAfterFeedbackScreen: React.FC = () => {
  const navigation = useNavigation<BeforeAfterFeedbackNavProp>();
  const route = useRoute<BeforeAfterFeedbackRouteProp>();
  const { activeBooking } = useBookingStore();

  const bookingId = route.params?.bookingId || activeBooking?.id || '#WO256839';

  const [cleanlinessScore, setCleanlinessScore] = useState<number>(4);
  const [completedProperly, setCompletedProperly] = useState<boolean>(true);
  const [additionalFeedback, setAdditionalFeedback] = useState<string>('');

  const handleSubmitFeedback = () => {
    Alert.alert(
      'Feedback Received!',
      'Thank you for your valuable feedback. Have a shiny and safe drive!',
      [
        {
          text: 'Go to Home',
          onPress: () => navigation.navigate(Routes.HOME_DASHBOARD),
        },
      ]
    );
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
          <AppText style={styles.headerTitle}>Before & After Feedback</AppText>
          <AppText style={styles.headerSubtitle}>
            See the difference? Tell us about it!
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
        {/* VEHICLE & TIME MINI CARD */}
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
          </View>
        </View>

        {/* BEFORE & AFTER PHOTO COMPARISON CARD */}
        <View style={styles.comparisonCard}>
          <View style={styles.photoColumn}>
            <View style={styles.photoBox}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=300&q=80' }}
                style={styles.compareImg}
              />
              <View style={styles.beforePill}>
                <AppText style={styles.beforePillText}>Before</AppText>
              </View>
            </View>
          </View>

          <View style={styles.photoColumn}>
            <View style={styles.photoBox}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300&q=80' }}
                style={styles.compareImg}
              />
              <View style={styles.afterPill}>
                <AppText style={styles.afterPillText}>After</AppText>
              </View>
            </View>
          </View>
        </View>

        {/* CLEANLINESS RATING CARD */}
        <View style={styles.cleanlinessCard}>
          <View style={styles.cleanHeader}>
            <View style={styles.cleanIconWrap}>
              <Sparkles size={16} color="#059669" />
            </View>
            <View style={{ flex: 1 }}>
              <AppText style={styles.cleanTitle}>Cleanliness Rating</AppText>
              <AppText style={styles.cleanSub}>How would you rate the final cleanliness?</AppText>
            </View>
          </View>

          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setCleanlinessScore(star)}
                activeOpacity={0.7}
                style={styles.starTouch}
              >
                <Star
                  size={28}
                  color={star <= cleanlinessScore ? '#F59E0B' : '#E2E8F0'}
                  fill={star <= cleanlinessScore ? '#F59E0B' : '#FFFFFF'}
                />
              </TouchableOpacity>
            ))}
          </View>
          <AppText style={styles.scoreNumber}>{cleanlinessScore} out of 5</AppText>
        </View>

        {/* WAS SERVICE COMPLETED PROPERLY? */}
        <View style={styles.completedProperlyCard}>
          <View style={styles.properlyHeader}>
            <View style={styles.checkIconWrap}>
              <CheckCircle2 size={16} color="#059669" />
            </View>
            <View style={{ flex: 1 }}>
              <AppText style={styles.properlyTitle}>Was the service completed properly?</AppText>
              <AppText style={styles.properlySub}>
                Did the washerman complete all the requested services as per your booking?
              </AppText>
            </View>
          </View>

          <View style={styles.dualChoiceRow}>
            {/* YES */}
            <TouchableOpacity
              style={[
                styles.choiceBtn,
                completedProperly && styles.choiceBtnYesActive,
              ]}
              onPress={() => setCompletedProperly(true)}
              activeOpacity={0.8}
            >
              <Check size={14} color={completedProperly ? '#FFFFFF' : '#0F172A'} strokeWidth={3} />
              <AppText style={[styles.choiceBtnText, completedProperly && styles.choiceBtnTextActive]}>
                Yes
              </AppText>
            </TouchableOpacity>

            {/* NO */}
            <TouchableOpacity
              style={[
                styles.choiceBtn,
                !completedProperly && styles.choiceBtnNoActive,
              ]}
              onPress={() => setCompletedProperly(false)}
              activeOpacity={0.8}
            >
              <X size={14} color={!completedProperly ? '#FFFFFF' : '#0F172A'} strokeWidth={3} />
              <AppText style={[styles.choiceBtnText, !completedProperly && styles.choiceBtnTextActive]}>
                No
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* ADDITIONAL FEEDBACK (OPTIONAL) */}
        <View style={styles.feedbackCard}>
          <View style={styles.feedbackHeader}>
            <View style={styles.msgIconWrap}>
              <MessageSquare size={14} color="#059669" />
            </View>
            <AppText style={styles.feedbackTitle}>Additional Feedback <AppText style={styles.optText}>(Optional)</AppText></AppText>
          </View>

          <TextInput
            style={styles.feedbackInput}
            placeholder="Share any other feedback..."
            placeholderTextColor="#94A3B8"
            value={additionalFeedback}
            onChangeText={setAdditionalFeedback}
            multiline
            numberOfLines={4}
            maxLength={300}
            textAlignVertical="top"
          />
          <AppText style={styles.feedbackCounter}>{additionalFeedback.length}/300</AppText>
        </View>

        {/* SUBMIT FEEDBACK CTA */}
        <TouchableOpacity
          style={styles.submitCTA}
          onPress={handleSubmitFeedback}
          activeOpacity={0.88}
        >
          <AppText style={styles.submitCTAText}>Submit Feedback</AppText>
          <ArrowRight size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        {/* ECO NOTE */}
        <View style={styles.ecoFooter}>
          <Leaf size={16} color="#059669" style={{ marginRight: 6 }} />
          <View style={{ flex: 1 }}>
            <AppText style={styles.ecoTitle}>
              Thank you for helping us keep cities cleaner!
            </AppText>
            <AppText style={styles.ecoSub}>Cleaner Rides. Greener Tomorrow.</AppText>
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
  /* COMPARISON */
  comparisonCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 12,
    gap: 8,
  },
  photoColumn: {
    flex: 1,
  },
  photoBox: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  compareImg: {
    width: '100%',
    height: 140,
    borderRadius: 12,
  },
  beforePill: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#64748B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  beforePillText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  afterPill: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  afterPillText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  /* CLEANLINESS CARD */
  cleanlinessCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    alignItems: 'center',
    marginBottom: 12,
  },
  cleanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  cleanIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  cleanTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  cleanSub: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 4,
  },
  starTouch: {
    paddingHorizontal: 6,
  },
  scoreNumber: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#64748B',
    marginTop: 4,
  },
  /* WAS SERVICE COMPLETED PROPERLY */
  completedProperlyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 12,
  },
  properlyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  properlyTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  properlySub: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 12,
  },
  dualChoiceRow: {
    flexDirection: 'row',
    gap: 10,
  },
  choiceBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    gap: 6,
  },
  choiceBtnYesActive: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  choiceBtnNoActive: {
    backgroundColor: '#DC2626',
    borderColor: '#DC2626',
  },
  choiceBtnText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  choiceBtnTextActive: {
    color: '#FFFFFF',
  },
  /* FEEDBACK CARD */
  feedbackCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 14,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  msgIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  feedbackTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  optText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  feedbackInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minHeight: 65,
  },
  feedbackCounter: {
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
  ecoFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  ecoTitle: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#065F46',
  },
  ecoSub: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
});
