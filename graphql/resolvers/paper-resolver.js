const Paper = require('../../models/paper');
const Question = require('../../models/question');
const errorMsg = require('../../util/contants/error-code');
const addError = require('../../util/add-error');
const { authGuard } = require('../../util/auth-guard');

exports.getPaper = async function (parent, args, context, info) {
  authGuard(context);
  const fetchedPaper = await Paper.findById(args.id).populate('questions');
  if (!fetchedPaper) {
    addError(errorMsg.pprNotExist, 'Paper does not exist.', 404);
  }
  return fetchedPaper;
};

exports.getPapers = async function (parent, args, context, info) {
  authGuard(context);
  const fetchedPaperCount = await Paper.find().countDocuments();
  const fetchedPaper = await Paper.find();
  return {
    numberOfPapers: fetchedPaperCount,
    papers: [...fetchedPaper],
  };
};

exports.createPaper = async function (parent, args, context, info) {
  authGuard(context);
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

exports.selectQuestionsForPaper = async function (parent, args, context, info) {
  authGuard(context);
  const questionIds = args.questionIds;
  const paperId = args.paperId;
  const fetchedPaper = await Paper.findById(paperId);
  if (!fetchedPaper) {
    addError(errorMsg.pprNotExist, 'Paper does not exist.', 404);
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
  fetchedPaper.questions = questionIds;
  await fetchedPaper.save();
  return {
    status: 'OK',
    code: 200,
    msg: 'Questions updated to Paper.',
  };
};

exports.deletePaper = async function (parent, args, context, info) {
  authGuard(context);
  const id = args.id;
  const fetchedPaper = await Paper.findById(id);
  if (!fetchedPaper) {
    addError(errorMsg.pprNotExist, 'Paper does not exist.', 404);
  }
  await Paper.findByIdAndDelete(id);
  return {
    status: 'OK',
    code: 200,
    msg: 'Paper deleted.',
  };
};
