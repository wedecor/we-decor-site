export type CalendarCell = {
  iso: string | null;
  day: number | null;
  disabled: boolean;
};

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

export function toIso(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function parseIso(iso: string): { year: number; month: number; day: number } {
  const [year, month, day] = iso.split('-').map(Number);
  return { year, month, day };
}

export function addDays(iso: string, days: number): string {
  const { year, month, day } = parseIso(iso);
  const dt = new Date(Date.UTC(year, month - 1, day + days));
  return toIso(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
}

export function shiftMonth(
  year: number,
  month: number,
  delta: number
): { year: number; month: number } {
  const dt = new Date(Date.UTC(year, month - 1 + delta, 1));
  return { year: dt.getUTCFullYear(), month: dt.getUTCMonth() + 1 };
}

export function monthTitle(year: number, month: number): string {
  return new Intl.DateTimeFormat('en-GB', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

export function formatEventDateDisplay(iso: string): string {
  const { year, month, day } = parseIso(iso);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function monthGrid(year: number, month: number, minIso: string): CalendarCell[] {
  const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const cells: CalendarCell[] = [];

  for (let i = 0; i < firstWeekday; i += 1) {
    cells.push({ iso: null, day: null, disabled: true });
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const iso = toIso(year, month, day);
    cells.push({ iso, day, disabled: iso < minIso });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ iso: null, day: null, disabled: true });
  }
  return cells;
}
