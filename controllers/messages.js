const messages = ['test'];
const io = require('../socket');

exports.postMessage = (req, res, next) => {
  console.log(req.body.message);
  messages.push(req.body.message);
  io.getIO().emit('messages', { action: 'create', messages: messages });
};

exports.getMessage = (req, res, next) => {
  res.send(messages);
};
