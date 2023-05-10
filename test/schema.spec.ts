import { assert } from "chai";

const adventureList = ["becca", "naomi", "rosalia"];
const emoteList = ["becca", "naomi"];
const outfitList = ["naomi"];
const portraitsList = ["becca", "beccalia", "naomi", "rosalia"];
const posesList = ["becca", "beccalia", "naomi", "novas", "rosalia"];

suite("Adventure schemas", () => {
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
  }
});

suite("Emote schemas", () => {
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
  }
});

suite("Outfit schemas", () => {
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
  }
});

suite("Portraits schemas", () => {
  test("should all exist", () => {
    assert.equal(true, true);
  });
  for (const ns of portraitsList) {
    test(`should have the correct properties for ${ns}`, async () => {
      const keys = ["fileName", "name", "artist", "url", "alt", "description"];
      const json = (await import(`../json/${ns}/portraits.json`)).default;
      for (const object of json) {
        assert.containsAllKeys(object, keys);
        assert.lengthOf(Object.keys(object), keys.length);
        for (const key of Object.keys(object)) {
          assert.isString(object[key]);
          assert.isNotEmpty(object[key]);
        }
      }
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
  }
});

suite("Poses schemas", () => {
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
        }
      }
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
  }
});
