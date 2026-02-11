"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Wrench, Heart, Caravan, Star, Calendar } from "lucide-react";
import LiquidEther from "@/components/ui/LiquidEther";

const values = [
  {
    icon: Award,
    title: "Quality First",
    description: "We never compromise on materials or craftsmanship. Every caravan we build meets the highest Australian standards.",
  },
  {
    icon: Users,
    title: "Family Values",
    description: "As a family business, we treat every customer like family. Your satisfaction is our legacy.",
  },
  {
    icon: Wrench,
    title: "Built to Last",
    description: "Our caravans are designed for Australian conditions—tough, reliable, and built to last generations.",
  },
  {
    icon: Heart,
    title: "Passionate Service",
    description: "We love what we do, and it shows. From design to delivery, we're passionate about your adventure.",
  },
];

const metrics = [
  {
    icon: Caravan,
    value: 4000,
    suffix: "+",
    label: "Caravans Built",
    color: "text-accent",
  },
  {
    icon: Users,
    value: 3000,
    suffix: "+",
    label: "Happy Customers",
    color: "text-accent",
  },
  {
    icon: Calendar,
    value: 10,
    suffix: "+",
    label: "Years Experience",
    color: "text-accent",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "/5",
    label: "Average Rating",
    color: "text-accent",
  },
];

function Counter({ end, suffix, duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
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
    <div ref={counterRef}>
      <span className="text-3xl md:text-4xl font-display font-bold text-white">
        {typeof end === "number" && end % 1 !== 0
          ? count.toFixed(1)
          : Math.floor(count)}
        {suffix}
      </span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-12 md:py-16 lg:py-24 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-black overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-auto md:w-full md:object-cover md:object-right object-contain md:translate-y-0 -translate-y-32 scale-[2.5] md:scale-100"
          >
            <source src="/widget/GA (1).mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container-wide relative z-10 flex items-end min-h-[600px] pb-12">
          <div className="max-w-2xl">
            <span className="mb-4 text-accent text-sm font-semibold uppercase tracking-wide block">
              Built for adventure
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              About Great <br className="md:hidden" />Aussie Caravans
            </h1>
            <p className="text-lg text-white/90 leading-relaxed mb-0">
              Building quality Australian caravans that help families create lasting memories on the road.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-black relative overflow-hidden min-h-[600px]">
        {/* LiquidEther Background Effect */}
        <div className="absolute inset-0 opacity-20" style={{ zIndex: 0, height: "100%" }}>
          <LiquidEther
            colors={["#FAA31B", "#FFB84D", "#FFD700"]}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-white font-medium text-sm uppercase tracking-wide mb-4 block border-2 border-accent/30 rounded-[24px] px-4 py-2 inline-block bg-accent/10 backdrop-blur-sm">
                Our Beginning
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                A Family Passion for Adventure
              </h2>
              <div className="prose prose-lg text-gray-300 mb-8">
                <p>
                  Once upon a time in the vast and awe-inspiring landscapes of Australia, a dream was born. A dream of freedom, exploration, and the allure of the open road. This dream gave birth to a company known as Great Aussie Caravans. Many years later, perched around the campfire and surrounded by caravans, the dream expanded toward Motorhomes.
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-gray-800">
                {metrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <div
                      key={metric.label}
                      className="text-left group"
                    >
                      <div className="flex justify-start mb-3">
                        <div className="w-12 h-12 rounded-lg bg-accent/20 border border-accent/30 group-hover:bg-accent/30 group-hover:border-accent/50 flex items-center justify-center transition-all duration-300">
                          <Icon className={`h-6 w-6 ${metric.color} group-hover:scale-110 transition-transform duration-300`} />
                        </div>
                      </div>
                      <Counter end={metric.value} suffix={metric.suffix} />
                      <p className="text-sm text-gray-400 mt-2">{metric.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative">
              <img
                src="/aboutus/GAC-SET-38-min.jpg"
                alt="Caravan interior craftsmanship"
                className="rounded-xl shadow-2xl border border-gray-800/50 w-full h-full object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-black p-6 rounded-xl shadow-2xl border border-accent/20">
                <p className="text-4xl font-display font-bold">2016</p>
                <p className="text-sm font-medium opacity-90">Est.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-8 md:py-12 lg:py-16 bg-black">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-white font-medium text-sm uppercase tracking-wide mb-4 block border-2 border-accent/30 rounded-[24px] px-4 py-2 inline-block bg-accent/10 backdrop-blur-sm">
              Our Mission
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
              Building Dreams, One Caravan at a Time
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Great Aussie was founded by a group of passionate adventurers who believed in the magic of creating homes-on-wheels for fellow wanderers seeking to embrace the nomadic lifestyle. Their journey began with the humble yet sturdy Caravans, designed to be the perfect companions for the road less traveled. From the very first Caravan that rolled out of their workshop, it was evident that they were onto something special.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16 bg-black">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-white font-medium text-sm uppercase tracking-wide mb-4 block border-2 border-accent/30 rounded-[24px] px-4 py-2 inline-block bg-accent/10 backdrop-blur-sm">
              What Drives Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Our Core Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center p-6 opacity-0 animate-fade-up group"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
              >
                <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/30 group-hover:bg-accent/30 group-hover:border-accent/50 flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                  <value.icon className="h-8 w-8 text-accent group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-accent transition-colors duration-300">{value.title}</h3>
                <p className="text-sm text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-black">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="/home/GAC-SET-147-min.jpg"
                alt="The Great Aussie Caravans team"
                className="rounded-xl shadow-2xl border border-gray-800/50 w-full h-auto"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-white font-medium text-sm uppercase tracking-wide mb-4 block border-2 border-accent/30 rounded-[24px] px-4 py-2 inline-block bg-accent/10 backdrop-blur-sm">
                Our Team
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                Meet the People Behind the Caravans
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Our team of 50+ skilled craftspeople cabinetmakers, electricians, upholsterers, and engineers build every caravan with pride and precision, with many having over a decade of experience. We're caravanners too, so our firsthand road knowledge guides every design decision.
              </p>
              <Button variant="accent" className="text-black" asChild>
                <Link href="/contact">Visit Our Showroom</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}

