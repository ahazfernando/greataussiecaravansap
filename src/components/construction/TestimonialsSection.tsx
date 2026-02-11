"use client";

import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: "1",
    name: "Michael T.",
    title: "Caravan Owner",
    rating: 5,
    quote: "Absolutely thrilled with our Outback Explorer! We've taken it across the Nullarbor and through the Kimberley—handles everything we throw at it. The build quality is exceptional.",
  },
  {
    id: "2",
    name: "Sarah & David C.",
    title: "Family Adventurers",
    rating: 5,
    quote: "As a young family, we needed something that would grow with us. The Family Cruiser has been perfect—spacious, comfortable, and the kids love the bunk setup.",
  },
  {
    id: "3",
    name: "Robert W.",
    title: "Retired Traveler",
    rating: 5,
    quote: "After comparing dozens of caravans, we chose Great Aussie for their attention to detail and Australian build. Six months in and we couldn't be happier.",
  },
];

// Image list - will duplicate to get 15 images
const imageSources = [
  "/constructions/GAC-SET-147.jpg",
  "/constructions/GAC-SET-136.jpg",
  "/constructions/GAC-SET-133.jpg",
  "/constructions/GAC-SET-47.jpg",
  "/home/HomeAssets(D1V1C4).jpg",
  "/home/HomeHeader(D1V1C3).jpg",
  "/home/HomeHeader(D1V1C2).jpg",
  "/home/Homeassets(D1V1C3).jpg",
  "/home/HomeAssets(D1V1C2).jpg",
  "/home/HomeAssets(D1V1C1).png",
  "/home/Newsletterimage.png",
];

// Duplicate images to get 15 total
const allImages = [
  ...imageSources,
  imageSources[0], // Duplicate first
  imageSources[1], // Duplicate second
  imageSources[2], // Duplicate third
  imageSources[3], // Duplicate fourth
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Image Collage Grid - 15 images in irregular layout */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 mb-16 auto-rows-fr">
          {/* Large images spanning multiple cells */}
          <div className="col-span-2 row-span-2 rounded-lg overflow-hidden">
            <div className="relative w-full h-full min-h-[180px] md:min-h-[240px]">
              <Image
                src={allImages[0]}
                alt="Caravan construction"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
            <div className="relative w-full h-full min-h-[90px] md:min-h-[120px]">
              <Image
                src={allImages[1]}
                alt="Caravan construction"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="col-span-1 row-span-2 rounded-lg overflow-hidden">
            <div className="relative w-full h-full min-h-[180px] md:min-h-[240px]">
              <Image
                src={allImages[2]}
                alt="Caravan construction"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
            <div className="relative w-full h-full min-h-[90px] md:min-h-[120px]">
              <Image
                src={allImages[3]}
                alt="Caravan construction"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
            <div className="relative w-full h-full min-h-[90px] md:min-h-[120px]">
              <Image
                src={allImages[4]}
                alt="Caravan construction"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="col-span-2 row-span-2 rounded-lg overflow-hidden">
            <div className="relative w-full h-full min-h-[180px] md:min-h-[240px]">
              <Image
                src={allImages[5]}
                alt="Caravan construction"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
            <div className="relative w-full h-full min-h-[90px] md:min-h-[120px]">
              <Image
                src={allImages[6]}
                alt="Caravan construction"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
            <div className="relative w-full h-full min-h-[90px] md:min-h-[120px]">
              <Image
                src={allImages[7]}
                alt="Caravan construction"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
            <div className="relative w-full h-full min-h-[90px] md:min-h-[120px]">
              <Image
                src={allImages[8]}
                alt="Caravan construction"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
            <div className="relative w-full h-full min-h-[90px] md:min-h-[120px]">
              <Image
                src={allImages[9]}
                alt="Caravan construction"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="col-span-2 row-span-1 rounded-lg overflow-hidden">
            <div className="relative w-full h-full min-h-[90px] md:min-h-[120px]">
              <Image
                src={allImages[10]}
                alt="Caravan construction"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
            <div className="relative w-full h-full min-h-[90px] md:min-h-[120px]">
              <Image
                src={allImages[11]}
                alt="Caravan construction"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
            <div className="relative w-full h-full min-h-[90px] md:min-h-[120px]">
              <Image
                src={allImages[12]}
                alt="Caravan construction"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
            <div className="relative w-full h-full min-h-[90px] md:min-h-[120px]">
              <Image
                src={allImages[13]}
                alt="Caravan construction"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
            <div className="relative w-full h-full min-h-[90px] md:min-h-[120px]">
              <Image
                src={allImages[14]}
                alt="Caravan construction"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Testimonials Header */}
        <div className="text-center mb-12">
          <button className="px-4 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 mb-4">
            Testimonials
          </button>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2">
            Trusted by adventurers and families
          </h2>
          <p className="text-gray-600 text-lg">from across Australia</p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

