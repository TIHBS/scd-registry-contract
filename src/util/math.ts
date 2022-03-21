export function round(num: number, roundToDigits: number = 2): number {
  const multiplicationFactor = 10 ** roundToDigits;
  return Math.round(num * multiplicationFactor) / multiplicationFactor;
}
