/**
 * Solution(s) to Chapter 11 - Problem 3: Building Promise.all
*/

/**
 * Emulates the behavior from Promises.all method.
 * It will return an array with all results or fail if any of them does so.
 * @param {Promise[]} promises - An array of promises
 * @returns {any[]}
 */
function Promise_all(promises) {
    return new Promise((resolve, reject) => {
        if (promises.length === 0) return resolve([]);

        let counter = promises.length;
        const result = [];

        for (let i = 0; i < promises.length; i++) {
            promises[i]
                    .then(val => {
                        console.log(`Called with ${val} - ${counter}`);
                        counter--;
                        result[i] = val;
                        if (counter <= 0) {
                             resolve(result);
                        } 
                    })
                    .catch(err => reject(err));
        }
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
        } else {
            console.log("Error threated properly!");
        }
    });