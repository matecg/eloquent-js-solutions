import PictureCanvas from "./pictureCanvas.js";
import { elt } from "./utils.js";

export default class PixelEditor {
    constructor(state, config) {
        const { tools, controls, dispatch } = config;

        this.state = state;
        this.canvas = new PictureCanvas(state.picture, pos => {
            const tool = tools[this.state.tool];
            const onMove = tool(pos, this.state, dispatch);
            if (onMove) return pos => onMove(pos, this.state);
        });
        this.controls = controls.map(
            Control => new Control(state, config)
        );
        this.dom = elt("div", {}, this.canvas.dom, elt("br"),
            ...this.controls.reduce(
                (acc, cur) => acc.concat(" ", cur.dom), []
            ));
    }

    syncState(state) {
        this.state = state;
        this.canvas.syncState(state.picture);
        for (let control of this.controls) control.syncState(state);
    }
}