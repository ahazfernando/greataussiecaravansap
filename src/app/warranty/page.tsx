"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { COUNTRY_CODES } from "@/data/countryCodes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Shield,
  CheckCircle2,
  FileText,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  Award,
  Wrench,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Users,
  Heart,
  Star,
  Calendar,
  MapPin,
  Zap,
  Check,
  ChevronsUpDown,
} from "lucide-react";

const states = [
  { value: "NSW", label: "New South Wales" },
  { value: "VIC", label: "Victoria" },
  { value: "QLD", label: "Queensland" },
  { value: "WA", label: "Western Australia" },
  { value: "SA", label: "South Australia" },
  { value: "TAS", label: "Tasmania" },
  { value: "NT", label: "Northern Territory" },
  { value: "ACT", label: "Australian Capital Territory" },
];

export default function WarrantyPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ left: number; top: number; delay: number; duration: number }>>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const [countryCodeOpen, setCountryCodeOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("+61");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    postalCode: "",
    dealerName: "",
    chassisNumber: "",
    reason: "",
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const handleStateSelect = (currentValue: string) => {
    setFormData(prev => ({ ...prev, state: currentValue }));
    setStateOpen(false);
  };

  const handleCountryCodeSelect = (code: string) => {
    setCountryCode(code);
    setCountryCodeOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'warranty-claims'), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: `${countryCode} ${formData.phone}`,
        state: formData.state,
        postalCode: formData.postalCode,
        dealerName: formData.dealerName,
        chassisNumber: formData.chassisNumber,
        reason: formData.reason,
        status: 'new',
        createdAt: Timestamp.now(),
      });

      setIsSubmitted(true);
      toast({
        title: "Claim Submitted Successfully",
        description: "We've received your warranty claim and will be in touch shortly.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        state: "",
        postalCode: "",
        dealerName: "",
        chassisNumber: "",
        reason: "",
      });
    } catch (error) {
      console.error("Error submitting claim:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your claim. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const warrantyCoverage = [
    {
      icon: Shield,
      title: "Structural Warranty",
      duration: "10 Years",
      description: "Comprehensive coverage for frame, chassis, and structural components. Protection against manufacturing defects and material failures.",
      features: ["Aluminium frame", "Chassis integrity", "Structural welds", "Load-bearing components"],
      color: "from-blue-500/20 to-blue-600/10",
    },
    {
      icon: Wrench,
      title: "Manufacturing Warranty",
      duration: "5 Years",
      description: "Full coverage for workmanship and manufacturing defects. Ensures your caravan meets our exacting quality standards.",
      features: ["Panel integrity", "Seal quality", "Assembly workmanship", "Component installation"],
      color: "from-accent/20 to-accent/10",
    },
    {
      icon: Zap,
      title: "Electrical & Plumbing",
      duration: "2 Years",
      description: "Complete protection for all electrical systems, plumbing, and appliances installed in your caravan.",
      features: ["12V & 240V systems", "Water systems", "Appliances", "Wiring & connections"],
      color: "from-purple-500/20 to-purple-600/10",
    },
    {
      icon: Award,
      title: "Extended Protection",
      duration: "Available",
      description: "Optional extended warranty plans available for additional peace of mind beyond standard coverage periods.",
      features: ["Extended terms", "Priority service", "Additional coverage", "Transferable options"],
      color: "from-green-500/20 to-green-600/10",
    },
  ];

  const warrantySteps = [
    {
      step: 1,
      icon: FileText,
      title: "Contact Us",
      description: "Reach out to our warranty team via phone, email, or through your dealer. Have your caravan details and warranty documentation ready.",
    },
    {
      step: 2,
      icon: FileCheck,
      title: "Assessment",
      description: "Our team will review your claim and may request photos or arrange an inspection to assess the issue.",
    },
    {
      step: 3,
      icon: Wrench,
      title: "Approval & Repair",
      description: "Once approved, we'll coordinate with authorized service centers to complete repairs using genuine parts.",
    },
    {
      step: 4,
      icon: CheckCircle2,
      title: "Completion",
      description: "Your caravan is repaired and inspected. We ensure everything meets our quality standards before returning it to you.",
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
      answer: "Contact our warranty department immediately with your caravan details, warranty documentation, and a description of the issue. We'll guide you through the process and arrange for assessment and repair if covered under warranty.",
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

  return (
    <Layout>
      {/* Modern Hero Section - Split Layout */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-black pt-20">
        {/* Background with Geometric Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container-wide relative z-10 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Side - Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-8">
                <Shield className="h-4 w-4 text-accent" />
                <span className="text-accent text-sm font-semibold">Warranty Protection</span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Your Investment,{" "}
                <span className="text-accent block mt-2">Fully Protected</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Comprehensive warranty coverage that gives you confidence in every adventure.
                Built with Australian quality, backed by our commitment to your peace of mind.
              </p>

              {/* Key Points */}
              <div className="space-y-4 mb-10">
                {[
                  { icon: CheckCircle2, text: "10-Year Structural Warranty" },
                  { icon: CheckCircle2, text: "5-Year Manufacturing Coverage" },
                  { icon: CheckCircle2, text: "2-Year Electrical & Plumbing" },
                ].map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
                      <point.icon className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-gray-300">{point.text}</span>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-3xl mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Priority Support</h3>
                    <p className="text-gray-400 text-sm">Need immediate assistance?</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6">Our dedicated warranty team is standing by to help you with any concerns or claims.</p>
                <Button variant="outline" className="w-full border-gray-800 text-white hover:bg-gray-800" asChild>
                  <Link href="tel:+61393088511">Call (03) 9308 8511</Link>
                </Button>
              </div>
            </div>

            {/* Right Side - Warranty Claim Form */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative z-10">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="h-10 w-10 text-green-500" />
                      </div>
                      <h2 className="text-3xl font-display font-bold text-white mb-4">Claim Received!</h2>
                      <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                        Thank you for reaching out. Your warranty claim has been submitted successfully.
                        Our team will review the details and contact you via email or phone within 1-2 business days.
                      </p>
                      <Button variant="accent" className="w-full" onClick={() => setIsSubmitted(false)}>
                        Submit Another Claim
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-8">
                        <h2 className="text-3xl font-display font-bold text-white mb-2">Warranty Claim Form</h2>
                        <p className="text-gray-400 text-lg">Please fill in the details below to submit your claim.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-gray-300 ml-1">First Name *</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                              placeholder="John"
                              className="bg-black/40 border-gray-800 h-12 focus:border-accent/50 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-gray-300 ml-1">Last Name *</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                              placeholder="Doe"
                              className="bg-black/40 border-gray-800 h-12 focus:border-accent/50 text-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-300 ml-1">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="john.doe@example.com"
                            className="bg-black/40 border-gray-800 h-12 focus:border-accent/50 text-white"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-gray-300 ml-1">Phone Number *</Label>
                          <div className="flex gap-2">
                            <Popover open={countryCodeOpen} onOpenChange={setCountryCodeOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={countryCodeOpen}
                                  className="w-[110px] justify-between px-3 h-12 rounded-xl border-gray-800 bg-black/40 text-white hover:bg-black/60 hover:text-white"
                                >
                                  <span className="flex items-center gap-2 truncate">
                                    <span className="text-lg">
                                      {COUNTRY_CODES.find((c) => c.code === countryCode)?.flag}
                                    </span>
                                    <span className="text-gray-300">{countryCode}</span>
                                  </span>
                                  <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[300px] p-0 bg-gray-900 border-gray-800" align="start">
                                <Command className="bg-transparent">
                                  <CommandInput placeholder="Search country..." className="h-9 text-white" />
                                  <CommandList className="bg-gray-900 border-t border-gray-800">
                                    <CommandEmpty className="text-gray-400 py-2 px-4 text-sm">No country found.</CommandEmpty>
                                    <CommandGroup>
                                      {COUNTRY_CODES.map((country) => (
                                        <CommandItem
                                          key={country.name}
                                          value={country.name}
                                          onSelect={() => handleCountryCodeSelect(country.code)}
                                          className="text-white hover:bg-accent/20 cursor-pointer flex items-center"
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              countryCode === country.code
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          <span className="mr-2 text-lg">{country.flag}</span>
                                          <span className="flex-1 truncate">{country.name}</span>
                                          <span className="text-gray-400 ml-2">{country.code}</span>
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>

                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              placeholder="0400 000 000"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              className="flex-1 bg-black/40 border-gray-800 h-12 focus:border-accent/50 text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="state" className="text-gray-300 ml-1">State *</Label>
                            <Popover open={stateOpen} onOpenChange={setStateOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={stateOpen}
                                  className="w-full justify-between bg-black/40 border-gray-800 h-12 hover:bg-black/60 text-white text-left font-normal"
                                >
                                  {formData.state
                                    ? states.find((s) => s.value === formData.state)?.label
                                    : "Select state..."}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0 bg-gray-900 border-gray-800">
                                <Command className="bg-transparent">
                                  <CommandInput placeholder="Search state..." className="h-9 text-white" />
                                  <CommandList className="bg-gray-900">
                                    <CommandEmpty className="text-gray-400 py-2 px-4 text-sm">No state found.</CommandEmpty>
                                    <CommandGroup>
                                      {states.map((s) => (
                                        <CommandItem
                                          key={s.value}
                                          value={s.value}
                                          onSelect={handleStateSelect}
                                          className="text-white hover:bg-accent/20 cursor-pointer"
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              formData.state === s.value ? "opacity-100" : "opacity-0"
                                            )}
                                          />
                                          {s.label}
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="postalCode" className="text-gray-300 ml-1">Postal Code *</Label>
                            <Input
                              id="postalCode"
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleInputChange}
                              required
                              placeholder="3000"
                              className="bg-black/40 border-gray-800 h-12 focus:border-accent/50 text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="dealerName" className="text-gray-300 ml-1">Dealer Name *</Label>
                            <Input
                              id="dealerName"
                              name="dealerName"
                              value={formData.dealerName}
                              onChange={handleInputChange}
                              required
                              placeholder="Authorized Dealer"
                              className="bg-black/40 border-gray-800 h-12 focus:border-accent/50 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="chassisNumber" className="text-gray-300 ml-1">Chassis Number *</Label>
                            <Input
                              id="chassisNumber"
                              name="chassisNumber"
                              value={formData.chassisNumber}
                              onChange={handleInputChange}
                              required
                              placeholder="GAC12345678"
                              className="bg-black/40 border-gray-800 h-12 focus:border-accent/50 text-white font-mono"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="reason" className="text-gray-300 ml-1">Reason for Warranty Claim *</Label>
                          <Textarea
                            id="reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleInputChange}
                            required
                            placeholder="Please describe the issue in detail..."
                            className="bg-black/40 border-gray-800 min-h-[120px] focus:border-accent/50 text-white resize-none"
                          />
                        </div>

                        <Button
                          type="submit"
                          variant="accent"
                          className="w-full h-14 text-lg font-bold shadow-xl shadow-accent/10 mt-4 group"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                              Submitting...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Submit Warranty Claim
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                          )}
                        </Button>
                      </form>

                      <p className="text-center text-gray-500 text-xs mt-6">
                        By submitting this form, you agree to our <Link href="#" className="underline">Warranty Terms & Conditions</Link>.
                      </p>
                    </>
                  )}
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-[80px] -z-10" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-[80px] -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty Benefits */}
      <section className="py-16 bg-black border-y border-gray-800">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="text-center opacity-0 animate-fade-up"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Coverage Section */}
      <section id="coverage" className="section-padding bg-black relative overflow-hidden" ref={sectionRef}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        </div>

        <div className="container-wide relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/30">
              <Sparkles className="h-4 w-4 mr-2" />
              Coverage Details
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              What's{" "}
              <span className="text-accent">Covered</span>
            </h2>
            <p className="text-lg text-gray-300">
              Our comprehensive warranty program provides multi-tier protection for your Great Aussie Caravan,
              ensuring peace of mind for years to come.
            </p>
          </div>

          {/* Warranty Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {warrantyCoverage.map((coverage, index) => (
              <div
                key={coverage.title}
                className="group relative bg-gradient-to-br from-gray-900 to-gray-950 border-2 border-gray-800 rounded-3xl p-8 hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${coverage.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <coverage.icon className="h-8 w-8 text-accent" />
                    </div>
                    <Badge className="bg-accent/20 text-accent border-accent/30">
                      {coverage.duration}
                    </Badge>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">
                    {coverage.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {coverage.description}
                  </p>
                  <div className="space-y-2">
                    {coverage.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Claim Warranty */}
      <section className="section-padding bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container-wide relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/30">
              <FileText className="h-4 w-4 mr-2" />
              Simple Process
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              How to{" "}
              <span className="text-accent">Claim Warranty</span>
            </h2>
            <p className="text-lg text-gray-300">
              Making a warranty claim is straightforward. Follow these simple steps to get your caravan
              back to perfect condition.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent/50 to-accent transform translate-x-8" />

            <div className="space-y-12 lg:space-y-16">
              {warrantySteps.map((step, index) => (
                <div key={step.step} className="relative flex gap-8 lg:gap-12 items-start">
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl border-2 bg-gray-900 border-accent flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-accent" />
                    </div>
                    <div className="absolute -z-10 inset-0 bg-accent/20 blur-2xl rounded-full scale-150" />
                  </div>

                  <div className="flex-1 bg-gray-900 border-2 border-gray-800 rounded-3xl p-8 hover:border-accent/50 transition-all duration-300">
                    <div className="text-accent text-sm font-semibold mb-2">Step {step.step}</div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-black">
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

