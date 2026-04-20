/**
 * Solution(s) to Chapter 03 - Problem 1: Minimum.
*/

/**
 * Compare two numbers and return the smallest among them.
 * @param {number} x - A number to compare.
 * @param {number} y - A number to compare.
 * @returns {number} - Either x or y value.
 */
function min(x, y) {
    if (typeof(x) !== "number" ||
            typeof(y) !== "number")
            throw new TypeError(`Error: "x" and "y" must of type number.`);
            
    return x <= y ? x : y;
}

console.log(min(0, 10));
console.log(min(0, -10));