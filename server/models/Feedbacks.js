const mongoose = require("mongoose")

const feedbackSchema = new mongoose.Schema({
    client : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        require : true,
    },
    description : {
        type : String,
        require : true,
    },
    category : {
        type : String,
        enum : ["Product" , "Service" , "Others"],
        require : true,
    },
    priority : {
        type : String,
        enum : ["Low" , "Medium" , "High"],
        require : true,
    },
    rating : {
        type : Number,
        min : 1,
        max : 5,
        require : true,
    },
    feedbackType:{
        type : String,
        enum : ["positive" , "negative" , "neutral"],
        require : true,
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("feedback" , feedbackSchema)