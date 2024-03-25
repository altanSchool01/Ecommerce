const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const fs = require('fs');
const pdf = require('pdf-parse');
const Arid = require('../models/aridModel')
const pdfFilePath = 'C:\\upload\\Return-Fiad-Submitted.pdf';

// upload pdf convert pdf into json and save into data base
exports.fileLoad = catchAsyncErrors(async (req, res, next) => {
    const dataBuffer = fs.readFileSync(pdfFilePath);
    const data = await pdf(dataBuffer);
    const text = data.text;
    // Initialize an array to store the objects
    const dataArray = [];
    let array = []
    let isFirstTimeEnterInNumber = false;
    let isEnter = false;
    let value = 0;
    // Split the text by newline characters to process each line separately
    const lines = text.split('\n');
    // Start from the second line to skip the header
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        // Use rezzzzgular expression to check if the string is numeric
        if (/^[+-]?\d+(\.\d+)?$/.test(line)) {
            isEnter = true
            if (value == 0) {
                value++
                array.push(line)
            }
            if (isFirstTimeEnterInNumber == true) {
                const [srNo, partiesConcerned, nicPassport, referenceNo, dateOf, status] = array;
                const dataObject = {
                    // "SR NO.": srNo?.trim() || '',
                    "name": partiesConcerned?.trim() || '',
                    "passport": nicPassport?.trim() || '',
                    // "REFERENCE NO. OF COURT ORDER": referenceNo?.trim() || '',
                    // "DATE OF ORDER": dateOf?.trim() || '',
                    // "STATUS": status?.trim() || 'Live'
                };
                // dataArray.push(dataObject);
                await Arid.create(dataObject)
                array = []
                array.push(line)
            }
            isFirstTimeEnterInNumber = true
        } else if (isEnter) {
            array.push(line)
        }
    }
    res.status(200).json({
        status: true,
        message: 'Data file Upload Successfully'
    })
});

// get arid list
exports.getAridList = catchAsyncErrors(async (req, res) => {
    const aridList = await Arid.find()
    res.status(200).json({
        status: true,
        aridList
    })
});

exports.upateArid = catchAsyncErrors(async (req, res) => {
    const arid = await Arid.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true
    })
    res.status(200).json({
        status: true,
        arid
    })
});
