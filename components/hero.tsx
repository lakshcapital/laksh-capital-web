import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";
import Image from "next/image";
import Logos from "./logos";
import HeroIllustration from "./hero-illustration";

interface HeroProps {
  badge?: string;
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      icon?: ReactNode;
      url: string;
    };
    secondary?: {
      text: string;
      icon?: ReactNode;
      url: string;
    };
  };
  image?: {
    src: string;
    alt: string;
  };
  className?: string;
}

const Hero = ({
  badge,
  heading,
  description,
  buttons = {
    primary: { text: "", url: "" },
  },
  image,
  className,
}: HeroProps) => {
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
              {buttons.primary && (
                <Button
                  asChild
                  size="lg"
                  className="w-full font-semibold bg-linear-to-br from-primary to-green-500 sm:w-auto backdrop-blur-md"
                >
                  <a
                    href={buttons.primary.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {buttons.primary.text} {buttons.primary.icon}
                  </a>
                </Button>
              )}
              {buttons.secondary && (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
          {image ? (
            <Image
              width={1920}
              height={1080}
              src={image.src}
              alt={image.alt}
              className="max-h-96 w-full rounded-md object-cover shadow-sm backdrop-blur-md"
            />
          ) : (
            <HeroIllustration />
          )}
        </div>
        <Logos />
      </div>
    </section>
  );
};

export default Hero;
