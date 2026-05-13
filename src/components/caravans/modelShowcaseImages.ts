type ShowcaseImageSource = {
  gallery?: (string | unknown)[];
  images?: (string | unknown)[];
  heroImage?: string | unknown;
};

function showcaseUrl(v: unknown): string | null {
  if (typeof v === "string" && v.length > 0) return v;
  if (v && typeof v === "object" && "src" in v) {
    const src = (v as { src: unknown }).src;
    if (typeof src === "string" && src.length > 0) return src;
  }
  return null;
}

/** Curated studio shots when present; otherwise gallery → images → hero (strings or Next static imports). */
export function getModelShowcaseImages(modelId: string, caravan: ShowcaseImageSource): string[] {
  const curated = modelShowcaseImagesById[modelId];
  if (curated?.length) return [...curated];

  const out: string[] = [];
  const push = (s: string) => {
    if (!out.includes(s)) out.push(s);
  };

  for (const item of caravan.gallery ?? []) {
    const u = showcaseUrl(item);
    if (u) push(u);
  }
  for (const item of caravan.images ?? []) {
    const u = showcaseUrl(item);
    if (u) push(u);
  }
  const hero = showcaseUrl(caravan.heroImage);
  if (hero) push(hero);

  return out.slice(0, 12);
}

export const modelShowcaseImagesById: Record<string, string[]> = {
  "20urer": [
    "/2ourerStudioImages/2ourerD1C1V1.jpeg",
    "/2ourerStudioImages/I_want_you_to_place_202605062159.jpeg",
  ],
  gravity: [
    "/GravityStudioImages/GravityModelD1V1C1.jpeg",
    "/GravityStudioImages/GravityModelD1V2C1.jpeg",
    "/GravityStudioImages/GravityModelD1V3C1.jpeg",
    "/GravityStudioImages/GravityModelD1V4C1.jpeg",
  ],
  xplora: [
    "/XploraStudioImages/XPloraModelD1V1C1.jpeg",
    "/XploraStudioImages/XPloraModelD1V2C1.jpeg",
    "/XploraStudioImages/XPloraModelD1V3C1.jpeg",
    "/XploraStudioImages/XPloraModelD1V4C1.jpeg",
    "/XploraStudioImages/XPloraModelD1V5C1.jpeg",
    "/XploraStudioImages/XPloraModelD1V6C1.jpeg",
  ],
  tonka: [
    "/TonkaStudioImages/TonkaModelD1V1C1.jpeg",
    "/TonkaStudioImages/TonkaModelD1V2C1.jpeg",
    "/TonkaStudioImages/TonkaModelD1V3C1.jpeg",
    "/TonkaStudioImages/TonkaModelD1V4C1.jpeg",
    "/TonkaStudioImages/TonkaModelD1V5C1.jpeg",
  ],
};
