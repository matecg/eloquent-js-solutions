export default class Actor {
    /**
     * @param {import("../engine/vec.js").default} pos - Starting position
     * @param {import("../engine/vec.js").default} size - Actor size vector
     * @param {string} type - Actor type string
     */
    constructor(pos, size, type) {
        this.pos = pos;
        this.size = size;
        this.type = type;
    }

    
    update(time, state, keys) {
        throw new Error("ACTOR UPDATE: must be defined by the child class.");
    }

    collide(state) {
        throw new Error("ACTOR COLLIDE: must be defined by the child class.");
    }

    /**
     * Statically creates a new instance.
     * @param {import("../engine/vec.js").default} pos - Starting position
     */
    static create(pos) {
        throw new Error("ACTOR CREATE: must be defined by the child class.");
    }
}