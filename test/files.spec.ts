import { readdir } from "fs/promises";
import { join } from "path";

import { assert } from "chai";

import { NameSpaces } from "../src/config/NameSpaces";

suite("file structure", () => {
  for (const name of NameSpaces._names) {
    test(`${name} should not have extraneous files`, async () => {
      const files = await readdir(join(process.cwd(), "json", name));
      const fileNames = files.map((f) => f.split(".")[0]);
      for (const file of fileNames) {
        assert.property(NameSpaces, file);
      }
    });
  }
});
