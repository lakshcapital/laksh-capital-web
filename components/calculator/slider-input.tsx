"use client";

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  formatBoundary?: (v: number) => string;
  hint?: string;
}

export default function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
  formatBoundary,
  hint,
}: SliderInputProps) {
  const safe = (n: number) => {
    if (Number.isNaN(n)) return min;
    return Math.min(Math.max(n, min), max);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <div className="flex items-center gap-1 rounded-md border bg-background px-2 py-1 text-sm font-semibold focus-within:ring-1 focus-within:ring-ring">
          {prefix && (
            <span className="text-muted-foreground">{prefix}</span>
          )}
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(safe(Number(e.target.value)))}
            min={min}
            max={max}
            step={step}
            className="w-24 bg-transparent text-right outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          {suffix && (
            <span className="text-muted-foreground">{suffix}</span>
          )}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary cursor-pointer"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatBoundary ? formatBoundary(min) : min}</span>
        {hint && <span className="italic">{hint}</span>}
        <span>{formatBoundary ? formatBoundary(max) : max}</span>
      </div>
    </div>
  );
}
