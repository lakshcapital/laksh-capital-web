import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Zap } from "lucide-react";
import Logos from "./logos";
import HeroIllustration from "./hero-illustration";
import { getHeroSettings } from "@/sanity/queries";
import { HERO_DEFAULTS } from "@/data/hero-defaults";

interface HeroProps {
  calendlyUrl?: string;
  className?: string;
}

export default async function Hero({ calendlyUrl, className }: HeroProps) {
  const sanity = await getHeroSettings();
  const badge = sanity?.badge ?? HERO_DEFAULTS.badge;
  const heading = sanity?.heading || HERO_DEFAULTS.heading;
  const description = sanity?.description || HERO_DEFAULTS.description;
  const buttonText = sanity?.buttonText || HERO_DEFAULTS.buttonText;
  const ctaHref = calendlyUrl || "#contact";

  return (
    <section
      id="hero"
      className={cn(
        "relative pt-8 pb-16 md:pt-14 md:pb-28 lg:pt-16 lg:pb-32",
        className
      )}
    >
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {badge && (
              <Badge variant="outline">
                {badge}
                <ArrowUpRight className="ml-2 size-4" />
              </Badge>
            )}
            <h1 className="my-6 text-3xl font-semibold text-pretty lg:text-6xl">
              {heading}
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-lg">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button
                asChild
                size="lg"
                className="w-full font-semibold bg-linear-to-br from-primary to-green-500 sm:w-auto backdrop-blur-md"
              >
                <a
                  href={ctaHref}
                  target={calendlyUrl ? "_blank" : undefined}
                  rel={calendlyUrl ? "noopener noreferrer" : undefined}
                >
                  {buttonText}
                  <Zap className="size-4" />
                </a>
              </Button>
            </div>
          </div>
          <HeroIllustration />
        </div>
        <Logos />
      </div>
    </section>
  );
}
