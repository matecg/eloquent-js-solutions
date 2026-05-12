import { createDOMElement, drawGrid } from "./helpers.js";

export default class DOMDisplay {
    /**
     * @param {HTMLElement} parent - Parent node for this element
     * @param {import ("../engine/level.js").default} level - An instance to a level
     */
    constructor(parent, level) {
        this.dom = createDOMElement("div", {class: "game"}
            , drawGrid(level));
        this.actorLayer = null;
        parent.appendChild(this.dom);
    }

    /**Remove this object from the DOM */
    clear() {
        this.dom.remove();
    }
}

