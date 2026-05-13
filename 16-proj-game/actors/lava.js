import Vec from "../engine/vec.js";
import Actor from "./actor.js";

export default class Lava extends Actor {
    constructor(pos, speed, reset) {
        super(pos, new Vec(1, 1), "lava");
        this.speed = speed;
        this.reset = reset;
    }

    static create(pos, char) {
        switch (char) {
            case "=":
                return new Lava(pos, new Vec(2, 0));
            case "|":
                return new Lava(pos, new Vec(0, 2));
            case "v":
                return new Lava(pos, new Vec(0, 3), pos);
            default:
                throw new Error(`LAVA CREATE: ${char} is invalid lava type.`);
        }
    }
}