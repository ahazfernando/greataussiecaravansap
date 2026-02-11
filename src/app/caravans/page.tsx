"use client";

import { useState } from "react";
import { Layout } from "@/components/layout";
import { CaravanCard } from "@/components/caravans/CaravanCard";
import { PremiumHeroCarousel } from "@/components/caravans/PremiumHeroCarousel";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import caravanInterior from "@/assets/caravan-interior.jpg";
import caravanOffroad from "@/assets/caravan-offroad.jpg";
import caravanBeach from "@/assets/caravan-beach.jpg";

const allCaravans = [
  {
    id: "outback-explorer-21",
    name: "Outback Explorer 21",
    image: caravanOffroad,
    shortDescription: "Built for serious off-road adventures with heavy-duty chassis and independent suspension.",
    sleeps: 4,
    length: "6.4m",
    type: "offroad" as const,
    featured: true,
  },
  {
    id: "outback-explorer-24",
    name: "Outback Explorer 24",
    image: caravanOffroad,
    shortDescription: "The larger off-road option with extra storage and full ensuite bathroom.",
    sleeps: 5,
    length: "7.3m",
    type: "offroad" as const,
    featured: false,
  },
  {
    id: "family-cruiser-23",
    name: "Family Cruiser 23",
    image: caravanInterior,
    shortDescription: "Spacious family layout with premium interiors. Perfect for extended road trips.",
    sleeps: 6,
    length: "7.2m",
    type: "family" as const,
    featured: true,
  },
  {
    id: "family-cruiser-26",
    name: "Family Cruiser 26",
    image: caravanInterior,
    shortDescription: "Our flagship family model with bunks, full kitchen, and separate living areas.",
    sleeps: 8,
    length: "8.0m",
    type: "family" as const,
    featured: false,
  },
  {
    id: "coastal-tourer-19",
    name: "Coastal Tourer 19",
    image: caravanBeach,
    shortDescription: "Lightweight and aerodynamic. Easy towing for coastal getaways.",
    sleeps: 2,
    length: "5.8m",
    type: "touring" as const,
    featured: true,
  },
  {
    id: "coastal-tourer-21",
    name: "Coastal Tourer 21",
    image: caravanBeach,
    shortDescription: "The perfect couples retreat with premium finishes and smart storage.",
    sleeps: 3,
    length: "6.4m",
    type: "touring" as const,
    featured: false,
  },
];

const filterOptions = [
  { value: "all", label: "All Caravans" },
  { value: "offroad", label: "Off-Road" },
  { value: "family", label: "Family" },
  { value: "touring", label: "Touring" },
];

const sleepsOptions = [
  { value: "all", label: "Any Capacity" },
  { value: "2", label: "2 People" },
  { value: "4", label: "4+ People" },
  { value: "6", label: "6+ People" },
];

// Featured models for hero carousel
const featuredModels = [
  {
    id: "striker",
    name: "Striker",
    tagline: "Hybrid Adventure Ready",
    heroImage: "/caravan/CaravanImage(D1V1C1).webp",
    category: "hybrid",
  },
  {
    id: "20urer",
    name: "20URER",
    tagline: "Premium Caravan Experience",
    heroImage: "/caravan/CaravanImage(D1V1C3).webp",
    category: "touring",
  },
  {
    id: "gravity",
    name: "Gravity",
    tagline: "Off-Road Dominance",
    heroImage: "/caravan/CaravanImage(D1V1C5).webp",
    category: "off-road",
  },
  {
    id: "xplora",
    name: "Xplora",
    tagline: "Explore Without Limits",
    heroImage: "/caravan/cfi_featured_image.png",
    category: "off-road",
  },
  {
    id: "20urer-lite",
    name: "20URER LITE",
    tagline: "Lightweight Caravan Excellence",
    heroImage: "/caravan/CaravanImage(D1V1C2).png",
    category: "touring",
  },
  {
    id: "tonka",
    name: "Tonka",
    tagline: "Built Tough, Built Right",
    heroImage: "/caravan/CaravanImage(D1V1C1).webp",
    category: "off-road",
  },
];

export default function CaravansPage() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [sleepsFilter, setSleepsFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCaravans = allCaravans.filter((caravan) => {
    const matchesType = typeFilter === "all" || caravan.type === typeFilter;
    const matchesSleeps =
      sleepsFilter === "all" ||
      (sleepsFilter === "2" && caravan.sleeps >= 2) ||
      (sleepsFilter === "4" && caravan.sleeps >= 4) ||
      (sleepsFilter === "6" && caravan.sleeps >= 6);
    const matchesSearch =
      searchQuery === "" ||
      caravan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caravan.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSleeps && matchesSearch;
  });

  const clearFilters = () => {
    setTypeFilter("all");
    setSleepsFilter("all");
    setSearchQuery("");
  };

  const hasActiveFilters = typeFilter !== "all" || sleepsFilter !== "all" || searchQuery !== "";

  return (
    <Layout>
      {/* Premium Hero Carousel */}
      <PremiumHeroCarousel models={featuredModels.filter(model => model.name !== "Gravity" && model.name !== "Striker")} />

      {/* Results */}
      {/* <section className="section-padding bg-gray-900">
        <div className="container-wide">
          <p className="text-sm text-gray-400 mb-8">
            Showing {filteredCaravans.length} of {allCaravans.length} caravans
          </p>

          {filteredCaravans.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredCaravans.map((caravan, index) => (
                <div
                  key={caravan.id}
                  className="opacity-0 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
                >
                  <CaravanCard {...caravan} image={typeof caravan.image === 'string' ? caravan.image : caravan.image.src} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-gray-300 mb-4">
                No caravans match your current filters.
              </p>
              <Button variant="outline" className="border-gray-800 text-white hover:bg-gray-900 hover:border-accent" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section> */}
    </Layout>
  );
}

