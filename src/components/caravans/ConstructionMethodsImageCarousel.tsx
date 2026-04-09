"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const CONSTRUCTION_IMAGES = [
  "/aboutus/AssetImageD1.png",
  "/aboutus/GAC-SET-55.jpg",
] as const;

const ROTATE_MS = 4000;

export function ConstructionMethodsImageCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % CONSTRUCTION_IMAGES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative w-full">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
        {CONSTRUCTION_IMAGES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`Advanced construction methods ${i + 1} of ${CONSTRUCTION_IMAGES.length}`}
            fill
            className={cn(
              "object-cover transition-opacity duration-700",
              i === index ? "z-[1] opacity-100" : "z-0 opacity-0 pointer-events-none",
            )}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={i === 0}
          />
        ))}
      </div>
      <div
        className="mt-4 flex items-center justify-center gap-2.5"
        role="tablist"
        aria-label="Construction photos"
      >
        {CONSTRUCTION_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={index === i}
            aria-label={`Show construction image ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2 shrink-0 rounded-full transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              index === i
                ? "w-10 bg-accent shadow-[0_0_12px_rgba(245,158,11,0.45)]"
                : "w-2.5 bg-white/25 hover:bg-white/45",
            )}
          />
        ))}
      </div>
    </div>
  );
}
