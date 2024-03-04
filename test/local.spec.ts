import { readdir, readFile } from "fs/promises";
import { join } from "path";

import { assert } from "chai";
import { google } from "googleapis";

suite("local files", () => {
  test("should have all VRMs downloaded", async () => {
    const tokenContent = await readFile(
      join(process.cwd(), "drive", "token.json"),
      "utf-8"
    );
    const credentials = JSON.parse(tokenContent);
    const client = google.auth.fromJSON(credentials);
    // @ts-expect-error can't figure out the typedef here
    const drive = google.drive({ version: "v3", auth: client });
    const VRMFileList = await drive.files.list({
      pageSize: 1000,
      q: "'1-vVfHFpcyyQYAwoM4jyvuPie1eJX1mGN' in parents and trashed = false and mimeType != 'application/vnd.google-apps.folder'",
    });

    const local = await readdir("/mnt/c/users/nhcar/documents/vrms");

    const missingLocal = VRMFileList.data.files?.filter(
      (f) => f.name && !local.includes(f.name)
    );

    if (!missingLocal) {
      assert.fail("Could not load file list.");
      return;
    }

    assert.lengthOf(
      missingLocal,
      0,
      `Missing these VRMs locally:\n${missingLocal
        .map((f) => f.name)
        .join("\n")}`
    );
  });
});
