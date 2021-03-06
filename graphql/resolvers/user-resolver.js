const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const errorMsg = require('../../util/contants/error-code');
const addError = require('../../util/add-error');
const {
  BCRYPT_SALT,
  APPLICATION_SECRET,
  TOKEN_EXPIRES_TIME,
  TOKEN_EXPIRES_TIME_NUMBER,
} = require('../../util/contants/global');
const { authGuard } = require("../../util/auth-guard");

exports.getCurrentUser = async function (parent, args, context, info) {
  authGuard(context);
  const userId = context.user.userId;
  const user = await User.findById(userId);
  if (!user) {
    addError(errorMsg.userNotFound, "User not found", 404);
  }
  return {
    _id: user._id.toString(),
    email: user.email,
    username: user.username,
    fullName: user.basicInfo?.fullName,
    profileImagePath: user.profileImagePath,
    role: user.role,
  };
};

exports.getProfile = async function (parent, args, context, info) {
  authGuard(context);
  const userId = context.user.userId;
  const user = await User.findById(userId);
  if (!user) {
    addError(errorMsg.userNotFound, "User not found", 404);
  }
  return user;
};

exports.setRole = async function (parent, args, context, info) {
  authGuard(context);
  const role = args.role;
  const userId = context.user.userId;
  const user = await User.findById(userId);
  if (!user) {
    addError(errorMsg.userNotFound, "User not found", 404);
  }
  if (user.role) {
    addError(errorMsg.roleExist, "Role already added", 500);
  }
  user.role = role;
  await user.save();
  return {
    status: "OK",
    code: 200,
    msg: "Role added",
  };
};

exports.login = async function (parent, args, context, info) {
  const email = args.loginInput.email;
  const password = args.loginInput.password;
  const user = await User.findOne({ email });
  if (!user) {
    addError(errorMsg.userNotFound, "User does not exists.", 404);
  }
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    addError(errorMsg.passwordIncorrect, "Enter password is incorrect.", 401);
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
  const fullName = args.registerInput.fullName;
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    addError(errorMsg.userExist, "User already exists.");
  }
  const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT);
  const user = new User({
    username,
    password: hashedPassword,
    email,
    basicInfo: {
      fullName,
    },
  });
  const createdUser = await user.save();
  const token = createToken(user);
  return {
    userId: createdUser._id,
    accessToken: token,
    expiresIn: TOKEN_EXPIRES_TIME_NUMBER,
  };
};

exports.fetchUserByNameOrUsername = async function (
  parent,
  args,
  context,
  info
) {
  authGuard(context);
  const fullName = args.name;
  const fullNameRegex = new RegExp(`^${fullName}[a-z ]+`, "gi");
  const users = await User.find({
    "basicInfo.fullName": { $regex: fullNameRegex },
  });
  if (!users) {
    addError(errorMsg.userNotFound, "User not found", 404);
  }
  const returnValue = [];
  users.forEach((user) => {
    returnValue.push({
      _id: user._id,
      email: user.email,
      username: user.username,
      fullName: user.basicInfo?.fullName,
      role: user.role,
    });
  });
  return returnValue;
};

exports.fetchContactRequests = async function (parent, args, context, info) {
  authGuard(context);
  const currentUserId = context.user.userId;
  const currentUser = await User.findById(currentUserId).populate(
    "contactRequests"
  );
  const currentUserRequestList = [...currentUser.contactRequests];
  const requestList = [];
  currentUserRequestList.forEach((user) => {
    requestList.push({
      _id: user._id,
      email: user.email,
      username: user.username,
      fullName: user.basicInfo?.fullName,
      role: user.role,
    });
  });
  return requestList;
};
exports.fetchAddedContacts = async function (parent, args, context, info) {
  authGuard(context);
  const currentUserId = context.user.userId;
  const currentUser = await User.findById(currentUserId).populate("contacts");
  const currenctUserContactList = [...currentUser.contacts];
  const contacts = [];
  currenctUserContactList.forEach((user) => {
    contacts.push({
      _id: user._id,
      email: user.email,
      username: user.username,
      fullName: user.basicInfo?.fullName,
      role: user.role,
      profileImagePath: user.profileImagePath,
    });
  });
  return contacts;
};

exports.requestContact = async function (parent, args, context, info) {
  authGuard(context);
  const requestContactId = args.id;
  const currentUserId = context.user.userId;
  if (requestContactId === currentUserId) {
    addError(
      errorMsg.unknownError,
      "Requested user cannot be logged in user",
      500
    );
  }
  const requestContactUser = await User.findById(requestContactId);
  if (!requestContactUser) {
    addError(errorMsg.userNotFound, "Contact not found", 404);
  }
  const requestContacts = [...requestContactUser.contactRequests];
  const requestAlreadyPresent = requestContacts.find(
    (id) => id.toString() === currentUserId.toString()
  );
  const contactList = [...requestContactUser.contacts];
  const contactAlreadyPresent = contactList.find(
    (id) => id.toString() === currentUserId.toString()
  );
  if (contactAlreadyPresent) {
    addError(errorMsg.userExist, "Already added to contacts", 500);
  }
  if (requestAlreadyPresent) {
    addError(errorMsg.userExist, "Already requested", 500);
  }
  requestContacts.push(currentUserId);
  requestContactUser.contactRequests = requestContacts;
  await requestContactUser.save();
  return {
    status: "OK",
    code: 200,
    msg: "Requested",
  };
};

exports.reponseRequest = async function (parent, args, context, info) {
  authGuard(context);
  const requestedContactId = args.id;
  const response = args.response;

  const currentUserId = context.user.userId;
  let currentUser = await User.findById(currentUserId);
  let currenctUserRequestList = [...currentUser.contactRequests];
  currenctUserRequestList = currenctUserRequestList.filter((requestId) => {
    return requestId.toString() !== requestedContactId.toString();
  });
  currentUser.contactRequests = currenctUserRequestList;

  if (!response) {
    await currentUser.save();
    return {
      status: "OK",
      code: 200,
      msg: "Request rejected.",
    };
  }
  let requestedContactUser = await User.findById(requestedContactId);
  if (!requestedContactUser) {
    addError(errorMsg.userNotFound, "Contact not found", 404);
  }
  const requestedUserContactList = [...requestedContactUser.contacts];
  requestedUserContactList.push(currentUserId);
  requestedContactUser.contacts = requestedUserContactList;
  const currentUserContactList = [...currentUser.contacts];
  const contactAlreadyPresent = currentUserContactList.find(
    (id) => id.toString() === requestedContactId.toString()
  );
  if (contactAlreadyPresent) {
    addError(errorMsg.userExist, "Already added to contacts", 500);
  }
  currentUserContactList.push(requestedContactId);
  currentUser.contacts = currentUserContactList;
  await requestedContactUser.save();
  await currentUser.save();

  return {
    status: "OK",
    code: 200,
    msg: "Approved",
  };
};

exports.updateUserProfile = async function (parent, args, context, info) {
  authGuard(context);
  const userId = context.user.userId;
  const user = await User.findById(userId);
  if (!user) {
    addError(errorMsg.userNotFound, 'User not found', 404);
  }
  if (args.userInput.summary) {
    user['summary'] = args.userInput.summary;
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
  return updatedUser;
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
