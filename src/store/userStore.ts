import { create } from 'zustand';
import { UserProfile, UserAddress } from '../types/user';
import { mockUserProfile } from '../mocks/users';

interface UserStore {
  profile: UserProfile | null;
  selectedAddress: UserAddress | null;
  isLoading: boolean;
  loadUserProfile: () => Promise<void>;
  updateProfile: (updated: Partial<UserProfile>) => Promise<void>;
  addAddress: (address: Omit<UserAddress, 'id'>) => Promise<void>;
  updateAddress: (id: string, address: Partial<UserAddress>) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  setSelectedAddress: (address: UserAddress) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  profile: mockUserProfile,
  selectedAddress: mockUserProfile.addresses[0] || null,
  isLoading: false,

  loadUserProfile: async () => {
    set({ isLoading: true });
    // In live mode, fetch from API. In mock mode:
    set({ profile: mockUserProfile, isLoading: false });
  },

  updateProfile: async (updated: Partial<UserProfile>) => {
    const current = get().profile;
    if (!current) return;
    const newProfile = { ...current, ...updated, updatedAt: new Date().toISOString() };
    set({ profile: newProfile });
  },

  addAddress: async (addressData: Omit<UserAddress, 'id'>) => {
    const current = get().profile;
    if (!current) return;
    const newAddress: UserAddress = {
      ...addressData,
      id: `addr_${Date.now()}`,
    };
    const addresses = [...current.addresses, newAddress];
    set({
      profile: { ...current, addresses },
      selectedAddress: newAddress.isDefault ? newAddress : get().selectedAddress,
    });
  },

  updateAddress: async (id: string, updated: Partial<UserAddress>) => {
    const current = get().profile;
    if (!current) return;
    const addresses = current.addresses.map((a) => (a.id === id ? { ...a, ...updated } : a));
    set({ profile: { ...current, addresses } });
  },

  deleteAddress: async (id: string) => {
    const current = get().profile;
    if (!current) return;
    const addresses = current.addresses.filter((a) => a.id !== id);
    set({ profile: { ...current, addresses } });
  },

  setSelectedAddress: (selectedAddress: UserAddress) => {
    set({ selectedAddress });
  },
}));
