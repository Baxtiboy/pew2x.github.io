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
        }
    }

    update(dt) {
        this.x += this.v.x * dt;
        this.y += this.v.y * dt;

        if (this.x < 0 || this.x > this.game.width) return false;
        if (this.y < 0 || this.y > this.game.height) return false;

        return true;
    }

    draw(ctx) {
        const tail = this.pointer(this.vector, -10);

        ctx.strokeStyle = "#9ff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tail.x, tail.y);
        ctx.stroke();
    }
}