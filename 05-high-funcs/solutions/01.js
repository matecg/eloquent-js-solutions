/**
 * Solution(s) to Chapter 05 - Problem 1: Flattening.
*/

/**
 * Reduces an array of arrays into a single dimension array.
 * @param {any[any[]]} arr - An array of arrays.
 * @returns {any[]}
 */
function flatter(arr) {
    return arr.reduce((acc, cur) => acc.concat(cur), []);
}

let arrays = [[1, 2, 3], [4, 5], [6]];
console.log(flatter(arrays));
// → [1, 2, 3, 4, 5, 6]