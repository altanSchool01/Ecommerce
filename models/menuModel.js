const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    menu: {
        type: String,
    },
    link: {
        type: String,
    },
    icon: {
        type: String,
    },
    parentId: {
        type: mongoose.Schema.ObjectId,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    isSelected: {
        type: Boolean
    }
});

module.exports = mongoose.model('Menu', menuSchema);
