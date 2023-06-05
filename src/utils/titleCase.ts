/**
 * Title Cases a single word.
 *
 * @param {string} title The word to title case.
 * @returns {string} The title cased word.
 */
export const titleCase = (title: string) =>
  title[0].toUpperCase() + title.slice(1).toLowerCase();
