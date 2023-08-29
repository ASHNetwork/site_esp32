export function normalizeNumber(cpercent: number): number {
  return Math.trunc(cpercent * 100) / 100;
}

export const SECONDS_FACTOR = 1000;
export const MINUTES_FACTOR = SECONDS_FACTOR * 60;
export const HOURS_FACTOR = MINUTES_FACTOR * 60;
export const DAYS_FACTOR = HOURS_FACTOR * 24;

const INTERVAL_PARSER = [
  { factor: DAYS_FACTOR, unit: "D" },
  { factor: HOURS_FACTOR, unit: "H" },
  { factor: MINUTES_FACTOR, unit: "M" },
];

export function getLastTime(interval: number): string {
  return INTERVAL_PARSER.reduce((acc, val) => {
    const res = (interval - (interval % val.factor)) / val.factor;
    interval -= res * val.factor;
    return res ? `${acc}${res}${val.unit}` : acc;
  }, "");
}

export function getPercent(
  value: number,
  maxValue: number,
  minValue: number
): number {
  return ((value - minValue) / (maxValue - minValue)) * 100;
}
