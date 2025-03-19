const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  teachingLanguage: {
    type: String,
    required: true
  },
  introduction: {
    type: String
  },
  teachingPhilosophy: {
    type: String
  },
  experience: {
    years: {
      type: Number,
      default: 0
    },
    ageGroups: [{
      type: String
    }],
    courseTypes: [{
      type: String
    }]
  },
  teachingStyle: {
    methods: [{
      type: String
    }],
    specialties: [{
      type: String
    }]
  },
  interests: [{
    type: String
  }],
  avatar: {
    type: String
  },
  audioIntroduction: {
    type: String
  },
  teachingVideo: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Teacher', TeacherSchema); 