"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type DealerHeroSectionProps = {
  /** Image for the right column (large screens); path under `/public`. */
  rightImageSrc?: string;
  journeyHref?: string;
  dealersHref?: string;
  contactHref?: string;
};

const defaultRightImageSrc = "/modelexterior/ge%20gat.png";

export function DealerHeroSection({
  rightImageSrc = defaultRightImageSrc,
  journeyHref = "/contact",
  dealersHref = "/dealers",
  contactHref = "/contact",
}: DealerHeroSectionProps) {
  return (
    <section className="bg-black pb-16 md:pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.6 }}
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden"
      >
        <div className="flex min-h-[520px] w-full flex-col bg-black lg:min-h-[640px] lg:flex-row lg:items-stretch">
          <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-10 lg:w-1/2 lg:py-16 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-10 xl:py-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-2xl text-left"
            >
              <Link
                href={journeyHref}
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white md:text-base"
              >
                Start your journey
                <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.25} aria-hidden />
              </Link>

              <h2 className="font-display text-3xl font-bold uppercase leading-[1.1] text-white md:text-4xl lg:text-5xl">
                <span className="block">Connect with our</span>
                <span className="mt-1 block">
                  <span className="font-semibold italic">Dealers</span>{" "}
                  <span className="font-bold not-italic">and find your</span>
                </span>
                <span className="mt-1 block text-accent">Perfect caravan.</span>
              </h2>

              <p className="mt-8 max-w-xl text-base leading-relaxed text-white md:mt-10 md:text-lg">
                Join hands with adventurers across Australia who are discovering their dream caravans
                with guidance from our authorized dealers.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-12">
                <Link
                  href={dealersHref}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-90 md:text-base"
                >
                  Find a Dealer
                  <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                </Link>
                <Link
                  href={contactHref}
                  className="inline-flex items-center justify-center rounded-full border border-white bg-transparent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 md:text-base"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="relative min-h-[280px] w-full lg:w-1/2 lg:min-h-0">
            <Image
              src={rightImageSrc}
              alt="Great Aussie Caravans — connect with our dealers"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority={false}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
