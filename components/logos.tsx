"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import adityaBirlaImg from "@/assets/logos/adityabirla.png";
import hdfcImg from "@/assets/logos/hdfc.svg";
import heliosImg from "@/assets/logos/helios.png";
import koticImg from "@/assets/logos/kotak.svg";
import motilalImg from "@/assets/logos/motilal.webp";
import nipponImg from "@/assets/logos/nipponindia.webp";
import sbiImg from "@/assets/logos/sbi.svg";
import tataImg from "@/assets/logos/tata.svg";
import whiteoakImg from "@/assets/logos/whiteoak.svg";
import Image from "next/image";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  subheading?: string;
  logos?: Logo[];
  className?: string;
}

const Logos = ({
  heading = "Trusted by India's Leading Financial Partners",
  subheading = "Partners that align with our commitment to integrity and long-term wealth creation",
  logos = [
    {
      id: "logo-1",
      description: "Aditya Birla Mutual Fund",
      image: adityaBirlaImg.src,
      className: "h-9 w-auto",
    },
    {
      id: "logo-2",
      description: "HDFC Mutual Fund",
      image: hdfcImg.src,
      className: "h-9 w-auto",
    },
    {
      id: "logo-3",
      description: "Helios Mutual Fund",
      image: heliosImg.src,
      className: "h-12 w-auto",
    },
    {
      id: "logo-5",
      description: "Motilal Oswal Mutual Fund",
      image: motilalImg.src,
      className: "h-12 w-auto",
    },
    {
      id: "logo-6",
      description: "Nippon India Mutual Fund",
      image: nipponImg.src,
      className: "h-7 w-auto",
    },
    {
      id: "logo-4",
      description: "Kotak Mutual Fund",
      image: koticImg.src,
      className: "h-14 w-auto",
    },
    {
      id: "logo-7",
      description: "SBI Mutual Fund",
      image: sbiImg.src,
      className: "h-7 w-auto",
    },
    {
      id: "logo-8",
      description: "TATA AIA Life Insurance",
      image: tataImg.src,
      className: "h-7 w-auto",
    },
    {
      id: "logo-9",
      description: "Whiteoak Capital Mutual Fund",
      image: whiteoakImg.src,
      className: "h-9 w-auto",
    },
  ],
  className,
}: Logos3Props) => {
  return (
    <div className={cn("pt-8 md:pt-16", className)}>
      <div className="container flex flex-col items-center text-center">
        <h2 className="my-2 text-lg font-semibold text-pretty lg:text-xl">
          {heading}
          <br />
          <span className="text-sm font-medium text-muted-foreground lg:text-base">
            {subheading}
          </span>
        </h2>
      </div>
      <div className="pt-5 md:pt-8 lg:pt-10">
        <div className="relative overflow-hidden mx-auto flex items-center justify-center">
          <Carousel
            opts={{ loop: true, watchDrag: false }}
            plugins={[
              AutoScroll({
                playOnInit: true,
                speed: 1,
                stopOnInteraction: false,
                stopOnFocusIn: false,
                stopOnMouseEnter: false,
              }),
            ]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex gap-2 basis-1/4 justify-center pl-0 lg:basis-1/5"
                >
                  <div className="mx-10 flex shrink-0 items-center justify-center">
                    <div>
                      <Image
                        width={540}
                        height={320}
                        src={logo.image}
                        alt={logo.description}
                        className={logo.className}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-12 bg-linear-to-r from-background to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-linear-to-l from-background to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default Logos;
