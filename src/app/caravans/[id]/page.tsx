"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Sun, Battery, Droplets, Zap, Truck, Check, ArrowLeft, Shield, Clock, Weight, Wind, Home, Building2, Sofa, ChevronRight, ChefHat, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/layout/Footer";
import { InteriorComfortCarousel } from "@/components/caravans/InteriorComfortCarousel";
import { ConstructionMethodsImageCarousel } from "@/components/caravans/ConstructionMethodsImageCarousel";
// import { ReviewsSection } from "@/components/home/ReviewsSection";
import Image from "next/image";
import caravanInterior from "@/assets/caravan-interior.jpg";
import caravanOffroad from "@/assets/caravan-offroad.jpg";
import caravanBeach from "@/assets/caravan-beach.jpg";
import heroCaravan from "@/assets/hero-caravan.jpg";

interface Caravan {
  id: string;
  name: string;
  tagline: string;
  category: string;
  sizes: string[];
  startingPrice: number;
  heroImage: string | any;
  gallery: (string | any)[];
  highlights: {
    solar: string;
    battery: string;
    water: string;
    inverter: string;
    suspension: string;
  };
  shortDescription: string;
  description: string;
  features: {
    exterior: string[];
    interior: string[];
    electrical: string[];
    offGrid: string[];
    plumbing?: string[];
    appliances?: string[];
    chassis?: string[];
    internal?: string[];
    external?: string[];
  };
  layouts: string[];
  isFeatured: boolean;
  type: "offroad" | "family" | "touring";
  specs: {
    length: string;
    width: string;
    height: string;
    tare: string;
    atm: string;
    sleeps: number;
    chassis: string;
    suspension: string;
    brakes: string;
    wheels: string;
  };
  interiorFeatures: string[];
  exteriorFeatures: string[];
  electricals: string[];
  idealFor: string;
  images: (string | any)[];
}


// Function to get model logo based on model name
const getModelLogo = (modelName: string): string => {
  // Map model names to their logo files
  const logoMap: Record<string, string> = {
    "Striker": "/caravanmodels/strikerlogo.png",
    // "20URER LITE": "/caravanmodels/euorerlitelogo.png",
    "20URER": "/caravanmodels/eourerlogo.png",
    "Gravity": "/caravanmodels/gravitylogo.png",
    "Xplora": "/caravanmodels/xploralogo.png",
    "Tonka": "/caravanmodels/tonkologo.png",
    "Paragon": "/caravanlogos/litelogo.png",
    // Map common caravan name patterns
    "Outback Explorer": "/caravanmodels/strikerlogo.png",
    "Outback": "/caravanmodels/strikerlogo.png",
  };

  // Try exact match first
  if (logoMap[modelName]) {
    return logoMap[modelName];
  }

  // Try partial matches
  for (const [key, value] of Object.entries(logoMap)) {
    if (modelName.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }

  // Default fallback
  return "/caravanlogos/litelogo.png";
};

// Function to get category name for breadcrumb
const getCategoryName = (category: string, type: string, modelId?: string): string => {
  if (category === "off-road" || type === "offroad") {
    if (modelId === "xplora") return "Off-Road Range";
    if (modelId === "gravity") return "Semi Off-Grid Range";
    return "Off-Grid Range";
  }
  if (category === "family" || type === "family") {
    return "Family Range";
  }
  if (category === "touring" || type === "touring") {
    return "On-Road";
  }
  return "Our Range";
};

/** First Performance Highlight metric: suspension copy by model (fallback: specs.suspension) */
const getPerformanceHighlightsSuspension = (modelId: string, specs: Caravan["specs"]): string => {
  const byId: Record<string, string> = {
    "20urer": "Leaf Spring",
    gravity: "Independent coil spring",
    "outback-explorer-21": "Chassis independent coil spring",
    tonka: "Cruisemaster",
  };
  return byId[modelId] ?? specs.suspension;
};

/** Second Performance Highlight metric (replaces Sleeps for mapped models) */
type PerformanceSecondMetric =
  | { kind: "custom"; label: string; value: string }
  | { kind: "sleeps"; sleeps: number };

const getPerformanceSecondMetric = (modelId: string, sleeps: number): PerformanceSecondMetric => {
  const custom: Record<string, { label: string; value: string }> = {
    tonka: { label: "Inverter", value: "5000 VA" },
    "outback-explorer-21": { label: "Inverter", value: "3000 VA" },
    gravity: { label: "Battery", value: "200 Ah" },
    "20urer": { label: "Battery", value: "100 Ah" },
  };
  const entry = custom[modelId];
  if (entry) return { kind: "custom", ...entry };
  return { kind: "sleeps", sleeps };
};

// Count Animation Component
function AnimatedCount({ value, suffix = "", duration = 2, delay = 0 }: { value: string | number; suffix?: string; duration?: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  // Extract numeric value and unit from string
  const extractValue = (val: string | number): { num: number; unit: string } => {
    if (typeof val === "number") {
      return { num: val, unit: "" };
    }

    // Match numbers (including decimals) and any text after
    const match = val.match(/^([\d.]+)\s*(.*)$/);
    if (match) {
      return { num: parseFloat(match[1]), unit: match[2] || "" };
    }
    // If no match, try to extract just the number
    const numMatch = val.match(/[\d.]+/);
    if (numMatch) {
      return { num: parseFloat(numMatch[0]), unit: val.replace(numMatch[0], "").trim() };
    }
    return { num: 0, unit: val };
  };

  const { num: targetValue, unit } = extractValue(value);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const startValue = 0;
    const endValue = targetValue;

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000 - delay;

      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }

      if (elapsed >= duration) {
        setCount(endValue);
        return;
      }

      // Easing function (ease-out)
      const progress = elapsed / duration;
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeProgress;

      setCount(currentValue);
      requestAnimationFrame(animate);
    };

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timeoutId);
  }, [isInView, targetValue, duration, delay]);

  // Determine decimal places based on original value
  const hasDecimal = targetValue % 1 !== 0;
  const displayValue = hasDecimal ? count.toFixed(1) : Math.round(count).toString();

  return (
    <span ref={ref}>
      {displayValue}{unit && ` ${unit}`}{suffix && ` ${suffix}`}
    </span>
  );
}

const TONKA_GALLERY = [
  "/Tonka/TonkaImageV0111.png",
  "/Tonka/TonkaImageV02.png",
  "/Tonka/TonkaImageV03-1.png",
] as const;

const XPLORE_NEW_GALLERY = [
  "/Xplora/XploraImageV01.png",
  "/Xplora/XploraImageV02.png",
  "/Xplora/XploraImageV03.png",
] as const;

const OURER_GALLERY = [
  "/2ourerModel/2ourerImageV01.png",
  "/2ourerModel/2ourerImageV02.png",
] as const;

const GRAVITY_NEW_GALLERY = [
  "/Gravity/GravityImageV01.png",
  "/Gravity/GravityImageV02.png",
  "/Gravity/GravityImageV03.png",
] as const;

/** Model detail pages that show the hero thumbnail strip + synced main image */
const HERO_SIDE_PANEL_MODEL_IDS = new Set(["tonka", "xplora", "20urer", "gravity"]);

