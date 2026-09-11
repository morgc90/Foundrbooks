// Arithmetic behind the Section 23 interactive example.
//
// Kept apart from the component so it can be tested on its own, and written to
// match the practice's transition engine run monthly: a contract is split into
// twelve monthly amounts to the cent, with any leftover cents going to the
// earliest months, so the parts always add back to the contract value.

export const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

// Months are counted as year * 12 + monthIndex so ranges are simple arithmetic.
export const monthLabel = (m) => `${MONTHS[m % 12]} ${Math.floor(m / 12)}`;
export const lastDay = (m) => new Date(Math.floor(m / 12), (m % 12) + 1, 0).getDate();
export const monthEndLabel = (m) => `${lastDay(m)} ${MONTHS[m % 12]} ${Math.floor(m / 12)}`;

// The first accounting period beginning on or after 1 January 2026 starts the
// month after the year end, in 2026: a December year end switches over in
// January 2026, a March year end in April 2026.
export const switchoverFor = (yearEndMonth) => 2026 * 12 + ((yearEndMonth + 1) % 12);

export function monthlyCents(value) {
  const cents = Math.round(value * 100);
  const base = Math.floor(cents / 12);
  const extra = cents - base * 12;
  return Array.from({ length: 12 }, (_, i) => base + (i < extra ? 1 : 0));
}

/**
 * One annual contract, paid in full when it starts, `startOffset` months
 * before the switchover (1-12). Returns everything the example displays.
 * Amounts are in euro; the adjustment is old basis less new basis to date
 * (modified retrospective), which is what comes off retained earnings.
 */
export function computeExample({ value, yearEnd, startOffset, policy }) {
  const switchover = switchoverFor(yearEnd);
  const start = switchover - startOffset;
  const months = monthlyCents(value);
  const monthsBefore = Math.min(12, startOffset);
  const beforeCents = months.slice(0, monthsBefore).reduce((a, b) => a + b, 0);
  const totalCents = Math.round(value * 100);
  const earnedBefore = beforeCents / 100;
  const earnedAfter = (totalCents - beforeCents) / 100;
  const oldPrior = policy === "invoice" ? totalCents / 100 : earnedBefore;
  const oldFirst = policy === "invoice" ? 0 : earnedAfter;
  const adjustment = Math.round((oldPrior - earnedBefore) * 100) / 100;
  return {
    switchover, start, monthsBefore, monthsAfter: 12 - monthsBefore,
    earnedBefore, earnedAfter, oldPrior, oldFirst, adjustment,
    completed: monthsBefore === 12,
  };
}
