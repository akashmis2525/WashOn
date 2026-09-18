import { BookingState } from './bookingStatus';

export const VALID_TRANSITIONS: Record<BookingState, BookingState[]> = {
  draft: ['pending', 'searching', 'cancelled_by_customer'],
  pending: ['searching', 'cancelled_by_customer', 'expired'],
  searching: ['awaiting_acceptance', 'accepted', 'cancelled_by_customer', 'expired', 'failed'],
  awaiting_acceptance: ['accepted', 'cancelled_by_customer', 'cancelled_by_vendor', 'expired'],
  accepted: ['vendor_on_the_way', 'cancelled_by_customer', 'cancelled_by_vendor'],
  vendor_on_the_way: ['vendor_arrived', 'cancelled_by_customer', 'cancelled_by_vendor'],
  vendor_arrived: ['verification_pending', 'before_photos_pending', 'cancelled_by_vendor'],
  verification_pending: ['before_photos_pending', 'service_started', 'failed'],
  before_photos_pending: ['service_started', 'in_progress', 'failed'],
  service_started: ['in_progress', 'after_photos_pending', 'failed'],
  in_progress: ['after_photos_pending', 'customer_approval_pending', 'payment_pending', 'failed'],
  after_photos_pending: ['customer_approval_pending', 'payment_pending'],
  customer_approval_pending: ['payment_pending', 'complaint_open'],
  payment_pending: ['payment_processing', 'paid', 'complaint_open'],
  payment_processing: ['paid', 'failed', 'payment_pending'],
  paid: ['completed', 'complaint_open'],
  completed: ['complaint_open'],
  cancelled_by_customer: ['refund_pending', 'refunded'],
  cancelled_by_vendor: ['refund_pending', 'refunded', 'searching'],
  expired: ['searching', 'draft'],
  failed: ['complaint_open', 'refund_pending', 'refunded'],
  complaint_open: ['refund_pending', 'refunded', 'completed'],
  refund_pending: ['refunded', 'failed'],
  refunded: [],
};

export class BookingTransitionValidator {
  public static canTransition(current: BookingState, next: BookingState): boolean {
    const allowed = VALID_TRANSITIONS[current] || [];
    return allowed.includes(next);
  }

  public static validateTransition(current: BookingState, next: BookingState): void {
    if (!this.canTransition(current, next)) {
      throw new Error(
        `[BookingStateMachine] Invalid transition from state '${current}' to '${next}'. Allowed transitions: ${
          VALID_TRANSITIONS[current]?.join(', ') || 'None'
        }`
      );
    }
  }

  public static canCancel(current: BookingState): boolean {
    const cancelRestrictedStates: BookingState[] = [
      'vendor_arrived',
      'verification_pending',
      'before_photos_pending',
      'service_started',
      'in_progress',
      'after_photos_pending',
      'customer_approval_pending',
      'payment_pending',
      'payment_processing',
      'paid',
      'completed',
      'cancelled_by_customer',
      'cancelled_by_vendor',
      'refunded',
    ];
    return !cancelRestrictedStates.includes(current);
  }
}
