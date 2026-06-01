import ColorSelect from "./colorSelect.js";
import { draw, fill, pick, rectangle } from "./drawingFuncs.js";
import Picture from "./picture.js";
import PixelEditor from "./pixelEditor.js";
import ToolSelect from "./toolSelect.js";

let state = {
    tool: "draw",
    color: "#000000",
    picture: Picture.empty(60, 30, "#f0f0f0")
};
let app = new PixelEditor(state, {
    tools: { draw, fill, rectangle, pick },
    controls: [ToolSelect, ColorSelect],
    dispatch(action) {
        state = updateState(state, action);
        app.syncState(state);
    }
});
document.querySelector("div").appendChild(app.dom);