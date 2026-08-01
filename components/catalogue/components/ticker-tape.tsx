import { FundData } from "@/lib/sanity";
import * as React from "react";
import { formatNavCurrency } from "../utils/fund-display";

interface TickerTapeProps {
  funds: FundData[];
}

export const TickerTape = React.memo(function TickerTape({ funds }: TickerTapeProps) {
  const tickerArray = React.useMemo(() => {
    if (!funds || funds.length === 0) return [];
    const internalList = funds.map((fund) => {
      const displayNav = formatNavCurrency(fund.heroMetrics?.nav);
      return `${fund.fundName} • NAV: ${displayNav}`;
    });
    return [...internalList, ...internalList, ...internalList, ...internalList];
  }, [funds]);

  if (tickerArray.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-foreground text-background shadow-xs select-none">
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center gap-2 border-r border-background/10 bg-foreground px-4 text-xs font-semibold">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
        Live · NAV
      </div>
      <div className="flex whitespace-nowrap py-3.5 pl-36 overflow-hidden">
        <div className="flex animate-marquee gap-10 text-xs">
          {tickerArray.map((tickerItem, index) => (
            <span key={`${index}-${tickerItem}`} className="flex items-center gap-3">
              <span className="text-background/85">{tickerItem}</span>
              <span className="text-emerald-400 font-sans font-normal">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

TickerTape.displayName = "TickerTape";
