const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { mockUser } = require('../mock/mock-data');
const User = require('../../models/user');
const errorMsg = require('../../util/contants/error-code');
const addError = require('../../util/add-error');
const {
  BCRYPT_SALT,
  APPLICATION_SECRET,
  TOKEN_EXPIRES_TIME,
  TOKEN_EXPIRES_TIME_NUMBER,
} = require('../../util/contants/global');

exports.getCurrentUser = function (args, req) {
  return mockUser;
};

exports.login = function (args, req) {
  console.log(args);
};

exports.register = async function (parent, args, context, info) {
  const username = args.registerInput.username;
  const password = args.registerInput.password;
  const email = args.registerInput.email;
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    addError(errorMsg.userExist, 'User already exists.');
  }
  const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT);
  const user = new User({
    username,
    password: hashedPassword,
    email,
  });
  const createdUser = await user.save();
  const token = jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
    },
    APPLICATION_SECRET,
    { expiresIn: TOKEN_EXPIRES_TIME }
  );
  return {
    userId: createdUser._id,
    accessToken: token,
    expiresIn: TOKEN_EXPIRES_TIME_NUMBER,
  };
};
