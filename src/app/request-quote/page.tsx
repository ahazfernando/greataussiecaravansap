"use client";

import { useState } from "react";
import Link from "next/link";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CheckCircle2, FileText, ArrowRight, Shield } from "lucide-react";

export default function RequestQuotePage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    caravanType: "",
    modelYear: "",
    floorplan: "",
    firstName: "",
    lastName: "",
    email: "",
    postalCode: "",
    country: "Australia",
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

  // Model years (current year and previous 5 years)
  const currentYear = new Date().getFullYear();
  const modelYears = Array.from({ length: 6 }, (_, i) => ({
    value: (currentYear - i).toString(),
    label: (currentYear - i).toString(),
  }));

  // Floorplans (common layouts)
  const floorplans = [
    { value: "single-bed", label: "Single Bed" },
    { value: "double-bed", label: "Double Bed" },
    { value: "bunks", label: "Bunks" },
    { value: "island-bed", label: "Island Bed" },
    { value: "triple-bunk", label: "Triple Bunk" },
    { value: "queen-bed", label: "Queen Bed" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
        modelYear: formData.modelYear,
        floorplan: formData.floorplan,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || "",
        postalCode: formData.postalCode,
        country: formData.country,
        status: 'new',
        createdAt: Timestamp.now(),
        lastUpdated: Timestamp.now(),
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        caravanType: "",
        modelYear: "",
        floorplan: "",
        firstName: "",
        lastName: "",
        email: "",
        postalCode: "",
        country: "Australia",
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
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container-wide relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/30">
              <FileText className="h-4 w-4 mr-2" />
              Get a Quote
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Request a{" "}
              <span className="text-accent">Quote</span>
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
                    <select
                      id="caravanType"
                      name="caravanType"
                      value={formData.caravanType}
                      onChange={handleChange}
                      required
                      className="w-full h-11 px-4 rounded-lg border border-gray-800 bg-gray-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                    >
                      <option value="">Select a caravan type...</option>
                      {caravanTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Model Year */}
                  <div className="space-y-2">
                    <Label htmlFor="modelYear" className="text-white">
                      Model Year <span className="text-accent">*</span>
                    </Label>
                    <select
                      id="modelYear"
                      name="modelYear"
                      value={formData.modelYear}
                      onChange={handleChange}
                      required
                      className="w-full h-11 px-4 rounded-lg border border-gray-800 bg-gray-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                    >
                      <option value="">Select model year...</option>
                      {modelYears.map((year) => (
                        <option key={year.value} value={year.value}>
                          {year.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Floorplan */}
                  <div className="space-y-2">
                    <Label htmlFor="floorplan" className="text-white">
                      Floorplan <span className="text-accent">*</span>
                    </Label>
                    <select
                      id="floorplan"
                      name="floorplan"
                      value={formData.floorplan}
                      onChange={handleChange}
                      required
                      className="w-full h-11 px-4 rounded-lg border border-gray-800 bg-gray-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                    >
                      <option value="">Select a floorplan...</option>
                      {floorplans.map((plan) => (
                        <option key={plan.value} value={plan.value}>
                          {plan.label}
                        </option>
                      ))}
                    </select>
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
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0400 000 000"
                      className="bg-gray-900 border-gray-800 text-white"
                    />
                  </div>

                  {/* Postal Code */}
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

                  {/* Country */}
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-white">
                      Country <span className="text-accent">*</span>
                    </Label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="w-full h-11 px-4 rounded-lg border border-gray-800 bg-gray-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                    >
                      <option value="Australia">Australia</option>
                      <option value="New Zealand">New Zealand</option>
                    </select>
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





