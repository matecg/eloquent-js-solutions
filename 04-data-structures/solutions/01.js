/**
 * Solution(s) to Chapter 04 - Problem 1: The Sum of a Range.
*/

/**
 * Accepts a start and an end argument, both inclusive, 
 * and return an array with all integers between them.
 * @param {number} start - The starting value
 * @param {number} end - The final value, it will be included too.
 * @returns {number[]}
 */
function range(start, end, step = 1) {
    if ((start < end && step < 0) || (start > end && step > 0))
        throw new EvalError(
            `Error: infinite loop detect for: start=${start}, end=${end}, step=${step}`
        )
    const arr = [];
    for (let i = start; step > 0 ? i <= end : i >= end; i += step)
        arr.push(i);
    return arr;
}

/**
 * Sum all elements from an array.
 * @param {number[]} arr - An array of numbers to sum.
 * @returns {number}
 */
function sum(arr) {
    return arr.reduce((acc, cur) => acc + cur);
}

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// // → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55