const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  resetPassword,
  getUserDetails,
  updatePassword,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  assignUserRole,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { registerValidator } = require("../utils/validators")

const router = express.Router();

router.route("/register").post([registerValidator],isAuthenticatedUser,authorizeRoles(), registerUser);

router.route("/login").post(loginUser);

router.route('/getAllUsers').get(isAuthenticatedUser, getAllUsers)

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

// router
//   .route("/admin/users")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
