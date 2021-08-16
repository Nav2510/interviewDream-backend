const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  categories: [String],
  description: String,
  difficulty: {
    type: Number,
    require: true,
  },
  explanation: String,
  hasExplanation: Boolean,
  marks: {
    type: Number,
    default: 0,
  },
  options: [
    {
      label: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
      isAnswer: {
        type: Boolean,
        default: false,
      },
    },
  ],
  order: Number,
  type: { type: String, required: true },
});

module.exports = mongoose.model('Question', questionSchema);
