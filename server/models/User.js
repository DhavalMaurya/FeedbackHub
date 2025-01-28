const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true,
    },
    role : {
        type : String,
        require : true,
        enum : ["Admin" ,"Client"]
    },
    createdAt : {
        type : Date,
        require : true,
        default : Date.now
    },
    feedbacks : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "feedbacks",
        default : [],
    },
    token : {
        type : String,
    }
})

module.exports = mongoose.model("user" , UserSchema)