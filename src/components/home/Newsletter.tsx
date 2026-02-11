"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription here
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden rounded-3xl mx-4 mt-4 mb-4" style={{ backgroundColor: '#FAA31B' }}>
      <div className="container mx-auto px-4 py-8 md:py-10 lg:py-12 relative z-[2]">
        <div className="max-w-2xl mx-auto text-center">
          {/* Centered Content - Text and Form */}
          <div className="relative z-[3] space-y-3">
            <h2 className="font-semibold leading-tight" style={{ color: '#000000', fontSize: '32px' }}>
              Subscribe to our Newsletter for
              <br />
              Latest updates on our range of RVs
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-2">
              {/* Combined capsule-shaped container */}
              <div className="flex items-center bg-white rounded-[32px] h-[52px] overflow-hidden p-1 max-w-lg mx-auto">
                {/* Email input section */}
                <div className="relative flex-1 flex items-center h-full">
                  <Mail className="absolute left-4 w-5 h-5 text-black z-10" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-full pl-11 pr-4 bg-transparent border-0 outline-none text-black placeholder:text-black/60 focus:outline-none"
                    required
                  />
                </div>
                {/* Subscribe button inside the container */}
                <Button
                  type="submit"
                  className="h-[44px] bg-black text-white hover:bg-gray-800 rounded-[24px] px-6 sm:px-8 whitespace-nowrap flex-shrink-0"
                >
                  Subscribe
                </Button>
              </div>
            </form>
            
            <p className="text-sm" style={{ color: '#000000' }}>
              Stay ahead with the latest updates, insights, and events
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}









