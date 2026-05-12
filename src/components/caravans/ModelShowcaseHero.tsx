"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getModelLogo } from "@/components/navigation/getModelLogo";

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

  const getShowcaseImageAtOffset = (offset: number) =>
    showcaseImages[(showcaseImageIndex + offset) % slideCount] ?? showcaseImages[0];

  const showcaseCards = useMemo(
    () => [
      { title: "Interior comfort", image: getShowcaseImageAtOffset(0) },
      { title: "Built for touring", image: getShowcaseImageAtOffset(1) },
      { title: "Explore the range", image: getShowcaseImageAtOffset(2) },
    ],
    [showcaseImageIndex, showcaseImages]
  );

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

              <div className="grid w-full max-w-[32rem] grid-cols-3 gap-3 justify-self-end self-end md:gap-4">
                {showcaseCards.map((card) => (
                  <div key={card.title} className="group">
                    <div className="relative aspect-[1.25/1] overflow-hidden rounded-[24px] bg-zinc-950">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <motion.div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-3">
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/85 md:text-[0.72rem]">
                          {card.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 flex justify-center md:mt-10">
              <div
                className="flex items-center gap-2 md:gap-2.5"
                role="tablist"
                aria-label={`${modelName} showcase images`}
              >
                {showcaseImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={idx === showcaseImageIndex}
                    aria-label={`Show showcase image ${idx + 1}`}
                    onClick={() => setShowcaseImageIndex(idx)}
                    className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      idx === showcaseImageIndex
                        ? "scale-125 border-accent bg-accent shadow-[0_0_10px_rgba(242,169,0,0.65)]"
                        : "border-white/75 bg-transparent hover:border-accent/80 hover:bg-accent/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
