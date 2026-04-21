/**
 * Solution(s) to Chapter 04 - Problem 3: A List.
*/

/**
 * Converts an array into a linked list represented by an object.
 * @param {any[]} arr - An array of any type
 * @returns {{value: any, rest: {} | null}}
 */
function arrayToList(arr) {
    return arr.reverse().reduce((acc, cur) => {
        return {value: cur, rest: acc}
    }, null);
}

/**
 * Transforms a linked list object into an array of value.
 * @param {{value: any, rest:{} | null}} list - A list to transform
 * @returns {any[]}
 */
function listToArray(list) {
    if (list.rest === null) {
        return [list.value]
    }
    
    return [list.value].concat(listToArray(list.rest));
}

/**
 * Add a certain value to the beginning of a linked list.
 * @param {any} element - A value to the linked list node.
 * @param {{value: any, rest: {} | null}} list - A list to add to.
 * @returns {value: any, rest: {} | null}
 */
function prepend(element, list) {
    return {value: element, rest: list}
}

/**
 * Iterates over a list and return the value from the provided index 
 * or undefined if list ends before the index provided.
 * @param {{value: any, rest: {} | null}} list - A list to iterate over.
 * @param {number} number - The index of the index wanted.
 * @returns {any}
 */
function nth(list, number) {
    if (number < 0) throw new EvalError(
        "Error: number parameter may not be negative."
    );
    if (list.rest === null) return undefined;
    if (number === 0) return list.value;
    return nth(list.rest, number - 1);
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(arrayToList([10, 20, 30]));
// → {value: 10, rest: {value: 20, rest: {value: 30, rest: null}}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
console.log(nth(arrayToList([10, 20, 30]), 6));
// → undefined