const { mockPaper } = require('../mock/mock-data');
const Paper = require('../../models/paper');
const errorMsg = require('../../util/contants/error-code');
const addError = require('../../util/add-error');

exports.getPaper = function (args, req) {
  return mockPaper;
};

exports.getPapers = function (args, req) {
  return {
    numberOfPapers: 1,
    papers: [mockPaper],
  };
};

exports.createPaper = async function (parent, args, context, info) {
  // TODO: Validate input for difficulty, categories,marks
  const title = args.paperInput.title;
  const type = args.paperInput.type;
  const fetchedPaper = await Paper.findOne({ title, type });
  if (fetchedPaper) {
    addError(errorMsg.pprExist, 'Paper already exist. Please change title.');
  }
  const paper = new Paper({
    ...args.paperInput,
  });

  const createdPaper = await paper.save();
  return createdPaper;
};
