import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CalculatorCTA from "./calculator-cta";

interface CalculatorShellProps {
  title: string;
  description: string;
  badge?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function CalculatorShell({
  title,
  description,
  badge = "Calculator",
  children,
  footer,
}: CalculatorShellProps) {
  return (
    <main className="py-12 md:py-16 lg:py-20">
      <div className="container max-w-6xl mx-auto">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to all tools
        </Link>

        <header className="mb-10 flex flex-col items-center gap-4 text-center">
          <Badge variant="outline" className="font-semibold">
            {badge}
          </Badge>
          <h1 className="text-3xl font-semibold lg:text-5xl">{title}</h1>
          <p className="text-muted-foreground max-w-2xl lg:text-lg">
            {description}
          </p>
        </header>

        {children}

        {footer && (
          <section className="mt-12 rounded-2xl border bg-background p-6 lg:p-8">
            {footer}
          </section>
        )}

        <CalculatorCTA />
      </div>
    </main>
  );
}
