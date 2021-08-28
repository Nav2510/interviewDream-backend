const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const basicInfoSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

const personalInfoSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: 'india',
  },
  dob: {
    type: Date,
    required: true,
  },
});

const educationInfoSchema = new Schema({
  school: String,
  college: String,
  workplace: String,
  workMail: String,
});

const contactInfoSchema = new Schema({
  mobNo: String,
  instagram: String,
  gmail: String,
  website: String,
  github: String,
  linkedin: String,
});

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  currentLocation: String,
  designation: String,
  password: {
    type: String,
    required: true,
  },
  publicProfileUrl: String,
  bgImagePath: {
    type: String,
    default: 'defaultbgImage.jpg',
  },
  profileImagePath: {
    type: String,
    default: 'defaultProfileImage.jpg',
  },
  interviewDreamScore: [
    {
      category: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        default: 0,
      },
    },
  ],
  summary: String,
  basicInfo: basicInfoSchema,
  personalInfo: personalInfoSchema,
  educationInfo: educationInfoSchema,
  contactInfo: contactInfoSchema,
});

module.exports = mongoose.model('User', userSchema);
