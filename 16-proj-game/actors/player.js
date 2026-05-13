import Vec from "../engine/vec.js";
import Actor from "./actor.js";

/**
 * Instantiates a new player.
 */
export default class Player extends Actor {
    /**
     * Instantiates a new Player instance.
     * @param {Vec} pos - Starting position
     * @param {Vec} speed - Movement speed
     */
    constructor(pos, speed) {
        super(pos, new Vec(0.8, 1.5), "player");
        this.speed = speed;
        this.xSpeed = 7;
        this.gravity = 30;
        this.jumpSpeed = 17;
    }

    /**
     * Update the players position.
     * @param {number} time - Elapsed time
     * @param {import("../engine/state.js").default} state - Current game state
     * @param {string[]} keys - List of keyboard keys held down
     */
    update(time, state, keys) {
        // Horizontal movement
        let xSpeed = 0;
        if (keys.ArrowLeft) xSpeed -= this.xSpeed;
        if (keys.ArrowRight) xSpeed += this.xSpeed;

        let pos = this.pos;
        const movedX = pos.sum(new Vec(xSpeed * time, 0));
        if (!state.level.touches(movedX, this.size, "wall")) {
            pos = movedX;
        }

        // Vertical movement
        let ySpeed = this.speed.y + time * this.gravity;
        const movedY = pos.sum(new Vec(0, ySpeed * time));
        if (!state.level.touches(movedY, this.size, "wall")) {
            pos = movedY;
        } else if (keys.ArrowUp && ySpeed > 0) {
            ySpeed -= this.jumpSpeed;
        } else {
            ySpeed = 0;
        }

        return new Player(pos, new Vec(xSpeed, ySpeed));
    }

    collide() {
        return;
    }

    /**
     * Creates a new Player instance.
     * @param {Vec} pos - Starting position
     * @returns {Player}
     */
    static create(pos) {
        return new Player(pos.sum(new Vec(0, -0.5)),
            new Vec(0, 0));
    }
}