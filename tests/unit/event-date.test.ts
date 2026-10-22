import { describe, expect, it } from 'vitest';
import {
  addDays,
  formatEventDateDisplay,
  monthGrid,
  monthTitle,
  shiftMonth,
  toIso,
} from '@/lib/services/leads/eventDate';

describe('eventDate calendar', () => {
  it('formats a display date in long English', () => {
    expect(formatEventDateDisplay('2026-03-15')).toBe('15 March 2026');
    expect(monthTitle(2026, 3)).toBe('March 2026');
  });

  it('builds a Sunday-start grid and disables days before min', () => {
    const cells = monthGrid(2026, 3, '2026-03-10');
    expect(cells.length % 7).toBe(0);
    expect(cells.filter((c) => c.iso).map((c) => c.day)).toContain(1);
    expect(cells.find((c) => c.iso === '2026-03-09')?.disabled).toBe(true);
    expect(cells.find((c) => c.iso === '2026-03-10')?.disabled).toBe(false);
  });

  it('shifts months and days across year boundaries', () => {
    expect(shiftMonth(2026, 1, -1)).toEqual({ year: 2025, month: 12 });
    expect(addDays('2026-03-01', -1)).toBe('2026-02-28');
    expect(toIso(2026, 3, 5)).toBe('2026-03-05');
  });
});
