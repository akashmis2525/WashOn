import { VehicleType } from './vehicle';

export type ServiceCategoryType = 'bike_wash' | 'car_wash' | 'detailing' | 'subscription';

export interface ServiceAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  icon?: string;
  isPopular?: boolean;
}

export interface WashService {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ServiceCategoryType;
  applicableVehicleTypes: VehicleType[];
  basePrice: number;
  estimatedDurationMinutes: number;
  features: string[];
  whatsIncluded: string[];
  whatsNotIncluded?: string[];
  imageUrl: string;
  isPopular: boolean;
  rating: number;
  reviewCount: number;
  availableAddons: ServiceAddon[];
}
