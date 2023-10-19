import { assert } from "chai";

import { NameSpaces } from "../src/config/NameSpaces";

const adventureList = NameSpaces.adventures;
const emoteList = NameSpaces.emotes;
const outfitList = NameSpaces.outfits;
const picrewList = NameSpaces.picrew;
const portraitsList = NameSpaces.portraits;
const posesList = NameSpaces.poses;

suite("Schema Validation:", () => {
  suite("Adventures", () => {
    test("should all exist", () => {
      assert.equal(true, true);
    });
    for (const ns of adventureList) {
      test(`should have the correct properties for ${ns}`, async () => {
        const keys = ["fileName", "game", "alt", "description"];
        const json = (await import(`../json/${ns}/adventures.json`)).default;
        for (const object of json) {
          assert.containsAllKeys(object, keys);
          assert.lengthOf(Object.keys(object), keys.length);
          for (const key of Object.keys(object)) {
            assert.isString(object[key]);
            assert.isNotEmpty(object[key]);
          }
        }
      });
    }
  });

  suite("Emotes", () => {
    test("should all exist", () => {
      assert.equal(true, true);
    });

    for (const ns of emoteList) {
      test(`should have the correct properties for ${ns}`, async () => {
        const keys = ["fileName", "name", "alt", "description"];
        const json = (await import(`../json/${ns}/emotes.json`)).default;
        for (const object of json) {
          assert.containsAllKeys(object, keys);
          assert.lengthOf(Object.keys(object), keys.length);
          for (const key of Object.keys(object)) {
            assert.isString(object[key]);
            assert.isNotEmpty(object[key]);
          }
        }
      });
    }
  });

  suite("Outfits", () => {
    test("should all exist", () => {
      assert.equal(true, true);
    });
    for (const ns of outfitList) {
      test(`should have the correct properties for ${ns}`, async () => {
        const keys = ["name", "fileName", "description", "alt", "credits"];
        const json = (await import(`../json/${ns}/outfits.json`)).default;
        for (const object of json) {
          assert.containsAllKeys(object, keys);
          assert.lengthOf(Object.keys(object), keys.length);
          for (const key of Object.keys(object)) {
            if (key === "credits") {
              // credits can be empty as it falls back to a default message
              assert.isObject(object[key]);
            } else {
              assert.isString(object[key]);
              assert.isNotEmpty(object[key]);
            }
          }
        }
      });
    }
  });

  suite("Portraits", () => {
    test("should all exist", () => {
      assert.equal(true, true);
    });
    for (const ns of portraitsList) {
      test(`should have the correct properties for ${ns}`, async () => {
        const keys = [
          "fileName",
          "name",
          "artist",
          "url",
          "alt",
          "description",
        ];
        const json = (await import(`../json/${ns}/portraits.json`)).default;
        for (const object of json) {
          assert.containsAllKeys(object, keys);
          assert.lengthOf(Object.keys(object), keys.length);
          for (const key of Object.keys(object)) {
            assert.isString(object[key]);
            assert.isNotEmpty(object[key]);
          }
        }
      });
    }
  });

  suite("Picrew", () => {
    for (const ns of picrewList) {
      test("should be all strings", async () => {
        const json = (await import(`../json/${ns}/picrew.json`)).default;
        for (const object of json) {
          assert.isString(object);
          assert.isNotEmpty(object);
        }
      });
    }
  });

  suite("Poses", () => {
    test("should all exist", () => {
      assert.equal(true, true);
    });
    for (const ns of posesList) {
      test(`should have the correct properties for ${ns}`, async () => {
        const keys = ["fileName", "name", "alt", "description"];
        const json = (await import(`../json/${ns}/poses.json`)).default;
        for (const object of json) {
          assert.containsAllKeys(object, keys);
          assert.lengthOf(Object.keys(object), keys.length);
          for (const key of Object.keys(object)) {
            assert.isString(object[key]);
            assert.isNotEmpty(object[key]);
          }
        }
      });
    }
  });
});
