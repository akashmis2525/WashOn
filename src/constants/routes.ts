/**
 * WashOn Complete Screen Routes Registry (Numbered 001 - 070)
 */
export const Routes = {
  // AUTHENTICATION AND ONBOARDING (001 - 008)
  SPLASH: '001_Splash',
  ONBOARDING_1: '002_Onboarding1',
  ONBOARDING_2: '003_Onboarding2',
  ONBOARDING_3: '004_Onboarding3',
  LOGIN: '005_Login',
  OTP_VERIFICATION: '006_OtpVerification',
  CREATE_PROFILE: '007_CreateProfile',
  LOCATION_PERMISSION: '008_LocationPermission',

  // HOME AND LOCATION (009 - 011)
  HOME_DASHBOARD: '009_HomeDashboard',
  LOCATION_SELECTION: '010_LocationSelection',
  ADD_NEW_ADDRESS: '011_AddNewAddress',

  // VEHICLES (012 - 014)
  VEHICLE_LIST: '012_VehicleList',
  ADD_VEHICLE: '013_AddVehicle',
  VEHICLE_DETAILS: '014_VehicleDetails',

  // SERVICES (015 - 019)
  SERVICE_CATEGORY: '015_ServiceCategory',
  BIKE_WASH_SERVICES: '016_BikeWashServices',
  CAR_WASH_SERVICES: '017_CarWashServices',
  SERVICE_DETAILS: '018_ServiceDetails',
  ADD_ONS: '019_AddOns',

  // WASHERMAN DISCOVERY (020 - 024)
  NEARBY_WASHERMEN_MAP: '020_NearbyWashermenMap',
  WASHERMAN_LIST_VIEW: '021_WashermanListView',
  WASHERMAN_FILTER: '022_WashermanFilter',
  WASHERMAN_PROFILE: '023_WashermanProfile',
  WASHERMAN_REVIEWS: '024_WashermanReviews',

  // BOOKING CREATION (025 - 030)
  BOOKING_DETAILS: '025_BookingDetails',
  SCHEDULE_OPTION: '026_ScheduleOption',
  CUSTOMER_INSTRUCTIONS: '027_CustomerInstructions',
  PRICE_BREAKDOWN: '028_PriceBreakdown',
  BOOKING_CONFIRMATION: '029_BookingConfirmation',
  BOOKING_REQUEST_SENT: '030_BookingRequestSent',

  // ACCEPTANCE AND TRACKING (031 - 035)
  WAITING_FOR_ACCEPTANCE: '031_WaitingForAcceptance',
  BOOKING_ACCEPTED: '032_BookingAccepted',
  LIVE_TRACKING: '033_LiveTracking',
  WASHERMAN_ARRIVING: '034_WashermanArriving',
  WASHERMAN_ARRIVED: '035_WashermanArrived',

  // WASH PROCESS (036 - 041)
  SERVICE_START_VERIFICATION: '036_ServiceStartVerification',
  BEFORE_WASH_PHOTOS: '037_BeforeWashPhotos',
  WASH_IN_PROGRESS: '038_WashInProgress',
  SERVICE_PROGRESS_DETAILS: '039_ServiceProgressDetails',
  AFTER_WASH_PHOTOS: '040_AfterWashPhotos',
  SERVICE_COMPLETION_CONFIRMATION: '041_ServiceCompletionConfirmation',

  // PAYMENT AND INVOICE (042 - 047)
  PAYMENT_METHOD: '042_PaymentMethod',
  PAYMENT_CONFIRMATION: '043_PaymentConfirmation',
  PAYMENT_PROCESSING: '044_PaymentProcessing',
  PAYMENT_SUCCESS: '045_PaymentSuccess',
  PAYMENT_FAILED: '046_PaymentFailed',
  INVOICE: '047_Invoice',

  // RATING AND COMPLAINTS (048 - 052)
  RATE_WASHERMAN: '048_RateWasherman',
  WRITE_REVIEW: '049_WriteReview',
  BEFORE_AFTER_FEEDBACK: '050_BeforeAfterFeedback',
  REPORT_ISSUE: '051_ReportIssue',
  COMPLAINT_TRACKING: '052_ComplaintTracking',
  // 053 is reserved for future expansion

  // BOOKINGS (054 - 057)
  UPCOMING_BOOKINGS: '054_UpcomingBookings',
  BOOKING_HISTORY: '055_BookingHistory',
  BOOKING_VIEW_DETAILS: '056_BookingViewDetails',
  REBOOK_SERVICE: '057_RebookService',

  // WALLET AND OFFERS (058 - 061)
  WALLET: '058_Wallet',
  ADD_MONEY: '059_AddMoney',
  OFFERS_COUPONS: '060_OffersCoupons',
  SUBSCRIPTION_PLANS: '061_SubscriptionPlans',
  // 062 is reserved for future expansion

  // PROFILE AND SUPPORT (063 - 070)
  CUSTOMER_PROFILE: '063_CustomerProfile',
  EDIT_PROFILE: '064_EditProfile',
  SAVED_ADDRESSES: '065_SavedAddresses',
  NOTIFICATIONS: '066_Notifications',
  HELP_SUPPORT: '067_HelpSupport',
  SUPPORT_CHAT: '068_SupportChat',
  TERMS_PRIVACY: '069_TermsPrivacy',
  SETTINGS: '070_Settings',

  // Navigators
  AUTH_STACK: 'AuthStack',
  MAIN_TABS: 'MainTabs',
  BOOKING_STACK: 'BookingStack',
  PROFILE_STACK: 'ProfileStack',
} as const;

export type RouteNames = typeof Routes[keyof typeof Routes];
