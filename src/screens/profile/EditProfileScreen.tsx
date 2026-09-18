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
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Camera,
  Sparkles,
  CheckCircle2,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width } = Dimensions.get('window');

type EditProfileNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.EDIT_PROFILE
>;

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<EditProfileNavProp>();

  const [fullName, setFullName] = useState<string>('Aakash Mishra');
  const [email, setEmail] = useState<string>('mishraakash576@gmail.com');
  const [mobileNumber] = useState<string>('+91 81206 52523');
  const [dob, setDob] = useState<string>('21 Dec 1997');
  const [location, setLocation] = useState<string>('Indore, Madhya Pradesh');

  const handleChangePhoto = () => {
    Alert.alert('Change Photo', 'Select image from Gallery or take a new photo with Camera.');
  };

  const handleSaveChanges = () => {
    if (!fullName.trim()) {
      Alert.alert('Validation Error', 'Full Name cannot be empty.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    Alert.alert('Success', 'Profile updated successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() },
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
          <AppText style={styles.headerTitle}>Edit Profile</AppText>
          <AppText style={styles.headerSubtitle}>
            Update your information
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
            <View style={styles.bannerSparkleCircle}>
              <Sparkles size={18} color="#059669" />
            </View>
            <View style={styles.bannerTextContainer}>
              <AppText style={styles.bannerTitle}>
                Keep your profile updated
              </AppText>
              <AppText style={styles.bannerSubtitle}>
                A better experience starts with the right details.
              </AppText>
            </View>
          </View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300&auto=format&fit=crop&q=80',
            }}
            style={styles.bannerCarImage}
            resizeMode="cover"
          />
        </View>

        {/* PROFILE PHOTO SECTION */}
        <View style={styles.photoSectionCard}>
          <AppText style={styles.sectionLabel}>Profile Photo</AppText>
          <View style={styles.photoCenter}>
            <TouchableOpacity
              style={styles.avatarWrapper}
              onPress={handleChangePhoto}
              activeOpacity={0.8}
            >
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
                }}
                style={styles.avatarImage}
              />
              <View style={styles.cameraBadge}>
                <Camera size={14} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
            <AppText style={styles.tapToChange}>Tap to change photo</AppText>
            <AppText style={styles.photoFormatInfo}>JPG, PNG up to 5 MB</AppText>
          </View>
        </View>

        {/* FORM FIELDS */}
        <View style={styles.formCard}>
          {/* FULL NAME */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.fieldLabel}>Full Name</AppText>
            <View style={styles.inputContainer}>
              <User size={18} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter full name"
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>

          {/* EMAIL */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.fieldLabel}>Email Address</AppText>
            <View style={styles.inputContainer}>
              <Mail size={18} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email address"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* MOBILE NUMBER (LOCKED/VERIFIED) */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.fieldLabel}>Mobile Number</AppText>
            <View style={[styles.inputContainer, styles.inputContainerDisabled]}>
              <Phone size={18} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={[styles.textInput, { color: '#64748B' }]}
                value={mobileNumber}
                editable={false}
              />
              <View style={styles.verifiedBadge}>
                <AppText style={styles.verifiedBadgeText}>Verified</AppText>
              </View>
            </View>
            <AppText style={styles.fieldHelper}>
              Mobile number cannot be changed
            </AppText>
          </View>

          {/* DATE OF BIRTH (OPTIONAL) */}
          <View style={styles.fieldGroup}>
            <AppText style={styles.fieldLabel}>
              Date of Birth <AppText style={styles.optionalText}>(Optional)</AppText>
            </AppText>
            <View style={styles.inputContainer}>
              <Calendar size={18} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                value={dob}
                onChangeText={setDob}
                placeholder="DD Month YYYY"
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>

          {/* LOCATION (OPTIONAL) */}
          <View style={[styles.fieldGroup, { marginBottom: 0 }]}>
            <AppText style={styles.fieldLabel}>
              Location <AppText style={styles.optionalText}>(Optional)</AppText>
            </AppText>
            <View style={styles.inputContainer}>
              <MapPin size={18} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                value={location}
                onChangeText={setLocation}
                placeholder="City, State"
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FIXED BOTTOM SAVE BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveChanges}
          activeOpacity={0.88}
        >
          <AppText style={styles.saveButtonText}>Save Changes</AppText>
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
  bannerSparkleCircle: {
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
  bannerCarImage: {
    width: 65,
    height: 45,
    borderRadius: 8,
  },
  photoSectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 12,
  },
  photoCenter: {
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  tapToChange: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  photoFormatInfo: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
    marginTop: 2,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  fieldGroup: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
    marginBottom: 6,
  },
  optionalText: {
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    height: 44,
  },
  inputContainerDisabled: {
    backgroundColor: '#F1F5F9',
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    fontFamily: Typography.fontFamily.medium,
    color: '#0F172A',
    padding: 0,
  },
  verifiedBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  verifiedBadgeText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  fieldHelper: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
    marginTop: 4,
    marginLeft: 2,
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
  saveButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
});
