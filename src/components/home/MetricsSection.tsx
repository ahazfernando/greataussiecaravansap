"use client";

import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Caravan, Users, Calendar, Star } from "lucide-react";

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
    <div ref={counterRef} className="inline-block">
      <span className="text-3xl md:text-4xl font-display font-bold text-white">
        {typeof end === "number" && end % 1 !== 0
          ? count.toFixed(1)
          : Math.floor(count)}
        {suffix}
      </span>
    </div>
  );
}

const metrics = [
  {
    icon: Caravan,
    value: 4000,
    suffix: "+",
    label: "Caravans Built",
  },
  {
    icon: Users,
    value: 3000,
    suffix: "+",
    label: "Happy Customers",
  },
  {
    icon: Calendar,
    value: 10,
    suffix: "+",
    label: "Years Experience",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "/5",
    label: "Average Rating",
  },
];

export function MetricsSection() {
  return (
    <section className="py-6 md:py-8 bg-black">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <Badge className="mb-4 border-2 border-accent/30 rounded-[24px] px-4 py-2 bg-accent/10 text-white">
            Our Achievements
          </Badge>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:whitespace-nowrap">
            Building Trust Through <span className="text-accent">Excellence</span>
          </h2>
          <p className="text-lg text-white/80">
            Years of dedication, thousands of satisfied customers, and a commitment to quality that speaks for itself.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="flex flex-col items-center text-center"
                >
                  {/* Icon Badge */}
                  <div className="w-14 h-10 rounded-lg bg-amber-900/40 border border-amber-600/50 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-amber-500" />
                  </div>
                  
                  {/* Metric Value */}
                  <div className="mb-2 min-h-[60px] flex items-center justify-center">
                    <Counter end={metric.value} suffix={metric.suffix} />
                  </div>
                  
                  {/* Label */}
                  <p className="text-sm text-gray-400">{metric.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

