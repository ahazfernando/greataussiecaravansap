"use client";

import React, { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AustraliaMap } from "@/components/dealers/AustraliaMap";
import { NewZealandMap } from "@/components/dealers/NewZealandMap";
import { DealerCard } from "@/components/dealers/DealerCard";
import { PhoneInput } from "@/components/ui/phone-input";

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    postalCode: "",
    subject: "",
    message: "",
  });

  // Dealer locator state
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<'australia' | 'newzealand'>('australia');
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayDealers, setDisplayDealers] = useState<typeof dealers[string]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save inquiry to Firebase
      await addDoc(collection(db, 'inquiries'), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        state: formData.state,
        postalCode: formData.postalCode,
        subject: formData.subject,
        message: formData.message,
        status: 'new',
        createdAt: Timestamp.now(),
        lastUpdated: Timestamp.now(),
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        state: "",
        postalCode: "",
        subject: "",
        message: "",
      });
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
    } catch (error: any) {
      console.error('Error submitting inquiry:', error);
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Region names mapping
  const regionNames: Record<string, string> = {
    wa: "Western Australia",
    nt: "Northern Territory",
    qld: "Queensland",
    sa: "South Australia",
    nsw: "New South Wales",
    act: "Australian Capital Territory",
    vic: "Victoria",
    tas: "Tasmania",
  };

  // Sample dealer data - in a real app, this would come from a database
  const dealers: Record<string, Array<{
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    phone: string;
    email: string;
    website?: string;
    hours: string;
  }>> = {
    nsw: [
      {
        id: "1",
        name: "Sydney Caravan Centre",
        address: "123 Main Street",
        city: "Sydney",
        state: "NSW",
        phone: "(02) 9000 0000",
        email: "sydney@gac.com.au",
        website: "https://sydney.gac.com.au",
        hours: "Mon-Fri: 9am-5pm, Sat: 9am-3pm",
      },
      {
        id: "2",
        name: "RV Central – Port Macquarie",
        address: "183 Hastings River Dr",
        city: "Port Macquarie",
        state: "NSW",
        phone: "02 6584 1555",
        email: "sales@rvcentral.com.au",
        website: "https://www.rvcentral.com.au",
        hours: "Mon-Fri: 9am-5pm, Sat: 9am-3pm",
      },
    ],
    vic: [
      {
        id: "3",
        name: "Melbourne Caravan Showroom",
        address: "789 Collins Street",
        city: "Melbourne",
        state: "VIC",
        phone: "(03) 9000 0002",
        email: "melbourne@gac.com.au",
        website: "https://melbourne.gac.com.au",
        hours: "Mon-Fri: 9am-5pm, Sat: 9am-3pm",
      },
    ],
    qld: [
      {
        id: "4",
        name: "Brisbane Caravan Centre",
        address: "321 Queen Street",
        city: "Brisbane",
        state: "QLD",
        phone: "(07) 9000 0003",
        email: "brisbane@gac.com.au",
        website: "https://brisbane.gac.com.au",
        hours: "Mon-Fri: 9am-5pm, Sat: 9am-3pm",
      },
    ],
    wa: [
      {
        id: "5",
        name: "Perth Caravan World",
        address: "654 St Georges Terrace",
        city: "Perth",
        state: "WA",
        phone: "(08) 9000 0004",
        email: "perth@gac.com.au",
        hours: "Mon-Fri: 9am-5pm, Sat: 9am-3pm",
      },
    ],
    sa: [
      {
        id: "6",
        name: "Adelaide Caravan Showroom",
        address: "987 King William Street",
        city: "Adelaide",
        state: "SA",
        phone: "(08) 9000 0005",
        email: "adelaide@gac.com.au",
        hours: "Mon-Fri: 9am-5pm, Sat: 9am-3pm",
      },
    ],
    act: [],
    tas: [
      {
        id: "8",
        name: "Hobart Caravan World",
        address: "258 Elizabeth Street",
        city: "Hobart",
        state: "TAS",
        phone: "(03) 9000 0007",
        email: "hobart@gac.com.au",
        hours: "Mon-Fri: 9am-5pm, Sat: 9am-3pm",
      },
    ],
    nt: [
      {
        id: "9",
        name: "Darwin Caravan Centre",
        address: "369 Smith Street",
        city: "Darwin",
        state: "NT",
        phone: "(08) 9000 0008",
        email: "darwin@gac.com.au",
        hours: "Mon-Fri: 9am-5pm, Sat: 9am-3pm",
      },
    ],
  };

  const getDealersByRegion = (regionId: string) => {
    return dealers[regionId] || [];
  };

  const handleRegionClick = (regionId: string) => {
    if (regionId === selectedRegion) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedRegion(null);
        setDisplayDealers([]);
        setIsAnimating(false);
      }, 300);
    } else {
      setSelectedRegion(regionId);
      setDisplayDealers(getDealersByRegion(regionId));
    }
  };

  const handleCountryChange = (country: 'australia' | 'newzealand') => {
    setSelectedCountry(country);
    setSelectedRegion(null);
    setDisplayDealers([]);
    setIsAnimating(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Factory",
      content: "88 – 106 Kyabram Street\nCoolaroo, VIC 3048",
      action: "Get Directions",
      href: "https://www.google.com/maps/search/?api=1&query=88-106+Kyabram+Street+Coolaroo+VIC+3048",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "03 9308 8511",
      action: "Call Now",
      href: "tel:+61393088511",
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "info@greataussiecaravans.com.au",
      action: "Send Email",
      href: "mailto:info@greataussiecaravans.com.au",
    },
    {
      icon: Clock,
      title: "Opening Hours",
      content: "7.00am to 3.00pm (Monday to Friday)",
      action: null,
      href: null,
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-black py-16 md:py-20 overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 text-white border-transparent bg-transparent">
              Get in Touch
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Contact <span className="text-accent">Us</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions about our caravans? Want to book an inspection? We'd love to hear from you. Get in touch and our friendly team will help you find your perfect adventure companion.
            </p>
          </div>
        </div>
      </section>

      {/* Dealer Locator Section */}
      {/*
      <section className="section-padding bg-black">
        <div className="container-wide">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Find Your <span className="text-accent">Great Aussie</span> Dealer
            </h2>
            <p className="text-white mb-6 max-w-2xl mx-auto">
              Click on a region to discover authorized caravan dealers near you.
            </p>
            
            <div className="flex justify-center gap-2 mb-8">
              <button
                onClick={() => handleCountryChange('australia')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCountry === 'australia'
                    ? 'bg-black text-white border-2 border-accent'
                    : 'bg-gray-900 text-gray-400 border-2 border-gray-800 hover:border-gray-700'
                }`}
              >
                Australia
              </button>
              <button
                onClick={() => handleCountryChange('newzealand')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCountry === 'newzealand'
                    ? 'bg-black text-white border-2 border-accent'
                    : 'bg-gray-900 text-gray-400 border-2 border-gray-800 hover:border-gray-700'
                }`}
              >
                New Zealand
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 items-start">
            <div className={`col-span-12 transition-all duration-500 ${
              selectedRegion ? 'lg:col-span-6' : 'lg:col-span-12'
            }`}>
              <div className="w-full flex justify-center">
                <div className="w-full max-w-2xl">
                  {selectedCountry === 'australia' ? (
                    <AustraliaMap
                      selectedRegion={selectedRegion}
                      onRegionClick={handleRegionClick}
                    />
                  ) : (
                    <NewZealandMap
                      selectedRegion={selectedRegion}
                      onRegionClick={handleRegionClick}
                    />
                  )}
                </div>
              </div>
            </div>

            {selectedRegion && (
              <div className={`col-span-12 lg:col-span-6 ${
                isAnimating ? "animate-slide-out-right" : "animate-slide-in-right"
              }`}>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    Dealers in {regionNames[selectedRegion] || 'Selected Region'}
                  </h3>
                  <p className="text-sm text-gray-400 mt-2">
                    {displayDealers.length} {displayDealers.length === 1 ? 'dealer' : 'dealers'} in this region
                  </p>
                </div>
                {displayDealers.length > 0 ? (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {displayDealers.map((dealer, index) => (
                      <DealerCard key={dealer.id} dealer={dealer} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-black border border-gray-800 rounded-xl p-8 text-center">
                    <p className="text-white">
                      No dealers found in {regionNames[selectedRegion] || 'this region'}. Please check back soon or contact us directly.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      */}

      {/* Contact Info + Form */}
      <section className="section-padding bg-black">
        <div className="container-wide">
          <div className="grid lg:grid-cols-5 gap-12 items-stretch">
            {/* Contact Info */}
            <div className="lg:col-span-2 flex flex-col">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-300 mb-8 max-w-lg">
                Give us a call, or send us an email. Our friendly team is here to help you find the perfect caravan for your next adventure.
              </p>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-lg flex-1 flex flex-col">
                <div className="space-y-8 flex-1">
                  {contactInfo.map((item, index) => (
                    <div
                      key={item.title}
                      className="flex gap-4 opacity-0 animate-fade-up"
                      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
                        <item.icon className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-300 whitespace-pre-line leading-relaxed">{item.content}</p>
                        {item.action && item.href && (
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-sm text-accent hover:text-accent/80 hover:underline mt-3 inline-block transition-colors"
                          >
                            {item.action} →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 flex flex-col">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-8">
                Send Us a Message
              </h2>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-lg flex-1 flex flex-col">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
                    <h3 className="font-display text-xl font-bold text-white mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Your message has been sent successfully. We'll get back to you within 24 hours.
                    </p>
                    <Button variant="outline" className="border-gray-800 text-white hover:bg-gray-800" onClick={() => setIsSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Smith"
                          className="bg-gray-900 border-gray-800 text-white"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="bg-gray-900 border-gray-800 text-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-white">Phone Number</Label>
                        <PhoneInput
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={(value) => setFormData(prev => ({ ...prev, phone: value || '' }))}
                          placeholder="0400 000 000"
                          defaultCountry="AU"
                          className="bg-gray-900 border-gray-800 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-white">State</Label>
                        <select
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full h-11 px-3 rounded-lg border border-gray-800 bg-gray-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                        >
                          <option value="">Select a state...</option>
                          <option value="NSW">New South Wales</option>
                          <option value="VIC">Victoria</option>
                          <option value="QLD">Queensland</option>
                          <option value="WA">Western Australia</option>
                          <option value="SA">South Australia</option>
                          <option value="TAS">Tasmania</option>
                          <option value="NT">Northern Territory</option>
                          <option value="ACT">Australian Capital Territory</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="postalCode" className="text-white">Postal Code</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          type="text"
                          value={formData.postalCode}
                          onChange={handleChange}
                          placeholder="3000"
                          maxLength={4}
                          className="bg-gray-900 border-gray-800 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-white">Subject *</Label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full h-11 px-3 rounded-lg border border-gray-800 bg-gray-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                        >
                          <option value="">Select a subject...</option>
                          <option value="quote">Request a Quote</option>
                          <option value="inspection">Book an Inspection</option>
                          <option value="factory-tour">Request a Factory Tour</option>
                          <option value="general">General Enquiry</option>
                          <option value="service">Service & Parts</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white">Your Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about what you're looking for..."
                        rows={5}
                        className="bg-gray-900 border-gray-800 text-white"
                        required
                      />
                    </div>

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
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-black border-t border-gray-800">
        <div className="container-wide py-8">
          <div className="rounded-xl overflow-hidden h-[400px] bg-gray-900 border border-gray-800">
            <iframe
              src="https://www.google.com/maps?q=88-106+Kyabram+Street+Coolaroo+VIC+3048&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Great Aussie Caravans Location"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

