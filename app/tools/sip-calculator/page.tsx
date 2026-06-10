import { Metadata } from "next";
import CalculatorShell from "@/components/calculator/calculator-shell";
import SIPWidget from "@/components/calculator/widgets/sip-widget";

export const metadata: Metadata = {
  title: "SIP Calculator — Project Your Wealth Growth | Laksh Capital",
  description:
    "Estimate the future value of your monthly Systematic Investment Plan (SIP). Free Indian SIP calculator with live charts and goal projections.",
};

export default function SIPCalculatorPage() {
  return (
    <CalculatorShell
      title="SIP Calculator"
      description="See how a monthly Systematic Investment Plan compounds over time. Adjust the inputs and watch the projection update live."
      badge="Systematic Investment Plan"
      footer={
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">How it works.</span>{" "}
            A SIP invests a fixed amount every month into a mutual fund. The
            calculator assumes the same monthly contribution and a constant
            average annual return, compounded monthly.
          </p>
          <p>
            <span className="font-semibold text-foreground">A note from us.</span>{" "}
            Real returns vary year to year. Equity mutual funds in India have
            historically delivered 10–14% over long periods. These projections
            are illustrative, not guaranteed.
          </p>
        </div>
      }
    >
      <SIPWidget />
    </CalculatorShell>
  );
}
