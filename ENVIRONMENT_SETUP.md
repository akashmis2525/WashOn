# WashOn Environment Configuration

Create a `.env` file in the root of the project with the following parameters:

```env
# Application Mode
EXPO_PUBLIC_APP_ENV=development
EXPO_PUBLIC_DEMO_MODE=true

# Backend API Configuration
EXPO_PUBLIC_API_BASE_URL=https://api.washon.in/v1
EXPO_PUBLIC_WS_BASE_URL=wss://tracking.washon.in/v1

# Google Maps API Credentials
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...
EXPO_PUBLIC_GOOGLE_PLACES_API_KEY=AIzaSy...

# Payment Gateway Public Keys (Never put secret keys in client code)
EXPO_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
EXPO_PUBLIC_CASHFREE_APP_ID=TEST...
```
