/**
 * Solution(s) to Chapter 07 - Problem 3: Persistent Group.
*/

class PGroup {
    #values = [];

    constructor(values = []) {
        this.#values = values
    }

    /**
     * Adds a new and unique value to PGroup in a non-mutating way.
     * @param {any} value - An unique value to add.
     * @returns {PGroup}
     */
    add(value) {
        if (this.has(value)) return this;
        return new PGroup(this.#values.concat(value));
    }

    /**
     * Removes an element from the group in a non-mutating way.
     * @param {any} value - A value to remove from the group
     * @returns {PGroup}
     */
    delete(value) {
        if (!this.has(value)) return this;
        return new PGroup(this.#values.filter(val => val !== value));
    }

    /**
     * Verify if a certain value is already in the group.
     * @param {any} value - A value to verify
     * @returns {boolean}
     */
    has(value) {
        return this.#values.includes(value);
    }

    /**
     * Returns a string version of the group values.
     * @returns {string}
     */
    print() {
        return this.#values.toString();
    }

    /**
     * Returns an exclusive empty instance.
     * @returns {PGroup}
     */
    static get empty() {
        return new PGroup();
    }
}

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false
console.log(a.print());
console.log(ab.print());
console.log(b.print());

