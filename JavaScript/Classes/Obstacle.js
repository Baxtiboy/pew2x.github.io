import { Point } from "./Point.js";

export class Obstacle extends Point {
    constructor(x=100, y=100, vx, vy, sx, sy, damage, health) {
        super(x, y, vx, vy);
        this.size = {
            x: sx,
            y: sy
        }
        this.damage = damage;
        this.health = health;
    }

    update(dt) {
        this.applyVelocity(dt)
    }

    draw(canvas, ctx, color="#f00") {
        const pos = this.translate(canvas);

        ctx.fillStyle = color;
        ctx.fillRect(pos.x, pos.y, this.size.x, this.size.y);
    }
}