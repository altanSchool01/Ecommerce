const { body, param } = require("express-validator");

module.exports.saveuserPrivillageValidator = [
    body("userId").notEmpty().withMessage("User Id is Required"),
    body("userId").isMongoId().withMessage("Invalid UserId must be a valid ObjectId"),
    body("menuId").isArray({ min: 1 }).withMessage("MenuId Must be an array and must contain atleast one item"),
    body("menuId.*").isMongoId().withMessage("Invalid MenuId must be a valid ObjectId")
]

module.exports.registerValidator = [
    // body("name").notEmpty().withMessage("Name is required"),
    body("sector").notEmpty().withMessage("Sector Name is Required")
]