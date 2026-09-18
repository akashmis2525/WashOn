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
  Wallet,
  IndianRupee,
  CreditCard,
  Building2,
  Gift,
  ShieldCheck,
  ChevronRight,
  XCircle,
  Sparkles,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width } = Dimensions.get('window');

type AddMoneyNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.ADD_MONEY
>;

interface PaymentMethodOption {
  id: string;
  name: string;
  subtext: string;
  iconType: 'upi' | 'card' | 'bank' | 'wallet';
  badges?: string[];
}

const SUGGESTED_AMOUNTS = [500, 1000, 2000, 5000];

const PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: 'upi',
    name: 'UPI',
    subtext: '(GPay, PhonePe, Paytm, etc.)',
    iconType: 'upi',
    badges: ['GPay', 'PhonePe', 'Paytm'],
  },
  {
    id: 'card',
    name: 'Credit / Debit Card',
    subtext: 'Visa, MasterCard, Rupay',
    iconType: 'card',
    badges: ['VISA', 'MC', 'RuPay'],
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    subtext: 'All major banks supported',
    iconType: 'bank',
  },
  {
    id: 'wallet',
    name: 'Wallets',
    subtext: 'Amazon Pay, Mobikwik, etc.',
    iconType: 'wallet',
    badges: ['AmazonPay', 'Mobikwik'],
  },
];

