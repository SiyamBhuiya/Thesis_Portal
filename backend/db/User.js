const mongoose = require('mongoose');
const config = require('./config');

const userSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^[a-z0-9]+$/, "Username must be lowercase letters and numbers only"]
  },
  studentID: {
    type: String,
    required: [true, "Student ID is required"],
    unique: true,
    trim: true,
    match: [/^[0-9-]+$/, "Invalid student ID format"], // e.g. 211-35-00
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Invalid email format"],
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
