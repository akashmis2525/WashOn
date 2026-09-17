export interface ReviewSubmission {
  bookingId: string;
  washermanId: string;
  rating: number; // 1 to 5
  cleanlinessRating: number;
  punctualityRating: number;
  behaviorRating: number;
  comment: string;
  tags: string[];
  photos?: string[];
}

export interface WashermanReviewItem {
  id: string;
  washermanId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  serviceName: string;
  date: string;
  photos?: string[];
}
