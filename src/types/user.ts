export interface UserAddress {
  id: string;
  label: 'Home' | 'Work' | 'Other';
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  avatarUrl?: string;
  gender?: 'male' | 'female' | 'other';
  addresses: UserAddress[];
  defaultAddressId?: string;
  createdAt: string;
  updatedAt: string;
}
