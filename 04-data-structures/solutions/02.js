/**
 * Solution(s) to Chapter 04 - Problem 2: Reversing an Array.
*/

/**
 * Reverse an array, without mutating it.
 * @param {any[]} arr - An array to reverse
 * @returns {any[]}
 */
function reverseArray(arr) {
    const output = []
    for (let i = arr.length - 1; i >= 0; i--) {
        output.push(arr[i]);
    }
    return output;
}

/**
 * Reverse an array mutating the original structure.
 * @param {any[]} arr - An array to reverse
 * @returns {any[]}
 */
function reverseArrayInPlace(arr) {
    const limit = Math.floor(arr.length / 2);
    for (let i = 0; i < limit; i++) {
        [arr[i], arr[arr.length - i - 1]] = [arr[arr.length - i - 1], arr[i]];
    }
    return arr;
}

let myArray = ["A", "B", "C"];
console.log(reverseArray(myArray));
// → ["C", "B", "A"];
console.log(myArray);
// → ["A", "B", "C"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
let evenArray = [1, 2, 3, 4, 5, 6, 7, 8];
reverseArrayInPlace(evenArray);
console.log(evenArray);
// → [8, 7, 6, 5, 4, 3, 2, 1]

/**
 * Thinking back to the notes about side effects and pure functions 
 * in the previous chapter, which variant do you expect to be useful 
 * in more situations? Which one runs faster?
 * 
 * Answer - Pure functions have predictable outcomes since they have
 * a deterministic nature, which makes them easy to test and work with.
 * On the other hand, the reverse in place function only loops to the middle 
 * of the array, resulting in a faster execution time, even though in theory
 * both functions have a Big O notations of "n".
 */