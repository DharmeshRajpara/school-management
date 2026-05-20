const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({

    date:{
        type:String,
        required:true,
    },
    rollNumber:{
        type:String,
        required:true,
    }
})

const Student=mongoose.model("Student",studentSchema)

module.exports=Student