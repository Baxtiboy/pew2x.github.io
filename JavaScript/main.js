import { Point } from "./Classes/Point.js";
import { Player } from "./Classes/Player.js";

// -------------------------

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// -------------------------

const keys = {};
const mouseBtns = [false, false, false];
const mouse = new Point();

window.addEventListener("keydown", (event) => keys[event.key] = true);
window.addEventListener("keyup", (event) => keys[event.key] = false);

canvas.addEventListener("mousedown", (event) => mouseBtns[event.button] = true);
canvas.addEventListener("mouseup", (event) => mouseBtns[event.button] = false);
canvas.addEventListener("contextmenu", (event) => event.preventDefault())

canvas.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX-8 - canvas.width/2;
    mouse.y = -event.clientY+8 + canvas.height/2;
})

// -------------------------

let dt = 1/60;
const FPS = 300;
let lastTime = performance.now();
const timeLimit = 1000 / FPS;

const player = new Player();

// -------------------------

function update(dt) {
    player.update(canvas, mouse, keys, mouseBtns, dt);
}

function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.draw(canvas, ctx, 10, "#0f0");
    mouse.draw(canvas, ctx, 16, "#fa0");
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