/** Normalized lead record — CRM/DB-ready shape */
export type LeadSource = 'contact_form' | 'whatsapp_direct';

export type LeadRecord = {
  id: string;
  createdAt: string;
  source: LeadSource;
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string | null;
  budget: string | null;
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
  phone: string;
  email: string;
  eventType: string;
  eventDate?: string | null;
  budget?: string | null;
  message: string;
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