// Mock data - in production this would come from a database
const caravanData: Record<string, Caravan> = {
  "outback-explorer-21": {
    id: "outback-explorer-21",
    name: "Outback Explorer 21",
    tagline: "Built for Serious Off-Grid Adventures",
    category: "off-road",
    sizes: ["21'", "24'"],
    startingPrice: 125000,
    heroImage: caravanOffroad,
    gallery: [caravanOffroad, heroCaravan, caravanInterior],
    highlights: {
      solar: "300W",
      battery: "200Ah Lithium",
      water: "180L",
      inverter: "2000W Pure Sine",
      suspension: "Independent Trailing Arm",
    },
    shortDescription: "Built for serious off-grid adventures with heavy-duty chassis and independent suspension.",
    description: "The Outback Explorer 21 is engineered for those who demand the best from their off-grid caravan. Built on a heavy-duty galvanised chassis with independent trailing arm suspension, this caravan can handle the toughest Australian conditions while keeping you comfortable.",
    idealFor: "Off-grid adventurers, remote camping, outback exploration",
    type: "offroad",
    features: {
      exterior: [
        "Full external shower",
        "Roll-out awning (4m)",
        "External speakers",
        "Roof racks",
        "Jerry can holders",
        "External gas bayonet",
        "LED exterior lighting",
        "Front and rear recovery points",
      ],
      interior: [
        "Queen-size island bed",
        "Full kitchen with gas/electric cooktop",
        "3-way fridge/freezer (184L)",
        "Microwave oven",
        "Ensuite with toilet and shower",
        "LED lighting throughout",
        "Reverse cycle air conditioning",
        "Diesel heater",
      ],
      electrical: [
        "200Ah lithium battery system",
        "300W solar panels",
        "40A DC-DC charger",
        "2000W pure sine wave inverter",
        "Battery management system",
      ],
      offGrid: [
        "Solar power system",
        "Large water capacity",
        "Lithium battery",
        "DC-DC charging",
      ],
    },
    layouts: ["Island Bed", "Side Bed"],
    isFeatured: true,
    specs: {
      length: "6.4m",
      width: "2.4m",
      height: "2.9m",
      tare: "2,450kg",
      atm: "3,500kg",
      sleeps: 4,
      chassis: "Heavy-duty galvanised steel",
      suspension: "Independent trailing arm with twin shock absorbers",
      brakes: "Electric drum brakes with breakaway system",
      wheels: "16\" alloy wheels with all-terrain tyres",
    },
    interiorFeatures: [
      "Queen-size island bed",
      "Full kitchen with gas/electric cooktop",
      "3-way fridge/freezer (184L)",
      "Microwave oven",
      "Ensuite with toilet and shower",
      "LED lighting throughout",
      "Reverse cycle air conditioning",
      "Diesel heater",
    ],
    exteriorFeatures: [
      "Full external shower",
      "Roll-out awning (4m)",
      "External speakers",
      "Roof racks",
      "Jerry can holders",
      "External gas bayonet",
      "LED exterior lighting",
      "Front and rear recovery points",
    ],
    electricals: [
      "200Ah lithium battery system",
      "300W solar panels",
      "40A DC-DC charger",
      "2000W pure sine wave inverter",
      "Battery management system",
    ],
    images: [caravanOffroad, heroCaravan, caravanInterior],
  },
  "family-cruiser-23": {
    id: "family-cruiser-23",
    name: "Family Cruiser 23",
    tagline: "Spacious Comfort for the Whole Family",
    category: "family",
    sizes: ["23'", "26'"],
    startingPrice: 110000,
    heroImage: caravanInterior,
    gallery: [caravanInterior, caravanBeach, heroCaravan],
    highlights: {
      solar: "200W",
      battery: "170Ah AGM",
      water: "200L",
      inverter: "240V Mains",
      suspension: "Tandem Axle Leaf Springs",
    },
    shortDescription: "Spacious family layout with premium interiors. Perfect for extended road trips.",
    description: "The Family Cruiser 23 is designed with families in mind. Offering generous living space, smart storage solutions, and all the amenities you need for extended road trips. Create lasting memories with your loved ones in comfort and style.",
    idealFor: "Families with children, extended trips, caravan parks",
    type: "family",
    features: {
      exterior: [
        "Full annexe walls",
        "Roll-out awning (5m)",
        "External BBQ point",
        "Bike rack compatible",
        "External shower",
        "Entertainment hatch",
        "LED awning lights",
        "Large external storage",
      ],
      interior: [
        "Queen-size bed with innerspring mattress",
        "Double bunk beds for kids",
        "Full kitchen with oven",
        "Large fridge/freezer (220L)",
        "Separate toilet and shower",
        "Club lounge seating",
        "TV mounting point",
        "Ducted air conditioning",
      ],
      electrical: [
        "170Ah AGM battery",
        "200W solar panel",
        "30A charger",
        "240V connections throughout",
      ],
      offGrid: [
        "Solar power",
        "Large water capacity",
        "AGM battery",
        "Mains power ready",
      ],
    },
    layouts: ["Bunk Beds", "Club Lounge"],
    isFeatured: true,
    specs: {
      length: "7.2m",
      width: "2.5m",
      height: "3.0m",
      tare: "2,650kg",
      atm: "3,500kg",
      sleeps: 6,
      chassis: "Hot-dipped galvanised steel",
      suspension: "Tandem axle with leaf springs",
      brakes: "Electric drum brakes",
      wheels: "15\" alloy wheels",
    },
    interiorFeatures: [
      "Queen-size bed with innerspring mattress",
      "Double bunk beds for kids",
      "Full kitchen with oven",
      "Large fridge/freezer (220L)",
      "Separate toilet and shower",
      "Club lounge seating",
      "TV mounting point",
      "Ducted air conditioning",
    ],
    exteriorFeatures: [
      "Full annexe walls",
      "Roll-out awning (5m)",
      "External BBQ point",
      "Bike rack compatible",
      "External shower",
      "Entertainment hatch",
      "LED awning lights",
      "Large external storage",
    ],
    electricals: [
      "170Ah AGM battery",
      "200W solar panel",
      "30A charger",
      "240V connections throughout",
    ],
    images: [caravanInterior, caravanBeach, heroCaravan],
  },
  "coastal-tourer-19": {
    id: "coastal-tourer-19",
    name: "Coastal Tourer 19",
    tagline: "Light, Nimble, and Ready for Adventure",
    category: "touring",
    sizes: ["19'", "21'"],
    startingPrice: 85000,
    heroImage: caravanBeach,
    gallery: [caravanBeach, caravanInterior, heroCaravan],
    highlights: {
      solar: "160W",
      battery: "120Ah AGM",
      water: "120L",
      inverter: "240V Mains",
      suspension: "Single Axle Independent",
    },
    shortDescription: "Lightweight and aerodynamic. Easy towing for coastal getaways.",
    description: "The Coastal Tourer 19 proves that great things come in smaller packages. Lightweight and aerodynamic, this caravan is easy to tow while still offering all the comforts of home. Perfect for couples seeking coastal escapes and weekend getaways.",
    idealFor: "Couples, weekend trips, coastal camping",
    type: "touring",
    features: {
      exterior: [
        "Roll-out awning (3m)",
        "External shower",
        "Outdoor speakers",
        "LED exterior lights",
        "Gas bottle storage",
      ],
      interior: [
        "Queen-size bed",
        "Compact full kitchen",
        "3-way fridge (150L)",
        "Wet bath with toilet",
        "Dinette conversion to bed",
        "LED lighting",
        "Roof-mounted air conditioning",
      ],
      electrical: [
        "120Ah AGM battery",
        "160W solar panel",
        "25A charger",
      ],
      offGrid: [
        "Solar power",
        "Compact water system",
        "AGM battery",
        "Mains power ready",
      ],
    },
    layouts: ["Dinette", "Fixed Bed"],
    isFeatured: true,
    specs: {
      length: "5.8m",
      width: "2.3m",
      height: "2.7m",
      tare: "1,650kg",
      atm: "2,200kg",
      sleeps: 2,
      chassis: "Lightweight galvanised steel",
      suspension: "Single axle independent",
      brakes: "Electric drum brakes",
      wheels: "14\" alloy wheels",
    },
    interiorFeatures: [
      "Queen-size bed",
      "Compact full kitchen",
      "3-way fridge (150L)",
      "Wet bath with toilet",
      "Dinette conversion to bed",
      "LED lighting",
      "Roof-mounted air conditioning",
    ],
    exteriorFeatures: [
      "Roll-out awning (3m)",
      "External shower",
      "Outdoor speakers",
      "LED exterior lights",
      "Gas bottle storage",
    ],
    electricals: [
      "120Ah AGM battery",
      "160W solar panel",
      "25A charger",
    ],
    images: [caravanBeach, caravanInterior, heroCaravan],
  },
  "striker": {
    id: "striker",
    name: "Striker",
    tagline: "Hybrid Adventure Ready",
    category: "hybrid",
    sizes: ["20'", "22'"],
    startingPrice: 115000,
    heroImage: "/caravan/CaravanImage(D1V1C1).webp",
    gallery: ["/caravan/CaravanImage(D1V1C1).webp", "/caravan/CaravanImage(D1V1C2).png", "/caravan/CaravanImage(D1V1C3).webp"],
    highlights: {
      solar: "300W",
      battery: "200Ah Lithium",
      water: "180L",
      inverter: "2000W Pure Sine",
      suspension: "Independent Trailing Arm",
    },
    shortDescription: "Hybrid model designed for versatility and adventure.",
    description: "The Striker hybrid model combines the best of both worlds - the comfort of a caravan with the flexibility of a hybrid design. Perfect for those who want to explore both on-road and off-grid destinations.",
    idealFor: "Adventure seekers, hybrid enthusiasts, versatile travelers",
    type: "offroad",
    features: {
      exterior: [
        "Full external shower",
        "Roll-out awning (4m)",
        "External speakers",
        "Roof racks",
        "Jerry can holders",
        "External gas bayonet",
        "LED exterior lighting",
        "Front and rear recovery points",
      ],
      interior: [
        "Queen-size island bed",
        "Full kitchen with gas/electric cooktop",
        "3-way fridge/freezer (184L)",
        "Microwave oven",
        "Ensuite with toilet and shower",
        "LED lighting throughout",
        "Reverse cycle air conditioning",
        "Diesel heater",
      ],
      electrical: [
        "200Ah lithium battery system",
        "300W solar panels",
        "40A DC-DC charger",
        "2000W pure sine wave inverter",
        "Battery management system",
      ],
      offGrid: [
        "Solar power system",
        "Large water capacity",
        "Lithium battery",
        "DC-DC charging",
      ],
    },
    layouts: ["Island Bed", "Side Bed"],
    isFeatured: true,
    specs: {
      length: "6.1m",
      width: "2.4m",
      height: "2.9m",
      tare: "2,300kg",
      atm: "3,200kg",
      sleeps: 4,
      chassis: "Heavy-duty galvanised steel",
      suspension: "Independent trailing arm with twin shock absorbers",
      brakes: "Electric drum brakes with breakaway system",
      wheels: "16\" alloy wheels with all-terrain tyres",
    },
    interiorFeatures: [
      "Queen-size island bed",
      "Full kitchen with gas/electric cooktop",
      "3-way fridge/freezer (184L)",
      "Microwave oven",
      "Ensuite with toilet and shower",
      "LED lighting throughout",
      "Reverse cycle air conditioning",
      "Diesel heater",
    ],
    exteriorFeatures: [
      "Full external shower",
      "Roll-out awning (4m)",
      "External speakers",
      "Roof racks",
      "Jerry can holders",
      "External gas bayonet",
      "LED exterior lighting",
      "Front and rear recovery points",
    ],
    electricals: [
      "200Ah lithium battery system",
      "300W solar panels",
      "40A DC-DC charger",
      "2000W pure sine wave inverter",
      "Battery management system",
    ],
    images: ["/caravan/CaravanImage(D1V1C1).webp", "/caravan/CaravanImage(D1V1C2).png", "/caravan/CaravanImage(D1V1C3).webp"],
  },
  // 20URER LITE model commented out
  // "20urer-lite": {
  //   id: "20urer-lite",
  //   name: "20URER LITE",
  //   tagline: "Lightweight Caravan Excellence",
  //   category: "touring",
  //   sizes: ["20'"],
  //   startingPrice: 95000,
  //   heroImage: "/caravan/CaravanImage(D1V1C2).png",
  //   gallery: ["/caravan/CaravanImage(D1V1C2).png", "/caravan/CaravanImage(D1V1C1).webp", "/caravan/CaravanImage(D1V1C3).webp"],
  //   highlights: {
  //     solar: "200W",
  //     battery: "150Ah AGM",
  //     water: "150L",
  //     inverter: "1500W Pure Sine",
  //     suspension: "Single Axle Independent",
  //   },
  //   shortDescription: "Lightweight caravan model perfect for easy towing and comfortable travel.",
  //   description: "The 20URER LITE is designed for those who want a full-featured caravan without the weight. This lightweight model offers all the comforts of home while being easy to tow with a wide range of vehicles.",
  //   idealFor: "Couples, weekend travelers, easy towing enthusiasts",
  //   type: "touring",
  //   features: {
  //     exterior: [
  //       "Roll-out awning (3.5m)",
  //       "External shower",
  //       "Outdoor speakers",
  //       "LED exterior lights",
  //       "Gas bottle storage",
  //       "External BBQ point",
  //     ],
  //     interior: [
  //       "Queen-size bed",
  //       "Full kitchen with oven",
  //       "3-way fridge (160L)",
  //       "Separate toilet and shower",
  //       "Dinette conversion to bed",
  //       "LED lighting",
  //       "Roof-mounted air conditioning",
  //     ],
  //     electrical: [
  //       "150Ah AGM battery",
  //       "200W solar panel",
  //       "30A charger",
  //       "1500W pure sine wave inverter",
  //     ],
  //     offGrid: [
  //       "Solar power",
  //       "Adequate water capacity",
  //       "AGM battery",
  //       "Inverter power",
  //     ],
  //   },
  //   layouts: ["Dinette", "Fixed Bed"],
  //   isFeatured: true,
  //   specs: {
  //     length: "6.1m",
  //     width: "2.3m",
  //     height: "2.7m",
  //     tare: "1,800kg",
  //     atm: "2,500kg",
  //     sleeps: 2,
  //     chassis: "Lightweight galvanised steel",
  //     suspension: "Single axle independent",
  //     brakes: "Electric drum brakes",
  //     wheels: "15\" alloy wheels",
  //   },
  //   interiorFeatures: [
  //     "Queen-size bed",
  //     "Full kitchen with oven",
  //     "3-way fridge (160L)",
  //     "Separate toilet and shower",
  //     "Dinette conversion to bed",
  //     "LED lighting",
  //     "Roof-mounted air conditioning",
  //   ],
  //   exteriorFeatures: [
  //     "Roll-out awning (3.5m)",
  //     "External shower",
  //     "Outdoor speakers",
  //     "LED exterior lights",
  //     "Gas bottle storage",
  //     "External BBQ point",
  //   ],
  //   electricals: [
  //     "150Ah AGM battery",
  //     "200W solar panel",
  //     "30A charger",
  //     "1500W pure sine wave inverter",
  //   ],
  //   images: ["/caravan/CaravanImage(D1V1C2).png", "/caravan/CaravanImage(D1V1C1).webp", "/caravan/CaravanImage(D1V1C3).webp"],
  // },
  "20urer": {
    id: "20urer",
    name: "20URER",
    tagline: "Premium On-Road Caravan Experience",
    category: "touring",
    sizes: ["20'", "22'"],
    startingPrice: 105000,
    heroImage: OURER_GALLERY[0],
    gallery: [...OURER_GALLERY],
    highlights: {
      solar: "250W",
      battery: "180Ah AGM",
      water: "180L",
      inverter: "2000W Pure Sine",
      suspension: "Tandem Axle Leaf Springs",
    },
    shortDescription: "Premium caravan model with enhanced features and spacious interiors.",
    description: "The 20URER represents the pinnacle of our touring caravan range. With premium finishes, spacious layouts, and all the features you need for extended travel, this model sets the standard for comfort and quality.",
    idealFor: "Extended travelers, premium seekers, comfort enthusiasts",
    type: "touring",
    features: {
      exterior: [
        "Anderson plug for fridge",
        "Aluminum composite outside walls",
        "Checker plate for protection",
        "Premium, one-piece, fiberglass roof",
        "One-piece honeycomb composite floor",
        "Roll-out awning",
        "Full length tunnel boot with lights inside",
        "External TV bracket, antenna, 12V and 240V power outlets",
        "Premium 3-point locking system, alloy SecuraMesh door",
        "Built-in external generator compartment (as per floor plan)",
        "Wheel arch with aluminium checker plate armour moulds",
        "External gas bayonet to the awning side of the caravan for BBQ",
        "Anderson plug to charge battery from car",
        "External grab handle with LED light",
        "NCE picnic table with USB + USB-C",
      ],
      external: [
        "Anderson plug for fridge",
        "Aluminum composite outside walls",
        "Checker plate for protection",
        "Premium, one-piece, fiberglass roof",
        "One-piece honeycomb composite floor",
        "Roll-out awning",
        "Full length tunnel boot with lights inside",
        "External TV bracket, antenna, 12V and 240V power outlets",
        "Premium 3-point locking system, alloy SecuraMesh door",
        "Built-in external generator compartment (as per floor plan)",
        "Wheel arch with aluminium checker plate armour moulds",
        "External gas bayonet to the awning side of the caravan for BBQ",
        "Anderson plug to charge battery from car",
        "External grab handle with LED light",
        "NCE picnic table with USB + USB-C",
      ],
      interior: [
        "Deluxe 6’2” pillow-top mattress",
        "Large size double glazed windows",
        "Nooks beside master bed with 240V & USB, USB-C outlets for electronic device charging",
        "Ensuite vanity draw x 6",
        "Modern CNC interior",
        "Comfortable dual density lounges with premium automotive grade upholstery",
        "Soft close drawers on ball-bearing runners",
        "Premium brushed door & drawer catches (as per your build selection)",
        "Block out blinds and pull down mesh screens to all windows",
        "Stylish acrylic finished cabinetry",
        "Recessed stove cover",
        "Pull-out pantries (as per floor plan)",
        "Large stylish grab handle on entry wall",
        "One bank larger kitchen drawer (layout dependent)",
        "Premium quality ensuite mirror with additional magnifying glass",
      ],
      internal: [
        "Deluxe 6’2” pillow-top mattress",
        "Large size double glazed windows",
        "Nooks beside master bed with 240V & USB, USB-C outlets for electronic device charging",
        "Ensuite vanity draw x 6",
        "Modern CNC interior",
        "Comfortable dual density lounges with premium automotive grade upholstery",
        "Soft close drawers on ball-bearing runners",
        "Premium brushed door & drawer catches (as per your build selection)",
        "Block out blinds and pull down mesh screens to all windows",
        "Stylish acrylic finished cabinetry",
        "Recessed stove cover",
        "Pull-out pantries (as per floor plan)",
        "Large stylish grab handle on entry wall",
        "One bank larger kitchen drawer (layout dependent)",
        "Premium quality ensuite mirror with additional magnifying glass",
      ],
      electrical: [
        "200W of solar power (1 x 200W panel)",
        "120Ah Victron lithium battery",
        "Projecta Intelli-RV GEN II battery management system",
        "External rear camera",
        "Internal LED bulkhead lighting",
        "LED reading lights at bed head & dinette with USB & USB-C output",
        "Remote LED lights throughout the van",
        "Premium quality roof hatch with LED lights",
        "Rear LED tail lights",
        "Radio antenna",
      ],
      plumbing: [
        "190L of drinking water capacity (2 x 95L tanks)",
        "12V water pump",
        "2 x 9Kg gas bottles",
        "Global gas / electric hot water system",
        "Digital water tank level display",
        "Ceramic inlay cassette toilet",
        "Flick mixer taps throughout",
        "Hidden plumbing and waste lines inside cabinetry (wherever possible)",
        "Lockable water filler to each water tank",
        "Tap on A-Frame with guard",
      ],
      chassis: [
        "Reliable leaf spring suspension (2.5T single axle & 3.2T tandem axle)",
        "235/75/R15 all terrain tyres on load-rated alloys",
        "10” drum brakes (tandem axle) or 12” drum brakes (single axle)",
        "Standard 50mm ball coupling",
        "Supagal chassis made with Australian RHS steel",
        "6” drawbar with 6” chassis and 2” chassis raiser (tandem axle)",
        "Rear 2 arm bumper bar",
        "Mud flaps to avoid stones",
      ],
      appliances: [
        "Dometic reverse cycle air-conditioner",
        "188L 3-way fridge / freezer",
        "Premium front loader 3.5 kg washing machine (Excludes 17’ model)",
        "24” Smart TV (12V)",
        "Dome style TV antenna",
        "3 Gas + 1 electric cooktop with built in microwave below",
        "Bluetooth sound system with internal & external speakers",
        "Smoke alarm",
      ],
      offGrid: [
        "Enhanced solar power",
        "Large water capacity",
        "Lithium battery system",
        "Battery management system",
      ],
    },
    layouts: ["Club Lounge", "Island Bed"],
    isFeatured: true,
    specs: {
      length: "6.7m",
      width: "2.5m",
      height: "3.0m",
      tare: "2,200kg",
      atm: "3,200kg",
      sleeps: 4,
      chassis: "Supagal chassis – Australian RHS steel",
      suspension: "Leaf spring (2.5T single / 3.2T tandem axle)",
      brakes: "10\" drum brakes (tandem) / 12\" (single axle)",
      wheels: "235/75/R15 all terrain on load-rated alloys",
    },
    interiorFeatures: [
      "Deluxe 6’2” pillow-top mattress",
      "Large size double glazed windows",
      "Nooks beside master bed with 240V & USB, USB-C outlets for electronic device charging",
      "Ensuite vanity draw x 6",
      "Modern CNC interior",
      "Comfortable dual density lounges with premium automotive grade upholstery",
      "Soft close drawers on ball-bearing runners",
      "Premium brushed door & drawer catches (as per your build selection)",
      "Block out blinds and pull down mesh screens to all windows",
      "Stylish acrylic finished cabinetry",
      "Recessed stove cover",
      "Pull-out pantries (as per floor plan)",
      "Large stylish grab handle on entry wall",
      "One bank larger kitchen drawer (layout dependent)",
      "Premium quality ensuite mirror with additional magnifying glass",
    ],
    exteriorFeatures: [
      "Anderson plug for fridge",
      "Aluminum composite outside walls",
      "Checker plate for protection",
      "Premium, one-piece, fiberglass roof",
      "One-piece honeycomb composite floor",
      "Roll-out awning",
      "Full length tunnel boot with lights inside",
      "External TV bracket, antenna, 12V and 240V power outlets",
      "Premium 3-point locking system, alloy SecuraMesh door",
      "Built-in external generator compartment (as per floor plan)",
      "Wheel arch with aluminium checker plate armour moulds",
      "External gas bayonet to the awning side of the caravan for BBQ",
      "Anderson plug to charge battery from car",
      "External grab handle with LED light",
      "NCE picnic table with USB + USB-C",
    ],
    electricals: [
      "200W of solar power (1 x 200W panel)",
      "120Ah Victron lithium battery",
      "Projecta Intelli-RV GEN II battery management system",
      "External rear camera",
      "Internal LED bulkhead lighting",
      "LED reading lights at bed head & dinette with USB & USB-C output",
      "Remote LED lights throughout the van",
      "Premium quality roof hatch with LED lights",
      "Rear LED tail lights",
      "Radio antenna",
    ],
    images: [...OURER_GALLERY],
  },
  "gravity": {
    id: "gravity",
    name: "Gravity",
    tagline: "Semi-Off-Grid Dominance",
    category: "off-road",
    sizes: ["21'", "24'"],
    startingPrice: 130000,
    heroImage: GRAVITY_NEW_GALLERY[0],
    gallery: [...GRAVITY_NEW_GALLERY],
    highlights: {
      solar: "400W",
      battery: "200Ah Lithium",
      water: "190L",
      inverter: "3000W Pure Sine",
      suspension: "Independent Coil Spring",
    },
    shortDescription: "Ultimate off-grid caravan built for the toughest Australian conditions.",
    description: "The Gravity is our most capable off-grid caravan, engineered for serious adventurers who demand the absolute best. With heavy-duty construction, advanced suspension, and premium off-grid systems, the Gravity can take you anywhere.",
    idealFor: "Serious off-grid explorers, remote explorers, adventure enthusiasts",
    type: "offroad",
    features: {
      exterior: [
        "Aluminum composite outside walls",
        "Extra high checker plate for protection",
        "Premium, one-piece, fibreglass roof",
        "Roll-out awning",
        "Full length tunnel boot with lights inside",
        "External TV bracket, antenna, 12V and 240V power outlets",
        "Premium 3-point locking system, alloy SecuraMesh door",
        "Built-in external generator compartment (as per floor plan)",
        "Wheel arch with aluminium checker plate armour moulds",
        "External gas bayonet to the awning side of the caravan for BBQ",
        "Anderson plug to charge battery from car",
        "External grab handle with LED light",
        "Premium quality picnic table with LEDs",
      ],
      external: [
        "Aluminum composite outside walls",
        "Extra high checker plate for protection",
        "Premium, one-piece, fibreglass roof",
        "Roll-out awning",
        "Full length tunnel boot with lights inside",
        "External TV bracket, antenna, 12V and 240V power outlets",
        "Premium 3-point locking system, alloy SecuraMesh door",
        "Built-in external generator compartment (as per floor plan)",
        "Wheel arch with aluminium checker plate armour moulds",
        "External gas bayonet to the awning side of the caravan for BBQ",
        "Anderson plug to charge battery from car",
        "External grab handle with LED light",
        "Premium quality picnic table with LEDs",
      ],
      interior: [
        "Deluxe 6’2” pillow-top mattress",
        "Large size double glazed windows",
        "Stylish waterfall bench top",
        "Nooks beside master bed with 240V & USB-C outlets for electronic device charging",
        "Modern CNC interior cabinetry",
        "Comfortable dual density lounges with premium automotive grade upholstery",
        "Recess footrest to dinette seats (as per your floor plan)",
        "Soft close drawers on ball-bearing runners",
        "Premium brushed door & drawer catches (as per your build selection)",
        "Block out blinds and pull down mesh screens to all windows",
        "Recessed stove cover",
        "Pull-out pantries (as per floor plan)",
        "Large stylish grab handle on entry door",
        "Premium quality ensuite mirror with additional magnifying glass",
        "NCE picnic table with USB + USB-C",
        "Fire extinguisher",
      ],
      internal: [
        "Deluxe 6’2” pillow-top mattress",
        "Large size double glazed windows",
        "Stylish waterfall bench top",
        "Nooks beside master bed with 240V & USB-C outlets for electronic device charging",
        "Modern CNC interior cabinetry",
        "Comfortable dual density lounges with premium automotive grade upholstery",
        "Recess footrest to dinette seats (as per your floor plan)",
        "Soft close drawers on ball-bearing runners",
        "Premium brushed door & drawer catches (as per your build selection)",
        "Block out blinds and pull down mesh screens to all windows",
        "Recessed stove cover",
        "Pull-out pantries (as per floor plan)",
        "Large stylish grab handle on entry door",
        "Premium quality ensuite mirror with additional magnifying glass",
        "NCE picnic table with USB + USB-C",
        "Fire extinguisher",
      ],
      electrical: [
        "400W of solar power (2 x 200W panels)",
        "200Ah Arizon lithium battery",
        "Victron micro-touch bundle",
        "External rear camera",
        "Anti-dazzle LED strip light around the underbody of the caravan",
        "Internal LED bulkhead lighting",
        "LED reading lights at bed head & dinette with USB & USB-C output",
        "Remote LED lights throughout the van",
        "Premium quality roof hatch with LED lights",
        "Rear LED tail lights",
        "Radio antenna",
      ],
      plumbing: [
        "190L drinking water capacity (2 x 95L tanks)",
        "12V water pump",
        "95L grey water tank with large water outlet",
        "2 x 9Kg gas bottles",
        "Gas / electric hot water system",
        "Digital water tank level display",
        "Ceramic inlay cassette toilet",
        "Flick mixer taps throughout",
        "Hidden plumbing and waste lines inside cabinetry (wherever possible)",
        "Lockable water filler to each water tank",
        "Tap on A-Frame with guard",
      ],
      chassis: [
        "Independent coil spring suspension (2.75T single axle & 3.3T tandem axle)",
        "265/75/R16 mud terrain tyres on load-rated alloys",
        "10” drum brakes (tandem axle) or 12” drum brakes (single axle)",
        "Large front toolbox with 2 Jerry can holders and generator slide inside",
        "50cm A-frame extension",
        "DO35 Cruisemaster articulating coupling",
        "Supagal chassis made with Australian RHS steel",
        "6” drawbar with 6” chassis and 2” chassis raiser",
        "Rear 3 arm bumper bar",
        "Single alloy entry step",
        "Mud flaps to avoid stones",
      ],
      appliances: [
        "Dometic reverse cycle air-conditioner",
        "Dometic RUC 840X 216 L (internal ventilation) fridge",
        "Premium front loader 3.5 kg washing machine",
        "24” Smart TV (12V)",
        "Dome TV antenna",
        "Microwave in kitchen under bench",
        "Stove top with 3 gas, 1 electric element with separate grill",
        "Bluetooth sound system with internal & external speakers",
        "Smoke alarm",
      ],
      offGrid: [
        "High-capacity solar power system",
        "Large water capacity with filtration",
        "Premium lithium battery",
        "Advanced DC-DC charging",
        "Extended off-grid capability",
      ],
    },
    layouts: ["Island Bed", "Side Bed", "Bunk Beds"],
    isFeatured: true,
    specs: {
      length: "7.3m",
      width: "2.5m",
      height: "3.0m",
      tare: "2,800kg",
      atm: "3,500kg",
      sleeps: 4,
      chassis: "Supagal chassis made with Australian RHS steel",
      suspension: "Independent coil spring suspension",
      brakes: "10” drum brakes (tandem) or 12” (single axle)",
      wheels: "265/75/R16 mud terrain tyres on load-rated alloys",
    },
    interiorFeatures: [
      "Deluxe 6’2” pillow-top mattress",
      "Large size double glazed windows",
      "Stylish waterfall bench top",
      "Nooks beside master bed with 240V & USB-C outlets for electronic device charging",
      "Modern CNC interior cabinetry",
      "Comfortable dual density lounges with premium automotive grade upholstery",
      "Recess footrest to dinette seats (as per your floor plan)",
      "Soft close drawers on ball-bearing runners",
      "Premium brushed door & drawer catches (as per your build selection)",
      "Block out blinds and pull down mesh screens to all windows",
      "Recessed stove cover",
      "Pull-out pantries (as per floor plan)",
      "Large stylish grab handle on entry door",
      "Premium quality ensuite mirror with additional magnifying glass",
      "NCE picnic table with USB + USB-C",
      "Fire extinguisher",
    ],
    exteriorFeatures: [
      "Aluminum composite outside walls",
      "Extra high checker plate for protection",
      "Premium, one-piece, fibreglass roof",
      "Roll-out awning",
      "Full length tunnel boot with lights inside",
      "External TV bracket, antenna, 12V and 240V power outlets",
      "Premium 3-point locking system, alloy SecuraMesh door",
      "Built-in external generator compartment (as per floor plan)",
      "Wheel arch with aluminium checker plate armour moulds",
      "External gas bayonet to the awning side of the caravan for BBQ",
      "Anderson plug to charge battery from car",
      "External grab handle with LED light",
      "Premium quality picnic table with LEDs",
    ],
    electricals: [
      "400W of solar power (2 x 200W panels)",
      "200Ah Arizon lithium battery",
      "Victron micro-touch bundle",
      "External rear camera",
      "Anti-dazzle LED strip light around the underbody of the caravan",
      "Internal LED bulkhead lighting",
      "LED reading lights at bed head & dinette with USB & USB-C output",
      "Remote LED lights throughout the van",
      "Premium quality roof hatch with LED lights",
      "Rear LED tail lights",
      "Radio antenna",
    ],
    images: [...GRAVITY_NEW_GALLERY],
  },
  "xplora": {
    id: "xplora",
    name: "Xplora",
    tagline: "Explore Without Limits",
    category: "off-road",
    sizes: ["19'", "21'"],
    startingPrice: 120000,
    heroImage: XPLORE_NEW_GALLERY[0],
    gallery: [...XPLORE_NEW_GALLERY],
    highlights: {
      solar: "350W",
      battery: "250Ah Lithium",
      water: "190L",
      inverter: "2500W Pure Sine",
      suspension: "Independent coil spring",
    },
    shortDescription: "Adventure-ready caravan designed for exploration and discovery.",
    description: "The Xplora is built for those who want to explore the road less traveled. With robust construction, advanced off-road capabilities, and thoughtful design, this caravan is your ticket to adventure.",
    idealFor: "Adventure seekers, off-road explorers, discovery enthusiasts",
    type: "offroad",
    features: {
      exterior: [
        "Aluminum composite outside walls",
        "Extra high flat plate for protection with metal extrusions & cappings",
        "Premium, one-piece, fibreglass roof",
        "One-piece floor as per your build selection",
        "Dust reduction system (DRS)",
        "Roll-out awning",
        "Full length tunnel boot with lights inside",
        "Entertainment hatch with TV bracket, antenna and 12V and 240V power outlets (in external pantry table)",
        "Premium 3-point locking system with SecuraMesh door",
        "Built-in external generator compartment (if applicable)",
        "Wheel arch with aluminium checker plate armor moulds",
        "External gas bayonet to the awning side of the caravan for BBQ",
        "Anderson plug to charge battery while driving",
        "External grab handle with push button LED light",
        "External table with built in pantry with ally extrusions",
      ],
      external: [
        "Aluminum composite outside walls",
        "Extra high flat plate for protection with metal extrusions & cappings",
        "Premium, one-piece, fibreglass roof",
        "One-piece floor as per your build selection",
        "Dust reduction system (DRS)",
        "Roll-out awning",
        "Full length tunnel boot with lights inside",
        "Entertainment hatch with TV bracket, antenna and 12V and 240V power outlets (in external pantry table)",
        "Premium 3-point locking system with SecuraMesh door",
        "Built-in external generator compartment (if applicable)",
        "Wheel arch with aluminium checker plate armor moulds",
        "External gas bayonet to the awning side of the caravan for BBQ",
        "Anderson plug to charge battery while driving",
        "External grab handle with push button LED light",
        "External table with built in pantry with ally extrusions",
      ],
      interior: [
        "Deluxe 6’2” innerspring pillow-top mattress",
        "Large size double glazed windows",
        "Internal ‘Black Pack’ consisting of black sink, tapware, shower trim, rail and fittings, cupboard door & drawer catches",
        "Stylish waterfall bench top",
        "Nooks beside master bed with 240V & USB, USB-C outlets for electronic device charging",
        "Comfortable dual density lounges with premium automotive grade upholstery",
        "Recess footrest to dinette seats (as per floor plan)",
        "Soft close metal side drawers",
        "Premium brushed door & drawer catches (as per your build selection)",
        "Block out blinds and pull down mesh screens to all windows",
        "Recessed stove cover with laminated lid over stove",
        "Pull-out pantries (as per floor plan)",
        "Premium acrylic splash-backs",
        "Large stylish grab handle on entry wall at door",
        "Premium quality ensuite mirror with additional magnifying glass",
        "Fire extinguisher",
        "Bin drawer & cutlery drawer",
      ],
      internal: [
        "Deluxe 6’2” innerspring pillow-top mattress",
        "Large size double glazed windows",
        "Internal ‘Black Pack’ consisting of black sink, tapware, shower trim, rail and fittings, cupboard door & drawer catches",
        "Stylish waterfall bench top",
        "Nooks beside master bed with 240V & USB, USB-C outlets for electronic device charging",
        "Comfortable dual density lounges with premium automotive grade upholstery",
        "Recess footrest to dinette seats (as per floor plan)",
        "Soft close metal side drawers",
        "Premium brushed door & drawer catches (as per your build selection)",
        "Block out blinds and pull down mesh screens to all windows",
        "Recessed stove cover with laminated lid over stove",
        "Pull-out pantries (as per floor plan)",
        "Premium acrylic splash-backs",
        "Large stylish grab handle on entry wall at door",
        "Premium quality ensuite mirror with additional magnifying glass",
        "Fire extinguisher",
        "Bin drawer & cutlery drawer",
      ],
      electrical: [
        "800W of solar power (4 x 200W panels)",
        "ARIZON 2 x 200Ah high discharge lithium batteries (chassis mounted)",
        "VICTRON BMS with Micro touch plus 90 12v board",
        "3000 VA Victron inverter",
        "External rear camera",
        "Front & rear external LED light bars",
        "Anti-dazzle LED strip light around the underbody of the caravan",
        "Internal LED bulkhead lighting",
        "LED reading lights at bed head & dinette with USB & USB-C output",
        "Remote LED lights throughout the van",
        "Premium quality roof hatch with LED lights",
        "Rear LED tail lights",
        "Radio antenna",
      ],
      plumbing: [
        "285L of drinking water capacity (3 x 95L tanks)",
        "12V water pump",
        "95L grey water tank (with large water outlet)",
        "External hot / cold shower",
        "2 x 9Kg gas bottles",
        "Gas / electric hot water system",
        "Digital water tank level display",
        "Ceramic inlay cassette toilet",
        "Flick mixer taps throughout",
        "Hidden plumbing and waste lines inside cabinetry (wherever possible)",
        "Lockable water filler to each water tank",
        "Tap on A Frame with guard",
      ],
      chassis: [
        "Independent coil spring (3T single axle & 3.5T tandem axle)",
        "265/75/R16 premium mud terrain tyres on load-rated alloys",
        "12” drum brakes",
        "Large front UNI 20 flat plate toolbox with gas bottles inside",
        "50cm A-frame extension with front stone guard",
        "DO35 Cruisemaster articulating coupling",
        "Supagal chassis made with Australian RHS steel",
        "6” drawbar with 4” chassis and 4” chassis raiser",
        "Rear 3 arm bumper bar with wood box",
        "Double alloy entry step",
        "Mud flaps to avoid stones",
      ],
      appliances: [
        "Dometic reverse cycle air-conditioner",
        "Thetford T2208c 221L compressor fridge 12V",
        "Premium front loader 3.5 kg washing machine (layout dependent)",
        "24” smart TV (12V)",
        "Dome TV antenna",
        "4 in 1 microwave/air fryer",
        "Portable induction (10A) with designated double power points",
        "Bluetooth sound system with internal & external speakers",
        "Smoke alarm",
      ],
      offGrid: [
        "High-capacity solar power",
        "Large water capacity",
        "Premium lithium battery",
        "Advanced charging system",
      ],
    },
    layouts: ["Island Bed", "Side Bed"],
    isFeatured: true,
    specs: {
      length: "6.4m",
      width: "2.4m",
      height: "2.9m",
      tare: "2,500kg",
      atm: "3,400kg",
      sleeps: 4,
      chassis: "Supagal chassis made with Australian RHS steel",
      suspension: "Independent coil spring",
      brakes: "12” drum brakes",
      wheels: "265/75/R16 premium mud terrain tyres on load-rated alloys",
    },
    interiorFeatures: [
      "Deluxe 6’2” innerspring pillow-top mattress",
      "Large size double glazed windows",
      "Internal ‘Black Pack’ consisting of black sink, tapware, shower trim, rail and fittings, cupboard door & drawer catches",
      "Stylish waterfall bench top",
      "Nooks beside master bed with 240V & USB, USB-C outlets for electronic device charging",
      "Comfortable dual density lounges with premium automotive grade upholstery",
      "Recess footrest to dinette seats (as per floor plan)",
      "Soft close metal side drawers",
      "Premium brushed door & drawer catches (as per your build selection)",
      "Block out blinds and pull down mesh screens to all windows",
      "Recessed stove cover with laminated lid over stove",
      "Pull-out pantries (as per floor plan)",
      "Premium acrylic splash-backs",
      "Large stylish grab handle on entry wall at door",
      "Premium quality ensuite mirror with additional magnifying glass",
      "Fire extinguisher",
      "Bin drawer & cutlery drawer",
    ],
    exteriorFeatures: [
      "Aluminum composite outside walls",
      "Extra high flat plate for protection with metal extrusions & cappings",
      "Premium, one-piece, fibreglass roof",
      "One-piece floor as per your build selection",
      "Dust reduction system (DRS)",
      "Roll-out awning",
      "Full length tunnel boot with lights inside",
      "Entertainment hatch with TV bracket, antenna and 12V and 240V power outlets (in external pantry table)",
      "Premium 3-point locking system with SecuraMesh door",
      "Built-in external generator compartment (if applicable)",
      "Wheel arch with aluminium checker plate armor moulds",
      "External gas bayonet to the awning side of the caravan for BBQ",
      "Anderson plug to charge battery while driving",
      "External grab handle with push button LED light",
      "External table with built in pantry with ally extrusions",
    ],
    electricals: [
      "800W of solar power (4 x 200W panels)",
      "ARIZON 2 x 200Ah high discharge lithium batteries (chassis mounted)",
      "VICTRON BMS with Micro touch plus 90 12v board",
      "3000 VA Victron inverter",
      "External rear camera",
      "Front & rear external LED light bars",
      "Anti-dazzle LED strip light around the underbody of the caravan",
      "Internal LED bulkhead lighting",
      "LED reading lights at bed head & dinette with USB & USB-C output",
      "Remote LED lights throughout the van",
      "Premium quality roof hatch with LED lights",
      "Rear LED tail lights",
      "Radio antenna",
    ],
    images: [...XPLORE_NEW_GALLERY],
  },
  "tonka": {
    id: "tonka",
    name: "Tonka",
    tagline: "Built Tough, Built Right",
    category: "off-road",
    sizes: ["20'", "22'"],
    startingPrice: 118000,
    heroImage: TONKA_GALLERY[0],
    gallery: [...TONKA_GALLERY],
    highlights: {
      solar: "300W",
      battery: "200Ah Lithium",
      water: "180L",
      inverter: "2000W Pure Sine",
      suspension: "Independent Trailing Arm",
    },
    shortDescription: "Rugged off-grid caravan built to handle any adventure.",
    description: "The Tonka lives up to its name - built tough and built right. This robust off-grid caravan is designed for those who don't compromise on quality and need a vehicle that can handle the most challenging terrains.",
    idealFor: "Rugged adventurers, off-grid enthusiasts, quality seekers",
    type: "offroad",
    features: {
      exterior: [
        "Aluminum composite outside walls",
        "Extra high raptor coated bottom panels for protection",
        "Premium, one-piece, fiberglass roof",
        "Roll-out awning",
        "Full length tunnel boot with lights inside",
        "External Kitchen pantry, shelf & alloy table",
        "Entertainment hatch with TV bracket, antenna and 12V and 240V power outlets (inside ext-table)",
        "Premium 3-point locking door with midge screens",
        "Built-in external generator compartment (as per floor plan)",
        "External gas bayonet to the awning side of the caravan for BBQ",
        "Anderson plug to charge battery while driving",
        "External grab handle with push button LED light",
        "Premium quality picnic table with LED lights",
      ],
      external: [
        "Aluminum composite outside walls",
        "Extra high raptor coated bottom panels for protection",
        "Premium, one-piece, fiberglass roof",
        "Roll-out awning",
        "Full length tunnel boot with lights inside",
        "External Kitchen pantry, shelf & alloy table",
        "Entertainment hatch with TV bracket, antenna and 12V and 240V power outlets (inside ext-table)",
        "Premium 3-point locking door with midge screens",
        "Built-in external generator compartment (as per floor plan)",
        "External gas bayonet to the awning side of the caravan for BBQ",
        "Anderson plug to charge battery while driving",
        "External grab handle with push button LED light",
        "Premium quality picnic table with LED lights",
      ],
      interior: [
        "Deluxe 6’2” innerspring pillow-top mattress",
        "Large size double glazed windows",
        "Internal ‘Black Pack’ consisting of black sink, tapware, shower trim, rail and fittings, cupboard door & drawer catches",
        "Stylish waterfall bench top",
        "Nooks beside master bed with 240V & USB-C outlets for electronic device charging",
        "Comfortable dual density lounges with premium automotive grade upholstery",
        "Recess footrest to dinette seats (as per floor plan)",
        "Soft close drawers",
        "Premium brushed door & drawer catches (as per your build selection)",
        "Block out blinds and pulldown mesh screens to all windows",
        "Recessed stove cover with laminated lid over stove",
        "Pull-out pantries (as per floor plan)",
        "Premium acrylic splash-backs",
        "Large stylish grab handle on entry wall at door",
        "Premium quality ensuite mirror with additional magnifying glass",
        "Fire extinguisher",
      ],
      internal: [
        "Deluxe 6’2” innerspring pillow-top mattress",
        "Large size double glazed windows",
        "Internal ‘Black Pack’ consisting of black sink, tapware, shower trim, rail and fittings, cupboard door & drawer catches",
        "Stylish waterfall bench top",
        "Nooks beside master bed with 240V & USB-C outlets for electronic device charging",
        "Comfortable dual density lounges with premium automotive grade upholstery",
        "Recess footrest to dinette seats (as per floor plan)",
        "Soft close drawers",
        "Premium brushed door & drawer catches (as per your build selection)",
        "Block out blinds and pulldown mesh screens to all windows",
        "Recessed stove cover with laminated lid over stove",
        "Pull-out pantries (as per floor plan)",
        "Premium acrylic splash-backs",
        "Large stylish grab handle on entry wall at door",
        "Premium quality ensuite mirror with additional magnifying glass",
        "Fire extinguisher",
      ],
      electrical: [
        "1000W of solar power (5 x 200W panels) 24V",
        "2x230Ah Arizon Lithium batteries (24v)",
        "Explorer plus 24V Victron BMS",
        "5000VA (24V) Victron inverter",
        "Positive pressure, anti-dust system",
        "Additional Anderson plug for portable solar input",
        "External rear camera",
        "Front & rear external LED light bars",
        "Anti-dazzle LED strip light around the underbody of the caravan",
        "Internal LED bulkhead lighting",
        "LED reading lights at bed head & dinette with USB & USB-C output",
        "Remote LED lights throughout the van",
        "Premium quality roof hatches with LED lights",
        "Rear LED tail lights",
        "Radio antenna",
      ],
      plumbing: [
        "285L of drinking water capacity (3 x 95L tanks)",
        "2 water pump",
        "95L gray water tank with large water outlet",
        "External hot / cold shower",
        "2 x 9Kg gas bottles",
        "Gas / electric hot water system",
        "Digital water tank level display",
        "Ceramic inlay cassette toilet",
        "Flick mixer taps throughout",
        "Hidden plumbing and waste lines inside cabinetry (wherever possible)",
        "Lockable water filler to each water tank",
      ],
      chassis: [
        "Cruisemaster ATX base next gen air control airbags BCS 4500kg",
        "285/70/R17 Premium mud terrain tyres on load-rated alloy rims",
        "Ventilated disc brakes",
        "GAC Super front box with Weber slide, generator slide, jerry can holder, table & chairs storage section",
        "50cm A-frame extension with front stone guard",
        "DO45 articulating coupling",
        "GAC exclusive raptor coated Truss chassis with removeable laser cut aluminium panels",
        "Underbody checker plate protection",
        "Stylish rear bumper bar with drawer",
        "Double alloy entry step",
        "Mud flaps to avoid stones",
      ],
      appliances: [
        "Dometic reverse cycle air-conditioner",
        "Thetford 274L compressor fridge",
        "Premium front loader 3.5 kg washing machine (layout dependent)",
        "32\" Smart TV (12V)",
        "Dome style TV antenna",
        "4 in 1 microwave / air fryer",
        "Portable induction (10A) with designated double power points",
        "Bluetooth sound system with internal & external speakers",
        "Smoke alarm",
        "2 x 12v fans",
      ],
      offGrid: [
        "High-capacity solar power",
        "Large water capacity",
        "Lithium battery",
        "DC-DC charging",
      ],
    },
    layouts: ["Island Bed", "Side Bed"],
    isFeatured: true,
    specs: {
      length: "6.1m",
      width: "2.4m",
      height: "2.9m",
      tare: "2,400kg",
      atm: "3,300kg",
      sleeps: 4,
      chassis: "GAC exclusive raptor coated Truss chassis",
      suspension: "Cruisemaster ATX base next gen air control airbags",
      brakes: "Ventilated disc brakes",
      wheels: "285/70/R17 Premium mud terrain tyres on load-rated alloy rims",
    },
    interiorFeatures: [
      "Deluxe 6’2” innerspring pillow-top mattress",
      "Large size double glazed windows",
      "Internal ‘Black Pack’ consisting of black sink, tapware, shower trim, rail and fittings, cupboard door & drawer catches",
      "Stylish waterfall bench top",
      "Nooks beside master bed with 240V & USB-C outlets for electronic device charging",
      "Comfortable dual density lounges with premium automotive grade upholstery",
      "Recess footrest to dinette seats (as per floor plan)",
      "Soft close drawers",
      "Premium brushed door & drawer catches (as per your build selection)",
      "Block out blinds and pulldown mesh screens to all windows",
      "Recessed stove cover with laminated lid over stove",
      "Pull-out pantries (as per floor plan)",
      "Premium acrylic splash-backs",
      "Large stylish grab handle on entry wall at door",
      "Premium quality ensuite mirror with additional magnifying glass",
      "Fire extinguisher",
    ],
    exteriorFeatures: [
      "Aluminum composite outside walls",
      "Extra high raptor coated bottom panels for protection",
      "Premium, one-piece, fiberglass roof",
      "Roll-out awning",
      "Full length tunnel boot with lights inside",
      "External Kitchen pantry, shelf & alloy table",
      "Entertainment hatch with TV bracket, antenna and 12V and 240V power outlets (inside ext-table)",
      "Premium 3-point locking door with midge screens",
      "Built-in external generator compartment (as per floor plan)",
      "External gas bayonet to the awning side of the caravan for BBQ",
      "Anderson plug to charge battery while driving",
      "External grab handle with push button LED light",
      "Premium quality picnic table with LED lights",
    ],
    electricals: [
      "1000W of solar power (5 x 200W panels) 24V",
      "2x230Ah Arizon Lithium batteries (24v)",
      "Explorer plus 24V Victron BMS",
      "5000VA (24V) Victron inverter",
      "Positive pressure, anti-dust system",
      "Additional Anderson plug for portable solar input",
      "External rear camera",
      "Front & rear external LED light bars",
      "Anti-dazzle LED strip light around the underbody of the caravan",
      "Internal LED bulkhead lighting",
      "LED reading lights at bed head & dinette with USB & USB-C output",
      "Remote LED lights throughout the van",
      "Premium quality roof hatches with LED lights",
      "Rear LED tail lights",
      "Radio antenna",
    ],
    images: [...TONKA_GALLERY],
  },
  "paragon": {
    id: "paragon",
    name: "Paragon",
    tagline: "Motorhome Excellence",
    category: "motorhome",
    sizes: ["24'", "26'"],
    startingPrice: 180000,
    heroImage: "/caravan/CaravanImage(D1V1C2).png",
    gallery: ["/caravan/CaravanImage(D1V1C2).png", "/caravan/CaravanImage(D1V1C1).webp", "/caravan/CaravanImage(D1V1C5).webp"],
    highlights: {
      solar: "400W",
      battery: "300Ah Lithium",
      water: "250L",
      inverter: "3000W Pure Sine",
      suspension: "Air Suspension",
    },
    shortDescription: "Premium motorhome with luxury features and spacious living.",
    description: "The Paragon represents the ultimate in motorhome luxury. With spacious interiors, premium finishes, and all the amenities you could want, this motorhome is your home away from home.",
    idealFor: "Luxury travelers, extended trips, comfort seekers",
    type: "touring",
    features: {
      exterior: [
        "Full external shower with hot water",
        "Roll-out awning (5m)",
        "External speakers with Bluetooth",
        "Roof racks",
        "External BBQ point",
        "External gas bayonet",
        "LED exterior lighting system",
        "Large external storage compartments",
      ],
      interior: [
        "Queen-size bed with premium mattress",
        "Full kitchen with oven and cooktop",
        "Large fridge/freezer (250L)",
        "Separate toilet and shower",
        "Spacious lounge area",
        "TV mounting point",
        "Ducted air conditioning",
        "Premium finishes throughout",
        "Ample storage throughout",
      ],
      electrical: [
        "300Ah lithium battery system",
        "400W solar panels",
        "50A DC-DC charger",
        "3000W pure sine wave inverter",
        "Advanced battery management system",
        "12V/240V dual power system",
      ],
      offGrid: [
        "High-capacity solar power",
        "Large water capacity",
        "Premium lithium battery",
        "Full off-grid capability",
      ],
    },
    layouts: ["Rear Bed", "Island Bed", "Front Lounge"],
    isFeatured: true,
    specs: {
      length: "7.9m",
      width: "2.5m",
      height: "3.2m",
      tare: "3,200kg",
      atm: "4,500kg",
      sleeps: 4,
      chassis: "Heavy-duty motorhome chassis",
      suspension: "Air suspension system",
      brakes: "Hydraulic disc brakes",
      wheels: "16\" alloy wheels",
    },
    interiorFeatures: [
      "Queen-size bed with premium mattress",
      "Full kitchen with oven and cooktop",
      "Large fridge/freezer (250L)",
      "Separate toilet and shower",
      "Spacious lounge area",
      "TV mounting point",
      "Ducted air conditioning",
      "Premium finishes throughout",
      "Ample storage throughout",
    ],
    exteriorFeatures: [
      "Full external shower with hot water",
      "Roll-out awning (5m)",
      "External speakers with Bluetooth",
      "Roof racks",
      "External BBQ point",
      "External gas bayonet",
      "LED exterior lighting system",
      "Large external storage compartments",
    ],
    electricals: [
      "300Ah lithium battery system",
      "400W solar panels",
      "50A DC-DC charger",
      "3000W pure sine wave inverter",
      "Advanced battery management system",
      "12V/240V dual power system",
    ],
    images: ["/caravan/CaravanImage(D1V1C2).png", "/caravan/CaravanImage(D1V1C1).webp", "/caravan/CaravanImage(D1V1C5).webp"],
  },
};

