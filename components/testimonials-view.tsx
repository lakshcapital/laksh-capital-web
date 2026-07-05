"use client";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Masonry from "react-masonry-css";
import AutoScroll from "embla-carousel-auto-scroll";

export interface TestimonialItem {
  name: string;
  designation: string;
  company: string;
  message: string;
  avatarSrc?: string;
}

interface TestimonialCardProps extends TestimonialItem {
  className?: string;
}

const TestimonialCard = ({
  name,
  designation,
  company,
  message,
  avatarSrc = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
}: TestimonialCardProps) => {
  return (
    <Card className="py-6 shadow-sm max-w-md">
      <CardContent className="pt-6 leading-7 text-foreground/70">
        <q>{message}</q>
      </CardContent>
      <CardFooter className="[.border-t]:pt-6">
        <div className="flex gap-4 leading-5 tracking-wide">
          <span
            data-slot="avatar"
            className="relative flex shrink-0 overflow-hidden size-9 rounded-full ring-1 ring-input"
          >
            <Image
              width={80}
              height={80}
              data-slot="avatar-image"
              className="aspect-square size-full"
              alt={name}
              src={avatarSrc}
            />
          </span>
          <div className="text-sm">
            <p className="font-medium">{name}</p>
            <p className="text-muted-foreground">{designation}</p>
            <p className="text-muted-foreground">{company}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

interface TestimonialsViewProps {
  testimonials: TestimonialItem[];
}

const TestimonialsView = ({ testimonials }: TestimonialsViewProps) => {
  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 lg:py-28 w-full bg-primary/10"
    >
      <div className="container">
        <div className="flex flex-col items-center gap-6">
          <Badge variant="outline" className="font-semibold">
            Testimonials
          </Badge>
          <h2 className="mb-2 text-center text-3xl font-semibold lg:text-6xl">
            Meet our happy clients
          </h2>
          <p className="text-muted-foreground lg:text-lg">
            Real experiences from clients who trust us with their financial
            journey
          </p>

          <div className="my-6 block lg:mt-14 lg:hidden">
            <Carousel
              className="relative w-full max-w-80"
              opts={{ loop: true }}
              plugins={[
                AutoScroll({
                  playOnInit: true,
                  speed: 1,
                  stopOnFocusIn: true,
                  stopOnInteraction: true,
                }),
              ]}
            >
              <CarouselContent>
                {testimonials.map((testimonial, i) => (
                  <CarouselItem key={i}>
                    <TestimonialCard {...testimonial} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="mt-14 hidden w-full overflow-hidden lg:block">
            <Masonry
              breakpointCols={3}
              className="flex gap-6 [&>div:nth-child(1)]:translate-y-15 [&>div:nth-child(3)]:translate-y-15"
              columnClassName="masonry-column flex flex-col gap-6"
            >
              {testimonials.map((testimonial, i) => (
                <TestimonialCard key={i} {...testimonial} />
              ))}
            </Masonry>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsView;
