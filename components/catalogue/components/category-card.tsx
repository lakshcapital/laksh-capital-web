import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "../types";
import { cataloguePaths } from "../utils/paths";
import { getCategoryAccent } from "../utils/accent";

interface CategoryCardProps {
  category: Category;
  index: number;
}

export const CategoryCard = React.memo(function CategoryCard({
  category,
  index,
}: CategoryCardProps) {
  const palette = React.useMemo(
    () => getCategoryAccent({ accent: category.accent, index }),
    [category.accent, index]
  );

  return (
    <Link
      href={cataloguePaths.category(category.id)}
      className="group relative flex w-full animate-fade-up flex-col overflow-hidden rounded-2xl border border-hairline bg-surface text-left transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-30px_rgba(15,23,42,0.3)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
      aria-label={`Explore our custom curated instruments for ${category.title}`}
    >
      {/* Visual Header Section */}
      <div className={`relative aspect-[5/4] w-full overflow-hidden ${palette.bg}`}>
        <img
          src={category.fundImage || "/assets/services/wealth-management.jpeg"}
          alt={category.title}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
        />

        {/* Dark Mask Layer */}
        <div className="absolute inset-0 bg-primary/15 transition-opacity duration-500 group-hover:bg-primary/20 pointer-events-none" />

        {/* Glass UI Section */}
        <div className="absolute inset-x-0 bottom-0 z-10 rounded-t-2xl flex items-center justify-between border border-white/15 bg-primary/50 p-4 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:bg-primary/30 group-hover:border-white/25">
          <div className="text-white min-w-0 flex-1 pr-3">
            <h3 className="text-lg font-bold leading-tight tracking-tight text-white drop-shadow-xs truncate">
              {category.title}
            </h3>
            <p className="mt-0.5 text-xs text-white/90 font-medium tracking-wide">
              {category.count} Curated product{category.count !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Action Trigger Button */}
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-slate-950 shadow-md transition-all duration-500 group-hover:rotate-45 group-hover:scale-105 group-hover:bg-primary group-hover:text-white"
            aria-hidden="true"
          >
            <ArrowUpRight className="h-4.5 w-4.5 transition-transform duration-300" />
          </span>
        </div>
      </div>

      {/* Description Section */}
      <div className="flex flex-col gap-3 p-5 w-full bg-surface">
        <p className="text-sm leading-relaxed text-ink-soft line-clamp-2 text-pretty font-medium">
          {category.description ||
            "Premium asset placement models tailored for systemic portfolio maximization metrics across multi-market regimes."}
        </p>

        {/* Tags Section */}
        {category.tags && category.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {category.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className={`rounded-full ${palette.soft || "bg-slate-100 text-slate-800"} px-2.5 py-1 text-xs font-semibold text-ink tracking-wide border border-hairline/20`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
});

CategoryCard.displayName = "CategoryCard";
