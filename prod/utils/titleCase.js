"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titleCase = void 0;
/**
 * Title Cases a single word.
 *
 * @param {string} title The word to title case.
 * @returns {string} The title cased word.
 */
const titleCase = (title) => title[0].toUpperCase() + title.slice(1).toLowerCase();
exports.titleCase = titleCase;
