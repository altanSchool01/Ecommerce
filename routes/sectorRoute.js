const express = require('express');
const { createSector, getAllSector, deleteSector } = require('../controllers/sectorController');
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/sector").post(isAuthenticatedUser, createSector);
router.route("/sector").get(isAuthenticatedUser, getAllSector)
router.route("/sector/:id").delete(isAuthenticatedUser, deleteSector);


module.exports = router;