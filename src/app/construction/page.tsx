import Link from "next/link";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Droplets,
  Clock,
  Weight,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Factory,
  Award,
  Users,
  FileCheck,
  Sparkles,
  FlaskConical,
  Wind,
  Leaf
} from "lucide-react";
import Image from "next/image";
import ProcessStep from "@/components/construction/ProcessStep";

export default function ConstructionPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/home/HomeHeader(D1V1C2).jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-charcoal/30" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <Badge className="mb-6 bg-accent/20 text-accent border-accent/30">
              Australian Manufacturing Excellence
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Engineered Construction Built for{" "}
              <span className="text-accent">Australian Conditions</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
              Our timber-free construction philosophy delivers superior durability,
              moisture resistance, and structural integrity. Every caravan is engineered
              with precision and built to withstand the harshest Australian environments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link href="/construction/fiber-tech">
                  Explore FiberTech Construction
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button variant="hero" size="lg" className="text-base" asChild>
                <Link href="/caravans">
                  Browse Our Caravan Models
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link href="/construction/ally-tech">
                  Explore AllyTech Construction
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Fade Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </section>

      {/* Construction Comparison Section */}
      <section className="section-padding bg-black">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-white font-medium text-sm uppercase tracking-wide mb-4 block border-2 border-accent/30 rounded-[24px] px-4 py-2 inline-block bg-accent/10 backdrop-blur-sm">
              Our Construction Methods
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Three Construction Systems
            </h2>
            <p className="text-lg text-gray-300">
              Choose the construction method that best suits your adventure style and budget.
              From traditional timber framing to advanced timber-free systems, all engineered for Australian conditions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* FiberTech Card */}
            <div className="group relative bg-gray-900 border-2 border-gray-800 hover:border-accent/50 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden rounded-2xl">
              <div className="p-8 lg:p-10">
                <div className="mb-6">
                  <Image
                    src="/constructionlogo/greataussiealleytech-1.png"
                    alt="FiberTech Construction"
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
                <Badge className="mb-4 bg-accent/10 text-accent border-accent/30">
                  100% Timber-Free
                </Badge>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                  FiberTech Construction
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Lightweight, strong, and sustainable. Our FiberTech system uses advanced
                  composite materials to deliver superior performance with reduced weight.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm text-white">25% lighter than traditional builds</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm text-white">B1 fire safety rating</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm text-white">Eco-friendly recyclable materials</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm text-white">Superior moisture resistance</span>
                  </div>
                </div>
                <Button variant="accent" className="w-full" asChild>
                  <Link href="/construction/fiber-tech">
                    View Construction Details
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* AllyTech Card */}
            <div className="group relative bg-gray-900 border-2 border-gray-800 hover:border-accent/50 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden rounded-2xl">
              <div className="p-8 lg:p-10">
                <div className="mb-6">
                  <Image
                    src="/constructionlogo/greataussiealleytech.png"
                    alt="AllyTech Construction"
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
                <Badge className="mb-4 bg-accent/10 text-accent border-accent/30">
                  Advanced Aluminium Frame
                </Badge>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                  AllyTech Construction
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Strength without compromise. Our AllyTech system features welded aluminium
                  frames with fibreglass-lined walls for maximum durability and performance.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm text-white">Welded aluminium frame construction</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm text-white">Fibreglass-lined walls</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm text-white">XPS insulation system</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm text-white">Honeycomb floor system</span>
                  </div>
                </div>
                <Button variant="accent" className="w-full" asChild>
                  <Link href="/construction/ally-tech">
                    View Construction Details
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Timber-Free Construction Matters */}
      <section className="section-padding bg-black text-white">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-white font-medium text-sm uppercase tracking-wide mb-4 block border-2 border-accent/30 rounded-[24px] px-4 py-2 inline-block bg-accent/10 backdrop-blur-sm">
              Why It Matters
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Why Timber-Free Construction Matters
            </h2>
            <p className="text-lg text-gray-300">
              Traditional timber construction can't match the durability and performance
              of our advanced timber-free systems in Australian conditions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 lg:p-8 hover:border-accent/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Droplets className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-white">Moisture Resistance</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                No timber means no rot, no swelling, and no structural degradation from moisture.
                Your caravan stays structurally sound in any climate.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-white/10 hover:border-accent/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Clock className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Longevity</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Timber-free construction extends the lifespan of your caravan significantly.
                Less maintenance, more adventures over decades.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-white/10 hover:border-accent/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Weight className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Weight Reduction</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Advanced materials mean lighter caravans without sacrificing strength.
                Better fuel economy and easier towing.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-white/10 hover:border-accent/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Structural Strength</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Engineered composite and aluminium systems provide superior structural
                integrity and load-bearing capacity compared to traditional timber frames.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Benefits Section */}
      <section className="py-28 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-30" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 border border-accent/30 text-accent rounded-full text-sm font-semibold mb-6">
              <Sparkles className="h-4 w-4" />
              Key Advantages
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              Why Choose <span className="text-accent">Timber-Free</span>
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
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">100% Timber-Free Construction</h3>
                <p className="text-white/60 text-lg mb-auto leading-relaxed">
                  Complete elimination of timber prevents rot, termites, and moisture-related degradation.
                  Both FiberTech and AllyTech systems use advanced materials that ensure your caravan stands the test of time.
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

            {/* Durability Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-gray-900 border border-gray-800 p-6 hover:border-accent/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Superior Durability</h3>
              <p className="text-gray-300 text-sm">
                Advanced materials deliver exceptional strength and longevity in all conditions.
              </p>
            </div>

            {/* Moisture Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-gray-900 border border-gray-800 p-6 hover:border-accent/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                <Droplets className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Moisture Resistant</h3>
              <p className="text-gray-300 text-sm">
                Zero water absorption ensures structural integrity in all Australian conditions.
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

            {/* Longevity Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-gray-900 border border-gray-800 p-6 hover:border-accent/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Extended Lifespan</h3>
              <p className="text-gray-300 text-sm">
                Timber-free construction extends your caravan's lifespan significantly.
              </p>
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


      {/* Trust & Quality Section */}
      <section className="section-padding bg-black">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-white font-medium text-sm uppercase tracking-wide mb-4 block border-2 border-accent/30 rounded-[24px] px-4 py-2 inline-block bg-accent/10 backdrop-blur-sm">
              Trust & Quality
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Built to Australian Standards
            </h2>
            <p className="text-lg text-gray-300">
              Our commitment to quality is backed by certifications, partnerships,
              and rigorous quality assurance processes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">
                Certifications
              </h3>
              <p className="text-sm text-gray-300">
                Meeting and exceeding Australian manufacturing standards
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto mb-4">
                <Factory className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">
                Australian Made
              </h3>
              <p className="text-sm text-gray-300">
                100% manufactured in our Australian facility
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">
                Supplier Partnerships
              </h3>
              <p className="text-sm text-gray-300">
                Working with trusted Australian suppliers
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto mb-4">
                <FileCheck className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">
                Quality Assurance
              </h3>
              <p className="text-sm text-gray-300">
                Rigorous testing and inspection at every stage
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black border-t border-gray-800 py-16 text-white">
        <div className="container-wide text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Ready to Explore Our Construction Methods?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Learn more about FiberTech or AllyTech construction and find the perfect
            system for your next adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link href="/construction/fiber-tech">
                Explore FiberTech
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-gray-800 text-white hover:bg-gray-900 hover:border-accent" asChild>
              <Link href="/construction/ally-tech">
                Explore AllyTech
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

