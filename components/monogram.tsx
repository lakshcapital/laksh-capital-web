import { cn } from "@/lib/utils";

const PASTEL_PALETTE = [
  { bg: "#F1E9DC", fg: "#0F2A4A" }, // beige
  { bg: "#E1EAF5", fg: "#0F2A4A" }, // soft blue
  { bg: "#E5EBE0", fg: "#0F2A4A" }, // sage
  { bg: "#F5E6B8", fg: "#0F2A4A" }, // soft gold
  { bg: "#E8E6F2", fg: "#0F2A4A" }, // lavender
  { bg: "#F2DCDC", fg: "#0F2A4A" }, // dusty rose
];

function getInitials(name: string): string {
  const HONORIFICS = new Set(["mr", "mrs", "ms", "miss", "dr", "ca", "cfa", "cfp"]);
  const parts = name
    .trim()
    .split(/\s+/)
    .filter((p) => !HONORIFICS.has(p.toLowerCase().replace(/\./g, "")));
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function pickPaletteIndex(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % PASTEL_PALETTE.length;
}

interface MonogramProps {
  name: string;
  size?: number;
  className?: string;
}

export default function Monogram({ name, size = 36, className }: MonogramProps) {
  const initials = getInitials(name);
  const palette = PASTEL_PALETTE[pickPaletteIndex(name)];

  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        background: palette.bg,
        color: palette.fg,
        fontSize: Math.round(size * 0.38),
      }}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold tracking-wide ring-1 ring-black/5 select-none",
        className
      )}
    >
      {initials}
    </span>
  );
}
