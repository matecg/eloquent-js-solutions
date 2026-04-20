/**
 * Solution(s) to Chapter 03 - Problem 3: Bean Counting.
*/

/**
 * Count the number of capital "B" present on the string "str".
 * @param {string} str - A string to search on.
 * @returns {number}
 */
function countBs(str) {
    if (typeof(str) !== "string"){
        throw new TypeError(`Error: "str" must be a String. It was ${typeof(str)}.`);
    }
    return countChar(str, "B");
}

/**
 * Count the number times "char" appears in "str".
 * @param {string} str - A string to search on.
 * @param {string} char - A single character to count for.
 * @returns {number}
 */
function countChar(str, char) {
    if (typeof(str) !== "string" || typeof(char) !== "string") {
        throw new TypeError(`Error: "str" and "char" must be a String. It was ${typeof(str)}.`)
    }
    if (char.length > 1) throw new Error(`Error: "char" must be a single character. Char: ${char}, length: ${char.length}`);

    return str.split("").filter(el => el === char).length;
}

console.log(countBs("BOB"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4