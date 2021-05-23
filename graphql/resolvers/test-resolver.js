const errorMsg = require('../../util/contants/error-code');
const addError = require('../../util/add-error');
const Test = require('../../models/test');
const Question = require('../../models/question');

exports.getTest = async function (parent, args, context, info) {
  const fetchedTest = await Test.findById(args.id).populate('questions');
  if (!fetchedTest) {
    addError(errorMsg.testNotExist, 'Test does not exist.', 404);
  }
  const questionCount = fetchedTest.questions.length;
  const copiedTest = JSON.parse(JSON.stringify(fetchedTest));
  copiedTest.numberOfQuestions = questionCount;
  return copiedTest;
};

exports.getTests = async function (parent, args, context, info) {
  const testsCount = await Test.find().countDocuments();
  const fetchedTests = await Test.find();
  if (!fetchedTests) {
    addError(errorMsg.testNotExist, 'Test does not exist.', 404);
  }
  return {
    numberOfTests: testsCount,
    tests: fetchedTests,
  };
};

exports.createTest = async function (parent, args, context, info) {
  // TODO: Validate input for difficulty, categories,numberofQuestions,maxScore, maxTime
  const type = args.testInput.type;
  const title = args.testInput.title;
  const fetchedTest = await Test.findOne({ title, type });
  if (fetchedTest) {
    addError(errorMsg.testExist, 'Test already exist. Please change title.');
  }
  const test = new Test({
    ...args.testInput,
  });

  const createdTest = await test.save();
  return createdTest;
};

exports.selectQuestionsForTest = async function (parent, args, context, info) {
  const questionIds = args.questionIds;
  const testId = args.testId;
  const fetchedTest = await Test.findById(testId);
  if (!fetchedTest) {
    addError(errorMsg.testNotExist, 'Test does not exist.', 404);
  }
  const fetchedQuestionsCount = await Question.find({
    _id: questionIds,
  }).countDocuments();
  if (!fetchedQuestionsCount) {
    addError(errorMsg.qstnNotExist, 'No question found.', 404);
  }

  if (fetchedQuestionsCount < questionIds.length) {
    addError(errorMsg.qstnNotExist, 'Could not found some questions.', 404);
  }
  fetchedTest.questions = questionIds;
  await fetchedTest.save();
  return {
    status: 'OK',
    code: 200,
    msg: 'Questions updated to Test.',
  };
};

exports.deleteTest = async function (parent, args, context, info) {
  const id = args.id;
  const fetchedTest = await Test.findById(id);
  if (!fetchedTest) {
    addError(errorMsg.testNotExist, 'Test does not exist.', 404);
  }
  await Test.findByIdAndDelete(id);
  return {
    status: 'OK',
    code: 200,
    msg: 'Test deleted.',
  };
};
