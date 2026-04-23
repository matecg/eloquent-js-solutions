/**
 * Solution(s) to Chapter 06 - Problem 3: Iterable Groups.
 * ⚠️ ATTENTION: The extra logs that appear when running this script
 * is due to the import statement. Node will first run 02.js script, which
 * contain some console.logs before importing the class into this script.
*/

import Group from "./02.js";

class GroupIterator {
    /**
     * Creates a new Iterator class instance
     * @param {Group} group - A Group instance
     */
    constructor(group) {
        this.group = group;
        this.nextIndex = 0;
    }

    next() {
        if (this.nextIndex === this.group.size()) {
            return {done: true};
        }
        const output = {done:false, value: this.group.get(this.nextIndex)};
        this.nextIndex++;
        return output;
    }
}

Group.prototype[Symbol.iterator] = function() {
    return new GroupIterator(this);
}

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c