import Vec from "../engine/vec.js";

let cx = document.querySelector("canvas").getContext("2d");

drawTrapezoid(new Vec(60, 60), 50, 40, 80);
drawDiamond(new Vec(180, 0), 60);
drawZigZag(new Vec(240, 40), 90, 80, 12);
drawSpiral(new Vec(370, 80), 40);
drawCurvedStar(new Vec(460, 80), 40);

/**
 * @param {Vec} startPos - Upper left coordinate
 * @param {number} height - Trapezoid height
 * @param {number} smaller - The smaller side value
 * @param {number} larger - The larger side value
 */
function drawTrapezoid(startPos, height, smaller, larger) {
    const { x, y } = startPos;
    cx.beginPath();
    cx.moveTo(x, y);
    cx.lineTo(x + smaller, y);
    const increment = (larger - smaller) / 2;
    cx.lineTo(x + smaller + increment, y + height);
    cx.lineTo(x - increment, y + height);
    cx.lineTo(x, y);
    cx.stroke();
}

/**
 * @param {Vec} centerPos - The diamond center coordinates
 * @param {number} side - Side of the diamond
 */
function drawDiamond(centerPos, side) {
    const { x, y } = centerPos;
    cx.save();
    cx.translate(x, y);
    cx.rotate(Math.PI / 4);
    cx.translate(-x, -y);
    cx.fillStyle = "red";
    cx.fillRect(x + side / 2, y + side / 2, side, side);
    cx.restore();
}

/**
 * @param {Vec} startPos - Starting coordinates
 * @param {number} height - Maximum height
 * @param {number} width - Maximum width
 * @param {number} steps - Number of desired steps
 */
function drawZigZag(startPos, height, width, steps) {
    let { x, y } = startPos;
    const total = y + height;
    const increment = height / steps;
    let endOfShape = true;
    cx.beginPath();
    cx.moveTo(x, y);
    y += increment;

    console.log(total);
    for (; y <= total; y += increment) {
        x = endOfShape ? x + width : x - width;
        cx.lineTo(x, y);
        endOfShape = !endOfShape;
        console.log(`y: ${y}`);
    }
    cx.stroke();
}

/**
 * @param {Vec} center - Starting center coordinates
 * @param {number} radius 
 */
function drawSpiral(center, radius) {
    let { x, y } = center;
    cx.moveTo(x, y);
    const delta = radius / 100;
    cx.beginPath();
    for (let i = 0; i <= radius; i += delta) {
        cx.lineTo(x + Math.cos(i / 1.5) * i, y + Math.sin(i / 1.5) * i);
    }
    cx.stroke();
}

/**
 * @param {Vec} center - Center coordinates
 * @param {number} radius - Distance between center and a far edge of the star
 */
function drawCurvedStar(center, radius) {
    const arcAngle = 2 * Math.PI / 8;
    const { x, y } = center;
    cx.beginPath();
    let j = 0;
    for (let i = 0; i <= 8; i++) {
        if (i == 0) {
            cx.moveTo(x + Math.cos(arcAngle) * radius, y + Math.sin(arcAngle) * radius);
        }
        j+= arcAngle;
        cx.quadraticCurveTo( x, y, x + Math.cos(j) * radius, y + Math.sin(j) * radius)
    }
    cx.fillStyle = "goldenrod";
    cx.fill();
}