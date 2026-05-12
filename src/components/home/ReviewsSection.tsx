"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    text: "We were nervous buying our first family caravan, but the team walked us through layouts, payload, and tow limits.",
    name: "Michael Harris",
    time: "February 2026",
    caravan: "Xplora",
  },
  {
    id: 2,
    text: "Great range of off-road caravans and no sales pressure. They helped us compare options clearly and delivered exactly what we were promised.",
    name: "James Carter",
    time: "January 2026",
    caravan: "Territory",
  },
  {
    id: 3,
    text: "From financing questions to handover day, everything was easy. We hit the road the same weekend and the setup advice saved us hours.",
    name: "Sarah Collins",
    time: "December 2025",
    caravan: "Xplora",
  },
  {
    id: 4,
    text: "We upgraded to a larger caravan and traded in our old van. The valuation was fair, communication was clear, and delivery was right on schedule.",
    name: "Olivia Bennett",
    time: "November 2025",
    caravan: "Royal",
  },
  {
    id: 5,
    text: "After months of comparing brands, this was the best value by far. Build quality feels solid and after-sales support has been excellent.",
    name: "Daniel Foster",
    time: "October 2025",
    caravan: "Territory",
  },
  {
    id: 6,
    text: "We wanted a van for long regional trips and they matched us with the right model straight away. Honest advice and a stress-free process.",
    name: "Emily Wright",
    time: "September 2025",
    caravan: "Xplorer",
  },
];

const CARD_WIDTH_WITH_GAP = 380;

export function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  useEffect(() => {
    const updateBounds = () => {
      if (!scrollRef.current) return;
      const visibleCards = Math.max(
        1,
        Math.floor(scrollRef.current.clientWidth / CARD_WIDTH_WITH_GAP)
      );
      const nextMaxIndex = Math.max(0, reviews.length - visibleCards);
      setMaxIndex(nextMaxIndex);
      setCurrentIndex((prev) => Math.min(prev, nextMaxIndex));
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (maxIndex <= 0) return;
    setCurrentIndex((prev) => {
      if (dir === "left") return prev <= 0 ? maxIndex : prev - 1;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: currentIndex * CARD_WIDTH_WITH_GAP,
      behavior: "smooth",
    });
  }, [currentIndex]);

  return (
    <section className="bg-black py-20">
      <motion.div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Real stories from caravan owners across Australia.
          </h2>
          <motion.div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-sm text-slate-400">
            <span className="font-semibold text-white">4.2/5</span>
            <span className="flex items-center gap-2 font-medium text-slate-200">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              Trusted by Caravan Buyers Across Australia
            </span>
            <span>Based on 5,210 reviews</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-14 grid gap-10 lg:grid-cols-[360px_1fr]"
        >
          <motion.div className="flex flex-col">
            <span className="mb-5 w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
              Testimonial
            </span>

            <h3 className="text-3xl font-bold leading-tight text-white">
              Built for the Road,
              <br />
              Backed by Adventure
            </h3>

            <p className="mt-4 text-slate-400">
              Families, couples, and full-time travellers share their buying and
              ownership experience so you can choose your next caravan with confidence.
            </p>

            <motion.div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={() => scroll("left")}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-slate-200 transition hover:bg-white/10"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                className="grid h-11 w-11 place-items-center rounded-full border border-yellow-400 text-yellow-400 transition hover:bg-white/10"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 lg:mr-[calc(50%-50vw)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((review) => (
              <article
                key={review.id}
                className="min-w-[360px] max-w-[360px] snap-start"
              >
                <motion.div className="rounded-3xl border border-white/10 bg-[#0b0b0b] p-4">
                  <motion.div className="mb-2.5 flex items-center justify-between">
                    <motion.div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </motion.div>
                    <Quote className="h-7 w-7 text-yellow-400/55" />
                  </motion.div>

                  <p className="min-h-[108px] line-clamp-4 text-sm leading-6 text-slate-300">
                    {review.text}
                  </p>

                  <motion.div className="my-3 h-px bg-white/10" />

                  <motion.div className="flex items-end justify-between gap-4">
                    <motion.div>
                      <p className="text-xl font-semibold leading-tight text-white">
                        {review.name}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Purchased: {review.caravan}
                      </p>
                    </motion.div>
                    <p className="pb-1 text-sm text-slate-400">{review.time}</p>
                  </motion.div>
                </motion.div>
              </article>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
