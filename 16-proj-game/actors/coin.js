import Vec from "../engine/vec.js";
import Actor from "./actor.js";

export default class Coin extends Actor {
    /**
     * Instantiates a new coin object.
     * @param {Vec} pos - Starting position
     * @param {Vec} basePos - Base position
     * @param {number} wobble - Controls the wobble movement
     */
    constructor(pos, basePos, wobble) {
        super(pos, new Vec(0.6, 0.6), "coin");
        this.basePos = basePos;
        this.wobble = wobble;
    }

    /**
     * Statically creates a new Coin instance.
     * @param {Vec} pos - Starting position.
     * @returns {Coin}
     */
    static create(pos) {
        const basePos = pos.sum(new Vec(0.2, 0.1));
        return new Coin(basePos, basePos,
            Math.random() * Math.PI * 2
        );
    }
}