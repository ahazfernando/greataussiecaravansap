"use client";

import Image from "next/image";

type ProductDiscoveryHeroProps = {
  modelName: string;
  backgroundSrc?: string;
  solar: string;
  battery: string;
  water: string;
  fourthSpec: {
    value: string;
    label: string;
  };
};

export function ProductDiscoveryHero({
  modelName,
  backgroundSrc = "/natural/2ourerModel.jpeg",
  solar,
  battery,
  water,
  fourthSpec,
}: ProductDiscoveryHeroProps) {
  const specs = [
    { value: solar, label: "Solar" },
    { value: battery, label: "Battery" },
    { value: water, label: "Water" },
    { value: fourthSpec.value, label: fourthSpec.label },
  ];

  return (
    <section className="relative bg-black">
      <div className="relative min-h-[520px] overflow-hidden md:min-h-[680px]">
        <Image
          src={backgroundSrc}
          alt={`${modelName} product discovery background`}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/80" />

        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            {specs.map((spec, index) => (
              <div
                key={`${spec.label}-${index}`}
                className={`min-w-[12rem] px-5 py-4 sm:min-w-0 sm:px-6 md:px-8 md:py-5 lg:px-10 ${
                  index < specs.length - 1 ? "border-b border-white/10 xl:border-b-0 xl:border-r" : ""
                } ${index % 2 === 0 ? "sm:border-r sm:border-white/10 xl:border-r" : "sm:border-r-0"} ${
                  index < 2 ? "sm:border-b sm:border-white/10 xl:border-b-0" : ""
                }`}
              >
                <p className="font-display whitespace-nowrap text-[1.75rem] font-semibold leading-none text-white md:text-[2.2rem]">
                  {spec.value}
                </p>
                <p className="mt-1 text-xs text-white/75 md:text-sm">{spec.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
