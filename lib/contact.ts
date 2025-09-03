// Centralized contact configuration
// Single source of truth for all contact information

export const CONTACT = {
  WHATSAPP_NUMBER: '+919880544452',
  PRIMARY_NUMBER: '+919880544452',
  SECONDARY_NUMBER: '+919591232166',
  displayNumbers: ['+91 88805 44452', '+91 95912 32166'],

  // Builds a WhatsApp URL with optional prefill
  waUrl: (msg?: string) => {
    const base = 'https://wa.me/919880544452';
    if (!msg) return base;
    return `${base}?text=${encodeURIComponent(msg)}`;
  },

  // Builds WhatsApp URL for specific locality
  waUrlForLocality: (locality: string) => {
    const message = `Hi! I found you on We Decor site. I'm planning an event in ${locality}. Date: _____. Please share themes & pricing.`;
    return CONTACT.waUrl(message);
  },

  telLinks: () => [
    { raw: '+919880544452', label: '+91 88805 44452' },
    { raw: '+919591232166', label: '+91 95912 32166' },
  ],

  // Primary contact methods
  primary: {
    whatsapp: '+919880544452',
    phone: '+919880544452',
    display: '+91 88805 44452',
  },

  // Secondary contact methods
  secondary: {
    phone: '+919591232166',
    display: '+91 95912 32166',
  },
} as const;

// Validation helpers
export const validateContact = () => {
  const issues: string[] = [];

  if (!CONTACT.WHATSAPP_NUMBER.startsWith('+91')) {
    issues.push('WhatsApp number must start with +91');
  }

  if (!CONTACT.PRIMARY_NUMBER.startsWith('+91')) {
    issues.push('Primary number must start with +91');
  }

  if (!CONTACT.SECONDARY_NUMBER.startsWith('+91')) {
    issues.push('Secondary number must start with +91');
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
};
