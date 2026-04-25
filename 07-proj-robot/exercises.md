# Chapter 07 - Project: A Robot Exercises

## 1. Measuring a Robot

It’s hard to objectively compare robots by just letting them solve a few scenarios. Maybe one robot just happened to get easier tasks or the kind of tasks that it is good at, whereas the other didn’t.

Write a function `compareRobots` that takes two robots (and their starting memory). It should generate 100 tasks and let both of the robots solve each of these tasks. When done, it should output the average number of steps each robot took per task.

For the sake of fairness, make sure you give each task to both robots, rather than generating different tasks per robot.

```js
function compareRobots(robot1, memory1, robot2, memory2) {
  // Your code here
}

compareRobots(routeRobot, [], goalOrientedRobot, []);
```

## 2. Robot Efficiency

Can you write a robot that finishes the delivery task faster than `goalOrientedRobot`? If you observe that robot’s behavior, what obviously stupid things does it do? How could those be improved?

If you solved the previous exercise, you might want to use your `compareRobots` function to verify whether you improved the robot.

## 3. Persistent Group

Most data structures provided in a standard JavaScript environment aren’t very well suited for persistent use. Arrays have `slice` and `concat` methods, which allow us to easily create new arrays without damaging the old one. But `Set`, for example, has no methods for creating a new set with an item added or removed.

Write a new class `PGroup`, similar to the `Group` class from Chapter 6, which stores a set of values. Like `Group`, it has `add`, `delete`, and `has` methods. Its `add` method, however, should return a new `PGroup` instance with the given member added and leave the old one unchanged. Similarly, `delete` should create a new instance without a given member.

The class should work for values of any type, *not* just strings. It does *not* have to be efficient when used with large numbers of values.

The constructor shouldn’t be part of the class’s interface (though you’ll definitely want to use it internally). Instead, there is an empty instance, `PGroup.empty`, that can be used as a starting value.

Why do you need only one `PGroup.empty` value rather than having a function that creates a new, empty map every time?

```js
class PGroup {
  // Your code here
}

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false
```