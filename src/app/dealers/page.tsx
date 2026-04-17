"use client";

import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/layout";
import { AustraliaMap } from "@/components/dealers/AustraliaMap";
import { Shield, Award, Users, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NewZealandMap } from "@/components/dealers/NewZealandMap";
import { DealerCard } from "@/components/dealers/DealerCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NZ_REGIONS = new Set(["nz-north", "nz-south"]);

function isNewZealandRegion(regionId: string | null): boolean {
  return regionId != null && NZ_REGIONS.has(regionId);
}

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
  "nz-north": "NZ North Island",
  "nz-south": "NZ South Island",
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
    {
      id: "nsw-3",
      name: "RV Central – Nowra",
      address: "334 Princes Hwy",
      city: "Bomaderry",
      state: "NSW",
      phone: "02 4422 4200",
      email: "sales@rvcentral.com.au",
      website: "https://www.rvcentral.com.au",
      hours: "Mon-Fri: 9am-5pm, Sat: 9am-3pm",
    },
    {
      id: "nsw-4",
      name: "RV Central – Coffs Harbour",
      address: "14/380 Pacific Hwy",
      city: "Coffs Harbour",
      state: "NSW",
      phone: "02 6652 1515",
      email: "sales@rvcentral.com.au",
      website: "https://www.rvcentral.com.au",
      hours: "Mon-Fri: 9am-5pm, Sat: 9am-3pm",
    },
    {
      id: "nsw-5",
      name: "RV Central – Morisset",
      address: "57 Alliance Ave",
      city: "Morisset",
      state: "NSW",
      phone: "02 4970 4131",
      email: "sales@rvcentral.com.au",
      website: "https://www.rvcentral.com.au",
      hours: "Mon-Fri: 9am-5pm, Sat: 9am-3pm",
    },
    {
      id: "nsw-penrith",
      name: "RV Central – Penrith",
      address: "86 Mulgoa Rd",
      city: "Penrith",
      state: "NSW",
      phone: "02 4721 2222",
      email: "sales@rvcentral.com.au",
      website: "https://www.rvcentral.com.au",
      hours: "Mon-Fri: 9am-5pm, Sat: 9am-3pm",
    },
  ],
  vic: [
    {
      id: "vic-1",
      name: "Great Aussie Factory",
      address: "88/106 Kyabram St",
      city: "Coolaroo",
      state: "VIC 3048, Australia",
      phone: "+61 3 9308 8511",
      email: "info@greataussiecaravans.com.au",
      website: "https://greataussiecaravans.com.au",
      hours: "Mon-Fri: 9am-5pm, Sat: 9am-3pm",
    },
  ],
  qld: [
    {
      id: "4",
      name: "Hinterland Caravans",
      address: "82 – 84 Kortum Drive",
      city: "Burleigh Heads",
      state: "QLD",
      phone: "(07) 5560 2472",
      email: "sales@hinterlandcaravans.com.au",
      website: "https://www.hinterlandcaravans.com.au",
      hours: "Mon-Fri: 9am-5pm, Sat: 9am-3pm",
    },
  ],
  wa: [
    {
      id: "5",
      name: "Base Camp Australia",
      address: "7 Niche Pde",
      city: "Wangara",
      state: "WA",
      phone: "1300 473 009",
      email: "info@basecampaustralia.com.au",
      website: "https://www.basecampaustralia.com.au",
      hours: "Mon-Fri: 9am-5pm, Sat: 9am-3pm",
    },
  ],
  sa: [
    {
      id: "6",
      name: "Dario Caravans",
      address: "1 Pinn St",
      city: "St Marys",
      state: "SA",
      phone: "(08) 8277 4388",
      email: "sales@dariocaravans.com.au",
      website: "https://www.dariocaravans.com.au",
      hours: "Mon-Fri: 8:30am-5pm, Sat: 9am-12pm",
    },
  ],
  act: [],
  tas: [],
  nt: [],
  "nz-north": [
    {
      id: "10",
      name: "RV Direct - New Zealand",
      address: "Contact for location",
      city: "New Zealand",
      state: "NZ",
      phone: "04 974 5072",
      email: "sales@rvdirect.co.nz",
      website: "https://www.rvdirect.co.nz",
      hours: "Mon-Fri: 9am-5pm, Sat: 9am-3pm",
    }
  ],
  "nz-south": [
    {
      id: "11",
      name: "RV Direct - New Zealand",
      address: "Contact for location",
      city: "New Zealand",
      state: "NZ",
      phone: "04 974 5072",
      email: "sales@rvdirect.co.nz",
      website: "https://www.rvdirect.co.nz",
      hours: "Mon-Fri: 9am-5pm, Sat: 9am-3pm",
    }
  ]
};

