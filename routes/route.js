const express = require('express');
const router = express.Router();
// Route Imports
const user = require("./userRoute");
const sector = require("./sectorRoute");
const category = require("./categoryRoute");
const form = require("./formRoute");
const arid = require("./aridRoute");
const questionnaire = require("./questionnaire")
const menu = require('./menuRoute')

router.use("/user", user);
router.use("", sector);
router.use("", category);
router.use("", form);
router.use("", arid);
router.use("", questionnaire);
router.use("/menu", menu);

module.exports = router