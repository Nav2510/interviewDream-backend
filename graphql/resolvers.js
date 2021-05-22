const {
  getQuestions,
  getQuestion,
  createQuestion,
} = require('./resolvers/question-resolver');
const {
  getPaper,
  getPapers,
  createPaper,
} = require('./resolvers/paper-resolver');
const {
  getCurrentUser,
  login,
  register,
} = require('./resolvers/user-resolver');
const { getTest, createTest } = require('./resolvers/test-resolver');
const { getCourse, createCourse } = require('./resolvers/course-resolver');

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
    createCourse: createCourse,
    createPaper: createPaper,
    createQuestion: createQuestion,
    createTest: createTest,
    login: login,
    register: register,
  },
};
