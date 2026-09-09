export class InputHandler {
    constructor() {
        this.keysPressed = {};
        this.mousePressed = [false, false, false];
        this.keysTapped = {};
        this.mouseTapped = [false, false, false];
        this.mousePos = {x: 0, y: 0}
        window.addEventListener("keydown", event => {
            this.keysPressed[event.code] = true;
            //console.log(event.code);
        })
        window.addEventListener("keyup", event => {
            this.keysPressed[event.code] = false;
        })
        window.addEventListener("mousedown", event => {
            this.keysPressed[event.button] = true;
            //console.log(event.button);
        })
        window.addEventListener("mouseup", event => {
            this.keysPressed[event.button] = false;
        })

        window.addEventListener("mousemove", event => {
            this.mousePos.x = event.clientX-8;
            this.mousePos.y = event.clientY-8;
        })
    }

    tapped(key, func) {
        if (this.keysPressed[key]) {
            if (this.keysTapped[key]) {
                func()
                this.keysTapped[key] = false;
            }
        } else this.keysTapped[key] = true;
    }

    pressed(key, func) {
        if (this.keysPressed[key]) func();
    }

    drawMouse(ctx) {
        ctx.fillStyle = "#fa0";
        ctx.beginPath();
        ctx.arc(this.mousePos.x, this.mousePos.y, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
}