"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Droplets,
  Wind,
  Weight,
  Recycle,
  CheckCircle2,
  ArrowRight,
  Leaf,
  Star,
  Award,
  Heart,
  Caravan,
  Sparkles,
  TreePine,
  Layers,
  Box,
  Clock,
  TrendingUp
} from "lucide-react";
import Image from "next/image";
import ProcessStep from "@/components/construction/ProcessStep";

export default function TimberTechPage() {
  const images = [
    "/home/Homeassets(D1V1C3).jpg",
    "/constructiontypes/woodenconstruction.jpg"
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/home/Homeassets(D1V1C3).jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-charcoal/30" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <Badge className="mb-6 bg-accent/20 text-accent border-accent/30">
              Traditional Meranti Frame Construction
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              TimberTech Construction
              <br />
              <span className="text-accent">Proven. Reliable. Traditional.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
              TimberTech is the tried and proven traditional construction method that has been used
              within the industry for decades. Built with a meranti frame and designed for harsh
              Australian conditions.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link href="/caravans">
                View TimberTech Models
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Bottom Fade Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </section>

      {/* Core Construction Features Section */}
      <section className="py-20 bg-black overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {/* Top Section - Text Content */}
            <div className="col-span-12">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-4 py-1 bg-gray-900 border border-gray-800 rounded-full text-sm text-gray-300">
                  Traditional Construction Technology
                </span>
              </div>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                <div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                    Core Construction
                    <br />
                    <span className="text-accent">Features</span>
                  </h2>
                </div>
                <div className="lg:text-right">
                  <p className="text-md text-gray-300 max-w-md mb-4 lg:text-start">
                    Our TimberTech construction system combines traditional meranti timber framing with modern materials to deliver proven reliability and exceptional value.
                  </p>
                  <Link href="/caravans">
                    <button className="px-6 bg-transparent border border-gray-700 rounded-full text-white hover:bg-gray-900 transition-colors h-8 flex items-center">
                      View Models
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {[
                {
                  image: "/home/HomeAssets(D1V1C1).png",
                  title: "Meranti Timber Frame",
                  description: "Meranti frame with stud spacings of only 27.5cm, built and designed for harsh Australian conditions with exceptional structural strength.",
                  tags: ["Meranti", "Strong"],
                },
                {
                  image: "/home/HomeAssets(D1V1C2).jpg",
                  title: "One Piece Marine Ply Floor",
                  description: "Single-piece marine ply floor provides superior strength, durability, and moisture resistance for long-lasting performance.",
                  tags: ["Marine Ply", "Durable"],
                },
                {
                  image: "/home/Homeassets(D1V1C3).jpg",
                  title: "One Piece Fibreglass Roof",
                  description: "Seamless one-piece fibreglass roof ensures complete weather protection and eliminates potential leak points.",
                  tags: ["Fibreglass", "Weatherproof"],
                },
                {
                  image: "/home/HomeAssets(D1V1C4).jpg",
                  title: "Aluminium Checker Plate",
                  description: "Aluminium checker plate lower panels provide superior protection against road debris, stones, and impacts.",
                  tags: ["Protection", "Tough"],
                },
              ].map((reason, index) => (
                <div
                  key={reason.title}
                  className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col"
                >
                  <div className="p-6 relative flex-shrink-0">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex gap-2">
                        {reason.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{ backgroundColor: '#FFC685', color: '#472600' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: '#FFC685' }}
                      ></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                  {/* Bottom Section - Image */}
                  <div className="relative flex-1 min-h-[200px]">
                    <Image
                      src={reason.image}
                      alt={reason.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Benefits Section */}
      <section className="py-12 relative overflow-hidden bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 border border-accent/30 text-accent rounded-full text-sm font-semibold mb-6">
              <Sparkles className="h-4 w-4" />
              Key Advantages
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
              Why Choose <span className="text-accent">TimberTech</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our TimberTech construction system combines traditional meranti timber framing with modern materials to deliver proven reliability, exceptional value, and long-term performance for your Australian adventures.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Value Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-gray-900 border border-gray-800 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Award className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Exceptional Value</h3>
              <p className="text-gray-300 text-sm">
                Traditional construction delivers proven reliability without compromising on quality or strength.
              </p>
            </div>

            {/* Protection Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-gray-900 border border-gray-800 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Aluminium Protection</h3>
              <p className="text-gray-300 text-sm">
                Checker plate lower panels provide superior protection against road debris and impacts.
              </p>
            </div>

            {/* Insulation Card - Highlighted */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center mb-4 shadow-lg">
                <Wind className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Full Insulation</h3>
              <p className="text-gray-300 text-sm">
                Complete insulation system ensures comfortable temperatures in all Australian conditions.
              </p>
            </div>

            {/* Quality Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-gray-900 border border-gray-800 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Star className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Quality Materials</h3>
              <p className="text-gray-300 text-sm">
                Marine ply floor, fibreglass roof, and alucobond panelling ensure long-lasting performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose TimberTech Section */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                <Caravan className="h-8 w-8 text-accent" />
              </div>
              <span className="text-accent font-medium text-sm uppercase tracking-wide mb-2 block">
                Why Choose TimberTech
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                Traditional Quality, Modern Value
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                TimberTech represents the best of traditional caravan construction. With decades of
                proven performance in Australian conditions, it offers exceptional value without
                compromising on strength, quality, or reliability.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Award className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display font-semibold text-white mb-1">
                      Proven Track Record
                    </h3>
                    <p className="text-sm text-gray-300">
                      10+ Years of industry use have proven TimberTech construction in the harshest
                      Australian conditions. You're choosing a method that's stood the test of time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display font-semibold text-white mb-1">
                      Exceptional Value
                    </h3>
                    <p className="text-sm text-gray-300">
                      Get proven reliability and quality at an affordable price point. TimberTech
                      delivers exceptional value for budget-conscious adventurers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display font-semibold text-white mb-1">
                      Built for Australia
                    </h3>
                    <p className="text-sm text-gray-300">
                      Designed specifically for harsh Australian conditions with meranti framing,
                      marine ply floors, and comprehensive protection systems.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button variant="accent" size="lg" asChild>
                  <Link href="/caravans">
                    Explore Our Models
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg aspect-square">
              <Image
                src="/constructiontypes/woodenconstruction.jpg"
                alt="TimberTech Construction"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Process Section */}
      <section className="py-12 relative bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              OUR PROCESS
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
              Precision <span className="text-accent">Manufacturing</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Every Great Aussie Caravan follows a rigorous manufacturing process to ensure consistent quality and structural integrity.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
            <ProcessStep step={1} title="Frame" description="Meranti timber frame assembly with 27.5cm stud spacing" />
            <ProcessStep step={2} title="Wall System" description="Alucobond composite wall panelling installation" />
            <ProcessStep step={3} title="Insulation" description="Full insulation system for thermal performance" />
            <ProcessStep step={4} title="Floor System" description="One-piece marine ply floor installation" />
            <ProcessStep step={5} title="Assembly" description="Quality inspection and finishing" isLast />
          </div>
        </div>
      </section>

    </Layout>
  );
}

