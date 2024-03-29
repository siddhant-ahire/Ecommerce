const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
        unique:true,        
        index:true,
    },
},{timestamps:true})

categorySchema.index({ name: 1 }, { unique: true});

module.exports = mongoose.model("Category",categorySchema)