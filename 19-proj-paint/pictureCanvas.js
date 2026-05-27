import { SCALE } from "./constants.js";
import { drawPicture, elt } from "./utils.js";

export default class PictureCanvas {
    constructor(picture, pointerDown) {
        this.dom = elt("canvas", {
            onmousedown: event => this.mouse(event, pointerDown),
            ontouchstart: event => this.touch(event, pointerDown)
        });

        this.syncState(picture);
    }
    
    syncState(picture) {
        if (this.picture == picture) return;
        this.picture = picture;
        drawPicture(this.picture, this.dom, SCALE);
    }
}