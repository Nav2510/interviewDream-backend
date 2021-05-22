const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    default: 0,
  },
  bgImage: {
    type: String,
    require: true,
  },
  papers: [{ type: Schema.Types.ObjectId, ref: 'Paper' }],
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  tags: [String],
  categories: [String],
  rating: Number,
});

module.exports = mongoose.model('Course', courseSchema);
