import { cn } from "@/lib/utils";

interface CatalogueSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function CatalogueSection({ children, className }: CatalogueSectionProps) {
  return (
    <section id="catalogue" className={cn("relative pb-12 overflow-hidden", className)}>
      <div className="container px-4 sm:px-6">{children}</div>
    </section>
  );
}
