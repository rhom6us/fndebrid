const prefixes = ['', 'K', 'M', 'G', 'T', 'P'];
const denominators = prefixes.map((_, i) => Math.pow(1000, i));
const LN1000 = Math.log(1000);
function log1000(x: number) {
  return Math.log(x) / LN1000;
}
function formatNumberPart(bytes: number, exponent: number) {
  if (bytes < 1000) {
    return bytes.toFixed(0);
  }
  return (bytes / denominators[exponent]).toPrecision(4);
}
export function formatBytes(bytes: number) {
  const exponent = Math.floor(log1000(bytes));
  return formatNumberPart(bytes, exponent) + `${prefixes[Math.max(0, exponent)]}B`;
}
