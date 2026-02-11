"use client";

import { useState } from "react";
import { Layout } from "@/components/layout";
import { AustraliaMap } from "@/components/dealers/AustraliaMap";
import { MapPin, Phone, Mail, Wrench, Clock, Shield, Award, Users, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

// Sample service agent data - in a real app, this would come from a database
const serviceAgents: Record<string, Array<{
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  services?: string[];
  hours: string;
  certified: boolean;
}>> = {
  nsw: [
    {
      id: "1",
      name: "Sydney Caravan Service Centre",
      address: "123 Service Road",
      city: "Sydney",
      state: "NSW",
      phone: "(02) 9000 1000",
      email: "service.sydney@gac.com.au",
      services: ["Warranty Repairs", "General Maintenance", "Electrical", "Plumbing"],
      hours: "Mon-Fri: 8am-5pm, Sat: 9am-1pm",
      certified: true,
    },
    {
      id: "2",
      name: "Newcastle Mobile Service",
      address: "456 Workshop Lane",
      city: "Newcastle",
      state: "NSW",
      phone: "(02) 9000 1001",
      email: "service.newcastle@gac.com.au",
      services: ["Mobile Service", "Emergency Repairs", "Annual Service"],
      hours: "Mon-Fri: 8am-5pm",
      certified: true,
    },
  ],
  vic: [
    {
      id: "3",
      name: "Melbourne Caravan Service",
      address: "789 Service Street",
      city: "Melbourne",
      state: "VIC",
      phone: "(03) 9000 1002",
      email: "service.melbourne@gac.com.au",
      services: ["Full Service", "Warranty Work", "Body Repairs", "Appliance Service"],
      hours: "Mon-Fri: 8am-5pm, Sat: 9am-1pm",
      certified: true,
    },
  ],
  qld: [
    {
      id: "4",
      name: "Brisbane Service Workshop",
      address: "321 Service Avenue",
      city: "Brisbane",
      state: "QLD",
      phone: "(07) 9000 1003",
      email: "service.brisbane@gac.com.au",
      services: ["Complete Service", "Pre-Travel Inspection", "Electrical", "Gas Fitting"],
      hours: "Mon-Fri: 8am-5pm, Sat: 9am-1pm",
      certified: true,
    },
  ],
  wa: [
    {
      id: "5",
      name: "Perth Caravan Service",
      address: "654 Service Drive",
      city: "Perth",
      state: "WA",
      phone: "(08) 9000 1004",
      email: "service.perth@gac.com.au",
      services: ["General Service", "Warranty Repairs", "Mobile Service"],
      hours: "Mon-Fri: 8am-5pm",
      certified: true,
    },
  ],
  sa: [
    {
      id: "6",
      name: "Adelaide Service Centre",
      address: "987 Service Way",
      city: "Adelaide",
      state: "SA",
      phone: "(08) 9000 1005",
      email: "service.adelaide@gac.com.au",
      services: ["Full Service", "Electrical Repairs", "Plumbing", "Body Work"],
      hours: "Mon-Fri: 8am-5pm, Sat: 9am-1pm",
      certified: true,
    },
  ],
  act: [
    {
      id: "7",
      name: "Canberra Mobile Service",
      address: "147 Service Road",
      city: "Canberra",
      state: "ACT",
      phone: "(02) 9000 1006",
      email: "service.canberra@gac.com.au",
      services: ["Mobile Service", "Emergency Repairs", "Annual Service"],
      hours: "Mon-Fri: 8am-5pm",
      certified: true,
    },
  ],
  tas: [
    {
      id: "8",
      name: "Hobart Caravan Service",
      address: "258 Service Lane",
      city: "Hobart",
      state: "TAS",
      phone: "(03) 9000 1007",
      email: "service.hobart@gac.com.au",
      services: ["Complete Service", "Warranty Work", "Pre-Travel Check"],
      hours: "Mon-Fri: 8am-5pm",
      certified: true,
    },
  ],
  nt: [
    {
      id: "9",
      name: "Darwin Service Workshop",
      address: "369 Service Street",
      city: "Darwin",
      state: "NT",
      phone: "(08) 9000 1008",
      email: "service.darwin@gac.com.au",
      services: ["General Maintenance", "Emergency Service", "Mobile Repairs"],
      hours: "Mon-Fri: 8am-5pm",
      certified: true,
    },
  ],
};

export default function ServiceAgentsPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayAgents, setDisplayAgents] = useState<typeof serviceAgents[string]>([]);

  const getAgentsByRegion = (regionId: string) => {
    return serviceAgents[regionId] || [];
  };

  const handleRegionClick = (regionId: string) => {
    if (regionId === selectedRegion) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedRegion(null);
        setDisplayAgents([]);
        setIsAnimating(false);
      }, 300);
    } else {
      setSelectedRegion(regionId);
      setDisplayAgents(getAgentsByRegion(regionId));
    }
  };

  return (
    <Layout>
      {/* Map and Service Agents Section */}
      <section className="section-padding bg-black">
        <div className="container-wide">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4 border-2 border-accent/30 rounded-[24px] px-4 py-2 bg-accent/10 text-white">
              Professional Service Network
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Find Your <span className="text-accent">Service Agent</span>
            </h2>
            <p className="text-white mb-6 max-w-2xl mx-auto">
              Click on a region to discover certified service agents near you.
            </p>
          </div>

          {/* Map and Cards Layout */}
          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Map Section - Moves left when cards appear */}
            <div className={`col-span-12 transition-all duration-500 ${
              selectedRegion ? 'lg:col-span-5' : 'lg:col-span-12'
            }`}>
              <div className="w-full flex justify-center">
                <div className="w-full max-w-2xl">
                  <AustraliaMap
                    selectedRegion={selectedRegion}
                    onRegionClick={handleRegionClick}
                  />
                </div>
              </div>
            </div>

            {/* Service Agent Cards - Slide in from right */}
            {selectedRegion && (
              <div className={`col-span-12 lg:col-span-7 ${
                isAnimating ? "animate-slide-out-right" : "animate-slide-in-right"
              }`}>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Service Agents in {regionNames[selectedRegion] || 'Selected Region'}
                  </h2>
                </div>
                {displayAgents.length > 0 ? (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {displayAgents.map((agent, index) => (
                      <div
                        key={agent.id}
                        className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-accent/30 transition-all flex flex-col"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-bold text-white">
                            {agent.name}
                          </h3>
                          {agent.certified && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-2 py-1 text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Certified
                            </Badge>
                          )}
                        </div>
                        <Badge className="mb-4 w-fit bg-accent/20 text-accent border-accent/30 px-3 py-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {agent.city}, {agent.state}
                        </Badge>
                        {agent.services && agent.services.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Wrench className="h-4 w-4 text-accent" />
                              <span className="text-sm font-medium text-white">Services:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {agent.services.map((service, idx) => (
                                <Badge
                                  key={idx}
                                  className="text-xs bg-gray-800 text-gray-300 border border-gray-700"
                                >
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="space-y-3 mb-6 flex-grow">
                          <div className="flex items-start gap-2 text-sm text-white">
                            <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                            <span>{agent.address}, {agent.city}, {agent.state}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white">
                            <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                            <a
                              href={`tel:${agent.phone}`}
                              className="hover:text-accent transition-colors"
                            >
                              {agent.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white">
                            <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                            <a
                              href={`mailto:${agent.email}`}
                              className="hover:text-accent transition-colors"
                            >
                              {agent.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white">
                            <Clock className="h-4 w-4 text-accent flex-shrink-0" />
                            <span>{agent.hours}</span>
                          </div>
                        </div>
                        <a
                          href={`mailto:${agent.email}?subject=Service Inquiry for Great Aussie Caravan`}
                          className="w-full bg-accent text-black font-medium text-center py-2 px-4 rounded-lg hover:bg-accent/90 transition-colors inline-block"
                        >
                          Contact Agent
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-black border border-gray-800 rounded-xl p-8 text-center">
                    <p className="text-white">
                      No service agents found in {regionNames[selectedRegion] || 'this region'}. Please check back soon or contact us directly.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-black py-16">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 border-2 border-accent/30 rounded-[24px] px-4 py-2 bg-accent/10 text-white">
              Expert Service & Support
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Our <span className="text-accent">Certified Service Agents</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Find professional service and support for your Great Aussie Caravan. Our certified agents are trained to keep your caravan in perfect condition.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="pb-16 bg-black -mt-4">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Certified Technicians */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-3xl p-6 hover:border-accent/30 transition-all hover:shadow-lg hover:shadow-accent/10">
              <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Certified Technicians
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                All service agents are factory-trained and certified to work on Great Aussie Caravans.
              </p>
            </div>

            {/* Card 2: Comprehensive Service */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-3xl p-6 hover:border-accent/30 transition-all hover:shadow-lg hover:shadow-accent/10">
              <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-4">
                <Wrench className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Comprehensive Service
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                From routine maintenance to complex repairs, our agents handle all your caravan service needs.
              </p>
            </div>

            {/* Card 3: Warranty Support */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-3xl p-6 hover:border-accent/30 transition-all hover:shadow-lg hover:shadow-accent/10">
              <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Warranty Support
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Authorized warranty repairs and service to keep your caravan protected and running smoothly.
              </p>
            </div>

            {/* Card 4: Mobile Service */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-3xl p-6 hover:border-accent/30 transition-all hover:shadow-lg hover:shadow-accent/10">
              <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-4">
                <Wrench className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Mobile Service
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Many agents offer mobile service, bringing expert care directly to your location.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

