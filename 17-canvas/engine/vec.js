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
    sum(vec) {
        return new Vec(this.x + vec.x, this.y + vec.y);
    }

    /**
     * Subtract the current vector with the one provided as an argument.
     * @param {Vec} vec - A vector to subtract
     */
    minus(vec) {
        return new Vec(this.x - vec.x, this.y - vec.y);
    }

    /**
     * Multiply the vector x and y coordinates by a given factor.
     * @param {number} factor - A factor to multiply the vector
     * @returns {Vec}
     */
    times(factor) {
        return new Vec(this.x * factor, this.y * factor);
    }

    
    normalize() {
        const x = (this.x / this.length)
        const y = (this.y / this.length)
        return new Vec(x, y);
    }
}
