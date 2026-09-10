import { Point } from "./Point.js";
import { Bullet } from "./Bullet.js"

export class Gun extends Point {
    constructor(owner) {
        super();
        this.owner = owner;
        this.x = this.owner.x;
        this.y = this.owner.y;
        this.length = 30;

        this.mag = 30;
        this.ammo = this.mag;
        this.looseBullets = [];
        this.cooldownTime = 100;
        this.isCooldown = false
    }

    fire(vector) {
        if (this.ammo > 0 && this.isCooldown === false) {
            this.isCooldown = true;
            //this.ammo--;
            this.looseBullets.push(new Bullet(this, vector));
            this.length = 25;
            setTimeout(() => {
                this.isCooldown = false;
            }, this.cooldownTime)
        }
    }
    
    update(input, dt) {
        const mouseDir = this.owner.getVector(input.mousePos);
        const pointer = this.owner.pointer(mouseDir, this.length);
        this.x = pointer.x;
        this.y = pointer.y;

        input.mousePressed(0, () => this.fire(mouseDir))
        this.length = Math.min(30, this.length + (30 * dt))       

        this.looseBullets.forEach((bullet, index) => {
            if (bullet.update(dt) === false) this.looseBullets.splice(index, 1);
        })
    }

    draw(ctx) {
        this.looseBullets.forEach(bullet => bullet.draw(ctx));

        ctx.strokeStyle = "#898989";
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(this.owner.x, this.owner.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }
}