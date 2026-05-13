import Level from "../engine/level.js";
import State from "../engine/state.js";

export const SCALE = 20;

/**
 * Dynamically creates a new HTMLElement from a given tag.
 * @param {string} tag - A HTML element tag
 * @param {Object} attrs - An object with all attributes for the element
 * @param  {...any} children - Other HTML nodes that are children from this one
 * @returns {HTMLElement}
 */
export function createDOMElement(tag, attrs, ...children) {
    const element = document.createElement(tag);
    for (const key of Object.keys(attrs)) {
        element.setAttribute(key, attrs[key]);
    }
    for (let child of children) {
        element.appendChild(child);
    }
    return element;
}

/**
 * Draws the HTML table element representing the current level.
 * @param {import ("../engine/level.js").default} level - A Level instance
 */
export function drawGrid(level) {
    return createDOMElement("table", {
        class: "background",
        style: `width: ${level.width * SCALE}px`
    }, ...level.rows.map(row =>
        createDOMElement("tr", { style: `height: ${SCALE}px` },
            ...row.map(type => createDOMElement("td", { class: type }))
        )
    ));
}

/**
 * Draws all actors into a div.
 * @param {any[]} actors - An array of actor instances (coins, player or lava)
 * @returns {HTMLDivElement}
 */
export function drawActors(actors) {
    return createDOMElement("div", {}, ...actors.map(actor => {
        const rect = createDOMElement("div", {class: `actor ${actor.type}`});
        rect.style.width = `${actor.size.x * SCALE}px`;
        rect.style.height = `${actor.size.y * SCALE}px`;
        rect.style.left = `${actor.pos.x * SCALE}px`;
        rect.style.top = `${actor.pos.y * SCALE}px`;
        return rect;
    }));
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