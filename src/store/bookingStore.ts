import { create } from 'zustand';
import { Booking, BookingPriceBreakdown, BookingStatus } from '../types/booking';
import { Vehicle } from '../types/vehicle';
import { WashService, ServiceAddon } from '../types/service';
import { Washerman } from '../types/washerman';
import { UserAddress } from '../types/user';
import { mockBookings } from '../mocks/bookings';
import { mockServices } from '../mocks/services';
import { mockVehicles } from '../mocks/vehicles';
import { mockWashermen } from '../mocks/washermen';
import { mockUserProfile } from '../mocks/users';

interface BookingDraft {
  vehicle: Vehicle | null;
  service: WashService | null;
  selectedAddons: ServiceAddon[];
  washerman: Washerman | null;
  address: UserAddress | null;
  scheduledType: 'now' | 'scheduled';
  scheduledDate: string;
  scheduledTimeSlot: string;
  customerInstructions: string;
  couponCode?: string;
  discount: number;
}

interface BookingStore {
  // Current draft booking in progress
  draft: BookingDraft;
  bookings: Booking[];
  activeBooking: Booking | null;
  isLoading: boolean;

  // Actions
  setDraftVehicle: (vehicle: Vehicle) => void;
  setDraftService: (service: WashService) => void;
  toggleDraftAddon: (addon: ServiceAddon) => void;
  setDraftAddons: (addons: ServiceAddon[]) => void;
  setDraftWasherman: (washerman: Washerman) => void;
  setDraftAddress: (address: UserAddress) => void;
  setDraftSchedule: (type: 'now' | 'scheduled', date: string, timeSlot: string) => void;
  setDraftInstructions: (instructions: string) => void;
  applyCoupon: (code: string, discount: number) => void;
  calculateDraftPricing: () => BookingPriceBreakdown;
  createBookingFromDraft: () => Promise<Booking>;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  setActiveBooking: (booking: Booking | null) => void;
  loadBookings: () => Promise<void>;
  resetDraft: () => void;
}

const initialDraft: BookingDraft = {
  vehicle: mockVehicles[0] || null,
  service: mockServices[1] || null,
  selectedAddons: [],
  washerman: mockWashermen[0] || null,
  address: mockUserProfile.addresses[0] || null,
  scheduledType: 'now',
  scheduledDate: new Date().toISOString().split('T')[0],
  scheduledTimeSlot: 'Immediately (within 20 mins)',
  customerInstructions: '',
  discount: 0,
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  draft: initialDraft,
  bookings: mockBookings,
  activeBooking: mockBookings[1] || null,
  isLoading: false,

  setDraftVehicle: (vehicle) => set((s) => ({ draft: { ...s.draft, vehicle } })),
  setDraftService: (service) => set((s) => ({ draft: { ...s.draft, service, selectedAddons: [] } })),
  setDraftAddons: (selectedAddons) => set((s) => ({ draft: { ...s.draft, selectedAddons } })),
  toggleDraftAddon: (addon) => {
    const current = get().draft.selectedAddons;
    const exists = current.some((a) => a.id === addon.id);
    const updated = exists ? current.filter((a) => a.id !== addon.id) : [...current, addon];
    set((s) => ({ draft: { ...s.draft, selectedAddons: updated } }));
  },
  setDraftWasherman: (washerman) => set((s) => ({ draft: { ...s.draft, washerman } })),
  setDraftAddress: (address) => set((s) => ({ draft: { ...s.draft, address } })),
  setDraftSchedule: (scheduledType, scheduledDate, scheduledTimeSlot) =>
    set((s) => ({ draft: { ...s.draft, scheduledType, scheduledDate, scheduledTimeSlot } })),
  setDraftInstructions: (customerInstructions) => set((s) => ({ draft: { ...s.draft, customerInstructions } })),
  applyCoupon: (couponCode, discount) => set((s) => ({ draft: { ...s.draft, couponCode, discount } })),

  calculateDraftPricing: (): BookingPriceBreakdown => {
    const { draft } = get();
    const basePrice = draft.service?.basePrice || 0;
    const addonsTotal = draft.selectedAddons.reduce((acc, curr) => acc + curr.price, 0);
    const convenienceFee = 25;
    const subtotal = basePrice + addonsTotal + convenienceFee;
    const discount = draft.discount || 0;
    const taxableAmount = Math.max(0, subtotal - discount);
    const tax = Math.round(taxableAmount * 0.05); // 5% GST
    const totalAmount = Math.max(0, taxableAmount + tax);

    return {
      basePrice,
      addonsTotal,
      convenienceFee,
      tax,
      discount,
      couponCode: draft.couponCode,
      totalAmount,
    };
  },

  createBookingFromDraft: async () => {
    const { draft, calculateDraftPricing } = get();
    if (!draft.vehicle || !draft.service || !draft.address) {
      throw new Error('Vehicle, service and address are required');
    }

    const pricing = calculateDraftPricing();
    const newBooking: Booking = {
      id: `bk_${Date.now()}`,
      bookingNumber: `WO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: 'usr_001',
      vehicle: draft.vehicle,
      service: draft.service,
      selectedAddons: draft.selectedAddons,
      washerman: draft.washerman || mockWashermen[0],
      address: draft.address,
      status: 'waiting_acceptance',
      scheduledType: draft.scheduledType,
      scheduledDate: draft.scheduledDate,
      scheduledTimeSlot: draft.scheduledTimeSlot,
      customerInstructions: draft.customerInstructions,
      pricing,
      startOtp: `${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((s) => ({
      bookings: [newBooking, ...s.bookings],
      activeBooking: newBooking,
    }));
    return newBooking;
  },

  updateBookingStatus: (bookingId, status) => {
    const bookings = get().bookings.map((b) =>
      b.id === bookingId ? { ...b, status, updatedAt: new Date().toISOString() } : b
    );
    const active = get().activeBooking;
    const activeBooking = active && active.id === bookingId ? { ...active, status } : active;
    set({ bookings, activeBooking });
  },

  setActiveBooking: (activeBooking) => set({ activeBooking }),

  loadBookings: async () => {
    set({ isLoading: true });
    set({ bookings: mockBookings, isLoading: false });
  },

  resetDraft: () => set({ draft: initialDraft }),
}));
