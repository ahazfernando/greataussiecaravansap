"use client";

import { useState } from "react";
import Image from "next/image";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const MODELS = ["20URER", "Gravity", "Xplora", "Tonka"] as const;

const AU_STATES = [
  "New South Wales",
  "Victoria",
  "Queensland",
  "Western Australia",
  "South Australia",
  "Tasmania",
  "Australian Capital Territory",
  "Northern Territory",
] as const;

type MayMadnessFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  postcode: string;
  state: string;
  model: string;
};

const initialFormData: MayMadnessFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  postcode: "",
  state: "",
  model: "",
};

const CARAVAN_SHOW_CARDS = [
  {
    title: "Exciting Show Packs for Adventure",
    description:
      "Amazing free giveaways for your caravan, just like when you buy at a caravan show.",
    image: "/offerlogo/showpack.png",
    imageFit: "cover" as const,
  },
  {
    title: "Free Cruisemaster Air Suspension Upgrade",
    description:
      "Free Cruisemaster XT air suspension upgrades on all Gravity and Xplora models.",
    image: "/offerlogo/air-bag-1.jpg",
    imageFit: "cover" as const,
  },
  {
    title: "AllyTech Upgrade",
    description:
      "Upgrade your van to Allytech for another $7,000 AUD from timber.",
    image: "/constructiontypes/allytechl.png",
    imageFit: "contain" as const,
  },
] as const;

