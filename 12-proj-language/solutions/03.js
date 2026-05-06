/**
 * Solution(s) to Chapter 12 - Problem 3: Comments
*/

import parse from "./parseWithComments.js";

/**
 * Solution 1
 * Skip whitespaces and comments from a given string input.
 * @param {string} string
 * @returns {string}
 */
export function skip(string) {
  let first = string.search(/\S/);
  if (first == -1) return "";
  if (string.at(first) == "#") {
    first = string.search(/\n/);
    if (first == -1) return "";
    first++; // Skip the newline
    return skip(string.slice(first));
  }
  return string.slice(first);
}
/**
 * Solution 2
 * Skip whitespaces and comments from a given string input.
 * @param {string} string
 * @returns {string}
 */
export function skip2(string) {
  const result = string.match(/^(\s|#)*/);
  if (!result[1]) return string;
  const newline = string.match(/\n/);
  if (!newline[0]) return "";
  return skip(string.slice(newline.index + 1));
}

console.log(parse("# hello\nx"));
// → {type: "word", name: "x"}

console.log(parse("a # one\n   # two\n()"));
// → {type: "apply",
//    operator: {type: "word", name: "a"},
//    args: []}



