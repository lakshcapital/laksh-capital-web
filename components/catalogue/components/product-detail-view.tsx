"use client";

import * as React from "react";
import { BackButton } from "./shared";
import { FundData } from "@/lib/sanity";
import type { CategoryAccent } from "../types";
import { buildKeyFactItems, getFundCardMetrics } from "../utils/fund-display";
import { cataloguePaths } from "../utils/paths";

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
  categorySlug: string;
  accent: CategoryAccent;
}

export const ProductDetailView = React.memo(function ProductDetailView({
  fund,
  categoryTitle,
  categoryImage,
  categorySlug,
  accent,
}: ProductDetailViewProps) {
  const metrics = React.useMemo(() => getFundCardMetrics(fund), [fund]);
  const factItems = React.useMemo(() => buildKeyFactItems(fund), [fund]);

  return (
    <div className="animate-fade-up space-y-8 w-full">
      <BackButton href={cataloguePaths.category(categorySlug)} />
      {/* Product Hero */}
      <ProductHero 
        fund={fund}
        categoryTitle={categoryTitle}
        categoryImage={categoryImage}
        accent={accent}
        classification={metrics.classification}
        rating={metrics.rating}
        finalNavString={metrics.nav}
        navChange={metrics.navChange}
        navDate={fund.heroMetrics?.navDate}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 w-full">
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          <PerformanceBlock accent={accent} performance={fund.performance} />
          <StrategyBlock fund={fund} />
        </div>

        <aside className="lg:col-span-4 space-y-6 flex flex-col">
          <KeyFactsBlock items={factItems} />
          <ManagerBlock accent={accent} manager={fund.manager} />
          <InvestCTA accent={accent} />
        </aside>
      </div>
    </div>
  );
});

ProductDetailView.displayName = "ProductDetailView";
