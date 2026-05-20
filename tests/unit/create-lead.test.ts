import { describe, expect, it } from 'vitest';
import { createLead } from '@/lib/services/leads/createLead';
import { buildWhatsAppUrl } from '@/lib/services/leads/notifications';

describe('createLead', () => {
  it('returns lead with whatsapp URL using centralized contact config', async () => {
    const result = await createLead({
      name: 'Test User',
      phone: '+918880544452',
      email: 'test@example.com',
      eventType: 'Birthday',
      message: 'Balloon decor for home party',
    });

    expect(result.lead.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    expect(result.whatsappUrl).toContain('wa.me/919880544452');
    expect(result.whatsappUrl).toContain('text=');
    expect(buildWhatsAppUrl(result.lead)).toBe(result.whatsappUrl);
  });
});
