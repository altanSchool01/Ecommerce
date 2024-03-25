const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Category = require('../models/categoryModel')

// create Category
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
    const { name, id, sector, type } = req.body
    console.log(req.body)
    let category;
    // if (!name || typeof name !== 'string') {
    //     return next(new ErrorHander('Invalid or missing Category name', 400));
    // }
    if (typeof id !== 'undefined' && id !== null && id.length > 0) {
        category = await Category.findByIdAndUpdate(id, { name, sector ,type}, {
            new: true,
            runValidators: true,
            useFindAndModify: true
        })
    } else {
        category = await Category.create( req.body )
    }
    res.status(200).json({
        status: true,
        category
    });
});

// get all Category
exports.getAllCategory = catchAsyncErrors(async (req, res, next) => {
     const type = req.body.type
     if (!type) {
        return next(new ErrorHander('Please give type of Category', 400));
    }
    const category = await Category.find({type:type});
    res.status(200).json({
        success: true,
        category,
    });
});


// delete Category
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(new ErrorHander(`Category does not exist with Id: ${req.params.id}`, 400))
    }
    await category.remove();
    res.status(200).json({
        success: true,
        message: "category Deleted Successfully",
    });
});