import { Vehicle } from './vehicle';
import { WashService, ServiceAddon } from './service';
import { Washerman } from './washerman';
import { UserAddress } from './user';

export type BookingStatus =
  | 'pending'
  | 'waiting_acceptance'
  | 'accepted'
  | 'washerman_arriving'
  | 'washerman_arrived'
  | 'start_verification'
  | 'wash_in_progress'
  | 'photos_uploaded'
  | 'completed'
  | 'payment_pending'
  | 'paid'
  | 'cancelled';

export interface BookingPriceBreakdown {
  basePrice: number;
  addonsTotal: number;
  convenienceFee: number;
  tax: number;
  discount: number;
  couponCode?: string;
  totalAmount: number;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  userId: string;
  vehicle: Vehicle;
  service: WashService;
  selectedAddons: ServiceAddon[];
  washerman?: Washerman;
  address: UserAddress;
  status: BookingStatus;
  scheduledType: 'now' | 'scheduled';
  scheduledDate: string;
  scheduledTimeSlot: string;
  customerInstructions?: string;
  pricing: BookingPriceBreakdown;
  startOtp?: string;
  beforeWashPhotos?: string[];
  afterWashPhotos?: string[];
  washermanLocation?: {
    latitude: number;
    longitude: number;
  };
  progressStepIndex?: number;
  totalProgressSteps?: number;
  rating?: number;
  reviewComment?: string;
  createdAt: string;
  updatedAt: string;
}
