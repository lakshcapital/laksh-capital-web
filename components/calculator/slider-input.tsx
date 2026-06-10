"use client";

import { useEffect, useRef, useState } from "react";

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
  const [inputStr, setInputStr] = useState(String(value));
  const isTyping = useRef(false);

  // Sync from parent when it changes externally (e.g. via the slider)
  useEffect(() => {
    if (!isTyping.current) {
      setInputStr(String(value));
    }
  }, [value]);

  const handleType = (raw: string) => {
    isTyping.current = true;
    setInputStr(raw);
    if (raw === "" || raw === "-") return;
    const n = Number(raw);
    if (!Number.isNaN(n)) onChange(n);
  };

  const handleBlur = () => {
    isTyping.current = false;
    if (inputStr === "" || inputStr === "-") {
      setInputStr(String(value));
    }
  };

  const handleSlider = (raw: string) => {
    const n = Number(raw);
    onChange(n);
    setInputStr(String(n));
  };

  const numeric = inputStr === "" || inputStr === "-" ? NaN : Number(inputStr);
  const isEmpty = inputStr === "" || inputStr === "-";
  const isBelowMin = !isEmpty && !Number.isNaN(numeric) && numeric < min;
  const isAboveMax = !isEmpty && !Number.isNaN(numeric) && numeric > max;
  const hasError = isBelowMin || isAboveMax;

  const sliderValue = Math.min(Math.max(value || min, min), max);
  const fmt = (n: number) => (formatBoundary ? formatBoundary(n) : String(n));

  const errorMessage = isBelowMin
    ? `Minimum is ${fmt(min)}.`
    : isAboveMax
    ? `Maximum is ${fmt(max)}.`
    : null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <div
          className={`flex items-center gap-1 rounded-md border bg-background px-2 py-1 text-sm font-semibold transition-colors focus-within:ring-1 ${
            hasError
              ? "border-red-400 focus-within:ring-red-400"
              : "focus-within:ring-ring"
          }`}
        >
          {prefix && <span className="text-muted-foreground">{prefix}</span>}
          <input
            type="number"
            value={inputStr}
            onChange={(e) => handleType(e.target.value)}
            onFocus={() => {
              isTyping.current = true;
            }}
            onBlur={handleBlur}
            min={min}
            max={max}
            step={step}
            aria-invalid={hasError}
            className="w-24 bg-transparent text-right outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          {suffix && <span className="text-muted-foreground">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={(e) => handleSlider(e.target.value)}
        className="w-full accent-primary cursor-pointer"
      />
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{fmt(min)}</span>
        {hint && !hasError && (
          <span className="italic text-muted-foreground">{hint}</span>
        )}
        {hasError && (
          <span className="font-medium text-red-600">{errorMessage}</span>
        )}
        <span className="text-muted-foreground">{fmt(max)}</span>
      </div>
    </div>
  );
}
