const mongoose = require('mongoose');

const aridSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    passport: {
        type: String,
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

module.exports = mongoose.model('Arid', aridSchema);