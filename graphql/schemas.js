const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  # ======================Enums=====================
  enum QuestionPaperTypeEnum {
    MULTIPLE_CORRECT
    SINGLE_CORRECT
  }

  # =======================Interface================

  # =======================Types====================
  # TODO: Verify type with mongoose schema for all types

  type BasicInfo {
    email: String!
    fullName: String!
    username: String!
  }

  type ContactInfo {
    email: String
    facebookId: String
    gmailId: String
    mobNo: String
    skypeId: String
    website: String
  }

  type Course {
    title: String!
    description: String
    price: Int!
    bgImage: String!
    papers: [Paper!]
    questions: [Question!]
    tags: [String!]
    categories: [String!]
    rating: Int!
  }

  type EducationInfo {
    college: String
    school: String
    workplace: String
  }


  type Option {
    isAnswer: Boolean!
    label: String!
    value: String!
  }

  type Paper {
    author: String
    categories: [String!]!
    description: String
    difficulty: Int
    questions: [Question!]
    rating: Int
    title: String!
    type: QuestionPaperTypeEnum!
  }

  type PaperData {
    numberOfPapers: Int!
    papers: [Paper!]!
  }

  type PersonalInfo {
    country: String!
    dob: String!
    gender: String!
  }

  type Question {
    categories: [String!]!
    description: String
    difficulty: Int!
    explanation: String
    hasExplanation: Boolean!
    marks: Int
    options: [Option!]!
    order: Int
    type: QuestionPaperTypeEnum!
  }

  type QuestionData {
    numberOfQuestions: Int!
    questions: [Question!]!
  }

  type Score {
    category: String!
    score: Int!
  }

  type Test {
    title: String!
    description: String
    author: String
    type: QuestionPaperTypeEnum!
    categories: [String!]!
    questions: [Question!]!
    numberOfQuestions: Int!
    maxScore: Int!
    maxTime: String!
  }

  type User {
    basicInfo: BasicInfo
    bgImage: String!
    contactInfo: ContactInfo
    educationInfo: EducationInfo
    email: String!
    interviewDreamScore: [Score!]!
    personalInfo: PersonalInfo
    profileImage: String!
    publicProfileUrl: String
    username: String!
  }

  # ====================Root Mutation==========
  # ====================Root Query=============
  type RootQuery {
    course: Course!
    me: User!
    question: Question!
    questions: QuestionData!
    paper: Paper!
    papers: PaperData!
    test: Test!
  }

  # ======================Schema=================
  schema {
    query: RootQuery
  }
`);
