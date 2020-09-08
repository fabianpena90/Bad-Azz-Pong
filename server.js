const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 2002;

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/game", function (req, res) {
  res.sendFile(__dirname + "/game.html");
});

// Listening when accessed by new user
io.on("connection", (socket) => {
  console.log(socket.client.conn.server.clientsCount + " users connected");
  console.log(socket.id);
  console.log(io.sockets.adapter.rooms, "rooooomoooos");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });

  socket.on("create-room", (room) => {
    console.log(room, " porcupine ", socket.id);

    let rooms = io.sockets.adapter.rooms;
    let joined = false;
    let n = 0;
    for (let room in rooms) {
      n++;
      console.log(
        room,
        rooms[room].length

        // rooms[room].Room.length
      );
      if ((rooms[room].length < 2) & !isNaN(n)) {
        console.log("joining ", String(n));
        socket.join(String(n));
        joined = true;
        break;
      }
    }
    if (!joined) {
      console.log("no rooms left so make new one", String(n));
      socket.join(String(n));
    }

    console.log(rooms, "?");
  });
  socket.on("disconnect", () => {
    console.log(socket.client.conn.server.clientsCount + " users connected");
  });
});

http.listen(port, () => {
  console.log("listening on " + port);
});
