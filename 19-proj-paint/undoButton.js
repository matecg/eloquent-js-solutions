import { elt } from "./utils.js";

export default class UndoButton {
    constructor(state, {dispatch}) {
        this.dom = elt("button", {
            onclick: () => dispatch({undo: true}),
            disabled: state.done.length == 0
        }, "↩️ Undo");
    }

    syncState(state) {
        this.dom.disabled = state.done.length == 0;
    }
}