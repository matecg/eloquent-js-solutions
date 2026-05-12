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

const SCALE = 20;

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