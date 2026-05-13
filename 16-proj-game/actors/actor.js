export default class Actor {
    constructor(pos, size, type) {
        this.pos = pos;
        this.size = size;
        this.type = type;
    }

    /**
     * Update the actor's position.
     * @param {number} time - Elapsed time
     * @param {import("../engine/state.js").default} state - Current game state
     * @param {string[]} keys - List of keyboard keys held down
     */
    update(time, state, keys) {
        throw new Error("ACTOR UPDATE: must be defined by the child class.");
    }

    /**
     * Statically creates a new instance.
     * @param {import("../engine/vec.js").default} pos - Starting position
     */
    static create(pos) {
        throw new Error("ACTOR CREATE: must be defined by the child class.");
    }
}