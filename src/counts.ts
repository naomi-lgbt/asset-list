import { readFile, readdir } from "fs/promises";
import { join } from "path";

import { logHandler } from "./utils/logHandler";
import { titleCase } from "./utils/titleCase";

(async () => {
  let grandTotal = 0;
  let result = "\n";
  const naomiOutfits = (
    await readFile(join(process.cwd(), "drive", "outfit.txt"), "utf-8")
  )
    .trim()
    .split("\n");
  const namespaces = await readdir(join(process.cwd(), "json"));
  for (const name of namespaces) {
    if (name === "README.md") {
      continue;
    }
    result += `=== ${titleCase(name)} ===\n`;
    let total = 0;
    const fileNames = await readdir(join(process.cwd(), "json", name));
    for (const file of fileNames) {
      const json = (await import(join(process.cwd(), "json", name, file)))
        .default;
      result += `${titleCase(file.split(".")[0])}: ${json.length}\n`;
      total += json.length;
      grandTotal += json.length;
      if (name === "naomi" && file === "outfits.json") {
        result += `Private Outfits: ${
          naomiOutfits.length - json.length
        } (not in total)\n`;
      }
    }
    result += `Total: ${total}\n`;
    logHandler.log("info", result);
  }
  result += "=== Grand Total ===\n";
  result += `Total assets: ${grandTotal}\n`;
  logHandler.log("info", result);
})();