export default function DealersPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedDealerId, setSelectedDealerId] = useState<string | null>(null);
  const [displayDealers, setDisplayDealers] = useState<typeof dealers[string]>([]);
  /** Mobile: show one country map at a time (Australia vs New Zealand). */
  const [mobileCountryTab, setMobileCountryTab] = useState<"australia" | "newzealand">("australia");
  const dealerResultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedRegion || displayDealers.length === 0) return;
    if (typeof window === "undefined" || !window.matchMedia("(max-width: 767px)").matches) return;
    const t = window.setTimeout(() => {
      dealerResultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(t);
  }, [selectedRegion, displayDealers.length]);

  const clearMapSelection = () => {
    setSelectedRegion(null);
    setSelectedDealerId(null);
    setDisplayDealers([]);
  };

  const handleMobileCountryChange = (value: string) => {
    if (value !== "australia" && value !== "newzealand") return;
    setMobileCountryTab(value);
    clearMapSelection();
  };

  const getDealersByRegion = (regionId: string) => {
    return dealers[regionId] || [];
  };

  const getDealerById = (dealerId: string, regionId: string) => {
    const regionDealers = dealers[regionId] || [];
    return regionDealers.find(d => d.id === dealerId);
  };

  const handleRegionClick = (regionId: string) => {
    if (regionId === selectedRegion) {
      setSelectedRegion(null);
      setSelectedDealerId(null);
      setDisplayDealers([]);
    } else {
      setSelectedRegion(regionId);
      setSelectedDealerId(null);
      setDisplayDealers(getDealersByRegion(regionId));
    }
  };

  const handleDealerClick = (dealerId: string, regionId: string) => {
    const dealer = getDealerById(dealerId, regionId);
    if (dealer) {
      setSelectedRegion(regionId);
      setSelectedDealerId(dealerId);
      setDisplayDealers([dealer]);
    } else {
      // Fallback for regions with pins but no currently active dealers (e.g. ACT)
      handleRegionClick(regionId);
    }
  };

  return (
    <Layout>
      {/* Map and Dealers Section */}
      <section className="section-padding bg-black min-h-0 md:min-h-screen">
        <div className="container-wide">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 border-2 border-accent/30 rounded-[24px] px-4 py-2 bg-accent/10 text-white">
              Authorised Dealer Network
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Get Connected with our <span className="text-accent">authorized dealers</span>
            </h2>
            <p className="text-white max-w-2xl mx-auto md:px-0">
              <span className="md:hidden">
                Choose <span className="text-accent">Australia</span> or <span className="text-accent">New Zealand</span>, then tap a state or region on the map to see dealers.
              </span>
              <span className="hidden md:inline">
                Click on a region to discover authorized caravan dealers across Australia and New Zealand.
              </span>
            </p>
          </div>

          {/* Map and Cards Layout */}
          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Map Section - Dynamic width based on selection */}
            <div
              className={
                selectedRegion && displayDealers.length > 0
                  ? "col-span-12 lg:col-span-7"
                  : "col-span-12 lg:col-span-12"
              }
            >
              {/* Mobile: one country per tab — tap a state/region, then scroll to dealers below */}
              <div className="md:hidden">
                <Tabs value={mobileCountryTab} onValueChange={handleMobileCountryChange} className="w-full">
                  <TabsList className="grid h-auto w-full grid-cols-2 gap-1 rounded-xl border border-zinc-800 bg-zinc-900/90 p-1.5">
                    <TabsTrigger
                      value="australia"
                      className="rounded-lg py-2.5 text-sm font-medium text-zinc-400 data-[state=active]:bg-accent/20 data-[state=active]:text-white data-[state=active]:shadow-none"
                    >
                      Australia
                    </TabsTrigger>
                    <TabsTrigger
                      value="newzealand"
                      className="rounded-lg py-2.5 text-sm font-medium text-zinc-400 data-[state=active]:bg-accent/20 data-[state=active]:text-white data-[state=active]:shadow-none"
                    >
                      New Zealand
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="australia" className="mt-4 outline-none">
                    <div className="relative w-full max-w-4xl mx-auto">
                      <div
                        className={
                          selectedRegion && !isNewZealandRegion(selectedRegion)
                            ? "w-full aspect-square"
                            : "w-full aspect-square mx-auto"
                        }
                      >
                        <AustraliaMap
                          selectedRegion={isNewZealandRegion(selectedRegion) ? null : selectedRegion}
                          selectedDealerId={isNewZealandRegion(selectedRegion) ? null : selectedDealerId}
                          onRegionClick={handleRegionClick}
                          onDealerClick={handleDealerClick}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="newzealand" className="mt-4 outline-none">
                    <div className="relative w-full max-w-4xl mx-auto">
                      <div className="w-full max-h-[min(70vh,520px)] aspect-[3/4] mx-auto">
                        <NewZealandMap
                          selectedRegion={isNewZealandRegion(selectedRegion) ? selectedRegion : null}
                          onRegionClick={handleRegionClick}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Desktop & tablet: Australia + NZ inset (unchanged) */}
              <div
                className={
                  selectedRegion
                    ? "relative hidden w-full max-w-4xl md:block"
                    : "relative hidden w-full max-w-4xl mx-auto md:block"
                }
              >
                {/* Australia Map */}
                <div
                  className={
                    selectedRegion
                      ? "w-full md:w-[70%] aspect-square"
                      : "w-full md:w-[60%] aspect-square mx-auto"
                  }
                >
                  <AustraliaMap
                    selectedRegion={selectedRegion}
                    selectedDealerId={selectedDealerId}
                    onRegionClick={handleRegionClick}
                    onDealerClick={handleDealerClick}
                  />
                </div>

                {/* New Zealand Map - Positioned southeast of Australia like in world map */}
                <div className="absolute bottom-0 right-0 md:right-[10%] w-[50%] md:w-[28%] aspect-[0.75] translate-y-[35%] md:translate-y-[30%] translate-x-[25%] md:translate-x-[40%]">
                  <NewZealandMap
                    selectedRegion={selectedRegion}
                    onRegionClick={handleRegionClick}
                  />
                </div>
              </div>
            </div>

            {/* Dealers Cards */}
            {selectedRegion && displayDealers.length > 0 && (
              <div
                key={`${selectedRegion}-${selectedDealerId ?? "all"}`}
                ref={dealerResultsRef}
                className="col-span-12 lg:col-span-5 scroll-mt-24"
              >
                <div className="mb-6 animate-rise-smooth">
                  <h2 className="text-2xl font-bold text-white">
                    Dealers in {regionNames[selectedRegion] || 'Selected Region'}
                  </h2>
                  <p className="text-sm text-gray-400 mt-2">
                    {displayDealers.length} {displayDealers.length === 1 ? 'dealer' : 'dealers'} in this region
                  </p>
                </div>
                {displayDealers.length > 0 ? (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {displayDealers.map((dealer, index) => (
                      <DealerCard key={dealer.id} dealer={dealer} index={index} entryVariant="rise" />
                    ))}
                  </div>
                ) : (
                  <div className="bg-black border border-gray-800 rounded-xl p-8 text-center">
                    <p className="text-white">
                      {['nt', 'tas'].includes(selectedRegion || '')
                        ? `Currently we don't have a dealer in ${selectedRegion === 'tas' ? 'Tasmania' : 'the Northern Territory'}, but we're working on it! In the meantime, please contact us directly and we'll be happy to assist you.`
                        : `No dealers found in ${selectedRegion ? regionNames[selectedRegion] : 'this region'}. Please check back soon or contact us directly.`}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-black py-12">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 border-2 border-accent/30 rounded-[24px] px-4 py-2 bg-accent/10 text-white">
              Adventure for life
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Choose Our <span className="text-accent">Authorised Dealers</span>
            </h1>
            <p className="text-lg text-white max-w-2xl mx-auto mb-8">
              Our dealer network is carefully selected to ensure you receive the best service and support for your Great Aussie Caravan.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="pb-16 bg-black -mt-4">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Authorised Dealers */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-accent/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Authorised Dealers
              </h3>
              <p className="text-sm text-white leading-relaxed">
                All our dealers are fully authorised and trained to provide expert advice on Great Aussie Caravans.
              </p>
            </div>

            {/* Card 2: Quality Assurance */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-accent/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Quality Assurance
              </h3>
              <p className="text-sm text-white leading-relaxed">
                Every dealer is committed to maintaining the highest standards of service and customer satisfaction.
              </p>
            </div>

            {/* Card 3: Expert Support */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-accent/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Expert Support
              </h3>
              <p className="text-sm text-white leading-relaxed">
                Our dealer network provides comprehensive support from purchase to after-sales service.
              </p>
            </div>

            {/* Card 4: Local Knowledge */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-accent/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-4">
                <Timer className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Local Knowledge
              </h3>
              <p className="text-sm text-white leading-relaxed">
                Dealers understand local conditions and can help you choose the perfect caravan for your region.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

