"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const constructionLogos = [
  { name: "AllyTech", src: "/constructiontypes/allytechl.png" },
  { name: "TimberTech", src: "/constructiontypes/timbertechl.png" },
  { name: "FiberTech", src: "/constructiontypes/fibertechl.png" },
];

const backgroundImage =
  "/adventure/I_want_you_to_place_202605071850%20(1).jpeg";

export function BuiltToLastSection() {
  return (
    <section className="bg-black pb-8 md:pb-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.6 }}
        className="relative min-h-[320px] md:min-h-[420px] lg:min-h-[500px] overflow-hidden"
      >
        <img
          src={backgroundImage}
          alt="Built to last caravan construction"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
        <motion.div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        <div className="relative z-10 h-full flex items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-5 md:p-8 lg:p-10 max-w-5xl"
          >
            <p className="text-accent uppercase tracking-[0.18em] text-xs md:text-sm mb-3">
              Built To Last
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 max-w-4xl">
              Engineered for the long
              <br />
              Road and every adventure
            </h2>
            <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
              Our caravans are designed with proven construction systems that balance{" "}
              <br className="hidden sm:inline" />
              strength, comfort, and reliability for Australian conditions.
            </p>

            <motion.div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6">
              {constructionLogos.map((logo) => (
                <img
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 md:h-10 w-auto object-contain"
                />
              ))}
            </motion.div>

            <Link
              href="/construction"
              className="inline-flex items-center gap-2 text-white hover:text-accent transition-colors font-medium"
            >
              Explore our construction methods
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
