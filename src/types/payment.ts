export type PaymentMethodType = 'upi' | 'card' | 'netbanking' | 'wallet' | 'cod';

export type PaymentStatus = 'pending' | 'processing' | 'success' | 'failed';

export interface PaymentTransaction {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  method: PaymentMethodType;
  status: PaymentStatus;
  transactionRef: string;
  paymentGateway?: 'razorpay' | 'stripe' | 'mock';
  errorMessage?: string;
  timestamp: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  bookingId: string;
  bookingNumber: string;
  customerName: string;
  customerPhone: string;
  serviceName: string;
  vehicleDetails: string;
  date: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethodType;
  paymentStatus: PaymentStatus;
}
