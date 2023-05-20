const mongoose = require("mongoose");


const CourseSchema = new mongoose.Schema({
    course_id:{
        type: String,
        require: true,
        trim: true,
    },
    course_name:{
        type: String,
        required: true
    },
    course_units:{
        type: String,
        required: true,
    },
    course_description:{
        type: String,
    },
    course_details:{
        type: String,
    }
    
},{
    timestamps: true,
});

const courseInfo = new mongoose.model("CourseInfo", CourseSchema);

module.exports = courseInfo;