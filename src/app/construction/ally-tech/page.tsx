"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Shield,
  Droplets,
  Wind,
  Weight,
  Leaf,
  Sparkles,
  FlaskConical,
  Wrench
} from "lucide-react";
import Image from "next/image";
import ProcessStep from "@/components/construction/ProcessStep";

export default function AllyTechPage() {
  const images = [
    "/home/HomeHeader(D1V1C2).jpg",
    "/constructions/greataussiesek.jpg"
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
          <div className="absolute inset-0 bg-[url('/aboutus/Gemini_Generated_Image_hzctfihzctfihzct.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-charcoal/30" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <Badge className="mb-6 bg-accent/20 text-accent border-accent/30">
              Advanced Aluminium Frame Construction
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              AllyTech Construction{" "}
              <span className="text-accent">Strength Without Compromise</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
              Our Caravans combines precision-welded aluminium frames with
              advanced wall and insulation systems to deliver unmatched durability
              and structural integrity.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link href="/caravans">
                View AllyTech Models
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
                <span className="px-4 py-1 border-2 border-accent/30 rounded-[24px] bg-accent/10 text-white text-sm">
                  Advanced Construction Technology
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
                    Our AllyTech construction system combines precision-welded aluminium frames with advanced materials to deliver unmatched durability and structural integrity.
                  </p>
                  <Link href="/caravans">
                    <button className="px-6 bg-transparent border border-gray-800 rounded-full text-white hover:bg-gray-900 hover:border-accent transition-colors h-8 flex items-center">
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
                  title: "Welded Aluminium Frame",
                  description: "Precision-welded aluminium frame construction provides structural strength and resistance to corrosion.",
                  tags: ["Aluminium", "Welded"],
                },
                {
                  image: "/home/HomeAssets(D1V1C2).jpg",
                  title: "Fibreglass Lined Walls",
                  description: "Advanced fibreglass lining provides superior moisture resistance and structural reinforcement throughout.",
                  tags: ["Fibreglass", "Reinforced"],
                },
                {
                  image: "/home/Homeassets(D1V1C3).jpg",
                  title: "XPS Insulation",
                  description: "Premium XPS (Extruded Polystyrene) insulation delivers exceptional thermal performance and moisture resistance.",
                  tags: ["Premium", "Thermal"],
                },
                {
                  image: "/home/HomeAssets(D1V1C4).jpg",
                  title: "Honeycomb Floor",
                  description: "Lightweight honeycomb floor system provides excellent load-bearing capacity and thermal insulation properties.",
                  tags: ["Lightweight", "Strong"],
                },
              ].map((reason, index) => (
                <div
                  key={reason.title}
                  className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-accent/30 flex flex-col"
                >
                  <div className="p-6 relative flex-shrink-0">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex gap-2">
                        {reason.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div
                        className="w-3 h-3 rounded-full bg-accent"
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
              Why Choose <span className="text-accent">AllyTech</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AllyTech construction system combines precision-welded aluminium frames with advanced materials to deliver unmatched durability, structural integrity, and long-term performance for your Australian adventures.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Large Image - Left Side */}
            <div className="lg:col-span-2 lg:row-span-2 relative overflow-hidden rounded-3xl">
              <Image
                src="/home/constructionteams2.jpg"
                alt="AllyTech Construction"
                fill
                className="object-cover transition-opacity duration-1000"
              />
            </div>

            {/* Strength Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-white border border-border/50 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Maximum Strength</h3>
              <p className="text-muted-foreground text-sm">
                Welded aluminium construction provides superior structural integrity and load-bearing capacity.
              </p>
            </div>

            {/* Moisture Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-white border border-border/50 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Droplets className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Moisture Resistant</h3>
              <p className="text-muted-foreground text-sm">
                Fibreglass-lined walls ensure complete moisture protection and structural reinforcement.
              </p>
            </div>

            {/* Thermal Card - Highlighted */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center mb-4 shadow-lg">
                <Wind className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">XPS Insulation</h3>
              <p className="text-white text-sm">
                Premium thermal insulation delivers exceptional temperature control and energy efficiency.
              </p>
            </div>

            {/* Durability Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-white border border-border/50 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Weight className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Long-Term Durability</h3>
              <p className="text-muted-foreground text-sm">
                Aluminium and fibreglass construction ensures decades of reliable performance.
              </p>
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
            <ProcessStep step={1} title="Frame" description="Precision-cut aluminium or composite assembly" />
            <ProcessStep step={2} title="Wall System" description="Bonded panels with integrated insulation" />
            <ProcessStep step={3} title="Insulation" description="High-performance thermal barrier" />
            <ProcessStep step={4} title="Floor System" description="Composite flooring with moisture barriers" />
            <ProcessStep step={5} title="Assembly" description="Quality inspection and finishing" isLast />
          </div>
        </div>
      </section>

    </Layout>
  );
}

