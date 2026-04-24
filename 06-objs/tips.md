# Chapter 6 - # Chapter 6 - The Secret Life of Objects Exercises Tips

## 1. A Vector Type

Look back to the `Rabbit` class example if you’re unsure how `class` declarations look.

Adding a getter property to the constructor can be done by putting the word `get` before the method name. To compute the distance from (0, 0) to (x, y), you can use the Pythagorean theorem, which says that the square of the distance we are looking for is equal to the square of the x-coordinate plus the square of the y-coordinate. Thus, √(x2 + y2) is the number you want. `Math.sqrt` is the way you compute a square root in JavaScript and `x ** 2` can be used to square a number.

## 2. Groups

The easiest way to do this is to store an array of group members in an instance property. The `includes` or `indexOf` methods can be used to check whether a given value is in the array.

Your class’s constructor can set the member collection to an empty array. When `add` is called, it must check whether the given value is in the array or add it otherwise, possibly using `push`.

Deleting an element from an array, in `delete`, is less straightforward, but you can use `filter` to create a new array without the value. Don’t forget to overwrite the property holding the members with the newly filtered version of the array.

The `from` method can use a `for/of` loop to get the values out of the iterable object and call `add` to put them into a newly created group.

## 3. Iterable Groups

It is probably worthwhile to define a new class `GroupIterator`. Iterator instances should have a property that tracks the current position in the group. Every time `next` is called, it checks whether it is done and, if not, moves past the current value and returns it.

The `Group` class itself gets a method named by `Symbol.iterator` that, when called, returns a new instance of the iterator class for that group.