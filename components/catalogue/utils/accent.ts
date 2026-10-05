export const accentMap = {
  teal: {
    bg: "bg-teal-950 border-teal-800/40 text-teal-200",
    soft: "bg-teal-500/10",
    chipBorder: "border-teal-500/20",
    ring: "ring-teal-500/30",
  },
  royal: {
    bg: "bg-blue-950 border-blue-800/40 text-blue-200",
    soft: "bg-blue-500/10",
    chipBorder: "border-blue-500/20",
    ring: "ring-blue-500/30",
  },
  cocoa: {
    bg: "bg-amber-950 border-amber-900/40 text-amber-200",
    soft: "bg-amber-700/10",
    chipBorder: "border-amber-700/20",
    ring: "ring-amber-700/30",
  },
  coral: {
    bg: "bg-rose-950 border-rose-900/40 text-rose-200",
    soft: "bg-rose-500/10",
    chipBorder: "border-rose-500/20",
    ring: "ring-rose-500/30",
  },
  violet: {
    bg: "bg-purple-950 border-purple-900/40 text-purple-200",
    soft: "bg-purple-500/10",
    chipBorder: "border-purple-500/20",
    ring: "ring-purple-500/30",
  },
  mint: {
    bg: "bg-emerald-950 border-emerald-900/40 text-emerald-200",
    soft: "bg-emerald-500/10",
    chipBorder: "border-emerald-500/20",
    ring: "ring-emerald-500/30",
  },
  slate: {
    bg: "bg-slate-900 border-slate-800/40 text-slate-200",
    soft: "bg-slate-500/10",
    chipBorder: "border-slate-500/20",
    ring: "ring-slate-500/30",
  },
  amber: {
    bg: "bg-yellow-950 border-yellow-900/40 text-yellow-200",
    soft: "bg-yellow-500/10",
    chipBorder: "border-yellow-500/20",
    ring: "ring-yellow-500/30",
  },
  rose: {
    bg: "bg-pink-950 border-pink-900/40 text-pink-200",
    soft: "bg-pink-500/10",
    chipBorder: "border-pink-500/20",
    ring: "ring-pink-500/30",
  },
  indigo: {
    bg: "bg-indigo-950 border-indigo-900/40 text-indigo-200",
    soft: "bg-indigo-500/10",
    chipBorder: "border-indigo-500/20",
    ring: "ring-indigo-500/30",
  },
} as const;

export type AccentKey = keyof typeof accentMap;
export type CategoryAccent = (typeof accentMap)[AccentKey];

const accentKeys = Object.keys(accentMap) as AccentKey[];

export function accentKeyForIndex(index: number): AccentKey {
  return accentKeys[index % accentKeys.length];
}

export function getCategoryAccent(options: {
  accent?: AccentKey;
  index: number;
}): CategoryAccent {
  const { accent, index } = options;
  if (accent && accentMap[accent]) {
    return accentMap[accent];
  }
  return accentMap[accentKeyForIndex(index)];
}
