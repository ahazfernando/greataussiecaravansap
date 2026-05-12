export const modelProductDiscoveryImagesById: Record<string, string> = {
  "20urer": "/natural/2ourerModel.jpeg",
  gravity: "/natural/GravityCaravanModel.jpeg",
  xplora: "/natural/XploraCaravanModel.jpeg",
  tonka: "/natural/TonkaCaravanModel.jpeg",
};

type ProductDiscoveryHighlights = {
  solar: string;
  battery: string;
  water: string;
  inverter: string;
  suspension: string;
};

export function getProductDiscoveryFourthSpec(
  modelId: string,
  highlights: ProductDiscoveryHighlights,
): { value: string; label: string } {
  if (highlights.inverter && highlights.inverter !== "—") {
    return { label: "Inverter", value: highlights.inverter };
  }

  const customByModel: Record<string, { label: string; value: string }> = {
    tonka: { label: "Inverter", value: "5000 VA" },
    "outback-explorer-21": { label: "Inverter", value: "2000 W" },
    xplora: { label: "Inverter", value: "3000 VA" },
  };

  const custom = customByModel[modelId];
  if (custom) return custom;

  return { label: "Suspension", value: highlights.suspension };
}
