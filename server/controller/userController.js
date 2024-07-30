import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
 

// REGISTER
const register = async (req , res) => {
    const {email , username , password} = req.body; 
    const userData = await userModel.findOne({username});
    if(userData){
        return res.status(400).json({success : false , message: "User already exists"});
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({success : false , message: "Invalid email"});
    }
    if(password.length < 6){
        return res.status(400).json({success : false , message: "Password must be at least 6 characters"});
    }
 
    try {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                const user = new userModel({
                    email,
                    username,
                    password: hash
                });
                await user.save();
                res.json({success : true , message : "User Register Successful"});
            });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error });
    }

}

// LOGIN 
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userData = await userModel.findOne({ username });
        if (!userData) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        
        const info = await bcrypt.compare(password, userData.password);
        if (info === true) {
            const token = jwt.sign({userId : userData._id , username} , process.env.JWT_SECRET)
            res.cookie('token', token, {
                httpOnly: true,
                secure: false, // set to true if using https
                sameSite: 'None',
                maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
              });
            res.status(200).json({ success: true , userData, token, message: "Login successful" });
        } else {
            return res.status(200).json({ success: false, message: "Invalid password" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}; 


const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: 'Logout Successful' });
};


export {register , login , logout};