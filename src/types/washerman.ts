export interface WashermanBadge {
  id: string;
  name: string;
  icon: string;
}

export interface Washerman {
  id: string;
  name: string;
  avatarUrl: string;
  phoneNumber: string;
  rating: number;
  totalReviews: number;
  completedWashes: number;
  experienceYears: number;
  distanceKm: number;
  estimatedArrivalMinutes: number;
  isAvailable: boolean;
  isTopRated: boolean;
  isVerified: boolean;
  latitude: number;
  longitude: number;
  bio: string;
  equipmentList: string[];
  badges: WashermanBadge[];
  recentReviews?: {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}
