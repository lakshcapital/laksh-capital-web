import type { AugmentedMetrics } from "../types";

export function getAugmentedFundMetrics(
  fundName: string,
  categorySlug: string
): AugmentedMetrics {
  const hash = fundName.length + (fundName.charCodeAt(0) || 0);

  if (categorySlug === "aif") {
    return {
      ticker: `AIF-${hash % 100}`,
      classification: "Alternative Allocation Strategy",
      navChange: `+${(10 + (hash % 10)).toFixed(1)}%`,
      expense: "2.0% + 20%",
      rating: 5,
    };
  }

  const changes = ["+1.24%", "+0.82%", "+1.61%", "+0.94%", "+2.11%"];
  const expenses = ["0.42%", "0.55%", "0.66%", "0.24%", "0.71%"];

  return {
    ticker:
      fundName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .substring(0, 4) + `-${hash % 100}`,
    classification:
      categorySlug === "pms"
        ? "Concentrated Equity Portfolio"
        : "Inbound · Equity Growth",
    navChange: changes[hash % changes.length],
    expense: expenses[hash % expenses.length],
    rating: hash % 2 === 0 ? 5 : 4,
  };
}
