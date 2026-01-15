import { cn } from "@/lib/utils";
import Image from "next/image";

interface Service {
  title: string;
  description: string;
  image: string;
  className?: string;
  enlarge?: boolean;
  last?: boolean;
}

interface ServicesProps {
  title: string;
  description: string;
  service1: Service;
  service2: Service;
  service3: Service;
  service4: Service;
  service5: Service;
  service6: Service;
  className?: string;
}

const Service = ({
  title,
  description,
  image,
  className,
  enlarge = false,
  last = false,
}: Service) => {
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

const Services = ({
  title,
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  service1,
  service2,
  service3,
  service4,
  service5,
  service6,
  className,
}: ServicesProps) => {
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
              <Service {...service1} enlarge />
              <Service {...service2} />
              <Service {...service3} last />
            </div>
            <div className="border-muted2 relative flex flex-col border-t border-solid lg:flex-row">
              <Service {...service4} />
              <Service {...service5} />
              <Service {...service6} last enlarge />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
