const mongoose = require("mongoose");

const sectorSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Please Enter Sector Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
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

module.exports = mongoose.model('Sectors', sectorSchema);
