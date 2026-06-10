import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import wealthManagementImg from "@/assets/services/wealth-management.jpeg";
import mutualFundsImg from "@/assets/services/mutual-funds.jpeg";
import pmsImg from "@/assets/services/portfolio-management.jpeg";
import aifImg from "@/assets/services/alternate-investment.jpeg";
import sifImg from "@/assets/services/specialised-investment.jpeg";
import giftImg from "@/assets/services/gift-city.jpeg";
import { getAllServices } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { Button } from "@/components/ui/button";

interface ServiceItem {
  title: string;
  description: string;
  image: string;
  enlarge?: boolean;
}

interface ServiceCardProps extends ServiceItem {
  className?: string;
  last?: boolean;
}

interface ServicesProps {
  title: string;
  description: string;
  className?: string;
}

const FALLBACK_SERVICES: ServiceItem[] = [
  {
    title: "Wealth Management",
    description:
      "Holistic financial planning aligning investments, protection, and goals for long-term wealth creation.",
    image: wealthManagementImg.src,
    enlarge: true,
  },
  {
    title: "Mutual Funds",
    description:
      "Goal-based mutual fund investments across equity, debt, and hybrid strategies, aligned with your long-term objectives.",
    image: mutualFundsImg.src,
  },
  {
    title: "Portfolio Management Service (PMS)",
    description:
      "Professionally managed, customized portfolios designed to optimize returns based on individual risk profiles.",
    image: pmsImg.src,
  },
  {
    title: "Alternate Investment Fund (AIF)",
    description:
      "Access exclusive alternative investment opportunities beyond traditional assets for enhanced portfolio diversification.",
    image: aifImg.src,
  },
  {
    title: "Specialised Investment Fund (SIF)",
    description:
      "Thematic and strategy-driven investments tailored for sophisticated investors seeking targeted growth opportunities.",
    image: sifImg.src,
  },
  {
    title: "GIFT City",
    description:
      "Global investment solutions through GIFT City enabling tax-efficient, internationally diversified portfolios.",
    image: giftImg.src,
    enlarge: true,
  },
];

const ServiceCard = ({
  title,
  description,
  image,
  className,
  enlarge = false,
  last = false,
}: ServiceCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between p-10",
        className,
        enlarge ? "lg:w-3/7" : "lg:w-2/7",
        last ? "" : "border-b border-solid lg:border-b-0 lg:border-r"
      )}
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
      <div
        className={cn(
          "relative mt-4 overflow-hidden",
          enlarge ? "aspect-16/11" : "aspect-4/3"
        )}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="
            object-cover
            mask-[radial-gradient(ellipse_at_center,black_50%,transparent_100%)]
            [-webkit-mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]
          "
          priority={enlarge}
        />
      </div>
    </div>
  );
};

export default async function Services({
  title,
  description,
  className,
}: ServicesProps) {
  const sanity = await getAllServices();

  const items: ServiceItem[] = sanity.length
    ? sanity.map((s, i) => ({
        title: s.title,
        description: s.description,
        image: urlFor(s.image).width(1200).height(900).fit("crop").url(),
        // Auto-enlarge first and last when not explicitly set
        enlarge:
          s.enlarge ?? (i === 0 || i === sanity.length - 1),
      }))
    : FALLBACK_SERVICES;

  // Render up to 6 services in two rows of three with original layout pattern
  const display = items.slice(0, 6);
  const top = display.slice(0, 3);
  const bottom = display.slice(3, 6);
  const hasMore = items.length > 6;

  return (
    <section id="services" className={cn("py-16 md:py-24 lg:py-28", className)}>
      <div className="container">
        <div className="mb-24 flex flex-col items-center gap-6">
          <h2 className="text-center text-3xl font-semibold lg:max-w-3xl lg:text-6xl">
            {title}
          </h2>
          <p className="text-center text-lg font-medium text-muted-foreground md:max-w-4xl lg:text-xl">
            {description}
          </p>
        </div>
        <div className="relative flex justify-center">
          <div className="border-muted2 relative flex w-full flex-col border md:w-1/2 lg:w-full">
            <div className="relative flex flex-col lg:flex-row">
              {top.map((service, i) => (
                <ServiceCard
                  key={`top-${i}`}
                  {...service}
                  last={i === top.length - 1}
                />
              ))}
            </div>
            {bottom.length > 0 && (
              <div className="border-muted2 relative flex flex-col border-t border-solid lg:flex-row">
                {bottom.map((service, i) => (
                  <ServiceCard
                    key={`bottom-${i}`}
                    {...service}
                    last={i === bottom.length - 1}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {hasMore && (
          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-muted-foreground">
              Showing 6 of {items.length} services
            </p>
            <Button asChild size="lg" variant="outline" className="font-semibold">
              <Link href="/services">
                View all services
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
