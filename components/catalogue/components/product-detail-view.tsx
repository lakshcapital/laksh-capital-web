"use client";

import * as React from "react";
import { CalendarDays, TrendingUp, Wallet, ShieldCheck, Briefcase, Sparkles } from "lucide-react";
import { BackButton } from "./shared";
import { FundData } from "@/lib/sanity";
import type { CategoryAccent } from "../types";
import { formatLiveNav } from "../utils/formatters";
import { getAugmentedFundMetrics } from "../utils/mock-ledger-data";

import { ProductHero } from "./product-detail/product-hero";
import { PerformanceBlock } from "./product-detail/performance-block";
import { StrategyBlock } from "./product-detail/strategy-block";
import { KeyFactsBlock } from "./product-detail/key-facts-block";
import { ManagerBlock } from "./product-detail/manager-block";
import { InvestCTA } from "./product-detail/invest-cta";

interface ProductDetailViewProps {
  fund: FundData;
  categoryTitle: string;
  categoryImage: string;
  accent: CategoryAccent;
  onBack: () => void;
}

export const ProductDetailView = React.memo(function ProductDetailView({
  fund,
  categoryTitle,
  categoryImage,
  accent,
  onBack,
}: ProductDetailViewProps) {
  
  const metrics = React.useMemo(() => {
    return getAugmentedFundMetrics(fund.fundName || "", categoryTitle);
  }, [fund.fundName, categoryTitle]);

  const finalNavString = formatLiveNav(fund.liveNav);

  const factItems = React.useMemo(() => [
    { icon: CalendarDays, label: "Inception Date", value: fund.liveNavDate || "02-Jan-2018" },
    { icon: TrendingUp, label: "CAGR (Est.)", value: fund.baseReturnRate ? `${fund.baseReturnRate}%` : "18.4%" },
    { icon: Wallet, label: "Fund Size (AUM)", value: "₹14,250 Cr" },
    { icon: ShieldCheck, label: "Benchmark Index", value: "Nifty 50 TRI" },
    { icon: Briefcase, label: "Min Investment", value: "₹500 Core" },
    { icon: Sparkles, label: "Exit Load Parameter", value: fund.bonusRate ? `${fund.bonusRate}%` : "1.00%" },
    { icon: Sparkles, label: "Expense Ratio (TER)", value: metrics.expense },
  ], [fund, metrics]);

  return (
    <div className="animate-fade-up space-y-8 w-full">
      <BackButton onClick={onBack} />
      {/* Product Hero */}
      <ProductHero 
        fund={fund}
        categoryTitle={categoryTitle}
        categoryImage={categoryImage}
        accent={accent}
        ticker={metrics.ticker}
        rating={metrics.rating}
        classification={metrics.classification}
        finalNavString={finalNavString}
        navChange={metrics.navChange}
      />

      {/* Product Detail Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 w-full">
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          <PerformanceBlock accent={accent} />
          <StrategyBlock fund={fund} />
        </div>

        <aside className="lg:col-span-4 space-y-6 flex flex-col">
          <KeyFactsBlock items={factItems} />
          <ManagerBlock accent={accent} />
          <InvestCTA accent={accent} />
        </aside>
      </div>
    </div>
  );
});

ProductDetailView.displayName = "ProductDetailView";