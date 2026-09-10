import { Point } from "./Point.js";

export class Bullet extends Point {
    constructor(gun, vector) {
        super();
        this.gun = gun;
        this.game = this.gun.owner.game;
        this.x = this.gun.x;
        this.y = this.gun.y;
        this.vector = vector;
        this.speed = 1000;
        this.v = {
            x: this.vector.x * this.speed,
            y: this.vector.y * this.speed
        };
        this.isAlive = true;
    }

    update(dt) {
        this.x += this.v.x * dt;
        this.y += this.v.y * dt;

        if (this.x < 0 || this.x > this.game.width) this.isAlive = false;
        if (this.y < 0 || this.y > this.game.height) this.isAlive = false;

        return this.isAlive;
    }

    draw(ctx) {
        const tail = this.pointer(this.vector, -10);

        ctx.strokeStyle = "#9ff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tail.x, tail.y);
        ctx.stroke();
    }
}