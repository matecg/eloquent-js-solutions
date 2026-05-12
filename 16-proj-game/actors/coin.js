import Vec from "../engine/vec.js";

export default class Coin {
    #size;
    /**
     * Instantiates a new coin object.
     * @param {Vec} pos - Starting position
     * @param {Vec} basePos - Base position
     * @param {number} wobble - Controls the wobble movement
     */
    constructor(pos, basePos, wobble) {
        this.#size = new Vec(0.6, 0.6);
        this.pos = pos;
        this.basePos = basePos;
        this.wobble = wobble;
    }

    get type() {
        return "coin";
    }

    get size() {
        return this.#size;
    }

    static create(pos) {
        const basePos = pos.plus(new Vec(0.2, 0.1));
        return new Coin(basePos, basePos,
            Math.random() * Math.PI * 2
        );
    }
}