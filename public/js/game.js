// const socket = io(); // adding Socket.io 
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
const pingPongTable = new Image()
pingPongTable.src = "pingpong_table.jpg"
const id = null



// // Score game
// let leftScore = 0;
// let rightScore = 0;

// // Create pong ball
// let ball = ctx.arc(100, 75, 10, 0, 2 * Math.PI);

// Drawing rectangles
// class Rectangles {
//   constructor(img, x, y, width, height, speed, color) {
//     this.img = img
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
//     this.speed = speed;
//     this.color = color
//   }
//   drawReact = () => {
//     context.fillStyle = '#fff';
//     context.fillRect(this.x, this.y, this.width, this.height)
//   }
// }

// // Create ball
// let speed = 2
// let radius = 10
// class Ball {
//   constructor(x, y, width, height, radius, speed) {
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
//     this.radius = radius;
//     this.speed = speed;
//   }
//   drawBall = () => {
//     ctx.beginPath()
//     ctx.arc(100, 75, this.radius, 0, 2 * Math.PI)
//   }
// }

// class PingPongTable {
//   constructor(img, x, y, w, h){
//     this.img = img;
//     this.x = x;
//     this.y = y;
//     this.w = w;
//     this.h = h;
//   }
//   drawbackground() {
//     ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
//   }
// }

function animate() {
  id = window.requestAnimationFrame(animate);
  ctx.drawImage(pingPongTable, 0, 0, 300, 150)
}