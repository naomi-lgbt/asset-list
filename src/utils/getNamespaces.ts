import { readdir } from "fs/promises";
import { join } from "path";

import { NameSpace } from "../interfaces/NameSpace";

/**
 * Generates the list of namespaces.
 *
 * @returns {NameSpace} An object containing namespace data.
 */
export const getNamespaces = async (): Promise<NameSpace> => {
  const namespace: NameSpace = {
    adventures: [],
    emotes: [],
    outfits: [],
    picrew: [],
    portraits: [],
    poses: [],
  };
  const namespaces = await readdir(join(process.cwd(), "json"));
  for (const name of namespaces) {
    const data = await readdir(join(process.cwd(), "json", name));
    if (data.includes("adventures.json")) {
      namespace.adventures.push(name);
    }
    if (data.includes("emotes.json")) {
      namespace.emotes.push(name);
    }
    if (data.includes("outfits.json")) {
      namespace.outfits.push(name);
    }
    if (data.includes("picrew.json")) {
      namespace.picrew.push(name);
    }
    if (data.includes("portraits.json")) {
      namespace.portraits.push(name);
    }
    if (data.includes("poses.json")) {
      namespace.poses.push(name);
    }
  }
  return namespace;
};
