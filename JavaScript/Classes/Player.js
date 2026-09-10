import { Point } from "./Point.js";
import { Gun } from "./Gun.js";

export class Player extends Point {
    constructor(game) {
        super();
        this.game = game
        this.width = 30;
        this.height = 30;
        this.score = 0;
        this.x = game.width/2-this.width/2;
        this.y = game.height-this.height;
        this.v = {
            x: 0,
            y: 0
        }

        this.dashForce = 500;

        this.gun = new Gun(this);
    }

    dash(vector, dt) {
        this.v.x = (vector.x * this.dashForce) * dt;
        this.v.y = (vector.y * this.dashForce) * dt;
    }

    update(input, dt) {
        const mouseDir = this.getVector(input.mousePos);
        input.keyTapped("KeyW", () => this.dash(mouseDir, dt));
        input.keyTapped("KeyA", () => this.dash(this.rotate90s(mouseDir, -90), dt));
        input.keyTapped("KeyS", () => this.dash(this.rotate90s(mouseDir, 180), dt));
        input.keyTapped("KeyD", () => this.dash(this.rotate90s(mouseDir, 90), dt));

        input.keyPressed("Space", () => {
            const dist = this.getDist(input.mousePos);

            this.v.x += mouseDir.x * ((dist/10) * dt);
            this.v.y += mouseDir.y * ((dist/10) * dt);
        })

        this.v.x -= (this.v.x * 5) * dt;
        this.v.y -= (this.v.y * 5) * dt;

        const futurePos = {
            x: this.x + this.v.x,
            y: this.y + this.v.y
        }

        if (futurePos.x - 15 < 0 || futurePos.x + 15 > this.game.width) {
            this.v.x *= -0.8
        }
        if (futurePos.y - 15 < 0 || futurePos.y + 15 > this.game.height) {
            this.v.y *= -0.8
        }

        this.x += this.v.x;
        this.y += this.v.y;

        this.gun.update(input, dt);
    }

    draw(ctx) {
        this.gun.draw(ctx);

        ctx.fillStyle = "#0f0";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
        ctx.fill();
    }
}