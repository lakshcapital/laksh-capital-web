import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import placeholderImg from "@/assets/about1.jpg";
import missionBg from "@/assets/about2.jpg";
import Image from "next/image";

interface AboutCard {
  icon: ReactNode;
  title: string;
  description: string;
}

interface AboutProps {
  description: string;
  placeholderImgSrc?: string;
  placeholderImgAlt?: string;
  missionBgImg?: string;
  missionText: string;
  heading2: string;
  description2: string;
  cards: AboutCard[];
  className?: string;
}

const About = ({
  description,
  placeholderImgSrc = placeholderImg.src,
  placeholderImgAlt = "placeholder",
  missionBgImg = missionBg.src,
  missionText,
  heading2,
  description2,
  cards,
  className,
}: AboutProps) => {
  return (
    <section
      id="about"
      className={cn("py-16 md:py-24 lg:py-28 w-full", className)}
    >
      <div className="container flex flex-col gap-16 lg:gap-28">
        <div className="flex flex-col gap-4 lg:gap-8">
          <h2 className="text-3xl font-semibold tracking-tighter lg:text-6xl">
            About Us
          </h2>
          <p className="max-w-xl md:text-lg">{description}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Image
            width={1920}
            height={1281}
            alt={placeholderImgAlt}
            className="size-full max-h-96 rounded-2xl object-cover grayscale"
            src={placeholderImgSrc}
          />
          <div
            className={`flex flex-col justify-between gap-10 rounded-2xl bg-muted bg-cover bg-center p-10`}
            style={{
              backgroundImage: `url(${missionBgImg})`,
            }}
          >
            <p className="text-sm font-semibold text-white">OUR MISSION</p>
            <p className="text-lg font-medium text-white">{missionText}</p>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:gap-20">
          <div className="max-w-xl">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight md:text-4xl">
              {heading2}
            </h2>
            <p className="text-lg text-muted-foreground">{description2}</p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {cards.map((card, i) => (
              <div key={`about-card-${i}`} className="flex flex-col">
                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                  {card.icon}
                </div>
                <h3 className="mt-2 mb-3 text-lg font-semibold">
                  {card.title}
                </h3>
                <p className="text-muted-foreground">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
