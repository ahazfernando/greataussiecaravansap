"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Home,
  Caravan,
  Mountain,
  Users,
  MapPin,
  CreditCard,
  RefreshCw,
  Shield,
  Wrench,
  HelpCircle,
  MessageSquare,
  BookOpen,
  Star,
  Info,
  Image as ImageIcon,
  ArrowRight,
  Grid3x3,
  Tag,
  Store,
  FileText,
  Download,
  UserCheck,
  Book,
  Building2,
  Briefcase,
  UsersRound,
  Sparkles,
  History,
  Hammer,
  Layers,
  Box,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Function to get model logo based on model name
const getModelLogo = (modelName: string): string => {
  const logoMap: Record<string, string> = {
    "Striker": "/caravanmodels/strikerlogo.png",
    "20URER LITE": "/caravanmodels/euorerlitelogo.png",
    "20URER": "/caravanmodels/eourerlogo.png",
    "Gravity": "/caravanmodels/gravitylogo.png",
    "Xplora": "/caravanmodels/xploralogo.png",
    "Tonka": "/caravanmodels/tonkologo.png",
    "Paragon": "/caravanlogos/litelogo.png", // Default logo for Paragon if no specific logo exists
  };

  return logoMap[modelName] || "/caravanlogos/litelogo.png";
};

