/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {useRef} from "react";
import Autoplay from "embla-carousel-autoplay";

function Banner() {
  const plugin = useRef(Autoplay({delay: 2000, stopOnInteraction: true}));

  return (
    <header className="w-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-[600px] overflow-hidden rounded-lg"
      >
        <CarouselContent>
          {[1, 2, 3].map((index) => (
            <CarouselItem
              key={index}
              className="flex items-center justify-center h-full"
            >
              <img
                className="rounded-lg object-cover w-full h-full"
                src={`images/banner-${index}.jpg`}
                alt={`Banner ${index}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </header>
  );
}

export default Banner;
