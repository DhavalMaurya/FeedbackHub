const mongoose = require("mongoose")

exports.connectDb = () => {
    mongoose.connect("mongodb+srv://dhavalmaurya229:dhavalmaurya229@cluster0.fz98t.mongodb.net/feedbackHub").then(() => {
        console.log("Database Connected....")
    }).catch((error) => {
        console.log("Something went wrong while connecting the database...", error);
        process.exit(1);
    })
}