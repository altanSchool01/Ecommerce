const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    questions: {
        type: [],
        required: [true, "Please Add Form"],
    },
    categoryId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please Enter  CategoryId"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Questions', QuestionSchema);
