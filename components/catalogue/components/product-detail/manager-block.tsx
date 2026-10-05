import * as React from "react";
import type { FundManager } from "@/lib/sanity";
import type { CategoryAccent } from "../../types";
import { formatDisplayValue, getManagerInitials } from "../../utils/fund-display";

interface ManagerBlockProps {
  accent: CategoryAccent;
  manager?: FundManager;
}

export const ManagerBlock = React.memo(function ManagerBlock({
  accent,
  manager,
}: ManagerBlockProps) {
  const initials = getManagerInitials(manager?.name, manager?.initials);
  const name = formatDisplayValue(manager?.name);
  const title = formatDisplayValue(manager?.title, "");

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-xs w-full animate-fade-up">
      <h3 className="text-xs text-muted-foreground font-bold">Assigned Advisory Lead</h3>
      <div className="mt-4 flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent.bg} text-sm font-bold text-white shadow-xs`}>
          {initials}
        </div>
        <div>
          <div className="text-md font-bold text-foreground">{name}</div>
          {title ? (
            <div className="text-sm text-muted-foreground font-medium">{title}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
});

ManagerBlock.displayName = "ManagerBlock";
