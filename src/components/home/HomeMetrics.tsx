"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Caravan, Users, Calendar, Star, ArrowUpRight, type LucideIcon } from "lucide-react";

// Counter Hook for animated numbers
function useCounter(end: number, duration: number = 2000, startWhenInView: boolean = true) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(!startWhenInView);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime: number | null = null;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function for smooth deceleration
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentVal = easeOutQuart * end;
            const isDecimal = !Number.isInteger(end);

            setCount(isDecimal ? Number(currentVal.toFixed(1)) : Math.floor(currentVal));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, hasStarted]);

    return { count, setHasStarted };
}

interface MetricCardProps {
    value: number;
    suffix?: string;
    title: string;
    description?: string;
    delay?: number;
    icon: LucideIcon;
}

function MetricCard({ value, suffix = "", title, description, delay = 0, icon: Icon }: MetricCardProps) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const { count, setHasStarted } = useCounter(value, 2000, true);

    useEffect(() => {
        if (inView) {
            setTimeout(() => setHasStarted(true), delay * 1000);
        }
    }, [inView, delay, setHasStarted]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay }}
            className="relative flex flex-col justify-center p-6 bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden group hover:border-accent/20 transition-colors duration-500"
        >
            {/* Gradient Link Icon */}
            <div className="absolute top-0 right-0 p-3 bg-gradient-to-bl from-accent/20 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0">
                <ArrowUpRight className="w-5 h-5 text-accent" />
            </div>

            {/* Background Watermark Number */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-8xl md:text-9xl font-display font-bold text-white/[0.02] select-none pointer-events-none group-hover:text-white/[0.04] transition-colors duration-500">
                {value}{suffix}
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                <div className="flex items-start justify-between w-full">
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl md:text-5xl font-display font-bold text-accent">
                            {Number.isInteger(value) ? count.toLocaleString() : count.toFixed(1)}
                        </span>
                        <span className="text-3xl md:text-4xl font-display font-bold text-accent">
                            {suffix}
                        </span>
                    </div>
                    <div className="w-12 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-accent" />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">{title}</h3>
                    {description && (
                        <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-[280px]">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

type MetricData = {
    value: number;
    suffix?: string;
    title: string;
    description?: string;
    icon: LucideIcon;
};

const metricsData: MetricData[] = [
    {
        value: 4000,
        suffix: "+",
        title: "Caravans Built",
        description: "Families exploring Australia in our handcrafted vans",
        icon: Caravan,
    },
    {
        value: 3000,
        suffix: "+",
        title: "Happy Customers",
        description: "Industry-leading customer happiness score",
        icon: Users,
    },
    {
        value: 10,
        suffix: "+",
        title: "Years Experience",
        description: "Quarter century of Australian caravan building excellence",
        icon: Calendar,
    },
    {
        value: 4.9,
        suffix: "/5",
        title: "Average Rating",
        description: "From compact tourers to luxury land yachts",
        icon: Star,
    },
];

import { Badge } from "@/components/ui/badge";

export function HomeMetrics() {
    return (
        <section className="py-12 md:py-16 bg-black overflow-hidden relative border-y border-white/5">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container-wide relative z-10">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {metricsData.map((metric, index) => (
                        <MetricCard
                            key={index}
                            value={metric.value}
                            suffix={metric.suffix}
                            title={metric.title}
                            description={metric.description}
                            delay={index * 0.1}
                            icon={metric.icon}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
