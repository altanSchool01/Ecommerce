const express = require('express');
const { isAuthenticatedUser } = require("../middleware/auth");
const { fileLoad, getAridList, upateArid } = require('../controllers/aridController');
const { upload } = require("../middleware/upload");
const router = express.Router();

router.route("/convert").post(isAuthenticatedUser, upload.single('filePath'), fileLoad);
router.route("/arid").get(isAuthenticatedUser, getAridList);
router.route("/arid/:id").put(isAuthenticatedUser, upateArid);

module.exports = router;