const path = require("path");
const fs = require("fs");

const { auth } = require("../middleware/auth");
const User = require("../models/user");
const errorMsg = require("../util/contants/error-code");

exports.uploadProfileImage = async (req, res, next) => {
  const extractedToken = auth.authorizeUser(req);
  if (!req.file) {
    return res.status(200).json({ message: "No file provided" });
  }

  if (!extractedToken) {
    clearImage(req.file.path);
    return res
      .status(401)
      .json({ msgCode: errorMsg.notAuth, message: "Not Authorized." });
  }
  const currentUser = await User.findById(extractedToken.userId);
  if (currentUser.profileImagePath) {
    clearImage(currentUser.profileImagePath);
  }
  currentUser.profileImagePath = req.file.path;
  await currentUser.save();

  return res
    .status(201)
    .json({ message: "File uploaded.", filePath: req.file.path });
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.stat(filePath, (error, stat) => {
    if (error) {
      console.log("Error occured while fetching file: ", filePath);
    } else {
      fs.unlink(filePath, (error) => {
        if (error) {
          console.log("Error while unlinking fs:", error);
        } else {
          console.log("File deleted: ", filePath);
        }
      });
    }
  });
};
