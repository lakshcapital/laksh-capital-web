import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CalculatorCTA() {
  return (
    <div className="mt-16 rounded-2xl border bg-muted/40 p-8 text-center lg:p-12">
      <h3 className="text-2xl font-semibold lg:text-3xl">
        These tools give you a number. We give you a plan.
      </h3>
      <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
        Calculators show the math. We translate that into a personalised
        investment strategy that accounts for your goals, family situation, tax
        picture, and risk appetite.
      </p>
      <div className="mt-6">
        <Button asChild size="lg">
          <Link href="/#contact">
            Talk to an advisor <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
