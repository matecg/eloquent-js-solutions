/**
 * Solution(s) to Chapter 05 - Problem 2: Your Own Loop.
*/

/**
 * Decomposes a loop, ordering each individual segment from it.
 * @param {any} value - A value that will be used in the loop
 * @param {(any) => boolean} testFunc - A function to test if the loop should continue
 * @param {(any) => any} updateFunc - A function that updates the loop variable
 * @param {(any) => any} bodyFunc - A function that transforms the loop variable
 */
function loop(value, testFunc, updateFunc, bodyFunc) {
    for (; testFunc(value); value = updateFunc(value))
        bodyFunc(value);
}

loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1