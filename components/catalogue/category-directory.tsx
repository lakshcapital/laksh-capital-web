import * as React from "react";
import { Sparkles } from "lucide-react";
import type { Category } from "./types";
import { CategoryCard } from "./components/category-card";

interface CategoryDirectoryProps {
  categories: Category[];
}

export const CategoryDirectory = React.memo(function CategoryDirectory({
  categories,
}: CategoryDirectoryProps) {
  return (
    <section className="animate-fade-up">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-medium text-muted-foreground shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            Invest in products made for global Indians
          </div>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
            Six verticals. <span className="text-muted-foreground font-normal">One ledger.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
            Curated investment categories — from tax-free Mutual Funds to GIFT City AIFs — built for compounding wealth across borders.
          </p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((cat, index) => (
          <CategoryCard key={cat.id} category={cat} index={index} />
        ))}
      </div>
    </section>
  );
});
