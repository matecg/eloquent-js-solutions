import ColorSelect from "./colorSelect.js";
import { draw, fill, pick, rectangle } from "./drawingFuncs.js";
import LoadButton from "./loadButton.js";
import Picture from "./picture.js";
import PixelEditor from "./pixelEditor.js";
import SaveButton from "./saveButton.js";
import ToolSelect from "./toolSelect.js";
import UndoButton from "./undoButton.js";
import { historyUpdateState } from "./utils.js";

const startState = {
    tool: "draw",
    color: "#000000",
    picture: Picture.empty(60, 30, "#f0f0f0"),
    done: [],
    doneAt: 0
};
const baseTools = { draw, fill, rectangle, pick };
const baseControls = [
    ToolSelect, ColorSelect, SaveButton, LoadButton, UndoButton
];

function startPixelEditor({
    state = startState,
    tools = baseTools,
    controls = baseControls
}) {
    const app = new PixelEditor(state, {
        tools, controls, dispatch(action) {
            state = historyUpdateState(state, action);
            app.syncState(state);
        }
    });
    return app.dom;
}

document.querySelector("div").appendChild(startPixelEditor({}));