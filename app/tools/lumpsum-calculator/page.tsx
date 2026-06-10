import { Metadata } from "next";
import CalculatorShell from "@/components/calculator/calculator-shell";
import LumpsumWidget from "@/components/calculator/widgets/lumpsum-widget";

export const metadata: Metadata = {
  title: "Lumpsum Investment Calculator | Laksh Capital",
  description:
    "Calculate the future value of a one-time mutual fund investment with the power of compounding. Free Indian lumpsum calculator.",
};

export default function LumpsumCalculatorPage() {
  return (
    <CalculatorShell
      title="Lumpsum Calculator"
      description="See how a single one-time investment compounds. Useful for bonus payouts, inheritance, or any windfall you're planning to invest."
      badge="One-time Investment"
      footer={
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">When lumpsum makes sense.</span>{" "}
            One-time investments are ideal when markets are reasonably valued
            and you have a long horizon. For volatile periods, an STP
            (Systematic Transfer Plan) staggered over 6-12 months may serve
            you better.
          </p>
          <p>
            <span className="font-semibold text-foreground">Tax note.</span>{" "}
            Equity gains held over 12 months are taxed as LTCG (currently 12.5%
            beyond ₹1.25 L/year). Debt funds follow your income slab.
          </p>
        </div>
      }
    >
      <LumpsumWidget />
    </CalculatorShell>
  );
}
