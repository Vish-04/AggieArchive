const mongoose = require("mongoose");


const DiscussionSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    content:{
        type: String,
        require: true,
        trim: true,
    },
    course_id: {
        type: String,
        required: true,
    },
},{
    timestamps: true,
});

const discussionInfo = new mongoose.model("DisucssionInfo", DiscussionSchema);

module.exports = discussionInfo;