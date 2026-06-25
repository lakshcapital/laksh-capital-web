import * as React from "react";
import { LucideIcon } from "lucide-react";

interface FactItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface KeyFactsBlockProps {
  items: FactItem[];
}

export const KeyFactsBlock = React.memo(function KeyFactsBlock({ items }: KeyFactsBlockProps) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-xs w-full animate-fade-up">
      <h3 className="text-xs text-muted-foreground font-bold">Key Facts Parameters</h3>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground border border-border/40">
              <item.icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-xs text-muted-foreground font-bold">{item.label}</div>
              <div className="mt-0.5 truncate text-md font-bold text-foreground">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

KeyFactsBlock.displayName = "KeyFactsBlock";