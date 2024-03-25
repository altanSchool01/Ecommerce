const mongoose = require("mongoose");
const user = require('./userModel');
const menu = require('./menuModel');

const menuSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, "User Id is Required"],
        validate: {
            validator: async function (value) {
              return await user.exists({ _id: value });
            },
            message: 'User Does not Exist',
          }
    },
    menuId: [{
        type : mongoose.Schema.ObjectId,
        ref: 'menu',
        required: [true, "Menu Id is Required"],
        validate: {
            validator: async function (value) {
                return menu.exists({ _id: value });
            },
            message: 'Menu Id Doesnot Exist',
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model('MenuAttribute', menuSchema);
