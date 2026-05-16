import { flipHorizontally, PLAYER_PATH, PLAYER_X_OVERLAP, SCALE, SPRITES_PATH } from "./helpers.js";

export default class CanvasDisplay {
    /**
     * @param {HTMLElement} parent - Canvas parent HTML element
     * @param {import("../engine/level.js").default} level - Current level
     */
    constructor(parent, level) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = Math.min(600, level.width * SCALE);
        this.canvas.height = Math.min(450, level.height * SCALE);
        parent.appendChild(this.canvas);
        this.context = this.canvas.getContext("2d");

        this.spritesImg = document.createElement("img");
        this.spritesImg.src = SPRITES_PATH;
        this.playerImg = document.createElement("img");
        this.playerImg.src = PLAYER_PATH;

        this.flipPlayer = false;
        this.viewport = {
            left: 0,
            top: 0,
            width: this.canvas.width / SCALE,
            height: this.canvas.height / SCALE
        }
    }

    clear() {
        this.canvas.remove();
    }

    /**
     * Updates the game sprites on canvas.
     * @param {import("../engine/state.js").default} state - Game current state
     */
    syncState(state) {
        this.updateViewport(state);
        this.clearDisplay(state.status);
        this.drawBackground(state.level);
        this.drawActors(state.actors);
    }

    /**
     * Dynamically updates the state so the player appears centered at all times.
     * @param {import("../engine/state.js").default} state - Game current state
     */
    updateViewport(state) {
        const margin = this.viewport.width / 3;
        const player = state.player;
        const center = player.pos.sum(player.size.times(0.5));

        if (center.x < this.viewport.left + margin) {
            this.viewport.left = Math.max(center.x - margin, 0);
        } else if (center.x > this.viewport.left + this.viewport.width - margin) {
            this.viewport.left = Math.min(center.x + margin - this.viewport.width,
                state.level.width - this.viewport.width
            );
        }
        if (center.y < this.viewport.top + margin) {
            this.viewport.top = Math.max(0, center.y - margin);
        } else if (center.y > this.viewport.top + this.viewport.height - margin) {
            this.viewport.top = Math.min(center.y + margin - this.viewport.height,
                state.level.height - this.viewport.height
            );
        }
    }

    /**
     * Recolors the background depending on the current status.
     * @param {string} status - Current game state
     */
    clearDisplay(status) {
        switch (status) {
            case "won":
                this.context.fillStyle = "rgb(68, 191, 255)";
                break;
            case "lost":
                this.context.fillStyle = "rgb(44, 136, 214)";
            default:
                this.context.fillStyle = "rgb(52, 166, 251)";
                break;
        }
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draws static background elements.
     * @param {import("../engine/level.js").default} level - Current level
     */
    drawBackground(level) {
        const { left, top, width, height } = this.viewport;
        const xStart = Math.floor(left);
        const xEnd = Math.ceil(left + width);
        const yStart = Math.floor(top);
        const yEnd = Math.ceil(top + height);

        for (let y = yStart; y < yEnd; y++) {
            for (let x = xStart; x < xEnd; x++) {
                const tile = level.rows[y][x];
                if (tile == "empty") continue;

                const screenX = (x - left) * SCALE;
                const screenY = (y - top) * SCALE;
                /**
                 * This next instruction is an short-cut because 
                 * there are only 2 background sprites in the game.
                 */
                const tileX = tile == "lava" ? SCALE : 0;
                this.context.drawImage(this.spritesImg,
                    tileX, 0, SCALE, SCALE,
                    screenX, screenY, SCALE, SCALE
                );
            }
        }
    }

    /**
     * Draw a player using dimensions already adjusted by the scale.
     * @param {import("../actors/player.js").default} player - A Player instance
     * @param {number} x - Horizontal coordinate
     * @param {number} y - Vertical coordinate
     * @param {number} width - Updated width
     * @param {number} height - Updated height
     */
    drawPlayer(player, x, y, width, height) {
        width += PLAYER_X_OVERLAP * 2;
        x -= PLAYER_X_OVERLAP;
        if (player.speed.x != 0) {
            this.flipPlayer = player.speed.x < 0;
        }

        let tile = 8; // Idle sprite
        if (player.speed.y != 0) {
            tile = 9; // Jumping sprite
        } else if (player.speed.x != 0) {
            tile = Math.floor(Date.now() / 60) % 8;
        }

        this.context.save();
        if (this.flipPlayer) {
            flipHorizontally(this.context, x + width / 2);
        }
        let tileX = tile * width;
        this.context.drawImage(this.playerImg,
            tileX, 0, width, height,
            x, y, width, height
        );
        this.context.restore();
    }

    /**
     * Draw an array of actors to the canvas.
     * @param {import("../actors/actor.js").default[]} actors - An array of actor instances
     */
    drawActors(actors) {
        for (const actor of actors) {
            const width = actor.size.x * SCALE;
            const height = actor.size.y * SCALE;
            const x = (actor.pos.x - this.viewport.left) * SCALE;
            const y = (actor.pos.y - this.viewport.top) * SCALE;

            if (actor.type == "player") {
                this.drawPlayer(actor, x, y, width, height);
            } else {
                const tileX = (actor.type == "lava" ? 1 : 2) * SCALE;
                this.context.drawImage(this.spritesImg,
                    tileX, 0, width, height,
                    x, y, width, height
                );
            }
        }
    }
}