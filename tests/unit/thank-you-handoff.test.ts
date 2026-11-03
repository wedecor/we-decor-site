import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  consumeLeadWhatsAppUrl,
  resetLeadWhatsAppHandoff,
  stashLeadWhatsAppUrl,
} from '@/lib/services/leads/thankYouHandoff';

const KEY = 'wedecor:lead-whatsapp-url';
const URL_A = 'https://wa.me/918880544452?text=Enquiry%20A';

function fakeStorage() {
  const m = new Map<string, string>();
  return {
    map: m,
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
    removeItem: (k: string) => void m.delete(k),
  };
}

describe('thank-you WhatsApp handoff', () => {
  let storage: ReturnType<typeof fakeStorage>;

  beforeEach(() => {
    vi.useFakeTimers();
    resetLeadWhatsAppHandoff();
    storage = fakeStorage();
    vi.stubGlobal('window', { sessionStorage: storage });
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('returns the stashed wa.me link and removes it from sessionStorage', () => {
    stashLeadWhatsAppUrl(URL_A);
    expect(consumeLeadWhatsAppUrl()).toBe(URL_A);
    expect(storage.map.has(KEY)).toBe(false);
  });

  it('survives the Strict Mode double effect within one render', () => {
    stashLeadWhatsAppUrl(URL_A);
    expect(consumeLeadWhatsAppUrl()).toBe(URL_A); // first effect
    expect(consumeLeadWhatsAppUrl()).toBe(URL_A); // second effect, same task
  });

  it('a later visit in the same tab gets the plain link', () => {
    stashLeadWhatsAppUrl(URL_A);
    consumeLeadWhatsAppUrl();
    vi.runAllTimers(); // render finished; user navigates away and back
    expect(consumeLeadWhatsAppUrl()).toBeNull();
  });

  it('a new enquiry replaces the previous one', () => {
    stashLeadWhatsAppUrl(URL_A);
    consumeLeadWhatsAppUrl();
    const urlB = 'https://wa.me/918880544452?text=Enquiry%20B';
    stashLeadWhatsAppUrl(urlB);
    expect(consumeLeadWhatsAppUrl()).toBe(urlB);
  });

  it('refuses anything that is not a wa.me link, and still clears it', () => {
    stashLeadWhatsAppUrl('javascript:alert(1)');
    expect(consumeLeadWhatsAppUrl()).toBeNull();
    expect(storage.map.has(KEY)).toBe(false);
    storage.setItem(KEY, 'https://evil.example/wa.me/1');
    expect(consumeLeadWhatsAppUrl()).toBeNull();
  });

  it('returns null with nothing stashed', () => {
    expect(consumeLeadWhatsAppUrl()).toBeNull();
  });

  it('survives storage being unavailable', () => {
    vi.stubGlobal('window', {
      get sessionStorage(): Storage {
        throw new Error('SecurityError');
      },
    });
    expect(() => stashLeadWhatsAppUrl(URL_A)).not.toThrow();
    expect(consumeLeadWhatsAppUrl()).toBeNull();
  });
});
