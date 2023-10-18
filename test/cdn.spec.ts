import { assert } from "chai";
import { before } from "mocha";
import { Parser } from "xml2js";

import { NameSpaces } from "../src/config/NameSpaces";
import {
  AdventureData,
  EmoteData,
  OutfitData,
  PortraitsData,
  PosesData,
} from "../src/interfaces/Data";
import { FileList } from "../src/interfaces/FileList";

let fileList: FileList[] = [];
const adventureList = NameSpaces.adventures;
const emoteList = NameSpaces.emotes;
const outfitList = NameSpaces.outfits;
const picrewList = NameSpaces.picrew;
const portraitsList = NameSpaces.portraits;
const posesList = NameSpaces.poses;

const getFiles = async () => {
  const arr: FileList[] = [];
  let truncated = true;
  let marker = "";
  while (truncated) {
    const raw = await fetch(`https://cdn.naomi.lgbt?marker=${marker}`);
    const text = await raw.text();
    const parser = new Parser();
    const parsed = await parser.parseStringPromise(text);
    truncated = parsed.ListBucketResult.IsTruncated?.[0] === "true";
    marker = parsed.ListBucketResult.NextMarker?.[0];
    arr.push(...parsed.ListBucketResult.Contents);
  }
  return arr;
};

suite("CDN Validation:", () => {
  before(async () => {
    fileList = await getFiles();
  });

  suite("Adventures", () => {
    for (const ns of adventureList) {
      test(`should have all adventures for ${ns}`, async () => {
        const json = (await import(`../json/${ns}/adventures.json`))
          .default as AdventureData[];
        const data = fileList
          .filter((f) => f.Key[0].startsWith(`${ns}/games`))
          .map((i) => i.Key[0].split("/")[2])
          .filter((el) => el);
        for (const file of data) {
          const adventure = json.find((a) => a.fileName === file);
          assert.isDefined(adventure, `JSON is missing ${file}`);
        }
        for (const object of json) {
          assert.include(data, object.fileName);
        }
        assert.equal(data.length, json.length);
      });
    }
  });

  suite("Emotes", () => {
    for (const ns of emoteList) {
      test(`should have all emotes for ${ns}`, async () => {
        const json = (await import(`../json/${ns}/emotes.json`))
          .default as EmoteData[];
        const data = fileList
          .filter((f) => f.Key[0].startsWith(`${ns}/emotes`))
          .map((i) => i.Key[0].split("/")[2])
          .filter((el) => el);
        for (const file of data) {
          const emote = json.find((a) => a.fileName === file);
          assert.isDefined(emote, `JSON is missing ${file}`);
        }
        for (const object of json) {
          assert.include(data, object.fileName);
        }
        assert.equal(data.length, json.length);
      });
    }
  });

  suite("Outfits", () => {
    for (const ns of outfitList) {
      test(`should have all outfits for ${ns}`, async () => {
        const json = (await import(`../json/${ns}/outfits.json`))
          .default as OutfitData[];
        const data = fileList
          .filter((f) => f.Key[0].startsWith(`${ns}/outfits`))
          .map((i) => i.Key[0].split("/")[2])
          .filter((el) => el);
        for (const file of data) {
          const outfit = json.find((a) => a.fileName === file);
          assert.isDefined(outfit, `JSON is missing ${file}`);
        }
        for (const object of json) {
          assert.include(data, object.fileName);
        }
        assert.equal(data.length, json.length);
      });
    }
  });

  suite("Picrew", () => {
    for (const ns of picrewList) {
      test(`should have all picrew`, async () => {
        const json = (await import(`../json/${ns}/picrew.json`)).default;
        const data = fileList
          .filter((f) => f.Key[0].startsWith(`${ns}/picrew`))
          .map((i) => i.Key[0].split("/")[2])
          .filter((el) => el);
        for (const file of data) {
          const picrew = json.find((a) => a === file);
          assert.isDefined(picrew, `JSON is missing ${file}`);
        }
      });
    }
  });

  suite("Portraits", () => {
    for (const ns of portraitsList) {
      test(`should have all portraits for ${ns}`, async () => {
        const json = (await import(`../json/${ns}/portraits.json`))
          .default as PortraitsData[];
        const data = fileList
          .filter((f) => f.Key[0].startsWith(`${ns}/art`))
          .map((i) => i.Key[0].split("/")[2])
          .filter((el) => el);
        for (const file of data) {
          const portrait = json.find((a) => a.fileName === file);
          assert.isDefined(portrait, `JSON is missing ${file}`);
        }
        for (const object of json) {
          assert.include(data, object.fileName);
        }
        assert.equal(data.length, json.length);
      });
    }
  });

  suite("Poses", () => {
    for (const ns of posesList) {
      test(`should have all poses for ${ns}`, async () => {
        const json = (await import(`../json/${ns}/poses.json`))
          .default as PosesData[];
        const data = fileList
          .filter((f) => f.Key[0].startsWith(`${ns}/koikatsu`))
          .map((i) => i.Key[0].split("/")[2])
          .filter((el) => el);
        for (const file of data) {
          const pose = json.find((a) => a.fileName === file);
          assert.isDefined(pose, `JSON is missing ${file}`);
        }
        for (const object of json) {
          assert.include(data, object.fileName);
        }
        assert.equal(data.length, json.length);
      });
    }
  });
});