const navigation = [
  {
    name: "Home",
    href: "/",
    hasSubmenu: false,
  },
  {
    name: "About Us",
    href: "/about",
    hasSubmenu: false,
  },
  {
    name: "Our Models",
    href: "/caravans",
    hasSubmenu: true,
    submenu: {
      categories: [
        {
          name: "Striker",
          href: "/caravans/striker",
          icon: Caravan,
          image: "/caravan/CaravanImage(D1V1C1).webp",
          description: "HYBRID MODELS"
        },
        {
          name: "20URER LITE",
          href: "/caravans/20urer-lite",
          icon: Caravan,
          image: "/caravan/CaravanImage(D1V1C2).png",
          description: "CARAVAN MODELS"
        },
        {
          name: "20URER",
          href: "/caravans/20urer",
          icon: Caravan,
          image: "/caravan/CaravanImage(D1V1C3).webp",
          description: "CARAVAN MODELS"
        },
        {
          name: "Gravity",
          href: "/caravans/gravity",
          icon: Caravan,
          image: "/caravan/CaravanImage(D1V1C5).webp",
          description: "CARAVAN MODELS"
        },
        {
          name: "Xplora",
          href: "/caravans/xplora",
          icon: Caravan,
          image: "/caravan/cfi_featured_image.png",
          description: "CARAVAN MODELS"
        },
        {
          name: "Tonka",
          href: "/caravans/tonka",
          icon: Caravan,
          image: "/caravan/CaravanImage(D1V1C1).webp",
          description: "CARAVAN MODELS"
        },
        {
          name: "Paragon",
          href: "/caravans/paragon",
          icon: Caravan,
          image: "/caravan/CaravanImage(D1V1C2).png",
          description: "MOTORHOME MODELS"
        },
      ],
      services: [],
      description: "Explore our complete range of caravans, hybrid models, and motorhomes. Each model is designed for Australian adventures with quality craftsmanship and reliability.",
    },
  },
  {
    name: "Buy",
    href: "/caravans",
    hasSubmenu: true,
    submenu: {
      categories: [
        { name: "Dealers", href: "/dealers", icon: Store, description: "Find a dealer near you" },
        // { name: "What's best for me", href: "/whats-best-for-me", icon: HelpCircle, description: "Find your perfect match" },
        { name: "Get a Quote", href: "/get-quote", icon: FileText, description: "Request pricing information" },
        { name: "Request a Brochure", href: "/brochure", icon: Download, description: "Download our catalog" },
        { name: "Sale", href: "/sale", icon: Tag, description: "Special offers & deals" },
      ],
      services: [],
      description: "Find the perfect caravan for your Australian adventure. Explore our models, get expert guidance, and connect with our dealers.",
    },
  },
  {
    name: "Support and Service",
    href: "/support",
    hasSubmenu: true,
    submenu: {
      categories: [
        { name: "Our Service agents", href: "/service-agents", icon: UserCheck, description: "Find our service team" },
        { name: "Warranty Information", href: "/warranty", icon: Shield, description: "Comprehensive coverage" },
        { name: "Contact support", href: "/contact", icon: MessageSquare, description: "Get in touch" },
        // { name: "Manuals", href: "/manuals", icon: Book, description: "Download manuals" },
        { name: "FAQ", href: "/faqs", icon: HelpCircle, description: "Common questions" },
      ],
      services: [],
      description: "We're here to support you every step of the way. From warranty coverage to expert servicing, our team is ready to help.",
    },
  },
  {
    name: "Explore",
    href: "/blog",
    hasSubmenu: true,
    submenu: {
      categories: [
        { name: "Our story", href: "/our-story", icon: History, description: "Our journey and heritage" },
        { name: "Great Aussie Lifestyle", href: "/lifestyle", icon: Sparkles, description: "The caravan lifestyle" },
        { name: "Blog", href: "/blog", icon: BookOpen, description: "Latest insights & tips" },
        { name: "Factory Tour", href: "/factory-tour", icon: Building2, description: "Visit our facility" },
        // { name: "Careers", href: "/careers", icon: Briefcase, description: "Join our team" },
        // { name: "Owners Club", href: "/owners-club", icon: UsersRound, description: "Connect with owners" },
      ],
      featuredWidget: {
        name: "Events",
        href: "/events",
        image: "/widget/WidgetImages(D1V1C1).jpg",
        description: "Find upcoming trips, meetups, and camping events across Australia.",
      },
      services: [],
      description: "Discover more about Great Aussie Caravans. Learn our story, explore our blog, and connect with our community.",
    },
  },
  {
    name: "Construction",
    href: "/construction",
    hasSubmenu: true,
    submenu: {
      categories: [
        { name: "AllyTech", href: "/construction/ally-tech", icon: Layers, image: "/constructiontypes/allytechl.png", description: "Aluminum technology" },
        { name: "TimberTech", href: "/construction/timber-tech", icon: Hammer, image: "/constructiontypes/timbertechl.png", description: "Timber construction technology" },
        { name: "FiberTech", href: "/construction/fiber-tech", icon: Box, image: "/constructiontypes/fibertechl.png", description: "Fiber construction technology" },
      ],
      services: [],
      description: "Discover our advanced construction technologies. From timber to aluminum and fiber, we use the best materials for durability and performance.",
    },
  },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredModelCategory, setHoveredModelCategory] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<{ name: string; href: string; image: string } | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredModel, setHoveredModel] = useState<{ name: string; href: string; image: string } | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header ref={navbarRef} className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800 w-full">
      <nav className="w-full pl-3 pr-3 sm:pl-4 sm:pr-4 md:pl-6 md:pr-6 lg:px-8 max-w-7xl mx-auto" aria-label="Global">
        <div className="flex items-center justify-between py-2.5 sm:py-3 md:py-4 gap-2 sm:gap-3 w-full">
          {/* Logo */}
          <div className="flex-shrink-0 lg:flex-1 min-w-0 max-w-[calc(100%-70px)] sm:max-w-none">
            <Link href="/" className="block">
              <Image
                src="/logo/greataussielogo.png"
                alt="Great Aussie Caravans"
                width={280}
                height={70}
                className="h-8 sm:h-10 md:h-12 lg:h-16 w-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-none"
                priority
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex-shrink-0 lg:hidden flex items-center gap-1">
            <a
              href="tel:+61393088511"
              className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full text-white/80 hover:text-accent hover:bg-gray-900 transition-colors flex-shrink-0"
              aria-label="Call Us"
            >
              <Phone className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            </a>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-0.5 text-white hover:bg-gray-900 transition-colors flex-shrink-0"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open main menu"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-4 xl:gap-x-6 flex-shrink-0">
            {navigation.map((item) => {
              if (item.hasSubmenu && item.submenu) {
                const handleMouseEnter = () => {
                  // Clear any existing timeout
                  if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                    setHoverTimeout(null);
                  }

                  setOpenDropdown(item.name);
                  if (item.name === "Our Models") {
                    // Initialize with first category and first model
                    type CategoryType = typeof item.submenu.categories[number];
                    const grouped: Record<string, CategoryType[]> = {};
                    item.submenu.categories.forEach((category) => {
                      const categoryType = category.description;
                      if (!grouped[categoryType]) {
                        grouped[categoryType] = [];
                      }
                      grouped[categoryType].push(category);
                    });
                    const firstCategory = Object.keys(grouped)[0];
                    if (firstCategory && grouped[firstCategory] && grouped[firstCategory][0]) {
                      setActiveCategory(firstCategory);
                      setHoveredModelCategory(firstCategory);
                      const firstModel = grouped[firstCategory][0];
                      const modelImage = 'image' in firstModel ? firstModel.image : "/caravan/CaravanImage(D1V1C1).webp";
                      setHoveredModel({
                        name: firstModel.name,
                        href: firstModel.href,
                        image: modelImage
                      });
                      setSelectedModel({
                        name: firstModel.name,
                        href: firstModel.href,
                        image: modelImage
                      });
                    }
                  }
                };

                const handleMouseLeave = () => {
                  // Add a delay before closing to allow moving to submenu
                  const timeout = setTimeout(() => {
                    setOpenDropdown(null);
                    if (item.name === "Our Models") {
                      setActiveCategory(null);
                      setHoveredModelCategory(null);
                      setSelectedModel(null);
                      setHoveredModel(null);
                    }
                  }, 150);
                  setHoverTimeout(timeout);
                };

                const handleDropdownMouseEnter = () => {
                  // Cancel close timeout when entering dropdown
                  if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                    setHoverTimeout(null);
                  }
                };

                const handleDropdownMouseLeave = () => {
                  // Close dropdown when leaving it
                  setOpenDropdown(null);
                  if (item.name === "Our Models") {
                    setActiveCategory(null);
                    setHoveredModelCategory(null);
                    setSelectedModel(null);
                    setHoveredModel(null);
                  }
                };

                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button className="flex items-center gap-1 text-xs xl:text-sm font-medium text-white/80 hover:text-accent transition-colors duration-200 outline-none focus:outline-none whitespace-nowrap">
                      {item.name}
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 xl:h-4 xl:w-4 transition-transform duration-200 flex-shrink-0",
                          openDropdown === item.name && "rotate-180"
                        )}
                      />
                    </button>
                    {openDropdown === item.name && mounted && createPortal(
                      <div
                        className={cn(
                          "fixed left-0 right-0 w-screen p-0 bg-black border-x-0 border-t-0 border-b border-gray-800 shadow-2xl overflow-hidden z-50",
                          item.name === "Our Models" ? "rounded-none" : "rounded-[24px]"
                        )}
                        style={{
                          top: navbarRef.current ? `${navbarRef.current.offsetHeight}px` : '64px'
                        }}
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                      >
                        {item.name === "Our Models" ? (
                          // Three-column mega menu layout for Our Models
                          (() => {
                            type CategoryType = typeof item.submenu.categories[number];
                            const grouped: Record<string, CategoryType[]> = {};
                            item.submenu.categories.forEach((category) => {
                              const categoryType = category.description;
                              if (!grouped[categoryType]) {
                                grouped[categoryType] = [];
                              }
                              grouped[categoryType].push(category);
                            });

                            const categories = Object.keys(grouped);
                            const currentCategory = activeCategory || hoveredModelCategory || categories[0];
                            const activeModels = grouped[currentCategory] || [];
                            const displayModel = hoveredModel || selectedModel || (activeModels[0] ? {
                              name: activeModels[0].name,
                              href: activeModels[0].href,
                              image: ('image' in activeModels[0] ? activeModels[0].image : "/caravan/CaravanImage(D1V1C1).webp")
                            } : null);

                            const handleCategoryHover = (categoryName: string, models: CategoryType[]) => {
                              setActiveCategory(categoryName);
                              setHoveredModelCategory(categoryName);
                              if (models[0]) {
                                const firstModel = models[0];
                                const modelImage = 'image' in firstModel ? firstModel.image : "/caravan/CaravanImage(D1V1C1).webp";
                                setHoveredModel({
                                  name: firstModel.name,
                                  href: firstModel.href,
                                  image: modelImage
                                });
                                setSelectedModel({
                                  name: firstModel.name,
                                  href: firstModel.href,
                                  image: modelImage
                                });
                              }
                            };

                            return (
                              <div className="grid grid-cols-12 gap-0 h-[calc(100vh-64px)]">
                                {/* Empty column for alignment with logo */}
                                <div className="col-span-1"></div>

                                {/* Column 1: Categories */}
                                <div className="col-span-2 border-r border-gray-800/30 pl-8 pr-8 py-6 bg-black">
                                  <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 pl-0">
                                    OUR MODELS
                                  </h3>
                                  <div className="space-y-1">
                                    {categories.map((categoryType) => (
                                      <button
                                        key={categoryType}
                                        onMouseEnter={() => handleCategoryHover(categoryType, grouped[categoryType] || [])}
                                        className={cn(
                                          "flex items-center justify-between w-full pl-3 pr-3 py-3 text-left transition-all duration-200 group rounded-sm",
                                          currentCategory === categoryType
                                            ? "bg-yellow-400/10 text-white"
                                            : "text-white/70 hover:text-white hover:bg-yellow-400/10"
                                        )}
                                      >
                                        <span className="font-medium text-sm">{categoryType}</span>
                                        <ChevronRight className={cn(
                                          "w-4 h-4 transition-colors",
                                          currentCategory === categoryType
                                            ? "text-yellow-400"
                                            : "text-white/70 group-hover:text-yellow-400"
                                        )} />
                                      </button>
                                    ))}
                                  </div>

                                  {/* Quick Links */}
                                  <div className="mt-8 pt-6 border-t border-gray-800/30">
                                    <Link href="/about" className="block text-sm text-gray-400 hover:text-yellow-400 transition-colors py-2" onClick={() => setOpenDropdown(null)}>
                                      About Us
                                    </Link>
                                    <Link href="/dealers" className="block text-sm text-gray-400 hover:text-yellow-400 transition-colors py-2" onClick={() => setOpenDropdown(null)}>
                                      Find a Dealer
                                    </Link>
                                    <Link href="/our-story" className="block text-sm text-gray-400 hover:text-yellow-400 transition-colors py-2" onClick={() => setOpenDropdown(null)}>
                                      Our Story
                                    </Link>
                                  </div>
                                </div>

                                {/* Column 2: Models List */}
                                <div className="col-span-3 px-8 py-6 border-r border-gray-800/30 overflow-y-auto bg-black">
                                  <AnimatePresence mode="wait">
                                    {currentCategory && (
                                      <motion.div
                                        key={currentCategory}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <div className="flex items-center gap-2 mb-6">
                                          <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500">
                                            {currentCategory.replace(" MODELS", "")}
                                          </h3>
                                        </div>

                                        <div className="space-y-0">
                                          {activeModels.map((model) => {
                                            const modelImage = 'image' in model ? model.image : "/caravan/CaravanImage(D1V1C1).webp";
                                            return (
                                              <Link
                                                key={model.name}
                                                href={model.href}
                                                onMouseEnter={() => {
                                                  setHoveredModel({
                                                    name: model.name,
                                                    href: model.href,
                                                    image: modelImage
                                                  });
                                                  setSelectedModel({
                                                    name: model.name,
                                                    href: model.href,
                                                    image: modelImage
                                                  });
                                                }}
                                                onClick={() => setOpenDropdown(null)}
                                                className={cn(
                                                  "block py-3 border-l-2 pl-4 transition-all duration-200",
                                                  hoveredModel?.name === model.name
                                                    ? "border-yellow-400 text-white"
                                                    : "border-transparent text-white/60 hover:text-white hover:border-yellow-400/50"
                                                )}
                                              >
                                                <span className="font-medium text-sm">{model.name}</span>
                                              </Link>
                                            );
                                          })}
                                        </div>

                                        {currentCategory !== "HYBRID MODELS" && currentCategory !== "MOTORHOME MODELS" && (
                                          <Link
                                            href="/caravans"
                                            className="inline-flex items-center gap-2 mt-8 text-sm text-yellow-400 hover:text-yellow-300 transition-colors group"
                                            onClick={() => setOpenDropdown(null)}
                                          >
                                            View All {currentCategory}
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                          </Link>
                                        )}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>

                                {/* Column 3: Featured Model Preview */}
                                <div className="col-span-6 pl-8 py-6 pr-8 bg-gray-950">
                                  <AnimatePresence mode="wait">
                                    {displayModel && (
                                      <motion.div
                                        key={displayModel.name}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.3 }}
                                        className="h-full flex flex-col relative"
                                      >
                                        {/* Product Logo */}
                                        <div className="absolute top-0 left-0 z-20 mb-4">
                                          <Image
                                            src={getModelLogo(displayModel.name)}
                                            alt={`${displayModel.name} Logo`}
                                            width={200}
                                            height={100}
                                            className="object-contain"
                                          />
                                        </div>

                                        {/* Model Image */}
                                        <div className="relative flex-[0.85] rounded-lg overflow-hidden bg-gray-900/30 mb-6 min-h-[350px] max-h-[450px] mr-8">
                                          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent z-10" />
                                          <Image
                                            src={displayModel.image}
                                            alt={displayModel.name}
                                            fill
                                            className="object-contain"
                                          />
                                        </div>

                                        {/* Model Details and CTA Buttons */}
                                        <div className="flex items-center justify-between gap-4 pb-6 mt-8">
                                          <div className="flex flex-col">
                                            <p className="text-xs uppercase tracking-[0.15em] text-yellow-400 mb-1">
                                              Great Aussie
                                            </p>
                                            <h2 className="text-3xl font-bold text-white">
                                              {displayModel.name}
                                            </h2>
                                          </div>
                                          <div className="flex items-center gap-4 mr-16">
                                            <Button variant="accent" size="sm" className="w-auto px-6 py-2 h-9 text-black" asChild>
                                              <Link href={displayModel.href} onClick={() => setOpenDropdown(null)}>
                                                Discover More
                                              </Link>
                                            </Button>
                                            <Link
                                              href="/brochure"
                                              className="inline-flex items-center justify-center px-6 py-2 h-9 text-sm font-medium text-white/70 border border-white/20 rounded-md hover:text-yellow-400 hover:border-yellow-400/50 transition-all duration-200"
                                              onClick={() => setOpenDropdown(null)}
                                            >
                                              Enquire
                                            </Link>
                                          </div>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>
                            );
                          })()
                        ) : (
                          // Regular layout for other menus
                          <div className="container-wide">
                            <div className="grid grid-cols-3 gap-0">
                              {/* Left & Middle Columns - Menu Items */}
                              <div className="col-span-2 p-4">
                                <div className="grid grid-cols-2 gap-2">
                                  {item.submenu.categories.map((category) => {
                                    const Icon = category.icon;
                                    return (
                                      <Link
                                        key={category.name}
                                        href={category.href}
                                        className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-900 transition-all duration-200 border border-transparent hover:border-accent/20"
                                        onClick={() => setOpenDropdown(null)}
                                      >
                                        <div className={`flex-shrink-0 flex items-center justify-center transition-colors ${category.image ? (category.name === 'TimberTech' ? 'w-20 h-20 mr-3' : 'w-16 h-16 mr-3') : 'w-10 h-10 rounded-lg bg-accent/20 group-hover:bg-accent/30'}`}>
                                          {category.image ? (
                                            <Image
                                              src={category.image}
                                              alt={category.name}
                                              width={category.name === 'TimberTech' ? 80 : 64}
                                              height={category.name === 'TimberTech' ? 80 : 64}
                                              className="w-full h-full object-contain object-center"
                                            />
                                          ) : (
                                            <Icon className="h-5 w-5 text-accent" />
                                          )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="font-semibold text-sm text-white group-hover:text-accent transition-colors mb-1">
                                            {category.name}
                                          </div>
                                          <div className="text-xs text-gray-400">
                                            {category.description}
                                          </div>
                                        </div>
                                        <ArrowRight className="h-4 w-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                                      </Link>
                                    );
                                  })}
                                  {item.submenu.services.map((service) => {
                                    const Icon = service.icon;
                                    return (
                                      <Link
                                        key={service.name}
                                        href={service.href}
                                        className="group flex items-start gap-3 p-4 rounded-lg hover:bg-gray-900 transition-all duration-200 border border-transparent hover:border-accent/20"
                                        onClick={() => setOpenDropdown(null)}
                                      >
                                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/20 group-hover:bg-accent/30 flex items-center justify-center transition-colors">
                                          <Icon className="h-5 w-5 text-accent" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="font-semibold text-sm text-white group-hover:text-accent transition-colors mb-1">
                                            {service.name}
                                          </div>
                                          <div className="text-xs text-gray-400">
                                            {service.description}
                                          </div>
                                        </div>
                                        <ArrowRight className="h-4 w-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                                      </Link>
                                    );
                                  })}
                                  {/* Events Featured Widget Card */}
                                  {item.submenu.featuredWidget && (
                                    <Link
                                      href={item.submenu.featuredWidget.href}
                                      className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 col-span-2"
                                      onClick={() => setOpenDropdown(null)}
                                      aria-label={`Explore ${item.submenu.featuredWidget.name}`}
                                    >
                                      <div className="relative h-32 overflow-hidden">
                                        <Image
                                          src={item.submenu.featuredWidget.image}
                                          alt={item.submenu.featuredWidget.name}
                                          fill
                                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                      </div>
                                      <div className="p-4 flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                          <div className="font-semibold text-base text-white group-hover:text-accent transition-colors mb-1">
                                            {item.submenu.featuredWidget.name}
                                          </div>
                                          <div className="text-xs text-gray-400 line-clamp-1">
                                            {item.submenu.featuredWidget.description}
                                          </div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-accent flex-shrink-0 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
                                      </div>
                                    </Link>
                                  )}
                                </div>
                              </div>

                              {/* Right Column - Description */}
                              <div className="col-span-1 bg-gray-900 p-4 border-l border-gray-800">
                                <div className="h-full flex flex-col justify-between">
                                  <div>
                                    <h3 className="font-bold text-base text-white mb-3">
                                      {item.name}
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                      {item.submenu.description}
                                    </p>
                                  </div>
                                  <Link
                                    href={item.href}
                                    className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-accent hover:text-accent/80 transition-colors group"
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    View All
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>,
                      document.body
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-xs xl:text-sm font-medium text-white/80 hover:text-accent transition-colors duration-200 link-underline whitespace-nowrap"
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-3 xl:gap-x-4 flex-shrink-0">
            <a
              href="tel:+61393088511"
              className="flex items-center justify-center w-10 h-10 rounded-full text-white/80 hover:text-accent hover:bg-gray-900 transition-colors"
              aria-label="Call Us"
            >
              <Phone className="h-5 w-5" />
            </a>
            <Button variant="accent" size="sm" className="text-black whitespace-nowrap" asChild>
              <Link href="/contact">Find a Dealer</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed top-0 left-0 right-0 bottom-0 z-[9998] bg-black/60 backdrop-blur-md lg:hidden"
              style={{ height: '100vh', width: '100vw' }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 bottom-0 right-0 z-[9999] w-[90vw] sm:w-[85vw] md:w-[75vw] lg:w-[60vw] max-w-md h-screen max-h-screen flex flex-col bg-black/95 backdrop-blur-xl shadow-2xl lg:hidden"
              style={{ height: '100vh', maxHeight: '100vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-3 px-4 sm:px-6 pt-6 sm:pt-8 pb-4 border-b border-gray-800 flex-shrink-0 bg-black/95 backdrop-blur-xl">
                <Link href="/" className="flex-shrink-0 min-w-0" onClick={() => setMobileMenuOpen(false)}>
                  <Image
                    src="/logo/greataussielogo.png"
                    alt="Great Aussie Caravans"
                    width={280}
                    height={70}
                    className="h-10 sm:h-12 w-auto max-w-[140px] sm:max-w-none"
                    priority
                  />
                </Link>
                <button
                  type="button"
                  className="rounded-lg p-2 text-white hover:bg-gray-900 transition-colors flex-shrink-0"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 sm:px-6">
                <div className="divide-y divide-gray-800">
                  <div className="space-y-1 py-6">
                    {navigation.map((item) => (
                      <div key={item.name}>
                        {item.hasSubmenu && item.submenu ? (
                          <div>
                            <button
                              onClick={() => setOpenMobileAccordion(openMobileAccordion === item.name ? null : item.name)}
                              className="w-full flex items-center justify-between px-3 py-2 text-sm sm:text-base font-semibold text-white hover:bg-gray-900 transition-colors rounded-lg"
                            >
                              <span>{item.name}</span>
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 transition-transform duration-200",
                                  openMobileAccordion === item.name && "rotate-180"
                                )}
                              />
                            </button>
                            <AnimatePresence>
                              {openMobileAccordion === item.name && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pl-3 sm:pl-4 space-y-1 pt-2">
                                    {item.name === "Construction" ? (
                                      // Show only logos for Construction menu
                                      <div className="grid grid-cols-3 gap-4 py-4">
                                        {item.submenu.categories.map((category) => (
                                          <Link
                                            key={category.name}
                                            href={category.href}
                                            className="flex flex-col items-center gap-2 rounded-lg p-3 hover:bg-gray-900 transition-colors group"
                                            onClick={() => setMobileMenuOpen(false)}
                                          >
                                            {('image' in category && category.image) ? (
                                              <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                                                <Image
                                                  src={category.image}
                                                  alt={category.name}
                                                  fill
                                                  className="object-contain group-hover:scale-105 transition-transform"
                                                />
                                              </div>
                                            ) : null}
                                          </Link>
                                        ))}
                                      </div>
                                    ) : item.name === "Our Models" ? (
                                      // Group models by category for mobile
                                      (() => {
                                        type CategoryType = typeof item.submenu.categories[number];
                                        const grouped: Record<string, CategoryType[]> = {};
                                        item.submenu.categories.forEach((category) => {
                                          const categoryType = category.description;
                                          if (!grouped[categoryType]) {
                                            grouped[categoryType] = [];
                                          }
                                          grouped[categoryType].push(category);
                                        });

                                        return Object.entries(grouped).map(([categoryType, models]) => (
                                          <div key={categoryType} className="mb-4">
                                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                                              {categoryType}
                                            </div>
                                            {models.map((category) => {
                                              const Icon = category.icon;
                                              return (
                                                <Link
                                                  key={category.name}
                                                  href={category.href}
                                                  className="flex items-center gap-2 sm:gap-3 rounded-lg px-3 py-2.5 text-sm text-white/80 hover:bg-gray-900 hover:text-white transition-colors"
                                                  onClick={() => setMobileMenuOpen(false)}
                                                >
                                                  {('image' in category && category.image) ? (
                                                    <Image
                                                      src={category.image}
                                                      alt={category.name}
                                                      width={48}
                                                      height={48}
                                                      className="object-contain flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12"
                                                    />
                                                  ) : (
                                                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0" />
                                                  )}
                                                  <div className="min-w-0 flex-1">
                                                    <div className="font-medium truncate">{category.name}</div>
                                                  </div>
                                                </Link>
                                              );
                                            })}
                                          </div>
                                        ));
                                      })()
                                    ) : (
                                      // Regular category rendering for other menus
                                      item.submenu.categories.map((category) => {
                                        const Icon = category.icon;
                                        return (
                                          <Link
                                            key={category.name}
                                            href={category.href}
                                            className="flex items-center gap-2 sm:gap-3 rounded-lg px-3 py-2.5 text-sm text-white/80 hover:bg-gray-900 hover:text-white transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                          >
                                            {('image' in category && category.image) ? (
                                              <Image
                                                src={category.image}
                                                alt={category.name}
                                                width={48}
                                                height={48}
                                                className="object-contain flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12"
                                              />
                                            ) : (
                                              <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0" />
                                            )}
                                            <div className="min-w-0 flex-1">
                                              <div className="font-medium truncate">{category.name}</div>
                                              <div className="text-xs text-gray-400 line-clamp-1">
                                                {category.description}
                                              </div>
                                            </div>
                                          </Link>
                                        );
                                      })
                                    )}
                                    {/* Events widget - moved down after categories for mobile */}
                                    {item.submenu.featuredWidget && (
                                      <Link
                                        href={item.submenu.featuredWidget.href}
                                        className="flex items-center gap-2 sm:gap-3 rounded-lg px-3 py-2.5 text-sm text-white/80 hover:bg-gray-900 hover:text-white transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0" />
                                        <div className="min-w-0 flex-1">
                                          <div className="font-medium truncate">{item.submenu.featuredWidget.name}</div>
                                          <div className="text-xs text-gray-400 line-clamp-1">
                                            {item.submenu.featuredWidget.description}
                                          </div>
                                        </div>
                                      </Link>
                                    )}
                                    {item.submenu.services.map((service) => {
                                      const Icon = service.icon;
                                      return (
                                        <Link
                                          key={service.name}
                                          href={service.href}
                                          className="flex items-center gap-2 sm:gap-3 rounded-lg px-3 py-2.5 text-sm text-white/80 hover:bg-gray-900 hover:text-white transition-colors"
                                          onClick={() => setMobileMenuOpen(false)}
                                        >
                                          <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0" />
                                          <div className="min-w-0 flex-1">
                                            <div className="font-medium truncate">{service.name}</div>
                                            <div className="text-xs text-gray-400 line-clamp-1">
                                              {service.description}
                                            </div>
                                          </div>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className="block rounded-lg px-3 py-2 text-sm sm:text-base font-medium text-white/80 hover:bg-gray-900 hover:text-white transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="py-6 px-4 sm:px-6 space-y-2 sm:space-y-3 border-t border-gray-800 flex-shrink-0 bg-black">
                    <a
                      href="tel:+61393088511"
                      className="flex items-center justify-center w-full h-10 sm:h-12 rounded-lg text-white bg-gray-900 hover:bg-gray-800 transition-colors gap-2"
                      aria-label="Call Us"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="text-xs sm:text-sm font-medium">Call Us</span>
                    </a>
                    <Button variant="accent" className="w-full text-black h-10 sm:h-12 text-xs sm:text-sm" asChild>
                      <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                        Find a Dealer
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
