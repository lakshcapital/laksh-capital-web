import * as React from "react";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryWithFunds } from "@/lib/sanity";
import type { CategoryAccent } from "./types";
import { FundCard } from "./components/fund-card";
import { BackButton } from "./components/shared";
import { TickerTape } from "./components/ticker-tape";
import { cataloguePaths } from "./utils/paths";

interface CategoryWorkspaceProps {
  category: CategoryWithFunds;
  accent: CategoryAccent;
}

export const CategoryWorkspace = React.memo(function CategoryWorkspace({
  category,
  accent,
}: CategoryWorkspaceProps) {
  const funds = category.funds || [];

  return (
    <section className="animate-fade-up space-y-8">
      <BackButton href={cataloguePaths.home()} />

      {/* Top Banner */}
      <div className={cn("relative overflow-hidden rounded-2xl p-8 shadow-xs transition-colors", accent.bg)}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent pointer-events-none" />
        <div className="dot-grid absolute inset-0 opacity-40 pointer-events-none" />
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-7 flex flex-col justify-center">
            <h2 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-tight md:text-5xl text-white">
              {category.title}
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85">
              {category.description ||
                "Sophisticated asset allocation models managed alongside strategic risk guardrails."}
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {category?.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-xs text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Category Image */}
          <div className="md:col-span-5 flex items-center justify-center">
            <div className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-primary/50">
              <img
                src={category.fundImage || "/assets/services/wealth-management.jpeg"}
                alt={category.title}
                loading="lazy"
                sizes="(max-width: 768px) 50vw, 40vw"
                className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ticker Tape */}
      <TickerTape funds={funds} />

      {/* Product List */}
      <div className="flex items-end justify-between pt-4 border-b border-border pb-2">
        <div>
          <div className="text-xs text-muted-foreground font-semibold">The Product Ledger</div>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
            {funds.length} products available
          </h3>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] text-muted-foreground md:flex shadow-xs">
          <Zap className="h-3.5 w-3.5 text-emerald-500" />
          Sorted by · Conviction Score
        </div>
      </div>

      {funds.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card">
          <p className="text-sm text-muted-foreground">
            No active tracking products mapped to this asset domain yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {funds.map((fund) => (
            <FundCard
              key={fund._id}
              fund={fund}
              categorySlug={category.slug}
              accent={accent}
            />
          ))}
        </div>
      )}
    </section>
  );
});
