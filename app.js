"use strict";
const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw() {
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x, this.y, 100, 100);
        ctx.font = '24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'red';
        let output = `Pos {x: ${this.x},y: ${this.y}}`;
        ctx.fillText(output, 300, 30);
        ctx.beginPath();
        ctx.fillStyle = 'blue';
        ctx.moveTo(50, 200);
        ctx.lineTo(150, 250);
        ctx.lineTo(150, 150);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(150, 300, 50, 0, 2 * Math.PI);
        ctx.strokeStyle = 'yellow';
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.stroke();
    }
}
const player = new Player(50, 50);
player.draw();
