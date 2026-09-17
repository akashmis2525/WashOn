import { create } from 'zustand';
import { Vehicle, CreateVehicleInput } from '../types/vehicle';
import { mockVehicles } from '../mocks/vehicles';

interface VehicleStore {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  isLoading: boolean;
  loadVehicles: () => Promise<void>;
  addVehicle: (input: CreateVehicleInput) => Promise<Vehicle>;
  updateVehicle: (id: string, input: Partial<Vehicle>) => Promise<void>;
  deleteVehicle: (id: string) => Promise<void>;
  setSelectedVehicle: (vehicle: Vehicle) => void;
}

export const useVehicleStore = create<VehicleStore>((set, get) => ({
  vehicles: mockVehicles,
  selectedVehicle: mockVehicles[0] || null,
  isLoading: false,

  loadVehicles: async () => {
    set({ isLoading: true });
    set({ vehicles: mockVehicles, isLoading: false });
  },

  addVehicle: async (input: CreateVehicleInput) => {
    const newVehicle: Vehicle = {
      ...input,
      id: `veh_${Date.now()}`,
      userId: 'usr_001',
      isDefault: input.isDefault ?? false,
      createdAt: new Date().toISOString(),
    };
    const current = get().vehicles;
    const updated = input.isDefault
      ? current.map((v) => ({ ...v, isDefault: false })).concat(newVehicle)
      : [...current, newVehicle];

    set({
      vehicles: updated,
      selectedVehicle: newVehicle.isDefault ? newVehicle : get().selectedVehicle || newVehicle,
    });
    return newVehicle;
  },

  updateVehicle: async (id: string, input: Partial<Vehicle>) => {
    const vehicles = get().vehicles.map((v) => (v.id === id ? { ...v, ...input } : v));
    set({ vehicles });
  },

  deleteVehicle: async (id: string) => {
    const vehicles = get().vehicles.filter((v) => v.id !== id);
    set({
      vehicles,
      selectedVehicle: get().selectedVehicle?.id === id ? vehicles[0] || null : get().selectedVehicle,
    });
  },

  setSelectedVehicle: (selectedVehicle: Vehicle) => {
    set({ selectedVehicle });
  },
}));
