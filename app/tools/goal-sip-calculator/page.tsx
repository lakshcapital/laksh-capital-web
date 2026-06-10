import { Metadata } from "next";
import CalculatorShell from "@/components/calculator/calculator-shell";
import GoalSIPWidget from "@/components/calculator/widgets/goal-sip-widget";

export const metadata: Metadata = {
  title: "Goal SIP Calculator — How Much to Invest? | Laksh Capital",
  description:
    "Work backwards from your financial goal to the monthly SIP you need. Plan child education, home purchase, or any wealth target.",
};

export default function GoalSIPCalculatorPage() {
  return (
    <CalculatorShell
      title="Goal SIP Calculator"
      description="Set a target amount and a deadline. We'll tell you the monthly SIP needed to reach it."
      badge="Goal-based Investing"
      footer={
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">Use it for.</span>{" "}
            Child education corpus, home down-payment, daughter's marriage, a
            ₹5 Cr retirement target — anything with a specific number and
            timeline.
          </p>
          <p>
            <span className="font-semibold text-foreground">A reality check.</span>{" "}
            Goal-based investing works because it sets a single, clear
            objective. If the monthly SIP feels too high, either extend the
            horizon, lower the target, or pair the SIP with a lumpsum.
          </p>
        </div>
      }
    >
      <GoalSIPWidget />
    </CalculatorShell>
  );
}
