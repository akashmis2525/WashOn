import { BookingStateMachine } from '../utils/bookingStateMachine';
import { BookingTransitionValidator } from '../utils/bookingTransitionValidator';

function expect<T>(actual: T) {
  return {
    toBe: (expected: T) => {
      if (actual !== expected) {
        throw new Error(`Expected ${expected} but received ${actual}`);
      }
    },
    toThrow: () => {
      // Checked via wrapper
    },
  };
}

export function runBookingWorkflowTests() {
  // Test 1: Draft state
  const fsm = new BookingStateMachine('draft');
  expect(fsm.getState()).toBe('draft');
  expect(fsm.canTransitionTo('searching')).toBe(true);

  fsm.transition('searching', 'customer', 'User tapped Book Now');
  expect(fsm.getState()).toBe('searching');

  // Test 2: Progress sequence
  const fsm2 = new BookingStateMachine('accepted');
  fsm2.transition('vendor_on_the_way', 'washerman');
  expect(fsm2.getState()).toBe('vendor_on_the_way');

  fsm2.transition('vendor_arrived', 'washerman');
  expect(fsm2.getState()).toBe('vendor_arrived');

  // Test 3: Cancellation rules
  expect(BookingTransitionValidator.canCancel('draft')).toBe(true);
  expect(BookingTransitionValidator.canCancel('searching')).toBe(true);
  expect(BookingTransitionValidator.canCancel('accepted')).toBe(true);
  expect(BookingTransitionValidator.canCancel('vendor_on_the_way')).toBe(true);
  expect(BookingTransitionValidator.canCancel('vendor_arrived')).toBe(false);
  expect(BookingTransitionValidator.canCancel('in_progress')).toBe(false);

  return true;
}
