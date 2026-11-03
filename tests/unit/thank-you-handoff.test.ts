import { afterEach, describe, expect, it, vi } from 'vitest';
import { readLeadWhatsAppUrl, stashLeadWhatsAppUrl } from '@/lib/services/leads/thankYouHandoff';

function fakeStorage() {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
  };
}

describe('thank-you WhatsApp handoff', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('round-trips a wa.me link', () => {
    vi.stubGlobal('window', { sessionStorage: fakeStorage() });
    stashLeadWhatsAppUrl('https://wa.me/918880544452?text=Hi');
    expect(readLeadWhatsAppUrl()).toBe('https://wa.me/918880544452?text=Hi');
  });

  it('refuses anything that is not a wa.me link', () => {
    vi.stubGlobal('window', { sessionStorage: fakeStorage() });
    stashLeadWhatsAppUrl('javascript:alert(1)');
    expect(readLeadWhatsAppUrl()).toBeNull();
  });

  it('survives storage being unavailable', () => {
    vi.stubGlobal('window', {
      get sessionStorage(): Storage {
        throw new Error('SecurityError');
      },
    });
    expect(() => stashLeadWhatsAppUrl('https://wa.me/1')).not.toThrow();
    expect(readLeadWhatsAppUrl()).toBeNull();
  });
});
