export class InfoGUI {
    constructor(game) {
        this.game = game;
        this.fpsCounter = document.getElementById("fpsCounter");
        this.timeCounter = document.getElementById("timeCounter");
    }

    update(dt) {
        this.fpsCounter.innerHTML = `FPS: ${Math.round(1/dt)}`;
        this.timeCounter.innerHTML = `Timer: ${Math.round(3.5)}`;
        console.log(this.fpsCounter.textContent)
    }

    updateFpsInterval(func, targetFPS) {
        const frameInterval = 1000 / targetFPS;
        func();
    }
}

