const messages = ['test'];
const io = require('../socket');

exports.postMessage = (req, res, next) => {
  io.getIO().emit('messages', { action: 'create', messages: messages });
};

exports.getMessage = (req, res, next) => {
  res.send(messages);
};
