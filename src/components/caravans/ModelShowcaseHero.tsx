"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getModelLogo } from "@/components/navigation/getModelLogo";
import { cn } from "@/lib/utils";

type ModelShowcaseHeroProps = {
  modelName: string;
  showcaseImages: string[];
  description?: string;
  factoryVisitHref?: string;
};

export function ModelShowcaseHero({
  modelName,
  showcaseImages,
  description = "Premium caravan model with enhanced features and spacious interiors.",
  factoryVisitHref = "/contact",
}: ModelShowcaseHeroProps) {
  const [showcaseImageIndex, setShowcaseImageIndex] = useState(0);
  const slideCount = Math.max(1, showcaseImages.length);

  useEffect(() => {
    if (slideCount <= 1) return;

    const intervalId = window.setInterval(() => {
      setShowcaseImageIndex((current) => (current + 1) % slideCount);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [slideCount]);

  const showcaseBackgroundSrc =
    showcaseImages[showcaseImageIndex % slideCount] ?? showcaseImages[0];

  return (
    <section className="bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.6 }}
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden min-h-[440px] md:min-h-[560px] lg:min-h-[640px]"
      >
        <Image
          src={showcaseBackgroundSrc}
          alt={`${modelName} feature showcase`}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

        <div className="relative z-10 flex min-h-[440px] flex-col justify-end md:min-h-[560px] lg:min-h-[640px]">
          <div className="container-wide px-6 pb-4 md:px-10 md:pb-6 lg:px-12 lg:pb-8">
            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
              <div className="max-w-lg justify-self-start">
                <motion.div className="relative mb-3 h-16 w-64 md:h-20 md:w-80 lg:h-24 lg:w-[26rem]">
                  <Image
                    src={getModelLogo(modelName)}
                    alt={`${modelName} logo`}
                    fill
                    className="object-contain object-left"
                  />
                </motion.div>

                <p className="mt-0 max-w-lg text-sm leading-relaxed text-white/80 md:text-base">
                  {description}
                </p>

                <div className="mt-4">
                  <Link
                    href={factoryVisitHref}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-black transition-opacity hover:opacity-90 md:px-8"
                  >
                    Book a factory visit
                    <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden />
                  </Link>
                </div>
              </div>

              <div
                className={cn(
                  "flex max-w-[calc(100vw-2.5rem)] flex-nowrap justify-self-end gap-2 self-end overflow-x-auto overscroll-x-contain pb-0.5 sm:gap-2.5 md:max-w-[min(100%,26rem)] lg:max-w-[min(100%,28rem)]",
                  "[scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.25)_transparent]"
                )}
                role="group"
                aria-label={`${modelName} studio images — select a tile to change the hero image`}
              >
                {showcaseImages.map((src, idx) => {
                  const selected = idx === showcaseImageIndex;
                  return (
                    <button
                      key={`${idx}-${src}`}
                      type="button"
                      onClick={() => setShowcaseImageIndex(idx)}
                      aria-current={selected ? "true" : undefined}
                      aria-label={`Show studio image ${idx + 1} of ${slideCount}`}
                      className={cn(
                        "group w-[3.5rem] shrink-0 rounded-lg text-left outline-none transition-[transform,box-shadow] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-16 sm:rounded-xl md:w-[4.25rem]",
                        selected && "z-[1] scale-[1.02]"
                      )}
                    >
                      <div
                        className={cn(
                          "relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-zinc-950 ring-1 ring-offset-1 ring-offset-black transition-[ring-color,box-shadow] duration-300 sm:rounded-xl",
                          selected
                            ? "ring-2 ring-accent shadow-[0_0_12px_rgba(249,115,22,0.32)]"
                            : "ring-white/20 group-hover:ring-white/45"
                        )}
                      >
                        <Image
                          src={src}
                          alt={`${modelName} studio view ${idx + 1}`}
                          fill
                          sizes="(max-width: 640px) 24vw, 90px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div
                          className={cn(
                            "pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/75 to-transparent transition-opacity",
                            selected ? "opacity-100" : "opacity-70 group-hover:opacity-90"
                          )}
                        />
                        <span className="pointer-events-none absolute bottom-1 left-1 font-display text-[0.55rem] font-bold tabular-nums leading-none text-white/95 sm:bottom-1.5 sm:left-1.5 sm:text-[0.6rem]">
                          {idx + 1}
                          <span className="font-normal text-white/55">/{slideCount}</span>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
