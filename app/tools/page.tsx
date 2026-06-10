import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, TrendingUp, Umbrella, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CalculatorCTA from "@/components/calculator/calculator-cta";

export const metadata: Metadata = {
  title: "Investment Calculators & Planning Tools | Laksh Capital",
  description:
    "Free SIP, lumpsum, retirement, and goal-based investment calculators built for Indian investors. Plan your wealth with clarity.",
};

const CALCULATORS = [
  {
    href: "/tools/sip-calculator",
    title: "SIP Calculator",
    description:
      "Project the future value of your monthly SIP across any horizon.",
    icon: TrendingUp,
    badge: "Most popular",
  },
  {
    href: "/tools/lumpsum-calculator",
    title: "Lumpsum Calculator",
    description:
      "See how a one-time investment grows with the power of compounding.",
    icon: Wallet,
  },
  {
    href: "/tools/retirement-planner",
    title: "Retirement Planner",
    description:
      "Find the corpus you need to retire — and what monthly SIP gets you there.",
    icon: Umbrella,
    badge: "For HNI clients",
  },
  {
    href: "/tools/goal-sip-calculator",
    title: "Goal SIP Calculator",
    description:
      "Work backwards from a target amount to the monthly SIP you need.",
    icon: Target,
  },
];

export default function ToolsHubPage() {
  return (
    <main className="py-16 md:py-24 lg:py-28">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-5 mb-14 text-center">
          <Badge variant="outline" className="font-semibold">
            Calculators & Tools
          </Badge>
          <h1 className="text-3xl font-semibold lg:text-6xl max-w-3xl">
            Plan your wealth with precision.
          </h1>
          <p className="text-muted-foreground lg:text-lg max-w-2xl">
            Free, no-signup tools to map your investments, retirement, and goals
            to the rupee. Built for Indian investors.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {CALCULATORS.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="group relative flex flex-col gap-4 rounded-2xl border bg-background p-6 transition-all hover:shadow-lg hover:border-primary/30 lg:p-8"
            >
              {calc.badge && (
                <Badge
                  className="absolute right-5 top-5 bg-emerald-50 text-emerald-700 border-emerald-200"
                  variant="outline"
                >
                  {calc.badge}
                </Badge>
              )}
              <div className="flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-primary to-emerald-600 text-white">
                <calc.icon className="size-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {calc.title}
                </h2>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {calc.description}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                Calculate now
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <CalculatorCTA />
      </div>
    </main>
  );
}
