const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  description: String,
  order: Number,
  marks: Number,
  explanation: String,
  hasExplanation: Boolean,
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
  difficulty: Number,
  categories: [String],
});

module.exports = mongoose.model('Question', questionSchema);
