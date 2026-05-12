export function getModelLogo(modelName: string): string {
  const logoMap: Record<string, string> = {
    Striker: "/caravanmodels/strikerlogo.png",
    "20URER": "/caravanmodels/eourerlogo.png",
    Gravity: "/caravanmodels/gravitylogo.png",
    Xplora: "/caravanmodels/xploralogo.png",
    Tonka: "/caravanmodels/tonkologo.png",
    Paragon: "/caravanlogos/litelogo.png",
  };

  return logoMap[modelName] || "/caravanlogos/litelogo.png";
}
