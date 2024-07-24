
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const basketWidth = 50;
const basketHeight = 10;
let basketX = (canvas.width - basketWidth) / 2;
const basketY = canvas.height - basketHeight;

const fruitRadius = 10;
let fruitX = Math.random() * (canvas.width - 2 * fruitRadius) + fruitRadius;
let fruitY = 0;
let fruitDy = 2;

let score = 0;

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        basketX += 7;
        if (basketX + basketWidth > canvas.width) {
            basketX = canvas.width - basketWidth;
        }
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        basketX -= 7;
        if (basketX < 0) {
            basketX = 0;
        }
    }
}

function drawBasket() {
    ctx.beginPath();
    ctx.rect(basketX, basketY, basketWidth, basketHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawFruit() {
    ctx.beginPath();
    ctx.arc(fruitX, fruitY, fruitRadius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function resetFruit() {
    fruitX = Math.random() * (canvas.width - 2 * fruitRadius) + fruitRadius;
    fruitY = 0;
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBasket();
    drawFruit();
    drawScore();

    if (fruitY + fruitDy > canvas.height) {
        if (fruitX > basketX && fruitX < basketX + basketWidth) {
            score++;
            resetFruit();
        } else {
            alert("Game Over! Your score was: " + score);
            document.location.reload();
        }
    } else {
        fruitY += fruitDy;
    }

    requestAnimationFrame(update);
}

update();
