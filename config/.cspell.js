const validNames = require("./validNames");
const wordsToIgnore = require("./wordsToIgnore");

module.exports = {
  version: "0.2",
  language: "en-GB",
  minWordLength: 1,
  words: validNames,
  ignoreWords: wordsToIgnore,
};
