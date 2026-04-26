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