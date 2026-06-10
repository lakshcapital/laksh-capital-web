import { Metadata } from "next";
import CalculatorShell from "@/components/calculator/calculator-shell";
import RetirementWidget from "@/components/calculator/widgets/retirement-widget";

export const metadata: Metadata = {
  title: "Retirement Planner — Plan Your Corpus | Laksh Capital",
  description:
    "Find out how much corpus you need to retire comfortably in India, factoring in inflation, lifestyle, and post-retirement returns.",
};

export default function RetirementPlannerPage() {
  return (
    <CalculatorShell
      title="Retirement Planner"
      description="Estimate the corpus you'll need at retirement to maintain your lifestyle — and the monthly SIP that gets you there."
      badge="Retirement"
      footer={
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">How we calculate.</span>{" "}
            Your current monthly expenses are grown by inflation to find what
            you'll spend at retirement. That expense is funded by a corpus
            earning the post-retirement return, then drawn down over your
            expected retirement years. The monthly SIP is whatever invested at
            the pre-retirement return reaches that corpus by your target age.
          </p>
          <p>
            <span className="font-semibold text-foreground">Why two return rates.</span>{" "}
            Pre-retirement, you can take more equity risk for higher returns.
            Post-retirement, capital preservation matters more, so the expected
            return is lower. The defaults (12% pre / 8% post) reflect typical
            Indian portfolios.
          </p>
        </div>
      }
    >
      <RetirementWidget />
    </CalculatorShell>
  );
}
