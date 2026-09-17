import { Booking } from '../types/booking';
import { mockVehicles } from './vehicles';
import { mockServices, mockAddons } from './services';
import { mockWashermen } from './washermen';
import { mockUserProfile } from './users';

export const mockBookings: Booking[] = [
  {
    id: 'bk_1001',
    bookingNumber: 'WO-2026-8891',
    userId: 'usr_001',
    vehicle: mockVehicles[0],
    service: mockServices[1],
    selectedAddons: [mockAddons[2]],
    washerman: mockWashermen[0],
    address: mockUserProfile.addresses[0],
    status: 'completed',
    scheduledType: 'now',
    scheduledDate: '2026-02-14',
    scheduledTimeSlot: '11:00 AM - 12:00 PM',
    customerInstructions: 'Please call once arrived at gate 2.',
    pricing: {
      basePrice: 299,
      addonsTotal: 149,
      convenienceFee: 20,
      tax: 23,
      discount: 50,
      couponCode: 'WASH50',
      totalAmount: 441,
    },
    startOtp: '4821',
    beforeWashPhotos: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400',
    ],
    afterWashPhotos: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400',
    ],
    rating: 5,
    reviewComment: 'Superb wash! The bike feels brand new.',
    createdAt: '2026-02-14T10:45:00Z',
    updatedAt: '2026-02-14T11:55:00Z',
  },
  {
    id: 'bk_1002',
    bookingNumber: 'WO-2026-9214',
    userId: 'usr_001',
    vehicle: mockVehicles[1],
    service: mockServices[3],
    selectedAddons: [mockAddons[0], mockAddons[1]],
    washerman: mockWashermen[0],
    address: mockUserProfile.addresses[0],
    status: 'accepted',
    scheduledType: 'scheduled',
    scheduledDate: '2026-02-18',
    scheduledTimeSlot: '03:00 PM - 04:00 PM',
    customerInstructions: 'Covered parking slot #24B.',
    pricing: {
      basePrice: 599,
      addonsTotal: 178,
      convenienceFee: 30,
      tax: 40,
      discount: 100,
      couponCode: 'FIRST100',
      totalAmount: 747,
    },
    startOtp: '7193',
    createdAt: '2026-02-17T18:30:00Z',
    updatedAt: '2026-02-17T18:32:00Z',
  },
];
