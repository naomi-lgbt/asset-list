import { assert } from "chai";
import { findBestMatch } from "string-similarity";

import { NameSpaces } from "../src/config/NameSpaces";
import {
  AdventureData,
  EmoteData,
  OutfitData,
  PortraitsData,
  PosesData,
} from "../src/interfaces/Data";

const adventureList = NameSpaces.adventures;
const emoteList = NameSpaces.emotes;
const outfitList = NameSpaces.outfits;
const picrewList = NameSpaces.picrew;
const portraitsList = NameSpaces.portraits;
const posesList = NameSpaces.poses;

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

      test(`should not have outfit links with trailing slash`, async () => {
        const json = (await import(`../json/${ns}/outfits.json`))
          .default as OutfitData[];
        for (const outfit of json) {
          for (const url of Object.values(outfit.credits)) {
            if (url.includes("store.steampowered")) {
              continue;
            }
            assert.notMatch(url, /\/$/);
          }
        }
      });

      test(`should not reuse outfit components`, async () => {
        const urls: string[] = [];
        const json = (await import(`../json/${ns}/outfits.json`))
          .default as OutfitData[];
        for (const outfit of json) {
          for (const url of Object.values(outfit.credits)) {
            if (url.includes("store.steampowered")) {
              continue;
            }
            assert.match(url, /https:\/\/booth.pm\/en\/items\/\d+/);
            urls.push(url);
          }
        }
        const set = new Set(urls);
        assert.strictEqual(
          set.size,
          urls.length,
          `The following outfit components are duplicated: ${urls.filter(
            (u, i) => urls.indexOf(u) !== i
          )}`
        );
      });
    }
  });

  suite("Picrew", () => {
    for (const ns of picrewList) {
      test(`should have unique filenames for ${ns}`, async () => {
        const json = (await import(`../json/${ns}/picrew.json`))
          .default as string[];
        const set = new Set(json);
        assert.equal(set.size, json.length);
      });

      test(`should all be image files`, async () => {
        const json = (await import(`../json/${ns}/picrew.json`))
          .default as string[];
        for (const file of json) {
          assert.match(file, /\.png$/);
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
