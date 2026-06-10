import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllServices } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import wealthManagementImg from "@/assets/services/wealth-management.jpeg";
import mutualFundsImg from "@/assets/services/mutual-funds.jpeg";
import pmsImg from "@/assets/services/portfolio-management.jpeg";
import aifImg from "@/assets/services/alternate-investment.jpeg";
import sifImg from "@/assets/services/specialised-investment.jpeg";
import giftImg from "@/assets/services/gift-city.jpeg";

export const metadata: Metadata = {
  title: "All Services | Laksh Capital",
  description:
    "Explore the full range of wealth management, PMS, AIF, SIF, GIFT City, and tax planning services from Laksh Capital.",
};

export const revalidate = 60;

interface ServiceItem {
  title: string;
  description: string;
  image: string;
}

const FALLBACK_SERVICES: ServiceItem[] = [
  {
    title: "Wealth Management",
    description:
      "Holistic financial planning aligning investments, protection, and goals for long-term wealth creation.",
    image: wealthManagementImg.src,
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
  },
];

export default async function AllServicesPage() {
  const sanity = await getAllServices();

  const services: ServiceItem[] = sanity.length
    ? sanity.map((s) => ({
        title: s.title,
        description: s.description,
        image: urlFor(s.image).width(800).height(600).fit("crop").url(),
      }))
    : FALLBACK_SERVICES;

  return (
    <main className="py-16 md:py-24 lg:py-28">
      <div className="container max-w-6xl mx-auto">
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>

        <header className="flex flex-col items-center gap-5 mb-14 text-center">
          <Badge variant="outline" className="font-semibold">
            Services
          </Badge>
          <h1 className="text-3xl font-semibold lg:text-6xl max-w-3xl">
            What we manage for our clients.
          </h1>
          <p className="text-muted-foreground lg:text-lg max-w-2xl">
            Strategic financial solutions empowering confident decisions,
            sustainable growth, and future financial security.
          </p>
        </header>

        {services.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <article
                key={`service-${i}`}
                className="group flex flex-col overflow-hidden rounded-2xl border bg-background transition-all hover:shadow-lg hover:border-primary/30"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">
            Services will appear here shortly.
          </p>
        )}

        <div className="mt-20 rounded-2xl border bg-muted/40 p-8 text-center lg:p-12">
          <h3 className="text-2xl font-semibold lg:text-3xl">
            Not sure which service fits you?
          </h3>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Tell us about your portfolio and goals. We'll recommend the right
            mix for your stage of life and risk appetite.
          </p>
          <div className="mt-6">
            <Button asChild size="lg">
              <Link href="/#contact">
                Talk to an advisor <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
