const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
    const { name, email, password ,role } = req.body;
    try {

        console.log(req.body)
        //validate all fields
        if (!name || !email || !password || !role ){
            return res.status(403).json({success : false , message : "All fields require"});
        }

        //check if user already exist
        const userExist = await User.findOne({email});
        if (userExist) {
            return res.status(400).json({success : false , message : "User already exist pleaase try to login"});
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password , 10)

        //create new user in db
        const user = await User.create({
            name,
            email,
            password : hashedPassword,
            role
        })

        //return response
        return res.status(200).json({success : true , message : "User create successfully" , data :user })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "User cannot be registered . please try again", error: error });
    }
}

exports.login = async (req ,res )=>{
    const {email , password } = req.body;
    try {

        //validate all fields 
        if(!email , !password){
            return res.status(403).json({success : false , message : "All fields require"});
        }

        //check user existence
        const userExist = await User.findOne({email});
        if (!userExist) {
            return res.status(400).json({success : false , message : "User not found please register first"});
        }

        //match password 
        if(await bcrypt.compare(password , userExist.password)){
            //genrate jwt token 
            const playload = {name: userExist.name ,email : userExist.email ,id : userExist._id , role : userExist.role}
            const token = jwt.sign(playload , "shhhh",{ expiresIn : "30h"})
            userExist.token = token;
            userExist.password = undefined;

            //genrate cookie and send response
           res.cookie("token" , token ,{expires : new Date(Date.now() + 30 * 34 * 60 * 1000)}).status(200).json({success : true , message : "Login successfully" , token , data : userExist})
        }
        else{
            return res.status(400).json({success : false , message : "Invalid password"})
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "User cannot be logged in " ,error });
    }
}
