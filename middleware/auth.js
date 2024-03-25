const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config =  require('../config/config.helper')

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, config.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});


const roles = {
  superadmin: {
    permissions: ['admin', 'agent', 'manager'],
  },
  admin: {
    permissions: ['agent', 'manager'],
  },
  manager: {
    permissions: ['client'],
  },
  agent: {
    permissions: ['client'],
  },
};

exports.authorizeRoles = () => {
  return (req, res, next) => {
    const userRole = req.user.role;
    const { role } = req.body;
    // Check if the user's role is valid
    if (roles[userRole]) {
      // Check if the user's role allows the specified role in the request
      if (!roles[userRole].permissions.includes(role)) {
        return next(new ErrorHander(`${userRole} is not allowed to create a ${role}.`, 403));
      }
    } else {
      // If the user's role is not valid, return an error
      return next(new ErrorHander(`Invalid user role: ${userRole}`, 403));
    }

    next(); // User is authorized, continue to the next middleware
  };
};



