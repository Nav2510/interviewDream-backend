const addError = require('./add-error');
const errorMsg = require('./contants/error-code');

exports.authGuard = (context) => {
  if (!context.user) {
    addError(errorMsg.notAuth, 'Not Authorized.', 401);
  }
};
