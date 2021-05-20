const { getQuestions, getQuestion } = require('./resolvers/question-resolver');
const { getPaper, getPapers } = require('./resolvers/paper-resolver');
const { getCurrentUser } = require('./resolvers/user-resolver');
const { getTest } = require('./resolvers/test-resolver');
const { getCourse } = require('./resolvers/course-resolver');

module.exports = {
  course: getCourse,
  me: getCurrentUser,
  question: getQuestion,
  questions: getQuestions,
  paper: getPaper,
  papers: getPapers,
  test: getTest,
};