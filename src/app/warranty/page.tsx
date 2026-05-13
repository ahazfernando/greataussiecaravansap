"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Shield,
  CheckCircle2,
  FileText,
  Clock,
  Phone,
  Mail,
  Sparkles,
  Award,
  Wrench,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Users,
  Heart,
  Zap,
  XCircle,
  ListChecks,
  Store,
  Send,
  ClipboardList,
  Waypoints,
  ReceiptText,
  Factory,
  Bell,
  ArrowRight,
} from "lucide-react";

export default function WarrantyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const coverageRef = useRef<HTMLDivElement>(null);
  const claimProcessSectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress: claimScrollProgress } = useScroll({
    target: claimProcessSectionRef,
    offset: ["start start", "end end"],
  });

  const claimIntroYRaw = useTransform(
    claimScrollProgress,
    [0, 1],
    prefersReducedMotion === true ? [0, 0] : [0, 56]
  );
  const claimIntroY = useSpring(claimIntroYRaw, { stiffness: 90, damping: 32, mass: 0.35 });

  const warrantyCoverage = [
    {
      icon: Shield,
      title: "Structural Warranty",
      duration: "10 Years",
      description:
        "Comprehensive coverage for frame, chassis, and structural components. Protection against manufacturing defects and material failures.",
      features: ["Aluminium frame", "Chassis integrity", "Structural welds", "Load-bearing components"],
    },
    {
      icon: Wrench,
      title: "Manufacturing Warranty",
      duration: "5 Years",
      description:
        "Full coverage for workmanship and manufacturing defects. Ensures your caravan meets our exacting quality standards.",
      features: ["Panel integrity", "Seal quality", "Assembly workmanship", "Component installation"],
    },
    {
      icon: Zap,
      title: "Electrical & Plumbing",
      duration: "2 Years",
      description:
        "Complete protection for all electrical systems, plumbing, and appliances installed in your caravan.",
      features: ["12V & 240V systems", "Water systems", "Appliances", "Wiring & connections"],
    },
    {
      icon: Award,
      title: "Extended Protection",
      duration: "Available",
      description:
        "Optional extended warranty plans available for additional peace of mind beyond standard coverage periods.",
      features: ["Extended terms", "Priority service", "Additional coverage", "Transferable options"],
    },
  ];

  const warrantySteps: {
    step: number;
    icon: typeof Store;
    title: string;
    description: string;
  }[] = [
    {
      step: 1,
      icon: Store,
      title: "Contact your dealer",
      description: "Lodge your warranty claim with the dealership where you purchased your caravan.",
    },
    {
      step: 2,
      icon: Send,
      title: "Dealer submits the claim",
      description:
        "Your dealer contacts Great Aussie Caravans Pty Ltd and submits the warranty claim on your behalf.",
    },
    {
      step: 3,
      icon: ClipboardList,
      title: "Warranty assessment",
      description:
        "We assess your claim within approximately 7 business days of receiving all required information.",
    },
    {
      step: 4,
      icon: Waypoints,
      title: "Repair assessment & approval",
      description:
        "Once approved, we decide whether your caravan returns to our factory or is repaired by an authorised third-party repairer closer to you.",
    },
    {
      step: 5,
      icon: ReceiptText,
      title: "Third-party repair process",
      description:
        "Submit a repair quote to us first — we generally review and approve it within about 7 business days.",
    },
    {
      step: 6,
      icon: Factory,
      title: "Factory repair process",
      description:
        "At the factory we reassess your caravan; allow roughly 3–5 working days before repairs begin, then we complete the work.",
    },
    {
      step: 7,
      icon: Bell,
      title: "Completion notification",
      description: "We let you know when all warranty repairs are finished.",
    },
  ];

  const faqItems = [
    {
      question: "What does the warranty cover?",
      answer: "Our warranty covers manufacturing defects, structural issues, and workmanship problems. This includes frame integrity, panel quality, electrical systems, plumbing, and installed appliances. Normal wear and tear, damage from misuse, or modifications not approved by Great Aussie Caravans are not covered.",
    },
    {
      question: "How long is the warranty valid?",
      answer: "Warranty periods vary by component: 10 years for structural elements, 5 years for manufacturing defects, and 2 years for electrical and plumbing systems. Extended warranty options are also available for additional coverage.",
    },
    {
      question: "Is the warranty transferable?",
      answer: "Yes, with extended warranty plans, the warranty can be transferred to a new owner. Standard warranties are tied to the original purchaser but may be transferable under certain conditions. Contact us for specific details.",
    },
    {
      question: "What should I do if I need to make a warranty claim?",
      answer:
        "Contact our warranty department or your dealer as soon as you notice an issue. Have your caravan details, warranty documentation, and a description of the problem ready. We will guide you through assessment and repair if the issue is covered under warranty.",
    },
    {
      question: "Are repairs done at my location?",
      answer: "Repairs are typically performed at authorized service centers or our facility. In some cases, mobile service may be available. We'll work with you to find the most convenient solution while ensuring quality workmanship.",
    },
    {
      question: "What if my caravan is out of warranty?",
      answer: "Even if your standard warranty has expired, we offer service and parts support for all Great Aussie Caravans. Extended warranty plans can also be purchased to extend coverage beyond the standard period.",
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Comprehensive Coverage",
      description: "Protection for structural, manufacturing, and system components",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Dedicated warranty team ready to assist you",
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Fast assessment and repair turnaround times",
    },
    {
      icon: Heart,
      title: "Peace of Mind",
      description: "Confidence in your investment with Australian-made quality",
    },
  ];

  const notCoveredItems = [
    "Normal wear and tear from regular use",
    "Damage caused by misuse, accidents, or overloading",
    "Modifications or repairs not approved by Great Aussie Caravans",
    "Cosmetic wear that does not affect function or safety",
    "Damage from environmental events (hail, flood, fire) unless specified in your policy",
  ];

  const eligibilityHighlights = [
    "Warranty applies from the date of purchase through an authorised Great Aussie dealer.",
    "Keep your handover documentation and service records — they may be requested during a claim.",
    "Extended plans may offer transfer options; standard coverage is primarily for the original owner — contact us for details.",
  ];

  const warrantyHeroMiniCards: {
    period: string;
    title: string;
    hint: string;
    icon: typeof Shield;
  }[] = [
    {
      period: "10 years",
      title: "Structural",
      hint: "Frame, chassis & structural welds.",
      icon: Shield,
    },
    {
      period: "5 years",
      title: "Manufacturing",
      hint: "Workmanship & factory assembly.",
      icon: Wrench,
    },
    {
      period: "2 years",
      title: "Electrical & plumbing",
      hint: "12V, 240V, water & appliances.",
      icon: Zap,
    },
    {
      period: "Optional",
      title: "Extended plans",
      hint: "Extra cover & transfer options.",
      icon: Award,
    },
  ];

  return (
    <Layout>
      <section
        id="top"
        className="relative overflow-x-visible overflow-y-hidden bg-black pt-24 pb-12 md:pb-16 lg:pb-20"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-black" />
          <div className="absolute right-0 top-0 h-[min(420px,70vw)] w-[min(420px,70vw)] rounded-full bg-accent/[0.07] blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full bg-accent/[0.05] blur-3xl" />
        </div>

        <div className="container-wide relative z-10 overflow-x-visible">
          <nav
            className="mb-8 flex flex-wrap gap-2 text-sm md:mb-10"
            aria-label="Warranty page sections"
          >
            {(
              [
                { href: "#coverage", label: "Coverage details" },
                { href: "#claim-process", label: "Claim process" },
                { href: "#eligibility", label: "Eligibility" },
                { href: "#not-covered", label: "What is not covered" },
                { href: "#faq", label: "FAQ" },
                { href: "/contact", label: "Contact us", highlight: true },
              ] as { href: string; label: string; highlight?: boolean }[]
            ).map((item) => {
              const className = cn(
                "rounded-full border px-4 py-2 transition-colors",
                item.highlight
                  ? "border-accent/50 bg-accent/10 text-accent hover:bg-accent/20"
                  : "border-white/10 bg-white/[0.04] text-gray-300 hover:border-accent/35 hover:text-white"
              );
              if (item.href.startsWith("#")) {
                return (
                  <a key={item.href} href={item.href} className={className}>
                    {item.label}
                  </a>
                );
              }
              return (
                <Link key={item.href} href={item.href} className={className}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="space-y-10 lg:space-y-14">
            {/* Top row: headline (wide) + subcopy & pill CTA — matches mockup lg:grid-cols-[2fr_1fr] */}
            <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start lg:gap-x-12 xl:gap-x-16">
              <h1 className="font-display text-[clamp(2rem,5vw,4.25rem)] font-black uppercase leading-[0.92] tracking-[-0.02em] text-white">
                <span className="block">Your investment,</span>
                <span className="block text-accent">Fully protected</span>
              </h1>
              <div className="flex max-w-md flex-col gap-6 lg:ml-auto lg:items-end lg:text-right">
                <p className="text-sm leading-relaxed text-gray-300 md:text-base">
                  Multi-tier coverage for structural integrity, manufacturing quality, and on-board
                  systems — backed by Australian build standards and a team behind every caravan we
                  deliver.
                </p>
                <Button
                  variant="accent"
                  size="lg"
                  className="h-12 shrink-0 rounded-full px-8 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_28px_rgba(249,115,22,0.45)] hover:shadow-[0_0_36px_rgba(249,115,22,0.55)]"
                  asChild
                >
                  <Link href="#coverage" className="inline-flex items-center gap-2">
                    View coverage
                    <ArrowRight className="h-4 w-4 text-black" strokeWidth={2} aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Bottom: row1 = 2×2 cards | yellow panel (tops aligned); row2 = CTA under cards only */}
            <div className="mx-auto grid w-full max-w-lg gap-8 overflow-visible lg:mx-0 lg:max-w-none lg:-mt-6 lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:items-start lg:gap-x-12 lg:gap-y-5 xl:-mt-8 xl:gap-x-14">
              <div className="grid grid-cols-2 gap-3 self-start sm:gap-4 lg:col-start-1 lg:row-start-1">
                {warrantyHeroMiniCards.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="relative z-10 min-h-[132px] overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900/95 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.04] sm:min-h-[148px] sm:p-5"
                    >
                      <div className="relative z-[1] max-w-[85%]">
                        <p className="font-display text-xl font-bold leading-none text-accent sm:text-2xl">
                          {item.period}
                        </p>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-white sm:text-sm">
                          {item.title}
                        </p>
                        <p className="mt-1.5 text-[11px] leading-snug text-gray-400 sm:text-xs">
                          {item.hint}
                        </p>
                      </div>
                      <Icon
                        className="pointer-events-none absolute -bottom-2 -right-2 h-[6.5rem] w-[6.5rem] text-accent/[0.12] sm:h-28 sm:w-28"
                        strokeWidth={1.1}
                        aria-hidden
                      />
                    </div>
                  );
                })}
              </div>

              <div
                className="relative z-[1] min-h-[min(52vw,320px)] min-w-0 rounded-[2rem] lg:col-start-2 lg:row-start-1 [clip-path:inset(-200px_0_-32px_-8rem_round_2rem)]"
                style={{ WebkitClipPath: "inset(-200px 0 -32px -8rem round 2rem)" }}
              >
                {/* Brand yellow panel — solid accent (no gradient) */}
                <div
                  className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[2rem] ring-1 ring-black/10"
                  aria-hidden
                >
                  <div className="absolute inset-0 rounded-[2rem] bg-accent">
                    <div className="absolute left-5 top-7 h-24 w-24 rounded-full border-2 border-black/[0.08]" />
                    <div className="absolute bottom-8 right-6 h-36 w-36 rounded-full border border-black/[0.06]" />
                    <div className="absolute left-[22%] top-[32%] h-16 w-16 rounded-full border border-black/[0.05]" />
                  </div>
                </div>
                {/* Caravan bleeds left past the orange frame; clip-path on parent clips the right after scale/translate */}
                <div className="pointer-events-none absolute bottom-0 left-[-1.25rem] right-0 top-0 z-[2] sm:left-[-1.75rem] lg:left-[-3rem] xl:left-[-3.75rem]">
                  <div className="relative h-full w-full origin-bottom translate-x-[9%] scale-[1.09] sm:translate-x-[11%] sm:scale-[1.1] lg:translate-x-[12%] lg:scale-[1.11]">
                    <Image
                      src="/modelexterior/TonkaModelD1V5C1%201.png"
                      alt="Great Aussie Caravans Tonka caravan"
                      fill
                      priority
                      className="object-contain object-bottom object-[90%_100%]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-start-1 lg:row-start-2">
                <Button
                  variant="accent"
                  className="h-12 w-full rounded-xl text-sm font-bold uppercase tracking-wide text-black shadow-[0_8px_28px_rgba(249,115,22,0.35)]"
                  asChild
                >
                  <Link href="#coverage">View coverage</Link>
                </Button>
              </div>
            </div>

            <div
              id="eligibility"
              className="scroll-mt-28 space-y-8 border-t border-white/10 pt-10 lg:pt-12"
            >
              <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 md:p-8">
                <div className="mb-4 flex items-center gap-2 text-accent">
                  <ListChecks className="h-5 w-5 shrink-0" aria-hidden />
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    Eligibility &amp; records
                  </span>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-300 marker:text-accent md:text-base">
                  {eligibilityHighlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  variant="outline"
                  className="h-12 border-gray-700 bg-zinc-900/60 text-white hover:bg-zinc-800"
                  asChild
                >
                  <Link href="tel:+61393088511" className="inline-flex items-center gap-2">
                    <Phone className="h-4 w-4 text-accent" aria-hidden />
                    Call (03) 9308 8511
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 border-gray-700 bg-zinc-900/60 text-white hover:bg-zinc-800"
                  asChild
                >
                  <Link
                    href="mailto:info@greataussiecaravans.com.au"
                    className="inline-flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4 text-accent" aria-hidden />
                    Email the team
                  </Link>
                </Button>
                <Button variant="ghost" className="h-12 text-gray-400 hover:text-white" asChild>
                  <Link href="/contact">Visit contact page</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* At-a-glance benefits */}
      <section className="border-y border-white/10 bg-zinc-950/80 py-10 md:py-12">
        <div className="container-wide">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex gap-4 lg:block lg:text-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 lg:mx-auto lg:mb-4">
                  <benefit.icon className="h-7 w-7 text-accent" aria-hidden />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-white">{benefit.title}</h3>
                  <p className="mt-1 text-sm leading-snug text-gray-400">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Coverage Section */}
      <section
        id="coverage"
        className="scroll-mt-28 section-padding relative overflow-hidden bg-black"
        ref={coverageRef}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="container-wide relative z-10">
          <div className="mb-14 text-center md:mb-16">
            <div className="mx-auto max-w-3xl">
              <Badge className="mb-5 border-accent/30 bg-accent/10 text-accent">
                <Sparkles className="mr-2 h-4 w-4" aria-hidden />
                Coverage details
              </Badge>
            </div>
            <h2 className="mx-auto max-w-5xl px-2 text-balance font-display text-4xl font-bold leading-[1.05] text-white sm:max-w-6xl sm:px-4 md:text-5xl lg:max-w-7xl lg:text-6xl">
              <span className="block">
                What&apos;s Covered <span className="font-semibold text-white/90">in the</span>
              </span>
              <span className="mt-2 block">
                <span className="italic text-accent">Adventure</span>{" "}
                <span className="text-white">Partner</span>{" "}
                <span className="italic text-white/90">you</span>{" "}
                <span className="text-accent">Choose</span>
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-gray-300">
              Each tier targets a different part of your caravan. Read the summary below, then speak
              with your dealer or our team if you need clarification before travel.
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-5">
            {warrantyCoverage.map((coverage) => (
              <div
                key={coverage.title}
                className="group flex h-full min-w-0 flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/95 to-black p-5 transition-colors hover:border-accent/40 md:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/35 bg-accent/10">
                    <coverage.icon className="h-6 w-6 text-accent" aria-hidden />
                  </div>
                  <Badge className="shrink-0 border-accent/30 bg-accent/15 text-[10px] text-accent sm:text-xs">
                    {coverage.duration}
                  </Badge>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold leading-snug text-white md:text-xl">
                  {coverage.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400">
                  {coverage.description}
                </p>
                <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-4">
                  {coverage.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-2 text-xs leading-snug text-gray-300 md:text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent md:h-4 md:w-4" aria-hidden />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Claim Warranty */}
      <section
        ref={claimProcessSectionRef}
        id="claim-process"
        className="scroll-mt-28 section-padding relative bg-gradient-to-b from-black via-zinc-950 to-black"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-10 top-24 h-72 w-72 animate-pulse rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-24 right-10 h-96 w-96 animate-pulse rounded-full bg-accent/[0.06] blur-3xl [animation-delay:1s]" />
        </div>

        <div className="container-wide relative z-10">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-stretch lg:gap-14 xl:max-w-7xl xl:gap-16">
            {/* Left: sticky for full height of timeline column */}
            <motion.aside
              style={{ y: claimIntroY }}
              className="relative z-[1] flex min-h-0 flex-col gap-6 will-change-transform lg:sticky lg:top-28 lg:max-w-xl"
            >
              <div className="pointer-events-none absolute -right-8 bottom-0 h-48 w-48 rounded-full bg-accent/[0.08] blur-3xl lg:h-56 lg:w-56" />
              <Badge className="relative w-fit shrink-0 border-accent/30 bg-accent/10 px-3 py-1.5 text-accent">
                <FileText className="mr-2 h-4 w-4" aria-hidden />
                Simple process
              </Badge>
              <h2 className="relative font-display text-4xl font-bold leading-tight text-white md:text-5xl">
                How to claim
                <br />
                <span className="text-accent">Your Warranty</span>
              </h2>
              <p className="relative text-base leading-relaxed text-gray-300 md:text-lg">
                Seven steps from your dealer to completion. Scroll the timeline on the right; this
                summary stays with you on larger screens.
              </p>
              <Button
                variant="outline"
                className="relative w-fit shrink-0 border-white/15 bg-white/[0.04] px-5 text-white hover:bg-white/10"
                asChild
              >
                <Link href="/contact">Contact us about a claim</Link>
              </Button>
            </motion.aside>

            {/* Right: vertical timeline + step cards */}
            <div className="relative min-w-0">
              <div
                className="pointer-events-none absolute left-[19px] top-8 bottom-8 hidden w-[3px] rounded-full bg-gradient-to-b from-accent via-orange-500 to-accent/25 md:block lg:left-[21px]"
                aria-hidden
              />
              <ol className="relative space-y-8 md:space-y-10">
                {warrantySteps.map((step) => (
                  <li key={step.step} className="relative">
                    <div className="grid gap-4 md:grid-cols-[44px_minmax(0,1fr)] md:gap-6">
                      <div className="hidden justify-center pt-1 md:flex">
                        <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-zinc-950 text-xs font-bold text-white shadow-md shadow-black/40">
                          {step.step}
                        </span>
                      </div>
                      <article
                        role="group"
                        aria-label={`Step ${step.step}: ${step.title}`}
                        className="relative min-w-0 overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-900/70 p-6 shadow-lg shadow-black/20 md:rounded-[2rem] md:p-7"
                      >
                        <div className="relative z-10 flex flex-col">
                          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent md:hidden">
                            Step {String(step.step).padStart(2, "0")}
                          </p>
                          <div className="mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-accent/35 bg-accent/10">
                            <step.icon className="h-5 w-5 text-accent" aria-hidden />
                          </div>
                          <h3 className="font-display text-lg font-bold text-white md:text-xl">
                            {step.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-gray-400 md:text-[0.9375rem]">
                            {step.description}
                          </p>
                        </div>
                        <span
                          className="pointer-events-none absolute -bottom-3 -right-1 select-none font-display text-[5.5rem] font-bold leading-[0.7] text-accent/[0.14] sm:text-[6.25rem] md:-bottom-4 md:-right-2 md:text-[7.25rem] lg:text-[8rem]"
                          aria-hidden
                        >
                          {step.step}
                        </span>
                      </article>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* What is not covered */}
      <section id="not-covered" className="scroll-mt-28 border-t border-white/10 bg-black py-16 md:py-20">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-5 border-white/15 bg-white/5 text-gray-200">
              <XCircle className="mr-2 h-4 w-4 text-gray-400" aria-hidden />
              Important
            </Badge>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              What is <span className="text-gray-400">not</span> covered
            </h2>
            <p className="mt-4 text-gray-400">
              Transparency matters. Typical exclusions include the following (refer to your written
              warranty for the full legal list).
            </p>
          </div>
          <ul className="mx-auto mt-10 max-w-2xl space-y-3 text-left">
            {notCoveredItems.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-white/10 bg-zinc-900/40 px-4 py-3 text-gray-300"
              >
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="scroll-mt-28 section-padding bg-black">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/30">
              <HelpCircle className="h-4 w-4 mr-2" />
              Common Questions
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Warranty{" "}
              <span className="text-accent">FAQ</span>
            </h2>
            <p className="text-lg text-gray-300">
              Find answers to the most frequently asked questions about our warranty program.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-900 border-2 border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent/50"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left group"
                >
                  <h3 className="font-semibold text-white text-lg pr-4 group-hover:text-accent transition-colors">
                    {faq.question}
                  </h3>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-accent flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0 group-hover:text-accent transition-colors" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-gray-800">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

