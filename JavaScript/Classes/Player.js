import { Point } from "./Point.js";

export class Player extends Point {
    constructor(x=0, y=0, name, vx=0, vy=0, radius=14) {
        super(x, y, vx, vy);
        this.name = name;
        this.radius = radius

        this.dashSpeed = 600;

        this.gun;

        this.tapKeys = {};
    }

    tapKey(keys, key, func) {
        if (keys[key]) {
            if (this.tapKeys[key]) {
                func();
                this.tapKeys[key] = false;
            }
        } else this.tapKeys[key] = true;
    }

    pressKey(keys, key, func) {
        if (keys[key]) func();
    }

    dash(vector) {
        this.v.x = this.dashSpeed * vector.x;
        this.v.y = this.dashSpeed * vector.y;
    }

    collision(canvas, dt) {
        
        const future = new Point(this.x + (this.v.x * dt), this.y + (this.v.y * dt))
        const translated = future.translate(canvas);

        if (translated.x -this.radius < 0 || translated.x + this.radius > canvas.width) {
            this.v.x *= -0.8;
        }
        if (translated.y -this.radius < 0 || translated.y + this.radius > canvas.height) {
            this.v.y *= -0.8;
        }
    }

    pull(target, targetDir, strength) {
        const dist = this.getDist(target);
        const pullRate = dist * strength;

        this.v.x += targetDir.x * pullRate;
        this.v.y += targetDir.y * pullRate;
    }

    update(canvas, target, keys, mouseBtns, dt) {
        const targetDir = this.getVector(target);

        this.tapKey(keys, "w", () => this.dash(targetDir));
        this.tapKey(keys, "s", () => this.dash(this.rotate90s(targetDir, 180)));
        this.tapKey(keys, "a", () => this.dash(this.rotate90s(targetDir, -90)));
        this.tapKey(keys, "d", () => this.dash(this.rotate90s(targetDir, 90)));

        this.pressKey(keys, " ", () => this.pull(target, targetDir, 0.1)); 

        this.v.x *= 0.9;
        this.v.y *= 0.9;

        this.collision(canvas, dt);

        this.x += this.v.x * dt;
        this.y += this.v.y * dt;
    }
}