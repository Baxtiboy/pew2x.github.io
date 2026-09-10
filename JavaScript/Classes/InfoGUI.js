export class InfoGUI {
    constructor(game) {
        this.game = game;
        this.fpsCounter = document.getElementById("fpsCounter");
        this.timeCounter = document.getElementById("timeCounter");
        this.score = document.getElementById("score");
        this.ammo = document.getElementById("ammo");
    }

    update(dt) {
        this.fpsCounter.innerHTML = `FPS: ${Math.round(1/dt)}`;
        this.score.innerHTML = `Score: ${this.game.player.score}`;
        this.ammo.innerHTML = `Ammo: ${this.game.player.gun.ammo}`;
        console.log(this.fpsCounter.textContent)
    }

    updateFpsInterval(func, targetFPS) {
        const frameInterval = 1000 / targetFPS;
        func();
    }
}

