const { mockCourse } = require('../mock/mock-data');
const Course = require('../../models/course');
const errorMsg = require('../../util/contants/error-code');
const addError = require('../../util/add-error');

exports.getCourse = function (args, req) {
  return mockCourse;
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
