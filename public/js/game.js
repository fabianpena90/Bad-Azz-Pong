const socket = io(); // adding Socket.io  
const canvas = document.querySelector("canvas");
canvas.width = 850;
canvas.height = 650;
const ctx = canvas.getContext("2d");
const table = new Image()
table.src = "/public/img/table.jpg"
let id = null

// Creating Ball
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

// Funtion to draw ball
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

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  let cooldown1 = false
  let cooldown2 = false

  if (racket1.x < x + ballRadius &&
    racket1.x + racket1.w > x &&
    racket1.y < y + ballRadius &&
    racket1.y + racket1.h > y) {

    //  non-functioning cooldown (always thinks cooldown1 is false)

    //  if (cooldown1 == false){
    //    console.log("cooldown activated")
    //    cooldown1 = true
    //    console.log(cooldown1)
    //    dx = -dx;
    //    setTimeout(function(){
    //     console.log("cooldown ended")
    //     cooldown1 = false
    //   },3000)
    //  } else {
    //    console.log("cooldown1 is true")
    //  }

    dx = -dx
  }

  if (racket2.x < x + ballRadius &&
    racket2.x + racket2.w > x &&
    racket2.y < y + ballRadius &&
    racket2.y + racket2.h > y) {
    dx = -dx;
  }

  x += dx;
  y += dy;
}

setInterval(draw, 10);

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
  }
}

// Player1 and player2
let racket1 = new Rackets(10, 260, 20, 150)
let racket2 = new Rackets(820, 260, 20, 150)

let isHovering = false

canvas.addEventListener('mouseenter', e => {
  isHovering = true
});

canvas.addEventListener('mouseleave', e => {
  isHovering = false
});

canvas.addEventListener('mousemove', e => {
  if (isHovering === true) {
    racket1.y = e.offsetY - (racket1.h/2)
  }
});

window.onkeydown = function (e) {
  console.log(e.key);
  switch (e.key) {
    case 'ArrowUp':
      racket1.y -= 20
      break;
    case 'ArrowDown':
      racket1.y += 20
      break;
    case 'w':
      racket2.y -= 20
      break;
    case 's':
      racket2.y += 20
      break;
  }

}




function animate() {
  id = window.requestAnimationFrame(animate);
  ctx.drawImage(table, 0, 0, canvas.width, canvas.height);
  racket1.drawRackets()
  racket2.drawRackets()
  drawBall();
}

animate()