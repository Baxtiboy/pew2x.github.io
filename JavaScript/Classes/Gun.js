import { Point } from "./Point.js";

export class Gun extends Point {
    constructor(owner) {
        super();
        this.owner = owner;
        this.x = this.owner.x;
        this.y = this.owner.y;
    }
    
    update(input, dt) {
        const pointer = this.owner.pointer(input.mousePos, 30);
        this.x = pointer.x;
        this.y = pointer.y;
    }

    draw(ctx) {
        ctx.strokeStyle = "#898989";
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(this.owner.x, this.owner.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }
}