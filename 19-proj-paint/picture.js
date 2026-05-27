export default class Picture {
    constructor(width, height, pixels) {
        this.width = width;
        this.height = height;
        this.pixels = pixels;
    }

    /**
     * Creates a new instance of Picture with a pre-defined color.
     * @param {number} width - Total width in pixels
     * @param {number} height - Total height in pixels
     * @param {string} color - Color HEX
     * @returns {Picture}
     */
    static empty(width, height, color) {
        const pixels = new Array(width * height).fill(color);
        return new Picture(width, height, pixels);
    }

    /**
     * Access a pixel value based on its coordinates.
     * @param {number} x - Horizontal coordinate
     * @param {number} y - Vertical coordinate
     * @returns {string}
     */
    pixel(x, y) {
        return this.pixels[x + y * this.width];
    }

    /**
     * Draw a new picture in a non-mutating way.
     * @param {{x: number, y:number, color: string}[]} pixels - An array of Pixel objects
     * @returns {Picture}
     */
    draw(pixels) {
        let copy = this.pixels.slice();
        for (let {x, y, color} of pixels) {
            copy[x + y * this.width] = color;
        }
        return new Picture(this.width, this.height, copy);
    }
}