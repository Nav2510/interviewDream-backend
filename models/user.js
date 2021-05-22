const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const basicInfoSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
});

const personalInfoSchema = new Schema({
  gender: {
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
});

const contactInfoSchema = new Schema({
  mobNo: String,
  skypeId: String,
  facebookId: String,
  gmailId: String,
  website: String,
  email: String,
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
  password: {
    type: String,
    required: true,
  },
  publicProfileUrl: String,
  bgImage: {
    type: String,
    default: 'defaultbgImage.jpg',
  },
  profileImage: {
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
  basicInfo: basicInfoSchema,
  personalInfo: personalInfoSchema,
  educationInfo: educationInfoSchema,
  contactInfo: contactInfoSchema,
});

module.exports = mongoose.model('User', userSchema);
