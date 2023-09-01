import { writeFile } from "fs/promises";
import { join } from "path";

import { Parser } from "xml2js";

import { FileList } from "./interfaces/FileList";

const getFiles = async () => {
  const raw = await fetch(`https://cdn.naomi.lgbt`);
  const text = await raw.text();
  const parser = new Parser();
  const parsed = await parser.parseStringPromise(text);
  return parsed.ListBucketResult.Contents as FileList[];
};

(async () => {
  const files = await getFiles();
  const picrew = files
    .filter((f) => f.Key[0].startsWith(`naomi/picrew`))
    .map((i) => i.Key[0].split("/")[2])
    .filter((el) => el);
  const path = join(process.cwd(), "json", "naomi", "picrew.json");
  await writeFile(path, JSON.stringify(picrew, null, 2));
})();
