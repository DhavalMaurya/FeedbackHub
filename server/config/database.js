const mongoose = require("mongoose")
dotenv.config();

exports.connectDb = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Database Connected....")
    }).catch((error) => {
        console.log("Something went wrong while connecting the database...", error);
        process.exit(1);
    })
}