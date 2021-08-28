// const { buildSchema } = require('graphql');
const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
module.exports = gql`
  # =======================Enums====================
  enum QuestionPaperTypeEnum {
    MULTIPLE_CORRECT
    SINGLE_CORRECT
  }

  enum GenderEnum {
    MALE
    FEMALE
    OTHER
  }

  enum CourseTagEnum {
    BEST_SELLER
    TOP_RATED
    POPULAR
    HOT
    NEW
  }

  enum CourseCategoryEnum {
    JAVA
    ALGORITHM
    NODE
    BACKEND
    LANGUAGE
    WEB
    HTML
    GRQPHQL
    JAVASCRIPT
    SORT
  }

  # =======================Input====================
  input BasicInfoInputData {
    fullName: String
    email: String
    username: String
    gender: GenderEnum
  }

  input ContactInfoInputData {
    mobNo: String
    instagram: String
    gmail: String
    github: String
    website: String
    linkeding: String
  }

  input CourseInputData {
    bgImagePath: String!
    categories: [CourseCategoryEnum!]!
    description: String
    papers: [PaperInputData!]
    price: Int
    questions: [QuestionInputData!]
    rating: Int
    tags: [CourseTagEnum!]
    title: String!
  }

  input EducationInfoInputData {
    school: String
    college: String
    workplace: String
    workMail: String
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

  input PersonalInfoInputData {
    gender: String!
    country: String
    dob: String
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

  input UserInputData {
    email: String
    username: String
    currentLocation: String
    designation: String
    password: String
    summary: String
    basicInfo: BasicInfoInputData
    contactInfo: ContactInfoInputData
    educationInfo: EducationInfoInputData
    personalInfo: PersonalInfoInputData
  }

  # =======================Interface================
  interface ICourse {
    _id: ID!
    bgImagePath: String!
    categories: [CourseCategoryEnum!]!
    description: String
    price: Int
    rating: Int
    tags: [CourseTagEnum!]
    title: String!
    author: String!
  }

  interface IPaper {
    _id: ID!
    author: String
    categories: [String!]!
    description: String
    difficulty: Int
    rating: Int
    title: String!
    type: QuestionPaperTypeEnum!
  }

  interface ITest {
    _id: ID!
    author: String
    categories: [String!]!
    description: String
    maxScore: Int!
    maxTime: Int!
    title: String!
    type: QuestionPaperTypeEnum!
  }

  # =======================Types====================
  # TODO: Verify type with mongoose schema for all types

  type AuthenticationData {
    accessToken: String!
    expiresIn: Int!
    userId: String!
  }

  type BasicInfo {
    fullName: String!
    email: String!
    username: String!
    gender: GenderEnum!
  }

  type ContactInfo {
    instagram: String
    gmail: String
    github: String
    mobNo: String
    website: String
    linkedin: String
  }

  type Course implements ICourse {
    _id: ID!
    bgImagePath: String!
    categories: [CourseCategoryEnum!]!
    description: String
    papers: [Papers!]
    price: Int
    questions: [Question!]
    rating: Int
    tags: [CourseTagEnum!]
    title: String!
    author: String!
  }

  type Courses {
    _id: ID!
    bgImagePath: String!
    categories: [CourseCategoryEnum!]!
    description: String
    price: Int
    rating: Int
    tags: [String!]
    title: String!
    author: String!
  }

  type CourseData {
    numberOfCourses: Int!
    courses: [Courses!]!
  }

  type EducationInfo {
    college: String
    school: String
    workplace: String
    workMail: String
  }

  type NormalResponse {
    status: String!
    code: Int!
    msg: String!
  }

  type Option {
    isAnswer: Boolean!
    label: String!
    value: String!
  }

  type Paper implements IPaper {
    _id: ID!
    author: String
    categories: [String!]!
    description: String
    difficulty: Int
    rating: Int
    title: String!
    type: QuestionPaperTypeEnum!
    questions: [Question!]
  }

  type Papers implements IPaper {
    _id: ID!
    author: String
    categories: [String!]!
    description: String
    difficulty: Int
    rating: Int
    title: String!
    type: QuestionPaperTypeEnum!
  }

  type PaperData {
    numberOfPapers: Int!
    papers: [Papers!]!
  }

  type PersonalInfo {
    country: String!
    dob: String!
    address: String!
  }

  type Question {
    _id: ID!
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

  type Test implements ITest {
    _id: ID!
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

  type Tests implements ITest {
    _id: ID!
    author: String
    categories: [String!]!
    description: String
    maxScore: Int!
    maxTime: Int!
    title: String!
    type: QuestionPaperTypeEnum!
  }

  type TestData {
    numberOfTests: Int!
    tests: [Tests!]!
  }

  type User {
    _id: ID!
    email: String!
    username: String!
  }

  type Profile {
    _id: ID!
    email: String!
    username: String!
    designation: String
    currentLocation: String
    basicInfo: BasicInfo
    bgImagePath: String!
    contactInfo: ContactInfo
    educationInfo: EducationInfo
    interviewDreamScore: [Score!]
    personalInfo: PersonalInfo
    profileImagePath: String!
    publicProfileUrl: String
    summary: String
  }

  # ====================Root Query=============
  type Query {
    course(id: ID!): Course!
    courses: CourseData!
    me: User!
    paper(id: ID!): Paper!
    papers: PaperData!
    getPapersByCourseId(courseId: ID!): PaperData!
    profile: Profile!
    question(id: ID!): Question!
    questions: QuestionData!
    test(id: ID!): Test!
    tests: TestData!
  }

  # ====================Root Mutation==========
  type Mutation {
    createCourse(courseInput: CourseInputData!): Course!
    createPaper(paperInput: PaperInputData!): Paper!
    createQuestion(questionInput: QuestionInputData!): Question!
    createTest(testInput: TestInputData!): Test!
    deleteQuestion(id: ID!): NormalResponse!
    deletePaper(id: ID!): NormalResponse!
    deleteTest(id: ID!): NormalResponse!
    login(loginInput: LoginInputData!): AuthenticationData!
    register(registerInput: RegisterInputData!): AuthenticationData!
    selectQuestionsForCourse(courseId: ID!, questionIds: [ID]!): NormalResponse!
    selectQuestionsForPaper(paperId: ID!, questionIds: [ID]!): NormalResponse!
    selectQuestionsForTest(testId: ID!, questionIds: [ID]!): NormalResponse!
    selectPapersForCourse(courseId: ID!, paperIds: [ID]!): NormalResponse!
    updateQuestion(id: ID!, questionInput: QuestionInputData!): Question!
    updateUserProfile(userInput: UserInputData!): Profile!
  }
`;
