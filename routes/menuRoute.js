const express = require('express');
const { isAuthenticatedUser } = require("../middleware/auth");
const { menuResponsibility, saveuserPrivillage } = require('../controllers/menuController');
const { saveuserPrivillageValidator } = require("../utils/validators")
const router = express.Router();


router.route("/menus").get(isAuthenticatedUser, menuResponsibility);

/**
 * @swagger
 * tags:
 *  name: Menu
 *  description: This is used to manage the Menu
 * /api/v1/menu/saveUserPrivillage:
 *   post:
 *     tags:
 *       - Menu
 *     description: Used to give user menu Privilege
 *     parameters:
 *       - name: SaveUserPrivilege
 *         description: SaveUserPrivilege
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/SaveUserPrivilege'
 *     responses:
 *       200:
 *         description: Successfully created
 *         schema:
 *           $ref: '#/definitions/SaveUserPrivilege200'
 *       400:
 *         description: Validation Error
 *         schema:
 *           $ref: '#/definitions/SaveUserPrivilege400'
 */
router.route("/saveUserPrivillage").post(
    [saveuserPrivillageValidator],
    saveuserPrivillage
)


module.exports = router;