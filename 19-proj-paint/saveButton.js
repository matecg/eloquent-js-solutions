import { drawPicture, elt } from "./utils.js";

export default class SaveButton {
    constructor(state) {
        this.picture = state.picture;
        this.dom = elt("button", {
            onclick: () => this.save()
        }, "💾 Save");
    }

    save() {
        const canvas = elt("canvas");
        drawPicture(this.picture, canvas, 1);
        const link = elt("a", {
            href: canvas.toDataURL(),
            download: "pixelart.png"
        });
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
    
    syncState(state) {
        this.picture = state.picture;
    }
}