import { SCALE } from "./constants.js";

export function elt(type, props, ...children) {
    const dom = document.createElement(type);
    if (props) Object.assign(dom, props);

    for (const child of children) {
        const component = typeof child != "string"
            ? child : document.createTextNode(child);
        dom.appendChild(component);
    }
    return dom;
}

/**
 * Draws pixels into the provided canvas
 * @param {import("./picture.js").default} picture - Picture instance 
 * @param {*} canvas - DOM element that will receive the drawing 
 * @param {number} scale - Value to adjust the size of the drawing 
 */
export function drawPicture(picture, canvas, scale) {
    canvas.width = picture.width * scale;
    canvas.height = picture.height * scale;
    const cx = canvas.getContext("2d");

    for (let y = 0; y < picture.height; y++) {
        for (let x = 0; x < picture.width; x++) {
            cx.fillStyle = picture.pixel(x, y);
            cx.fillRect(x * scale, y * scale, scale, scale);
        }
    }
}

export function pointerPosition(pos, domNode) {
    const rect = domNode.getBoundingClientRect();
    return {
        x: Math.floor((pos.clientX - rect.left) / SCALE),
        y: Math.floor((pos.clientY - rect.top) / SCALE)
    }
}

export function historyUpdateState(state, action) {
    if (action.undo == true) {
        if (state.done.length == 0) return state;
        return {
            ...state,
            picture: state.done[0],
            done: state.done.slice(1),
            doneAt: 0
        };
    } else if (action.picture &&
        state.doneAt < Date.now() - 1000
    ) {
        return {
            ...state,
            ...action,
            done: [state.picture, ...state.done],
            doneAt: Date.now()
        };
    } else {
        return { ...state, ...action };
    }
}