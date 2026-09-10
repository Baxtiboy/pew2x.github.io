import { Player } from "./Classes/Player.js";
import { InputHandler } from "./Classes/InputHandler.js";
import { Enemy } from "./Classes/Enemy.js";
import { InfoGUI } from "./Classes/InfoGUI.js";

window.addEventListener("load", event => {
    const canvas = document.getElementById("game");
    const context = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 600;

    const fpsCounter = document.getElementById("fpsCounter");
    const timeCounter = document.getElementById("timeCounter");
    //context.translate(canvas.width, 0);

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.infoGUI = new InfoGUI(this);
            this.inputHandler = new InputHandler(canvas);
            this.enemyList = [];
            //this.enemy = new Enemy(this, 100, 100);
        }

        update(dt) {
            if (this.enemyList.length < 5) {
                this.enemyList.push(new Enemy(this, 100, 100, Math.round(Math.random()*(this.width-30)), Math.round(Math.random()*(this.height-30))))
                console.log(this.enemyList)
            }
            this.enemyList.forEach((enemy, index) => {
                if (enemy.update(dt) === false) this.enemyList.splice(index, 1);
            })
            this.player.update(this.inputHandler, dt);
        }

        draw(ctx) {
            ctx.clearRect(0, 0, this.width, this.height);

            //this.inputHandler.drawMouse(context);
            this.enemyList.forEach((enemy) => {
                enemy.draw(ctx);
            })
            this.player.draw(ctx);
            
        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game)

    let deltaTime = 1/60;
    let lastTime = performance.now();
    const targetFPS = 300;
    const frameTime = 1000 / targetFPS;

    function gameLoop(currentTime) {
        requestAnimationFrame(gameLoop);

        const elapsed = currentTime - lastTime;
        if (elapsed < frameTime) return
        deltaTime = elapsed / 1000;
        lastTime = currentTime - (elapsed % frameTime);

        game.update(deltaTime);
        game.draw(context);

        game.infoGUI.update(deltaTime);
    }

    requestAnimationFrame(gameLoop);
})