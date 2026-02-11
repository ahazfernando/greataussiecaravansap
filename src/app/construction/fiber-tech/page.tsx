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
  ArrowLeft,
  Leaf,
  Zap,
  Wrench,
  Star,
  Award,
  Heart,
  Caravan,
  Sparkles,
  FlaskConical
} from "lucide-react";
import Image from "next/image";
import ProcessStep from "@/components/construction/ProcessStep";

export default function FiberTechPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/aboutus/Gemini_Generated_Image_aw1mffaw1mffaw1m.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-charcoal/30" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <Badge className="mb-6 bg-accent/20 text-accent border-accent/30">
              100% Timber-Free Construction
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="italic">FiberTech</span> Construction{" "}
              <span className="text-accent font-medium italic block mt-2">Lightweight. Strong. Sustainable.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
              Our advanced FiberTech system combines cutting-edge composite materials
              with precision engineering to deliver a caravan that's lighter, stronger,
              and more durable than traditional construction methods.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link href="/caravans">
                View Models Using FiberTech
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
                    Our FiberTech construction system combines cutting-edge materials and precision engineering to deliver superior performance, durability, and sustainability.
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
                  title: "Timber-Free Shell",
                  description: "Complete elimination of timber eliminates rot, swelling, and structural degradation. Your caravan maintains structural integrity in any climate.",
                  tags: ["Timber-Free", "Durable"],
                },
                {
                  image: "/home/HomeAssets(D1V1C2).jpg",
                  title: "Lightweight Design",
                  description: "Advanced composite materials reduce overall weight by up to 25% compared to traditional construction, improving fuel economy and towing ease.",
                  tags: ["Lightweight", "Efficient"],
                },
                {
                  image: "/home/Homeassets(D1V1C3).jpg",
                  title: "Moisture Resistance",
                  description: "Superior moisture resistance means no water damage, no mould, and no structural issues even in the wettest Australian conditions.",
                  tags: ["Waterproof", "Reliable"],
                },
                {
                  image: "/home/HomeAssets(D1V1C4).jpg",
                  title: "Fire Safety",
                  description: "Meets B1 fire safety standards, providing superior fire resistance and peace of mind for your family's safety.",
                  tags: ["B1 Rated", "Safe"],
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
      <section className="py-28 bg-black relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 border-2 border-accent/30 rounded-[24px] bg-accent/10 text-white text-sm font-semibold mb-6">
              <Sparkles className="h-4 w-4" />
              Key Advantages
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
              Why Choose <span className="text-accent">FiberTech</span>
            </h2>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Large Feature Card - Left Side */}
            <div className="lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-charcoal to-charcoal-light p-8 lg:p-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
              <div className="relative z-10 h-full flex flex-col">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center mb-6 shadow-lg">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">100% Timber-Free Shell</h3>
                <p className="text-white/60 text-lg mb-auto leading-relaxed">
                  Complete elimination of timber prevents rot, termites, and moisture-related degradation.
                  Advanced composite materials ensure your caravan stands the test of time.
                </p>
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-3xl font-black text-accent">0%</div>
                    <p className="text-white/50 text-sm">Water Absorption</p>
                  </div>
                  <div className="h-12 w-px bg-white/10" />
                  <div className="text-center">
                    <div className="text-3xl font-black text-accent">∞</div>
                    <p className="text-white/50 text-sm">Termite Proof</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Weight Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-gray-900 border border-gray-800 p-6 hover:border-accent/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                <Weight className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">25% Lighter</h3>
              <p className="text-gray-300 text-sm">
                Advanced composites deliver exceptional strength at significantly reduced weight.
              </p>
            </div>

            {/* Moisture Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-gray-900 border border-gray-800 p-6 hover:border-accent/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                <Droplets className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Moisture Resistant</h3>
              <p className="text-gray-300 text-sm">
                Zero water absorption ensures structural integrity in all conditions.
              </p>
            </div>

            {/* Fire Safety Card - Highlighted */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center mb-4 shadow-lg">
                <Wind className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fire Safety B1</h3>
              <p className="text-gray-300 text-sm">
                Meets strict fire safety standards for added peace of mind.
              </p>
            </div>

            {/* Chemical Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-gray-900 border border-gray-800 p-6 hover:border-accent/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                <FlaskConical className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Chemical Resistant</h3>
              <p className="text-gray-300 text-sm">
                Resists degradation from salt air and environmental pollutants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose FiberTech Section */}
      <section className="py-12 bg-black">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center mb-6">
                <Caravan className="h-8 w-8 text-accent" />
              </div>
              <span className="text-white font-semibold text-sm uppercase tracking-wide mb-4 block border-2 border-accent/30 rounded-[24px] px-4 py-2 inline-block bg-accent/10 backdrop-blur-sm">
                Why Choose FiberTech
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                Your Perfect Adventure Companion
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Experience the difference of FiberTech construction. Our advanced timber-free
                system delivers unmatched performance, reliability, and value for your Australian
                adventures. Invest in a caravan built to last.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Award className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display font-semibold text-white mb-1">
                      Premium Quality & Craftsmanship
                    </h3>
                    <p className="text-sm text-gray-300">
                      Every FiberTech caravan is built with precision engineering and premium
                      materials. Australian-made quality you can trust for years of adventures.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display font-semibold text-white mb-1">
                      Superior Value & Performance
                    </h3>
                    <p className="text-sm text-gray-300">
                      Get more for your investment with lighter weight, better fuel economy,
                      and reduced maintenance costs. FiberTech delivers exceptional value.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display font-semibold text-white mb-1">
                      Built for Your Family
                    </h3>
                    <p className="text-sm text-gray-300">
                      Create lasting memories with a caravan designed for comfort, safety, and
                      reliability. Your family deserves the best Australian adventure experience.
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
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-800/50 aspect-square">
              <Image
                src="/home/HomeHeader(D1V1C2).jpg"
                alt="FiberTech Construction"
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
            <span className="inline-block px-4 py-2 border-2 border-accent/30 rounded-[24px] bg-accent/10 text-white text-sm font-semibold mb-4">
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

