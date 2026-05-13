/** Backgrounds for `ExteriorShowcaseSection` — files live under `public/modelexterior/`. */
export const DEFAULT_EXTERIOR_SHOWCASE_BG = "/home/Homeassets(D1V1C3).jpg";

const modelExteriorImageById: Record<string, string> = {
  "20urer": "/modelexterior/2ourerCaravanD1.jpeg",
  gravity: "/modelexterior/GravityCaravanD1.jpeg",
  tonka: "/modelexterior/TonkaCaravanD1.jpeg",
  xplora: "/modelexterior/XploraCaravanD1.jpeg",
};

export function getExteriorShowcaseBackground(modelId: string): string {
  return modelExteriorImageById[modelId] ?? DEFAULT_EXTERIOR_SHOWCASE_BG;
}
