const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paperSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  difficulty: Number,
  author: String,
  type: {
    type: String,
    required: true,
  },
  categories: [string],
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  rating: Number,
});

module.exports = mongoose.model('Paper', paperSchema);
