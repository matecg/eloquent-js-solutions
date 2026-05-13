/**
 * Manages the current game loop state.
 */
export default class State {
    /**
     * @param {import("./level.js").default} level - Current level
     * @param {import("../actors/actor.js").default[]} actors - List of Coin, Player and/or Lava
     * @param {string} status - Current game status
     */
    constructor(level, actors, status) {
        this.level = level;
        this.actors = actors;
        this.status = status;
    }

    static start(level) {
        return new State(level, level.startActors, "playing");
    }

    get player() {
        return this.actors.find(act => act.type == "player");
    }

    /**
     * Update the actors current positions, looking for collisions.
     * @param {number} time - Time elapsed for reference
     * @param {string[]} keys - List of keyboard keys held down
     */
    update(time, keys) {
        const actors = this.actors.map(
            actor => actor.update(time, this, keys)
        );
        let newState = new State(this.level, actors, this.status);

        if (newState.status != "playing") return newState;

        const player = newState.player;
        if (this.level.touches(player.pos, player.size, "lava")) {
            return new State(this.level, actors, "lost");
        }
        for (const actor of actors) {
            if (actor != player && overlap(actor, player)) {
                newState = actor.collide(newState);
            }
        }
        return newState;
    }
}