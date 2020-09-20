const app = require('express')();
const http = require('http');
const socketIo = require("socket.io");
const PORT = process.env.PORT || 3001;

const index = require('./routes/index');

app.use('/', index);

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
  
    socket.on('message', ({ userId, message }) => {
        io.emit('message', {
          userId,
          message
        })
    });
});

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});