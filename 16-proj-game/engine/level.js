import Coin from "../actors/coin.js";
import Lava from "../actors/lava.js";
import Player from "../actors/player.js";
import Vec from "./vec.js";

/**
 * Class responsible for building game levels.
 */
export default class Level {
    /**
     * @param {string} plan - A level plan string
     */
    constructor(plan) {
        const clearedPlan = plan.trim().split("\n").map(line => [...line]);

        this.height = clearedPlan.length;
        this.width = clearedPlan[0].length;
        this.startActors = [];
        this.rows = clearedPlan.map((row, y) => {
            return row.map((char, x) => {
                let type = levelCharacters[char];
                if (typeof type !== "string") {
                    const pos = new Vec(x, y);
                    this.startActors.push(type.create(pos, char));
                    type = "empty";
                }
                return type;
            })
        });
    }

    /**
     * Check if there is an actor is overlapping anything.
     * @param {Vec} pos - Actor position
     * @param {Vec} size - Actor size
     * @param {string} type - Actor type
     */
    touches(pos, size, type) {
        /**
         * COLLISION SHAPE
         * Remember that grid squares are 1 by 1 units in size. 
         * By rounding the sides of a box up and down, we get the 
         * range of background squares that the box touches.
         */
        const xStart = Math.floor(pos.x);
        const xEnd = Math.ceil(pos.x + size.x);
        const yStart = Math.floor(pos.y);
        const yEnd = Math.ceil(pos.y + size.y);

        for (let y = yStart; y < yEnd; y++) {
            for (let x = xStart; x < xEnd; x++) {
                const isOutside = x < 0 || x >= this.width ||
                    y < 0 || y >= this.height;
                const collision = isOutside ? "wall" : this.rows[y][x];
                if (collision == type) return true;
            }
        }
        return false;
    }
}

const levelCharacters = {
    ".": "empty",
    "#": "wall",
    "+": "lava",
    "@": Player,
    "o": Coin,
    "=": Lava,
    "|": Lava,
    "v": Lava
};