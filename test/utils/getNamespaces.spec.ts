import { assert } from "chai";

import { NameSpaces } from "../../src/config/NameSpaces";
import { getNamespaces } from "../../src/utils/getNamespaces";

suite("get namespaces util", () => {
  test("should return the expected object", async () => {
    const result = await getNamespaces();
    assert.deepStrictEqual(result, NameSpaces);
  });
});
