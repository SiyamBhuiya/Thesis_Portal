const mongoose = require('mongoose');
const config = require('./config');
const {
  hashPassword,
  comparePassword,
  createToken,
  verifyToken,
} = require("./utils/auth");



const userSchema = new mongoose.Schema({

    studentName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
studentID: {
  type: String,
  required: [true, 'Student ID is required'],
  unique: true,
  trim: true, // Remove leading and trailing whitespace
  match: [/^[0-9-]+$/, 'Invalid student ID format'] // Allow only numbers and hyphens
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Users', userSchema);