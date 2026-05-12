"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { modelCategories } from "@/components/navigation/modelCategories";
import { getModelLogo } from "@/components/navigation/getModelLogo";

type ModelItem = (typeof modelCategories)[number];

type PreviewModel = {
  name: string;
  href: string;
  image: string;
};

type ModelsMegaMenuProps = {
  onClose: () => void;
};

export function ModelsMegaMenu({ onClose }: ModelsMegaMenuProps) {
  const grouped = modelCategories.reduce<Record<string, ModelItem[]>>((acc, model) => {
    if (!acc[model.description]) acc[model.description] = [];
    acc[model.description].push(model);
    return acc;
  }, {});

  const categories = Object.keys(grouped);
  const firstCategory = categories[0];
  const firstModel = firstCategory ? grouped[firstCategory][0] : null;

  const [activeCategory, setActiveCategory] = useState(firstCategory);
  const [hoveredModel, setHoveredModel] = useState<PreviewModel | null>(
    firstModel
      ? {
          name: firstModel.name,
          href: firstModel.href,
          image: firstModel.image,
        }
      : null
  );

  const activeModels = grouped[activeCategory] || [];
  const displayModel =
    hoveredModel ||
    (activeModels[0]
      ? {
          name: activeModels[0].name,
          href: activeModels[0].href,
          image: activeModels[0].image,
        }
      : null);

  const handleCategoryHover = (categoryName: string, models: ModelItem[]) => {
    setActiveCategory(categoryName);
    const first = models[0];
    if (!first) return;

    setHoveredModel({
      name: first.name,
      href: first.href,
      image: first.image,
    });
  };

  return (
    <motion.div className="grid h-[calc(100vh-64px)] grid-cols-12 gap-0">
      <div className="col-span-1" />

      <div className="col-span-2 border-r border-gray-800/30 bg-black py-6 pl-8 pr-8">
        <h3 className="mb-6 pl-0 text-xs uppercase tracking-[0.2em] text-gray-500">
          OUR MODELS
        </h3>

        <div className="space-y-1">
          {categories.map((categoryType) => (
            <button
              key={categoryType}
              type="button"
              onMouseEnter={() => handleCategoryHover(categoryType, grouped[categoryType] || [])}
              className={cn(
                "group flex w-full items-center justify-between rounded-sm py-3 pl-3 pr-3 text-left transition-all duration-200",
                activeCategory === categoryType
                  ? "bg-yellow-400/10 text-white"
                  : "text-white/70 hover:bg-yellow-400/10 hover:text-white"
              )}
            >
              <span className="text-sm font-medium">{categoryType}</span>
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-colors",
                  activeCategory === categoryType
                    ? "text-yellow-400"
                    : "text-white/70 group-hover:text-yellow-400"
                )}
              />
            </button>
          ))}
        </div>

        <div className="mt-8 border-t border-gray-800/30 pt-6">
          <Link
            href="/about"
            className="block py-2 text-sm text-gray-400 transition-colors hover:text-yellow-400"
            onClick={onClose}
          >
            About Us
          </Link>
          <Link
            href="/dealers"
            className="block py-2 text-sm text-gray-400 transition-colors hover:text-yellow-400"
            onClick={onClose}
          >
            Find a Dealer
          </Link>
          <Link
            href="/our-story"
            className="block py-2 text-sm text-gray-400 transition-colors hover:text-yellow-400"
            onClick={onClose}
          >
            Our Story
          </Link>
        </div>
      </div>

      <motion.div className="col-span-3 overflow-y-auto border-r border-gray-800/30 bg-black px-8 py-6">
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="mb-6 text-xs uppercase tracking-[0.2em] text-gray-500">
                {activeCategory.replace(" MODELS", "")}
              </h3>

              <div className="space-y-0">
                {activeModels.map((model) => (
                  <Link
                    key={model.name}
                    href={model.href}
                    onMouseEnter={() =>
                      setHoveredModel({
                        name: model.name,
                        href: model.href,
                        image: model.image,
                      })
                    }
                    onClick={onClose}
                    className={cn(
                      "block border-l-2 py-3 pl-4 transition-all duration-200",
                      hoveredModel?.name === model.name
                        ? "border-yellow-400 text-white"
                        : "border-transparent text-white/60 hover:border-yellow-400/50 hover:text-white"
                    )}
                  >
                    <span className="text-sm font-medium">{model.name}</span>
                  </Link>
                ))}
              </div>

              <Link
                href="/caravans"
                className="group mt-8 inline-flex items-center gap-2 text-sm text-yellow-400 transition-colors hover:text-yellow-300"
                onClick={onClose}
              >
                View All {activeCategory}
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="relative col-span-6 overflow-hidden bg-gray-950 py-4 pl-4 pr-4">
        <AnimatePresence mode="wait">
          {displayModel && (
            <motion.div
              key={displayModel.name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="relative flex h-full flex-col overflow-hidden rounded-[24px]"
            >
              <div className="absolute inset-0">
                <Image
                  src={displayModel.image}
                  alt={displayModel.name}
                  fill
                  className="object-cover object-right"
                />
                <motion.div className="absolute inset-0 bg-gradient-to-l from-transparent via-gray-950/20 to-gray-950/55" />
                <motion.div className="absolute inset-0 bg-gradient-to-t from-gray-950/45 via-gray-950/10 to-transparent" />
              </div>

              <div className="absolute left-5 top-5 z-20">
                <Image
                  src={getModelLogo(displayModel.name)}
                  alt={`${displayModel.name} logo`}
                  width={200}
                  height={100}
                  className="object-contain"
                />
              </div>

              <div className="relative z-20 mt-auto flex items-center justify-between gap-4 px-5 pb-10">
                <div className="flex flex-col">
                  <p className="mb-1 text-xs uppercase tracking-[0.15em] text-yellow-400">
                    Great Aussie
                  </p>
                  <h2 className="text-3xl font-bold text-white">{displayModel.name}</h2>
                </div>

                <div className="mr-16 flex items-center gap-4">
                  <Button variant="accent" size="sm" className="h-9 w-auto px-6 py-2 text-black" asChild>
                    <Link href={displayModel.href} onClick={onClose}>
                      Discover More
                    </Link>
                  </Button>
                  <Link
                    href="/brochure"
                    className="inline-flex h-9 items-center justify-center rounded-md border border-white/20 px-6 py-2 text-sm font-medium text-white/70 transition-all duration-200 hover:border-yellow-400/50 hover:text-yellow-400"
                    onClick={onClose}
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
