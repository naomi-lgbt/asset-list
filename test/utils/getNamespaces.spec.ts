import { assert } from "chai";

import { NameSpace } from "../../src/interfaces/NameSpace";
import { getNamespaces } from "../../src/utils/getNamespaces";

const expected: NameSpace = {
  adventures: ["becca", "naomi", "rosalia"],
  emotes: ["becca", "naomi"],
  outfits: ["naomi"],
  picrew: ["naomi"],
  portraits: ["becca", "beccalia", "naomi", "rosalia"],
  poses: ["becca", "beccalia", "erin", "melody", "naomi", "novas", "rosalia"],
};

suite("get namespaces util", () => {
  test("should return the expected object", async () => {
    const result = await getNamespaces();
    assert.deepStrictEqual(result, expected);
  });
});
