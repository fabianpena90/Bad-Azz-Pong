const canvas = document.querySelector("canvas");
canvas.width = 850;
canvas.height = 650;
const ctx = canvas.getContext("2d");
const table = new Image();
table.src = "../img/table.jpg";
document.querySelector("#create-room").onclick = function (e) {
  console.log(e);
  socket.emit("create-room", { socketId });
};

// console.log(table);
let id = null;
let score1 = 0;
let score2 = 0;
let winningScore = 10

// Rackets Class
class Rackets {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "#333";
  }
  drawRackets = () => {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  };
}

// Player1 and player2
let racket1 = new Rackets(10, 260, 20, 150);
let racket2 = new Rackets(820, 260, 20, 150);

// Creating Ball
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 3;
let dy = -3;

//Funtion to draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();

  if (x + dx > canvas.width - ballRadius) {
    console.log("right");
    score1++;
    clearInterval(interval);
    
  } else if (x + dx < ballRadius) {
    console.log("left");
    score2++;
    clearInterval(interval);
  }

  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  // Adding collision with Paddles
  if (
    racket1.x < x + ballRadius &&
    racket1.x + racket1.w > x &&
    racket1.y < y + ballRadius &&
    racket1.y + racket1.h > y
  ) {
    dx = -dx;
    score1++;
  }

  // Adding collision with Paddles
  if (
    racket2.x < x + ballRadius &&
    racket2.x + racket2.w > x &&
    racket2.y < y + ballRadius &&
    racket2.y + racket2.h > y
  ) {
    dx = -dx;
    score2++;
  }

  x += dx;
  y += dy;
}

let interval = setInterval(draw, 10);

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Score: " + score1, 8, 20);
  ctx.font = "20px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Score: " + score2, 750, 20);
}

// Mouse Paddles Control
let isHovering = false;
canvas.addEventListener("mouseenter", (e) => {
  isHovering = true;
});

canvas.addEventListener("mouseleave", (e) => {
  isHovering = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (isHovering === true) {
    racket1.y = e.offsetY - racket1.h / 2;
  }
});

window.onkeydown = function (e) {
  // console.log(e.key);
  switch (e.key) {
    case "ArrowUp":
      racket2.y -= 40;
      break;
    case "ArrowDown":
      racket2.y += 40;
      break;
    case "w":
      racket1.y -= 40;
      break;
    case "s":
      racket1.y += 40;
      break;
  }
};

function animate() {
  id = window.requestAnimationFrame(animate);
  ctx.drawImage(table, 0, 0, canvas.width, canvas.height);
  racket1.drawRackets();
  racket2.drawRackets();
  drawBall();
  drawScore();
}

animate();
