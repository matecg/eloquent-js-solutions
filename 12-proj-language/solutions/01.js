/**
 * Solution(s) to Chapter 12 - Problem 1: Arrays
*/

import generateGlobalScope from "../globalScope.js";
import buildRunFunction from "../evaluator.js";

const topScope = generateGlobalScope();
const run = buildRunFunction(topScope);

topScope.array = (...values) => Array.from(values);

topScope.length = (array) => array.length;

topScope.element = (array, n) => {
    if (array.length <= n) {
        throw new RangeError("Unable to access indexes greater than the array");
    }
    return array[n];
}

run(`
do(define(sum, fun(array,
     do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
             define(i, +(i, 1)))),
        sum))),
   print(sum(array(1, 2, 3))))
`);
// → 6