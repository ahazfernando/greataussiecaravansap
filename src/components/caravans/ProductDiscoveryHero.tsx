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

        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-black/30 backdrop-blur-[2px]">
          <div className="mx-auto grid max-w-lg grid-cols-2 gap-x-5 gap-y-2.5 px-4 py-3 sm:max-w-2xl sm:gap-x-6 sm:px-5 sm:py-3.5 md:max-w-3xl md:grid-cols-4 md:gap-x-5 md:gap-y-0 md:px-5 md:py-4 lg:max-w-[56rem] lg:gap-x-7">
            {specs.map((spec, index) => (
              <div key={`${spec.label}-${index}`} className="min-w-0">
                <p className="font-display text-[1.35rem] font-semibold leading-tight text-white sm:text-[1.5rem] md:text-[1.65rem] lg:text-[1.85rem] break-words">
                  {spec.value}
                </p>
                <p className="mt-0.5 text-xs text-white/75 md:text-sm">{spec.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
