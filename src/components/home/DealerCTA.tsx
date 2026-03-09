"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function DealerCTA() {
    return (
        <section className="relative w-full overflow-hidden bg-black pb-0 pt-16 lg:pt-24 border-t border-gray-900">
            <div className="relative w-full flex flex-col lg:flex-row min-h-[500px] lg:min-h-[600px]">
                {/* Left Side Container - Text Content */}
                {/* Aligned further to the left instead of centered container */}
                <div className="w-full px-4 sm:px-8 lg:pl-16 xl:pl-32 relative z-10 lg:w-1/2 flex flex-col justify-center pb-16 lg:pb-24">
                    <div className="max-w-xl">
                        {/* Top link */}
                        <Link
                            href="/contact"
                            className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white mb-8 group transition-colors"
                        >
                            Start your journey
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        {/* Main Headline */}
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase leading-[1.1] mb-6 tracking-tight">
                            Connect with our <span className="italic font-medium">dealers</span>
                            and find your <span className="text-accent">perfect caravan.</span>
                        </h2>

                        {/* Paragraph */}
                        <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
                            Join hands with adventurers across Australia who are discovering
                            their dream caravans with guidance from our authorized dealers.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 items-center">
                            <Button
                                variant="default"
                                size="lg"
                                className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-6 text-sm sm:text-base font-semibold transition-all duration-300 group shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                asChild
                            >
                                <Link href="/dealers" className="flex items-center">
                                    Find a Dealer
                                    <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="bg-transparent border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-sm sm:text-base font-semibold transition-all duration-300"
                                asChild
                            >
                                <Link href="/contact">
                                    Contact Us
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right Side - Image Bleeding Out */}
                {/* Absolute positioned on desktop to bleed out of container */}
                <div className="relative lg:absolute right-0 top-0 bottom-0 w-full lg:w-[55%] flex items-end justify-end mt-12 lg:mt-0 pt-0 lg:pt-12 overflow-hidden mx-auto max-w-[1920px]">
                    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-full flex items-end justify-end">
                        {/* Image wraps right side layout */}
                        <div className="relative w-full lg:w-[120%] h-[110%] ml-auto right-[-2%] lg:right-[-5%] bottom-[-5%] lg:bottom-[-10%] z-0 translate-y-8 lg:translate-y-12">
                            {/* 
                  Using unoptimized img tag or standard Next Image 
                  but allowing it to scale correctly outside the typical bounds.
                  The translation pushes it slightly down and right.
               */}
                            <Image
                                src="/caravan/GreatAussiePatchD1.png"
                                alt="Great Aussie Caravan Equalizer Cruzer"
                                fill
                                className="object-contain object-right-bottom scale-[1.02]"
                                priority
                                sizes="(max-width: 1024px) 100vw, 60vw"
                            />
                        </div>

                        {/* Left side fade to blend with background on desktop if needed */}
                        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent hidden lg:block pointer-events-none z-10" />

                        {/* Bottom fade */}
                        <div className="absolute bottom-0 left-0 right-[-10%] h-24 lg:h-32 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
