import { assert } from "chai";
import { findBestMatch } from "string-similarity";

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
const posesList = [
  "becca",
  "beccalia",
  "naomi",
  "novas",
  "rosalia",
  "melody",
  "erin",
];

suite("Data Validation:", () => {
  suite("Adventures", () => {
    for (const ns of adventureList) {
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
            0.75,
            `${target} is too similar to ${closest.target}`
          );
        }
      });
    }
  });

  suite("Emotes", () => {
    for (const ns of emoteList) {
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
            0.75,
            `${target} is too similar to ${closest.target}`
          );
        }
      });
    }
  });

  suite("Outfits", () => {
    for (const ns of outfitList) {
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
            0.75,
            `${target} is too similar to ${closest.target}`
          );
        }
      });
    }
  });

  suite("Portraits", () => {
    for (const ns of portraitsList) {
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
            0.75,
            `${target} is too similar to ${closest.target}`
          );
        }
      });
    }
  });

  suite("Poses", () => {
    for (const ns of posesList) {
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
            0.75,
            `${target} is too similar to ${closest.target}`
          );
        }
      });
    }
  });
});
