import { formatINR } from "@/lib/calculator-utils";

interface ResultCardProps {
  primaryLabel: string;
  primaryValue: number;
  rows: { label: string; value: number }[];
}

export default function ResultCard({
  primaryLabel,
  primaryValue,
  rows,
}: ResultCardProps) {
  return (
    <div className="rounded-2xl bg-linear-to-br from-primary via-primary to-emerald-600 p-6 text-white shadow-lg lg:p-8">
      <p className="text-xs uppercase tracking-[0.2em] text-white/70">
        {primaryLabel}
      </p>
      <p className="mt-2 text-3xl font-semibold tracking-tight lg:text-5xl">
        {formatINR(primaryValue)}
      </p>
      {rows.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/20 pt-5">
          {rows.map((row) => (
            <div key={row.label}>
              <p className="text-xs text-white/65 uppercase tracking-wider">
                {row.label}
              </p>
              <p className="mt-1 text-lg font-semibold lg:text-xl">
                {formatINR(row.value)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
