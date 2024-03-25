const express = require('express');
const { isAuthenticatedUser } = require("../middleware/auth");
const { upload } = require("../middleware/upload");
const { creteQuestion,getQuestionByCateId} = require("../controllers/questionnaire");
const router = express.Router();


router.route("/questionnaire").post(isAuthenticatedUser, creteQuestion);
router.route("/questionnaire").get(isAuthenticatedUser,getQuestionByCateId );


module.exports = router;