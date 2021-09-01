const { auth } = require('./middleware/auth');

let io;

module.exports = {
  init: (httpServer) => {
    io = require('socket.io')(httpServer, {
      cors: {
        origin: [
          'http://localhost:5000',
          'https://interviewdreamv2.web.app',
          'https://interviewdreamv2.firebaseapp.com/',
        ],
        methods: ['GET', 'POST'],
      },
    });
    return io;
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
  handleDisconnection: (socket) => {
    socket.on('disconnect', (reason) => {
      socket.broadcast.emit('user disconnected', {
        socketId: socket.id,
        userId: socket.userId,
      });
    });
  },
  handleMessage: (socket) => {
    socket.on('private message', ({ msgContent, toSocketId }) => {
      socket.to(toSocketId).emit('private message', {
        msgContent,
        timestamp: new Date(),
        fromSocket: socket.id,
      });
    });
  },
  emitExistingUsersToClient: (socket) => {
    const onlineUsers = [];
    for (let [id, socket] of io.of('/').sockets) {
      onlineUsers.push({
        socketId: id,
        userId: socket.userId,
      });
    }
    socket.emit('users', onlineUsers);
  },
  notifyExistingUsers: (socket) => {
    // notify existing users
    socket.broadcast.emit('user connected', {
      socketId: socket.id,
      userId: socket.userId,
    });
  },
};
