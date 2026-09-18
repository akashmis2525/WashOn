import { BookingState, BOOKING_STATUS_CONFIG } from './bookingStatus';
import { BookingTransitionValidator } from './bookingTransitionValidator';

export interface BookingStateLog {
  from: BookingState;
  to: BookingState;
  timestamp: string;
  reason?: string;
  actor: 'customer' | 'washerman' | 'system' | 'support';
}

export class BookingStateMachine {
  private currentState: BookingState;
  private history: BookingStateLog[] = [];

  constructor(initialState: BookingState = 'draft') {
    this.currentState = initialState;
    this.history.push({
      from: 'draft',
      to: initialState,
      timestamp: new Date().toISOString(),
      reason: 'Initial state creation',
      actor: 'system',
    });
  }

  public getState(): BookingState {
    return this.currentState;
  }

  public getHistory(): BookingStateLog[] {
    return [...this.history];
  }

  public getConfig() {
    return BOOKING_STATUS_CONFIG[this.currentState];
  }

  public transition(
    nextState: BookingState,
    actor: 'customer' | 'washerman' | 'system' | 'support' = 'system',
    reason?: string
  ): BookingState {
    BookingTransitionValidator.validateTransition(this.currentState, nextState);
    const log: BookingStateLog = {
      from: this.currentState,
      to: nextState,
      timestamp: new Date().toISOString(),
      reason,
      actor,
    };
    this.history.push(log);
    this.currentState = nextState;
    return this.currentState;
  }

  public canTransitionTo(nextState: BookingState): boolean {
    return BookingTransitionValidator.canTransition(this.currentState, nextState);
  }

  public canCancel(): boolean {
    return BookingTransitionValidator.canCancel(this.currentState);
  }
}
