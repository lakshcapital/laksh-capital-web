import * as React from "react";
import { FundData } from "@/lib/sanity";
import type { CategoryAccent } from "../../types";
import { formatDisplayValue } from "../../utils/fund-display";
import { StarRating } from "../shared";

interface ProductHeroProps {
  fund: FundData;
  categoryTitle: string;
  categoryImage: string;
  accent: CategoryAccent;
  classification: string;
  rating: number;
  finalNavString: string;
  navChange: string;
  navDate?: string;
}

export const ProductHero = React.memo(function ProductHero({
  fund,
  categoryTitle,
  accent,
  classification,
  rating,
  finalNavString,
  navChange,
  navDate,
}: ProductHeroProps) {
  const navLabel = finalNavString === "-" ? "-" : `${finalNavString}`;
  const classificationLabel = classification
    ? `Laksh Capital Asset Management · ${classification}`
    : "Laksh Capital Asset Management";

  return (
    <section className={`relative overflow-hidden rounded-3xl ${accent.bg} p-7 text-white md:p-10 shadow-xl w-full`}>
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent pointer-events-none" />
      <div className="dot-grid absolute inset-0 opacity-25 pointer-events-none" />

      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end w-full">
        <div className="md:col-span-8 min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur-sm border border-white/10">{categoryTitle}</span>
            {rating > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 backdrop-blur-sm border border-white/10">
                <StarRating rating={rating} fillColor="white" />
              </span>
            )}
          </div>
          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight md:text-5xl text-pretty truncate">
            {fund.fundName}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base font-medium">
            {classificationLabel}
          </p>
        </div>

        <div className="md:col-span-4 w-full">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md shadow-lg">
            <div className="text-xs text-white/70 font-semibold">Current Live NAV</div>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-4xl font-bold tracking-tight">{navLabel}</span>
              <span className="rounded-md px-2 py-0.5 text-xs font-bold bg-white/20 text-white">
                {formatDisplayValue(navChange)}
              </span>
            </div>
            <div className="mt-3 text-xs text-white/60 font-medium">
              As on: {formatDisplayValue(navDate)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

ProductHero.displayName = "ProductHero";
