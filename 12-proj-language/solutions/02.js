/**
 * Solution(s) to Chapter 12 - Problem 2: Closures
*/

import buildRunFunction from "../evaluator.js";

const run = buildRunFunction();

run(`
do(define(f, fun(a, fun(b, +(a, b)))),
   print(f(4)(5)))
`);
// → 9

/**
 * Answer: The explanation behind this behavior is centered around how
 * fun handles the scope. Inside the returned function two major logic 
 * pieces are tied to the Closures:
 * 
 * 1) localScope is created based on the previous scope received initially
 * by the parent function.
 * 
 * 2) localScope sets all parameters to arguments and the function ends
 * with a call to the evaluate function. Therefore, if there's yet another
 * function call among them it will have access to all previous scopes.
 */