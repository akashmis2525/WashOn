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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  MapPin,
  Home,
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  MoreVertical,
  ChevronRight,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width } = Dimensions.get('window');

type SavedAddressesNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.SAVED_ADDRESSES
>;

interface AddressItem {
  id: string;
  type: 'home' | 'office' | 'other' | 'parents';
  title: string;
  isDefault?: boolean;
  address: string;
}

const INITIAL_ADDRESSES: AddressItem[] = [
  {
    id: 'addr_1',
    type: 'home',
    title: 'Home',
    isDefault: true,
    address: '123, Scheme 78, Vijay Nagar, Indore, Madhya Pradesh – 452010',
  },
  {
    id: 'addr_2',
    type: 'office',
    title: 'Office',
    address: 'Tech Park, Rau, Indore, Madhya Pradesh – 453331',
  },
  {
    id: 'addr_3',
    type: 'other',
    title: 'Other',
    address: '56, Kanadia Road, Indore, Madhya Pradesh – 452016',
  },
  {
    id: 'addr_4',
    type: 'parents',
    title: 'Parents Home',
    address: 'Near Bengali Square, Indore, Madhya Pradesh – 452001',
  },
];

export const SavedAddressesScreen: React.FC = () => {
  const navigation = useNavigation<SavedAddressesNavProp>();
  const [addresses, setAddresses] = useState<AddressItem[]>(INITIAL_ADDRESSES);

  const handleAddNew = () => {
    navigation.navigate(Routes.ADD_NEW_ADDRESS as never);
  };

  const handleEdit = (item: AddressItem) => {
    Alert.alert('Edit Address', `Editing "${item.title}"`);
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Address', 'Are you sure you want to remove this address?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setAddresses((prev) => prev.filter((a) => a.id !== id));
        },
      },
    ]);
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
          <AppText style={styles.headerTitle}>Saved Addresses</AppText>
          <AppText style={styles.headerSubtitle}>
            Manage your saved addresses
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
        {/* BANNER */}
        <View style={styles.banner}>
          <View style={styles.bannerLeft}>
            <View style={styles.bannerIconCircle}>
              <MapPin size={20} color="#059669" />
            </View>
            <View style={styles.bannerTextContainer}>
              <AppText style={styles.bannerTitle}>
                Add your addresses for faster booking
              </AppText>
              <AppText style={styles.bannerSubtitle}>
                Save time and get quick service at your preferred locations.
              </AppText>
            </View>
          </View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=300&auto=format&fit=crop&q=80',
            }}
            style={styles.bannerMapImage}
            resizeMode="cover"
          />
        </View>

        {/* ADDRESS LIST */}
        <View style={styles.addressListContainer}>
          {addresses.map((item) => {
            const isHome = item.type === 'home';
            const isOffice = item.type === 'office';
            const isOther = item.type === 'other';
            const isParents = item.type === 'parents';

            return (
              <View
                key={item.id}
                style={[
                  styles.addressCard,
                  isOther && styles.addressCardOther,
                ]}
              >
                <View
                  style={[
                    styles.iconCircle,
                    isHome && styles.homeBg,
                    isOffice && styles.officeBg,
                    isOther && styles.otherBg,
                    isParents && styles.parentsBg,
                  ]}
                >
                  {isHome && <Home size={18} color="#059669" />}
                  {isOffice && <Briefcase size={18} color="#2563EB" />}
                  {isOther && <MapPin size={18} color="#EA580C" />}
                  {isParents && <MapPin size={18} color="#7C3AED" />}
                </View>

                <View style={styles.cardContent}>
                  <View style={styles.cardTitleRow}>
                    <AppText style={styles.cardTitle}>{item.title}</AppText>
                    {item.isDefault && (
                      <View style={styles.defaultBadge}>
                        <AppText style={styles.defaultBadgeText}>Default</AppText>
                      </View>
                    )}
                  </View>

                  <View style={styles.addressTextRow}>
                    <MapPin size={12} color="#94A3B8" style={{ marginTop: 2, marginRight: 4 }} />
                    <AppText style={styles.addressText} numberOfLines={2}>
                      {item.address}
                    </AppText>
                  </View>
                </View>

                {/* ACTIONS */}
                <View style={styles.actionsColumn}>
                  <TouchableOpacity hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
                    <MoreVertical size={16} color="#94A3B8" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleEdit(item)}
                    activeOpacity={0.7}
                  >
                    <Edit2 size={12} color="#059669" />
                    <AppText style={styles.editActionText}>Edit</AppText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleDelete(item.id)}
                    activeOpacity={0.7}
                  >
                    <Trash2 size={12} color="#EF4444" />
                    <AppText style={styles.deleteActionText}>Delete</AppText>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        {/* ADD NEW ADDRESS CARD */}
        <TouchableOpacity
          style={styles.addAddressCard}
          onPress={handleAddNew}
          activeOpacity={0.8}
        >
          <View style={styles.addIconCircle}>
            <Plus size={18} color="#059669" />
          </View>
          <View style={styles.addTextContainer}>
            <AppText style={styles.addTitle}>Add New Address</AppText>
            <AppText style={styles.addSub}>
              Save a new address for quick access
            </AppText>
          </View>
          <ChevronRight size={18} color="#059669" />
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 14,
    overflow: 'hidden',
  },
  bannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bannerIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  bannerTextContainer: {
    flex: 1,
    paddingRight: 6,
  },
  bannerTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  bannerSubtitle: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#047857',
    marginTop: 2,
    lineHeight: 15,
  },
  bannerMapImage: {
    width: 65,
    height: 45,
    borderRadius: 8,
  },
  addressListContainer: {
    gap: 12,
    marginBottom: 14,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  addressCardOther: {
    backgroundColor: '#FFFDF7',
    borderColor: '#FEF3C7',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  homeBg: { backgroundColor: '#ECFDF5' },
  officeBg: { backgroundColor: '#EFF6FF' },
  otherBg: { backgroundColor: '#FFEDD5' },
  parentsBg: { backgroundColor: '#F3E8FF' },
  cardContent: {
    flex: 1,
    paddingRight: 8,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  defaultBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  defaultBadgeText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#059669',
  },
  addressTextRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    lineHeight: 16,
    flex: 1,
  },
  actionsColumn: {
    alignItems: 'flex-end',
    gap: 6,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingVertical: 2,
  },
  editActionText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#059669',
  },
  deleteActionText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#EF4444',
  },
  addAddressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  addIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  addTextContainer: {
    flex: 1,
  },
  addTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  addSub: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#047857',
    marginTop: 1,
  },
});
