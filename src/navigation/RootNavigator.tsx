import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../constants/routes';
import { RootStackParamList } from '../types/navigation';
import { SplashScreen } from '../screens/splash/SplashScreen';
import { Onboarding01Screen } from '../screens/onboarding/Onboarding01Screen';
import { Onboarding02Screen } from '../screens/onboarding/Onboarding02Screen';
import { Onboarding03Screen } from '../screens/onboarding/Onboarding03Screen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { OtpVerificationScreen } from '../screens/auth/OtpVerificationScreen';
import { CreateProfileScreen } from '../screens/auth/CreateProfileScreen';
import { LocationPermissionScreen } from '../screens/location/LocationPermissionScreen';
import { HomeDashboardScreen } from '../screens/home/HomeDashboardScreen';
import { LocationSelectionScreen } from '../screens/location/LocationSelectionScreen';
import { AddNewAddressScreen } from '../screens/location/AddNewAddressScreen';
import { VehicleListScreen } from '../screens/vehicles/VehicleListScreen';
import { AddVehicleScreen } from '../screens/vehicles/AddVehicleScreen';
import { VehicleDetailsScreen } from '../screens/vehicles/VehicleDetailsScreen';
import { ServiceCategoryScreen } from '../screens/services/ServiceCategoryScreen';
import { BikeWashServicesScreen } from '../screens/services/BikeWashServicesScreen';
import { CarWashServicesScreen } from '../screens/services/CarWashServicesScreen';
import { ServiceDetailsScreen } from '../screens/services/ServiceDetailsScreen';
import { AddOnsScreen } from '../screens/services/AddOnsScreen';
import { NearbyWashermenMapScreen } from '../screens/washerman/NearbyWashermenMapScreen';
import { WashermanListViewScreen } from '../screens/washerman/WashermanListViewScreen';
import { WashermanFilterScreen } from '../screens/washerman/WashermanFilterScreen';
import { WashermanProfileScreen } from '../screens/washerman/WashermanProfileScreen';
import { WashermanReviewsScreen } from '../screens/washerman/WashermanReviewsScreen';
import { BookingDetailsScreen } from '../screens/booking/BookingDetailsScreen';
import { ScheduleOptionScreen } from '../screens/booking/ScheduleOptionScreen';
import { CustomerInstructionsScreen } from '../screens/booking/CustomerInstructionsScreen';
import { PriceBreakdownScreen } from '../screens/booking/PriceBreakdownScreen';
import { BookingConfirmationScreen } from '../screens/booking/BookingConfirmationScreen';
import { BookingRequestSentScreen } from '../screens/booking/BookingRequestSentScreen';
import { WaitingForAcceptanceScreen } from '../screens/tracking/WaitingForAcceptanceScreen';
import { BookingAcceptedScreen } from '../screens/tracking/BookingAcceptedScreen';
import { LiveTrackingScreen } from '../screens/tracking/LiveTrackingScreen';
import { WashermanArrivingScreen } from '../screens/tracking/WashermanArrivingScreen';
import { WashermanArrivedScreen } from '../screens/tracking/WashermanArrivedScreen';
import { ServiceStartVerificationScreen } from '../screens/wash/ServiceStartVerificationScreen';
import { BeforeWashPhotosScreen } from '../screens/wash/BeforeWashPhotosScreen';
import { WashInProgressScreen } from '../screens/wash/WashInProgressScreen';
import { ServiceProgressDetailsScreen } from '../screens/wash/ServiceProgressDetailsScreen';
import { AfterWashPhotosScreen } from '../screens/wash/AfterWashPhotosScreen';
import { ServiceCompletionConfirmationScreen } from '../screens/wash/ServiceCompletionConfirmationScreen';
import { PaymentMethodScreen } from '../screens/payment/PaymentMethodScreen';
import { PaymentConfirmationScreen } from '../screens/payment/PaymentConfirmationScreen';
import { PaymentProcessingScreen } from '../screens/payment/PaymentProcessingScreen';
import { PaymentSuccessScreen } from '../screens/payment/PaymentSuccessScreen';
import { PlaceholderScreen } from '../screens/common/PlaceholderScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.SPLASH}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      {/* 001. Splash Screen */}
      <Stack.Screen name={Routes.SPLASH} component={SplashScreen} />

      {/* AUTHENTICATION AND ONBOARDING (002 - 008) */}
      <Stack.Screen name={Routes.ONBOARDING_1} component={Onboarding01Screen} />
      <Stack.Screen name={Routes.ONBOARDING_2} component={Onboarding02Screen} />
      <Stack.Screen name={Routes.ONBOARDING_3} component={Onboarding03Screen} />
      <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={Routes.OTP_VERIFICATION} component={OtpVerificationScreen} />
      <Stack.Screen name={Routes.CREATE_PROFILE} component={CreateProfileScreen} />
      <Stack.Screen name={Routes.LOCATION_PERMISSION} component={LocationPermissionScreen} />

      {/* HOME AND LOCATION (009 - 011) */}
      <Stack.Screen name={Routes.HOME_DASHBOARD} component={HomeDashboardScreen} />
      <Stack.Screen name={Routes.LOCATION_SELECTION} component={LocationSelectionScreen} />
      <Stack.Screen name={Routes.ADD_NEW_ADDRESS} component={AddNewAddressScreen} />

      {/* VEHICLES (012 - 014) */}
      <Stack.Screen name={Routes.VEHICLE_LIST} component={VehicleListScreen} />
      <Stack.Screen name={Routes.ADD_VEHICLE} component={AddVehicleScreen} />
      <Stack.Screen name={Routes.VEHICLE_DETAILS} component={VehicleDetailsScreen} />

      {/* SERVICES (015 - 019) */}
      <Stack.Screen name={Routes.SERVICE_CATEGORY} component={ServiceCategoryScreen} />
      <Stack.Screen name={Routes.BIKE_WASH_SERVICES} component={BikeWashServicesScreen} />
      <Stack.Screen name={Routes.CAR_WASH_SERVICES} component={CarWashServicesScreen} />
      <Stack.Screen name={Routes.SERVICE_DETAILS} component={ServiceDetailsScreen} />
      <Stack.Screen name={Routes.ADD_ONS} component={AddOnsScreen} />

      {/* WASHERMAN DISCOVERY (020 - 024) */}
      <Stack.Screen name={Routes.NEARBY_WASHERMEN_MAP} component={NearbyWashermenMapScreen} />
      <Stack.Screen name={Routes.WASHERMAN_LIST_VIEW} component={WashermanListViewScreen} />
      <Stack.Screen name={Routes.WASHERMAN_FILTER} component={WashermanFilterScreen} />
      <Stack.Screen name={Routes.WASHERMAN_PROFILE} component={WashermanProfileScreen} />
      <Stack.Screen name={Routes.WASHERMAN_REVIEWS} component={WashermanReviewsScreen} />

      {/* BOOKING CREATION (025 - 030) */}
      <Stack.Screen name={Routes.BOOKING_DETAILS} component={BookingDetailsScreen} />
      <Stack.Screen name={Routes.SCHEDULE_OPTION} component={ScheduleOptionScreen} />
      <Stack.Screen name={Routes.CUSTOMER_INSTRUCTIONS} component={CustomerInstructionsScreen} />
      <Stack.Screen name={Routes.PRICE_BREAKDOWN} component={PriceBreakdownScreen} />
      <Stack.Screen name={Routes.BOOKING_CONFIRMATION} component={BookingConfirmationScreen} />
      <Stack.Screen name={Routes.BOOKING_REQUEST_SENT} component={BookingRequestSentScreen} />

      {/* ACCEPTANCE AND TRACKING (031 - 035) */}
      <Stack.Screen name={Routes.WAITING_FOR_ACCEPTANCE} component={WaitingForAcceptanceScreen} />
      <Stack.Screen name={Routes.BOOKING_ACCEPTED} component={BookingAcceptedScreen} />
      <Stack.Screen name={Routes.LIVE_TRACKING} component={LiveTrackingScreen} />
      <Stack.Screen name={Routes.WASHERMAN_ARRIVING} component={WashermanArrivingScreen} />
      <Stack.Screen name={Routes.WASHERMAN_ARRIVED} component={WashermanArrivedScreen} />

      {/* WASH PROCESS (036 - 041) */}
      <Stack.Screen name={Routes.SERVICE_START_VERIFICATION} component={ServiceStartVerificationScreen} />
      <Stack.Screen name={Routes.BEFORE_WASH_PHOTOS} component={BeforeWashPhotosScreen} />
      <Stack.Screen name={Routes.WASH_IN_PROGRESS} component={WashInProgressScreen} />
      <Stack.Screen name={Routes.SERVICE_PROGRESS_DETAILS} component={ServiceProgressDetailsScreen} />
      <Stack.Screen name={Routes.AFTER_WASH_PHOTOS} component={AfterWashPhotosScreen} />
      <Stack.Screen name={Routes.SERVICE_COMPLETION_CONFIRMATION} component={ServiceCompletionConfirmationScreen} />

      {/* PAYMENT AND INVOICE (042 - 047) */}
      <Stack.Screen name={Routes.PAYMENT_METHOD} component={PaymentMethodScreen} />
      <Stack.Screen name={Routes.PAYMENT_CONFIRMATION} component={PaymentConfirmationScreen} />
      <Stack.Screen name={Routes.PAYMENT_PROCESSING} component={PaymentProcessingScreen} />
      <Stack.Screen name={Routes.PAYMENT_SUCCESS} component={PaymentSuccessScreen} />
      <Stack.Screen name={Routes.PAYMENT_FAILED} component={PlaceholderScreen} />
      <Stack.Screen name={Routes.INVOICE} component={PlaceholderScreen} />

      {/* RATING AND COMPLAINTS (048 - 052) */}
      <Stack.Screen name={Routes.RATE_WASHERMAN} component={PlaceholderScreen} />
      <Stack.Screen name={Routes.WRITE_REVIEW} component={PlaceholderScreen} />
      <Stack.Screen name={Routes.BEFORE_AFTER_FEEDBACK} component={PlaceholderScreen} />
      <Stack.Screen name={Routes.REPORT_ISSUE} component={PlaceholderScreen} />
      <Stack.Screen name={Routes.COMPLAINT_TRACKING} component={PlaceholderScreen} />

      {/* BOOKINGS (054 - 057) */}
      <Stack.Screen name={Routes.UPCOMING_BOOKINGS} component={PlaceholderScreen} />
      <Stack.Screen name={Routes.BOOKING_HISTORY} component={PlaceholderScreen} />
      <Stack.Screen name={Routes.BOOKING_VIEW_DETAILS} component={PlaceholderScreen} />
      <Stack.Screen name={Routes.REBOOK_SERVICE} component={PlaceholderScreen} />

      {/* WALLET AND OFFERS (058 - 061) */}
      <Stack.Screen name={Routes.WALLET} component={PlaceholderScreen} />
      <Stack.Screen name={Routes.ADD_MONEY} component={PlaceholderScreen} />
      <Stack.Screen name={Routes.OFFERS_COUPONS} component={PlaceholderScreen} />
      <Stack.Screen name={Routes.SUBSCRIPTION_PLANS} component={PlaceholderScreen} />

      {/* PROFILE AND SUPPORT (063 - 070) */}
      <Stack.Screen name={Routes.CUSTOMER_PROFILE} component={PlaceholderScreen} />
      <Stack.Screen name={Routes.EDIT_PROFILE} component={PlaceholderScreen} />
      <Stack.Screen name={Routes.SAVED_ADDRESSES} component={PlaceholderScreen} />
      <Stack.Screen name={Routes.NOTIFICATIONS} component={PlaceholderScreen} />
      <Stack.Screen name={Routes.HELP_SUPPORT} component={PlaceholderScreen} />
      <Stack.Screen name={Routes.SUPPORT_CHAT} component={PlaceholderScreen} />
      <Stack.Screen name={Routes.TERMS_PRIVACY} component={PlaceholderScreen} />
      <Stack.Screen name={Routes.SETTINGS} component={PlaceholderScreen} />
    </Stack.Navigator>
  );
};
