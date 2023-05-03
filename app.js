"use strict";
const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');
class Game {
    constructor() {
        this.req = -1;
        this.keyPlayer1 = {
            ArrowLeft: false,
            ArrowRight: false,
            ArrowUp: false,
            ArrowDown: false,
        };
        this.keyPlayer2 = {
            KeyA: false,
            KeyD: false,
            KeyW: false,
            KeyS: false,
        };
        this.players = [
            new Player(50, 50, 5, 15, 100, 'blue'),
            new Player(550, 50, 5, 15, 100, 'red'),
        ];
        this.ball = new Ball(200, 200, 10, 10, 5, 5, 'white');
        document.addEventListener('keydown', (event) => {
            if (event.code in this.keyPlayer1) {
                this.keyPlayer1[event.code] = true;
            }
            if (event.code in this.keyPlayer2) {
                this.keyPlayer2[event.code] = true;
            }
        });
        document.addEventListener('keyup', (event) => {
            if (event.code in this.keyPlayer1) {
                this.keyPlayer1[event.code] = false;
            }
            if (event.code in this.keyPlayer2) {
                this.keyPlayer2[event.code] = false;
            }
        });
    }
    start() {
        this.req = requestAnimationFrame(this.draw.bind(this));
    }
    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.move();
        this.checkCollision(this.players[0], this.players[1]);
        this.players.forEach((player) => player.draw());
        this.ball.draw();
        this.req = requestAnimationFrame(this.draw.bind(this));
    }
    checkCollision(obj1, obj2) {
        return (obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.y + obj1.height > obj2.y);
    }
    move() {
        this.ball.x += this.ball.speedX;
        this.ball.y += this.ball.speedY;
        if (this.ball.x < 0 || this.ball.x > canvas.width) {
            this.ball.speedX *= -1;
        }
        if (this.ball.y < 0 || this.ball.y > canvas.height) {
            this.ball.speedY *= -1;
        }
        if (this.checkCollision(this.ball, this.players[0])) {
            this.ball.speedX *= -1;
            const centerPaddleY = (this.players[0].y + this.players[0].height) / 2;
            const ballY = this.ball.y;
            if (centerPaddleY < ballY) {
                this.ball.speedY = Math.abs(this.ball.speedY);
            }
            else {
                this.ball.speedY = Math.abs(this.ball.speedY) * -1;
            }
        }
        if (this.checkCollision(this.ball, this.players[1])) {
            this.ball.speedX *= -1;
            const centerPaddleY = (this.players[1].y + this.players[1].height) / 2;
            const ballY = this.ball.y;
            if (centerPaddleY < ballY) {
                this.ball.speedY = Math.abs(this.ball.speedY);
            }
            else {
                this.ball.speedY = Math.abs(this.ball.speedY) * -1;
            }
        }
        if (this.keyPlayer1.ArrowRight) {
            this.players[0].x += this.players[0].speed;
        }
        else if (this.keyPlayer1.ArrowLeft) {
            this.players[0].x -= this.players[0].speed;
        }
        else if (this.keyPlayer1.ArrowUp) {
            this.players[0].y -= this.players[0].speed;
        }
        else if (this.keyPlayer1.ArrowDown) {
            this.players[0].y += this.players[0].speed;
        }
        if (this.keyPlayer2.KeyD) {
            this.players[1].x += this.players[1].speed;
        }
        else if (this.keyPlayer2.KeyA) {
            this.players[1].x -= this.players[1].speed;
        }
        else if (this.keyPlayer2.KeyW) {
            this.players[1].y -= this.players[1].speed;
        }
        else if (this.keyPlayer2.KeyS) {
            this.players[1].y += this.players[1].speed;
        }
    }
}
class Player {
    constructor(x, y, speed, width, height, color) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
class Ball {
    constructor(x, y, width, height, speedX, speedY, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
const game = new Game();
game.start();
