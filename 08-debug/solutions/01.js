/**
 * Solution(s) to Chapter 08 - Problem 1: Retry.
*/

class MultiplicatorUnitFailure extends Error {}

/**
 * Attempts to multiply a and b, throwing an error 80% of the time.
 * @param {number} a - First operand
 * @param {number} b - Second operand
 * @returns {number}
 */
function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

/**
 * Multiplies two numbers safely.
 * @param {number} a - First operand
 * @param {number} b - Second operand
 * @returns {number}
 */
function reliableMultiply(a, b) {
    let success = false;
    while (!success) {
        try {
            return primitiveMultiply(a, b);
        } catch (error){
            if (!(error instanceof MultiplicatorUnitFailure)) {
                throw error;
            }
        }
    }
}

console.log(reliableMultiply(8, 8));
// → 64