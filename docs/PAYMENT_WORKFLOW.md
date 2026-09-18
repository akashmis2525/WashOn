# WashOn Payment & Invoicing Workflow

## 1. Supported Payment Rails
- **UPI (Unified Payments Interface):** Google Pay, PhonePe, Paytm, BHIM, Cred
- **Cards:** Credit & Debit Cards (RuPay, Visa, Mastercard) via Razorpay / Cashfree SDK
- **WashOn Wallet:** Stored value wallet with one-click instant debit & refunds
- **Cash on Delivery (COD):** Available when permitted by local service zone

## 2. Payment Security & Idempotency
- **No Raw Card Storage:** Tokenized through PCI-DSS Level 1 compliant gateway.
- **Idempotency Keys:** Every payment request includes `bookingId` + `timestamp` checksum to eliminate double charges.
- **Auto-Refunds:** Cancelled bookings or failed transactions automatically credit the customer's WashOn wallet instantly.
