import { describe, expect, it } from 'vitest';
import { AREAS_FOR_FORM, filterFormAreas, type FormArea } from '@/lib/services/leads/formAreas';

const AREAS: FormArea[] = [
  { slug: 'jayanagar', name: 'Jayanagar' },
  { slug: 'jp-nagar', name: 'JP Nagar' },
  { slug: 'whitefield', name: 'Whitefield' },
];

describe('filterFormAreas', () => {
  it('returns the full list for an empty query', () => {
    expect(filterFormAreas(AREAS, '')).toEqual(AREAS);
    expect(filterFormAreas(AREAS, '   ')).toEqual(AREAS);
  });

  it('ranks prefix matches before contains-matches', () => {
    expect(filterFormAreas(AREAS, 'ja').map((a) => a.slug)).toEqual(['jayanagar']);
    expect(filterFormAreas(AREAS, 'nagar').map((a) => a.slug)).toEqual(['jayanagar', 'jp-nagar']);
  });

  it('includes served neighbourhoods that have no locality page', () => {
    expect(filterFormAreas(AREAS_FOR_FORM, 'hoodi').map((a) => a.name)).toContain('Hoodi');
    expect(filterFormAreas(AREAS_FOR_FORM, 'kr puram').map((a) => a.name)).toContain('KR Puram');
  });
});
