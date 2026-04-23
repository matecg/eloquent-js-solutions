/**
 * Solution(s) to Chapter 06 - Problem 2: Groups.
*/

export default class Group {
    constructor() {
        this.values = []
    }

    /**
     * Adds a new value to the Group, but only if it is unique.
     * @param {any} value - A value to add
     */
    add(value) {
        if (this.has(value)) return;
        this.values.push(value);
    }

    /**
     * Remove a value from the Group, if it exists.
     * @param {any} value - A value to remove
     */
    delete(value) {
        if (!this.has(value)) return;
        this.values = this.values.filter(x => x !== value);
    }

    /**
     * Verify if a certain value is in the Group.
     * @param {any} value - A value to verify
     * @returns {boolean}
     */
    has(value) {
        return this.values.some(x => x === value);
    }

    /**
     * Creates a new Group instance from an iterable object.
     * @param {any[]} arr - An iterable object
     * @returns {Group}
     */
    static from(arr) {
        const g = new Group;
        for (const el of arr) {
            g.add(el);
        }
        return g;
    }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false