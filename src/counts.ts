import { readdir } from "fs/promises";
import { join } from "path";

import { logHandler } from "./utils/logHandler";
import { titleCase } from "./utils/titleCase";

const namespaces = ["becca", "beccalia", "naomi", "novas", "rosalia"];

(async () => {
  let grandTotal = 0;
  let result = "\n";
  for (const name of namespaces) {
    result += `=== ${titleCase(name)} ===\n`;
    let total = 0;
    const fileNames = await readdir(join(process.cwd(), "json", name));
    for (const file of fileNames) {
      const json = (await import(join(process.cwd(), "json", name, file)))
        .default;
      result += `${titleCase(file.split(".")[0])}: ${json.length}\n`;
      total += json.length;
      grandTotal += json.length;
    }
    result += `Total: ${total}\n`;
    logHandler.log("info", result);
  }
  result += "=== Grand Total ===\n";
  result += `Total assets: ${grandTotal}\n`;
  logHandler.log("info", result);
})();
