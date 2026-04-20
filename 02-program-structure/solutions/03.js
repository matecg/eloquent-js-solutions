/**
 * Solution(s) to Chapter 02 - Problem 3: Chessboard
*/

/**
 * Print to the console a Chessboard style pattern.
 * This solution has a Big O of n^2
 * @param {number} size - The board's size
 */
function printChessboard(size) {
    let isSpace = true;
    for (let i = 0; i < size; i++) {
        let line = "";
        for (let j = 0; j < size; j++) {
            line += isSpace ? " " : "#";
            isSpace = !isSpace;
        }
        if (size % 2 === 0) isSpace = !isSpace;
        console.log(line);
    }
}

/**
 * Print to the console a Chessboard style pattern.
 * This solution has a Big O of n
 * @param {number} size - The board's size
 */
function printChessboardTwo(size) {
    let isSpace = true;
    let toPrint = "";
    for (let i = 1; i <= size ** 2; i++) {
        toPrint += isSpace ? " " : "#"
        if (i % size === 0) {
            console.log(toPrint);
            toPrint = "";
        }
        if (size % 2 === 0 &&
            i / size === Math.floor(i / size)) continue;
        isSpace = !isSpace;
    }
}

printChessboard(5);
console.log();
printChessboard(8);