export const AddMoneyScreen: React.FC = () => {
  const navigation = useNavigation<AddMoneyNavProp>();
  const [amount, setAmount] = useState<string>('500');
  const [selectedMethod, setSelectedMethod] = useState<string>('upi');

  const numericAmount = parseInt(amount, 10) || 0;

  const handleSelectSuggested = (val: number) => {
    setAmount(val.toString());
  };

  const handleClearAmount = () => {
    setAmount('');
  };

  const handleConfirmAddMoney = () => {
    if (numericAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount to add.');
      return;
    }

    Alert.alert(
      'Payment Success',
      `₹${numericAmount.toLocaleString('en-IN')} has been added to your wallet via ${
        selectedMethod.toUpperCase()
      }!`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
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
          <AppText style={styles.headerTitle}>Add Money</AppText>
          <AppText style={styles.headerSubtitle}>
            Top up your wallet for faster and hassle-free bookings
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
        {/* CURRENT BALANCE BANNER */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceLeft}>
            <View style={styles.walletIconCircle}>
              <Wallet size={20} color="#059669" />
            </View>
            <View>
              <AppText style={styles.balanceLabel}>Current Wallet Balance</AppText>
              <AppText style={styles.balanceAmount}>₹1,250.00</AppText>
              <AppText style={styles.balanceSubtext}>
                Use your wallet for quick payments
              </AppText>
            </View>
          </View>
          <View style={styles.walletGraphicContainer}>
            <View style={styles.walletGraphic}>
              <IndianRupee size={20} color="#059669" />
            </View>
            <Sparkles size={16} color="#34D399" style={styles.sparkleTop} />
            <Sparkles size={12} color="#10B981" style={styles.sparkleBottom} />
          </View>
        </View>

        {/* ENTER AMOUNT SECTION */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconCircle}>
              <IndianRupee size={16} color="#059669" />
            </View>
            <AppText style={styles.sectionTitle}>Enter Amount</AppText>
          </View>

          <View style={styles.amountInputContainer}>
            <AppText style={styles.currencySymbol}>₹</AppText>
            <TextInput
              style={styles.amountTextInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="0"
              placeholderTextColor="#94A3B8"
              keyboardType="number-pad"
              maxLength={6}
            />
            {amount.length > 0 && (
              <TouchableOpacity
                onPress={handleClearAmount}
                style={styles.clearButton}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <XCircle size={20} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>

          {/* SUGGESTED AMOUNTS */}
          <AppText style={styles.suggestedLabel}>Suggested Amounts</AppText>
          <View style={styles.suggestedRow}>
            {SUGGESTED_AMOUNTS.map((amt) => {
              const isSelected = numericAmount === amt;
              return (
                <TouchableOpacity
                  key={amt}
                  style={[
                    styles.suggestedPill,
                    isSelected && styles.suggestedPillActive,
                  ]}
                  onPress={() => handleSelectSuggested(amt)}
                  activeOpacity={0.7}
                >
                  <AppText
                    style={[
                      styles.suggestedPillText,
                      isSelected && styles.suggestedPillTextActive,
                    ]}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* SELECT PAYMENT METHOD */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconCircle}>
              <CreditCard size={16} color="#059669" />
            </View>
            <AppText style={styles.sectionTitle}>Select Payment Method</AppText>
          </View>

          <View style={styles.paymentList}>
            {PAYMENT_METHODS.map((method) => {
              const isSelected = selectedMethod === method.id;
              return (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentMethodItem,
                    isSelected && styles.paymentMethodItemActive,
                  ]}
                  onPress={() => setSelectedMethod(method.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.radioContainer}>
                    <View
                      style={[
                        styles.radioOuter,
                        isSelected && styles.radioOuterActive,
                      ]}
                    >
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                  </View>

                  <View style={styles.methodIconBox}>
                    {method.iconType === 'upi' && (
                      <IndianRupee size={18} color="#1E293B" />
                    )}
                    {method.iconType === 'card' && (
                      <CreditCard size={18} color="#1E293B" />
                    )}
                    {method.iconType === 'bank' && (
                      <Building2 size={18} color="#1E293B" />
                    )}
                    {method.iconType === 'wallet' && (
                      <Wallet size={18} color="#1E293B" />
                    )}
                  </View>

                  <View style={styles.methodTextContainer}>
                    <AppText style={styles.methodName}>{method.name}</AppText>
                    <AppText style={styles.methodSubtext}>
                      {method.subtext}
                    </AppText>
                  </View>

                  {/* BADGES / LOGOS */}
                  {method.badges && (
                    <View style={styles.badgesRow}>
                      {method.badges.map((b, idx) => (
                        <View
                          key={idx}
                          style={[
                            styles.logoMiniBadge,
                            b === 'GPay' && styles.gpayBadge,
                            b === 'PhonePe' && styles.phonepeBadge,
                            b === 'Paytm' && styles.paytmBadge,
                            b === 'VISA' && styles.visaBadge,
                            b === 'MC' && styles.mcBadge,
                            b === 'RuPay' && styles.rupayBadge,
                            b === 'AmazonPay' && styles.amazonBadge,
                            b === 'Mobikwik' && styles.mobikwikBadge,
                          ]}
                        >
                          <AppText style={styles.badgeText}>{b}</AppText>
                        </View>
                      ))}
                    </View>
                  )}

                  <ChevronRight size={16} color="#94A3B8" />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* OFFER BANNER */}
        <View style={styles.offerBanner}>
          <View style={styles.offerIconBox}>
            <Gift size={22} color="#059669" />
          </View>
          <View style={styles.offerTextContainer}>
            <AppText style={styles.offerTitle}>Get 5% Extra!</AppText>
            <AppText style={styles.offerSubtitle}>
              Add ₹500 or more and get extra wallet balance.
            </AppText>
          </View>
          <View style={styles.offerBadge}>
            <Sparkles size={11} color="#D97706" />
            <AppText style={styles.offerBadgeText}>Limited Time Offer</AppText>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FIXED BOTTOM CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmAddMoney}
          activeOpacity={0.88}
        >
          <AppText style={styles.confirmButtonText}>
            Add ₹{numericAmount.toLocaleString('en-IN')} to Wallet
          </AppText>
        </TouchableOpacity>

        <View style={styles.securityRow}>
          <ShieldCheck size={14} color="#64748B" />
          <AppText style={styles.securityText}>100% Secure Payments</AppText>
          <AppText style={styles.securityDivider}>|</AppText>
          <AppText style={styles.securitySub}>Powered by </AppText>
          <AppText style={styles.razorpayText}>Razorpay</AppText>
        </View>
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
  balanceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 14,
  },
  balanceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  walletIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  balanceLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#065F46',
  },
  balanceAmount: {
    fontSize: 22,
    fontFamily: Typography.fontFamily.bold,
    color: '#047857',
    marginVertical: 2,
  },
  balanceSubtext: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#059669',
  },
  walletGraphicContainer: {
    width: 60,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  walletGraphic: {
    width: 44,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#A7F3D0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#34D399',
  },
  sparkleTop: {
    position: 'absolute',
    top: 0,
    right: 4,
  },
  sparkleBottom: {
    position: 'absolute',
    bottom: 2,
    left: 2,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 14,
  },
  currencySymbol: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginRight: 8,
  },
  amountTextInput: {
    flex: 1,
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
  suggestedLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginBottom: 10,
  },
  suggestedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  suggestedPill: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestedPillActive: {
    backgroundColor: '#ECFDF5',
    borderColor: '#059669',
  },
  suggestedPillText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#334155',
  },
  suggestedPillTextActive: {
    color: '#059669',
  },
  paymentList: {
    gap: 10,
  },
  paymentMethodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  paymentMethodItemActive: {
    backgroundColor: '#F0FDF4',
    borderColor: '#A7F3D0',
  },
  radioContainer: {
    marginRight: 10,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: '#059669',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#059669',
  },
  methodIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 10,
  },
  methodTextContainer: {
    flex: 1,
  },
  methodName: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  methodSubtext: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 1,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 4,
    marginRight: 6,
  },
  logoMiniBadge: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
  },
  gpayBadge: { backgroundColor: '#E0F2FE' },
  phonepeBadge: { backgroundColor: '#EDE9FE' },
  paytmBadge: { backgroundColor: '#E0F2FE' },
  visaBadge: { backgroundColor: '#DBEAFE' },
  mcBadge: { backgroundColor: '#FEE2E2' },
  rupayBadge: { backgroundColor: '#DCFCE7' },
  amazonBadge: { backgroundColor: '#FEF3C7' },
  mobikwikBadge: { backgroundColor: '#E0E7FF' },
  badgeText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#334155',
  },
  offerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    marginBottom: 14,
  },
  offerIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  offerTextContainer: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#166534',
  },
  offerSubtitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#15803D',
    marginTop: 1,
  },
  offerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  offerBadgeText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#B45309',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 8,
  },
  confirmButton: {
    backgroundColor: '#059669',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  confirmButtonText: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  securityText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  securityDivider: {
    fontSize: 11,
    color: '#CBD5E1',
    marginHorizontal: 4,
  },
  securitySub: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  razorpayText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#2563EB',
  },
});
