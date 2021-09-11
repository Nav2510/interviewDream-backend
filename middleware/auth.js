const jwt = require('jsonwebtoken');
const { APPLICATION_SECRET } = require('../util/contants/global');

const authorizeUser = (req) => {
  // TODO: Set roles instead of email in authorization token
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return;
  }
  const token = authHeader.split(' ')[1]; //Extracting token from 'Bearer token'
  return validateToken(token);
};

const validateToken = (token) => {
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, APPLICATION_SECRET);
  } catch (error) {
    return;
  }
  if (!decodedToken) {
    return;
  }
  const { userId, email } = decodedToken;
  return { userId, email };
};

exports.auth = {
  authorizeUser,
  validateToken,
};
