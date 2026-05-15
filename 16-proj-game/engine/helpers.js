import Coin from "../actors/coin.js";
import Lava from "../actors/lava.js";
import Player from "../actors/player.js";

/**
 * Checks if Actor 1 is overlapping Actor 2.
 * @param {import("../actors/actor.js").default} actor1 - Actor 1
 * @param {import("../actors/actor.js").default} actor2 - Actor 2
 */
export function overlap(actor1, actor2) {
    return actor1.pos.x + actor1.size.x > actor2.pos.x &&
        actor1.pos.x < actor2.pos.x + actor2.size.x &&
        actor1.pos.y + actor1.size.y > actor2.pos.y &&
        actor1.pos.y < actor2.pos.y + actor2.size.y;
}

export const levelCharacters = {
    ".": "empty",
    "#": "wall",
    "+": "lava",
    "@": Player,
    "o": Coin,
    "=": Lava,
    "|": Lava,
    "v": Lava
};