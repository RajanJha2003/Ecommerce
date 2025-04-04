import User from "../models/userModel.js";
import bcrypt from 'bcrypt';


const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;
    const userExists=await User.findOne({email});

    if(userExists){
        res.status(400).json({message:"User already exists"});
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const user=new User({
        name,
        email,
        password:hashedPassword
    });

    await user.save();


}

export {registerUser};