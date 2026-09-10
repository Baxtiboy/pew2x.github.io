export class Point {
    constructor(game, x=0, y=0, vx=0, vy=0) {
        this.game = game;
        this.x = x;
        this.y = y;

        this.v = {
            x: vx,
            y: vy
        }
    }

    // ----------------------

    getVector(target) {
        const xDist = target.x - this.x;
        const yDist = target.y - this.y;
        const h = Math.sqrt(xDist**2 + yDist**2);
        if (h === 0) return {x: 0, y: 1};

        return {x: xDist/h, y: yDist/h};
    }

    getDist(target) {
        const xDist = target.x - this.x;
        const yDist = target.y - this.y;

        return Math.sqrt(xDist**2 + yDist**2);
    }

    pointer(vector, length) {

        return {x: this.x + (vector.x * length), y: this.y + (vector.y * length)};
    }

    rotate90s(vector, angle) {
        switch (angle) {
            case 90: return {x: -vector.y, y: vector.x};
            case -90: return {x: vector.y, y: -vector.x};
            case 180: return {x: -vector.x, y: -vector.y};
        }
    }

    applyVelocity(dt) {
        this.x += this.v.x * dt;
        this.y += this.v.y * dt;
    }

    update(dt) {
        this.applyVelocity(dt);
    }

    // ----------------------

    translate(canvas) {
        return {
            x: this.x + canvas.width/2,
            y: -this.y + canvas.height/2
        }
    }

    draw(canvas, ctx, size=6, color="#0f0") {
        const pos = this.translate(canvas);

        ctx.fillStyle = color;
        ctx.fillRect(pos.x-size/2, pos.y-size/2, size, size);
    }
}