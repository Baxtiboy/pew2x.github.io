import { Player } from "./Classes/Player.js";
import { InputHandler } from "./Classes/InputHandler.js";

window.addEventListener("load", event => {
    const cavnas = document.getElementById("game");
    const context = cavnas.getContext("2d");
    cavnas.width = 600;
    cavnas.height = 600;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.inputHandler = new InputHandler();
        }

        update(dt) {
            this.player.update(this.inputHandler, dt);
        }

        draw(ctx) {
            ctx.clearRect(0, 0, this.width, this.height);

            this.inputHandler.drawMouse(context);
            this.player.draw(ctx);
        }
    }

    const game = new Game(cavnas.width, cavnas.height);
    console.log(game)

    let deltaTime = 1/60;
    let lastTime = performance.now();
    const targetFPS = 300;
    const frameTime = 1000 / targetFPS;

    function gameLoop(currentTime) {
        requestAnimationFrame(gameLoop);

        const elapsed = currentTime - lastTime;
        if (elapsed <= frameTime) return
        deltaTime = elapsed / 1000;
        lastTime = currentTime - (elapsed % frameTime);

        game.update(deltaTime);
        game.draw(context);
    }

    requestAnimationFrame(gameLoop);
})