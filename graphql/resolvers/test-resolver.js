const { mockTest } = require('../mock/mock-data');
const errorMsg = require('../../util/contants/error-code');
const addError = require('../../util/add-error');
const Test = require('../../models/test');

exports.getTest = function (args, req) {
  return mockTest;
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
