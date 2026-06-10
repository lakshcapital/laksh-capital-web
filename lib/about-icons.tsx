import {
  Award,
  BookOpen,
  Briefcase,
  Coins,
  Compass,
  HeartHandshake,
  LineChart,
  ShieldCheck,
  SlidersHorizontal,
  Target,
  TrendingUp,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";

export const ABOUT_ICON_MAP: Record<string, LucideIcon> = {
  UserRoundCheck,
  Target,
  SlidersHorizontal,
  TrendingUp,
  ShieldCheck,
  HeartHandshake,
  Compass,
  LineChart,
  Briefcase,
  Award,
  Coins,
  BookOpen,
};

export function resolveAboutIcon(name: string | undefined): LucideIcon {
  if (!name) return Target;
  return ABOUT_ICON_MAP[name] || Target;
}
