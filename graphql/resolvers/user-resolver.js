const { mockUser } = require('../mock/mock-data');

exports.getCurrentUser = function (args, req) {
  return mockUser;
};
