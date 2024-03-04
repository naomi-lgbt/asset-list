import { readFile } from "fs/promises";
import { join } from "path";

import { assert } from "chai";
import { google } from "googleapis";

import Outfits from "../json/naomi/outfits.json";

suite("google drive validation", () => {
  test("should have necessary file parity", async () => {
    const tokenContent = await readFile(
      join(process.cwd(), "drive", "token.json"),
      "utf-8"
    );
    const credentials = JSON.parse(tokenContent);
    const client = google.auth.fromJSON(credentials);
    // @ts-expect-error can't figure out the typedef here
    const drive = google.drive({ version: "v3", auth: client });

    const raw = await readFile(
      join(process.cwd(), "json", "naomi", "outfits.json"),
      "utf-8"
    );
    const fileList = JSON.parse(raw) as { name: string; fileName: string }[];

    const vroidFileList = await drive.files.list({
      pageSize: 1000,
      q: "'1bfNwGBsaUiwppbygC_KK7IcKiF6zBb4_' in parents and trashed = false and mimeType != 'application/vnd.google-apps.folder'",
    });
    const VRMFileList = await drive.files.list({
      pageSize: 1000,
      q: "'1-vVfHFpcyyQYAwoM4jyvuPie1eJX1mGN' in parents and trashed = false and mimeType != 'application/vnd.google-apps.folder'",
    });
    const outfitFileList = await drive.files.list({
      pageSize: 1000,
      q: "'1O1izkpzFkcmf0mtFWXEl0SodctbM1lmJ' in parents and trashed = false and mimeType != 'application/vnd.google-apps.folder'",
    });

    if (
      !vroidFileList.data.files?.length ||
      !VRMFileList.data.files?.length ||
      !outfitFileList.data.files?.length
    ) {
      assert.fail("Unable to load file list from Drive.");
      return;
    }

    const vroidFiles = vroidFileList.data.files
      ?.map((f) =>
        f.name
          ?.replace(".vroid", "")
          .replace(/^naomi-/, "")
          .replace(/\s+/g, "-")
      )
      .filter(Boolean);
    const VRMFiles = VRMFileList.data.files
      ?.map((f) =>
        f.name
          ?.replace(/Naomi \((.*)\)\.vrm/, "$1")
          .toLowerCase()
          .replace(/\s+/g, "-")
      )
      .filter(Boolean);
    const outfitFiles = outfitFileList.data.files
      ?.map((f) => f.name?.replace(".png", ""))
      .filter(Boolean);
    const outfitFileNames = outfitFileList.data.files
      .map((f) => f.name)
      .filter(Boolean);

    const missingVRMFiles = vroidFiles.filter((f) => !VRMFiles.includes(f));
    const missingOutfitFiles = vroidFiles.filter(
      (f) => !outfitFiles.includes(f)
    );
    const missingVroidFilesFromOutfit = outfitFiles.filter(
      (f) => !vroidFiles.includes(f)
    );
    const missingVroidFilesFromVRM = VRMFiles.filter(
      (f) => !vroidFiles.includes(f)
    );
    const missingDriveFilesFromVroid = Outfits.filter(
      (o) => !outfitFileNames.includes(o.fileName)
    );

    assert.lengthOf(
      missingVRMFiles,
      0,
      `Following VROID files do not have a VRM: ${missingVRMFiles.join("\n")}`
    );
    assert.lengthOf(
      missingOutfitFiles,
      0,
      `Following VROID files do not have an outfit: ${missingOutfitFiles.join(
        "\n"
      )}`
    );
    assert.lengthOf(
      missingVroidFilesFromOutfit,
      0,
      `Following outfit files do not have a VROID: ${missingVroidFilesFromOutfit.join(
        "\n"
      )}`
    );
    assert.lengthOf(
      missingVroidFilesFromVRM,
      0,
      `Following VRM files do not have a VROID: ${missingVroidFilesFromVRM.join(
        "\n"
      )}`
    );
    assert.lengthOf(
      missingDriveFilesFromVroid,
      0,
      `Following outfits in CDN are not on drive: ${missingDriveFilesFromVroid.join(
        "\n"
      )}`
    );

    const missingFromDriveEntirely = fileList.filter(
      (f) => !outfitFileNames.includes(f.fileName)
    );

    assert.lengthOf(
      missingFromDriveEntirely,
      0,
      `Following outfits are not found in Drive at all...\n ${missingFromDriveEntirely.join(
        "\n"
      )}`
    );
  });
});
