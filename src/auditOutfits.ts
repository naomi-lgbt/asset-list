import { OutfitData } from "./interfaces/Data";
import { logHandler } from "./utils/logHandler";

(async () => {
  const wrongUrls = ["The following outfits use the incorrect booth URL."];
  const ns = "naomi";
  // This avoids a compiler error hehe
  const outfits = (await import(`../json/${ns}/outfits.json`))
    .default as OutfitData[];
  const urlMap = new Map<string, string[]>();
  for (const outfit of outfits) {
    const urls = Object.values(outfit.credits);
    for (const url of urls) {
      urlMap.has(url)
        ? urlMap.get(url)?.push(outfit.fileName)
        : urlMap.set(url, [outfit.fileName]);
    }
  }
  const duplicates = [
    "The following outfits have duplicated assets. Please check that they are unique.",
  ];
  for (const [key, value] of urlMap.entries()) {
    // Skip the Steam URL (used for default assets)
    if (/store\.steampowered\.com\/app\/1486350/.test(key)) {
      continue;
    }
    if (!/booth\.pm\/en\/items/.test(key)) {
      wrongUrls.push(...value);
    }
    if (value.length > 1) {
      duplicates.push(`${key}: ${value.join(", ")}`);
    }
  }
  duplicates.length > 1 && logHandler.log("info", duplicates.join("\n"));
  wrongUrls.length > 1 && logHandler.log("info", wrongUrls.join("\n"));
  duplicates.length === 1 &&
    wrongUrls.length === 1 &&
    logHandler.log("info", "All files pass validation~!");
})();
