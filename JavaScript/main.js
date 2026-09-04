import { Point } from "./Classes/Point.js";

// -------------------------

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// -------------------------



// -------------------------

let dt = 1/60;
const FPS = 60;
let lastTime = performance.now();
const timeLimit = 1000 / FPS;

const player = new Point();

// -------------------------

function update(dt) {
    player.update(dt);
}

function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.draw(canvas, ctx, 10, "#0f0");
}

function gameLoop(currentTime) {
    requestAnimationFrame(gameLoop);

    const elapsed = currentTime - lastTime;
    if (elapsed <= timeLimit) return;
    lastTime = currentTime - (elapsed % timeLimit);
    dt = elapsed / 1000;

    update(dt);
    draw();
}

// -------------------------

requestAnimationFrame(gameLoop);