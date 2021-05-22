// const { buildSchema } = require('graphql');
const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
module.exports = gql`
  # =======================Enums====================
  enum QuestionPaperTypeEnum {
    MULTIPLE_CORRECT
    SINGLE_CORRECT
  }

  # =======================Input====================
  input CourseInputData {
    bgImage: String!
    categories: [String!]!
    description: String
    papers: [PaperInputData!]
    price: Int
    questions: [QuestionInputData!]
    rating: Int
    tags: [String!]
    title: String!
  }

  input LoginInputData {
    email: String!
    password: String!
  }

  input OptionInputData {
    label: String!
    value: String!
    isAnswer: Boolean
  }

  input PaperInputData {
    author: String
    categories: [String!]!
    description: String
    difficulty: Float!
    questions: [QuestionInputData!]
    rating: Int
    title: String!
    type: QuestionPaperTypeEnum!
  }

  input QuestionInputData {
    categories: [String!]!
    description: String
    difficulty: Float!
    explanation: String
    hasExplanation: Boolean!
    marks: Int
    options: [OptionInputData!]
    order: Int
    type: QuestionPaperTypeEnum!
  }

  input RegisterInputData {
    email: String!
    password: String!
    username: String!
  }

  input TestInputData {
    author: String
    categories: [String!]!
    description: String
    maxScore: Int!
    maxTime: Int!
    numberOfQuestions: Int
    questions: [QuestionInputData!]
    title: String!
    type: QuestionPaperTypeEnum!
  }

  # =======================Interface================

  # =======================Types====================
  # TODO: Verify type with mongoose schema for all types

  type AuthenticationData {
    accessToken: String!
    expiresIn: Int!
    userId: String!
  }

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
    bgImage: String!
    categories: [String!]!
    description: String
    papers: [Paper!]
    price: Int
    questions: [Question!]
    rating: Int
    tags: [String!]
    title: String!
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
    description: String!
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
    author: String
    categories: [String!]!
    description: String
    maxScore: Int!
    maxTime: Int!
    numberOfQuestions: Int!
    questions: [Question!]
    title: String!
    type: QuestionPaperTypeEnum!
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

  # ====================Root Query=============
  type Query {
    course: Course!
    me: User!
    question: Question!
    questions: QuestionData!
    paper: Paper!
    papers: PaperData!
    test: Test!
  }

  # ====================Root Mutation==========
  type Mutation {
    createCourse(courseInput: CourseInputData!): Course!
    createPaper(paperInput: PaperInputData!): Paper!
    createQuestion(questionInput: QuestionInputData!): Question!
    createTest(testInput: TestInputData!): Test!
    login(loginInput: LoginInputData!): AuthenticationData!
    register(registerInput: RegisterInputData!): AuthenticationData!
  }
`;
