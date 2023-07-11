import { assert } from "chai";
import { before } from "mocha";
import { findBestMatch } from "string-similarity";
import { Parser } from "xml2js";

import {
  AdventureData,
  EmoteData,
  OutfitData,
  PortraitsData,
  PosesData,
} from "../src/interfaces/Data";
import { FileList } from "../src/interfaces/FileList";

// eslint-disable-next-line init-declarations
let fileList: FileList[];

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

suite("Asset data", () => {
  before(async () => {
    fileList = await getFiles();
  });

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

    test(`should have unique names and filenames for ${ns}`, async () => {
      const json = (await import(`../json/${ns}/adventures.json`))
        .default as AdventureData[];
      const fileNames = json.map((a) => a.fileName);
      for (const file of fileNames) {
        assert.lengthOf(
          fileNames.filter((f) => f === file),
          1,
          `${file} is duplicated in ${ns}`
        );
      }
      const names = json.map((a) => a.game);
      for (const name of names) {
        assert.lengthOf(
          names.filter((n) => n === name),
          1,
          `${name} is duplicated in ${ns}`
        );
      }
    });

    test(`should not have similar descriptions for ${ns}`, async () => {
      const json = (await import(`../json/${ns}/adventures.json`))
        .default as AdventureData[];
      const descriptions = json.map((a) => a.description);
      for (let i = 0; i < json.length - 1; i++) {
        const target = descriptions[i];
        const closest = findBestMatch(
          target,
          descriptions.slice(i + 1)
        ).bestMatch;
        assert.isBelow(
          closest.rating,
          0.9,
          `${target} is too similar to ${closest.target}`
        );
      }
    });
  }

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

    test(`should have unique names and filenames for ${ns}`, async () => {
      const json = (await import(`../json/${ns}/emotes.json`))
        .default as EmoteData[];
      const fileNames = json.map((a) => a.fileName);
      for (const file of fileNames) {
        assert.lengthOf(
          fileNames.filter((f) => f === file),
          1,
          `${file} is duplicated in ${ns}`
        );
      }
      const names = json.map((a) => a.name);
      for (const name of names) {
        assert.lengthOf(
          names.filter((n) => n === name),
          1,
          `${name} is duplicated in ${ns}`
        );
      }
    });

    test(`should not have similar descriptions for ${ns}`, async () => {
      const json = (await import(`../json/${ns}/emotes.json`))
        .default as EmoteData[];
      const descriptions = json.map((a) => a.description);
      for (let i = 0; i < json.length - 1; i++) {
        const target = descriptions[i];
        const closest = findBestMatch(
          target,
          descriptions.slice(i + 1)
        ).bestMatch;
        assert.isBelow(
          closest.rating,
          0.9,
          `${target} is too similar to ${closest.target}`
        );
      }
    });
  }

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

    test(`should have unique names and filenames for ${ns}`, async () => {
      const json = (await import(`../json/${ns}/outfits.json`))
        .default as OutfitData[];
      const fileNames = json.map((a) => a.fileName);
      for (const file of fileNames) {
        assert.lengthOf(
          fileNames.filter((f) => f === file),
          1,
          `${file} is duplicated in ${ns}`
        );
      }
      const names = json.map((a) => a.name);
      for (const name of names) {
        assert.lengthOf(
          names.filter((n) => n === name),
          1,
          `${name} is duplicated in ${ns}`
        );
      }
    });

    test(`should not have similar descriptions for ${ns}`, async () => {
      const json = (await import(`../json/${ns}/outfits.json`))
        .default as OutfitData[];
      const descriptions = json.map((a) => a.description);
      for (let i = 0; i < json.length - 1; i++) {
        const target = descriptions[i];
        const closest = findBestMatch(
          target,
          descriptions.slice(i + 1)
        ).bestMatch;
        assert.isBelow(
          closest.rating,
          0.9,
          `${target} is too similar to ${closest.target}`
        );
      }
    });
  }

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

    test(`should have unique names and filenames for ${ns}`, async () => {
      const json = (await import(`../json/${ns}/portraits.json`))
        .default as PortraitsData[];
      const fileNames = json.map((a) => a.fileName);
      for (const file of fileNames) {
        assert.lengthOf(
          fileNames.filter((f) => f === file),
          1,
          `${file} is duplicated in ${ns}`
        );
      }
      const names = json.map((a) => a.name);
      for (const name of names) {
        assert.lengthOf(
          names.filter((n) => n === name),
          1,
          `${name} is duplicated in ${ns}`
        );
      }
    });

    test(`should not have similar descriptions for ${ns}`, async () => {
      const json = (await import(`../json/${ns}/portraits.json`))
        .default as PortraitsData[];
      const descriptions = json.map((a) => a.description);
      for (let i = 0; i < json.length - 1; i++) {
        const target = descriptions[i];
        const closest = findBestMatch(
          target,
          descriptions.slice(i + 1)
        ).bestMatch;
        assert.isBelow(
          closest.rating,
          0.9,
          `${target} is too similar to ${closest.target}`
        );
      }
    });
  }

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

    test(`should have unique names and filenames for ${ns}`, async () => {
      const json = (await import(`../json/${ns}/poses.json`))
        .default as PosesData[];
      const fileNames = json.map((a) => a.fileName);
      for (const file of fileNames) {
        assert.lengthOf(
          fileNames.filter((f) => f === file),
          1,
          `${file} is duplicated in ${ns}`
        );
      }
      const names = json.map((a) => a.name);
      for (const name of names) {
        assert.lengthOf(
          names.filter((n) => n === name),
          1,
          `${name} is duplicated in ${ns}`
        );
      }
    });

    test(`should not have similar descriptions for ${ns}`, async () => {
      const json = (await import(`../json/${ns}/poses.json`))
        .default as PosesData[];
      const descriptions = json.map((a) => a.description);
      for (let i = 0; i < json.length - 1; i++) {
        const target = descriptions[i];
        const closest = findBestMatch(
          target,
          descriptions.slice(i + 1)
        ).bestMatch;
        assert.isBelow(
          closest.rating,
          0.9,
          `${target} is too similar to ${closest.target}`
        );
      }
    });
  }
});
