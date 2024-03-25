const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const Sector = require("../models/sectorModel");
const Roles = require('../config/helper');
const sendToken = require("../utils/jwtToken");
const {validationResult} = require('express-validator');
const crypto = require("crypto");

// Register and update a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const errors = validationResult(req)
  if(Roles.SUPERADMIN == req.user.role){
    if (!errors.isEmpty()) {
      return res.status(400).json({
          message: "Express Validaton Error",
          errorsMessage: errors.array()
      })
  }
  }
  // Agent Save Client and Save 
  else if(Roles.AGENT == req.user.role){
    // user  =  await 
  }
  req.body.parentid = req.user.id
  let user;
  const { id, name, email, password, role, phone, sector, parentid } = req.body;
  if (typeof id !== 'undefined' && id !== null && id.length > 0) {
    user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: true
    })
  }
  else {
    user = await User.create({
      name,
      email,
      password,
      parentid,
      role,
      phone,
      sector,
    });
  }
  res.status(200).json({
    status: true,
    user
  })
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  // checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// get All User
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const { role, id } = req.user;
  let users;
  if (role === 'superadmin') {
    // If the user is a superadmin, find all users except superadmins
    users = await User.find({ role: { $ne: 'superadmin' } });
  } else {
    // If the user is not a superadmin, find users by their parentid (using their id field)
    users = await User.find({ parentid: id });
  }

  const sectorListing = await Sector.find();

  if (users && sectorListing) {
    users = users.map((user) => {
      const sector = sectorListing.find((sector) => sector.id === user.sector);
      if (sector) {
        // Update the user's sector field with the sector's name
        user.sector = sector.name;
      }
      return user; // Return the modified user object
    });
  }

  res.status(200).json({
    status: true,
    users,
  });
});

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});


