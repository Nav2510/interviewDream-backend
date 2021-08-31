const { auth } = require('./middleware/auth');

let io;
let onlineUsers = [];

module.exports = {
  init: (httpServer) => {
    io = require('socket.io')(httpServer, {
      cors: {
        origin: ['http://localhost:5000'],
        methods: ['GET', 'POST'],
      },
    });
    return io;
  },
  getOnlineUsers: () => {
    return onlineUsers;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initiallized. :(');
    }
    return io;
  },

  errorHandler: (error) => {
    (err) => {
      if (err && err.message === 'unauthorized event') {
        socket.disconnect();
      }
    };
  },
  handleConnection: (socket) => {
    const connectionToken = socket.handshake.auth.token;

    // Authorization of the client connected
    const parsedToken = auth.validateToken(connectionToken);
    if (!parsedToken.userId) {
      socket.disconnect();
    }
    socket.userId = parsedToken.userId;
  },
  emitOnlineUsers: (socket) => {
    for (let [id, socket] of io.of('/').sockets) {
      onlineUsers.push({
        socketId: id,
        userId: socket.userId,
      });
    }
    socket.broadcast.emit('user connected', onlineUsers);
  },
};
