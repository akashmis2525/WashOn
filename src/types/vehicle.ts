export type VehicleType = 'bike' | 'scooter' | 'car' | 'suv' | 'luxury_car';

export interface Vehicle {
  id: string;
  userId: string;
  type: VehicleType;
  brand: string;
  model: string;
  registrationNumber: string;
  color: string;
  fuelType?: 'petrol' | 'diesel' | 'ev' | 'cng';
  photoUrl?: string;
  isDefault: boolean;
  createdAt: string;
}

export interface CreateVehicleInput {
  type: VehicleType;
  brand: string;
  model: string;
  registrationNumber: string;
  color: string;
  fuelType?: 'petrol' | 'diesel' | 'ev' | 'cng';
  isDefault?: boolean;
}
