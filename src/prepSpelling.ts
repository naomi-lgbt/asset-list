import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

import {
  AdventureData,
  EmoteData,
  OutfitData,
  PortraitsData,
  PosesData,
} from "../src/interfaces/Data";

const adventureList = ["becca", "naomi", "rosalia"];
const emoteList = ["becca", "naomi"];
const outfitList = ["naomi"];
const portraitsList = ["becca", "beccalia", "naomi", "rosalia"];
const posesList = ["becca", "beccalia", "naomi", "novas", "rosalia", "melody"];

(async () => {
  await mkdir(join(process.cwd(), "temp")).catch(() => null);
  for (const ns of posesList) {
    await mkdir(join(process.cwd(), "temp", ns)).catch(() => null);
  }
  for (const ns of adventureList) {
    const raw = (await import(`../json/${ns}/adventures.json`))
      .default as AdventureData[];
    const filtered = raw.map(({ description, alt }) => ({
      description,
      alt,
    }));
    await writeFile(
      join(process.cwd(), "temp", ns, "adventures.json"),
      JSON.stringify(filtered, null, 2)
    );
  }

  for (const ns of emoteList) {
    const raw = (await import(`../json/${ns}/emotes.json`))
      .default as EmoteData[];
    const filtered = raw.map(({ name, description, alt }) => ({
      name,
      description,
      alt,
    }));
    await writeFile(
      join(process.cwd(), "temp", ns, "emotes.json"),
      JSON.stringify(filtered, null, 2)
    );
  }

  for (const ns of outfitList) {
    const raw = (await import(`../json/${ns}/outfits.json`))
      .default as OutfitData[];
    const filtered = raw.map(({ name, description, alt }) => ({
      name,
      description,
      alt,
    }));
    await writeFile(
      join(process.cwd(), "temp", ns, "outfits.json"),
      JSON.stringify(filtered, null, 2)
    );
  }

  for (const ns of portraitsList) {
    const raw = (await import(`../json/${ns}/portraits.json`))
      .default as PortraitsData[];
    const filtered = raw.map(({ name, description, alt }) => ({
      name,
      description,
      alt,
    }));
    await writeFile(
      join(process.cwd(), "temp", ns, "portraits.json"),
      JSON.stringify(filtered, null, 2)
    );
  }

  for (const ns of posesList) {
    const raw = (await import(`../json/${ns}/poses.json`))
      .default as PosesData[];
    const filtered = raw.map(({ name, description, alt }) => ({
      name,
      description,
      alt,
    }));
    await writeFile(
      join(process.cwd(), "temp", ns, "poses.json"),
      JSON.stringify(filtered, null, 2)
    );
  }
})();
