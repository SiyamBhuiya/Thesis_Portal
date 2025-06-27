const mongoose = require('mongoose');
const config = require('./config');

const submissionSchema = new mongoose.Schema({
  studentID: {
    type: String,
    required: [true, "Student ID is required"],
    trim: true,
    match: [/^[0-9-]+$/, "Invalid student ID format"], // e.g. 211-35-00
  },
    thesisTitle: {
        type: String,
        required: [true, "Thesis title is required"],
        trim: true,
    },
    thesisAbstract: {
        type: String,
        required: [true, "Thesis abstract is required"],
        trim: true,
    },
    thesisFile: {
        type: String,
        required: [true, "Thesis file is required"],
        trim: true,
    },
    submissionDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    feedback: {
        type: String,
        default: '',
    },
    reviewer: {
        type: String,
        default: '',
    },
    reviewerComments: {
        type: String,
        default: '',
    },
    reviewerFeedback: {
        type: String,
        default: '',
    },
    reviewerRating: {
        type: Number,
        min: 1,
        max: 5,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
    versionKey: false,
});
module.exports = mongoose.model('Submissions', submissionSchema);