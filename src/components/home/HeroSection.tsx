"use client";

import Image from "next/image";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const HERO_MODEL_LOGOS = [
  { name: "Striker", src: "/caravanmodels/strikerlogo.png", href: "/caravans/striker" },
  { name: "20URER", src: "/caravanmodels/eourerlogo.png", href: "/caravans/20urer" },
  { name: "Gravity", src: "/caravanmodels/gravitylogo.png", href: "/caravans/gravity" },
  { name: "Xplora", src: "/caravanmodels/xploralogo.png", href: "/caravans/xplora" },
  { name: "Tonka", src: "/caravanmodels/tonkologo.png", href: "/caravans/tonka" },
  { name: "20URER LITE", src: "/caravanmodels/euorerlitelogo.png", href: "/caravans" },
] as const;

function HeroLogoMarquee() {
  const row = (instance: "a" | "b") => (
    <div className="flex shrink-0 items-center gap-10 pr-10 md:gap-14 md:pr-14">
      {HERO_MODEL_LOGOS.map((logo) => (
        <Link
          key={`${instance}-${logo.src}`}
          href={logo.href}
          className="inline-flex shrink-0 items-center justify-center opacity-90 drop-shadow-[0_2px_8px_rgba(0,0,0,.6)] transition hover:opacity-100"
        >
          <Image
            src={logo.src}
            alt={`${logo.name} model`}
            width={160}
            height={56}
            className="h-9 w-auto object-contain md:h-11"
          />
        </Link>
      ))}
    </div>
  );

  return (
    <div
      className="relative left-1/2 mt-10 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden py-4 md:mt-14 md:py-5"
      aria-label="Caravan model range"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black/80 to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black/80 to-transparent md:w-24" />
      <div className="flex w-max animate-marquee [animation-duration:45s] motion-reduce:animate-none">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative -mt-24 flex min-h-dvh items-center overflow-hidden pt-24 pb-10 sm:pb-12 md:min-h-screen md:pb-0 lg:min-h-[120vh]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/aboutus/Gemini_Generated_Image_hzctfihzctfihzct.png"
          alt="Great Aussie Caravans Hero"
          fill
          priority
          className="object-cover object-center"
          quality={100}
        />
        {/* Mobile: stronger neutral scrim for readable type over a busy photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-black/75 md:bg-none" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-primary/90 via-primary/60 to-primary/30 md:block" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/50 to-transparent sm:h-32 md:via-black/60" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto w-full max-w-full px-4 sm:px-6 sm:py-10 md:px-8 md:py-24">
        <div className="animate-fade-up w-full max-w-4xl text-left">
          <span className="mb-3 inline-block text-[10px] font-semibold uppercase tracking-[0.22em] text-accent [text-shadow:0_1px_2px_rgba(0,0,0,.9)] md:mb-4 md:text-sm md:tracking-wide md:[text-shadow:none]">
            Australian Owned & Operated
          </span>
          <h1 className="font-display mb-5 max-w-3xl text-4xl font-bold leading-[1.08] text-white [text-shadow:0_1px_2px_rgba(0,0,0,.9)] sm:mb-6 md:mb-6 md:text-5xl md:[text-shadow:none] xl:text-6xl">
            <span className="block md:hidden">
              Built for Real <br />
              <span className="text-accent whitespace-nowrap">Australian Adventures</span>
            </span>
            <span className="hidden md:block">
              Quality Australian Caravans <br className="hidden sm:block" />
              Built for <span className="text-accent">Real Adventures</span>
            </span>
          </h1>
          <p className="mb-8 max-w-xl text-sm leading-relaxed text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,.9)] md:mb-8 md:text-lg md:[text-shadow:none] lg:text-xl">
            Australian-owned. Built tough. Designed for comfort and reliability.
            <span className="hidden md:inline">
              {" "}
              Experience the freedom of the Australian outback with a caravan you can trust.
            </span>
          </p>
          <div className="flex flex-row flex-nowrap items-center justify-start gap-2 sm:gap-3 md:gap-4">
            <Button
              variant="hero"
              size="lg"
              className="h-auto min-h-10 shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold sm:min-h-11 sm:px-5 sm:py-2.5 sm:text-sm md:min-h-0 md:rounded-lg md:px-8 md:py-3 md:text-base"
              asChild
            >
              <Link href="/caravans">View Our Caravans</Link>
            </Button>
            <Button
              variant="heroOutline"
              size="lg"
              className="h-auto min-h-10 shrink-0 rounded-full border-2 border-white/90 bg-black/20 px-3.5 py-2 text-xs font-semibold shadow-[0_1px_0_rgba(255,255,255,.06)] backdrop-blur-[1px] hover:bg-white/15 sm:min-h-11 sm:px-5 sm:py-2.5 sm:text-sm md:min-h-0 md:rounded-lg md:border-white/80 md:bg-transparent md:px-8 md:py-3 md:text-base md:shadow-none md:backdrop-blur-none"
              asChild
            >
              <Link href="/contact">Contact a Dealer</Link>
            </Button>
          </div>

          <HeroLogoMarquee />
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse" />
        </div>
      </div> */}
    </section>
  );
}
