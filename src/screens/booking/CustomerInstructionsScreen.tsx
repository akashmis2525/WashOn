import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  MessageSquare,
  Phone,
  ParkingCircle,
  Droplet,
  Ban,
  Radio,
  FileText,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';
import { useBookingStore } from '../../store/bookingStore';

type CustomerInstructionsNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.CUSTOMER_INSTRUCTIONS
>;

interface InstructionToggleItem {
  id: string;
  title: string;
  description: string;
  icon: any;
  iconBg: string;
  iconColor: string;
  defaultValue: boolean;
}

const INSTRUCTION_ITEMS: InstructionToggleItem[] = [
  {
    id: 'call_before_arrival',
    title: 'Call before arrival',
    description: 'Please call me before reaching the location.',
    icon: Phone,
    iconBg: '#ECFDF5',
    iconColor: '#059669',
    defaultValue: true,
  },
  {
    id: 'inside_parking',
    title: 'Vehicle is inside parking',
    description: 'My vehicle is inside a gated parking area.',
    icon: ParkingCircle,
    iconBg: '#EFF6FF',
    iconColor: '#2563EB',
    defaultValue: true,
  },
  {
    id: 'low_water',
    title: 'Use low-water wash',
    description: 'Please use minimal water / eco-friendly wash.',
    icon: Droplet,
    iconBg: '#ECFDF5',
    iconColor: '#059669',
    defaultValue: true,
  },
  {
    id: 'do_not_move',
    title: 'Do not move vehicle',
    description: 'Please do not move my vehicle from the spot.',
    icon: Ban,
    iconBg: '#FEF2F2',
    iconColor: '#DC2626',
    defaultValue: false,
  },
  {
    id: 'contactless',
    title: 'Contactless service',
    description: 'Complete the service without direct contact.',
    icon: Radio,
    iconBg: '#FAF5FF',
    iconColor: '#9333EA',
    defaultValue: true,
  },
  {
    id: 'other_instructions',
    title: 'Other special instructions',
    description: 'Add any other important details below.',
    icon: FileText,
    iconBg: '#FFFBEB',
    iconColor: '#D97706',
    defaultValue: true,
  },
];

