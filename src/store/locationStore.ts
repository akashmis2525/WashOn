import { create } from 'zustand';

export interface CurrentLocation {
  latitude: number;
  longitude: number;
  formattedAddress: string;
  city: string;
  area: string;
}

interface LocationStore {
  currentLocation: CurrentLocation;
  hasPermission: boolean;
  isLoading: boolean;
  setLocation: (loc: CurrentLocation) => void;
  setHasPermission: (perm: boolean) => void;
  requestCurrentLocation: () => Promise<CurrentLocation>;
}

const defaultLocation: CurrentLocation = {
  latitude: 17.4156,
  longitude: 78.4357,
  formattedAddress: 'Road No. 12, Banjara Hills, Hyderabad, Telangana 500034',
  city: 'Hyderabad',
  area: 'Banjara Hills',
};

export const useLocationStore = create<LocationStore>((set) => ({
  currentLocation: defaultLocation,
  hasPermission: true,
  isLoading: false,

  setLocation: (currentLocation) => set({ currentLocation }),
  setHasPermission: (hasPermission) => set({ hasPermission }),

  requestCurrentLocation: async () => {
    // In mock mode or real GPS fallback
    set({ currentLocation: defaultLocation, hasPermission: true });
    return defaultLocation;
  },
}));
