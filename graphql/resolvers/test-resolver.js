const { mockTest } = require('../mock/mock-data');

exports.getTest = function (args, req) {
  return mockTest;
};
