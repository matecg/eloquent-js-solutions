import State from "../engine/state.js";
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
        this.wobbleSpeed = 8;
        this.wobbleDist = 0.07;
    }

    /**
     * Checks if there's a collision.
     * @param {import("../engine/state.js").default} state - Game state
     */
    collide(state) {
        const excludeSelf = state.actors.filter(act => act != this);
        let status = state.status;
        if (!excludeSelf.some(act => act.type == "coin")) {
            status = "won";
        }
        return new State(state.level, excludeSelf, status);
    }

    /**
     * Update the coin's movement.
     * @param {number} time - Elapsed time
     */
    update(time) {
        const wobble = this.wobble + time * this.wobbleSpeed;
        const wobblePos = Math.sin(wobble) * this.wobbleDist;
        return new Coin(this.basePos.sum(new Vec(0, wobblePos)),
            this.basePos, wobble);
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