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

exports.login = async function (parent, args, context, info) {
  const email = args.loginInput.email;
  const password = args.loginInput.password;
  const user = await User.findOne({ email });
  if (!user) {
    addError(errorMsg.userNotFound, 'User does not exists.', 404);
  }
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    addError(errorMsg.passwordIncorrect, 'Enter password is incorrect.', 401);
  }
  const token = createToken(user);
  return {
    accessToken: token,
    expiresIn: TOKEN_EXPIRES_TIME_NUMBER,
    userId: user._id,
  };
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
  const token = createToken(user);
  return {
    userId: createdUser._id,
    accessToken: token,
    expiresIn: TOKEN_EXPIRES_TIME_NUMBER,
  };
};

exports.updateUserProfile = async function (parent, args, context, info) {
  // TODO: Find user by logged in id instead of hardcoded
  const user = await User.findById('60a932ba131fcc35685d4833');
  if (!user) {
    addError(errorMsg.userNotFound, 'User not found', 404);
  }
  if (args.userInput.basicInfo) {
    user['basicInfo'] = args.userInput.basicInfo;
  }
  if (args.userInput.contactInfo) {
    user['contactInfo'] = args.userInput.contactInfo;
  }
  if (args.userInput.educationInfo) {
    user['educationInfo'] = args.userInput.educationInfo;
  }
  if (args.userInput.personalInfo) {
    user['personalInfo'] = {
      ...args.userInput.personalInfo,
      dob: new Date(args.userInput.personalInfo.dob),
    };
  }
  const updatedUser = await user.save();
  // TODO: Try using below code
  //  return { ...createdUser._doc, _id: createdUser._id.toString() };
  return {
    ...updatedUser,
    bgImage: updatedUser.bgImage,
    profileImage: updatedUser.profileImage,
    basicInfo: updatedUser.basicInfo,
    contactInfo: updatedUser.contactInfo,
    educationInfo: updatedUser.educationInfo,
    personalInfo: {
      ...updatedUser.personalInfo,
      country: updatedUser.personalInfo.country,
      gender: updatedUser.personalInfo.gender,
      dob: updatedUser.personalInfo.dob.toString(),
    },
  };
};

function createToken(user) {
  return jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
    },
    APPLICATION_SECRET,
    { expiresIn: TOKEN_EXPIRES_TIME }
  );
}
