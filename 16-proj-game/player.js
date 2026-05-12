import Vec from "./vec.js";

/**
 * Instantiates a new player.
 */
export default class Player {
    #size;
    /**
     * Instantiates a new Player instance.
     * @param {Vec} pos - Starting position
     * @param {Vec} speed - Movement speed
     */
    constructor(pos, speed) {
        this.#size = new Vec(0.8, 1.5);
        this.pos = pos;
        this.speed = speed;
    }

    get type() {
        return "player";
    }

    get size() {
        return this.#size;
    }

    /**
     * Creates a new Player instance.
     * @param {Vec} pos - Starting position
     * @returns {Player}
     */
    static create(pos) {
        return new Player(pos.sum(new Vec(0, -0.5)),
            new Vec(0, 0));
    }
}