export default function ModelDetail() {
  const params = useParams();
  const id = (params.id as string)?.toLowerCase();
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroGalleryIndex, setHeroGalleryIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"chassis" | "build" | "construction">("chassis");
  const [activeFeatureTab, setActiveFeatureTab] = useState<"electrical" | "chassis" | "appliances" | "internal" | "external" | "plumbing">("electrical");

  useEffect(() => {
    setHeroGalleryIndex(0);
  }, [id]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const caravan = caravanData[id];

  if (!caravan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-display text-foreground mb-4">Model Not Found</h1>
          <Link href="/" className="text-primary hover:underline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const modelCode = caravan.sizes[0]?.replace(/['"]/g, "").substring(0, 4) || caravan.name.substring(0, 4).toUpperCase();
  const baseHeroSrc = typeof caravan.heroImage === "string" ? caravan.heroImage : (caravan.heroImage as any).src || caravan.heroImage;
  const heroSidePanelGallery = HERO_SIDE_PANEL_MODEL_IDS.has(id)
    ? (caravan.gallery as string[]).filter((s): s is string => typeof s === "string")
    : null;
  const showHeroSidePanel = Boolean(heroSidePanelGallery && heroSidePanelGallery.length > 1);
  const heroImageSrc =
    heroSidePanelGallery?.length ? heroSidePanelGallery[heroGalleryIndex] ?? baseHeroSrc : baseHeroSrc;

  /** Tonka cutouts read smaller in the fixed hero frame — give them a bit more viewport height */
  const heroImageViewportClass =
    id === "tonka"
      ? "h-[54vh] sm:h-[66vh] md:h-[80vh]"
      : "h-[50vh] sm:h-[60vh] md:h-[75vh]";

  const specItems = [
    { icon: Sun, label: "Solar", value: caravan.highlights.solar },
    { icon: Battery, label: "Battery", value: caravan.highlights.battery },
    { icon: Droplets, label: "Water", value: caravan.highlights.water },
    { icon: Zap, label: "Inverter", value: caravan.highlights.inverter },
    { icon: Truck, label: "Suspension", value: caravan.highlights.suspension },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section with Split Background */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden pt-[73px]">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-[65%] bg-gradient-to-b from-gray-800 via-gray-900 to-black" />
          <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-black">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
          </div>
        </div>

        {/* Watermark */}
        <motion.div
          style={{ y: watermarkY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span className="font-display text-[20vw] md:text-[25vw] font-bold text-white opacity-[0.06] tracking-tighter whitespace-nowrap">
            {caravan.name}
          </span>
        </motion.div>


        {/* Product Image — padding clears absolute breadcrumb / logo / tagline */}
        <div className="relative z-10 pt-44 md:pt-48">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`relative mx-auto px-4 ${showHeroSidePanel ? "max-w-7xl" : "max-w-6xl"}`}
          >
            <div
              className={`relative ${showHeroSidePanel ? "flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4 xl:gap-5" : ""}`}
            >
              <div className={`relative ${showHeroSidePanel ? "flex-1 min-w-0" : ""}`}>
                {/* Fixed viewport height so swapping gallery images does not resize the page */}
                <div className={`relative z-10 flex w-full items-center justify-center ${heroImageViewportClass}`}>
                  <img
                    src={heroImageSrc}
                    alt={caravan.name}
                    className="h-full w-full object-contain object-center drop-shadow-2xl"
                    style={{ filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.3))" }}
                  />
                </div>
                <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-gradient-to-b from-black/30 via-black/20 to-transparent blur-xl" />
              </div>
              {showHeroSidePanel && heroSidePanelGallery && (
                <div
                  className="flex flex-row lg:flex-col gap-1.5 sm:gap-2 shrink-0 justify-center lg:justify-center w-[68px] sm:w-[76px] lg:w-20 xl:w-[5.25rem] overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 px-1 lg:px-0 -mx-1 lg:mx-0"
                  role="tablist"
                  aria-label={`${caravan.name} photo gallery`}
                >
                  {heroSidePanelGallery.map((thumbSrc, idx) => (
                    <button
                      key={thumbSrc}
                      type="button"
                      role="tab"
                      aria-selected={heroGalleryIndex === idx}
                      aria-label={`View image ${idx + 1} of ${heroSidePanelGallery.length}`}
                      onClick={() => setHeroGalleryIndex(idx)}
                      className={`relative h-[60px] w-[60px] sm:h-[68px] sm:w-[68px] lg:h-[3.25rem] lg:w-full lg:aspect-square shrink-0 rounded-md overflow-hidden border-2 transition-all bg-zinc-900/80 ${
                        heroGalleryIndex === idx
                          ? "border-accent ring-1 ring-accent/40"
                          : "border-white/20 hover:border-white/40 opacity-90 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={thumbSrc}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>


        {/* Breadcrumb and Model Name Section */}
        <div className="absolute top-[90px] md:top-[100px] left-0 right-0 z-20 mt-2 md:mt-5">
          <div className="container-wide">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-6 xl:col-span-5">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-gray-400 mb-4" aria-label="Breadcrumb">
                  <Link
                    href="/"
                    className="inline-flex items-center hover:text-white transition-colors"
                  >
                    <Home className="w-4 h-4" />
                  </Link>
                  <span className="text-gray-500">/</span>
                  <Link
                    href={`/caravans?category=${caravan.category === "off-road" ? "off-road" : caravan.type || "touring"}`}
                    className="hover:text-white transition-colors"
                  >
                    {getCategoryName(caravan.category, caravan.type, caravan.id)}
                  </Link>
                  <span className="text-gray-500">/</span>
                  <span className="text-white">{caravan.name}</span>
                </nav>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="flex flex-col"
                >
                  <span className="text-accent text-sm font-display uppercase tracking-wider leading-none mb-3 md:mb-0 md:-mt-1">
                    {caravan.id === "xplora"
                      ? "OFF-ROAD"
                      : caravan.id === "gravity"
                        ? "SEMI OFF-GRID"
                        : caravan.category === "off-road"
                          ? "OFF-GRID"
                          : caravan.category === "family"
                            ? "FAMILY"
                            : "On-Road"}
                  </span>
                  <div className="relative w-full max-w-xs h-16 md:h-20 lg:h-24 mt-0 md:-mt-1 mb-3 md:mb-0">
                    <Image
                      src={getModelLogo(caravan.name)}
                      alt={`${caravan.name} Logo`}
                      fill
                      className="object-contain object-left"
                      priority
                    />
                  </div>
                  <p className="text-xl text-gray-300 mt-0 md:-mt-1 leading-tight">{caravan.tagline}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Key Specifications Section - Porsche Style */}
      <section className="relative z-30 bg-black py-10 md:py-14">
        <div className="container-wide">
          {/* Header with Badge and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Performance <span className="text-accent">Highlights</span>
            </h2>
            <p className="text-white text-lg whitespace-nowrap">
              Discover the essential specifications that make this model perfect for your adventure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            {/* Metrics on the left */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-display font-bold text-white mb-1 leading-[1.15] max-w-xl mx-auto lg:mx-0">
                  {getPerformanceHighlightsSuspension(caravan.id, caravan.specs)}
                </p>
                <p className="text-sm md:text-base text-gray-300 font-normal">
                  Suspension
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {(() => {
                  const second = getPerformanceSecondMetric(caravan.id, caravan.specs.sleeps);
                  if (second.kind === "custom") {
                    return (
                      <>
                        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-1 leading-tight">
                          {second.value}
                        </p>
                        <p className="text-sm md:text-base text-gray-300 font-normal">{second.label}</p>
                      </>
                    );
                  }
                  return (
                    <>
                      <p className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-1">
                        <AnimatedCount
                          value={second.sleeps.toString()}
                          suffix="people"
                          duration={2}
                          delay={0.2}
                        />
                      </p>
                      <p className="text-sm md:text-base text-gray-300 font-normal">Sleeps</p>
                    </>
                  );
                })()}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <p className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-1">
                  <AnimatedCount value={caravan.highlights.water} duration={2} delay={0.3} />
                </p>
                <p className="text-sm md:text-base text-gray-300 font-normal">
                  Water Capacity
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <p className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-1">
                  <AnimatedCount value={caravan.highlights.solar} duration={2} delay={0.4} />
                </p>
                <p className="text-sm md:text-base text-gray-300 font-normal">
                  Solar Power
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="pt-4 flex justify-center lg:justify-start"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-black"
                  asChild
                >
                  <a href="#specifications">View all technical details</a>
                </Button>
              </motion.div>
            </div>

            {/* Model Image on the right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="lg:col-span-3 flex items-center justify-center"
            >
              <div className="relative w-full max-w-4xl aspect-square">
                <img
                  src={heroImageSrc}
                  alt={caravan.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interior & Exterior Section */}
      <section className="bg-black py-16 md:py-20">
        <div className="container-wide">
          {/* Exterior Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 md:mb-32"
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
              {/* Text Content */}
              <div className="space-y-6 order-2 md:order-1">
                <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">
                  EXTERIOR
                </Badge>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  LUXURY MEETS <span className="text-accent">ADVENTURE ON THE GO</span>
                  <br />
                </h2>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  The {caravan.name} combines premium craftsmanship with rugged capability. Built with a full AL+ aluminium frame, fibreglass walls, and high-grade insulation, it's engineered to conquer Australia's most challenging terrains while maintaining its sophisticated aesthetic.
                </p>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  Premium features come standard, including Front and Rear Styling Packs, Stealth Solar Bracket, and German marine-grade composite panels. Available in smooth or checkerplate finishes with a range of colours to match your adventurous spirit.
                </p>
              </div>
              {/* Image Content */}
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden order-1 md:order-2">
                <Image
                  src="/home/HomeHeader(D1V1C2).jpg"
                  alt={`${caravan.name} Exterior`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Interior Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
              {/* Image Content — carousel from /public/caravaninterior */}
              <div className="relative w-full min-w-0 mt-6 md:mt-14 lg:mt-16">
                <InteriorComfortCarousel modelName={caravan.name} />
              </div>
              {/* Text Content */}
              <div className="space-y-6">
                <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">
                  INTERIOR
                </Badge>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  REFINED COMFORT
                  <br />
                  <span className="text-accent">ON EVERY JOURNEY</span>
                </h2>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  Step inside the {caravan.name} and discover a world where luxury meets adventure. Choose from expansive club lounges, dinettes, or straight lounges, each finished with premium leather upholstery and thoughtful design.
                </p>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  The kitchen delivers culinary excellence on the road with Thinscape benchtops, ambient lighting, and premium appliances. Abundant storage, diesel heating, and oversized ensuites ensure every moment is one of refined comfort.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technical Details Tabbed Section */}
      <section className="bg-black py-10 md:py-14">
        <div className="container-wide">
          {/* Tab Navigation */}
          <div className="border-b border-gray-800 mb-8">
            <div className="flex flex-wrap gap-4 md:gap-8">
              <button
                onClick={() => setActiveTab("chassis")}
                className={`relative pb-4 text-sm md:text-base font-medium uppercase tracking-wider transition-colors flex items-center gap-2 ${activeTab === "chassis"
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-300"
                  }`}
              >
                Chassis & Suspension
                {activeTab === "chassis" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  />
                )}
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab("build")}
                className={`relative pb-4 text-sm md:text-base font-medium uppercase tracking-wider transition-colors flex items-center gap-2 ${activeTab === "build"
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-300"
                  }`}
              >
                Build
                {activeTab === "build" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  />
                )}
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab("construction")}
                className={`relative pb-4 text-sm md:text-base font-medium uppercase tracking-wider transition-colors flex items-center gap-2 ${activeTab === "construction"
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-300"
                  }`}
              >
                Construction Methods
                {activeTab === "construction" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  />
                )}
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            {/* Text Content */}
            <div className="space-y-6">
              {activeTab === "chassis" && (
                <>
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    ENGINEERED FOR <span className="text-accent">UNQUESTIONABLE CONFIDENCE</span>
                  </h2>
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                    The {caravan.name}'s galvanised X-Guard chassis is paired with Cruisemaster ATX air suspension and the Body Control System (BCS) for automated balance and ride control. BOS stabiliser legs and jockey wheel give unmatched stability when stationary, while 17" Dirty Life wheels fitted with Cooper Rugged Trek tyres deliver traction and presence across any surface.
                  </p>
                </>
              )}
              {activeTab === "build" && (
                <>
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    PRECISION <span className="text-accent">CRAFTSMANSHIP</span>
                  </h2>
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                    Every {caravan.name} is built with meticulous attention to detail, using premium materials and time-tested construction techniques. Our expert craftsmen combine traditional skills with modern technology to create caravans that are engineered to last.
                  </p>
                </>
              )}
              {activeTab === "construction" && (
                <>
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    ADVANCED <span className="text-accent">CONSTRUCTION METHODS</span>
                  </h2>
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                    Our construction methods use advanced materials and precision engineering to create lightweight, incredibly strong structures. The {caravan.name} features state-of-the-art construction ensuring superior durability and structural integrity.
                  </p>
                  {/* Construction Technology Logos */}
                  <div className="flex items-center gap-6 md:gap-8 mt-6">
                    <Link href="/construction/timber-tech" className="flex-shrink-0 h-8 md:h-10 w-24 md:w-32 cursor-pointer flex items-center justify-center">
                      <Image
                        src="/constructiontypes/timbertechl.png"
                        alt="TimberTech"
                        width={120}
                        height={60}
                        className="h-full w-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                      />
                    </Link>
                    <Link href="/construction/ally-tech" className="flex-shrink-0 h-8 md:h-10 w-24 md:w-32 cursor-pointer flex items-center justify-center">
                      <Image
                        src="/constructiontypes/allytechl.png"
                        alt="AllyTech"
                        width={120}
                        height={60}
                        className="h-full w-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                      />
                    </Link>
                    <Link href="/construction/fiber-tech" className="flex-shrink-0 h-8 md:h-10 w-24 md:w-32 cursor-pointer flex items-center justify-center">
                      <Image
                        src="/constructiontypes/fibertechl.png"
                        alt="FiberTech"
                        width={120}
                        height={60}
                        className="h-full w-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                      />
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Image Content */}
            {activeTab === "construction" ? (
              <ConstructionMethodsImageCarousel />
            ) : (
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={
                    activeTab === "chassis"
                      ? "/aboutus/PC-IMAGE-105.JPG"
                      : "/caravaninterior/EDITED-08080.jpg"
                  }
                  alt={
                    activeTab === "chassis"
                      ? "Chassis and Suspension"
                      : "Precision craftsmanship"
                  }
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section — Command Center Design */}
      <section className="bg-black py-16 md:py-24" style={{ background: "linear-gradient(180deg, #000 0%, #0a0a0a 50%, #000 100%)" }}>
        <div className="container-wide">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-4">What's Included</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Features &amp; <span className="text-accent">Inclusions</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              Tap a category to explore every detail engineered into your {caravan.name}
            </p>
          </motion.div>

          {/* Category Selector — Pill bar on desktop, icon grid on mobile */}

          {/* Desktop: horizontal pill tab bar */}
          <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full p-1.5 mb-10 gap-1">
            {[
              { key: "electrical", label: "Electrical", Icon: Zap },
              { key: "chassis", label: "Chassis & Protection", Icon: Truck },
              { key: "appliances", label: "Appliances", Icon: ChefHat },
              { key: "internal", label: "Internal", Icon: Home },
              { key: "external", label: "External", Icon: Building2 },
              { key: "plumbing", label: "Plumbing", Icon: Droplets },
            ].map(({ key, label, Icon }) => {
              const isActive = activeFeatureTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveFeatureTab(key as "electrical" | "chassis" | "appliances" | "internal" | "external" | "plumbing")}
                  className="relative flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap"
                  style={{
                    background: isActive ? "#f59e0b" : "transparent",
                    color: isActive ? "#000" : "#9ca3af",
                  }}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Mobile: icon grid */}
          <div className="grid grid-cols-3 gap-3 mb-10 md:hidden">
            {[
              { key: "electrical", label: "Electrical", Icon: Zap, color: "#f59e0b" },
              { key: "chassis", label: "Chassis", Icon: Truck, color: "#f59e0b" },
              { key: "appliances", label: "Appliances", Icon: ChefHat, color: "#f59e0b" },
              { key: "internal", label: "Internal", Icon: Home, color: "#f59e0b" },
              { key: "external", label: "External", Icon: Building2, color: "#f59e0b" },
              { key: "plumbing", label: "Plumbing", Icon: Droplets, color: "#f59e0b" },
            ].map(({ key, label, Icon, color }, i) => (
              <motion.button
                key={key}
                onClick={() => setActiveFeatureTab(key as "electrical" | "chassis" | "appliances" | "internal" | "external" | "plumbing")}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: activeFeatureTab === key
                    ? `linear-gradient(135deg, ${color}22 0%, ${color}11 100%)`
                    : "rgba(255,255,255,0.03)",
                  borderColor: activeFeatureTab === key ? color : "rgba(255,255,255,0.08)",
                  boxShadow: activeFeatureTab === key ? `0 0 24px ${color}33, inset 0 1px 0 ${color}44` : "none",
                }}
                className="relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {activeFeatureTab === key && (
                  <div
                    className="absolute inset-0 opacity-20 blur-xl"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)` }}
                  />
                )}
                <div
                  className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: activeFeatureTab === key ? `${color}22` : "rgba(255,255,255,0.06)",
                    border: `1px solid ${activeFeatureTab === key ? color + "66" : "rgba(255,255,255,0.1)"}`,
                  }}
                >
                  <Icon
                    className="w-5 h-5 transition-all duration-300"
                    style={{ color: activeFeatureTab === key ? color : "#6b7280" }}
                  />
                </div>
                <span
                  className="relative z-10 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 leading-tight text-center"
                  style={{ color: activeFeatureTab === key ? "#fff" : "#6b7280" }}
                >
                  {label}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Feature Display Area */}
          {(() => {
            const tabConfig: Record<string, { label: string; Icon: typeof Zap; color: string; items: string[] }> = {
              electrical: {
                label: "Electrical",
                Icon: Zap,
                color: "#f59e0b",
                items: caravan.features.electrical,
              },
              chassis: {
                label: "Chassis & Protection",
                Icon: Truck,
                color: "#f59e0b",
                items: caravan.features.chassis || [
                  `Chassis: ${caravan.specs.chassis}`,
                  `Suspension: ${caravan.specs.suspension}`,
                  `Brakes: ${caravan.specs.brakes}`,
                  `Wheels: ${caravan.specs.wheels}`,
                ],
              },
              appliances: {
                label: "Appliances",
                Icon: ChefHat,
                color: "#f59e0b",
                items: caravan.features.appliances || caravan.features.interior.filter((f) =>
                  ["fridge", "microwave", "cooktop", "oven", "stove", "kitchen"].some((k) => f.toLowerCase().includes(k))
                ),
              },
              internal: {
                label: "Internal",
                Icon: Home,
                color: "#f59e0b",
                items: caravan.features.internal || caravan.features.interior.filter((f) =>
                  !["fridge", "microwave", "cooktop", "oven", "stove", "kitchen", "shower", "toilet", "bathroom"].some((k) => f.toLowerCase().includes(k))
                ),
              },
              external: {
                label: "External",
                Icon: Building2,
                color: "#f59e0b",
                items: caravan.features.external || caravan.features.exterior,
              },
              plumbing: {
                label: "Plumbing",
                Icon: Droplets,
                color: "#f59e0b",
                items: caravan.features.plumbing || [
                  ...caravan.features.interior.filter((f) =>
                    ["shower", "toilet", "bathroom", "ensuite"].some((k) => f.toLowerCase().includes(k))
                  ),
                  ...caravan.features.exterior.filter((f) =>
                    ["shower", "water"].some((k) => f.toLowerCase().includes(k))
                  ),
                  `Water Capacity: ${caravan.highlights.water}`,
                ],
              },
            };
            const tab = tabConfig[activeFeatureTab];
            if (!tab) return null;
            const { label, Icon, color, items } = tab;
            return (
              <motion.div
                key={activeFeatureTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #0d0d0d 0%, #111 100%)",
                  border: `1px solid ${color}22`,
                  boxShadow: `0 0 60px ${color}11`,
                }}
              >
                {/* Ghost icon watermark */}
                <div className="absolute top-6 right-6 pointer-events-none select-none" aria-hidden>
                  <Icon
                    className="w-48 h-48 md:w-64 md:h-64 opacity-[0.04]"
                    style={{ color }}
                  />
                </div>

                {/* Inner content */}
                <div className="relative z-10 p-8 md:p-12">
                  {/* Category heading row */}
                  <div className="flex items-center gap-4 mb-10">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}18`, border: `1px solid ${color}44` }}
                    >
                      <Icon className="w-6 h-6" style={{ color }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.25em] mb-0.5" style={{ color }}>
                        Category
                      </p>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-none">
                        {label}
                      </h3>
                    </div>
                    <div className="ml-auto hidden md:flex items-center gap-2 text-sm" style={{ color: color + "99" }}>
                      <Check className="w-4 h-4" />
                      <span>{items.length} features included</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px mb-10" style={{ background: `linear-gradient(90deg, ${color}44, transparent)` }} />

                  {/* Feature chips — one column on narrow screens so long copy wraps cleanly; two columns from md */}
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-3">
                    {items.map((feature, idx) => (
                      <motion.div
                        key={feature + idx}
                        initial={{ opacity: 0, scale: 0.98, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: idx * 0.04, duration: 0.3, ease: "easeOut" }}
                        className="group flex items-start gap-2.5 px-4 py-3 rounded-2xl cursor-default transition-all duration-300 w-full min-w-0"
                        style={{
                          background: `${color}0d`,
                          border: `1px solid ${color}22`,
                        }}
                        whileHover={{
                          background: `${color}1a`,
                          borderColor: `${color}55`,
                        }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                          style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                        />
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200 leading-snug text-left break-words [overflow-wrap:anywhere]">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom count badge — mobile */}
                  <div className="mt-8 flex md:hidden items-center gap-2 text-sm" style={{ color: color + "99" }}>
                    <Check className="w-4 h-4" />
                    <span>{items.length} features included</span>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </div>
      </section>

      {/* Specifications Section */}
      <section id="specifications" className="bg-black py-10 md:py-14">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Specifications
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
            >
              <h3 className="font-semibold text-white mb-4">Dimensions & Weights</h3>
              <dl className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <dt className="text-gray-400">Length</dt>
                  <dd className="font-medium text-white">{caravan.specs.length}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <dt className="text-gray-400">Width</dt>
                  <dd className="font-medium text-white">{caravan.specs.width}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <dt className="text-gray-400">Height</dt>
                  <dd className="font-medium text-white">{caravan.specs.height}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <dt className="text-gray-400">Tare Weight</dt>
                  <dd className="font-medium text-white">{caravan.specs.tare}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <dt className="text-gray-400">ATM</dt>
                  <dd className="font-medium text-white">{caravan.specs.atm}</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-gray-400">Sleeps</dt>
                  <dd className="font-medium text-white">{caravan.specs.sleeps}</dd>
                </div>
              </dl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
            >
              <h3 className="font-semibold text-white mb-4">Chassis & Running Gear</h3>
              <dl className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <dt className="text-gray-400">Chassis</dt>
                  <dd className="font-medium text-white text-right max-w-[60%]">{caravan.specs.chassis}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <dt className="text-gray-400">Suspension</dt>
                  <dd className="font-medium text-white text-right max-w-[60%]">{caravan.specs.suspension}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <dt className="text-gray-400">Brakes</dt>
                  <dd className="font-medium text-white text-right max-w-[60%]">{caravan.specs.brakes}</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-gray-400">Wheels</dt>
                  <dd className="font-medium text-white text-right max-w-[60%]">{caravan.specs.wheels}</dd>
                </div>
              </dl>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      {/* <ReviewsSection /> */}

      {/* CTA Strip */}
      <section className="bg-black py-10 md:py-14 border-t border-gray-800">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Make This Caravan Yours?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Get in touch with our team to discuss pricing, customisation options, and arrange your inspection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild>
                <Link href="/contact">Contact Us Today</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black" asChild>
                <Link href="/caravans">View Other Models</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </div>
  );
}
