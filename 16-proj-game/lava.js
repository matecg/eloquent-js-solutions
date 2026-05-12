import Vec from "./vec.js";

export default class Lava {
    #size;

    constructor(pos, speed, reset) {
        this.#size = new Vec(1, 1);
        this.pos = pos;
        this.speed = speed;
        this.reset = reset;
    }

    get type() {
        return "lava";
    }

    get size() {
        return this.#size;
    }

    static create(pos, char) {
        switch(char) {
            case "=":
                return new Lava(pos, new Vec(2, 0));
            case "|":
                return new Lava(pos, new Vec(0, 2));
            case "v":
                return new Lava(pos, new Vec(0, 3), pos);
            default:
                throw new Error(`CREATE LAVA: ${char} is invalid lava type.`);
        }
    }
}