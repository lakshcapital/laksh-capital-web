export function formatINR(num: number): string {
  if (!isFinite(num) || isNaN(num)) return "₹0";
  return Math.round(num).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
}

export function formatINRShort(num: number): string {
  if (!isFinite(num) || isNaN(num)) return "₹0";
  if (num >= 1e7) return `₹${(num / 1e7).toFixed(2)} Cr`;
  if (num >= 1e5) return `₹${(num / 1e5).toFixed(2)} L`;
  if (num >= 1e3) return `₹${Math.round(num / 1e3)} K`;
  return `₹${Math.round(num)}`;
}

export interface CalcResult {
  futureValue: number;
  invested: number;
  returns: number;
}

// SIP Future Value
// FV = P × [((1 + r)^n − 1) / r] × (1 + r)
// where P = monthly investment, r = monthly rate, n = months
export function calculateSIP(
  monthly: number,
  annualRate: number,
  years: number
): CalcResult {
  const months = years * 12;
  const r = annualRate / 12 / 100;
  let fv: number;
  if (r === 0) {
    fv = monthly * months;
  } else {
    fv = monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
  }
  const invested = monthly * months;
  return { futureValue: fv, invested, returns: fv - invested };
}

// Lumpsum: FV = P × (1 + r)^n
export function calculateLumpsum(
  lumpsum: number,
  annualRate: number,
  years: number
): CalcResult {
  const r = annualRate / 100;
  const fv = lumpsum * Math.pow(1 + r, years);
  return { futureValue: fv, invested: lumpsum, returns: fv - lumpsum };
}

// Goal SIP — reverse-calculate monthly SIP needed to hit target FV
export function calculateGoalSIP(
  targetFV: number,
  annualRate: number,
  years: number
): { monthly: number } & CalcResult {
  const months = years * 12;
  const r = annualRate / 12 / 100;
  let monthly: number;
  if (r === 0) {
    monthly = targetFV / months;
  } else {
    monthly = targetFV / (((Math.pow(1 + r, months) - 1) / r) * (1 + r));
  }
  const invested = monthly * months;
  return {
    monthly,
    futureValue: targetFV,
    invested,
    returns: targetFV - invested,
  };
}

export interface RetirementInputs {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  monthlyExpenses: number;
  inflation: number;
  preReturn: number;
  postReturn: number;
}

export interface RetirementResult {
  yearsToRetire: number;
  yearsInRetirement: number;
  monthlyExpensesAtRetirement: number;
  corpusNeeded: number;
  monthlySIP: number;
}

export function calculateRetirement(args: RetirementInputs): RetirementResult {
  const yearsToRetire = Math.max(0, args.retirementAge - args.currentAge);
  const yearsInRetirement = Math.max(
    0,
    args.lifeExpectancy - args.retirementAge
  );

  const monthlyExpensesAtRetirement =
    args.monthlyExpenses * Math.pow(1 + args.inflation / 100, yearsToRetire);
  const annualExpensesAtRetirement = monthlyExpensesAtRetirement * 12;

  // Corpus = PV of annuity using real return (post-retirement return adjusted for inflation)
  const realReturn =
    (1 + args.postReturn / 100) / (1 + args.inflation / 100) - 1;

  let corpusNeeded: number;
  if (Math.abs(realReturn) < 1e-9 || yearsInRetirement === 0) {
    corpusNeeded = annualExpensesAtRetirement * yearsInRetirement;
  } else {
    corpusNeeded =
      annualExpensesAtRetirement *
      ((1 - Math.pow(1 + realReturn, -yearsInRetirement)) / realReturn);
  }

  const monthlyR = args.preReturn / 12 / 100;
  const monthsToRetire = yearsToRetire * 12;
  let monthlySIP: number;
  if (monthsToRetire === 0) {
    monthlySIP = 0;
  } else if (monthlyR === 0) {
    monthlySIP = corpusNeeded / monthsToRetire;
  } else {
    monthlySIP =
      corpusNeeded /
      (((Math.pow(1 + monthlyR, monthsToRetire) - 1) / monthlyR) *
        (1 + monthlyR));
  }

  return {
    yearsToRetire,
    yearsInRetirement,
    monthlyExpensesAtRetirement,
    corpusNeeded,
    monthlySIP,
  };
}

// Series for growth chart (year-by-year)
export function sipGrowthSeries(
  monthly: number,
  annualRate: number,
  years: number
): { year: number; invested: number; value: number }[] {
  const points = [];
  for (let y = 1; y <= years; y++) {
    const r = calculateSIP(monthly, annualRate, y);
    points.push({ year: y, invested: r.invested, value: r.futureValue });
  }
  return points;
}

export function lumpsumGrowthSeries(
  lumpsum: number,
  annualRate: number,
  years: number
): { year: number; invested: number; value: number }[] {
  const points = [];
  for (let y = 1; y <= years; y++) {
    const r = calculateLumpsum(lumpsum, annualRate, y);
    points.push({ year: y, invested: lumpsum, value: r.futureValue });
  }
  return points;
}
