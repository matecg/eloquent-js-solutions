# Chapter 11 - Asynchronous Programming Exercises Tips

## 1. Quiet Times

You will need to convert the content of these files to an array. The easiest way to do that is to use the `split` method on the string produced by `textFile`. Note that for the logfiles, that will still give you an array of strings, which you have to convert to numbers before passing them to `new Date`.

Summarizing all the time points into a table of hours can be done by creating a table (array) that holds a number for each hour in the day. You can then loop over all the timestamps (over the logfiles and the numbers in every logfile) and for each one, if it happened on the correct day, take the hour it occurred in, and add one to the corresponding number in the table.

Make sure you use `await` on the result of asynchronous functions before doing anything with it, or you’ll end up with a `Promise` where you expected a string.

## 2. Real Promises

The most straightforward approach to writing this function is to use a chain of `then` calls. The first promise is produced by reading the list of logfiles. The first callback can split this list and map `textFile` over it to get an array of promises to pass to `Promise.all`. It can return the object returned by `Promise.all`, so that whatever that returns becomes the result of the return value of this first `then`.

We now have a promise that returns an array of logfiles. We can call `then` again on that, and put the timestamp-counting logic in there. Something like this:

```js
function activityTable(day) {
  return textFile("camera_logs.txt").then(files => {
    return Promise.all(files.split("\n").map(textFile));
  }).then(logs => {
    // analyze...
  });
}
```

Or you could, for even better work scheduling, put the analysis of each file inside of the `Promise.all`, so that that work can be started for the first file that comes back from disk, even before the other files come back.

```js
function activityTable(day) {
  let table = []; // init...
  return textFile("camera_logs.txt").then(files => {
    return Promise.all(files.split("\n").map(name => {
      return textFile(name).then(log => {
        // analyze...
      });
    }));
  }).then(() => table);
}
```

This shows that the way you structure your promises can have a real effect on the way the work is scheduled. A simple loop with `await` in it will make the process completely linear—it waits for each file to load before proceeding. `Promise.all` makes it possible for multiple tasks to conceptually be worked on at the same time, allowing them to make progress while files are still being loaded. This can be faster, but it also makes the order in which things will happen less predictable. In this case, we’re only going to be incrementing numbers in a table, which isn’t hard to do in a safe way. For other kinds of problems, it may be a lot more difficult.

When a file in the list doesn’t exist, the promise returned by `textFile` will be rejected. Because `Promise.all` rejects if any of the promises given to it fail, the return value of the callback given to the first `then` will also be a rejected promise. That makes the promise returned by `then` fail, so the callback given to the second `then` isn’t even called, and a rejected promise is returned from the function.

## 3. Building Promise.all

The function passed to the `Promise` constructor will have to call `then` on each of the promises in the given array. When one of them succeeds, two things need to happen. The resulting value needs to be stored in the correct position of a result array, and we must check whether this was the last pending promise and finish our own promise if it was.

The latter can be done with a counter that is initialized to the length of the input array and from which we subtract 1 every time a promise succeeds. When it reaches 0, we are done. Make sure you take into account the situation where the input array is empty (and thus no promise will ever resolve).

Handling failure requires some thought but turns out to be extremely simple. Just pass the `reject` function of the wrapping promise to each of the promises in the array as a `catch` handler or as a second argument to `then` so that a failure in one of them triggers the rejection of the whole wrapper promise.