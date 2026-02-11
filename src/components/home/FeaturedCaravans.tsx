import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaravanCard } from "@/components/caravans/CaravanCard";
import caravanInterior from "@/assets/caravan-interior.jpg";
import caravanOffroad from "@/assets/caravan-offroad.jpg";
import caravanBeach from "@/assets/caravan-beach.jpg";

const featuredCaravans = [
  {
    id: "outback-explorer-21",
    name: "Outback Explorer 21",
    image: caravanOffroad,
    shortDescription: "Built for serious off-road adventures. Heavy-duty chassis, independent suspension, and all-terrain capability.",
    sleeps: 4,
    length: "6.4m",
    type: "offroad" as const,
    featured: true,
  },
  {
    id: "family-cruiser-23",
    name: "Family Cruiser 23",
    image: caravanInterior,
    shortDescription: "Spacious family layout with premium interiors. Perfect for extended road trips and creating memories.",
    sleeps: 6,
    length: "7.2m",
    type: "family" as const,
    featured: false,
  },
  {
    id: "coastal-tourer-19",
    name: "Coastal Tourer 19",
    image: caravanBeach,
    shortDescription: "Lightweight and aerodynamic design. Easy towing and perfect for coastal getaways.",
    sleeps: 2,
    length: "5.8m",
    type: "touring" as const,
    featured: false,
  },
];

export function FeaturedCaravans() {
  return (
    <section className="section-padding bg-black">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-white font-medium text-sm tracking-wide uppercase mb-4 block border-2 border-accent/30 rounded-[24px] px-4 py-2 inline-block bg-accent/10 backdrop-blur-sm">
              Our Range
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Featured Caravans
            </h2>
            <p className="text-gray-300 mt-2 max-w-xl">
              Discover our most popular models, each designed for Australian conditions and built to last.
            </p>
          </div>
          <Button variant="outline" className="border-gray-800 text-white hover:bg-gray-900 hover:border-accent" asChild>
            <Link href="/caravans" className="flex items-center gap-2">
              View All Caravans
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredCaravans.map((caravan, index) => (
            <div
              key={caravan.id}
              className="opacity-0 animate-fade-up"
              style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "forwards" }}
            >
              <CaravanCard {...caravan} image={typeof caravan.image === 'string' ? caravan.image : caravan.image.src} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
