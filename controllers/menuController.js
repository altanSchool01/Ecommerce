const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Menu = require('../models/menuModel')
const User = require('../models/userModel')
const Roles = require('../config/helper');
const menuAttribute = require("../models/menuAttribute");
const { validationResult } = require("express-validator");
const getErrorMessage = require('../utils/mongo.error');

exports.menuResponsibility = catchAsyncErrors(async (req, res, next) => {
    const userRole = req.user.role;
    const UserId = req.query.userId
    let menuList;
    if (userRole === Roles.SUPERADMIN || userRole === Roles.ADMIN) {
        menuList = await Menu.find();
        let menuAttribute = await MenuAttrubite.findById({ userId: UserId })
        menuList = menuList.map(item => {
            const newItem = item.toObject();
            menuAttribute = menuAttribute.find(obj => obj.menuId === newItem._id)
            newItem.isSelected = !!menuAttribute
            return newItem;
        });
        console.log(menuList)
    } else {
        return next(new ErrorHander(`${userRole} can't access this`, 400));
    }
    res.status(200).json({
        status: true,
        menuList
    })

});

exports.saveuserPrivillage = catchAsyncErrors(async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Express Validaton Error",
            errorsMessage: errors.array()
        })
    }

    await menuAttribute.create(req.body).then(()=>{
        return res.status(200).json({
            status: true,
            message: "saved successfully!!!"
        })
    }).catch((err)=>{
        const msg = getErrorMessage(err);
        return res.status(400).json({
            message: "MongoDB Validation Failed",
            errorMessage: msg
        });
    });
})


