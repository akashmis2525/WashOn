export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  title: string;
  description: string;
  date: string;
  referenceId?: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface WalletState {
  balance: number;
  currency: string;
  transactions: WalletTransaction[];
}

export interface CouponOffer {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  validUntil: string;
  terms: string[];
}
