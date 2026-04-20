/**
 * Solution(s) to Chapter 03 - Problem 2: Recursion.
*/

/**
 * Returns true when a value is even and false if it is odd.
 * @param {number} value - Number to verify.
 * @returns {boolean}
 */
function isEven(value) {
    if (typeof(value) !== "number") {
        throw new TypeError(`Error: "value" must be of type number. It is ${typeof(value)}.`);
    }
    if (value < 0) value *= -1;
    if (value === 0) return true;
    if (value === 1) return false;
    return isEven(value - 2);
}

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → false