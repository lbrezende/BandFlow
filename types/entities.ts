export type Plan = "FREE" | "TRIAL" | "PRO";

export interface Band {
  id: string;
  name: string;
  logo?: string;
  description: string;
  genres: string[];
  city: string;
  contactPhone: string;
  socialLinks: {
    instagram?: string;
    youtube?: string;
    spotify?: string;
    website?: string;
  };
}

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "PROPOSAL_SENT"
  | "NEGOTIATION"
  | "WON"
  | "LOST";

export interface EventLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  eventType: string;
  guests: number;
  city: string;
  date: string;
  status: LeadStatus;
  heatScore: number;
  notes?: string;
  createdAt: string;
}

export type ProposalStatus = "DRAFT" | "SENT" | "VIEWED" | "ACCEPTED" | "DECLINED" | "EXPIRED";
export type PackageType = "BASIC" | "STANDARD" | "PREMIUM" | "CUSTOM";

export interface Proposal {
  id: string;
  leadId: string;
  title: string;
  packageType: PackageType;
  price: number;
  expiresAt: string;
  status: ProposalStatus;
  acceptedAt?: string;
  publicLink: string;
  notes?: string;
  createdAt: string;
}

export type Availability = "AVAILABLE" | "BUSY" | "ON_LEAVE";

export interface Musician {
  id: string;
  name: string;
  instrument: string;
  cacheValue: number;
  availability: Availability;
  transportCost: number;
  phone?: string;
  notes?: string;
}

export interface EventBooking {
  id: string;
  leadId?: string;
  proposalId?: string;
  title: string;
  eventDate: string;
  venue: string;
  duration: number;
  setupTime: number;
  totalCost: number;
  profit: number;
  musicianIds: string[];
  status: "SCHEDULED" | "CONFIRMED" | "COMPLETED" | "CANCELED";
  notes?: string;
}

export type AutomationTrigger =
  | "LEAD_CREATED"
  | "PROPOSAL_SENT"
  | "PROPOSAL_VIEWED"
  | "PROPOSAL_EXPIRING"
  | "EVENT_UPCOMING";
export type AutomationChannel = "WHATSAPP" | "EMAIL" | "SMS";

export interface FollowUpAutomation {
  id: string;
  name: string;
  triggerType: AutomationTrigger;
  delayDays: number;
  channel: AutomationChannel;
  messageTemplate: string;
  active: boolean;
}

export type PaymentStatus = "PENDING" | "PAID" | "LATE" | "REFUNDED";

export interface Contract {
  id: string;
  bookingId: string;
  signedAt?: string;
  fileUrl?: string;
  paymentStatus: PaymentStatus;
  installmentCount: number;
  totalValue: number;
  createdAt: string;
}

export type PaymentMethod = "PIX" | "CREDIT_CARD" | "BOLETO" | "TRANSFER" | "CASH";

export interface Payment {
  id: string;
  contractId: string;
  amount: number;
  method: PaymentMethod;
  dueDate: string;
  status: PaymentStatus;
  transactionId?: string;
  installmentNumber: number;
}