export const CustomerInstructionsScreen: React.FC = () => {
  const navigation = useNavigation<CustomerInstructionsNavProp>();
  const { setDraftInstructions } = useBookingStore();

  const [toggles, setToggles] = useState<Record<string, boolean>>({
    call_before_arrival: true,
    inside_parking: true,
    low_water: true,
    do_not_move: false,
    contactless: true,
    other_instructions: true,
  });

  const [customNotes, setCustomNotes] = useState<string>('');

  const toggleSwitch = (id: string) => {
    setToggles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSave = () => {
    const activeInstructions: string[] = [];
    if (toggles.call_before_arrival) activeInstructions.push('Call before arrival');
    if (toggles.inside_parking) activeInstructions.push('Vehicle inside gated parking');
    if (toggles.low_water) activeInstructions.push('Eco low-water wash preferred');
    if (toggles.do_not_move) activeInstructions.push('Do not move vehicle');
    if (toggles.contactless) activeInstructions.push('Contactless service');
    if (customNotes.trim()) activeInstructions.push(customNotes.trim());

    setDraftInstructions(activeInstructions.join(' • '));
    navigation.navigate(Routes.PRICE_BREAKDOWN);
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
          <AppText style={styles.headerTitle}>Customer Instructions</AppText>
          <AppText style={styles.headerSubtitle}>
            Help us serve you better
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

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TOP BANNER */}
        <View style={styles.bannerCard}>
          <View style={styles.bannerIconContainer}>
            <MessageSquare size={20} color="#059669" />
          </View>
          <View style={styles.bannerTextContainer}>
            <AppText style={styles.bannerTitle}>Add special instructions</AppText>
            <AppText style={styles.bannerDesc}>
              Let your washerman know about any specific requirements for your booking.
            </AppText>
          </View>
        </View>

        {/* INSTRUCTIONS LIST */}
        <View style={styles.instructionList}>
          {INSTRUCTION_ITEMS.map((item) => {
            const IconComponent = item.icon;
            const isEnabled = !!toggles[item.id];

            return (
              <View key={item.id} style={styles.toggleCard}>
                <View style={[styles.toggleIconContainer, { backgroundColor: item.iconBg }]}>
                  <IconComponent size={20} color={item.iconColor} />
                </View>

                <View style={styles.toggleTextContainer}>
                  <AppText style={styles.toggleTitle}>{item.title}</AppText>
                  <AppText style={styles.toggleDesc}>{item.description}</AppText>
                </View>

                <Switch
                  trackColor={{ false: '#E5E7EB', true: '#10B981' }}
                  thumbColor={'#FFFFFF'}
                  ios_backgroundColor="#E5E7EB"
                  onValueChange={() => toggleSwitch(item.id)}
                  value={isEnabled}
                />
              </View>
            );
          })}
        </View>

        {/* SPECIAL INSTRUCTIONS TEXTAREA */}
        {toggles.other_instructions && (
          <View style={styles.textInputCard}>
            <View style={styles.textInputHeader}>
              <AppText style={styles.textInputLabel}>Special Instructions (Optional)</AppText>
              <AppText style={styles.charCounter}>{customNotes.length}/300</AppText>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="E.g. Use soft cloth, avoid strong chemicals, gate code 1234, ring the bell, etc."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              maxLength={300}
              value={customNotes}
              onChangeText={setCustomNotes}
              textAlignVertical="top"
            />
          </View>
        )}

        {/* PRIVACY & SAFETY CARD */}
        <View style={styles.safeCard}>
          <ShieldCheck size={22} color="#059669" style={{ marginTop: 2 }} />
          <View style={styles.safeTextContainer}>
            <AppText style={styles.safeTitle}>Your instructions are safe with us</AppText>
            <AppText style={styles.safeDesc}>
              These details will be shared only with the assigned washerman for this booking.
            </AppText>
          </View>
        </View>
      </ScrollView>

      {/* STICKY BOTTOM BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <AppText style={styles.saveButtonText}>Save Instructions</AppText>
          <ArrowRight size={18} color="#111827" style={{ marginLeft: Spacing.xs }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 2,
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
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 6,
  },
  logoText: {
    fontSize: 12,
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
  logoTextAccent: {
    color: '#D97706',
  },
  logoSubtext: {
    fontSize: 6,
    fontFamily: FontFamily.bold,
    color: '#6B7280',
    letterSpacing: 0.5,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: 100,
  },
  bannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  bannerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: '#065F46',
  },
  bannerDesc: {
    fontSize: 11,
    fontFamily: FontFamily.regular,
    color: '#047857',
    marginTop: 2,
    lineHeight: 16,
  },
  instructionList: {
    gap: Spacing.sm,
  },
  toggleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...Shadows.sm,
  },
  toggleIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  toggleTextContainer: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  toggleTitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.bold,
    color: Colors.textPrimary,
  },
  toggleDesc: {
    fontSize: 11,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  textInputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: Spacing.sm,
    ...Shadows.sm,
  },
  textInputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  textInputLabel: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
  },
  charCounter: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: Colors.textTertiary,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.regular,
    color: Colors.textPrimary,
    minHeight: 80,
    backgroundColor: '#F9FAFB',
  },
  safeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ECFDF5',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginTop: Spacing.lg,
  },
  safeTextContainer: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  safeTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.bold,
    color: '#065F46',
  },
  safeDesc: {
    fontSize: 11,
    fontFamily: FontFamily.regular,
    color: '#047857',
    marginTop: 2,
    lineHeight: 16,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    ...Shadows.md,
  },
  saveButton: {
    backgroundColor: '#FFB800',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: BorderRadius.full,
    ...Shadows.sm,
  },
  saveButtonText: {
    fontSize: Typography.fontSize.base,
    fontFamily: FontFamily.bold,
    color: '#111827',
  },
});
