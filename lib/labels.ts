import type {
  LeadStatus,
  ProposalStatus,
  Availability,
  PaymentStatus,
  PaymentMethod,
  AutomationTrigger,
  AutomationChannel,
  PackageType,
} from "@/types/entities";

export const LEAD_STATUS_LABEL: Record<LeadStatus, string> = {
  NEW: "Novo",
  CONTACTED: "Contatado",
  QUALIFIED: "Qualificado",
  PROPOSAL_SENT: "Proposta enviada",
  NEGOTIATION: "Negociação",
  WON: "Ganho",
  LOST: "Perdido",
};

export const LEAD_STATUS_ORDER: LeadStatus[] = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL_SENT",
  "NEGOTIATION",
  "WON",
  "LOST",
];

export function leadStatusVariant(s: LeadStatus) {
  switch (s) {
    case "WON":
      return "success" as const;
    case "LOST":
      return "destructive" as const;
    case "NEGOTIATION":
      return "accent" as const;
    case "PROPOSAL_SENT":
      return "warning" as const;
    case "QUALIFIED":
      return "info" as const;
    default:
      return "secondary" as const;
  }
}

export const PROPOSAL_STATUS_LABEL: Record<ProposalStatus, string> = {
  DRAFT: "Rascunho",
  SENT: "Enviada",
  VIEWED: "Visualizada",
  ACCEPTED: "Aceita",
  DECLINED: "Recusada",
  EXPIRED: "Expirada",
};

export function proposalStatusVariant(s: ProposalStatus) {
  switch (s) {
    case "ACCEPTED":
      return "success" as const;
    case "DECLINED":
    case "EXPIRED":
      return "destructive" as const;
    case "VIEWED":
      return "accent" as const;
    case "SENT":
      return "warning" as const;
    default:
      return "secondary" as const;
  }
}

export const PACKAGE_TYPE_LABEL: Record<PackageType, string> = {
  BASIC: "Básico",
  STANDARD: "Padrão",
  PREMIUM: "Premium",
  CUSTOM: "Personalizado",
};

export const AVAILABILITY_LABEL: Record<Availability, string> = {
  AVAILABLE: "Disponível",
  BUSY: "Ocupado",
  ON_LEAVE: "Afastado",
};

export function availabilityVariant(s: Availability) {
  switch (s) {
    case "AVAILABLE":
      return "success" as const;
    case "BUSY":
      return "warning" as const;
    case "ON_LEAVE":
      return "secondary" as const;
  }
}

export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  PENDING: "Pendente",
  PAID: "Pago",
  LATE: "Atrasado",
  REFUNDED: "Estornado",
};

export function paymentStatusVariant(s: PaymentStatus) {
  switch (s) {
    case "PAID":
      return "success" as const;
    case "LATE":
      return "destructive" as const;
    case "REFUNDED":
      return "secondary" as const;
    default:
      return "warning" as const;
  }
}

export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  PIX: "PIX",
  CREDIT_CARD: "Cartão de crédito",
  BOLETO: "Boleto",
  TRANSFER: "Transferência",
  CASH: "Dinheiro",
};

export const AUTOMATION_TRIGGER_LABEL: Record<AutomationTrigger, string> = {
  LEAD_CREATED: "Novo lead criado",
  PROPOSAL_SENT: "Proposta enviada",
  PROPOSAL_VIEWED: "Proposta visualizada",
  PROPOSAL_EXPIRING: "Proposta expirando",
  EVENT_UPCOMING: "Evento se aproximando",
};

export const AUTOMATION_CHANNEL_LABEL: Record<AutomationChannel, string> = {
  WHATSAPP: "WhatsApp",
  EMAIL: "E-mail",
  SMS: "SMS",
};
