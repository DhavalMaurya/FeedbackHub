const jwt = require("jsonwebtoken")
const User = require("../models/User")
dotenv.config();


exports.auth = async (req,res, next) =>{
    //fetching token from multiple location
    // const token = req.cookie.token || req.body.token || req.header("Authorization") && req.header("Authorization").replace("Bearer","").trim() 
    const token = req.body.token
    //validate token 
    if(!token){
        return res.status(401).send({error:"token not found" })
    }

    try {
        const decode =await jwt.verify(token ,process.env.JWT_SECRET);
        console.log(decode);
        req.user = decode;
    } catch (error) {
        return res.status(401).send({error:"Please authenticate using a valid token" })
    }
    next();
} 
