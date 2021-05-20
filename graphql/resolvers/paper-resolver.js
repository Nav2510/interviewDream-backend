const { mockPaper } = require('../mock/mock-data');

exports.getPaper = function (args, req) {
  return mockPaper;
};

exports.getPapers = function (args, req) {
  return {
    numberOfPapers: 1,
    papers: [mockPaper],
  };
};
