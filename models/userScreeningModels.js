const mongoose = require('mongoose');

const userScreening = new mongoose.Schema({
    userId :{
        type:mongoose.Schema.ObjectId,
        require:true
    },
    defaultQuestionaries:{
       type:[],
       require:true
    },
    questionariesAnswer:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
         default:Date.now()
    },
    updatedAt:{
        type:Date,
         default:Date.now()
    }
})