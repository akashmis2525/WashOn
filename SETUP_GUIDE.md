# WashOn Customer Mobile App - Setup & Execution Guide

## Quick Start Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run on Expo (Development Server):**
   ```bash
   npx expo start
   ```

3. **Run on Android Emulator / Device:**
   ```bash
   npx expo run:android
   ```

4. **Run on iOS Simulator (macOS required):**
   ```bash
   npx expo run:ios
   ```

5. **Execute Type Checks:**
   ```bash
   npx tsc --noEmit
   ```

6. **Enable / Disable Demo Sandbox Mode:**
   In `.env`:
   ```env
   EXPO_PUBLIC_DEMO_MODE=true
   ```
