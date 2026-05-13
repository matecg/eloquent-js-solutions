/**
 * Checks if Actor 1 is overlapping Actor 2.
 * @param {import("../actors/actor.js").default} actor1 - Actor 1
 * @param {import("../actors/actor.js").default} actor2 - Actor 2
 */
export function overlap(actor1, actor2) {
    return actor1.pos.x + actor1.size.x > actor2.x &&
        actor1.pos.x < actor2.pos.x + actor2.size.x &&
        actor1.pos.y + actor1.size.y > actor2.y &&
        actor1.pos.y < actor2.pos.y + actor2.size.y;
}

/**
 * Build a tracking object for keydown and keyup events.
 * @param {string[]} keys - Array of key names
 */
export function trackKeys(keys) {
    const tracker = Object.create(null);
    function track(event) {
        if (keys.includes(event.key)) {
            tracker[event.key] = event.type == "keydown";
            event.preventDefault();
        }
    }
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
    return tracker;
}