import Level from "../engine/level.js";
import State from "../engine/state.js";

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

/**
 * Executes the animation for the game.
 * @param {Function} frameFunc - Draws a single frame
 */
export function runAnimation(frameFunc) {
    let lastTime = null;
    function frame(time) {
        if (lastTime != null) {
            const timeStep = Math.min(time - lastTime, 100) / 1000;
            if (frameFunc(timeStep) === false) return;
        }
        lastTime = time;
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

/**
 * Executes a game level.
 * @param {import("../engine/level.js").default} level - A game level
 * @param {import("../gui/dom-display.js").default} Display 
 */
export function runLevel(level, Display) {
    const arrowKeys = trackKeys(["ArrowLeft", "ArrowUp", "ArrowRight"]);
    const display = new Display(document.body, level);
    let state = State.start(level);
    let ending = 1;
    return new Promise(resolve => {
        runAnimation(time => {
            state = state.update(time, arrowKeys);
            display.syncState(state);
            if (state.status == "playing") {
                return true;
            } else if (ending > 0) {
                ending -= time;
                return true;
            } else {
                display.clear();
                resolve(state.status);
                return false;
            }
        });
    });
}

/**
 * Run a series of level, restarting one if player loses.
 * @param {string[]} plans - Array of level plans
 * @param {import("../gui/dom-display.js").default} Display - Graphics projector
 */
export async function runGame(plans, Display) {
    for (let level = 0; level < plans.length;) {
        const status = await runLevel(new Level(plans[level]), Display);
        if (status == "won") level++;
    }
    console.log("You've won!");
}