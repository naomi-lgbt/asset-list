import { assert } from "chai";
import { before } from "mocha";
import { Parser } from "xml2js";

// eslint-disable-next-line init-declarations
let fileList;

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
  return parsed.ListBucketResult.Contents;
};

suite("Asset data", () => {
  before(async () => {
    fileList = await getFiles();
  });

  for (const ns of adventureList) {
    test(`should have all adventures for ${ns}`, async () => {
      const json = (await import(`../json/${ns}/adventures.json`)).default;
      const data = fileList
        .filter((f) => f.Key[0].startsWith(`${ns}/games`))
        .map((i) => i.Key[0].split("/")[2])
        .filter((el) => el);
      assert.lengthOf(data, json.length);
      for (const object of json) {
        assert.include(data, object.fileName);
      }
    });
  }

  for (const ns of emoteList) {
    test(`should have all emotes for ${ns}`, async () => {
      const json = (await import(`../json/${ns}/emotes.json`)).default;
      const data = fileList
        .filter((f) => f.Key[0].startsWith(`${ns}/emotes`))
        .map((i) => i.Key[0].split("/")[2])
        .filter((el) => el);
      assert.lengthOf(data, json.length);
      for (const object of json) {
        assert.include(data, object.fileName);
      }
    });
  }

  for (const ns of outfitList) {
    test(`should have all outfits for ${ns}`, async () => {
      const json = (await import(`../json/${ns}/outfits.json`)).default;
      const data = fileList
        .filter((f) => f.Key[0].startsWith(`${ns}/outfits`))
        .map((i) => i.Key[0].split("/")[2])
        .filter((el) => el);
      assert.lengthOf(data, json.length);
      for (const object of json) {
        assert.include(data, object.fileName);
      }
    });
  }

  for (const ns of portraitsList) {
    test(`should have all portraits for ${ns}`, async () => {
      const json = (await import(`../json/${ns}/portraits.json`)).default;
      const data = fileList
        .filter((f) => f.Key[0].startsWith(`${ns}/art`))
        .map((i) => i.Key[0].split("/")[2])
        .filter((el) => el);
      assert.lengthOf(data, json.length);
      for (const object of json) {
        assert.include(data, object.fileName);
      }
    });
  }

  for (const ns of posesList) {
    test(`should have all poses for ${ns}`, async () => {
      const json = (await import(`../json/${ns}/poses.json`)).default;
      const data = fileList
        .filter((f) => f.Key[0].startsWith(`${ns}/koikatsu`))
        .map((i) => i.Key[0].split("/")[2])
        .filter((el) => el);
      assert.lengthOf(data, json.length);
      for (const string of json) {
        assert.include(data, string);
      }
    });
  }
});
