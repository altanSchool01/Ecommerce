const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Form = require('../models/formModel');
// get all sectors
exports.uploadForm = catchAsyncErrors(async (req, res, next) => {
    const { name } = req.body;
    const filePath = req.file.path;
    console.log(name, filePath);
    const form = await Form.create({ name, filePath }); // Provide fields as key-value pairs
    res.status(200).json({
        success: true,
        message: "File Upload Successfully"
    });
});

exports.getAllForm = catchAsyncErrors(async (req, res, next) => {
    const form = await Form.find(); // Provide fields as key-value pairs
    res.status(200).json({
        success: true,
        form
    });
});

exports.deleteForm = catchAsyncErrors(async (req, res, next) => {
    const form = await Form.findById(req.params.id);
    if (!form) {
        return next(new ErrorHander(`Category does not exist with Id: ${req.params.id}`, 400))
    }
    await form.remove();
    res.status(200).json({
        success: true,
        form
    });
});
