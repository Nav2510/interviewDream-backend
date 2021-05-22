const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  difficulty: Number,
  author: String,
  type: String,
  categories: [String],
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  numberOfQuestions: {
    type: Number,
    default: 0,
  },
  maxScore: {
    type: Number,
    required: true,
  },
  maxTime: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Test', testSchema);
