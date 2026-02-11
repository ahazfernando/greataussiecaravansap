"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CheckCircle2, FileText, ArrowRight, Shield } from "lucide-react";

export default function GetQuotePage() {
  const { toast } = useToast();
  const [scrollY, setScrollY] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [formData, setFormData] = useState({
    caravanType: "",
    floorplan: "",
    firstName: "",
    lastName: "",
    email: "",
    postalCode: "",
    state: "",
    country: "Australia",
    phoneCode: "+61",
    phone: "",
    agreeToTerms: false,
  });

  // Caravan types based on available models
  const caravanTypes = [
    { value: "striker", label: "Striker" },
    { value: "20urer", label: "20URER" },
    { value: "20urer-lite", label: "20URER LITE" },
    { value: "gravity", label: "Gravity" },
    { value: "xplora", label: "Xplora" },
    { value: "tonka", label: "Tonka" },
  ];


  // Floorplans (common layouts)
  const floorplans = [
    { value: "single-bed", label: "Single Bed" },
    { value: "double-bed", label: "Double Bed" },
    { value: "bunks", label: "Bunks" },
    { value: "island-bed", label: "Island Bed" },
    { value: "triple-bunk", label: "Triple Bunk" },
    { value: "queen-bed", label: "Queen Bed" },
  ];

  // Australian States
  const australianStates = [
    { value: "NSW", label: "New South Wales" },
    { value: "VIC", label: "Victoria" },
    { value: "QLD", label: "Queensland" },
    { value: "WA", label: "Western Australia" },
    { value: "SA", label: "South Australia" },
    { value: "TAS", label: "Tasmania" },
    { value: "ACT", label: "Australian Capital Territory" },
    { value: "NT", label: "Northern Territory" },
  ];

  // Country codes for phone numbers
  const countryCodes = [
    { value: "+61", label: "Australia (+61)", flag: "🇦🇺" },
    { value: "+64", label: "New Zealand (+64)", flag: "🇳🇿" },
    { value: "+1", label: "USA/Canada (+1)", flag: "🇺🇸" },
    { value: "+44", label: "United Kingdom (+44)", flag: "🇬🇧" },
    { value: "+27", label: "South Africa (+27)", flag: "🇿🇦" },
    { value: "+65", label: "Singapore (+65)", flag: "🇸🇬" },
    { value: "+60", label: "Malaysia (+60)", flag: "🇲🇾" },
    { value: "+62", label: "Indonesia (+62)", flag: "🇮🇩" },
    { value: "+66", label: "Thailand (+66)", flag: "🇹🇭" },
    { value: "+84", label: "Vietnam (+84)", flag: "🇻🇳" },
    { value: "+63", label: "Philippines (+63)", flag: "🇵🇭" },
    { value: "+86", label: "China (+86)", flag: "🇨🇳" },
    { value: "+81", label: "Japan (+81)", flag: "🇯🇵" },
    { value: "+82", label: "South Korea (+82)", flag: "🇰🇷" },
    { value: "+91", label: "India (+91)", flag: "🇮🇳" },
    { value: "+971", label: "UAE (+971)", flag: "🇦🇪" },
    { value: "+49", label: "Germany (+49)", flag: "🇩🇪" },
    { value: "+33", label: "France (+33)", flag: "🇫🇷" },
    { value: "+39", label: "Italy (+39)", flag: "🇮🇹" },
    { value: "+34", label: "Spain (+34)", flag: "🇪🇸" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.caravanType || !formData.floorplan || !formData.firstName || !formData.lastName || !formData.email || !formData.postalCode || !formData.state || !formData.country) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the Terms and Conditions to continue.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Save quote request to Firebase
      await addDoc(collection(db, 'quoteRequests'), {
        caravanType: formData.caravanType,
        floorplan: formData.floorplan,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phoneCode && formData.phone ? `${formData.phoneCode} ${formData.phone}` : formData.phone || "",
        phoneCode: formData.phoneCode,
        postalCode: formData.postalCode,
        state: formData.state,
        country: formData.country,
        status: 'new',
        createdAt: Timestamp.now(),
        lastUpdated: Timestamp.now(),
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        caravanType: "",
        floorplan: "",
        firstName: "",
        lastName: "",
        email: "",
        postalCode: "",
        state: "",
        country: "Australia",
        phoneCode: "+61",
        phone: "",
        agreeToTerms: false,
      });
      toast({
        title: "Quote Request Submitted!",
        description: "Your nearest dealer will contact you soon with a price quote.",
      });
    } catch (error: any) {
      console.error('Error submitting quote request:', error);
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      {/* Hero Section with Dynamic Background */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background Layers */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-[url('/home/constructionteams2.jpg')] bg-cover bg-center"
            style={{
              transform: `translateY(${scrollY * 0.5}px) scale(1.1)`,
              transition: "transform 0.1s ease-out",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)]" />
        </div>

        <div className="container-wide relative z-10 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 text-sm px-4 py-2">
              <FileText className="h-4 w-4 mr-2" />
              Get a Quote
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Request a{" "}
              <span className="text-accent relative inline-block">
                Quote
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-accent/30 transform -skew-x-12" />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Get a local price quote on the Great Aussie Caravan model you love directly from your nearest dealer. 
              Family, friends and worry-free fun are closer than you think.
            </p>
          </div>

          {/* Form Card */}
          <div className="max-w-2xl mx-auto">
            {isSubmitted ? (
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 border-2 border-gray-800 rounded-3xl p-8 md:p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 border-2 border-accent/30 mb-6">
                  <CheckCircle2 className="h-10 w-10 text-accent" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                  Quote Request Submitted!
                </h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Thank you for your interest. Your nearest dealer will contact you within 24 hours 
                  with a personalized price quote for your selected caravan model.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="accent" size="lg" asChild>
                    <Link href="/caravans">
                      Browse Models
                      <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-gray-800 text-white hover:bg-gray-900 hover:border-accent"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Request Another Quote
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 border-2 border-gray-800 rounded-3xl p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Caravan Type */}
                  <div className="space-y-2">
                    <Label htmlFor="caravanType" className="text-white">
                      Caravan Type <span className="text-accent">*</span>
                    </Label>
                    <Select
                      value={formData.caravanType}
                      onValueChange={(value) => handleSelectChange("caravanType", value)}
                    >
                      <SelectTrigger className="w-full h-11 border-gray-800 bg-gray-900 text-white focus:ring-accent focus:border-accent">
                        <SelectValue placeholder="Select a caravan type..." />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800 text-white">
                        {caravanTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value} className="focus:bg-gray-800 focus:text-white">
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Floorplan */}
                  <div className="space-y-2">
                    <Label htmlFor="floorplan" className="text-white">
                      Floorplan <span className="text-accent">*</span>
                    </Label>
                    <Select
                      value={formData.floorplan}
                      onValueChange={(value) => handleSelectChange("floorplan", value)}
                    >
                      <SelectTrigger className="w-full h-11 border-gray-800 bg-gray-900 text-white focus:ring-accent focus:border-accent">
                        <SelectValue placeholder="Select a floorplan..." />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800 text-white">
                        {floorplans.map((plan) => (
                          <SelectItem key={plan.value} value={plan.value} className="focus:bg-gray-800 focus:text-white">
                            {plan.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Name Fields */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white">
                        First Name <span className="text-accent">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        required
                        className="bg-gray-900 border-gray-800 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white">
                        Last Name <span className="text-accent">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Smith"
                        required
                        className="bg-gray-900 border-gray-800 text-white"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email <span className="text-accent">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="bg-gray-900 border-gray-800 text-white"
                    />
                  </div>

                  {/* Phone (Optional) */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">
                      Phone Number
                    </Label>
                    <div className="flex gap-2">
                      <Select
                        value={formData.phoneCode}
                        onValueChange={(value) => handleSelectChange("phoneCode", value)}
                      >
                        <SelectTrigger className="w-32 border-gray-800 bg-gray-900 text-white focus:ring-accent focus:border-accent">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-800 text-white max-h-[300px]">
                          {countryCodes.map((code) => (
                            <SelectItem key={code.value} value={code.value} className="focus:bg-gray-800 focus:text-white">
                              <span className="flex items-center gap-2">
                                <span>{code.flag}</span>
                                <span>{code.value}</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="0400 000 000"
                        className="flex-1 bg-gray-900 border-gray-800 text-white"
                      />
                    </div>
                  </div>

                  {/* State and Postal Code - Side by side on desktop, stacked on mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* State - Left/First on desktop, First on mobile */}
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-white">
                        State <span className="text-accent">*</span>
                      </Label>
                      <Select
                        value={formData.state}
                        onValueChange={(value) => handleSelectChange("state", value)}
                      >
                        <SelectTrigger className="w-full h-11 border-gray-800 bg-gray-900 text-white focus:ring-accent focus:border-accent">
                          <SelectValue placeholder="Select state..." />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-800 text-white">
                          {australianStates.map((state) => (
                            <SelectItem key={state.value} value={state.value} className="focus:bg-gray-800 focus:text-white">
                              {state.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Postal Code - Right/Second on desktop, Second on mobile */}
                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="text-white">
                        Postal Code <span className="text-accent">*</span>
                      </Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder="3000"
                        maxLength={4}
                        required
                        className="bg-gray-900 border-gray-800 text-white"
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-white">
                      Country <span className="text-accent">*</span>
                    </Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => handleSelectChange("country", value)}
                    >
                      <SelectTrigger className="w-full h-11 border-gray-800 bg-gray-900 text-white focus:ring-accent focus:border-accent">
                        <SelectValue placeholder="Select country..." />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800 text-white">
                        <SelectItem value="Australia" className="focus:bg-gray-800 focus:text-white">
                          Australia
                        </SelectItem>
                        <SelectItem value="New Zealand" className="focus:bg-gray-800 focus:text-white">
                          New Zealand
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start gap-3 pt-4">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      required
                      className="mt-1 w-4 h-4 rounded border-gray-800 bg-gray-900 text-accent focus:ring-2 focus:ring-accent focus:ring-offset-0"
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm text-gray-300 leading-relaxed cursor-pointer">
                      I agree to the{" "}
                      <Link href="/terms" className="text-accent hover:underline">
                        Terms and Conditions
                      </Link>{" "}
                      and have read the{" "}
                      <Link href="/privacy" className="text-accent hover:underline">
                        Privacy Policy
                      </Link>
                      . <span className="text-accent">*</span>
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Quote Request
                        <ArrowRight className="ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

