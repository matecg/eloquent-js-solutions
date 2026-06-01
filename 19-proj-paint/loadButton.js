import Picture from "./picture.js";
import { elt } from "./utils.js";

export default class LoadButton {
    constructor(_, {dispatch}) {
        this.dom = elt("button", {
            onclick: () => startLoad(dispatch)
        }, "📁 Load");
    }

    syncState() {}
}

function startLoad(dispatch) {
    const input = elt("input", {
        type: "file",
        onchange: () => finishLoad(input.files[0], dispatch)
    });
    document.body.appendChild(input);
    input.click();
    input.remove();
}

function finishLoad(file, dispatch) {
    if (file == null) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        const image = elt("img", {
            onload: () => dispatch({
                picture: pictureFromImage(image)
            }),
            src: reader.result
        });
    });
    reader.readAsDataURL(file);
}

function pictureFromImage(image) {
    const width = Math.min(100, image.width);
    const height = Math.min(100, image.height);
    const canvas = elt("canvas", {width, height});
    const cx = canvas.getContext("2d");
    const pixels = [];

    cx.drawImage(image, 0, 0);
    const {data} = cx.getImageData(0, 0, width, height);

    function hex(n) {
        return n.toString(16).padStart(2, "0");
    }

    for (let i = 0; i < data.length; i += 4) {
        let [r, g, b] = data.slice(i, i + 3);
        pixels.push("#", hex(r), hex(g), hex(b));
    }
    return new Picture(width, height, pixels);
}