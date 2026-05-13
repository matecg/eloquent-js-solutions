import { createDOMElement, drawActors, drawGrid, SCALE } from "./helpers.js";

export default class DOMDisplay {
    /**
     * @param {HTMLElement} parent - Parent node for this element
     * @param {import ("../engine/level.js").default} level - An instance to a level
     */
    constructor(parent, level) {
        this.dom = createDOMElement("div", { class: "game" }
            , drawGrid(level));
        this.actorLayer = null;
        parent.appendChild(this.dom);
    }

    /**Remove this object from the DOM */
    clear() {
        this.dom.remove();
    }

    /**
     * Updates the actors position by redrawing all of them.
     * @param {import("../engine/state.js").default} state - Current game state
     */
    syncState(state) {
        if (this.actorLayer) this.actorLayer.remove();
        this.actorLayer = drawActors(state.actors);
        this.dom.appendChild(this.actorLayer);
        this.dom.className = `game ${state.status}`;
        this.scrollPlayerIntoView(state);
    }

    /**
     * Shifts the game scene to maintain the player in the center.
     * @param {import("../engine/state.js").default} state - Current game state
     */
    scrollPlayerIntoView(state) {
        const width = this.dom.clientWidth;
        const height = this.dom.clientHeight;
        const margin = width / 3;

        // The viewport
        const left = this.dom.scrollLeft;
        const right = left + width;
        const top = this.dom.scrollTop;
        const bottom = top + height;

        const player = state.player;
        const center = player.pos
            .sum(player.size.times(0.5))
            .times(SCALE);
        
        if (center.x < left + margin) {
            this.dom.scrollLeft = center.x - margin;
        } else if (center.x > right - margin) {
            this.dom.scrollLeft = center.x + margin - width;
        }
        if (center.y < top + margin) {
            this.dom.scrollTop = center.y - margin;
        } else if (center.y > bottom - margin) {
            this.dom.scrollTop = center.y + margin - height;
        }
    };
}

