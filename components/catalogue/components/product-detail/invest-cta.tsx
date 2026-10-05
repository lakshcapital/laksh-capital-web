import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import type { CategoryAccent } from "../../types";
import { cn } from "@/lib/utils";

interface InvestCTAProps {
  accent: CategoryAccent;
}

export const InvestCTA = React.memo(function InvestCTA({ accent }: InvestCTAProps) {
  return (
    <div className={cn("overflow-hidden rounded-3xl p-6 text-background shadow-lg w-full animate-fade-up", accent.bg)}>
      <div className="text-xs text-background/60 font-bold">Ready to Allocate?</div>
      <h3 className="mt-2 text-xl font-bold leading-tight">Initiate Custom Mandate Strategy Configuration</h3>
      <p className="mt-1.5 text-sm text-background/80 font-medium text-pretty">
        Zero-commission setup processing handled via specialized advisor execution framework streams.
      </p>
      <div className="mt-4 flex flex-col gap-2 w-full">
        <button className={`group inline-flex w-full items-center justify-between rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-white transition-all hover:opacity-95 cursor-pointer shadow-xs`}>
          <span>Connect with us</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
        </button>
      </div>
    </div>
  );
});

InvestCTA.displayName = "InvestCTA";