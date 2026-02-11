"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Layout } from "@/components/layout";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { PremiumHeroCarousel } from "@/components/caravans/PremiumHeroCarousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Tag, ArrowRight, TrendingDown, Zap, Star, Users, Caravan, Award, Shield, Gift, Clock, CheckCircle2 } from "lucide-react";

// Animated Counter Component
function AnimatedCounter({ end, suffix = "", className = "", duration = 2000 }: { end: number; suffix?: string; className?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            const startTime = Date.now();
            const startValue = 0;

            const animate = () => {
              const now = Date.now();
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Easing function for smooth animation
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const currentValue = startValue + (end - startValue) * easeOutQuart;

              setCount(currentValue);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(end);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [end, duration, hasStarted]);

  return (
    <div ref={counterRef} className={className}>
      {typeof end === "number" && end % 1 !== 0
        ? count.toFixed(1)
        : Math.floor(count)}
      {suffix}
    </div>
  );
}

// Featured models for hero carousel
const featuredModels = [
  {
    id: "striker",
    name: "Striker",
    tagline: "Hybrid Adventure Ready",
    heroImage: "/caravan/CaravanImage(D1V1C1).webp",
    category: "hybrid",
  },
  {
    id: "20urer",
    name: "20URER",
    tagline: "Premium Caravan Experience",
    heroImage: "/caravan/CaravanImage(D1V1C3).webp",
    category: "touring",
  },
  {
    id: "gravity",
    name: "Gravity",
    tagline: "Off-Road Dominance",
    heroImage: "/caravan/CaravanImage(D1V1C5).webp",
    category: "off-road",
  },
  {
    id: "xplora",
    name: "Xplora",
    tagline: "Explore Without Limits",
    heroImage: "/caravan/cfi_featured_image.png",
    category: "off-road",
  },
  {
    id: "20urer-lite",
    name: "20URER LITE",
    tagline: "Lightweight Caravan Excellence",
    heroImage: "/caravan/CaravanImage(D1V1C2).png",
    category: "touring",
  },
  {
    id: "tonka",
    name: "Tonka",
    tagline: "Built Tough, Built Right",
    heroImage: "/caravan/CaravanImage(D1V1C1).webp",
    category: "off-road",
  },
];

export default function SalePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      {/* Premium Header Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        {/* Dynamic Background with Parallax */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-[url('/home/HomeHeader(D1V1C3).jpg')] bg-cover bg-center"
            style={{
              transform: `translateY(${scrollY * 0.3}px) scale(1.05)`,
              transition: "transform 0.1s ease-out",
            }}
          />
          {/* Multi-layer Gradient Overlay for Depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/90" />
        </div>

        {/* Animated Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"
            animate={{
              y: [0, 30, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"
            animate={{
              y: [0, -40, 0],
              x: [0, -30, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/3 rounded-full blur-2xl"
            animate={{
              y: [0, 25, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        {/* Content Container */}
        <div className="container-wide relative z-10 py-20 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            {/* Animated Sale Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8"
            >
              <Badge
                className="bg-accent/20 text-accent border-2 border-accent/40 px-6 py-3 text-sm md:text-base font-bold tracking-wider uppercase backdrop-blur-sm hover:bg-accent/30 transition-all duration-300"
              >
                <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                Exclusive Sale Event
                <Tag className="h-4 w-4 ml-2" />
              </Badge>
            </motion.div>

            {/* Main Headline with Staggered Animation */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1]"
            >
              <span className="block">Discover Your</span>
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-accent">Dream Adventure</span>
                <motion.span
                  className="absolute bottom-3 left-0 right-0 h-4 bg-accent/30 transform -skew-x-12 -z-0"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                />
              </span>
              <span className="block mt-2">At Unbeatable Prices</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Premium Australian caravans crafted for the ultimate adventure.
              <br className="hidden sm:block" />
              <span className="text-accent font-semibold">Limited time offers</span> on selected models.
            </motion.p>

            {/* Key Benefits Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3 mb-10"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                <TrendingDown className="h-4 w-4 text-accent" />
                <span className="text-white text-sm font-medium">Up to AUD$20,000 OFF</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-white text-sm font-medium">Instant Availability</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                <Star className="h-4 w-4 text-accent fill-accent" />
                <span className="text-white text-sm font-medium">Extended Warranty</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Button
                variant="hero"
                size="xl"
                className="group shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-all duration-300"
                asChild
              >
                <Link href="#reviews">
                  Explore Customer Stories
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                variant="heroOutline"
                size="xl"
                className="backdrop-blur-sm border-2 border-white/80 hover:bg-white/20 transition-all duration-300"
                asChild
              >
                <Link href="/contact">
                  Get Your Quote
                </Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>Australian Owned & Built</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>Premium Quality Guaranteed</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>Expert Support Team</span>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-white/60"
            >
              <span className="text-xs uppercase tracking-wider font-medium">Scroll</span>
              <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-3 bg-white/60 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </section>

      {/* Premium Hero Carousel Slider */}
      <section className="relative bg-black">
        <PremiumHeroCarousel
          models={featuredModels.filter(
            (model) => model.name !== "Gravity" && model.name !== "Striker"
          )}
        />
      </section>

      {/* Action Section - Find a Dealer */}
      <section className="relative bg-black overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <div className="container-wide relative z-10 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Tagline Badge with Interactive Hover */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-6"
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-transparent border-2 border-white rounded-full text-white text-sm font-medium cursor-pointer group"
                whileHover={{
                  scale: 1.05,
                  borderColor: "#F2A900",
                  backgroundColor: "rgba(242, 169, 0, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Start your journey
                </motion.span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="h-3 w-3 group-hover:text-accent transition-colors" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Main Headline with Word-by-Word Animation */}
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-block"
              >
                Connect with Experts and
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-block relative"
              >
                <span className="relative z-10 text-accent"> Find Your Perfect Caravan</span>
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-1 bg-accent/30"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  style={{ transformOrigin: "left" }}
                />
              </motion.span>
            </motion.h2>

            {/* Description with Fade In */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg md:text-xl text-white mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Join thousands of adventurers across Australia who are discovering their dream caravans
              with guidance from our authorized dealer network.
            </motion.p>

            {/* Primary CTA Button with Enhanced Interactions */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5, type: "spring", stiffness: 100 }}
              className="inline-block"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  size="lg"
                  className="group relative bg-white hover:bg-gray-100 text-black px-6 md:px-8 py-4 md:py-5 text-base md:text-lg font-semibold rounded-lg shadow-lg hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 overflow-hidden"
                  asChild
                >
                  <Link href="/dealers" className="relative z-10 flex items-center">
                    <motion.span
                      className="relative z-10"
                      whileHover={{ x: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      Explore our Options
                    </motion.span>
                    <motion.div
                      className="ml-2 relative z-10"
                      animate={{ x: [0, 4, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animated Timeline Journey Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Dynamic Background Image with Parallax - Full Height */}
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full">
          <div
            className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-[url('/home/HomeAssets(D1V1C4).jpg')] bg-cover bg-center bg-no-repeat"
            style={{
              transform: `translateY(${scrollY * 0.2 - 200}px) scale(1.4)`,
              transition: "transform 0.1s ease-out",
              backgroundPosition: "center top",
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-gradient-to-b from-black/90 via-black/85 to-black/90" />
          <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(242,169,0,0.1)_0%,_transparent_50%)]" />
        </div>

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <Badge className="mb-6 bg-accent/20 text-accent border-2 border-accent/40 px-4 py-2 text-sm font-semibold">
              Your Journey
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              From Dream to <span className="text-accent">Adventure</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Experience our streamlined process designed to get you on the road faster
            </p>
          </motion.div>

          {/* Interactive Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent/50 to-accent transform -translate-x-1/2 hidden md:block" />

            {[
              { step: "01", title: "Explore Models", description: "Browse our extensive range and find your perfect match", icon: Caravan, delay: 0 },
              { step: "02", title: "Get Expert Advice", description: "Connect with our specialists for personalized guidance", icon: Users, delay: 0.2 },
              { step: "03", title: "Secure Your Deal", description: "Lock in exclusive sale pricing and special offers", icon: Tag, delay: 0.4 },
              { step: "04", title: "Hit the Road", description: "Start your Australian adventure with confidence", icon: Award, delay: 0.6 },
            ].map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: item.delay }}
                  className={`relative mb-16 md:mb-24 flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""
                    }`}
                >
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${isEven ? "md:text-right" : "md:text-left"} text-center md:text-left`}>
                    <motion.div
                      className="inline-flex items-center gap-3 mb-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                        <span className="text-accent font-bold text-lg">{item.step}</span>
                      </div>
                      <div className={`w-16 h-1 bg-accent ${isEven ? "md:order-first" : ""}`} />
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  </div>

                  {/* Center Icon */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <motion.div
                      className="w-20 h-20 rounded-full bg-gray-900 border-4 border-accent flex items-center justify-center relative z-10"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="h-10 w-10 text-accent" />
                      <motion.div
                        className="absolute inset-0 rounded-full bg-accent/20"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>

                  {/* Spacer */}
                  <div className="w-full md:w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Comparison Section */}
      <section className="relative bg-black py-20 md:py-32 overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-6 bg-accent/20 text-accent border-2 border-accent/40 px-4 py-2 text-sm font-semibold">
              Sale vs Regular
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              See the <span className="text-accent">Difference</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Compare what you get during our exclusive sale event
            </p>
          </motion.div>

          {/* Interactive Comparison Table */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 gap-4 p-6 bg-gray-950 border-b border-gray-800">
                <div className="font-semibold text-white">Feature</div>
                <div className="text-center font-semibold text-gray-400">Regular Price</div>
                <div className="text-center font-semibold text-accent">Sale Price</div>
              </div>

              {/* Rows */}
              {[
                { feature: "Base Price", regular: "$85,000", sale: "$80,000", savings: "$5,000" },
                { feature: "Warranty", regular: "3 Years", sale: "5 Years", savings: "+2 Years" },
                { feature: "Accessories Package", regular: "Not Included", sale: "Free Premium", savings: "$2,500 Value" },
                { feature: "Delivery Time", regular: "8-12 Weeks", sale: "2-4 Weeks", savings: "Priority" },
                { feature: "Setup & Training", regular: "Standard", sale: "Premium", savings: "Enhanced" },
              ].map((row, index) => (
                <motion.div
                  key={row.feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ backgroundColor: "rgba(242, 169, 0, 0.05)" }}
                  className="grid grid-cols-3 gap-4 p-6 border-b border-gray-800 last:border-0 transition-colors group"
                >
                  <div className="font-medium text-white group-hover:text-accent transition-colors">
                    {row.feature}
                  </div>
                  <div className="text-center text-gray-400 line-through">
                    {row.regular}
                  </div>
                  <div className="text-center">
                    <span className="text-accent font-bold text-lg">{row.sale}</span>
                    <div className="text-xs text-green-400 mt-1">{row.savings}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 text-center"
            >
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-black px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link href="/dealers">
                  Claim Your Savings Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Section with ID for smooth scroll */}
      <div id="reviews">
        <ReviewsSection />
      </div>
    </Layout>
  );
}

