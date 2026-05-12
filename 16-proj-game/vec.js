/**
 * A 2D Vector class.
 */
export default class Vec {
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
