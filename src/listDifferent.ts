import { Parser } from "xml2js";

import {
  AdventureData,
  EmoteData,
  OutfitData,
  PortraitsData,
  PosesData,
} from "./interfaces/Data";
import { FileList } from "./interfaces/FileList";
import { logHandler } from "./utils/logHandler";

const adventureList = ["becca", "naomi", "rosalia"];
const emoteList = ["becca", "naomi"];
const outfitList = ["naomi"];
const portraitsList = ["becca", "beccalia", "naomi", "rosalia"];
const posesList = ["becca", "beccalia", "naomi", "novas", "rosalia"];

const getFiles = async () => {
  const raw = await fetch(`https://cdn.naomi.lgbt`);
  const text = await raw.text();
  const parser = new Parser();
  const parsed = await parser.parseStringPromise(text);
  return parsed.ListBucketResult.Contents as FileList[];
};

const parseFileName = (fileName: string, namespace: string, type: string) =>
  `${namespace}/${type}/${fileName}`;

(async () => {
  const missingFromJSON: string[] = [];
  const missingFromCDN: string[] = [];
  const fileList = await getFiles();

  for (const ns of adventureList) {
    const json = (await import(`../json/${ns}/adventures.json`))
      .default as AdventureData[];
    const data = fileList
      .filter((f) => f.Key[0].startsWith(`${ns}/games`))
      .map((i) => i.Key[0].split("/")[2])
      .filter((el) => el);
    for (const file of data) {
      const adventure = json.find((a) => a.fileName === file);
      if (!adventure) {
        missingFromJSON.push(parseFileName(file, ns, "games"));
      }
    }
    for (const object of json) {
      const file = data.find((f) => f === object.fileName);
      if (!file) {
        missingFromCDN.push(parseFileName(object.fileName, ns, "games"));
      }
    }
  }

  for (const ns of emoteList) {
    const json = (await import(`../json/${ns}/emotes.json`))
      .default as EmoteData[];
    const data = fileList
      .filter((f) => f.Key[0].startsWith(`${ns}/emotes`))
      .map((i) => i.Key[0].split("/")[2])
      .filter((el) => el);
    for (const file of data) {
      const adventure = json.find((a) => a.fileName === file);
      if (!adventure) {
        missingFromJSON.push(parseFileName(file, ns, "emotes"));
      }
    }
    for (const object of json) {
      const file = data.find((f) => f === object.fileName);
      if (!file) {
        missingFromCDN.push(parseFileName(object.fileName, ns, "emotes"));
      }
    }
  }

  for (const ns of outfitList) {
    const json = (await import(`../json/${ns}/outfits.json`))
      .default as OutfitData[];
    const data = fileList
      .filter((f) => f.Key[0].startsWith(`${ns}/outfits`))
      .map((i) => i.Key[0].split("/")[2])
      .filter((el) => el);
    for (const file of data) {
      const adventure = json.find((a) => a.fileName === file);
      if (!adventure) {
        missingFromJSON.push(parseFileName(file, ns, "outfits"));
      }
    }
    for (const object of json) {
      const file = data.find((f) => f === object.fileName);
      if (!file) {
        missingFromCDN.push(parseFileName(object.fileName, ns, "outfits"));
      }
    }
  }

  for (const ns of posesList) {
    const json = (await import(`../json/${ns}/poses.json`))
      .default as PosesData[];
    const data = fileList
      .filter((f) => f.Key[0].startsWith(`${ns}/koikatsu`))
      .map((i) => i.Key[0].split("/")[2])
      .filter((el) => el);
    for (const file of data) {
      const adventure = json.find((a) => a.fileName === file);
      if (!adventure) {
        missingFromJSON.push(parseFileName(file, ns, "koikatsu"));
      }
    }
    for (const object of json) {
      const file = data.find((f) => f === object.fileName);
      if (!file) {
        missingFromCDN.push(parseFileName(object.fileName, ns, "koikatsu"));
      }
    }
  }

  for (const ns of portraitsList) {
    const json = (await import(`../json/${ns}/portraits.json`))
      .default as PortraitsData[];
    const data = fileList
      .filter((f) => f.Key[0].startsWith(`${ns}/art`))
      .map((i) => i.Key[0].split("/")[2])
      .filter((el) => el);
    for (const file of data) {
      const adventure = json.find((a) => a.fileName === file);
      if (!adventure) {
        missingFromJSON.push(parseFileName(file, ns, "art"));
      }
    }
    for (const object of json) {
      const file = data.find((f) => f === object.fileName);
      if (!file) {
        missingFromCDN.push(parseFileName(object.fileName, ns, "art"));
      }
    }
  }

  logHandler.log(
    `info`,
    `\nMissing ${missingFromJSON.length} from JSON files:\n\n${missingFromJSON
      .sort()
      .join(`\n`)}`
  );
  logHandler.log(
    `info`,
    `\nMissing ${missingFromCDN.length} from CDN:\n\n${missingFromCDN
      .sort()
      .join(`\n`)}`
  );
})();
