import { Point } from "./Point.js";

export class Enemy extends Point {
    constructor(game, vx, vy, x=300, y=300) {
        super();
        this.game = game;
        this.x = x;
        this.y = y;
        this.v = {
            x: vx,
            y: vy
        };
        this.width = 30;
        this.height = 30;
        this.health = 100;
        this.isAlive = true; 
        this.color = "#f00"
        this.bullets = this.game.player.gun.looseBullets
    }

    update(dt) {
        if (this.color = "#fff") this.color = "#f00"
        if (this.health <= 0) {
            this.isAlive = false;
            this.game.player.score++;
        }

        this.bullets.forEach((bullet, index) => {
            if (bullet.x > this.x &&
                bullet.x < this.x + this.width &&
                bullet.y > this.y &&
                bullet.y < this.y + this.height
            ) {
                this.bullets.splice(index, 1);
                this.health -= 20;
                this.color = "#fff"
                bullet.isAlive = false;
                
            } 
        })

        const futurePos = {
            x: this.x + (this.v.x * dt), 
            y: this.y + (this.v.y * dt)
        }
        if (futurePos.x < 0 || futurePos.x + this.width > this.game.width) {
            this.v.x *= -1;
        }
        if (futurePos.y < 0 || futurePos.y + this.height > this.game.height) {
            this.v.y *= -1;
        }

        this.x += this.v.x * dt
        this.y += this.v.y * dt
        return this.isAlive;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}