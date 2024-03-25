const express = require('express');
const { isAuthenticatedUser } = require("../middleware/auth");
const { createCategory, getAllCategory, deleteCategory } = require('../controllers/categoryController');
const router = express.Router();

router.route("/category").post(isAuthenticatedUser, createCategory);
router.route("/category").get(isAuthenticatedUser, getAllCategory)
router.route("/category/:id").delete(isAuthenticatedUser, deleteCategory);


module.exports = router;