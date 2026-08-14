// Centralized contact configuration — single source of truth for NAP / CTAs
// Primary: +91 8880544452 | Secondary: +91 9591232166

/** E.164 digits only (no +) for wa.me / tel: hrefs */
export const PHONE_E164 = {
  primary: '918880544452',
  secondary: '919591232166',
} as const;

/** `918880544452` → `+91 8880544452` */
export function displayFromE164(digits: string): string {
  if (digits.startsWith('91') && digits.length === 12) {
    return `+91 ${digits.slice(2)}`;
  }
  return `+${digits}`;
}

export const CONTACT = {
  WHATSAPP_NUMBER: `+${PHONE_E164.primary}`,
  PRIMARY_NUMBER: `+${PHONE_E164.primary}`,
  SECONDARY_NUMBER: `+${PHONE_E164.secondary}`,
  displayNumbers: [
    displayFromE164(PHONE_E164.primary),
    displayFromE164(PHONE_E164.secondary),
  ] as const,

  waUrl: (msg?: string) => {
    const base = `https://wa.me/${PHONE_E164.primary}`;
    if (!msg) return base;
    return `${base}?text=${encodeURIComponent(msg)}`;
  },

  waUrlForLocality: (locality: string) => {
    const message = `Hi! I found you on We Decor site. I'm planning an event in ${locality}. Date: _____. Please share themes & pricing.`;
    return CONTACT.waUrl(message);
  },

  /** Contextual pre-filled message for homepage WhatsApp CTAs (hero, CTA band, contact section). */
  waUrlForHome: () => {
    const message =
      "Hi We Decor! I'm looking for decoration for my upcoming event in Bangalore. Could you please share pricing and availability?";
    return CONTACT.waUrl(message);
  },

  telLinks: () =>
    [
      { raw: `+${PHONE_E164.primary}`, label: displayFromE164(PHONE_E164.primary) },
      { raw: `+${PHONE_E164.secondary}`, label: displayFromE164(PHONE_E164.secondary) },
    ] as const,

  primary: {
    whatsapp: `+${PHONE_E164.primary}`,
    phone: `+${PHONE_E164.primary}`,
    display: displayFromE164(PHONE_E164.primary),
  },

  secondary: {
    phone: `+${PHONE_E164.secondary}`,
    display: displayFromE164(PHONE_E164.secondary),
  },
} as const;

export const validateContact = () => {
  const issues: string[] = [];

  if (!CONTACT.PRIMARY_NUMBER.startsWith('+91')) {
    issues.push('Primary number must start with +91');
  }
  if (!CONTACT.SECONDARY_NUMBER.startsWith('+91')) {
    issues.push('Secondary number must start with +91');
  }
  if (PHONE_E164.primary !== '918880544452') {
    issues.push('Primary E.164 must be 918880544452');
  }
  if (PHONE_E164.secondary !== '919591232166') {
    issues.push('Secondary E.164 must be 919591232166');
  }

  return { isValid: issues.length === 0, issues };
};
