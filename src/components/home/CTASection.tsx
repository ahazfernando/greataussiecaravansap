"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative w-full overflow-x-hidden bg-gradient-to-br from-black via-gray-950 to-black">
      <div className="relative w-full min-h-[600px] lg:min-h-[700px] flex flex-col lg:flex-row">
        {/* Left Side - Image (extends to very left edge, breaks out of container) */}
        <div className="relative order-2 lg:order-1 w-full lg:w-1/2 min-h-[450px] lg:min-h-[700px] flex items-end lg:items-center">
          {/* Image container with overlap effect - entering from left, partially visible */}
          <div className="relative w-full lg:absolute lg:left-0 lg:right-auto lg:w-[calc(50vw+10rem)] h-full lg:h-[90%]">
            <div className="relative w-full h-full rounded-2xl lg:rounded-r-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] lg:shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
              <Image
                src="/widget/GreatAussieD1V2 1-min.png"
                alt="Great Aussie Caravans off-road caravan"
                fill
                className="object-cover object-left lg:object-left-center"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              {/* Gradient overlay on right edge for smoother blend */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/25 lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-black/40 pointer-events-none" />
              {/* Subtle glow effect on caravan edges */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-accent/8 lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-accent/10 pointer-events-none" />
              {/* Ground shadow effect for realism */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Right Side - Content (extends to very right edge) */}
        <div className="relative order-1 lg:order-2 w-full lg:w-1/2 lg:ml-auto flex flex-col justify-center px-4 sm:px-6 lg:pl-8 xl:pl-12 lg:pr-0 py-16 lg:py-24">
          <div className="w-full max-w-2xl lg:pr-8 xl:pr-12">
            {/* Small pill button at top right */}
            <div className="flex justify-end mb-8 lg:mb-12">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white hover:text-white backdrop-blur-sm px-6 py-2 text-sm font-medium transition-all duration-300 hover:border-white/30"
                asChild
              >
                <Link href="/contact" className="flex items-center gap-2">
                  Start your journey
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Main headline with gold accents */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 lg:mb-8 leading-tight tracking-tight">
              Connect with{" "}
              <span className="text-accent">Experts</span> and Find Your{" "}
              <span className="text-accent">Perfect</span> Caravan
            </h2>

            {/* Supporting paragraph */}
            <p className="text-gray-300 text-lg lg:text-xl mb-10 lg:mb-12 leading-relaxed max-w-xl">
              Join thousands of adventurers across Australia who are discovering their dream caravans with guidance from our authorized dealer network.
            </p>

            {/* Primary CTA button */}
            <div className="group">
              <Button
                variant="default"
                size="xl"
                className="bg-white text-black hover:bg-gray-100 rounded-xl px-8 lg:px-10 py-6 lg:py-7 text-lg lg:text-xl font-semibold shadow-2xl hover:shadow-[0_20px_40px_rgba(251,191,36,0.3)] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                asChild
              >
                <Link href="/caravans" className="flex items-center gap-2">
                  Explore our Options
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
