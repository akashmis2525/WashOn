import { WashermanReviewItem } from '../types/review';
import { ComplaintTicket } from '../types/complaint';

export const mockReviews: WashermanReviewItem[] = [
  {
    id: 'rev_101',
    washermanId: 'wm_001',
    userName: 'Karthik Varma',
    rating: 5,
    comment: 'Super thorough cleaning! Even took care of the hard to reach brake callipers and chain grease.',
    serviceName: 'Deep Spa & Polish (Bike)',
    date: '12 Feb 2026',
  },
  {
    id: 'rev_102',
    washermanId: 'wm_001',
    userName: 'Divya Nambiar',
    rating: 5,
    comment: 'Creta looks brand new after complete in & out wash! Ramesh is super courteous.',
    serviceName: 'Complete In & Out Wash (Car)',
    date: '08 Feb 2026',
  },
  {
    id: 'rev_103',
    washermanId: 'wm_001',
    userName: 'Praveen K.',
    rating: 4,
    comment: 'On time and very professional equipment.',
    serviceName: 'Express Exterior Wash',
    date: '01 Feb 2026',
  },
];

export const mockComplaints: ComplaintTicket[] = [
  {
    id: 'cmp_001',
    ticketNumber: 'TKT-2026-4421',
    bookingId: 'bk_1001',
    bookingNumber: 'WO-2026-8891',
    category: 'poor_wash_quality',
    title: 'Water spots left on rear windshield',
    description: 'There were visible water marks on the rear windshield after the service was completed.',
    status: 'resolved',
    resolutionNote: 'Washerman returned and re-buffed the windshield. ₹50 wallet credit offered as courtesy apology.',
    createdAt: '2026-02-14T13:00:00Z',
    updatedAt: '2026-02-14T15:30:00Z',
    timeline: [
      {
        status: 'submitted',
        title: 'Complaint Registered',
        description: 'Ticket created by customer with photo proof.',
        timestamp: '14 Feb 2026, 01:00 PM',
      },
      {
        status: 'under_review',
        title: 'Reviewing by Support Lead',
        description: 'Support agent verified details with washerman.',
        timestamp: '14 Feb 2026, 01:30 PM',
      },
      {
        status: 'resolved',
        title: 'Resolved & Closed',
        description: 'Free buffing completed and courtesy credit added.',
        timestamp: '14 Feb 2026, 03:30 PM',
      },
    ],
  },
];
