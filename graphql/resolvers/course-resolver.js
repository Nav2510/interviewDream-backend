const Course = require('../../models/course');
const Question = require('../../models/question');
const Paper = require('../../models/paper');
const errorMsg = require('../../util/contants/error-code');
const addError = require('../../util/add-error');

exports.getCourse = async function (parent, args, context, info) {
  const fetchedCourse = await Course.findById(args.id)
    .populate('questions')
    .populate('papers');
  if (!fetchedCourse) {
    addError(errorMsg.courseNotExist, 'Course does not exist.', 404);
  }
  return fetchedCourse;
};

exports.getCourses = async function (parent, args, context, info) {
  const coursesCount = await Course.find().countDocuments();
  const fetchedCourses = await Course.find();
  if (!fetchedCourses) {
    addError(errorMsg.courseNotExist, 'Course does not exist.', 404);
  }
  return {
    numberOfCourses: coursesCount,
    courses: fetchedCourses,
  };
};

exports.createCourse = async function (parent, args, context, info) {
  // TODO: Validate input for difficulty, categories,numberofQuestions,maxScore, maxTime
  const title = args.courseInput.title;
  const fetchedCourse = await Course.findOne({ title });
  if (fetchedCourse) {
    addError(
      errorMsg.courseExist,
      'Course already exist. Please change title.'
    );
  }
  const course = new Course({
    ...args.courseInput,
  });

  const createdCourse = await course.save();
  return createdCourse;
};

exports.selectQuestionsForCourse = async function (
  parent,
  args,
  context,
  info
) {
  const questionIds = args.questionIds;
  const courseId = args.courseId;
  const fetchedCourse = await Course.findById(courseId);
  if (!fetchedCourse) {
    addError(errorMsg.courseNotExist, 'Course does not exist.', 404);
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
  fetchedCourse.questions = questionIds;
  await fetchedCourse.save();
  return {
    status: 'OK',
    code: 200,
    msg: 'Questions updated to Course.',
  };
};

exports.selectPapersForCourse = async function (parent, args, context, info) {
  const paperIds = args.paperIds;
  const courseId = args.courseId;
  const fetchedCourse = await Course.findById(courseId);
  if (!fetchedCourse) {
    addError(errorMsg.courseNotExist, 'Course does not exist.', 404);
  }
  const fetchedPaperCount = await Paper.find({
    _id: paperIds,
  }).countDocuments();
  if (!fetchedPaperCount) {
    addError(errorMsg.paperNotExist, 'No paper found.', 404);
  }

  if (fetchedPaperCount < paperIds.length) {
    addError(errorMsg.paperNotExist, 'Could not found some papers.', 404);
  }
  fetchedCourse.papers = paperIds;
  await fetchedCourse.save();
  return {
    status: 'OK',
    code: 200,
    msg: 'Papers updated to Course.',
  };
};
