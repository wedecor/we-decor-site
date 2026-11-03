import { AREAS } from '@/app/(site)/_data/locations';

/**
 * Neighbourhoods with their own /locations page, excluding the city-wide
 * /locations/bangalore catch-all (a city is not an "area served").
 *
 * Derived from AREAS so the "areas" figure on the homepage and /about cannot
 * drift again — it said "25+" long after the site reached 50 pages.
 */
export const SERVED_AREA_COUNT = AREAS.filter((a) => a.slug !== 'bangalore').length;
