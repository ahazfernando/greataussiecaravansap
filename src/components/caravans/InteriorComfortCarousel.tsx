"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const INTERIOR_GALLERY_IMAGES = [
  "/caravaninterior/EDITED-08044.jpg",
  "/caravaninterior/EDITED-08078.jpg",
  "/caravaninterior/EDITED-08080.jpg",
] as const;

const AUTOPLAY_MS = 4000;

export function InteriorComfortCarousel({ modelName }: { modelName: string }) {
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
    let id: ReturnType<typeof setInterval>;
    const armAutoplay = () => {
      window.clearInterval(id);
      id = window.setInterval(() => api.scrollNext(), AUTOPLAY_MS);
    };
    armAutoplay();
    api.on("select", armAutoplay);
    return () => {
      window.clearInterval(id);
      api.off("select", armAutoplay);
    };
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true, duration: 20 }}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {INTERIOR_GALLERY_IMAGES.map((src, index) => (
            <CarouselItem key={src} className="pl-0 basis-full">
              <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-lg bg-zinc-900 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.65)]">
                <Image
                  src={src}
                  alt={`${modelName} interior view ${index + 1} of ${INTERIOR_GALLERY_IMAGES.length}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div
        className="mt-5 flex items-center justify-center gap-2.5 px-2"
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
              "h-2 shrink-0 rounded-full transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              selected === index
                ? "w-10 bg-accent shadow-[0_0_12px_rgba(245,158,11,0.45)]"
                : "w-2.5 bg-white/25 hover:bg-white/45",
            )}
            style={{ borderRadius: "9999px" }}
          />
        ))}
      </div>
    </div>
  );
}
