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