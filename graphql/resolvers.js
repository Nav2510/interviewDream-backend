const {
  getQuestions,
  getQuestion,
  createQuestion,
} = require('./resolvers/question-resolver');
const {
  getPaper,
  getPapers,
  createPaper,
  selectQuestionsForPaper,
} = require('./resolvers/paper-resolver');
const {
  getCurrentUser,
  login,
  register,
  updateUserProfile,
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
    selectQuestionsForPaper: selectQuestionsForPaper,
    createCourse: createCourse,
    createPaper: createPaper,
    createQuestion: createQuestion,
    createTest: createTest,
    login: login,
    register: register,
    updateUserProfile: updateUserProfile,
  },
};
