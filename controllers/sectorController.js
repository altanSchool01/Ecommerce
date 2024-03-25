const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Sector = require('../models/sectorModel')

// create Sector
exports.createSector = catchAsyncErrors(async (req, res, next) => {
        const {role}   = req.user
        if(role !== 'superadmin'){
          return next(new ErrorHander('Only Superadmin can create Sector'))
         }
    const { name, id } = req.body
    let sector;
    if (!name || typeof name !== 'string') {
        return next(new ErrorHander('Invalid or missing sector name', 400));
    }
    if (typeof id !== 'undefined' && id !== null && id.length > 0) {
        sector = await Sector.findByIdAndUpdate(id, { name }, {
            new: true,
            runValidators: true,
            useFindAndModify: true
        })
    } else {
        sector = await Sector.create({ name })
    }
    res.status(200).json({
        status: true,
        sector
    });
});

// get all sectors
exports.getAllSector = catchAsyncErrors(async (req, res, next) => {
    const sectors = await Sector.find();
    res.status(200).json({
        success: true,
        sectors,
    });
});

// delete sector

exports.deleteSector = catchAsyncErrors(async (req, res, next) => {
    const sector = await Sector.findById(req.params.id);
    console.log(sector)
    console.log(sector)
    if (!sector) {
        return next(new ErrorHander(`Sector does not exist with Id: ${req.params.id}`, 400))
    }
    await sector.remove();
    res.status(200).json({
        success: true,
        message: "Sector Deleted Successfully",
    });
});