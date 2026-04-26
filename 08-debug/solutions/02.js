/**
 * Solution(s) to Chapter 08 - Problem 2: The Locked Box.
*/

const box = new class {
  locked = true;
  #content = [];

  unlock() { this.locked = false; }
  lock() { this.locked = true;  }
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this.#content;
  }
};

function withBoxUnlocked(body) {
  const startedLock = box.locked;
  try {
    box.unlock();
    body();
    console.log(box.content);
  } catch (error) {
    throw error;
  } finally {
    if (startedLock) box.lock();
  }
}

withBoxUnlocked(() => {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(() => {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised: " + e);
}
console.log(box.locked);
// → true

box.unlock();
withBoxUnlocked(() => {
  box.content.push("gold piece");
});
console.log(box.locked);
// → false
box.lock();
