const { mockQuestion } = require('../mock/mock-data');
const Question = require('../../models/question');
const addError = require('../../util/add-error');
const errorMsg = require('../../util/contants/error-code');

exports.getQuestions = function (args, req) {
  return {
    numberOfQuestions: 1,
    questions: [mockQuestion],
  };
};

exports.getQuestion = function (args, req) {
  return mockQuestion;
};

exports.createQuestion = async function (parent, args, context, info) {
  // TODO: Validate input for difficulty, categories,marks
  const description = args.questionInput.description;
  const type = args.questionInput.type;
  const fetchedQuestion = await Question.findOne({ description, type });
  if (fetchedQuestion) {
    addError(
      errorMsg.qstnExist,
      'Question already exist. Please change description.'
    );
  }
  const question = new Question({
    ...args.questionInput,
  });

  const createdQuestion = await question.save();
  return createdQuestion;
};
