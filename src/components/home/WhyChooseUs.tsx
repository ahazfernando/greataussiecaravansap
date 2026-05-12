"use client";

import { motion } from "framer-motion";
import { Hammer, Users, HeartHandshake, Sparkles } from "lucide-react";

const backgroundImage = "/subnavigationbar/Referring_the_second_image_for_202605072142.jpeg";

const features = [
  {
    icon: Hammer,
    title: "Australian Build Quality",
    description:
      "Every caravan is built right here in Australia using premium materials suited to our unique conditions.",
  },
  {
    icon: Sparkles,
    title: "Value for Money",
    description:
      "Premium quality at competitive prices. No hidden costs, no surprises—just value.",
  },
  {
    icon: Users,
    title: "Experienced Craftsmanship",
    description:
      "Our team brings decades of combined experience in caravan design and manufacturing.",
  },
  {
    icon: HeartHandshake,
    title: "After-Sales Support",
    description:
      "We're with you long after the sale with dedicated service, parts, and support.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding relative overflow-hidden bg-black">
      <img
        src={backgroundImage}
        alt="Built for Australian Adventures"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/78 to-black" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/45" />

      <div className="container-wide relative z-10">
        <div className="flex justify-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl"
          >
            <p className="text-accent font-display text-3xl md:text-4xl font-bold mb-2">
              Why choose us
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
              Built for Australian Adventures
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              At Great Aussie Caravans, we understand what it takes to build a caravan that can
              handle the diverse Australian landscape. From the red centre to coastal roads, our
              caravans are designed to deliver comfort, reliability, and adventure.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex gap-4 opacity-0 animate-fade-up group"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
                >
                  <motion.div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/20 group-hover:bg-accent/30 border border-accent/30 group-hover:border-accent/50 flex items-center justify-center transition-all duration-300">
                    <feature.icon className="h-6 w-6 text-accent group-hover:scale-110 transition-transform duration-300" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-white mb-1 group-hover:text-accent transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
