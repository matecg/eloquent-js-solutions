/**
 * Solution(s) to Chapter 05 - Problem 4: Dominant Writing Direction.
*/

import SCRIPTS from "./scripts.js";

/**
 * Searches for a specific script based on the provided code value.
 * @param {number} code - The script's code value
 * @returns {
 * {name: string, ranges: number[][], direction: string, year: number,
 * living: boolean, link: string }
 *  | null}
 */
function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

/**
 * Counts elements in an array based on their return value from groupName argument.
 * @param {any[]} items - An array of any type
 * @param {(x:any) => any} groupName - A transformation function used when grouping
 * @returns {{name: any, count: number}[]}
 */
function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.find(c => c.name == name);
    if (!known) {
      counts.push({name, count: 1});
    } else {
      known.count++;
    }
  }
  return counts;
}

/**
 * Process a string determining if it contains more left to right characters
 * or right to left.
 * @param {string} text - A string to analyze
 * @returns {string}
 */
function dominantDirection(text) {
    const scripts = text.split("").map(x => characterScript(x.charCodeAt(0)));
    const count = countBy(scripts, x => {
        if (x !== null) return x.direction;
        return x;
    });
    const direction = count.reduce((acc, cur) => {
        if (cur.count > acc.count) acc = cur;
        return acc;
    });
    return direction.name;
}

// console.log(characterScript(121));
// → {name: "Latin", …}
// console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
// → [{name: false, count: 2}, {name: true, count: 3}]
console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl