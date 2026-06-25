import * as React from "react";
import type { CategoryAccent } from "../../types";

interface PerformanceBlockProps {
  accent: CategoryAccent;
}

export const PerformanceBlock = React.memo(function PerformanceBlock({ accent }: PerformanceBlockProps) {
  const returnsPeriods = [
    { period: "1 Year", fundVal: 24.2, benchVal: 22.1 },
    { period: "3 Year", fundVal: 18.6, benchVal: 15.2 },
    { period: "5 Year", fundVal: 21.4, benchVal: 17.8 },
  ];

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-xs w-full animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">Performance Overviews vs Benchmark</h2>
        </div>
        <div className="flex items-center gap-3 text-sm font-semibold text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><span className={`h-2.5 w-2.5 rounded-sm ${accent.bg}`} /> Strategy Portfolio</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-primary" /> Nifty Index</span>
        </div>
      </div>

      {/* Simulated Micro Vector Sparkline Chart Container */}
      <div className={`relative mt-6 overflow-hidden rounded-2xl bg-muted/50 p-4 border border-border/40`}>
        <svg viewBox="0 0 800 140" preserveAspectRatio="none" className="h-32 w-full opacity-85">
          <defs>
            <linearGradient id="p-grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgb(16 185 129)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="rgb(16 185 129)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="0,140 100,110 200,125 300,85 400,95 500,45 600,60 700,20 800,140" fill="url(#p-grad)" />
          <polyline points="0,130 100,110 200,125 300,85 400,95 500,45 600,60 700,20" fill="none" stroke="rgb(16 185 129)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* Performance Bar metrics mappings grids */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
        {returnsPeriods.map((r) => (
          <div key={r.period} className="rounded-2xl bg-muted/40 p-4 border border-border/40 text-center">
            <div className="text-xs text-muted-foreground font-bold">{r.period} Window</div>
            <div className="mt-1 text-xl font-bold text-foreground">{r.fundVal}%</div>
            <div className="mt-1 text-xs text-muted-foreground">Benchmark: {r.benchVal}%</div>
          </div>
        ))}
      </div>
    </div>
  );
});

PerformanceBlock.displayName = "PerformanceBlock";