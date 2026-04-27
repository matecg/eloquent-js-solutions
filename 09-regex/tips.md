# Chapter 9 - Regular Expressions Exercise Tips

## Regexp Summary

Regular expressions are objects that represent patterns in strings. They use their own language to express these patterns.

| Regexp      | Description                                  |
| ----------- | -------------------------------------------- |
| `/abc/`     | A sequence of characters                     |
| `/[abc]/`   | Any character from a set of characters       |
| `/[^abc]/`  | Any character not in a set of characters     |
| `/[0-9]/`   | Any character in a range of characters       |
| `/x+/`      | One or more occurrences of the pattern x     |
| `/x+?/`     | One or more occurrences, nongreedy           |
| `/x*/`      | Zero or more occurrences                     |
| `/x?/`      | Zero or one occurrence                       |
| `/x{2,4}/`  | Two to four occurrences                      |
| `/(abc)/`   | A group                                      |
| `/a\|b\|c/` | Any one of several patterns                  |
| `/\d/`      | Any digit character                          |
| `/\w/`      | An alphanumeric character (“word character”) |
| `/\s/`      | Any whitespace character                     |
| `/./`       | Any character except newlines                |
| `/\p{L}/u`  | Any letter character                         |
| `/^/`       | Start of input                               |
| `/$/`       | End of input                                 |
| `/(?=a)/`   | A look-ahead test                            |

[🔙 to exercises](exercises.md)

## 1. RegExp Golf

No tips were provided for this problem.

## 2. Quoting Style

The most obvious solution is to replace only quotes with a nonletter character on at least one side—something like `/\P{L}'|'\P{L}/u`. But you also have to take the start and end of the line into account.

In addition, you must ensure that the replacement also includes the characters that were matched by the `\P{L}` pattern so that those are not dropped. This can be done by wrapping them in parentheses and including their groups in the replacement string (`$1`, `$2`). Groups that are not matched will be replaced by nothing.

## 3. Numbers Again

First, do not forget the backslash in front of the period.

Matching the optional sign in front of the number, as well as in front of the exponent, can be done with `[+\-]?` or `(\+|-|)` (plus, minus, or nothing).

The more complicated part of the exercise is the problem of matching both `"5."` and `".5"` without also matching `"."`. For this, a good solution is to use the `|` operator to separate the two cases—either one or more digits optionally followed by a dot and zero or more digits or a dot followed by one or more digits.

Finally, to make the e case insensitive, either add an `i` option to the regular expression or use `[eE]`.