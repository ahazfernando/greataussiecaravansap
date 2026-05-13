"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Shield,
  FileText,
  Clock,
  Phone,
  Mail,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Users,
  Heart,
  XCircle,
  ListChecks,
  Store,
  Send,
  ClipboardList,
  Waypoints,
  ReceiptText,
  Factory,
  Bell,
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

  const structuralWarrantyExamples = [
    "Chassis fatigue or failure",
    "Drawbar fatigue or failure",
    "Wall separation or collapse",
    "Roof structural collapse",
    "Major structural integrity issues",
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
      answer:
        "Eligible caravans receive a 2-year general manufacturing warranty (materials and workmanship for construction and assembly by Great Aussie Caravans) and a 5-year structural warranty for major structural defects. Appliances and components not manufactured by Great Aussie Caravans are excluded — use the relevant manufacturer warranties. Normal wear and tear, misuse, or unapproved modifications are not covered.",
    },
    {
      question: "How long is the warranty valid?",
      answer:
        "Eligible caravans receive a 2-year general manufacturing warranty and a 5-year structural warranty. Both periods commence from the original date of purchase on your customer invoice. Refer to your owner's handbook for the full detailed policy.",
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
            {/* Former hero: headline, summary cards, and caravan image — replaced with text-only policy above. */}

            <div
              id="coverage"
              ref={coverageRef}
              className="scroll-mt-28 max-w-4xl space-y-8 text-gray-300 md:space-y-10"
            >
              <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.02] tracking-[-0.02em] text-white">
                Warranty Policy
              </h1>

              <div className="space-y-4 text-base leading-relaxed md:text-lg">
                <h2 className="font-display text-xl font-semibold text-white md:text-2xl">
                  Warranty Coverage
                </h2>
                <p>
                  Great Aussie Caravans Pty Ltd provides the following warranty coverage for all eligible
                  caravans:
                </p>
                <ul className="list-disc space-y-2 pl-5 marker:text-accent">
                  <li>2-Year General Manufacturing Warranty</li>
                  <li>5-Year Structural Warranty</li>
                </ul>
                <p>
                  The warranty periods commence from the original date of purchase stated on the customer
                  invoice.
                </p>
              </div>

              <div className="space-y-4 text-base leading-relaxed md:text-lg">
                <h2 className="font-display text-xl font-semibold text-white md:text-2xl">
                  2-Year General Manufacturing Warranty
                </h2>
                <p>
                  The 2-year general warranty covers defects relating to the manufacture and installation
                  of the caravan completed by Great Aussie Caravans Pty Ltd, including defects in
                  materials and workmanship.
                </p>
                <p>
                  This warranty applies only to the caravan construction and assembly carried out by Great
                  Aussie Caravans.
                </p>
              </div>

              <div className="space-y-4 text-base leading-relaxed md:text-lg">
                <h2 className="font-display text-xl font-semibold text-white md:text-2xl">
                  5-Year Structural Warranty
                </h2>
                <p>
                  The 5-year structural warranty covers major structural defects, including but not limited
                  to:
                </p>
                <ul className="list-disc space-y-2 pl-5 marker:text-accent">
                  {structuralWarrantyExamples.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 text-base leading-relaxed md:text-lg">
                <h2 className="font-display text-xl font-semibold text-white md:text-2xl">
                  Appliance and Third-Party Component Warranty
                </h2>
                <p>
                  Appliances and components not manufactured by Great Aussie Caravans Pty Ltd are excluded
                  from this warranty. Customers should contact the relevant manufacturer directly, as these
                  items may be covered under separate manufacturer warranties. Any warranty documentation
                  supplied to Great Aussie Caravans will be provided to the customer at the time of
                  delivery.
                </p>
                <p>
                  If assistance is required in lodging a claim with a component or appliance manufacturer,
                  our Customer Care Team will be happy to assist.
                </p>
              </div>

              <p className="pt-4 text-balance text-center font-display text-xl font-bold leading-snug text-accent md:text-2xl lg:text-[1.75rem] lg:leading-tight">
                <span className="italic">Detailed warranty policy</span> could be found in the{" "}
                <span className="italic">owner&apos;s handbook</span>.
              </p>
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

