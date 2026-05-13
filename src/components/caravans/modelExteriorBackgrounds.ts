/** Backgrounds for `ExteriorShowcaseSection` — files live under `public/modelexterior/`. */
export const DEFAULT_EXTERIOR_SHOWCASE_BG = "/home/Homeassets(D1V1C3).jpg";

const gravityExteriorImage = `/modelexterior/${encodeURIComponent("ChatGPT Image May 13, 2026, 09_35_35 PM.png")}`;

const modelExteriorImageById: Record<string, string> = {
  "20urer": "/modelexterior/2ourerCaravanD1.png",
  gravity: gravityExteriorImage,
  tonka: "/modelexterior/TonkaCaravanD1.png",
  xplora: "/modelexterior/XploraCaravanD1.jpeg",
};

export function getExteriorShowcaseBackground(modelId: string): string {
  return modelExteriorImageById[modelId] ?? DEFAULT_EXTERIOR_SHOWCASE_BG;
}
