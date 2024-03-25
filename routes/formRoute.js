const express = require('express');
const { isAuthenticatedUser } = require("../middleware/auth");
const { upload } = require("../middleware/upload");
const { uploadForm, getAllForm, deleteForm } = require("../controllers/formController");
const router = express.Router();



router.route("/form").post(isAuthenticatedUser, upload.single('filePath'), uploadForm);
router.route("/form").get(isAuthenticatedUser, getAllForm);
router.route("/form/:id").delete(isAuthenticatedUser, deleteForm);


module.exports = router;