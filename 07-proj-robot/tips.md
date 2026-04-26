# Chapter 07 - Project: A Robot Exercises Tips

## 1. Measuring A Robot

You’ll have to write a variant of the `runRobot` function that, instead of logging the events to the console, returns the number of steps the robot took to complete the task.

Your measurement function can then, in a loop, generate new states and count the steps each of the robots takes. When it has generated enough measurements, it can use `console.log` to output the average for each robot, which is the total number of steps taken divided by the number of measurements.

## 2. Robot Efficiency

The main limitation of `goalOrientedRobot` is that it considers only one parcel at a time. It will often walk back and forth across the village because the parcel it happens to be looking at happens to be at the other side of the map, even if there are others much closer.

One possible solution would be to compute routes for all packages and then take the shortest one. Even better results can be obtained, if there are multiple shortest routes, by preferring the ones that go to pick up a package instead of delivering a package.

## 3. Persistent Group

The most convenient way to represent the set of member values is still as an array, since arrays are easy to copy.

When a value is added to the group, you can create a new group with a copy of the original array that has the value added (for example, using `concat`). When a value is deleted, you filter it from the array.

The class’s constructor can take such an array as its argument and store it as the instance’s (only) property. This array is never updated.

To add the `empty` property to the constructor, you can declare it as a static property.

You need only one `empty` instance because all empty groups are the same and instances of the class don’t change. You can create many different groups from that single empty group without affecting it.