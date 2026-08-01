import {
  CalendarDays,
  TrendingUp,
  Wallet,
  ShieldCheck,
  Briefcase,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { FundData, FundReturnPeriod } from "@/lib/sanity";

const EMPTY_DISPLAY = "-";

export function formatDisplayValue(
  value?: string | number | null,
  fallback: string = EMPTY_DISPLAY
): string {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "number" && Number.isNaN(value)) return fallback;
  const normalized = String(value).trim();
  return normalized.length > 0 ? normalized : fallback;
}

export function formatNavDisplay(nav?: string | null): string {
  const raw = nav?.trim() ?? "";
  if (!raw || raw === "N/A") return EMPTY_DISPLAY;

  const parsedNav = Number(raw);
  if (Number.isNaN(parsedNav)) return EMPTY_DISPLAY;

  return parsedNav.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatNavCurrency(nav?: string | null): string {
  const formatted = formatNavDisplay(nav);
  return formatted === EMPTY_DISPLAY ? EMPTY_DISPLAY : `${formatted}`;
}

export interface FundCardMetrics {
  classification: string;
  rating: number;
  nav: string;
  navChange: string;
  expense: string;
}

export function getFundCardMetrics(fund: FundData): FundCardMetrics {
  const rating = fund.heroMetrics?.rating;
  return {
    classification: formatDisplayValue(fund.heroMetrics?.classification, ""),
    rating: typeof rating === "number" && rating > 0 ? rating : 0,
    nav: formatNavDisplay(fund.heroMetrics?.nav),
    navChange: formatDisplayValue(fund.heroMetrics?.navChange),
    expense: formatDisplayValue(fund.keyFacts?.expenseRatio),
  };
}

export interface KeyFactItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function buildKeyFactItems(fund: FundData): KeyFactItem[] {
  const facts = fund.keyFacts;

  return [
    { icon: CalendarDays, label: "Inception Date", value: formatDisplayValue(facts?.inceptionDate) },
    { icon: TrendingUp, label: "CAGR (Est.)", value: formatDisplayValue(facts?.cagr) },
    { icon: Wallet, label: "Fund Size (AUM)", value: formatDisplayValue(facts?.aum) },
    { icon: ShieldCheck, label: "Benchmark Index", value: formatDisplayValue(facts?.benchmark) },
    { icon: Briefcase, label: "Min Investment", value: formatDisplayValue(facts?.minInvestment) },
    { icon: Sparkles, label: "Exit Load Parameter", value: formatDisplayValue(facts?.exitLoad) },
    { icon: Sparkles, label: "Expense Ratio (TER)", value: formatDisplayValue(facts?.expenseRatio) },
  ];
}

export interface SparklinePaths {
  fundPolyline: string;
  fundPolygon: string;
  benchmarkPolyline: string;
}

function isUsablePeriod(period: FundReturnPeriod): period is FundReturnPeriod & { fundReturn: number } {
  return typeof period.fundReturn === "number" && !Number.isNaN(period.fundReturn);
}

export function buildSparklinePath(
  returnsPeriods?: FundReturnPeriod[] | null
): SparklinePaths | null {
  const usable = (returnsPeriods || []).filter(isUsablePeriod);
  if (usable.length === 0) return null;

  const width = 800;
  const height = 140;
  const paddingY = 16;
  const drawableHeight = height - paddingY * 2;

  const values = usable.flatMap((period) => {
    const points = [period.fundReturn];
    if (typeof period.benchmarkReturn === "number" && !Number.isNaN(period.benchmarkReturn)) {
      points.push(period.benchmarkReturn);
    }
    return points;
  });

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const toY = (value: number) =>
    paddingY + drawableHeight - ((value - min) / range) * drawableHeight;

  const stepX = usable.length === 1 ? 0 : width / (usable.length - 1);

  const fundPoints = usable.map((period, index) => {
    const x = usable.length === 1 ? width / 2 : index * stepX;
    return `${x},${toY(period.fundReturn)}`;
  });

  const benchmarkPoints = usable.map((period, index) => {
    const x = usable.length === 1 ? width / 2 : index * stepX;
    const value =
      typeof period.benchmarkReturn === "number" && !Number.isNaN(period.benchmarkReturn)
        ? period.benchmarkReturn
        : period.fundReturn;
    return `${x},${toY(value)}`;
  });

  return {
    fundPolyline: fundPoints.join(" "),
    fundPolygon: `0,${height} ${fundPoints.join(" ")} ${width},${height}`,
    benchmarkPolyline: benchmarkPoints.join(" "),
  };
}

export function getManagerInitials(name?: string, initials?: string): string {
  const explicit = initials?.trim();
  if (explicit) return explicit.slice(0, 3).toUpperCase();

  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return EMPTY_DISPLAY;

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
