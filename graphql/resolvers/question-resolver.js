const Question = require('../../models/question');
const addError = require('../../util/add-error');
const errorMsg = require('../../util/contants/error-code');

exports.getQuestions = async function (parent, args, context, info) {
  const questionCounts = await Question.find().countDocuments();
  const questions = await Question.find();
  if (!questions) {
    addError(errorMsg.qstnNotExist, 'Questions not found', 404);
  }
  return {
    numberOfQuestions: questionCounts,
    questions: questions,
  };
};

exports.getQuestion = async function (parent, args, context, info) {
  const question = await Question.findById(args.id);
  if (!question) {
    addError(errorMsg.qstnNotExist, 'Question not found', 404);
  }
  return question;
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

exports.updateQuestion = async function (parent, args, context, info) {
  // TODO: Validate input for difficulty, categories,marks
  const id = args.id;
  const fetchedQuestion = await Question.findById(id);
  if (!fetchedQuestion) {
    addError(errorMsg.qstnNotExist, 'Question does not exist.');
  }
  const updatedQuestion = await Question.findOneAndUpdate(
    { _id: id },
    args.questionInput,
    { useFindAndModify: true }
  );
  return updatedQuestion;
};

exports.deleteQuestion = async function (parent, args, context, info) {
  // TODO: Validate input for difficulty, categories,marks
  const id = args.id;
  const fetchedQuestion = await Question.findById(id);
  if (!fetchedQuestion) {
    addError(errorMsg.qstnNotExist, 'Question does not exist.');
  }
  await Question.findByIdAndDelete(id);
  return {
    status: 'OK',
    code: 200,
    msg: 'Question deleted.',
  };
};
