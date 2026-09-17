import { create } from 'zustand';
import { WalletState, WalletTransaction } from '../types/wallet';
import { mockWalletData } from '../mocks/payments';

interface WalletStore extends WalletState {
  isLoading: boolean;
  addMoney: (amount: number, paymentMethod: string) => Promise<void>;
  deductMoney: (amount: number, bookingRef: string) => Promise<boolean>;
}

export const useWalletStore = create<WalletStore>((set, get) => ({
  balance: mockWalletData.balance,
  currency: mockWalletData.currency,
  transactions: mockWalletData.transactions,
  isLoading: false,

  addMoney: async (amount: number, paymentMethod: string) => {
    const newTx: WalletTransaction = {
      id: `tx_${Date.now()}`,
      type: 'credit',
      amount,
      title: 'Money Added',
      description: `Added via ${paymentMethod}`,
      date: 'Just now',
      referenceId: `REF-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'completed',
    };
    set((s) => ({
      balance: s.balance + amount,
      transactions: [newTx, ...s.transactions],
    }));
  },

  deductMoney: async (amount: number, bookingRef: string) => {
    const current = get().balance;
    if (current < amount) return false;

    const newTx: WalletTransaction = {
      id: `tx_${Date.now()}`,
      type: 'debit',
      amount,
      title: 'Booking Payment',
      description: `Paid for Booking #${bookingRef}`,
      date: 'Just now',
      referenceId: bookingRef,
      status: 'completed',
    };
    set((s) => ({
      balance: s.balance - amount,
      transactions: [newTx, ...s.transactions],
    }));
    return true;
  },
}));
