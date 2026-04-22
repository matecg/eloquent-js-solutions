# Chapter 4 - Data Structures: Objects and Arrays Exercises Tips

## 1. The Sum of a Range

Building up an array is most easily done by first initializing a binding to `[]` (a fresh, empty array) and repeatedly calling its `push` method to add a value. Don’t forget to return the array at the end of the function.

Since the end boundary is inclusive, you’ll need to use the `<=` operator rather than `<` to check for the end of your loop.

The step parameter can be an optional parameter that defaults (using the `=` operator) to 1.

Having `range` understand negative step values is probably best done by writing two separate loops—one for counting up and one for counting down—because the comparison that checks whether the loop is finished needs to be `>=` rather than `<=` when counting downward.

It might also be worthwhile to use a different default step, namely, `-1`, when the end of the range is smaller than the start. That way, `range(5, 2)` returns something meaningful rather than getting stuck in an infinite loop. It is possible to refer to previous parameters in the default value of a parameter.

## 2. Reverse an Array

There are two obvious ways to implement `reverseArray`. The first is to simply go over the input array from front to back and use the `unshift` method on the new array to insert each element at its start. The second is to loop over the input array backward and use the `push` method. Iterating over an array backward requires a (somewhat awkward) for specification, like (`let i = array.length - 1; i >= 0; i--`).

Reversing the array in place is harder. You have to be careful not to overwrite elements that you will later need. Using `reverseArray` or otherwise copying the whole array (`array.slice()` is a good way to copy an array) works but is cheating.

The trick is to `swap` the first and last elements, then the second and second-to-last, and so on. You can do this by looping over half the length of the array (use `Math.floor` to round down—you don’t need to touch the middle element in an array with an odd number of elements) and swapping the element at position `i` with the one at position array.`length - 1 - i`. You can use a local binding to briefly hold onto one of the elements, overwrite that one with its mirror image, and then put the value from the local binding in the place where the mirror image used to be.

## 3. A List

Building up a list is easier when done back to front. So `arrayToList` could iterate over the array backward (see the previous exercise) and, for each element, add an object to the list. You can use a local binding to hold the part of the list that was built so far and use an assignment like `list = {value: X, rest: list}` to add an element.

To run over a list (in `listToArray` and `nth`), a for loop specification like this can be used:

`for (let node = list; node; node = node.rest) {}`

Can you see how that works? Every iteration of the loop, `node` points to the current sublist, and the body can read its `value` property to get the current element. At the end of an iteration, node moves to the next sublist. When that is `null`, we have reached the end of the list, and the loop is finished.

The recursive version of `nth` will, similarly, look at an ever smaller part of the “tail” of the list and at the same time count down the index until it reaches zero, at which point it can return the `value` property of the node it is looking at. To get the zeroth element of a list, you simply take the `value` property of its head node. To get element $N + 1$, you take the $N$th element of the list that’s in this list’s `rest` property.

## 4. Deep Comparison

Your test for whether you are dealing with a real object will look something like `typeof x == "object" && x != null`. Be careful to compare properties only when both arguments are objects. In all other cases you can just immediately return the result of applying `===`.

Use `Object.keys` to go over the properties. You need to test whether both objects have the same set of property names and whether those properties have identical values. One way to do that is to ensure that both objects have the same number of properties (the lengths of the property lists are the same). And then, when looping over one of the object’s properties to compare them, always first make sure the other actually has a property by that name. If they have the same number of properties and all properties in one also exist in the other, they have the same set of property names.

Returning the correct value from the function is best done by immediately returning `false` when a mismatch is found and returning `true` at the end of the function.