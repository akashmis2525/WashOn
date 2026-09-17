export const API_ENDPOINTS = {
  // Auth
  SEND_OTP: '/auth/send-otp',
  VERIFY_OTP: '/auth/verify-otp',
  REFRESH_TOKEN: '/auth/refresh-token',
  LOGOUT: '/auth/logout',

  // User & Profile
  PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile/update',
  ADDRESSES: '/user/addresses',
  ADD_ADDRESS: '/user/addresses/add',
  UPDATE_ADDRESS: (id: string) => `/user/addresses/${id}`,
  DELETE_ADDRESS: (id: string) => `/user/addresses/${id}`,

  // Vehicles
  VEHICLES: '/vehicles',
  ADD_VEHICLE: '/vehicles/add',
  VEHICLE_DETAILS: (id: string) => `/vehicles/${id}`,
  UPDATE_VEHICLE: (id: string) => `/vehicles/${id}`,
  DELETE_VEHICLE: (id: string) => `/vehicles/${id}`,

  // Services
  CATEGORIES: '/services/categories',
  SERVICES_BY_CATEGORY: (category: string) => `/services/category/${category}`,
  SERVICE_DETAILS: (id: string) => `/services/${id}`,
  SERVICE_ADDONS: (serviceId: string) => `/services/${serviceId}/addons`,

  // Washermen
  NEARBY_WASHERMEN: '/washermen/nearby',
  WASHERMAN_DETAILS: (id: string) => `/washermen/${id}`,
  WASHERMAN_REVIEWS: (id: string) => `/washermen/${id}/reviews`,

  // Bookings
  CREATE_BOOKING: '/bookings/create',
  BOOKING_DETAILS: (id: string) => `/bookings/${id}`,
  UPCOMING_BOOKINGS: '/bookings/upcoming',
  BOOKING_HISTORY: '/bookings/history',
  CANCEL_BOOKING: (id: string) => `/bookings/${id}/cancel`,
  RESCHEDULE_BOOKING: (id: string) => `/bookings/${id}/reschedule`,
  TRACK_BOOKING: (id: string) => `/bookings/${id}/track`,
  UPLOAD_WASH_PHOTOS: (id: string) => `/bookings/${id}/photos`,

  // Payments & Invoice
  CREATE_PAYMENT_ORDER: '/payments/order',
  VERIFY_PAYMENT: '/payments/verify',
  GET_INVOICE: (bookingId: string) => `/payments/invoice/${bookingId}`,

  // Wallet
  WALLET_BALANCE: '/wallet/balance',
  WALLET_TRANSACTIONS: '/wallet/transactions',
  ADD_WALLET_MONEY: '/wallet/add-money',

  // Reviews & Complaints
  SUBMIT_REVIEW: '/reviews/submit',
  SUBMIT_COMPLAINT: '/complaints/submit',
  COMPLAINT_DETAILS: (id: string) => `/complaints/${id}`,
  COMPLAINTS_LIST: '/complaints/list',

  // Offers & Coupons
  COUPONS: '/offers/coupons',
  VALIDATE_COUPON: '/offers/validate',
} as const;
