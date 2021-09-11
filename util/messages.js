const CryptoJS = require("crypto-js");

const Message = require("../models/message");
const { MESSAGE_SECRET } = require("../util/contants/global");

const postMessage = async function (roomId, message) {
  const messageContent = message.content;
  const encryptedContent = CryptoJS.AES.encrypt(
    messageContent,
    MESSAGE_SECRET
  ).toString();
  const updatedMessage = {
    ...message,
    content: encryptedContent,
  };
  const room = await Message.findOne({ roomId });
  if (!room) {
    const newRoom = new Message({
      roomId,
      messages: [
        {
          ...updatedMessage,
        },
      ],
    });
    await newRoom.save();
  } else {
    const messages = [...room.messages];

    messages.push(updatedMessage);
    room["messages"] = messages;
    await room.save();
  }
};

exports.messagesUtil = {
  postMessage,
};
