module.exports = function (messageCode, message, code) {
  const error = new Error(message || 'Internal Server Error');
  error.msgCode = messageCode;
  error.code = code || 500;
  throw error;
};
