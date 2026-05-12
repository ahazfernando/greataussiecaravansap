"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroImage = "/widget/I_want_the_caravan_and_202605071844%20(1).jpeg";

export function AdventureHeroSection() {
  return (
    <section className="bg-black py-8 md:py-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.6 }}
        className="w-full pl-0 pr-4 sm:pr-6 lg:pr-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
        >
          <motion.div className="relative min-h-[260px] overflow-hidden rounded-[24px] sm:min-h-[340px] lg:min-h-[420px]">
            <img
              src={heroImage}
              alt="Great Aussie caravan adventure scene"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-r from-transparent via-black/50 to-black" />
          </motion.div>

          <motion.div className="text-left lg:pl-4">
            <Link
              href="/caravans"
              className="mb-6 inline-flex items-center gap-2 text-gray-300 transition-colors hover:text-white"
            >
              <span className="text-sm md:text-base">Start your adventure</span>
              <ArrowRight className="h-5 w-5" />
            </Link>

            <h2 className="font-display mb-6 text-4xl font-bold uppercase leading-[0.95] text-white md:text-5xl lg:text-6xl">
              <span className="text-accent">Discover</span> the
              <br />
              caravan for <span className="text-accent">your</span>
              <br />
              next <span className="italic text-accent">adventure</span>
            </h2>

            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-300">
              Explore off-road, touring, and family-ready models built for Australian roads and
              open-country escapes. Find the setup that matches your travel style and start planning
              your next great journey with confidence.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                className="h-14 rounded-full bg-white px-8 text-xl font-semibold text-black hover:bg-gray-100"
                asChild
              >
                <Link href="/caravans" className="inline-flex items-center gap-2">
                  Discover Models
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>

              <Button
                variant="outline"
                className="h-14 rounded-full border-2 border-white px-8 text-xl font-semibold text-white hover:bg-white/10"
                asChild
              >
                <Link href="/contact">Talk to Our Team</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
