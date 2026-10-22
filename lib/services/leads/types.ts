/** Normalized lead record — CRM/DB-ready shape */
export type LeadSource = 'contact_form' | 'whatsapp_direct';

export type LeadRecord = {
  id: string;
  createdAt: string;
  source: LeadSource;
  name: string;
  phone: string;
  email: string | null;
  /** The app's event-type value, e.g. "corporate_event". */
  eventType: string;
  /** What people read, e.g. "Corporate Event". */
  eventTypeLabel: string;
  eventDate: string | null;
  budget: string | null;
  /** Event location text (area or venue). */
  area: string | null;
  place: {
    placeId: string;
    address: string | null;
    lat: number | null;
    lng: number | null;
    area: string | null;
    city: string | null;
  } | null;
  message: string;
  metadata: {
    userAgent: string | null;
    ipHash: string | null;
    locale: string | null;
    pageUrl: string | null;
  };
};

export type CreateLeadInput = {
  name: string;
  phone?: string;
  email?: string | null;
  eventType: string;
  eventTypeLabel?: string | null;
  eventDate?: string | null;
  budget?: string | null;
  area?: string | null;
  place?: LeadRecord['place'];
  message?: string;
  source?: LeadSource;
  metadata?: Partial<LeadRecord['metadata']>;
};

export type CreateLeadResult = {
  lead: LeadRecord;
  whatsappUrl: string;
  notifications: {
    emailSent: boolean;
    webhookDelivered: boolean;
  };
};

export type ApiErrorCode =
  | 'VALIDATION_ERROR'
  | 'RATE_LIMITED'
  | 'CAPTCHA_FAILED'
  | 'SPAM_DETECTED'
  | 'ORIGIN_FORBIDDEN'
  | 'PAYLOAD_TOO_LARGE'
  | 'INTERNAL_ERROR';

export type ApiErrorBody = {
  success: false;
  error: {
    code: ApiErrorCode;
    message: string;
    details?: Array<{ path: string; message: string }>;
  };
};

export type ApiSuccessBody = {
  success: true;
  leadId: string;
  whatsappUrl: string;
  message: string;
};
