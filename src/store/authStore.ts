import { create } from 'zustand';
import { AuthState } from '../types/auth';
import { StorageService } from '../services/storage/storageService';
import { Config } from '../constants/config';

interface AuthStore extends AuthState {
  setLoading: (loading: boolean) => void;
  setOnboarded: (onboarded: boolean) => Promise<void>;
  setPhoneNumber: (phone: string) => void;
  loginSuccess: (token: string, refreshToken: string, phoneNumber: string) => Promise<void>;
  logout: () => Promise<void>;
  setLocationPermission: (granted: boolean) => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAuthenticated: false,
  isLoading: true,
  isOnboarded: false,
  phoneNumber: null,
  tokens: null,
  hasLocationPermission: false,

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  setOnboarded: async (onboarded: boolean) => {
    await StorageService.setIsOnboarded(onboarded);
    set({ isOnboarded: onboarded });
  },

  setPhoneNumber: (phoneNumber: string) => set({ phoneNumber }),

  loginSuccess: async (accessToken: string, refreshToken: string, phoneNumber: string) => {
    await StorageService.saveAuthTokens(accessToken, refreshToken);
    set({
      isAuthenticated: true,
      phoneNumber,
      tokens: {
        accessToken,
        refreshToken,
        expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
      },
    });
  },

  logout: async () => {
    await StorageService.clearAuthTokens();
    set({
      isAuthenticated: false,
      phoneNumber: null,
      tokens: null,
    });
  },

  setLocationPermission: (hasLocationPermission: boolean) => {
    set({ hasLocationPermission });
  },

  initializeAuth: async () => {
    set({ isLoading: true });
    try {
      const isOnboarded = await StorageService.getIsOnboarded();
      const { accessToken, refreshToken } = await StorageService.getAuthTokens();

      if (accessToken) {
        set({
          isAuthenticated: true,
          isOnboarded,
          tokens: {
            accessToken,
            refreshToken: refreshToken || '',
            expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
          },
          isLoading: false,
        });
      } else {
        set({
          isAuthenticated: false,
          isOnboarded,
          isLoading: false,
        });
      }
    } catch (e) {
      console.error('initializeAuth error:', e);
      set({ isLoading: false });
    }
  },
}));
