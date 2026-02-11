"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { cn } from "@/lib/utils";

const reviews = [
  {
    id: "1",
    name: "Michael Thompson",
    rating: 5,
    date: "November 2024",
    content: "Absolutely thrilled with our Outback Explorer! We've taken it across the Nullarbor and through the Kimberley—handles everything we throw at it. The build quality is exceptional and the team at Great Aussie made the whole process seamless.",
    caravan: "Outback Explorer 21",
  },
  {
    id: "2",
    name: "Sarah & David Chen",
    rating: 5,
    date: "October 2024",
    content: "As a young family, we needed something that would grow with us. The Family Cruiser has been perfect—spacious, comfortable, and the kids love the bunk setup. Best investment we've ever made for our family adventures.",
    caravan: "Family Cruiser 23",
  },
  {
    id: "3",
    name: "Robert Williams",
    rating: 5,
    date: "September 2024",
    content: "After comparing dozens of caravans, we chose Great Aussie for their attention to detail and Australian build. Six months in and we couldn't be happier. The after-sales support has been outstanding too.",
    caravan: "Coastal Tourer 19",
  },
  {
    id: "4",
    name: "Jennifer Masters",
    rating: 5,
    date: "August 2024",
    content: "Retired and finally living the dream! Our Outback Explorer has taken us to places we never thought we'd see. Reliable, comfortable, and built like a tank. Highly recommend to any grey nomad looking for quality.",
    caravan: "Outback Explorer 21",
  },
];

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, reviews.length - itemsPerView);

  // Reset currentIndex if it's out of bounds when itemsPerView changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(0);
    }
  }, [maxIndex, currentIndex]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Calculate average rating
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="py-12 bg-black overflow-hidden">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-accent font-medium text-sm tracking-wide uppercase mb-4 block border-2 border-accent/30 rounded-[24px] px-4 py-2 inline-block bg-accent/10 backdrop-blur-sm">
            Customer Reviews
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 text-accent fill-accent" />
              ))}
            </div>
            <span className="font-semibold text-white">{avgRating}</span>
            <span className="text-gray-400">({reviews.length} reviews)</span>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative -mx-4 md:-mx-6 lg:mx-0">
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 ease-out md:gap-6 lg:gap-6"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex-shrink-0 w-full px-4 md:w-[calc((100%-1.5rem)/2)] md:px-0 lg:w-[calc((100%-3rem)/3)]"
                >
                  <ReviewCard {...review} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrev}
              className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-gray-900 hover:border-accent/50 transition-colors text-white"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(i);
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    i === currentIndex ? "bg-accent w-6" : "bg-gray-700 hover:bg-accent/50"
                  )}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={goToNext}
              className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-gray-900 hover:border-accent/50 transition-colors text-white"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
