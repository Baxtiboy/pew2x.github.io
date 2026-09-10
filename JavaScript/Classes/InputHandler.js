export class InputHandler {
    constructor() {
        this.keysPressed = {};
        this.mousePresses = [false, false, false];
        this.keysTapped = {};
        this.mouseTapps = [false, false, false];
        this.mousePos = {x: 0, y: 0}
        window.addEventListener("keydown", event => {
            this.keysPressed[event.code] = true;
            //console.log(event.code);
        })
        window.addEventListener("keyup", event => {
            this.keysPressed[event.code] = false;
        })
        window.addEventListener("mousedown", event => {
            this.mousePresses[event.button] = true;
            //console.log(event.button);
        })
        window.addEventListener("mouseup", event => {
            this.mousePresses[event.button] = false;
        })

        window.addEventListener("mousemove", event => {
            this.mousePos.x = event.clientX-8;
            this.mousePos.y = event.clientY-8;
        })
    }

    keyTapped(key, func) {
        if (this.keysPressed[key]) {
            if (this.keysTapped[key]) {
                func()
                this.keysTapped[key] = false;
            }
        } else this.keysTapped[key] = true;
    }

    keyPressed(key, func) {
        if (this.keysPressed[key]) func();
    }

    mouseTapped(key, func) {
        if (this.mousePresses[key]) {
            if (this.mouseTapps[key]) {
                func()
                this.mouseTapps[key] = false;
            }
        } else this.mouseTapps[key] = true;
    }

    mousePressed(key, func) {
        if (this.mousePresses[key]) func();
    }

    drawMouse(ctx) {
        ctx.fillStyle = "#fa0";
        ctx.beginPath();
        ctx.arc(this.mousePos.x, this.mousePos.y, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
}