const question = {
  description: 'description',
  order: 1,
  marks: 100,
  explanation: 'Explanation',
  hasExplanation: true,
  difficulty: 1,
  categories: ['database'],
  type: 'SINGLE_CORRECT',
  options: [
    {
      label: 'label1',
      value: 'value1',
      isAnswer: true,
    },
  ],
};

const paper = {
  title: 'title',
  description: 'description',
  author: 'Nav',
  type: 'SINGLE_CORRECT',
  categories: ['database'],
  rating: 5,
  questions: [question],
};

const test = {
  title: 'title',
  description: 'description',
  author: 'Nav',
  type: 'SINGLE_CORRECT',
  categories: ['database'],
  questions: [question],
  numberOfQuestions: 1,
  maxScore: 100,
  maxTime: '1h',
};

const user = {
  username: 'Nav2510',
  email: 'sing.navdeep2510@gmail.com',
  publicProfileUrl: 'publicprofileurl',
  bgImage: '//somefolderlink/image',
  profileImage: '//somefolderlink/profileImage',
  interviewDreamScore: [
    {
      category: 'Database',
      score: 9,
    },
  ],
  basicInfo: {
    fullName: 'Navdeep Singh',
  },
  personalInfo: {
    gender: 'male',
    country: 'india',
    dob: '25-10-1996',
  },
  educationInfo: {
    school: 'Some dummy school',
    college: 'chitkara university',
    workplace: 'WMSS',
  },
  contactInfo: {
    mobNo: 'xxx-xxx-xxxx',
    skypeId: 'skypeId',
    facebookId: 'facebookId',
    emailId: 'singh.navdeep2510@gmail.com',
    website: 'interviewDream',
    gmailId: 'singh.navdeep2510@gmail.com',
  },
};

const course = {
  title: 'title',
  description: 'dummy description',
  price: 39,
  bgImage: '//somefolderlink/image',
  papers: [paper],
  questions: [question],
  tags: ['best-seller'],
  categories: ['database'],
  rating: 5,
};

exports.mockPaper = paper;
exports.mockQuestion = question;
exports.mockTest = test;
exports.mockUser = user;
exports.mockCourse = course;
