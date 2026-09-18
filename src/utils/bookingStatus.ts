export type BookingState =
  | 'draft'
  | 'pending'
  | 'searching'
  | 'awaiting_acceptance'
  | 'accepted'
  | 'vendor_on_the_way'
  | 'vendor_arrived'
  | 'verification_pending'
  | 'before_photos_pending'
  | 'service_started'
  | 'in_progress'
  | 'after_photos_pending'
  | 'customer_approval_pending'
  | 'payment_pending'
  | 'payment_processing'
  | 'paid'
  | 'completed'
  | 'cancelled_by_customer'
  | 'cancelled_by_vendor'
  | 'expired'
  | 'failed'
  | 'complaint_open'
  | 'refund_pending'
  | 'refunded';

export const BOOKING_STATUS_CONFIG: Record<
  BookingState,
  {
    label: string;
    badgeBg: string;
    textColor: string;
    isTerminal: boolean;
    canCancel: boolean;
  }
> = {
  draft: { label: 'Draft', badgeBg: '#F1F5F9', textColor: '#64748B', isTerminal: false, canCancel: true },
  pending: { label: 'Pending', badgeBg: '#FEF3C7', textColor: '#D97706', isTerminal: false, canCancel: true },
  searching: { label: 'Finding Washerman', badgeBg: '#EFF6FF', textColor: '#2563EB', isTerminal: false, canCancel: true },
  awaiting_acceptance: { label: 'Awaiting Vendor', badgeBg: '#FEF3C7', textColor: '#D97706', isTerminal: false, canCancel: true },
  accepted: { label: 'Vendor Assigned', badgeBg: '#ECFDF5', textColor: '#059669', isTerminal: false, canCancel: true },
  vendor_on_the_way: { label: 'On The Way', badgeBg: '#EFF6FF', textColor: '#2563EB', isTerminal: false, canCancel: true },
  vendor_arrived: { label: 'Vendor Arrived', badgeBg: '#ECFDF5', textColor: '#059669', isTerminal: false, canCancel: false },
  verification_pending: { label: 'Identity Verification', badgeBg: '#FEF3C7', textColor: '#D97706', isTerminal: false, canCancel: false },
  before_photos_pending: { label: 'Pre-Wash Inspection', badgeBg: '#EFF6FF', textColor: '#2563EB', isTerminal: false, canCancel: false },
  service_started: { label: 'Wash Started', badgeBg: '#ECFDF5', textColor: '#059669', isTerminal: false, canCancel: false },
  in_progress: { label: 'Wash in Progress', badgeBg: '#ECFDF5', textColor: '#059669', isTerminal: false, canCancel: false },
  after_photos_pending: { label: 'Post-Wash Review', badgeBg: '#EFF6FF', textColor: '#2563EB', isTerminal: false, canCancel: false },
  customer_approval_pending: { label: 'Approval Required', badgeBg: '#FEF3C7', textColor: '#D97706', isTerminal: false, canCancel: false },
  payment_pending: { label: 'Payment Due', badgeBg: '#FEF3C7', textColor: '#D97706', isTerminal: false, canCancel: false },
  payment_processing: { label: 'Processing Payment', badgeBg: '#EFF6FF', textColor: '#2563EB', isTerminal: false, canCancel: false },
  paid: { label: 'Payment Completed', badgeBg: '#ECFDF5', textColor: '#059669', isTerminal: false, canCancel: false },
  completed: { label: 'Completed', badgeBg: '#ECFDF5', textColor: '#059669', isTerminal: true, canCancel: false },
  cancelled_by_customer: { label: 'Cancelled by Customer', badgeBg: '#FEE2E2', textColor: '#DC2626', isTerminal: true, canCancel: false },
  cancelled_by_vendor: { label: 'Cancelled by Vendor', badgeBg: '#FEE2E2', textColor: '#DC2626', isTerminal: true, canCancel: false },
  expired: { label: 'Request Expired', badgeBg: '#F1F5F9', textColor: '#64748B', isTerminal: true, canCancel: false },
  failed: { label: 'Service Failed', badgeBg: '#FEE2E2', textColor: '#DC2626', isTerminal: true, canCancel: false },
  complaint_open: { label: 'Complaint Open', badgeBg: '#FEF3C7', textColor: '#D97706', isTerminal: false, canCancel: false },
  refund_pending: { label: 'Refund in Progress', badgeBg: '#EFF6FF', textColor: '#2563EB', isTerminal: false, canCancel: false },
  refunded: { label: 'Refunded', badgeBg: '#ECFDF5', textColor: '#059669', isTerminal: true, canCancel: false },
};
