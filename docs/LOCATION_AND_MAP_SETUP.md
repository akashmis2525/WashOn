# Location & Maps Configuration Guide

## 1. Environment Configuration
Add the following keys to `.env`:
```env
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
EXPO_PUBLIC_GOOGLE_PLACES_API_KEY=your_google_places_api_key_here
EXPO_PUBLIC_DEMO_MODE=true
```

## 2. Android & iOS Permissions
- **Android:** Ensure `ACCESS_FINE_LOCATION` and `ACCESS_COARSE_LOCATION` are configured in `app.json`.
- **iOS:** Ensure `NSLocationWhenInUseUsageDescription` is provided with clear copy explaining nearby washerman discovery.
