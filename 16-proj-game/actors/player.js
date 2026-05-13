import Vec from "../engine/vec.js";

/**
 * Instantiates a new player.
 */
export default class Player extends Actor {
    /**
     * Instantiates a new Player instance.
     * @param {Vec} pos - Starting position
     * @param {Vec} speed - Movement speed
     */
    constructor(pos, speed) {
        super(pos, new Vec(0.8, 1.5), "player");
        this.speed = speed;
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