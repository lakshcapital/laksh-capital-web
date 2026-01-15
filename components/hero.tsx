import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";
import Image from "next/image";
import Logos from "./logos";

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
  image: {
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
    primary: {
      text: "",
      url: "",
    },
  },
  image = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    alt: "Hero section demo image showing interface components",
  },
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
          <Image
            width={1920}
            height={1080}
            src={image.src}
            alt={image.alt}
            className="max-h-96 w-full rounded-md object-cover shadow-sm backdrop-blur-md"
          />
        </div>
        <Logos />
      </div>
    </section>
  );
};

export default Hero;

// interface HeroProps {
//   icon?: React.ReactNode;
//   heading: string;
//   description: string;
//   button: {
//     text: string;
//     icon?: React.ReactNode;
//     url: string;
//     className?: string;
//   };
//   trustText?: string;
//   imageSrc?: string;
//   imageAlt?: string;
//   className?: string;
// }
// const Hero = ({
//   icon = <Wifi className="size-6" />,
//   heading,
//   description,
//   button,
//   trustText,
//   imageSrc,
//   imageAlt,
//   className,
// }: HeroProps) => {
//   return (
//     <section className={cn("overflow-hidden py-32", className)}>
//       <div className="container">
//         <div className="flex flex-col gap-5">
//           <div className="relative flex flex-col gap-5">
//             <div
//               style={{
//                 transform: "translate(-50%, -50%)",
//               }}
//               className="absolute top-1/2 left-1/2 -z-10 mx-auto size-200 rounded-full border mask-[linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] p-16 md:size-325 md:p-32"
//             >
//               <div className="size-full rounded-full border p-16 md:p-32">
//                 <div className="size-full rounded-full border"></div>
//               </div>
//             </div>
//             <span className="mx-auto flex size-16 items-center justify-center rounded-full border md:size-20">
//               {icon}
//             </span>
//             <h2 className="mx-auto max-w-5xl text-center text-3xl font-medium text-balance md:text-6xl">
//               {heading}
//             </h2>
//             <p className="mx-auto max-w-3xl text-center text-muted-foreground md:text-lg">
//               {description}
//             </p>
//             <div className="flex flex-col items-center justify-center gap-3 pt-3 pb-12">
//               <Button
//                 size="lg"
//                 className="bg-linear-to-br from-primary to-green-500"
//                 asChild
//               >
//                 <a href={button.url}>
//                   {button.text} {button.icon}
//                 </a>
//               </Button>
//               {trustText && (
//                 <div className="text-xs text-muted-foreground">{trustText}</div>
//               )}
//             </div>
//           </div>
//           <Image
//             src={imageSrc}
//             alt={imageAlt}
//             width={1920}
//             height={1281}
//             className="mx-auto h-full max-h-131 w-full max-w-5xl rounded-t-2xl object-cover mask-b-from-50%"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;
