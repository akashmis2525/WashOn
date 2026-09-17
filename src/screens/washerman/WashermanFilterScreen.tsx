import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  X,
  MapPin,
  Star,
  CircleDollarSign,
  Clock,
  Bike,
  Car,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, Typography } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';
import { AppText } from '../../components/common/AppText';

const { width } = Dimensions.get('window');

type FilterNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.WASHERMAN_FILTER
>;

export const WashermanFilterScreen: React.FC = () => {
  const navigation = useNavigation<FilterNavigationProp>();

  const [selectedDistance, setSelectedDistance] = useState('5 km');
  const [selectedRating, setSelectedRating] = useState('Any');
  const [selectedPrice, setSelectedPrice] = useState('Any');
  const [fastestArrival, setFastestArrival] = useState(true);
  const [bikeSpecialist, setBikeSpecialist] = useState(true);
  const [carSpecialist, setCarSpecialist] = useState(false);
  const [availableNow, setAvailableNow] = useState(true);

  const distanceOptions = ['1 km', '2 km', '5 km', '10 km', '20 km'];
  const ratingOptions = ['Any', '3+', '4+', '4.5+', '5'];
  const priceOptions = ['Any', '₹0 - ₹100', '₹100 - ₹200', '₹200 - ₹300', '₹300 - ₹500'];

  const handleReset = () => {
    setSelectedDistance('5 km');
    setSelectedRating('Any');
    setSelectedPrice('Any');
    setFastestArrival(true);
    setBikeSpecialist(true);
    setCarSpecialist(false);
    setAvailableNow(true);
  };

  const handleApply = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <X size={22} color={Colors.black} />
        </TouchableOpacity>

        <AppText style={styles.headerTitle}>Filter Washermen</AppText>

        <TouchableOpacity
          onPress={handleReset}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <AppText style={styles.resetText}>Reset</AppText>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AppText style={styles.subHeading}>
          Find the perfect professional for your needs
        </AppText>

        {/* 1. Distance Block */}
        <View style={styles.filterSection}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.sectionIconCircle, { backgroundColor: '#DCFCE7' }]}>
              <MapPin size={16} color="#059669" />
            </View>
            <View style={styles.sectionTitleBlock}>
              <AppText style={styles.sectionTitle}>Distance</AppText>
              <AppText style={styles.sectionSub}>Show washermen within</AppText>
            </View>
            <AppText style={styles.selectedValueBadge}>{selectedDistance}</AppText>
          </View>

          {/* Slider Simulation Bar */}
          <View style={styles.sliderTrack}>
            <View style={[styles.sliderFill, { width: '50%' }]} />
            <View style={[styles.sliderThumb, { left: '48%' }]} />
          </View>

          {/* Distance Option Pills */}
          <View style={styles.pillsRow}>
            {distanceOptions.map((opt) => {
              const isSelected = selectedDistance === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.optionPill, isSelected && styles.optionPillSelected]}
                  onPress={() => setSelectedDistance(opt)}
                  activeOpacity={0.8}
                >
                  <AppText
                    style={[
                      styles.optionPillText,
                      isSelected && styles.optionPillTextSelected,
                    ]}
                  >
                    {opt}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 2. Rating Block */}
        <View style={styles.filterSection}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.sectionIconCircle, { backgroundColor: '#FEF3C7' }]}>
              <Star size={16} color="#D97706" />
            </View>
            <View style={styles.sectionTitleBlock}>
              <AppText style={styles.sectionTitle}>Rating</AppText>
              <AppText style={styles.sectionSub}>Minimum rating</AppText>
            </View>
          </View>

          {/* Rating Option Pills */}
          <View style={styles.pillsRow}>
            {ratingOptions.map((opt) => {
              const isSelected = selectedRating === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.optionPill, isSelected && styles.optionPillSelected]}
                  onPress={() => setSelectedRating(opt)}
                  activeOpacity={0.8}
                >
                  {opt !== 'Any' && (
                    <Star
                      size={12}
                      color={isSelected ? '#059669' : '#D97706'}
                      fill={isSelected ? '#059669' : '#D97706'}
                      style={{ marginRight: 3 }}
                    />
                  )}
                  <AppText
                    style={[
                      styles.optionPillText,
                      isSelected && styles.optionPillTextSelected,
                    ]}
                  >
                    {opt}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 3. Price Block */}
        <View style={styles.filterSection}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.sectionIconCircle, { backgroundColor: '#EDE9FE' }]}>
              <CircleDollarSign size={16} color="#7C3AED" />
            </View>
            <View style={styles.sectionTitleBlock}>
              <AppText style={styles.sectionTitle}>Price</AppText>
              <AppText style={styles.sectionSub}>Starting price range</AppText>
            </View>
            <AppText style={styles.selectedValueBadge}>₹0 - ₹500</AppText>
          </View>

          {/* Dual Range Slider Simulation Bar */}
          <View style={styles.sliderTrack}>
            <View style={[styles.sliderFill, { left: '20%', width: '45%' }]} />
            <View style={[styles.sliderThumb, { left: '18%' }]} />
            <View style={[styles.sliderThumb, { left: '63%' }]} />
          </View>

          {/* Price Option Pills */}
          <View style={styles.pillsRow}>
            {priceOptions.map((opt) => {
              const isSelected = selectedPrice === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.optionPill, isSelected && styles.optionPillSelected]}
                  onPress={() => setSelectedPrice(opt)}
                  activeOpacity={0.8}
                >
                  <AppText
                    style={[
                      styles.optionPillText,
                      isSelected && styles.optionPillTextSelected,
                    ]}
                  >
                    {opt}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 4. Fastest Arrival Toggle */}
        <View style={styles.toggleRowCard}>
          <View style={[styles.sectionIconCircle, { backgroundColor: '#E0F2FE' }]}>
            <Clock size={16} color="#0284C7" />
          </View>
          <View style={styles.toggleInfoBlock}>
            <AppText style={styles.toggleTitle}>Fastest arrival</AppText>
            <AppText style={styles.toggleSubtitle}>
              Show washermen who can arrive quickly
            </AppText>
          </View>
          <Switch
            value={fastestArrival}
            onValueChange={setFastestArrival}
            trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* 5. Specialists Row */}
        <View style={styles.specialistsRow}>
          {/* Bike Specialist */}
          <View style={styles.specialistCard}>
            <View style={[styles.sectionIconCircle, { backgroundColor: '#DCFCE7' }]}>
              <Bike size={16} color="#059669" />
            </View>
            <View style={{ flex: 1 }}>
              <AppText style={styles.toggleTitle}>Bike specialist</AppText>
              <AppText style={styles.toggleSubtitle}>
                Show only bike washing experts
              </AppText>
            </View>
            <Switch
              value={bikeSpecialist}
              onValueChange={setBikeSpecialist}
              trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Car Specialist */}
          <View style={styles.specialistCard}>
            <View style={[styles.sectionIconCircle, { backgroundColor: '#E0F2FE' }]}>
              <Car size={16} color="#0284C7" />
            </View>
            <View style={{ flex: 1 }}>
              <AppText style={styles.toggleTitle}>Car specialist</AppText>
              <AppText style={styles.toggleSubtitle}>
                Show only car washing experts
              </AppText>
            </View>
            <Switch
              value={carSpecialist}
              onValueChange={setCarSpecialist}
              trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* 6. Available Now Toggle */}
        <View style={styles.toggleRowCard}>
          <View style={[styles.sectionIconCircle, { backgroundColor: '#DCFCE7' }]}>
            <CheckCircle2 size={16} color="#22C55E" />
          </View>
          <View style={styles.toggleInfoBlock}>
            <AppText style={styles.toggleTitle}>Available now</AppText>
            <AppText style={styles.toggleSubtitle}>
              Show only washermen who are currently online
            </AppText>
          </View>
          <Switch
            value={availableNow}
            onValueChange={setAvailableNow}
            trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </ScrollView>

      {/* Bottom Apply Filters Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApply}
          activeOpacity={0.88}
        >
          <AppText style={styles.applyButtonText}>Apply Filters</AppText>
          <View style={styles.resultsBadge}>
            <AppText style={styles.resultsBadgeText}>(23 results)</AppText>
          </View>
          <ArrowRight size={18} color={Colors.black} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.lg,
    color: Colors.gray900,
  },
  resetText: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.sm,
    color: '#0284C7',
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 90,
  },
  subHeading: {
    fontFamily: FontFamily.regular,
    fontSize: Typography.size.xs,
    color: Colors.gray600,
    marginBottom: Spacing.md,
  },
  filterSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  sectionIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  sectionTitleBlock: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
  },
  sectionSub: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: Colors.gray500,
  },
  selectedValueBadge: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.xs,
    color: Colors.gray800,
  },
  sliderTrack: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    position: 'relative',
    marginVertical: Spacing.sm,
  },
  sliderFill: {
    position: 'absolute',
    height: 6,
    backgroundColor: '#22C55E',
    borderRadius: 3,
  },
  sliderThumb: {
    position: 'absolute',
    top: -6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    ...Shadows.sm,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  optionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: BorderRadius.full,
  },
  optionPillSelected: {
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  optionPillText: {
    fontFamily: FontFamily.medium,
    fontSize: Typography.size.xs,
    color: Colors.gray700,
  },
  optionPillTextSelected: {
    fontFamily: FontFamily.bold,
    color: '#065F46',
  },
  toggleRowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  toggleInfoBlock: {
    flex: 1,
  },
  toggleTitle: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.sm,
    color: Colors.gray900,
  },
  toggleSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: Colors.gray500,
    marginTop: 1,
  },
  specialistsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  specialistCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    padding: Spacing.sm,
    ...Shadows.sm,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    ...Shadows.lg,
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    backgroundColor: '#FFC107',
    borderRadius: BorderRadius.full,
    gap: 6,
    ...Shadows.sm,
  },
  applyButtonText: {
    fontFamily: FontFamily.bold,
    fontSize: Typography.size.md,
    color: Colors.black,
  },
  resultsBadge: {
    marginRight: 2,
  },
  resultsBadgeText: {
    fontFamily: FontFamily.regular,
    fontSize: Typography.size.xs,
    color: Colors.gray800,
  },
});
