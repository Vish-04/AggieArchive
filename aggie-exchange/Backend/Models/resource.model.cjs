const mongoose = require("mongoose");


const ResourceSchema = new mongoose.Schema({
    resource_name:{
        type: String,
        required: true,
        trim: true
    },
    resource:{
        type: String,
        require: true,
        trim: true,
    },
    up:{
        type: [String],
        required: true
    },
    down:{
        type: [String],
        required: true,
    },
    course_id: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    user_id: {
        type: String,
        required: true,
    },
    file: {
        type: Boolean,
        required: true,
    },

},{
    timestamps: true,
});

const resourceInfo = new mongoose.model("ResourceInfo", ResourceSchema);

module.exports = resourceInfo;