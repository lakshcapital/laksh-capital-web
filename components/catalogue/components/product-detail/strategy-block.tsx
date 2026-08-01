import * as React from "react";
import { FundData } from "@/lib/sanity";

interface StrategyBlockProps {
  fund: FundData;
}

export const StrategyBlock = React.memo(function StrategyBlock({ fund }: StrategyBlockProps) {
  const tags = fund.tags?.filter(Boolean) || [];

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-xs w-full animate-fade-up">
      {/* Fund Description */}
      <div className="text-xs text-muted-foreground font-bold">About this fund</div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground font-medium text-pretty min-h-[3.5rem]">
        {fund.description?.trim() || "Sophisticated investment strategy deployed across resilient market models to harness alpha generations. Modeled securely inside algorithmic operational protection guidelines."}
      </p>
      {/* Fund Tags */}
      {tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted border border-border/60 px-3 py-1 text-xs font-semibold text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
});

StrategyBlock.displayName = "StrategyBlock";
