import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const BackButton = React.memo(function BackButton({
  href,
  onClick,
}: {
  href?: string;
  onClick?: () => void;
}) {
  const className =
    "group inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-primary transition-all hover:border-primary hover:bg-primary hover:text-background shadow-xs cursor-pointer";

  return (
    <div>
      {href ? (
        <Link href={href} className={className}>
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back
        </Link>
      ) : (
        <Button onClick={onClick} variant="outline" className={className}>
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back
        </Button>
      )}
    </div>
  );
});

// --- Metric Row ---
export const MetricRow = React.memo(function MetricRow({
  label,
  value,
  isEmerald,
}: {
  label: string;
  value: string;
  isEmerald?: boolean;
}) {
  return (
    <div className="bg-card px-5 py-4">
      <div className="text-xs text-muted-foreground font-medium">{label}</div>
      <div className={cn("mt-1 text-base font-semibold tracking-tight", isEmerald ? "text-emerald-600" : "text-foreground")}>
        {value}
      </div>
    </div>
  );
});

export const DataCell = React.memo(function DataCell({
  label,
  value,
  useEmerald,
}: {
  label: string;
  value: string;
  useEmerald?: boolean;
}) {
  return (
    <div className="overflow-hidden">
      <div className="text-xs text-muted-foreground font-medium truncate">{label}</div>
      <div className={cn("mt-1 text-base font-bold tracking-tight truncate", useEmerald ? "text-emerald-600" : "text-foreground")}>
        {value}
      </div>
    </div>
  );
});

// --- Rating Compliance ---
const STAR_FILL_CLASSES = {
  "emerald-500": "fill-emerald-500 text-emerald-500",
  white: "fill-white text-white",
} as const;

type StarFillColor = keyof typeof STAR_FILL_CLASSES;

export const StarRating = React.memo(function StarRating({
  rating,
  fillColor = "emerald-500",
}: {
  rating: number;
  fillColor?: StarFillColor;
}) {
  const filledClass = STAR_FILL_CLASSES[fillColor] ?? STAR_FILL_CLASSES["emerald-500"];

  return (
    <div className="flex items-center gap-0.5 pt-1">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star
          key={idx}
          className={cn("h-3 w-3", idx < rating ? filledClass : "text-border")}
        />
      ))}
    </div>
  );
});

// --- Branding Icon ---
interface BrandingIconProps {
  imageUrl?: string;
  fundName: string;
  softAccentClass: string;
}

export const FundBrandingIcon = React.memo(function FundBrandingIcon({
  imageUrl,
  fundName,
  softAccentClass,
}: BrandingIconProps) {
  if (imageUrl) {
    return (
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white shrink-0 shadow-2xs">
        <img src={imageUrl} alt={fundName} className="max-h-full max-w-full object-contain object-center" />
      </div>
    );
  }

  return (
    <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold shrink-0 uppercase border transition-colors", softAccentClass)}>
      {fundName?.substring(0, 2) || "MF"}
    </div>
  );
});