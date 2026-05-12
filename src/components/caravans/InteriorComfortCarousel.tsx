"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const INTERIOR_SECOND_SRC = `/caravaninterior/${encodeURIComponent(
  "Screenshot 2026-04-09 at 6.08.14\u202fAM.png",
)}`;

const INTERIOR_GALLERY_IMAGES = [
  "/caravaninterior/EDITED-08044.jpg",
  INTERIOR_SECOND_SRC,
  "/caravaninterior/EDITED-08080.jpg",
] as const;

const AUTOPLAY_MS = 4000;

export function InteriorComfortCarousel({
  modelName,
  heading,
  description,
}: {
  modelName: string;
  heading: string;
  description: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    let id: number | undefined;
    const armAutoplay = () => {
      if (id !== undefined) window.clearInterval(id);
      id = window.setInterval(() => api.scrollNext(), AUTOPLAY_MS) as number;
    };
    armAutoplay();
    api.on("select", armAutoplay);
    return () => {
      if (id !== undefined) window.clearInterval(id);
      api.off("select", armAutoplay);
    };
  }, [api]);

  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);
  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  return (
    <div className="relative w-full overflow-hidden bg-black">
      <Carousel setApi={setApi} opts={{ align: "start", loop: true, duration: 20 }} className="w-full">
        <CarouselContent className="-ml-0">
          {INTERIOR_GALLERY_IMAGES.map((src, index) => (
            <CarouselItem key={src} className="basis-full pl-0">
              <div className="relative min-h-[360px] w-full bg-zinc-950 sm:min-h-[420px] md:min-h-[500px] lg:min-h-[580px]">
                <Image
                  src={src}
                  alt={`${modelName} interior view ${index + 1} of ${INTERIOR_GALLERY_IMAGES.length}`}
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div
        className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-transparent from-[20%] via-black/35 via-[45%] to-black/[0.88] to-[100%]"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end p-5 sm:p-7 md:justify-center md:p-10 lg:p-12 xl:p-14">
        <div className="pointer-events-auto ml-auto flex w-full max-w-[min(100%,22rem)] flex-col items-end text-right sm:max-w-[min(100%,26rem)] md:max-w-[min(100%,32%)] lg:max-w-[min(100%,34rem)]">
          <div className="mb-6 flex shrink-0 items-center gap-3 md:mb-10">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous interior slide"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/90 bg-black/15 text-white backdrop-blur-[2px] transition-colors hover:bg-black/35 md:h-12 md:w-12"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next interior slide"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/90 bg-black/15 text-white backdrop-blur-[2px] transition-colors hover:bg-black/35 md:h-12 md:w-12"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
            </button>
          </div>

          <h3 className="font-display text-3xl font-bold uppercase leading-tight text-white md:text-4xl lg:text-5xl">
            {heading}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/95 sm:text-base md:mt-5 md:text-lg lg:text-xl">
            {description}
          </p>

          <div
            className="mt-8 flex flex-wrap items-center justify-end gap-2 md:mt-10"
            role="tablist"
            aria-label="Interior photo carousel"
          >
            {INTERIOR_GALLERY_IMAGES.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={selected === index}
                aria-label={`Show interior image ${index + 1}`}
                onClick={() => scrollTo(index)}
                className={cn(
                  "h-2 w-2 shrink-0 rounded-full border border-white transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:h-2.5 md:w-2.5",
                  selected === index
                    ? "scale-125 border-white bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                    : "border-white/70 bg-transparent hover:border-white hover:bg-white/20",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
