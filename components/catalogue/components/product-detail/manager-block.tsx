import * as React from "react";
import type { CategoryAccent } from "../../types";

interface ManagerBlockProps {
  accent: CategoryAccent;
}

export const ManagerBlock = React.memo(function ManagerBlock({ accent }: ManagerBlockProps) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-xs w-full animate-fade-up">
      <h3 className="text-xs text-muted-foreground font-bold">Assigned Advisory Lead</h3>
      <div className="mt-4 flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent.bg} text-sm font-bold text-white shadow-xs`}>
          LC
        </div>
        <div>
          <div className="text-md font-bold text-foreground">Laksh Investment Board</div>
          <div className="text-sm text-muted-foreground font-medium">Tracking Strategy Since Inception</div>
        </div>
      </div>
    </div>
  );
});

ManagerBlock.displayName = "ManagerBlock";