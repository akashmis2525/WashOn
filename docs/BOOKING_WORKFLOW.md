# WashOn Booking State Machine & Lifecycle Guide

## 1. State Flow Diagram

```
[Draft] 
   │
   ▼
[Searching] ──────► [Awaiting Acceptance] ──────► [Accepted]
   │                       │                          │
   │ (Timeout)             │ (Vendor Reject)          ▼
   ▼                       ▼                  [Vendor On The Way]
[Expired]             [Searching / Cancelled]         │
                                                      ▼
                                              [Vendor Arrived]
                                                      │
                                                      ▼
                                          [Verification Pending]
                                                      │
                                                      ▼
                                          [Before Photos Pending]
                                                      │
                                                      ▼
                                             [Wash In Progress]
                                                      │
                                                      ▼
                                          [After Photos Pending]
                                                      │
                                                      ▼
                                        [Customer Approval Pending]
                                                      │
                                                      ▼
                                              [Payment Pending]
                                                      │
                                                      ▼
                                                 [Completed]
```

## 2. Cancellation Rules & Protections
1. **Free Cancellation:** Allowed during `draft`, `searching`, `awaiting_acceptance`, and `accepted` (before vendor departs).
2. **Restricted Cancellation:** Once vendor is marked `vendor_arrived` or `in_progress`, customer cannot unilaterally cancel without contacting support.
3. **Photo Verification:** Mandatory 4-angle before photos (`front`, `back`, `left`, `right`) required prior to starting wash cycle to prevent vehicle damage disputes.
