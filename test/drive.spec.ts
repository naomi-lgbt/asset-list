import { readFile } from "fs/promises";
import { join } from "path";

import { assert } from "chai";

import { OutfitData } from "../src/interfaces/Data";

suite("google drive validation", () => {
  test("should have parity between VROID and VRM/PNG files", async () => {
    const outfitFiles = (
      await readFile(join(process.cwd(), "drive", "outfit.txt"), "utf-8")
    )
      .trim()
      .split("\n")
      .map((file) => file.replace(".png", ""));
    const vrmFiles = (
      await readFile(join(process.cwd(), "drive", "vrm.txt"), "utf-8")
    )
      .trim()
      .split("\n")
      .map((file) =>
        file
          .replace(/Naomi \((.*)\)\.vrm/, "$1")
          .toLowerCase()
          .replace(/\s+/g, "-")
      );
    const vroidFiles = (
      await readFile(join(process.cwd(), "drive", "vroid.txt"), "utf-8")
    )
      .trim()
      .split("\n")
      .map((file) =>
        file
          .replace(".vroid", "")
          .replace(/^naomi-/, "")
          .replace(/\s+/g, "-")
      );
    const uniqueVroid = vroidFiles.filter(
      (el) => vroidFiles.indexOf(el) !== vroidFiles.lastIndexOf(el)
    );
    const uniqueVrm = vrmFiles.filter(
      (el) => vrmFiles.indexOf(el) !== vrmFiles.lastIndexOf(el)
    );
    const uniqueOutfit = outfitFiles.filter(
      (el) => outfitFiles.indexOf(el) !== outfitFiles.lastIndexOf(el)
    );
    assert.lengthOf(
      uniqueVroid,
      0,
      `${uniqueVroid.join(", ")} appear to be duplicates.`
    );
    assert.lengthOf(
      uniqueVrm,
      0,
      `${uniqueVrm.join(", ")} appear to be duplicates.`
    );
    assert.lengthOf(
      uniqueOutfit,
      0,
      `${uniqueOutfit.join(", ")} appear to be duplicates.`
    );
    const missingVroidFromOutfits = outfitFiles.filter(
      (file) => !vroidFiles.includes(file)
    );
    const missingVroidFromVrms = vrmFiles.filter(
      (file) => !vroidFiles.includes(file)
    );
    const missingOutfitForVroid = vroidFiles.filter(
      (file) => !outfitFiles.includes(file)
    );
    const missingVrmForVroid = vroidFiles.filter(
      (file) => !vrmFiles.includes(file)
    );
    assert.lengthOf(
      missingVroidFromOutfits,
      0,
      `Outfit file **${missingVroidFromOutfits.join(
        ", "
      )}** missing corresponding VRoid file.`
    );
    assert.lengthOf(
      missingVroidFromVrms,
      0,
      `VRM file **${missingVroidFromVrms.join(
        ", "
      )}** missing corresponding VRoid file.`
    );
    assert.lengthOf(
      missingOutfitForVroid,
      0,
      `VRoid file **${missingOutfitForVroid.join(
        ", "
      )}** missing corresponding outfit file.`
    );
    assert.lengthOf(
      missingVrmForVroid,
      0,
      `VRoid file **${missingVroidFromOutfits.join(
        ", "
      )}** missing corresponding VRM file.`
    );
    // sanity checking
    assert.equal(vrmFiles.length, vroidFiles.length);
    assert.equal(outfitFiles.length, vroidFiles.length);
  });

  test("should have all png files for registered outfits", async () => {
    const json = (await import(`../json/naomi/outfits.json`))
      .default as OutfitData[];
    const outfitFiles = await readFile(
      join(process.cwd(), "drive", "outfit.txt"),
      "utf-8"
    );
    const outfitList = outfitFiles.trim().split("\n");
    for (const outfit of json) {
      assert.include(
        outfitList,
        outfit.fileName,
        `${outfit.fileName} is not found in Google Drive!`
      );
    }
  });
});
