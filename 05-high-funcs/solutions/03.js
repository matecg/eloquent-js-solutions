/**
 * Solution(s) to Chapter 05 - Problem 3: Everything.
*/

/**
 * Implements the 'every' array method using the 'some' method.
 * @param {any[]} arr - An array of any type
 * @param {(x:any) => boolean} predicate - A function that tests a variable
 * @returns {boolean}
 */
function everyWithSome(arr, predicate) {
    return !arr.some(el => !predicate(el));
}

/**
 * Implements the 'every' array method using a regular loop.
 * @param {any[]} arr - An array of any type
 * @param {(x:any) => boolean} predicate - A function that tests a variable
 * @returns {boolean}
 */
function everyWithLoop(arr, predicate) {
    for (const el of arr) {
        if (!predicate(el)) return false;
    }
    return true;
}

console.log(everyWithLoop([1, 3, 5], n => n < 10));
// → true
console.log(everyWithLoop([2, 4, 16], n => n < 10));
// → false
console.log(everyWithLoop([], n => n < 10));
// → true