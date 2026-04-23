# Chapter 5 - Higher-Order Functions Exercises Tips

## 1. Flattening

No tips were provided.

## 2. Your Own Loop

No tips were provided.

## 3. Everything

Like the `&&` operator, the `every` method can stop evaluating further elements as soon as it has found one that doesn’t match. So the loop-based version can jump out of the loop—with `break` or `return`—as soon as it runs into an element for which the predicate function returns `false`. If the loop runs to its end without finding such an element, we know that all elements matched and we should return `true`.

To build `every` on top of `some`, we can apply De Morgan’s laws, which state that `a && b` equals` !(!a || !b)`. This can be generalized to arrays, where all elements in the array match if there is no element in the array that does not match.

## 4. Dominant Writing Direction

Your solution might look a lot like the first half of the `textScripts` example. You again have to count characters by a criterion based on `characterScript` and then filter out the part of the result that refers to uninteresting (script-less) characters.

Finding the direction with the highest character count can be done with `reduce`. If it’s not clear how, refer to the example earlier in the chapter, where `reduce` was used to find the script with the most characters