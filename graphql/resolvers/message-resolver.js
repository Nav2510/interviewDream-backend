const CryptoJS = require("crypto-js");

const errorMsg = require("../../util/contants/error-code");
const addError = require("../../util/add-error");
const { authGuard } = require("../../util/auth-guard");
const Message = require("../../models/message");
const { MESSAGE_SECRET } = require("../../util/contants/global");

exports.getUserMessages = async function (parent, args, context, info) {
  authGuard(context);
  const currentUserId = context.user.userId;
  const fromUserId = args.fromUserId;
  const fetchedRoom = await Message.findOne({
    roomId: [fromUserId, currentUserId].sort().join(""),
  });
  if (!fetchedRoom) {
    addError(errorMsg.chatNotExist, "Chat does not exist.", 404);
  }
  const decryptedMessages = [];
  for (let i = 0; i < fetchedRoom.messages.length; i++) {
    const message = fetchedRoom.messages[i];
    const bytes = CryptoJS.AES.decrypt(message.content, MESSAGE_SECRET);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    decryptedMessages.push({
      timestamp: message.timestamp,
      owner: message.owner,
      content: originalText,
    });
  }
  return decryptedMessages;
};
