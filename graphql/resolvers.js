const {
  getQuestions,
  getQuestion,
  createQuestion,
  deleteQuestion,
  updateQuestion,
} = require('./resolvers/question-resolver');
const {
  getPaper,
  getPapers,
  deletePaper,
  createPaper,
  getPapersByCourseId,
  selectQuestionsForPaper,
} = require('./resolvers/paper-resolver');
const {
  getCurrentUser,
  getProfile,
  login,
  register,
  updateUserProfile,
} = require('./resolvers/user-resolver');
const {
  getTest,
  getTests,
  createTest,
  deleteTest,
  selectQuestionsForTest,
} = require('./resolvers/test-resolver');
const {
  getCourse,
  getCourses,
  createCourse,
  selectQuestionsForCourse,
  selectPapersForCourse,
} = require('./resolvers/course-resolver');

// Provide resolver functions for your schema fields
module.exports = {
  Query: {
    course: getCourse,
    courses: getCourses,
    me: getCurrentUser,
    question: getQuestion,
    questions: getQuestions,
    paper: getPaper,
    papers: getPapers,
    getPapersByCourseId: getPapersByCourseId,
    test: getTest,
    tests: getTests,
    profile: getProfile,
  },
  Mutation: {
    selectQuestionsForCourse: selectQuestionsForCourse,
    selectQuestionsForPaper: selectQuestionsForPaper,
    selectQuestionsForTest: selectQuestionsForTest,
    selectPapersForCourse: selectPapersForCourse,
    createCourse: createCourse,
    createPaper: createPaper,
    createQuestion: createQuestion,
    updateQuestion: updateQuestion,
    createTest: createTest,
    register: register,
    login: login,
    deleteQuestion: deleteQuestion,
    deletePaper: deletePaper,
    deleteTest: deleteTest,
    updateUserProfile: updateUserProfile,
  },
  ICourse: {
    __resolveType() {
      return null;
    },
  },
  IPaper: {
    __resolveType() {
      return null;
    },
  },
  ITest: {
    __resolveType() {
      return null;
    },
  },
};
