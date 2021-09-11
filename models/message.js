const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  roomId: {
    type: String,
    required: true,
  },
  messages: [
    {
      content: {
        type: String,
        required: true,
      },
      timestamp: {
        type: String,
        required: true,
      },
      owner: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Message", messageSchema);
