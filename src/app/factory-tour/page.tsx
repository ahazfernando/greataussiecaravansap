"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { PremiumHeroCarousel } from "@/components/caravans/PremiumHeroCarousel";
import {
  Factory,
  Wrench,
  Shield,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Eye,
  Heart,
  Star,
  Play,
  Camera,
  Hammer,
  FileCheck,
  TrendingUp,
  Clock,
  Target,
  Layers,
  Caravan,
} from "lucide-react";

export default function FactoryTourPage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ left: number; top: number; delay: number; duration: number }>>([]);
  const [countedValues, setCountedValues] = useState({ years: 0, caravans: 0, satisfaction: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    // Generate particles only on client side
    const generatedParticles = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
    }));
    setParticles(generatedParticles);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for counting animation
  useEffect(() => {
    if (!statsRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            // Animate years: 0 to 10
            const yearsDuration = 2000;
            const yearsSteps = 60;
            const yearsIncrement = 10 / yearsSteps;
            let yearsCurrent = 0;
            const yearsInterval = setInterval(() => {
              yearsCurrent += yearsIncrement;
              if (yearsCurrent >= 10) {
                yearsCurrent = 10;
                clearInterval(yearsInterval);
              }
              setCountedValues((prev) => ({ ...prev, years: Math.floor(yearsCurrent) }));
            }, yearsDuration / yearsSteps);

            // Animate caravans: 0 to 4000
            const caravansDuration = 2500;
            const caravansSteps = 80;
            const caravansIncrement = 4000 / caravansSteps;
            let caravansCurrent = 0;
            const caravansInterval = setInterval(() => {
              caravansCurrent += caravansIncrement;
              if (caravansCurrent >= 4000) {
                caravansCurrent = 4000;
                clearInterval(caravansInterval);
              }
              setCountedValues((prev) => ({ ...prev, caravans: Math.floor(caravansCurrent) }));
            }, caravansDuration / caravansSteps);

            // Animate satisfaction: 0 to 100
            const satisfactionDuration = 2000;
            const satisfactionSteps = 100;
            const satisfactionIncrement = 100 / satisfactionSteps;
            let satisfactionCurrent = 0;
            const satisfactionInterval = setInterval(() => {
              satisfactionCurrent += satisfactionIncrement;
              if (satisfactionCurrent >= 100) {
                satisfactionCurrent = 100;
                clearInterval(satisfactionInterval);
              }
              setCountedValues((prev) => ({ ...prev, satisfaction: Math.floor(satisfactionCurrent) }));
            }, satisfactionDuration / satisfactionSteps);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, [hasAnimated]);

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

  const manufacturingSteps = [
    {
      icon: Layers,
      title: "Flooring",
      description: "Precision-laid flooring provides a solid foundation, ensuring durability and stability for the entire structure.",
      image: "/home/HomeAssets(D1V1C4).jpg",
    },
    {
      icon: Hammer,
      title: "Frame Assembly & Building",
      description: "Expert craftsmen assemble the structural frame with meticulous attention to detail, creating a robust skeleton.",
      image: "/constructiontypes/woodenconstruction.jpg",
    },
    {
      icon: Zap,
      title: "Electrical & Wiring",
      description: "Comprehensive electrical systems are installed and tested to ensure safety and reliability for all your power needs.",
      image: "/home/Homeassets(D1V1C3).jpg",
    },
    {
      icon: Shield,
      title: "Insulation & Cladding",
      description: "Advanced insulation and weather-resistant cladding are applied to protect against the harsh Australian elements.",
      image: "/home/HomeAssets(D1V1C2).jpg",
    },
    {
      icon: Award,
      title: "External & Internal Finishing",
      description: "Premium finishes are applied inside and out, combining aesthetic appeal with functional excellence.",
      image: "/home/constructionteams2.jpg",
    },
    {
      icon: CheckCircle2,
      title: "Quality Inspection & Testing",
      description: "Rigorous final inspections and testing ensure every caravan meets our exacting standards before handover.",
      image: "/home/GAC-SET-147-min.jpg",
    },
  ];

  const stats = [
    {
      value: "100%",
      label: "Australian Made",
      icon: Factory,
      type: "static" as const,
    },
    {
      value: countedValues.years,
      label: "Years Experience",
      icon: TrendingUp,
      type: "count" as const,
      suffix: "+",
    },
    {
      value: countedValues.caravans,
      label: "Caravans Built",
      icon: Caravan,
      type: "count" as const,
      suffix: "+",
    },
    {
      value: countedValues.satisfaction,
      label: "Customer Satisfaction",
      icon: Heart,
      type: "count" as const,
      suffix: "%",
    },
  ];

  return (
    <Layout>
      {/* Dynamic Hero Section with Parallax */}
      <section className="relative py-12 md:py-16 lg:py-24 overflow-hidden min-h-[600px] md:min-h-[80vh] flex items-center justify-center">
        {/* Animated Background Layers */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-[url('/home/constructionteams2.jpg')] bg-cover bg-center"
            style={{
              transform: `translateY(${scrollY * 0.5}px) scale(1.1)`,
              transition: "transform 0.1s ease-out",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)]" />
        </div>

        {/* Floating Particles Effect - Only render on client to avoid hydration mismatch */}
        {isMounted && (
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-accent/30 rounded-full animate-pulse"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Hero Content */}
        <div className="container-wide relative z-10 text-center px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 md:mb-6 bg-accent/20 text-accent border-accent/30 text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2">
              <Factory className="h-3 w-3 md:h-4 md:w-4 mr-2" />
              Behind the Scenes
            </Badge>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight px-2">
              <span className="block md:inline">
                Experience Our{" "}
                <span className="text-accent relative inline-block">
                  Manufacturing Excellence
                  <span className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-0.5 md:h-1 bg-accent/30 transform -skew-x-12" />
                </span>
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
              Step inside our state-of-the-art Australian facility and discover how we craft
              premium caravans with precision, passion, and unwavering commitment to quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-2">
              <Button variant="hero" size="lg" className="text-sm md:text-base" asChild>
                <Link href="#manufacturing">
                  Explore the Process
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" className="border-white/20 text-white hover:bg-white/10 text-sm md:text-base">
                <Play className="mr-2 h-4 w-4" />
                Watch Video Tour
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-black border-y border-gray-800">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center opacity-0 animate-fade-up"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-accent" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.type === "static"
                    ? stat.value
                    : `${stat.value}${stat.suffix || ""}`}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Process - Interactive Timeline */}
      <section id="manufacturing" className="section-padding bg-black relative overflow-hidden" ref={sectionRef}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        </div>

        <div className="container-wide relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/30">
              <Sparkles className="h-4 w-4 mr-2" />
              Our Process
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Precise Australian <br />
              <span className="text-accent">Manufacturing Journey</span>
            </h2>
            <p className="text-lg text-gray-300">
              Every caravan follows a meticulous 5-stage process, ensuring consistent quality
              and structural integrity from start to finish.
            </p>
          </div>

          {/* Interactive Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent/50 to-accent transform -translate-x-1/2" />

            {/* Steps */}
            <div className="space-y-24 lg:space-y-32">
              {manufacturingSteps.map((step, index) => {
                const isEven = index % 2 === 0;
                const isActive = activeStep === index;

                return (
                  <div
                    key={index}
                    className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${isEven ? "lg:flex-row-reverse" : ""
                      }`}
                    onMouseEnter={() => setActiveStep(index)}
                  >
                    {/* Step Number */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${isActive
                          ? "bg-accent border-accent scale-110 shadow-lg shadow-accent/50"
                          : "bg-gray-900 border-gray-800"
                          }`}
                      >
                        <step.icon
                          className={`h-10 w-10 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-400"
                            }`}
                        />
                      </div>
                      <div className="absolute -z-10 inset-0 bg-accent/20 blur-2xl rounded-full scale-150 opacity-0 transition-opacity duration-300" style={{ opacity: isActive ? 1 : 0 }} />
                    </div>

                    {/* Content Card */}
                    <div
                      className={`flex-1 bg-gray-900 border-2 rounded-3xl overflow-hidden transition-all duration-300 ${isActive ? "border-accent/50 shadow-xl shadow-accent/20 scale-105" : "border-gray-800"
                        }`}
                    >
                      <div className="grid md:grid-cols-2 gap-0">
                        {/* Text Content */}
                        <div className="p-6 lg:p-8">
                          <div className="text-accent text-sm font-semibold mb-2">Step {index + 1}</div>
                          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                            {step.title}
                          </h3>
                          <p className="text-gray-300 leading-relaxed text-sm md:text-base">{step.description}</p>
                        </div>

                        {/* Image */}
                        <div className="relative h-48 md:h-full min-h-[220px]">
                          <Image
                            src={step.image}
                            alt={step.title}
                            fill
                            className={`object-cover transition-transform duration-500 ${isActive ? "scale-110" : "scale-100"
                              }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Showcase */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            {/* Image Side */}
            <div className="relative">
              <div className="relative h-full min-h-[500px] rounded-3xl overflow-hidden group">
                <Image
                  src="/home/constructionteams2.jpg"
                  alt="Craftsmanship"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center">
                      <Camera className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold">Expert Craftsmanship</div>
                      <div className="text-sm text-gray-300">10+ Years of Excellence</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="flex flex-col justify-center">
              <Badge className="mb-6 bg-accent/10 text-accent border-accent/30 w-fit px-3 py-1.5">
                <Award className="h-4 w-4 mr-2" />
                Quality First
              </Badge>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                Where{" "}
                <span className="text-accent">Art Meets</span> Engineering
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Our master craftsmen combine traditional techniques with cutting-edge technology
                to create caravans that are not just built, but meticulously crafted. Every weld,
                every panel, every detail is executed with precision and passion.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Target, title: "Precision Engineering", desc: "Every component is measured, tested, and perfected" },
                  { icon: FileCheck, title: "Quality Assurance", desc: "Multi-stage inspections ensure flawless results" },
                  { icon: Users, title: "Expert Team", desc: "Skilled artisans with decades of combined experience" },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className="flex gap-4 opacity-0 animate-fade-up"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-7 w-7 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="section-padding bg-black">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/30">
              <Shield className="h-4 w-4 mr-2" />
              Quality Standards
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Built to{" "}
              <span className="text-accent">Exceed</span> Expectations
            </h2>
            <p className="text-lg text-gray-300">
              Our rigorous quality control process ensures every caravan meets the highest
              standards before leaving our facility.
            </p>
          </div>

          {/* Quality Grid */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Eye,
                title: "Visual Inspection",
                description: "Every surface, joint, and finish is meticulously examined for perfection.",
                color: "from-blue-500/20 to-blue-600/10",
              },
              {
                icon: Zap,
                title: "Performance Testing",
                description: "Electrical systems, plumbing, and appliances are tested under real-world conditions.",
                color: "from-accent/20 to-accent/10",
              },
              {
                icon: Hammer,
                title: "Durability Testing",
                description: "Structural integrity and material quality are verified through comprehensive testing.",
                color: "from-purple-500/20 to-purple-600/10",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="group relative bg-gradient-to-br from-gray-900 to-gray-950 border-2 border-gray-800 rounded-3xl p-8 hover:border-accent/50 transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl`} />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <item.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Our Models - Premium Hero Carousel */}
      <section className="relative bg-black">
        <PremiumHeroCarousel models={featuredModels.filter(model => model.name !== "Gravity" && model.name !== "Striker")} />
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-black border-t border-gray-800">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 border border-accent/30 mb-8">
              <Factory className="h-10 w-10 text-accent" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Experience the{" "}
              <span className="text-accent">Great Aussie</span> Difference
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              From our state-of-the-art manufacturing facility to your next adventure,
              we're committed to delivering excellence in every caravan we build.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild>
                <Link href="/caravans">
                  Browse Our Models
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-gray-800 text-white hover:bg-gray-900 hover:border-accent" asChild>
                <Link href="/contact">
                  Book a Factory Tour
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

