import {
  buildWeeks,
  daysInMonth,
  monthsBetween,
  nextRange,
  toIso,
  weekdayIndex,
  yearOf,
  monthOf,
  EMPTY_RANGE,
} from './date-utils';

describe('toIso / yearOf / monthOf', () => {
  it('zero-pads month and day so ISO strings sort chronologically', () => {
    expect(toIso(2026, 1, 5)).toBe('2026-01-05');
    expect(toIso(2026, 12, 31)).toBe('2026-12-31');
    // A garantia que o componente usa em vez de parsear: `<` é ordem de calendário.
    expect(toIso(2026, 1, 5) < toIso(2026, 10, 5)).toBe(true);
  });

  it('reads year and month back out', () => {
    expect(yearOf('2026-05-24')).toBe(2026);
    expect(monthOf('2026-05-24')).toBe(5);
  });
});

describe('daysInMonth', () => {
  it('knows the ordinary months', () => {
    expect(daysInMonth(2026, 1)).toBe(31);
    expect(daysInMonth(2026, 4)).toBe(30);
    expect(daysInMonth(2026, 12)).toBe(31);
  });

  it('handles February across the leap-year rules', () => {
    expect(daysInMonth(2027, 2)).toBe(28);
    expect(daysInMonth(2028, 2)).toBe(29); // divisível por 4
    expect(daysInMonth(2100, 2)).toBe(28); // século não-bissexto
    expect(daysInMonth(2000, 2)).toBe(29); // divisível por 400
  });
});

describe('weekdayIndex', () => {
  it('counts from Monday, not Sunday', () => {
    expect(weekdayIndex(2026, 6, 1)).toBe(0); // 1º/jun/2026 é segunda
    expect(weekdayIndex(2026, 5, 1)).toBe(4); // 1º/mai/2026 é sexta
    expect(weekdayIndex(2026, 5, 31)).toBe(6); // 31/mai/2026 é domingo
  });
});

describe('monthsBetween', () => {
  it('returns a single month when the window fits in one', () => {
    expect(monthsBetween('2026-05-01', '2026-05-31')).toEqual([{ year: 2026, month: 5 }]);
  });

  it('is inclusive on both ends', () => {
    expect(monthsBetween('2026-05-15', '2026-07-02')).toEqual([
      { year: 2026, month: 5 },
      { year: 2026, month: 6 },
      { year: 2026, month: 7 },
    ]);
  });

  it('rolls the year over from December to January', () => {
    expect(monthsBetween('2026-11-10', '2027-02-03')).toEqual([
      { year: 2026, month: 11 },
      { year: 2026, month: 12 },
      { year: 2027, month: 1 },
      { year: 2027, month: 2 },
    ]);
  });

  it('emits one month for an inverted window instead of looping forever', () => {
    expect(monthsBetween('2026-07-01', '2026-03-01')).toEqual([{ year: 2026, month: 7 }]);
  });
});

describe('buildWeeks', () => {
  it('pads the first week up to the weekday the month starts on', () => {
    const weeks = buildWeeks(2026, 5); // maio/2026 começa na sexta
    expect(weeks[0]?.slice(0, 4)).toEqual([null, null, null, null]);
    expect(weeks[0]?.[4]).toEqual({ day: 1, iso: '2026-05-01' });
  });

  it('starts a month that begins on Monday with no padding', () => {
    const weeks = buildWeeks(2026, 6);
    expect(weeks[0]?.[0]).toEqual({ day: 1, iso: '2026-06-01' });
  });

  it('pads the last week and keeps every row at 7 cells', () => {
    const weeks = buildWeeks(2026, 6); // 30 dias, começa na segunda
    expect(weeks).toHaveLength(5);
    expect(weeks.every((week) => week.length === 7)).toBe(true);
    expect(weeks[4]?.slice(2)).toEqual([null, null, null, null, null]);
  });

  it('spills into a 6th row when the month needs it', () => {
    // ago/2026: 31 dias começando no sábado — 5 vazias + 31 não cabem em 5 linhas.
    expect(buildWeeks(2026, 8)).toHaveLength(6);
  });

  it('covers every day of the month exactly once', () => {
    const dias = buildWeeks(2026, 5)
      .flat()
      .filter((cell) => cell !== null)
      .map((cell) => cell.day);
    expect(dias).toHaveLength(31);
    expect(dias[0]).toBe(1);
    expect(dias[30]).toBe(31);
  });
});

describe('nextRange', () => {
  it('takes the first tap as the departure', () => {
    expect(nextRange(EMPTY_RANGE, '2026-05-24')).toEqual({ start: '2026-05-24', end: null });
  });

  it('closes the range when the second tap is later', () => {
    expect(nextRange({ start: '2026-05-24', end: null }, '2026-05-26')).toEqual({
      start: '2026-05-24',
      end: '2026-05-26',
    });
  });

  // Regra da anotação de dev do Figma (nó 3013:7220), não o reinício ingênuo.
  it('swaps the ends when the second tap is earlier', () => {
    expect(nextRange({ start: '2026-05-24', end: null }, '2026-05-22')).toEqual({
      start: '2026-05-22',
      end: '2026-05-24',
    });
  });

  it('restarts from the tapped day once the range is closed', () => {
    expect(nextRange({ start: '2026-05-22', end: '2026-05-24' }, '2026-05-28')).toEqual({
      start: '2026-05-28',
      end: null,
    });
  });

  it('restarts even when the tap lands inside the closed range', () => {
    expect(nextRange({ start: '2026-05-22', end: '2026-05-26' }, '2026-05-24')).toEqual({
      start: '2026-05-24',
      end: null,
    });
  });

  it('closes a same-day trip when the departure is tapped again', () => {
    expect(nextRange({ start: '2026-05-24', end: null }, '2026-05-24')).toEqual({
      start: '2026-05-24',
      end: '2026-05-24',
    });
  });

  it('compares across months and years by string, not by parsing', () => {
    expect(nextRange({ start: '2027-01-03', end: null }, '2026-12-28')).toEqual({
      start: '2026-12-28',
      end: '2027-01-03',
    });
  });
});
