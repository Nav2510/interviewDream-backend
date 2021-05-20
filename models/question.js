const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  description: String,
  order: Number,
  marks: Number,
  explanation: String,
  hasExplanation: Boolean,
  difficulty: Number,
  categories: [String],
  type: { type: String, required: true },
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
});

module.exports = mongoose.model('Question', questionSchema);
