/**
 * Solution(s) to Chapter 06 - Problem 1: A Vector Type.
*/

class Vec {
    /**
     * Creates a new 2D vector instance.
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Returns the vector's length, starting on the origin.
     */
    get length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    /**
     * Add two vectors together.
     * @param {Vec} vec - A vector to add
     */
    plus(vec) {
        return new Vec(this.x + vec.x, this.y + vec.y);
    }

    /**
     * Subtract the current vector with the one provided as an argument.
     * @param {Vec} vec - A vector to subtract
     */
    minus(vec) {
        return new Vec(this.x - vec.x, this.y - vec.y);
    }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5