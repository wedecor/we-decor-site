import { describe, expect, it } from 'vitest';
import { optionalEmail } from '@/lib/schema/_helpers';
import { buildOrganization } from '@/lib/schema/organization';
import { buildContactPageSchema } from '@/lib/schema/contact';
import { NAP } from '@/lib/local-seo/constants';

describe('optionalEmail', () => {
  it('omits email when unset or blank', () => {
    expect(optionalEmail(undefined)).toEqual({});
    expect(optionalEmail('')).toEqual({});
    expect(optionalEmail('   ')).toEqual({});
    expect(optionalEmail(NAP.email)).toEqual({ email: NAP.email });
  });

  it('omits ContactPoint.email when the helper returns empty', () => {
    const point = {
      '@type': 'ContactPoint',
      telephone: NAP.telephone,
      ...optionalEmail(''),
    };
    expect(point).not.toHaveProperty('email');
  });
});

describe('schema email when configured', () => {
  it('publishes email on LocalBusiness when NAP.email is set', () => {
    const org = buildOrganization();
    expect(org.email).toBe(NAP.email);
  });

  it('publishes email on the contact-page ContactPoint when NAP.email is set', () => {
    const nodes = buildContactPageSchema({
      name: 'Contact',
      description: 'Contact',
      url: 'https://www.wedecorevents.com/contact',
    });
    const point = nodes.find((n) => n['@type'] === 'ContactPoint');
    expect(point?.email).toBe(NAP.email);
  });
});
