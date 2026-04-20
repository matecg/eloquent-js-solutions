/**
 * Solution(s) to Chapter 02 - Problem 2: FizzBuzz
 */

/**
 * Classic solution to the FizzBuzz problem.
 */
function fizzBuzz() {
    for (let i = 1; i <= 100; i++) {
        let toPrint = "";
        if (i % 3 === 0) toPrint += "Fizz";
        if (i % 5 === 0) toPrint += "Buzz";
        if (toPrint.length === 0) toPrint = i.toString();
        console.log(toPrint);
    }
}

fizzBuzz();