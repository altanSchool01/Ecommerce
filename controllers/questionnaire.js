const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Question = require('../models/questionnaire')

// create question 
exports.creteQuestion = catchAsyncErrors(async (req, res) => {
    const categoryId = req.body
     console.log(req.body,"azhar")
    let questions;
    const newQuestionData = {
        questions: req.body.components,
        categoryId: req.body.categoryId,
    };
    if (categoryId) {
              // Check if a question with the given categoryId exists
        const existingQuestion = await Question.findOne({categoryId:categoryId})
        if(existingQuestion){
            questions = await Question.findByIdAndUpdate(id, newQuestionData, {
                new: true,
                runValidators: true,
                useFindAndModify: true
            })
        }
        else {
            console.log(newQuestionData)
            questions = await Question.create(newQuestionData)
        }
    } 
    else {
        // Handle the case when categoryId is not provided
        return res.status(400).json({
            status: false,
            message: "categoryId is required",
        });
    }
    res.status(200).json({
        status: true,
        message: "Data Save SuccessFully"
    })
});

// get singal form data get by category id
exports.getQuestionByCateId = catchAsyncErrors(async (req, res,next) => {
    console.log(req.query)
    const { categoryId } = req.query;
    console.log({ categoryId })
    const question = await Question.findOne({categoryId})
    console.log(question,"question")
    if (!question) {
        return next(
            new ErrorHander(`Question does not exist with Id: ${req.query.categoryId}`)
        );
    }
    res.status(200).json({
        status: true,
        components: question
    })
});

// // questionprecess api submit data
// exports.saveQestionProcess = catchAsyncErrors(async,(req,res)=>{

// });