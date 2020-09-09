document.querySelector("#create-room").onclick = function (e) {
  // console.log(e);
  socket.emit("create-room", { socketId });
};

// Select Canvas
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d')
const table = new Image();
table.src = "../img/table.jpg";

// create users paddles
const player1 = {
  x: 10,
  y: canvas.height / 2 - 200 / 2,
  width: 20,
  height: 200,
  color: '#fff',
  score: 0
}

const player2 = {
  x: canvas.width - 30,
  y: canvas.height / 2 - 200 / 2,
  width: 20,
  height: 200,
  color: '#fff',
  score: 0
}

// Create ball
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 15,
  speed: 5,
  velocityX: 5,
  velocityY: 5,
  color: '#fff'
}

// Draw Rect Function
function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h, color);
}

// Draw circle Function
function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

const net = {
  x: canvas.width / 2 - 1,
  y: 0,
  width: 5,
  height: 35,
  color: '#fff'
}

function drawNet() {
  for (let i = 0; i <= canvas.height; i += 45) {
    drawRect(net.x, net.y + i, net.width, net.height, net.color);
  }
}

function drawText(text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = '45px monospace';
  ctx.fillText(text, x, y);
}

function game() {
  // clear canvas
  ctx.drawImage(table, 0, 0, canvas.width, canvas.height)
  //drawRect(0, 0, canvas.width, canvas.height, 'BLACK');

  // draw the net
  drawNet();

  // draw score
  drawText(player1.score, canvas.width / 6, canvas.height / 7, '#fff');
  drawText(player2.score, 5 * canvas.width / 6, canvas.height / 7, '#fff');

  // draw paddles
  drawRect(player1.x, player1.y, player1.width, player1.height, 'red')
  drawRect(player2.x, player2.y, player2.width, player2.height, 'purple')

  // Draw circle
  drawCircle(ball.x, ball.y, ball.radius, ball.color)
}

window.onkeydown = function (e) {
  // console.log(e.key);
  socket.emit('keyToServer', e.key)

};


socket.on("keyToClient", function (key) {

  console.log(key)

  switch (key) {
    case "ArrowUp":
      player2.y -= 40;
      break;
    case "ArrowDown":
      player2.y += 40;
      break;
    case "w":
      player1.y -= 40;
      break;
    case "s":
      player1.y += 40;
      break;
  }
})

// Collision Detection Function
function collision(b, p) {
  b.top = b.y - b.radius;
  b.bottom = b.y + b.radius;
  b.left = b.x - b.radius;
  b.right = b.x + b.radius

  p.top = p.y;
  p.bottom = p.y + p.height;
  p.left = p.x;
  p.right = p.x + p.width

  return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}

// Reset Ball Function
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y - canvas.height / 2;

  ball.speed = 5;
  ball.velocityX = -ball.velocityX
}

// Update
function update() {
  if (ball.x - ball.radius < 0) {
    player1.score++;
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    player2.score++;
    resetBall();
  }
  // the ball has a velocity
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.velocityY = -ball.velocityY;
  }
  // we check if the racket hit the players
  let players = ball.x + ball.radius < canvas.width / 2 ? player1 : player2;
  // if the ball hits a racket
  if (collision(ball, players)) {

    // we check where the ball hits the racket
    let collidePoint = ball.y - (players.y + players.height / 2);
    collidePoint = collidePoint / (players.height / 2);

    let angleRad = (Math.PI / 4) * collidePoint;
    // change the X and Y velocity direction
    let direction = ball.x + ball.radius < canvas.width / 2 ? 1 : -1;
    ball.velocityX = direction * ball.speed * Math.cos(angleRad);
    ball.velocityY = ball.speed * Math.sin(angleRad);
    // speed up the ball everytime a racket hits it.
    ball.speed += 0.8;
  }
}



// Game Start
function gameInit() {
  update();
  game();

}

// Loop
const framePerSecond = 50;
setInterval(gameInit, 1000 / framePerSecond)


// const canvas = document.querySelector("canvas");
// canvas.width = 850;
// canvas.height = 650;
// const ctx = canvas.getContext("2d");
// const table = new Image();
// table.src = "../img/table.jpg";


// table.src = "../img/table.jpg";
// let id = null;
// let score1 = 0;
// let score2 = 0;
// let winningScore = 10

// // Rackets Class
// class Rackets {
//   constructor(x, y, w, h) {
//     this.x = x;
//     this.y = y;
//     this.w = w;
//     this.h = h;
//     this.color = "#333";
//   }
//   drawRackets = () => {
//     ctx.fillStyle = this.color;
//     ctx.fillRect(this.x, this.y, this.w, this.h);
//   };
// }

// // Player1 and player2
// let racket1 = new Rackets(10, 260, 20, 150);
// let racket2 = new Rackets(820, 260, 20, 150);

// // Creating Ball
// let ballRadius = 10;
// let x = canvas.width / 2;
// let y = canvas.height - 30;
// let dx = 3;
// let dy = -3;

// //Funtion to draw ball
// function drawBall() {
//   ctx.beginPath();
//   ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
//   ctx.fillStyle = "#fff";
//   ctx.fill();
//   ctx.closePath();
// }

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawBall();

//   if (x + dx > canvas.width - ballRadius) {
//     console.log("right");
//     score1++;
//     clearInterval(interval);

//   } else if (x + dx < ballRadius) {
//     console.log("left");
//     score2++;
//     clearInterval(interval);
//   }

//   if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
//     dy = -dy;
//   }

//   // Adding collision with Paddles
//   if (
//     racket1.x < x + ballRadius &&
//     racket1.x + racket1.w > x &&
//     racket1.y < y + ballRadius &&
//     racket1.y + racket1.h > y
//   ) {
//     dx = -dx;
//     score1++;
//   }

//   // Adding collision with Paddles
//   if (
//     racket2.x < x + ballRadius &&
//     racket2.x + racket2.w > x &&
//     racket2.y < y + ballRadius &&
//     racket2.y + racket2.h > y
//   ) {
//     dx = -dx;
//     score2++;
//   }

//   x += dx;
//   y += dy;
// }

// let interval = setInterval(draw, 10);

// function drawScore() {
//   ctx.font = "20px Arial";
//   ctx.fillStyle = "#fff";
//   ctx.fillText("Score: " + score1, 8, 20);
//   ctx.font = "20px Arial";
//   ctx.fillStyle = "#fff";
//   ctx.fillText("Score: " + score2, 750, 20);
// }

// // Mouse Paddles Control
// let isHovering = false;
// canvas.addEventListener("mouseenter", (e) => {
//   isHovering = true;
// });

// canvas.addEventListener("mouseleave", (e) => {
//   isHovering = false;
// });

// canvas.addEventListener("mousemove", (e) => {
//   if (isHovering === true) {
//     racket1.y = e.offsetY - racket1.h / 2;
//   }
// });

// window.onkeydown = function (e) {
//   // console.log(e.key);
//   switch (e.key) {
//     case "ArrowUp":
//       racket2.y -= 40;
//       break;
//     case "ArrowDown":
//       racket2.y += 40;
//       break;
//     case "w":
//       racket1.y -= 40;
//       break;
//     case "s":
//       racket1.y += 40;
//       break;
//   }
// };

// function animate() {
//   id = window.requestAnimationFrame(animate);
//   ctx.drawImage(table, 0, 0, canvas.width, canvas.height);
//   racket1.drawRackets();
//   racket2.drawRackets();
//   drawBall();
//   drawScore();
// }

// animate();
