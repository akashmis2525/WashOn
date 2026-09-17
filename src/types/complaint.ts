export type ComplaintStatus = 'submitted' | 'under_review' | 'investigating' | 'resolved' | 'closed';

export interface ComplaintTicket {
  id: string;
  ticketNumber: string;
  bookingId: string;
  bookingNumber: string;
  category: 'poor_wash_quality' | 'washerman_late' | 'vehicle_scratched' | 'overcharged' | 'behavior_issue' | 'other';
  title: string;
  description: string;
  attachments?: string[];
  status: ComplaintStatus;
  resolutionNote?: string;
  createdAt: string;
  updatedAt: string;
  timeline: {
    status: ComplaintStatus;
    title: string;
    description: string;
    timestamp: string;
  }[];
}
