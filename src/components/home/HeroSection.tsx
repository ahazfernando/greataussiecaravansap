"use client";

import Image from "next/image";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen lg:min-h-[120vh] flex items-center overflow-hidden -mt-24 pt-24">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/home/cotsco 1.png"
          alt="Great Aussie Caravans Hero"
          fill
          priority
          className="object-cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-primary/30" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-24">
        <div className="max-w-4xl animate-fade-up">
          <span className="inline-block text-accent font-medium mb-3 md:mb-4 tracking-wide uppercase text-xs md:text-sm">
            Australian Owned & Operated
          </span>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight max-w-3xl">
            <span className="block md:hidden">
              Built for Real <br />
              <span className="text-accent">Australian Adventures</span>
            </span>
            <span className="hidden md:block">
              Quality Australian Caravans <br className="hidden sm:block" />Built for{" "}
              <span className="text-accent">Real Adventures</span>
            </span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/80 mb-6 md:mb-8 leading-relaxed max-w-xl">
            Australian-owned. Built tough. Designed for comfort and reliability.
            <span className="hidden md:inline"> Experience the freedom of the Australian outback with a caravan you can trust.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Button
              variant="hero"
              size="lg"
              className="text-sm md:text-base px-6 md:px-8 py-2 md:py-3 h-auto"
              asChild
            >
              <Link href="/caravans">View Our Caravans</Link>
            </Button>
            <Button
              variant="heroOutline"
              size="lg"
              className="text-sm md:text-base px-6 md:px-8 py-2 md:py-3 h-auto"
              asChild
            >
              <Link href="/contact">Contact a Dealer</Link>
            </Button>
          </div>
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
