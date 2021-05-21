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
  input RegisterInputData {
    username: String!
    password: String!
    email: String!
  }

  # =======================Interface================

  # =======================Types====================
  # TODO: Verify type with mongoose schema for all types

  type AuthenticationData {
    userId: String!
    accessToken: String!
    expiresIn: Int!
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
    login: AuthenticationData!
    register(registerInput: RegisterInputData!): AuthenticationData!
  }
`;
