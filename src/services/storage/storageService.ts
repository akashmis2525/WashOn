import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  AUTH_TOKEN: '@washon_auth_token',
  REFRESH_TOKEN: '@washon_refresh_token',
  USER_PROFILE: '@washon_user_profile',
  IS_ONBOARDED: '@washon_is_onboarded',
  SELECTED_LOCATION: '@washon_selected_location',
} as const;

export const StorageService = {
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`StorageService getItem error for key ${key}:`, error);
      return null;
    }
  },

  async setItem<T>(key: string, value: T): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`StorageService setItem error for key ${key}:`, error);
      return false;
    }
  },

  async removeItem(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`StorageService removeItem error for key ${key}:`, error);
      return false;
    }
  },

  async clearAll(): Promise<boolean> {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('StorageService clearAll error:', error);
      return false;
    }
  },

  // Specialized helpers
  async getAuthTokens(): Promise<{ accessToken: string | null; refreshToken: string | null }> {
    const accessToken = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    return { accessToken, refreshToken };
  },

  async saveAuthTokens(accessToken: string, refreshToken: string): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);
    await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  },

  async clearAuthTokens(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    await AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  async getIsOnboarded(): Promise<boolean> {
    const val = await AsyncStorage.getItem(STORAGE_KEYS.IS_ONBOARDED);
    return val === 'true';
  },

  async setIsOnboarded(value: boolean): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.IS_ONBOARDED, value ? 'true' : 'false');
  },
};
