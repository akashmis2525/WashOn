import { Routes } from '../constants/routes';
import { Vehicle } from './vehicle';
import { WashService } from './service';
import { Washerman } from './washerman';
import { Booking } from './booking';

export type RootStackParamList = {
  [Routes.SPLASH]: undefined;
  [Routes.AUTH_STACK]: undefined;
  [Routes.MAIN_TABS]: undefined;
  [Routes.BOOKING_STACK]: { bookingId?: string };
  [Routes.PROFILE_STACK]: undefined;

  // Individual direct screens accessible
  [Routes.ONBOARDING_1]: undefined;
  [Routes.ONBOARDING_2]: undefined;
  [Routes.ONBOARDING_3]: undefined;
  [Routes.LOGIN]: undefined;
  [Routes.OTP_VERIFICATION]: { phoneNumber: string };
  [Routes.CREATE_PROFILE]: { phoneNumber: string };
  [Routes.LOCATION_PERMISSION]: undefined;

  [Routes.HOME_DASHBOARD]: undefined;
  [Routes.LOCATION_SELECTION]: undefined;
  [Routes.ADD_NEW_ADDRESS]: { editAddressId?: string };

  [Routes.VEHICLE_LIST]: undefined;
  [Routes.ADD_VEHICLE]: { editVehicleId?: string };
  [Routes.VEHICLE_DETAILS]: { vehicleId: string };

  [Routes.SERVICE_CATEGORY]: undefined;
  [Routes.BIKE_WASH_SERVICES]: undefined;
  [Routes.CAR_WASH_SERVICES]: undefined;
  [Routes.SERVICE_DETAILS]: { serviceId: string };
  [Routes.ADD_ONS]: { serviceId: string };

  [Routes.NEARBY_WASHERMEN_MAP]: undefined;
  [Routes.WASHERMAN_LIST_VIEW]: undefined;
  [Routes.WASHERMAN_FILTER]: undefined;
  [Routes.WASHERMAN_PROFILE]: { washermanId: string };
  [Routes.WASHERMAN_REVIEWS]: { washermanId: string };

  [Routes.BOOKING_DETAILS]: undefined;
  [Routes.SCHEDULE_OPTION]: undefined;
  [Routes.CUSTOMER_INSTRUCTIONS]: undefined;
  [Routes.PRICE_BREAKDOWN]: undefined;
  [Routes.BOOKING_CONFIRMATION]: undefined;
  [Routes.BOOKING_REQUEST_SENT]: { bookingId: string };

  [Routes.WAITING_FOR_ACCEPTANCE]: { bookingId: string };
  [Routes.BOOKING_ACCEPTED]: { bookingId: string };
  [Routes.LIVE_TRACKING]: { bookingId: string };
  [Routes.WASHERMAN_ARRIVING]: { bookingId: string };
  [Routes.WASHERMAN_ARRIVED]: { bookingId: string };

  [Routes.SERVICE_START_VERIFICATION]: { bookingId: string };
  [Routes.BEFORE_WASH_PHOTOS]: { bookingId: string };
  [Routes.WASH_IN_PROGRESS]: { bookingId: string };
  [Routes.SERVICE_PROGRESS_DETAILS]: { bookingId: string };
  [Routes.AFTER_WASH_PHOTOS]: { bookingId: string };
  [Routes.SERVICE_COMPLETION_CONFIRMATION]: { bookingId: string };

  [Routes.PAYMENT_METHOD]: { bookingId: string };
  [Routes.PAYMENT_CONFIRMATION]: { bookingId: string };
  [Routes.PAYMENT_PROCESSING]: { bookingId: string; method: string };
  [Routes.PAYMENT_SUCCESS]: { bookingId: string };
  [Routes.PAYMENT_FAILED]: { bookingId: string; error?: string };
  [Routes.INVOICE]: { bookingId: string };

  [Routes.RATE_WASHERMAN]: { bookingId: string };
  [Routes.WRITE_REVIEW]: { bookingId: string };
  [Routes.BEFORE_AFTER_FEEDBACK]: { bookingId: string };
  [Routes.REPORT_ISSUE]: { bookingId: string };
  [Routes.COMPLAINT_TRACKING]: { complaintId: string };
  [Routes.COMPLAINT_DETAILS]: { complaintId: string };

  [Routes.UPCOMING_BOOKINGS]: undefined;
  [Routes.BOOKING_HISTORY]: undefined;
  [Routes.BOOKING_VIEW_DETAILS]: { bookingId: string };
  [Routes.REBOOK_SERVICE]: { bookingId: string };

  [Routes.WALLET]: undefined;
  [Routes.ADD_MONEY]: undefined;
  [Routes.OFFERS_COUPONS]: undefined;
  [Routes.SUBSCRIPTION_PLANS]: undefined;
  [Routes.SUBSCRIPTION_DETAILS]: { planId?: string };

  [Routes.CUSTOMER_PROFILE]: undefined;
  [Routes.EDIT_PROFILE]: undefined;
  [Routes.SAVED_ADDRESSES]: undefined;
  [Routes.NOTIFICATIONS]: undefined;
  [Routes.HELP_SUPPORT]: undefined;
  [Routes.SUPPORT_CHAT]: undefined;
  [Routes.TERMS_PRIVACY]: { type: 'terms' | 'privacy' };
  [Routes.SETTINGS]: undefined;

  // Vendor screens
  [Routes.VENDOR_SPLASH]: undefined;
  [Routes.VENDOR_ONBOARDING_1]: undefined;
  [Routes.VENDOR_LOGIN]: undefined;
};
