/**
 * Solution(s) to Chapter 09 - Problem 1: Regexp Golf
 */
// Fill in the regular expressions

// match car and cat
verify(/ca[rt]/,
       ["my car", "bad cats"],
       ["camper", "high art"]);

// match pop and prop
verify(/pr?op/,
       ["pop culture", "mad props"],
       ["plop", "prrrop"]);

// ferret, ferry, ferrari
verify(/ferr(et|y|ari)/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

// Any word ending in ious
verify(/ious\b/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

// A whitespace character followed by a period, comma, colon, or semicolon
verify(/ [,.;:]/,
       ["bad punctuation ."],
       ["escape the period"]);

// A word longer than six letters
verify(/\w{6,}/,
       ["Siebentausenddreihundertzweiundzwanzig"],
       ["no", "three small words"]);

// A word without the letter e (or E)
verify(/(\s|^)[^e\s]+(\s|$)/i,
       ["red platypus", "wobbling nest"],
       ["earth bed", "bedrøvet abe", "BEET"]);


function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  for (let str of yes) if (!regexp.test(str)) {
    console.log(`Failure to match '${str}'`);
  }
  for (let str of no) if (regexp.test(str)) {
    console.log(`Unexpected match for '${str}'`);
  }
}