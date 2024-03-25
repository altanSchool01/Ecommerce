const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Please Enter  Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    filePath: {
        type: String,
        required: [true, "Please Enter file"],
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

module.exports = mongoose.model('Forms', formSchema);
