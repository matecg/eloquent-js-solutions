import Actor from "../actors/actor.js";
import { levelCharacters } from "../engine/helpers.js";
import Level from "../engine/level.js";
import State from "../engine/state.js";
import Vec from "../engine/vec.js";
import DOMDisplay from "../gui/dom-display.js";
import { runLevel } from "../gui/helpers.js";

class Monster extends Actor {
    /**
     * @param {Vec} pos - Starting position
     * @param {Vec} speed - Movement speed
     */
    constructor(pos, speed) {
        super(pos, new Vec(1.2, 2), "monster");
        this.speed = speed;
    }

    static create(pos) {
        return new Monster(pos.sum(new Vec(0, -1)), new Vec(3, 0));
    }

    /**
     * Update the monster movement.
     * @param {number} time - Time elapsed constant
     * @param {State} state - Current game state.
     */
    update(time, state) {
        const newPos = this.pos.sum(this.speed.times(time));
        if (!state.level.touches(newPos, this.size, "wall")) {
            return new Monster(newPos, this.speed);
        } else {
            return new Monster(this.pos, this.speed.times(-1));
        }
    }

    /**
     * Checks for collision agains player actor.
     * @param {State} state - Current game state
     */
    collide(state) {
        const margin = this.pos.y + 0.1;
        console.log(state.player.pos.y, margin);
        let status = state.status;
        if (state.player.pos.y <= margin) {
            state.actors = state.actors.filter(act => act !== this);
        } else {
            status = "lost";
        }
        return new State(state.level, state.actors, status);
    }
}

levelCharacters["M"] = Monster;

runLevel(new Level(`
..................................
.################################.
.#..............................#.
.#..............................#.
.#..............................#.
.#...........................o..#.
.#..@...........................#.
.##########..............########.
..........#..o..o..o..o..#........
..........#...........M..#........
..........################........
..................................
`), DOMDisplay);