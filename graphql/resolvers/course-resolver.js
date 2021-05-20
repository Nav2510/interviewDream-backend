const { mockCourse } = require('../mock/mock-data');

exports.getCourse = function (args, req) {
  return mockCourse;
};
