import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FundData } from "@/lib/sanity";
import type { CategoryAccent } from "../types";
import { formatLiveNav } from "../utils/formatters";
import { getAugmentedFundMetrics } from "../utils/mock-ledger-data";
import { DataCell, FundBrandingIcon, StarRating } from "./shared";

interface FundCardProps {
  fund: FundData;
  categorySlug: string;
  accent: CategoryAccent;
  onViewDetails: (fundId: string) => void;
}

export const FundCard = React.memo(function FundCard({ fund, categorySlug, accent, onViewDetails }: FundCardProps) {
  const metrics = React.useMemo(() => {
    return getAugmentedFundMetrics(fund.fundName || "", categorySlug || "");
  }, [fund.fundName, categorySlug]);

  const finalNavString = formatLiveNav(fund.liveNav);

  const handleTrigger = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onViewDetails(fund._id);
  }, [fund._id, onViewDetails]);

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.12)] h-full">
      <div className="flex-1 flex flex-col">
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <FundBrandingIcon 
              imageUrl={fund.imageUrl} 
              fundName={fund.fundName} 
              softAccentClass={accent.soft} 
            />
            <div>
              {/* <div className="text-xs text-muted-foreground font-medium">{metrics.ticker}</div> */}
              <div className="text-base font-semibold text-muted-foreground max-w-[140px] truncate">
                {fund.fundName?.split(" ").slice(0, 2).join(" ")}
              </div>
            </div>
          </div>
          
          <StarRating rating={metrics.rating} />
        </div>

        <h4 className="mt-5 text-lg font-semibold leading-snug tracking-tight text-foreground group-hover:text-emerald-600 transition-colors line-clamp-2">
          {fund.fundName}
        </h4>
        <div className="mt-1 text-xs text-muted-foreground font-medium">
          {metrics.classification}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {(fund.tags || ["High Conviction", "Tax Optimized"]).slice(0, 3).map((tag) => (
            <span key={tag} className={cn("rounded-full px-2.5 py-1 text-xs font-medium border transition-colors", accent.soft)}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Synchronized Core Row Values Ledger Block */}
      <div className="mt-6 pt-2 space-y-5">
        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-muted/60 p-4 border border-border/60">
          <DataCell label="Tracked NAV" value={`₹${finalNavString}`} />
          <DataCell label="Movement" value={metrics.navChange} useEmerald />
          <DataCell label="Expense" value={metrics.expense} />
        </div>

        <button 
        className="inline-flex w-full items-center justify-between rounded-full bg-foreground px-5 py-3.5 text-sm font-semibold text-background transition-all duration-300 hover:bg-primary hover:text-white group/btn cursor-pointer shadow-xs"
        onClick={handleTrigger}
        >
          <span>View Details</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background/15 transition-transform duration-300 group-hover/btn:rotate-45">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </button>
      </div>
    </article>
  );
});