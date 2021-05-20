const { mockQuestion } = require('../mock/mock-data');

exports.getQuestions = function (args, req) {
  return {
    numberOfQuestions: 1,
    questions: [mockQuestion],
  };
};

exports.getQuestion = function (args, req) {
  return mockQuestion;
};
