import State from "../engine/state.js";
import Vec from "../engine/vec.js";
import Actor from "./actor.js";

export default class Lava extends Actor {
    constructor(pos, speed, reset) {
        super(pos, new Vec(1, 1), "lava");
        this.speed = speed;
        this.reset = reset;
    }

    /**
     * Checks if there's a collision.
     * @param {import("../engine/state.js").default} state - Game state
     */
    collide(state) {
        return new State(state.level, state.actors, "lost");
    }

    /**
     * Update the actor's position.
     * @param {number} time - Elapsed time
     * @param {import("../engine/state.js").default} state - Current game state
     */
    update(time, state) {
        const newPos = this.pos.sum(this.speed.times(time));
        if (!state.level.touches(newPos, this.size, "wall")) {
            return new Lava(newPos, this.speed, this.reset);
        } else if (this.reset) {
            return new Lava(this.reset, this.speed, this.reset);
        } else {
            return new Lava(this.pos, this.speed.times(-1));
        }
    };

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