export default function SalePage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<MayMadnessFormData>(initialFormData);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSelectChange = (name: keyof MayMadnessFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.postcode ||
      !formData.state ||
      !formData.model
    ) {
      toast({
        title: "Missing Information",
        description: "Please complete all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(db, "mayMadnessRequests"), {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        postcode: formData.postcode.trim(),
        state: formData.state,
        model: formData.model,
        status: "new",
        createdAt: Timestamp.now(),
        lastUpdated: Timestamp.now(),
      });

      setIsSubmitted(true);
      setFormData(initialFormData);
      toast({
        title: "Submitted Successfully",
        description: "Thanks! Our team will contact you shortly with your May Madness offer.",
      });
    } catch (error) {
      console.error("Error submitting May Madness form:", error);
      toast({
        title: "Submission Failed",
        description: "Could not submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="relative overflow-hidden bg-black pt-24 pb-12 md:min-h-[88vh] md:pt-28 md:pb-16">
        <div className="absolute inset-0">
          <Image
            src="/offerlogo/Can_i_have_a_realitic_202604302123.jpeg"
            alt="May Madness hero background"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/70" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/55 to-transparent sm:h-32" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid items-center gap-8 lg:min-h-[72vh] lg:grid-cols-[1.45fr_0.9fr] lg:gap-12">
            <div>
              <h1 className="font-display mb-4 max-w-none text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-6xl">
                Experience the <br />
                <span className="italic font-medium">GreatAussie Difference</span> <br />
                Unbeatable <span className="italic font-medium">Offers</span> this Month
              </h1>
              <p className="mb-8 max-w-none text-base text-gray-300 md:text-lg">
                Own your caravan with the <span className="italic font-medium">Great Aussie Difference</span> & enjoy
                unbeatable offers this month. Explore <span className="italic font-medium">selected models</span>,
                lock in your deal, and let our team take care of everything for you.
              </p>
              <div className="flex flex-wrap items-center gap-3 lg:gap-4">
                <Button
                  variant="accent"
                  size="lg"
                  className="h-auto min-h-11 min-w-[170px] rounded-full px-7 py-2.5 text-sm font-semibold text-[#140B00] hover:text-[#140B00] lg:min-w-[220px] lg:px-10 lg:py-6 lg:text-base"
                  asChild
                >
                  <a href="#may-madness-form">Make an Inquiry</a>
                </Button>
                <Button
                  variant="heroOutline"
                  size="lg"
                  className="h-auto min-h-11 min-w-[170px] rounded-full px-7 py-2.5 text-sm font-semibold hover:text-[#140B00] lg:min-w-[220px] lg:px-10 lg:py-6 lg:text-base"
                  asChild
                >
                  <a href="/contact">Contact Us</a>
                </Button>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="relative h-[220px] w-full max-w-[380px] sm:h-[280px] sm:max-w-[460px] md:h-[340px] md:max-w-[520px]">
                <Image
                  src="/offerlogo/GreatAussieCaravans.png"
                  alt="Great Aussie Caravans May Madness"
                  fill
                  priority
                  className="object-contain object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 inline-flex w-full items-center justify-center gap-2 text-xs font-medium tracking-wide text-gray-300">
              Caravan Show Highlights
              <ArrowRight className="h-3.5 w-3.5" />
            </p>
            <h2 className="font-display text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              It&apos;s a <span className="text-accent italic font-medium">Caravan Show</span> Everyday
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-300 md:text-base">
              Explore May Madness highlights crafted to make every adventure smarter, smoother, and more exciting.
            </p>

            <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {CARAVAN_SHOW_CARDS.map((card) => (
                <article
                  key={card.title}
                  className="group relative min-h-[460px] overflow-hidden rounded-[30px] border border-white/20 bg-gradient-to-b from-[#1f2028] via-[#181a24] to-[#13141c] shadow-[0_20px_45px_rgba(0,0,0,0.45)] md:min-h-[500px]"
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-x-0 top-0 h-[74%] overflow-hidden",
                      card.imageFit === "contain" ? "bg-[#161720]" : "bg-[#1a1b22]"
                    )}
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={cn(
                        "transition-transform duration-500 group-hover:scale-[1.03]",
                        card.imageFit === "contain"
                          ? "object-contain object-center p-6 sm:p-10"
                          : "object-cover object-center"
                      )}
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#13141c] via-[#13141c]/90 via-25% to-transparent"
                      aria-hidden
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-[#181a24] to-transparent opacity-80"
                      aria-hidden
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-55% to-[#13141c]" />

                  <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-7 pt-20">
                    <h3 className="font-display whitespace-pre-line text-2xl font-bold leading-tight text-white md:text-[30px]">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-gray-300">{card.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="may-madness-form" className="relative overflow-hidden bg-black py-16 md:py-20">
        <div className="absolute inset-0">
          <Image
            src="/Xplora/GreatAussieDealerLightMode.jpeg"
            alt="Great Aussie Caravans May Madness background"
            fill
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black/90" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8">
          <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
            <div className="pt-1">
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-gray-300">
                Start your journey
                <ArrowRight className="h-3.5 w-3.5" />
              </p>
              <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                WANT MORE INFO ABOUT OUR <span className="text-accent">BEST MAY DEALS?</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm text-gray-300 md:text-base">
                Join hands with adventurers across Australia and get personalized guidance on the right caravan and offer for you.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  className="h-12 rounded-full bg-white px-7 text-sm font-semibold text-black hover:bg-white/90"
                  asChild
                >
                  <a href="/dealers">
                    Find a Dealer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 rounded-full border-white/80 bg-transparent px-7 text-sm font-semibold text-white hover:bg-white/10"
                  asChild
                >
                  <a href="/contact">Contact Us</a>
                </Button>
              </div>
            </div>

            <div>
              {isSubmitted ? (
                <div className="rounded-2xl border border-accent/30 bg-gray-900/80 p-6 backdrop-blur-[1px]">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                    <CheckCircle2 className="h-6 w-6 text-accent" />
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-white">Thanks for your interest!</h2>
                  <p className="mb-5 text-sm text-gray-300">
                    Your May Madness request has been received. We will be in touch soon.
                  </p>
                  <Button variant="accent" className="hover:text-[#140B00]" onClick={() => setIsSubmitted(false)}>
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5 md:p-6 backdrop-blur-[1px]">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white">
                        First Name <span className="text-accent">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={onInputChange}
                        required
                        className="border-gray-800 bg-black/50 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white">
                        Last Name <span className="text-accent">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={onInputChange}
                        required
                        className="border-gray-800 bg-black/50 text-white"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="email" className="text-white">
                        Email <span className="text-accent">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={onInputChange}
                        required
                        placeholder="your@email.com"
                        className="border-gray-800 bg-black/50 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber" className="text-white">
                        Contact Number <span className="text-accent">*</span>
                      </Label>
                      <PhoneInput
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(value) => setFormData((prev) => ({ ...prev, phoneNumber: value || "" }))}
                        defaultCountry="AU"
                        international
                        placeholder="Enter phone number"
                        required
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">
                        Model <span className="text-accent">*</span>
                      </Label>
                      <Select value={formData.model} onValueChange={(value) => onSelectChange("model", value)}>
                        <SelectTrigger className="border-gray-800 bg-black/50 text-white">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent className="border-gray-800 bg-gray-900 text-white">
                          {MODELS.map((model) => (
                            <SelectItem
                              key={model}
                              value={model}
                              className="data-[highlighted]:text-[#140B00] focus:text-[#140B00]"
                            >
                              {model}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">
                        State <span className="text-accent">*</span>
                      </Label>
                      <Select value={formData.state} onValueChange={(value) => onSelectChange("state", value)}>
                        <SelectTrigger className="border-gray-800 bg-black/50 text-white">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent className="border-gray-800 bg-gray-900 text-white">
                          {AU_STATES.map((state) => (
                            <SelectItem
                              key={state}
                              value={state}
                              className="data-[highlighted]:text-[#140B00] focus:text-[#140B00]"
                            >
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postcode" className="text-white">
                        Postcode <span className="text-accent">*</span>
                      </Label>
                      <Input
                        id="postcode"
                        name="postcode"
                        value={formData.postcode}
                        onChange={onInputChange}
                        maxLength={4}
                        placeholder="3000"
                        required
                        className="border-gray-800 bg-black/50 text-white"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="accent"
                    className="mt-5 w-full text-[#140B00] hover:text-[#140B00]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Get May Madness Updates"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

