/**
 * Solution(s) to Chapter 09 - Problem 2: Quoting Style
 */

let text = "'I'm the cook,' he said, 'it's my job.'";

console.log(text.replace(/(^|\s)'(.*?)'(\s|$)/g, " \"$2\" "));
// → "I'm the cook," he said, "it's my job."