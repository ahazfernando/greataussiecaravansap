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
    "20URER LITE": "/caravanmodels/euorerlitelogo.png",
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
const getCategoryName = (category: string, type: string): string => {
  if (category === "off-road" || type === "offroad") {
    return "Off-Road Range";
  }
  if (category === "family" || type === "family") {
    return "Family Range";
  }
  if (category === "touring" || type === "touring") {
    return "Touring Range";
  }
  return "Our Range";
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

// Mock data - in production this would come from a database
const caravanData: Record<string, Caravan> = {
  "outback-explorer-21": {
    id: "outback-explorer-21",
    name: "Outback Explorer 21",
    tagline: "Built for Serious Off-Road Adventures",
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
    shortDescription: "Built for serious off-road adventures with heavy-duty chassis and independent suspension.",
    description: "The Outback Explorer 21 is engineered for those who demand the best from their off-road caravan. Built on a heavy-duty galvanised chassis with independent trailing arm suspension, this caravan can handle the toughest Australian conditions while keeping you comfortable.",
    idealFor: "Off-road adventurers, remote camping, outback exploration",
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
    description: "The Striker hybrid model combines the best of both worlds - the comfort of a caravan with the flexibility of a hybrid design. Perfect for those who want to explore both on-road and off-road destinations.",
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
  "20urer-lite": {
    id: "20urer-lite",
    name: "20URER LITE",
    tagline: "Lightweight Caravan Excellence",
    category: "touring",
    sizes: ["20'"],
    startingPrice: 95000,
    heroImage: "/caravan/CaravanImage(D1V1C2).png",
    gallery: ["/caravan/CaravanImage(D1V1C2).png", "/caravan/CaravanImage(D1V1C1).webp", "/caravan/CaravanImage(D1V1C3).webp"],
    highlights: {
      solar: "200W",
      battery: "150Ah AGM",
      water: "150L",
      inverter: "1500W Pure Sine",
      suspension: "Single Axle Independent",
    },
    shortDescription: "Lightweight caravan model perfect for easy towing and comfortable travel.",
    description: "The 20URER LITE is designed for those who want a full-featured caravan without the weight. This lightweight model offers all the comforts of home while being easy to tow with a wide range of vehicles.",
    idealFor: "Couples, weekend travelers, easy towing enthusiasts",
    type: "touring",
    features: {
      exterior: [
        "Roll-out awning (3.5m)",
        "External shower",
        "Outdoor speakers",
        "LED exterior lights",
        "Gas bottle storage",
        "External BBQ point",
      ],
      interior: [
        "Queen-size bed",
        "Full kitchen with oven",
        "3-way fridge (160L)",
        "Separate toilet and shower",
        "Dinette conversion to bed",
        "LED lighting",
        "Roof-mounted air conditioning",
      ],
      electrical: [
        "150Ah AGM battery",
        "200W solar panel",
        "30A charger",
        "1500W pure sine wave inverter",
      ],
      offGrid: [
        "Solar power",
        "Adequate water capacity",
        "AGM battery",
        "Inverter power",
      ],
    },
    layouts: ["Dinette", "Fixed Bed"],
    isFeatured: true,
    specs: {
      length: "6.1m",
      width: "2.3m",
      height: "2.7m",
      tare: "1,800kg",
      atm: "2,500kg",
      sleeps: 2,
      chassis: "Lightweight galvanised steel",
      suspension: "Single axle independent",
      brakes: "Electric drum brakes",
      wheels: "15\" alloy wheels",
    },
    interiorFeatures: [
      "Queen-size bed",
      "Full kitchen with oven",
      "3-way fridge (160L)",
      "Separate toilet and shower",
      "Dinette conversion to bed",
      "LED lighting",
      "Roof-mounted air conditioning",
    ],
    exteriorFeatures: [
      "Roll-out awning (3.5m)",
      "External shower",
      "Outdoor speakers",
      "LED exterior lights",
      "Gas bottle storage",
      "External BBQ point",
    ],
    electricals: [
      "150Ah AGM battery",
      "200W solar panel",
      "30A charger",
      "1500W pure sine wave inverter",
    ],
    images: ["/caravan/CaravanImage(D1V1C2).png", "/caravan/CaravanImage(D1V1C1).webp", "/caravan/CaravanImage(D1V1C3).webp"],
  },
  "20urer": {
    id: "20urer",
    name: "20URER",
    tagline: "Premium Caravan Experience",
    category: "touring",
    sizes: ["20'", "22'"],
    startingPrice: 105000,
    heroImage: "/caravan/CaravanImage(D1V1C3).webp",
    gallery: ["/caravan/CaravanImage(D1V1C3).webp", "/caravan/CaravanImage(D1V1C1).webp", "/caravan/CaravanImage(D1V1C2).png"],
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
        "Full annexe walls",
        "Roll-out awning (4.5m)",
        "External BBQ point",
        "Bike rack compatible",
        "External shower",
        "Entertainment hatch",
        "LED awning lights",
        "Large external storage",
      ],
      interior: [
        "Queen-size bed with premium mattress",
        "Full kitchen with oven and cooktop",
        "Large fridge/freezer (200L)",
        "Separate toilet and shower",
        "Club lounge seating",
        "TV mounting point",
        "Ducted air conditioning",
        "Premium finishes throughout",
      ],
      electrical: [
        "180Ah AGM battery",
        "250W solar panel",
        "40A charger",
        "2000W pure sine wave inverter",
        "240V connections throughout",
      ],
      offGrid: [
        "Enhanced solar power",
        "Large water capacity",
        "AGM battery system",
        "Full inverter power",
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
      chassis: "Hot-dipped galvanised steel",
      suspension: "Tandem axle with leaf springs",
      brakes: "Electric drum brakes",
      wheels: "15\" alloy wheels",
    },
    interiorFeatures: [
      "Queen-size bed with premium mattress",
      "Full kitchen with oven and cooktop",
      "Large fridge/freezer (200L)",
      "Separate toilet and shower",
      "Club lounge seating",
      "TV mounting point",
      "Ducted air conditioning",
      "Premium finishes throughout",
    ],
    exteriorFeatures: [
      "Full annexe walls",
      "Roll-out awning (4.5m)",
      "External BBQ point",
      "Bike rack compatible",
      "External shower",
      "Entertainment hatch",
      "LED awning lights",
      "Large external storage",
    ],
    electricals: [
      "180Ah AGM battery",
      "250W solar panel",
      "40A charger",
      "2000W pure sine wave inverter",
      "240V connections throughout",
    ],
    images: ["/caravan/CaravanImage(D1V1C3).webp", "/caravan/CaravanImage(D1V1C1).webp", "/caravan/CaravanImage(D1V1C2).png"],
  },
  "gravity": {
    id: "gravity",
    name: "Gravity",
    tagline: "Off-Road Dominance",
    category: "off-road",
    sizes: ["21'", "24'"],
    startingPrice: 130000,
    heroImage: "/caravan/CaravanImage(D1V1C5).webp",
    gallery: ["/caravan/CaravanImage(D1V1C5).webp", "/caravan/CaravanImage(D1V1C1).webp", "/caravan/CaravanImage(D1V1C3).webp"],
    highlights: {
      solar: "400W",
      battery: "300Ah Lithium",
      water: "200L",
      inverter: "3000W Pure Sine",
      suspension: "Independent Trailing Arm",
    },
    shortDescription: "Ultimate off-road caravan built for the toughest Australian conditions.",
    description: "The Gravity is our most capable off-road caravan, engineered for serious adventurers who demand the absolute best. With heavy-duty construction, advanced suspension, and premium off-grid systems, the Gravity can take you anywhere.",
    idealFor: "Serious off-roaders, remote explorers, adventure enthusiasts",
    type: "offroad",
    features: {
      exterior: [
        "Full external shower with hot water",
        "Roll-out awning (4.5m)",
        "External speakers with Bluetooth",
        "Heavy-duty roof racks",
        "Dual jerry can holders",
        "External gas bayonet",
        "LED exterior lighting system",
        "Front and rear recovery points",
        "Stone guard protection",
      ],
      interior: [
        "Queen-size island bed with premium mattress",
        "Full kitchen with gas/electric cooktop and oven",
        "Large 3-way fridge/freezer (220L)",
        "Microwave oven",
        "Full ensuite with separate toilet and shower",
        "LED lighting throughout with dimmers",
        "Reverse cycle air conditioning",
        "Diesel heater with thermostat",
        "Premium cabinetry and finishes",
      ],
      electrical: [
        "300Ah lithium battery system",
        "400W solar panels with MPPT controller",
        "50A DC-DC charger",
        "3000W pure sine wave inverter",
        "Advanced battery management system",
        "12V/240V dual power system",
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
      chassis: "Heavy-duty galvanised steel with reinforcement",
      suspension: "Independent trailing arm with twin shock absorbers",
      brakes: "Electric drum brakes with breakaway system",
      wheels: "16\" alloy wheels with all-terrain tyres",
    },
    interiorFeatures: [
      "Queen-size island bed with premium mattress",
      "Full kitchen with gas/electric cooktop and oven",
      "Large 3-way fridge/freezer (220L)",
      "Microwave oven",
      "Full ensuite with separate toilet and shower",
      "LED lighting throughout with dimmers",
      "Reverse cycle air conditioning",
      "Diesel heater with thermostat",
      "Premium cabinetry and finishes",
    ],
    exteriorFeatures: [
      "Full external shower with hot water",
      "Roll-out awning (4.5m)",
      "External speakers with Bluetooth",
      "Heavy-duty roof racks",
      "Dual jerry can holders",
      "External gas bayonet",
      "LED exterior lighting system",
      "Front and rear recovery points",
      "Stone guard protection",
    ],
    electricals: [
      "300Ah lithium battery system",
      "400W solar panels with MPPT controller",
      "50A DC-DC charger",
      "3000W pure sine wave inverter",
      "Advanced battery management system",
      "12V/240V dual power system",
    ],
    images: ["/caravan/CaravanImage(D1V1C5).webp", "/caravan/CaravanImage(D1V1C1).webp", "/caravan/CaravanImage(D1V1C3).webp"],
  },
  "xplora": {
    id: "xplora",
    name: "Xplora",
    tagline: "Explore Without Limits",
    category: "off-road",
    sizes: ["19'", "21'"],
    startingPrice: 120000,
    heroImage: "/caravan/cfi_featured_image.png",
    gallery: ["/caravan/cfi_featured_image.png", "/caravan/CaravanImage(D1V1C1).webp", "/caravan/CaravanImage(D1V1C3).webp"],
    highlights: {
      solar: "350W",
      battery: "250Ah Lithium",
      water: "190L",
      inverter: "2500W Pure Sine",
      suspension: "Independent Trailing Arm",
    },
    shortDescription: "Adventure-ready caravan designed for exploration and discovery.",
    description: "The Xplora is built for those who want to explore the road less traveled. With robust construction, advanced off-grid capabilities, and thoughtful design, this caravan is your ticket to adventure.",
    idealFor: "Adventure seekers, off-road explorers, discovery enthusiasts",
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
        "Underbody protection",
      ],
      interior: [
        "Queen-size island bed",
        "Full kitchen with gas/electric cooktop",
        "3-way fridge/freezer (200L)",
        "Microwave oven",
        "Ensuite with toilet and shower",
        "LED lighting throughout",
        "Reverse cycle air conditioning",
        "Diesel heater",
        "Adventure-ready storage",
      ],
      electrical: [
        "250Ah lithium battery system",
        "350W solar panels",
        "45A DC-DC charger",
        "2500W pure sine wave inverter",
        "Battery management system",
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
      chassis: "Heavy-duty galvanised steel",
      suspension: "Independent trailing arm with twin shock absorbers",
      brakes: "Electric drum brakes with breakaway system",
      wheels: "16\" alloy wheels with all-terrain tyres",
    },
    interiorFeatures: [
      "Queen-size island bed",
      "Full kitchen with gas/electric cooktop",
      "3-way fridge/freezer (200L)",
      "Microwave oven",
      "Ensuite with toilet and shower",
      "LED lighting throughout",
      "Reverse cycle air conditioning",
      "Diesel heater",
      "Adventure-ready storage",
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
      "Underbody protection",
    ],
    electricals: [
      "250Ah lithium battery system",
      "350W solar panels",
      "45A DC-DC charger",
      "2500W pure sine wave inverter",
      "Battery management system",
    ],
    images: ["/caravan/cfi_featured_image.png", "/caravan/CaravanImage(D1V1C1).webp", "/caravan/CaravanImage(D1V1C3).webp"],
  },
  "tonka": {
    id: "tonka",
    name: "Tonka",
    tagline: "Built Tough, Built Right",
    category: "off-road",
    sizes: ["20'", "22'"],
    startingPrice: 118000,
    heroImage: "/caravan/CaravanImage(D1V1C1).webp",
    gallery: ["/caravan/CaravanImage(D1V1C1).webp", "/caravan/CaravanImage(D1V1C2).png", "/caravan/CaravanImage(D1V1C3).webp"],
    highlights: {
      solar: "300W",
      battery: "200Ah Lithium",
      water: "180L",
      inverter: "2000W Pure Sine",
      suspension: "Independent Trailing Arm",
    },
    shortDescription: "Rugged off-road caravan built to handle any adventure.",
    description: "The Tonka lives up to its name - built tough and built right. This robust off-road caravan is designed for those who don't compromise on quality and need a vehicle that can handle the most challenging terrains.",
    idealFor: "Rugged adventurers, off-road enthusiasts, quality seekers",
    type: "offroad",
    features: {
      exterior: [
        "Full external shower",
        "Roll-out awning (4m)",
        "External speakers",
        "Heavy-duty roof racks",
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
      tare: "2,400kg",
      atm: "3,300kg",
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
      "Heavy-duty roof racks",
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
  const [activeTab, setActiveTab] = useState<"chassis" | "build" | "construction">("chassis");
  const [activeFeatureTab, setActiveFeatureTab] = useState<"electrical" | "chassis" | "appliances" | "internal" | "external" | "plumbing">("electrical");

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const productY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

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
  const heroImageSrc = typeof caravan.heroImage === 'string' ? caravan.heroImage : (caravan.heroImage as any).src || caravan.heroImage;

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


        {/* Product Image */}
        <div className="relative z-10 pt-56 md:pt-32 lg:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: productY }}
            className="relative mx-auto max-w-6xl px-4"
          >
            <div className="relative">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <img
                  src={heroImageSrc}
                  alt={caravan.name}
                  className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] md:max-h-[75vh] object-contain mx-auto drop-shadow-2xl"
                  style={{ filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.3))" }}
                />
              </motion.div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-gradient-to-b from-black/30 via-black/20 to-transparent blur-xl" />
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
                    {getCategoryName(caravan.category, caravan.type)}
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
                    {caravan.category === "off-road" ? "OFF-ROAD" : caravan.category === "family" ? "FAMILY" : "TOURING"}
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
                <p className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-1">
                  <AnimatedCount value={caravan.specs.length} duration={2} delay={0.1} />
                </p>
                <p className="text-sm md:text-base text-gray-300 font-normal">
                  Length
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <p className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-1">
                  <AnimatedCount value={caravan.specs.sleeps.toString()} suffix="people" duration={2} delay={0.2} />
                </p>
                <p className="text-sm md:text-base text-gray-300 font-normal">
                  Sleeps
                </p>
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
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
              {/* Image Content */}
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/caravninfo/layouts.jpg"
                  alt={`${caravan.name} Interior`}
                  fill
                  className="object-cover"
                />
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
                className={`relative pb-4 text-sm md:text-base font-medium uppercase tracking-wider transition-colors flex items-center gap-2 ${
                  activeTab === "chassis"
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
                className={`relative pb-4 text-sm md:text-base font-medium uppercase tracking-wider transition-colors flex items-center gap-2 ${
                  activeTab === "build"
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
                className={`relative pb-4 text-sm md:text-base font-medium uppercase tracking-wider transition-colors flex items-center gap-2 ${
                  activeTab === "construction"
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
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={
                  activeTab === "chassis"
                    ? "/caravninfo/chasis.jpg"
                    : activeTab === "build"
                    ? "/caravninfo/layouts.jpg"
                    : "/caravninfo/Trooper_Platinum_TRP199_LC8161_105-2048x1366.jpg"
                }
                alt={
                  activeTab === "chassis"
                    ? "Chassis and Suspension"
                    : activeTab === "build"
                    ? "Build Details"
                    : "Construction Methods"
                }
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-black py-10 md:py-14">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Features & Inclusions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need for your next adventure
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-800 mb-8">
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
              <button
                onClick={() => setActiveFeatureTab("electrical")}
                className={`relative pb-4 text-sm md:text-base font-medium uppercase tracking-wider transition-colors flex items-center gap-2 ${
                  activeFeatureTab === "electrical"
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <Zap className="w-4 h-4" />
                Electrical
                {activeFeatureTab === "electrical" && (
                  <motion.div
                    layoutId="activeFeatureTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveFeatureTab("chassis")}
                className={`relative pb-4 text-sm md:text-base font-medium uppercase tracking-wider transition-colors flex items-center gap-2 ${
                  activeFeatureTab === "chassis"
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <Truck className="w-4 h-4" />
                Chassis
                {activeFeatureTab === "chassis" && (
                  <motion.div
                    layoutId="activeFeatureTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveFeatureTab("appliances")}
                className={`relative pb-4 text-sm md:text-base font-medium uppercase tracking-wider transition-colors flex items-center gap-2 ${
                  activeFeatureTab === "appliances"
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <ChefHat className="w-4 h-4" />
                Appliances
                {activeFeatureTab === "appliances" && (
                  <motion.div
                    layoutId="activeFeatureTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveFeatureTab("internal")}
                className={`relative pb-4 text-sm md:text-base font-medium uppercase tracking-wider transition-colors flex items-center gap-2 ${
                  activeFeatureTab === "internal"
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <Home className="w-4 h-4" />
                Internal
                {activeFeatureTab === "internal" && (
                  <motion.div
                    layoutId="activeFeatureTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveFeatureTab("external")}
                className={`relative pb-4 text-sm md:text-base font-medium uppercase tracking-wider transition-colors flex items-center gap-2 ${
                  activeFeatureTab === "external"
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <Building2 className="w-4 h-4" />
                External
                {activeFeatureTab === "external" && (
                  <motion.div
                    layoutId="activeFeatureTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveFeatureTab("plumbing")}
                className={`relative pb-4 text-sm md:text-base font-medium uppercase tracking-wider transition-colors flex items-center gap-2 ${
                  activeFeatureTab === "plumbing"
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <Droplets className="w-4 h-4" />
                Plumbing
                {activeFeatureTab === "plumbing" && (
                  <motion.div
                    layoutId="activeFeatureTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeFeatureTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800"
          >
              {activeFeatureTab === "electrical" && (
                <>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                    <Zap className="w-6 h-6 text-accent" />
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white">Electrical Specifications</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {caravan.features.electrical.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-accent/30 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-300 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {activeFeatureTab === "chassis" && (
                <>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                    <Truck className="w-6 h-6 text-accent" />
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white">Chassis Specifications</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      `Chassis: ${caravan.specs.chassis}`,
                      `Suspension: ${caravan.specs.suspension}`,
                      `Brakes: ${caravan.specs.brakes}`,
                      `Wheels: ${caravan.specs.wheels}`,
                    ].map((spec, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-accent/30 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-300 leading-relaxed">{spec}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {activeFeatureTab === "appliances" && (
                <>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                    <ChefHat className="w-6 h-6 text-accent" />
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white">Appliances</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {caravan.features.interior
                      .filter((feature) => 
                        feature.toLowerCase().includes("fridge") ||
                        feature.toLowerCase().includes("microwave") ||
                        feature.toLowerCase().includes("cooktop") ||
                        feature.toLowerCase().includes("oven") ||
                        feature.toLowerCase().includes("stove") ||
                        feature.toLowerCase().includes("kitchen")
                      )
                      .map((feature) => (
                        <div key={feature} className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-accent/30 transition-colors">
                          <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-300 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                  </div>
                </>
              )}
              {activeFeatureTab === "internal" && (
                <>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                    <Home className="w-6 h-6 text-accent" />
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white">Internal Features</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {caravan.features.interior
                      .filter((feature) => 
                        !feature.toLowerCase().includes("fridge") &&
                        !feature.toLowerCase().includes("microwave") &&
                        !feature.toLowerCase().includes("cooktop") &&
                        !feature.toLowerCase().includes("oven") &&
                        !feature.toLowerCase().includes("stove") &&
                        !feature.toLowerCase().includes("kitchen") &&
                        !feature.toLowerCase().includes("shower") &&
                        !feature.toLowerCase().includes("toilet") &&
                        !feature.toLowerCase().includes("bathroom")
                      )
                      .map((feature) => (
                        <div key={feature} className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-accent/30 transition-colors">
                          <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-300 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                  </div>
                </>
              )}
              {activeFeatureTab === "external" && (
                <>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                    <Building2 className="w-6 h-6 text-accent" />
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white">External Features</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {caravan.features.exterior.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-accent/30 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-300 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {activeFeatureTab === "plumbing" && (
                <>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                    <Droplets className="w-6 h-6 text-accent" />
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white">Plumbing</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      ...caravan.features.interior.filter((feature) => 
                        feature.toLowerCase().includes("shower") ||
                        feature.toLowerCase().includes("toilet") ||
                        feature.toLowerCase().includes("bathroom") ||
                        feature.toLowerCase().includes("ensuite")
                      ),
                      ...caravan.features.exterior.filter((feature) => 
                        feature.toLowerCase().includes("shower") ||
                        feature.toLowerCase().includes("water")
                      ),
                      `Water Capacity: ${caravan.highlights.water}`,
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-accent/30 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-300 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
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
