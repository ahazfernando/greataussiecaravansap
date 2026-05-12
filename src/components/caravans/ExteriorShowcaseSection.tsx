"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const getBalancedParagraphs = (paragraphs: string[]): [string, string] => {
  const sentenceList = paragraphs
    .join(" ")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  if (sentenceList.length < 2) {
    const single = paragraphs.join(" ").trim();
    return [single, single];
  }

  const totalLength = sentenceList.reduce((sum, sentence) => sum + sentence.length, 0);
  const targetLength = totalLength / 2;

  let runningLength = 0;
  let splitIndex = 1;

  for (let i = 0; i < sentenceList.length; i++) {
    runningLength += sentenceList[i].length;
    splitIndex = i + 1;
    if (runningLength >= targetLength) break;
  }

  splitIndex = Math.max(1, Math.min(sentenceList.length - 1, splitIndex));

  return [
    sentenceList.slice(0, splitIndex).join(" ").trim(),
    sentenceList.slice(splitIndex).join(" ").trim(),
  ];
};

type ExteriorShowcaseSectionProps = {
  modelName: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  backgroundSrc?: string;
};

export function ExteriorShowcaseSection({
  modelName,
  title,
  subtitle,
  paragraphs,
  backgroundSrc = "/home/Homeassets(D1V1C3).jpg",
}: ExteriorShowcaseSectionProps) {
  const [firstParagraph, secondParagraph] = getBalancedParagraphs(paragraphs);

  return (
    <section className="bg-black">
      <div className="container-wide">
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[420px] w-screen overflow-hidden md:min-h-[560px]">
          <Image
            src={backgroundSrc}
            alt={`${modelName} exterior background`}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 h-full">
            <div className="container-wide grid h-full items-center gap-8 px-6 py-10 md:grid-cols-1 md:gap-12 md:px-10 md:py-14 lg:gap-16 lg:px-12 lg:py-16">
              <div className="max-w-xl space-y-6">
                <Badge className="mb-4 border-accent/30 bg-accent/20 text-accent">EXTERIOR</Badge>

                <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                  {title.toUpperCase()}{" "}
                  <span className="text-accent">{subtitle.toUpperCase()}</span>
                  <br />
                </h2>

                <p className="text-base leading-relaxed text-gray-300 md:text-lg">{firstParagraph}</p>
                <p className="text-base leading-relaxed text-gray-300 md:text-lg">{secondParagraph}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
