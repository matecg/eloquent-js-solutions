/**
 * Solution(s) to Chapter 04 - Problem 3: Deep Comparison.
*/

/**
 * Compare two elements, going deep into objects to compare by value.
 * @param {any} objA - Element A to test
 * @param {any} objB - Element B to test
 * @returns {boolean}
 */
function deepEqual(objA, objB) {
    if (typeof(objA) !== typeof(objB)) return false;
    if (typeof(objA) !== "object") return objA === objB;
    if (objA === null && objB === null) return true;
    for (const key of Object.keys(objA)) {
        if(!deepEqual(objA[key], objB[key])) return false;
    }
    return true;
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
let objA = {some: "people", really: {are: "32", and: true, but: {not: false}}}
let objB = {some: "people", really: {are: "32", and: true, but: {not: false}}}
let objC = {some: "people", really: {are: "32", and: true, but: {not: true}}}
console.log(deepEqual(objA, objB));
// → true
console.log(deepEqual(objA, objC));
// → false