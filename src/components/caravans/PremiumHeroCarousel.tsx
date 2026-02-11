"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

// Function to get model logo based on model name
const getModelLogo = (modelName: string): string => {
  const logoMap: Record<string, string> = {
    "Striker": "/caravanmodels/strikerlogo.png",
    "20URER LITE": "/caravanmodels/euorerlitelogo.png",
    "20URER": "/caravanmodels/eourerlogo.png",
    "Gravity": "/caravanmodels/gravitylogo.png",
    "Xplora": "/caravanmodels/xploralogo.png",
    "Tonka": "/caravanmodels/tonkologo.png",
    "Paragon": "/caravanlogos/litelogo.png",
  };
  
  return logoMap[modelName] || "/caravanlogos/litelogo.png";
};

interface CaravanModel {
  id: string;
  name: string;
  tagline: string;
  heroImage: string;
  category: string;
}

interface PremiumHeroCarouselProps {
  models: CaravanModel[];
}

export function PremiumHeroCarousel({ models }: PremiumHeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeModel = models[activeIndex];
  const prevModel = models[activeIndex > 0 ? activeIndex - 1 : models.length - 1];
  const nextModel = models[activeIndex < models.length - 1 ? activeIndex + 1 : 0];

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % models.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev - 1 + models.length) % models.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Auto-play (optional - can be removed if not desired)
  useEffect(() => {
    const interval = setInterval(() => {
      // Auto-play disabled by default - uncomment to enable
      // goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const heroImageSrc = typeof activeModel.heroImage === 'string' 
    ? activeModel.heroImage 
    : (activeModel.heroImage as any).src || activeModel.heroImage;

  const prevImageSrc = typeof prevModel.heroImage === 'string' 
    ? prevModel.heroImage 
    : (prevModel.heroImage as any).src || prevModel.heroImage;

  const nextImageSrc = typeof nextModel.heroImage === 'string' 
    ? nextModel.heroImage 
    : (nextModel.heroImage as any).src || nextModel.heroImage;

  return (
    <section className="relative w-full bg-black min-h-screen flex flex-col overflow-hidden">
      {/* Background model images overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-20 left-0 w-1/3 h-1/3">
          <img
            src={heroImageSrc}
            alt=""
            className="w-full h-full object-cover blur-3xl"
          />
        </div>
        <div className="absolute top-40 right-0 w-1/4 h-1/4">
          <img
            src={heroImageSrc}
            alt=""
            className="w-full h-full object-cover blur-3xl"
          />
        </div>
      </div>
      {/* Hero Carousel Container */}
      <div className="relative flex-1 flex items-center justify-center pt-2 pb-24 md:pb-28 z-10">
        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 md:left-8 z-30 p-3 rounded-full bg-gray-800/90 hover:bg-gray-800 border border-gray-700 transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm"
          aria-label="Previous model"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 md:right-8 z-30 p-3 rounded-full bg-gray-800/90 hover:bg-gray-800 border border-gray-700 transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm"
          aria-label="Next model"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>

        {/* Carousel Content */}
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-12">
          <div className="relative flex items-center justify-center min-h-[500px] md:min-h-[550px] lg:min-h-[600px]">
            {/* Previous Model (Left) - Hidden on mobile */}
            <motion.div
              key={`prev-${prevModel.id}`}
              initial={{ opacity: 0, x: -100, scale: 0.7 }}
              animate={{ 
                opacity: 0.35, 
                x: -100,
                scale: 0.75,
                filter: "blur(4px)"
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 z-10 pointer-events-none hidden lg:block"
            >
              <div className="relative w-[300px] lg:w-[400px] h-[250px] lg:h-[300px]">
                <img
                  src={prevImageSrc}
                  alt={prevModel.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>

            {/* Active Model (Center) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`active-${activeModel.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-20 flex flex-col items-center w-full"
              >
                {/* Model Logo */}
                <motion.div
                  key={`logo-${activeModel.id}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05, duration: 0.3 }}
                  className="mb-0"
                >
                  <div className="relative w-40 md:w-56 lg:w-72 xl:w-80 h-20 md:h-28 lg:h-36 xl:h-40">
                    <Image
                      src={getModelLogo(activeModel.name)}
                      alt={`${activeModel.name} Logo`}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Tagline */}
                <motion.h2
                  key={`tagline-${activeModel.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-display font-bold text-white uppercase tracking-tight text-center px-4 mt-2 md:mt-3"
                >
                  {activeModel.tagline}
                </motion.h2>

                {/* Model Image */}
                <motion.div
                  key={`image-${activeModel.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="relative w-full max-w-4xl xl:max-w-5xl h-[320px] md:h-[380px] lg:h-[450px] xl:h-[520px] mt-4 md:mt-6"
                >
                  <img
                    src={heroImageSrc}
                    alt={activeModel.name}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Next Model (Right) - Hidden on mobile */}
            <motion.div
              key={`next-${nextModel.id}`}
              initial={{ opacity: 0, x: 100, scale: 0.7 }}
              animate={{ 
                opacity: 0.35, 
                x: 100,
                scale: 0.75,
                filter: "blur(4px)"
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 z-10 pointer-events-none hidden lg:block"
            >
              <div className="relative w-[300px] lg:w-[400px] h-[250px] lg:h-[300px]">
                <img
                  src={nextImageSrc}
                  alt={nextModel.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Call to Actions (Bottom Center) */}
      <div className="absolute bottom-12 md:bottom-16 lg:bottom-20 left-0 right-0 z-30 flex justify-center items-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center"
        >
        <Button
          asChild
          className="bg-[#F2A900] hover:bg-[#E09A00] text-black px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-semibold rounded-lg min-w-[160px] md:min-w-[180px]"
        >
          <Link href={`/caravans/${activeModel.id}`}>
            Explore the Model
          </Link>
        </Button>
        <Button
          variant="outline"
          asChild
          className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-semibold rounded-lg min-w-[160px] md:min-w-[180px]"
        >
          <Link href="/brochure" className="flex items-center gap-2 justify-center">
            <Download className="w-3 h-3 md:w-4 md:h-4" />
            Download Brochure
          </Link>
        </Button>
        </motion.div>
      </div>
    </section>
  );
}

