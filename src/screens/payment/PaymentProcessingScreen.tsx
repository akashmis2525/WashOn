import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Check,
  ShieldCheck,
  Lock,
  CreditCard,
  Wifi,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { useBookingStore } from '../../store/bookingStore';

const { width } = Dimensions.get('window');

type PaymentProcessingNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.PAYMENT_PROCESSING
>;

type PaymentProcessingRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.PAYMENT_PROCESSING
>;

export const PaymentProcessingScreen: React.FC = () => {
  const navigation = useNavigation<PaymentProcessingNavProp>();
  const route = useRoute<PaymentProcessingRouteProp>();
  const { activeBooking } = useBookingStore();

  const bookingId = route.params?.bookingId || activeBooking?.id || '#WO256839';
  const [currentStep, setCurrentStep] = useState<number>(2); // 1 to 4

  // Animated spin and pulse
  const spinValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Spin animation for processing ring
    const spinAnim = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1800,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spinAnim.start();

    // Pulse animation for card
    const pulseAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1.08,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnim.start();

    // Realistic multi-step progress timer
    const step2Timer = setTimeout(() => {
      setCurrentStep(3); // Verifying with Bank
    }, 1200);

    const step3Timer = setTimeout(() => {
      setCurrentStep(4); // Finalizing
    }, 2200);

    const completeTimer = setTimeout(() => {
      navigation.replace(Routes.PAYMENT_SUCCESS, { bookingId });
    }, 3200);

    return () => {
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
      clearTimeout(completeTimer);
      spinAnim.stop();
      pulseAnim.stop();
    };
  }, [navigation, bookingId]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.backButtonPlaceholder} />

        <View style={styles.headerTitleContainer}>
          <AppText style={styles.headerTitle}>Processing Payment</AppText>
          <AppText style={styles.headerSubtitle}>
            Please do not close this page
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
            <AppText style={styles.logoSubtext}>CAR | BIKE | ANYWHERE</AppText>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {/* CENTER ANIMATED RING & ICON */}
        <View style={styles.animationSection}>
          <View style={styles.spinnerWrapper}>
            {/* Outer spinning dashed/partial ring */}
            <Animated.View
              style={[
                styles.spinnerRing,
                {
                  transform: [{ rotate: spin }],
                },
              ]}
            />

            {/* Inner background circle */}
            <View style={styles.innerRingBg}>
              <Animated.View
                style={[
                  styles.cardGraphicBox,
                  {
                    transform: [{ scale: pulseValue }],
                  },
                ]}
              >
                <View style={styles.cardLinesWrap}>
                  <View style={styles.cardSpeedLine} />
                  <View style={[styles.cardSpeedLine, { width: 14 }]} />
                  <View style={[styles.cardSpeedLine, { width: 10 }]} />
                </View>
                <View style={styles.cardIconChip}>
                  <CreditCard size={32} color="#059669" />
                </View>
              </Animated.View>
            </View>
          </View>

          <AppText style={styles.mainTitle}>Processing Your Payment...</AppText>
          <AppText style={styles.mainSubtitle}>
            Please wait while we securely process your transaction.
          </AppText>
        </View>

        {/* 4-STEP HORIZONTAL PROGRESS BAR */}
        <View style={styles.stepProgressContainer}>
          {/* Step 1 */}
          <View style={styles.stepNode}>
            <View style={[styles.stepCircle, styles.stepCircleCompleted]}>
              <Check size={12} color="#FFFFFF" strokeWidth={3} />
            </View>
            <AppText style={[styles.stepLabel, styles.stepLabelActive]}>Payment{'\n'}Initiated</AppText>
          </View>

          {/* Connector 1-2 */}
          <View style={[styles.stepLine, currentStep >= 2 && styles.stepLineActive]} />

          {/* Step 2 */}
          <View style={styles.stepNode}>
            <View
              style={[
                styles.stepCircle,
                currentStep >= 2 && styles.stepCircleActive,
                currentStep > 2 && styles.stepCircleCompleted,
              ]}
            >
              {currentStep > 2 ? (
                <Check size={12} color="#FFFFFF" strokeWidth={3} />
              ) : (
                <View style={styles.stepActiveInnerDot} />
              )}
            </View>
            <AppText style={[styles.stepLabel, currentStep >= 2 && styles.stepLabelActive]}>
              Processing{'\n'}Payment
            </AppText>
          </View>

          {/* Connector 2-3 */}
          <View style={[styles.stepLine, currentStep >= 3 && styles.stepLineActive]} />

          {/* Step 3 */}
          <View style={styles.stepNode}>
            <View
              style={[
                styles.stepCircle,
                currentStep >= 3 && styles.stepCircleActive,
                currentStep > 3 && styles.stepCircleCompleted,
              ]}
            >
              {currentStep > 3 ? (
                <Check size={12} color="#FFFFFF" strokeWidth={3} />
              ) : currentStep === 3 ? (
                <View style={styles.stepActiveInnerDot} />
              ) : null}
            </View>
            <AppText style={[styles.stepLabel, currentStep >= 3 && styles.stepLabelActive]}>
              Verifying{'\n'}with Bank
            </AppText>
          </View>

          {/* Connector 3-4 */}
          <View style={[styles.stepLine, currentStep >= 4 && styles.stepLineActive]} />

          {/* Step 4 */}
          <View style={styles.stepNode}>
            <View style={[styles.stepCircle, currentStep >= 4 && styles.stepCircleActive]}>
              {currentStep >= 4 && <View style={styles.stepActiveInnerDot} />}
            </View>
            <AppText style={[styles.stepLabel, currentStep >= 4 && styles.stepLabelActive]}>
              Finalizing{'\n'}Transaction
            </AppText>
          </View>
        </View>

        {/* VEHICLE SUMMARY MINI CARD */}
        <View style={styles.vehicleMiniCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=200&q=80' }}
            style={styles.carMiniThumb}
            resizeMode="contain"
          />
          <View style={styles.vehicleMiniMiddle}>
            <AppText style={styles.carName}>Toyota Fortuner</AppText>
            <AppText style={styles.carPlate}>MP 09 AB 1234 • White • SUV</AppText>
            <AppText style={styles.serviceNameBold}>Premium Car Wash</AppText>
            <AppText style={styles.serviceSubText}>Exterior + Interior + Premium Finish</AppText>
          </View>
          <View style={styles.vehicleMiniRight}>
            <AppText style={styles.totalLabel}>Total Amount</AppText>
            <AppText style={styles.totalVal}>₹547</AppText>
            <AppText style={styles.taxSub}>Inclusive of all taxes</AppText>
          </View>
        </View>

        {/* DO NOT CLOSE WARNING BOX */}
        <View style={styles.warningBox}>
          <View style={styles.warningIconCircle}>
            <ShieldCheck size={22} color="#059669" />
          </View>
          <View style={styles.warningTextWrap}>
            <AppText style={styles.warningTitle}>Do Not Close This Page</AppText>
            <AppText style={styles.warningDesc}>
              Please do not press back or close the app while your payment is being processed.
            </AppText>
            <AppText style={styles.warningTimeText}>This may take a few seconds...</AppText>
          </View>
        </View>

        {/* 3 SECURITY BADGES ROW */}
        <View style={styles.securityRow}>
          <View style={styles.secItem}>
            <View style={styles.secIconWrap}>
              <Lock size={15} color="#059669" />
            </View>
            <AppText style={styles.secText}>Secure{'\n'}Encryption</AppText>
          </View>
          <View style={styles.secItem}>
            <View style={styles.secIconWrap}>
              <ShieldCheck size={15} color="#059669" />
            </View>
            <AppText style={styles.secText}>PCI DSS{'\n'}Compliant</AppText>
          </View>
          <View style={styles.secItem}>
            <View style={styles.secIconWrap}>
              <CreditCard size={15} color="#059669" />
            </View>
            <AppText style={styles.secText}>100% Safe{'\n'}Transactions</AppText>
          </View>
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <AppText style={styles.poweredByText}>Powered by <AppText style={styles.razorpayBold}>Razorpay</AppText></AppText>
        <View style={styles.securityFooterRow}>
          <ShieldCheck size={12} color="#64748B" style={{ marginRight: 4 }} />
          <AppText style={styles.securityFooterText}>Your Security is Our Priority</AppText>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  backButtonPlaceholder: {
    width: 38,
    height: 38,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
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
    fontSize: 7,
    fontFamily: Typography.fontFamily.bold,
    color: '#92400E',
    letterSpacing: 0.4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  /* CENTER ANIMATION */
  animationSection: {
    alignItems: 'center',
    marginVertical: 12,
  },
  spinnerWrapper: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 16,
  },
  spinnerRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#059669',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  innerRingBg: {
    width: 116,
    height: 116,
    borderRadius: 58,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  cardGraphicBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLinesWrap: {
    marginRight: 6,
    alignItems: 'flex-end',
  },
  cardSpeedLine: {
    height: 2.5,
    width: 18,
    backgroundColor: '#059669',
    borderRadius: 2,
    marginBottom: 3,
  },
  cardIconChip: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  mainTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 4,
  },
  mainSubtitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    textAlign: 'center',
    maxWidth: '85%',
  },
  /* 4-STEP PROGRESS */
  stepProgressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 14,
    paddingHorizontal: 8,
  },
  stepNode: {
    alignItems: 'center',
    width: 62,
  },
  stepCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  stepCircleActive: {
    backgroundColor: '#ECFDF5',
    borderWidth: 2,
    borderColor: '#059669',
  },
  stepCircleCompleted: {
    backgroundColor: '#059669',
  },
  stepActiveInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#059669',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E2E8F0',
    marginTop: 10,
    marginHorizontal: -4,
  },
  stepLineActive: {
    backgroundColor: '#059669',
  },
  stepLabel: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 11,
  },
  stepLabelActive: {
    color: '#0F172A',
    fontFamily: Typography.fontFamily.semiBold,
  },
  /* VEHICLE CARD */
  vehicleMiniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  carMiniThumb: {
    width: 65,
    height: 42,
  },
  vehicleMiniMiddle: {
    flex: 1,
    marginLeft: 8,
  },
  carName: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  carPlate: {
    fontSize: 9,
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
  vehicleMiniRight: {
    alignItems: 'flex-end',
    borderLeftWidth: 1,
    borderLeftColor: '#E2E8F0',
    paddingLeft: 8,
  },
  totalLabel: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  totalVal: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  taxSub: {
    fontSize: 7,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
  },
  /* DO NOT CLOSE BOX */
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 12,
  },
  warningIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  warningTextWrap: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  warningDesc: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#047857',
    marginTop: 1,
  },
  warningTimeText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#059669',
    marginTop: 2,
  },
  /* 3 BADGES */
  securityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  secItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  secIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  secText: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
    lineHeight: 10,
  },
  /* FOOTER */
  footer: {
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  poweredByText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginBottom: 4,
  },
  razorpayBold: {
    fontFamily: Typography.fontFamily.bold,
    color: '#0C2340',
  },
  securityFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  securityFooterText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
});
