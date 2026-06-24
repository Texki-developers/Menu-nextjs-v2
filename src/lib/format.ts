/** Format a number as an AED price string, e.g. 84 -> "AED 84.00". */
export function fmt(n: number): string {
  return "AED " + Number(n).toFixed(2);
}

/** Convert Western digits to Arabic-Indic digits (for RTL display). */
const AR_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
export function toArabicDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => AR_DIGITS[Number(d)]);
}
