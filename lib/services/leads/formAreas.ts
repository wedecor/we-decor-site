import { AREAS } from '@/app/(site)/_data/locations';

/**
 * Area suggestions for the enquiry form: every locality page, A–Z.
 * The city-wide "Bangalore" catch-all is left out — it says nothing about
 * where the event is, and the app asks for a real area before approving.
 */
export const AREAS_FOR_FORM: { slug: string; name: string }[] = AREAS.filter(
  (a) => a.slug !== 'bangalore'
)
  .map((a) => ({ slug: a.slug, name: a.name }))
  .sort((a, b) => a.name.localeCompare(b.name));
