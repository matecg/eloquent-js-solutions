import Vec from "../engine/vec.js"

const canvas = document.querySelector("canvas");
const cx = canvas.getContext("2d");
const SPEED = 120;
const RADIUS = 12;
const position = new Vec(200, 200);
let velocity = new Vec(1, 1);

let lastTime = null;

function frame(time) {
    if (lastTime != null) {
        updateAnimation(Math.min(100, time - lastTime) / 1000);
    }
    lastTime = time;
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

function updateAnimation(step) {
    cx.reset();
    cx.lineWidth = 3
    cx.fillStyle = "crimson";
    cx.strokeRect(0, 0, canvas.width, canvas.height);
    cx.fillStyle = "cornflowerblue";

    let nextStepX = step * velocity.x * SPEED;
    let nextStepY = step * velocity.y * SPEED;
    let collided = false;

    if (isCollidingHorizontally(nextStepX)) {
        velocity.x *= -1;
        velocity.y += (Math.random() - 0.5) * 1.5;
        collided = true;
    }
    if (isCollidingVertically(nextStepY)) {
        velocity.y *= -1;
        velocity.x += (Math.random() - 0.5) * 1.5;
        collided = true;
    }

    position.x += step * SPEED * velocity.x;
    position.y += step * SPEED * velocity.y;
    cx.arc(position.x, position.y, RADIUS, 0, 2 * Math.PI);
    cx.fill();
}

function isCollidingHorizontally(nextStep) {
    return position.x + RADIUS + nextStep >= canvas.width
        || position.x - RADIUS + nextStep <= 0;
}

function isCollidingVertically(nextStep) {
    return position.y + RADIUS + nextStep >= canvas.height
        || position.y - RADIUS + nextStep <= 0;
}
