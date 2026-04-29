# Chapter 11 - Asynchronous Programming Exercises

## 1. Quiet Times

There’s a security camera near Carla’s lab that’s activated by a motion sensor. It is connected to the network and starts sending out a video stream when it is active. Because she’d rather not be discovered, Carla has set up a system that notices this kind of wireless network traffic and turns on a light in her lair whenever there is activity outside, so she knows when to keep quiet.

She’s also been logging the times at which the camera is tripped for a while and wants to use this information to visualize which times, in an average week, tend to be quiet and which tend to be busy. The log is stored in files holding one time stamp number (as returned by `Date.now()`) per line.

```plaintext
1695709940692
1695701068331
1695701189163
```

The `"camera_logs.txt"` file holds a list of `logfiles`. Write an asynchronous function `activityTable(day)` that for a given day of the week returns an array of 24 numbers, one for each hour of the day, that hold the number of camera network traffic observations seen in that hour of the day. Days are identified by number using the system used by `Date.getDay`, where Sunday is 0 and Saturday is 6.

The `activityGraph` function, provided by the sandbox, summarizes such a table into a string.

To read the files, use the `textFile` function defined earlier—given a filename, it returns a promise that resolves to the file’s content. Remember that `new Date(timestamp)` creates a `Date` object for that time, which has `getDay` and `getHours` methods returning the day of the week and the hour of the day.

Both types of files—the list of logfiles and the logfiles themselves—have each piece of data on its own line, separated by newline (`"\n"`) characters.

```js
async function activityTable(day) {
  let logFileList = await textFile("camera_logs.txt");
  // Your code here
}

activityTable(1)
  .then(table => console.log(activityGraph(table)));
```

## 2. Real Promises

Rewrite the function from the previous exercise without `async`/`await`, using plain `Promise` methods.

```js
function activityTable(day) {
  // Your code here
}

activityTable(6)
  .then(table => console.log(activityGraph(table)));
```

In this style, using `Promise.all` will be more convenient than trying to model a loop over the `logfiles`. In the `async` function, just using `await` in a loop is simpler. If reading a file takes some time, which of these two approaches will take the least time to run?

If one of the files listed in the file list has a typo, and reading it fails, how does that failure end up in the `Promise` object that your function returns?

## 3. Building Promise.all

As we saw, given an array of promises, `Promise.all` returns a promise that waits for all of the promises in the array to finish. It then succeeds, yielding an array of result values. If a promise in the array fails, the promise returned by `all` fails too, passing on the failure reason from the failing promise.

Implement something like this yourself as a regular function called `Promise_all`.

Remember that after a promise has succeeded or failed, it can’t succeed or fail again, and further calls to the functions that resolve it are ignored. This can simplify the way you handle a failure of your promise.

```js
function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    // Your code here.
  });
}

// Test code.
Promise_all([]).then(array => {
  console.log("This should be []:", array);
});
function soon(val) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}
Promise_all([soon(1), soon(2), soon(3)]).then(array => {
  console.log("This should be [1, 2, 3]:", array);
});
Promise_all([soon(1), Promise.reject("X"), soon(3)])
  .then(array => {
    console.log("We should not get here");
  })
  .catch(error => {
    if (error != "X") {
      console.log("Unexpected failure:", error);
    }
});
```