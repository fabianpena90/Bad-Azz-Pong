const express = require("express")
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 5000;

app.use(express.static(__dirname + 'public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/game", function(req, res) {
  res.sendFile(__dirname + "/game.html")
})

// Listening when accessed by new user
io.on("connection", (socket) => {
  console.log('a user connected');
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg)
  });
});

http.listen(port, () => {
  console.log("listening on " + port);
});