const { getQuestions, getQuestion } = require('./resolvers/question-resolver');
const { getPaper, getPapers } = require('./resolvers/paper-resolver');
const {
  getCurrentUser,
  login,
  register,
} = require('./resolvers/user-resolver');
const { getTest } = require('./resolvers/test-resolver');
const { getCourse } = require('./resolvers/course-resolver');

// Provide resolver functions for your schema fields
module.exports = {
  Query: {
    course: getCourse,
    me: getCurrentUser,
    question: getQuestion,
    questions: getQuestions,
    paper: getPaper,
    papers: getPapers,
    test: getTest,
  },
  Mutation: {
    login: login,
    register: register,
  },
};
